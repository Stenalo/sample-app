import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '2m', target: 100 }, // ramp up to 100 users over 2 minutes
        { duration: '5m', target: 100 }, // stay at 100 users for 5 minutes
        { duration: '2m', target: 200 }, // ramp up to 200 users over 2 minutes
        { duration: '5m', target: 200 }, // stay at 200 users for 5 minutes
        { duration: '2m', target: 0 },   // ramp down to 0 users over 2 minutes
    ],
};

export default function () {
    let res = http.get('http://bootstrap-a9ckemb0gyhyahbc.uksouth-01.azurewebsites.net/');
    check(res, {
        'status is 200': (r) => r.status === 200,
    });
    sleep(1);
}