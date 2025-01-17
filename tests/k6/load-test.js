import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '10m', target: 100 }, // ramp up to 100 users over 10 minutes
        { duration: '30m', target: 100 }, // stay at 100 users for 30 minutes
        { duration: '10m', target: 0 },   // ramp down to 0 users over 10 minutes
    ],
};

export default function () {
    let res = http.get('http://bootstrap-a9ckemb0gyhyahbc.uksouth-01.azurewebsites.net/');
    check(res, {
        'status is 200': (r) => r.status === 200,
    });
    sleep(1);
}