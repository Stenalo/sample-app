import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '2m', target: 100 }, // ramp up to 100 users over 2 minutes
        { duration: '10m', target: 100 }, // stay at 100 users for 10 minutes
        { duration: '1m', target: 1000 }, // spike to 1000 users over 1 minute
        { duration: '10m', target: 1000 }, // stay at 1000 users for 10 minutes
        { duration: '3m', target: 100 }, // ramp down to 100 users over 3 minutes
        { duration: '10m', target: 100 }, // stay at 100 users for 10 minutes
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