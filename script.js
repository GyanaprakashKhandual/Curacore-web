import http from 'k6/http';
import { check, sleep } from 'k6';
function homePageWithOneUser() {

    const response = http.get('https://afi-ecb4ca.webflow.io/');

    check(response, {
        'is status code 200': (r) => r.status === 200
    });

    sleep(1)


}

export const options = {
    vus: 600,
    iterations: 1200,
    thresholds: {
        http_req_failed: ['rate<0.05'], // fail test if >5% requests fail
      },
}

function homePageWithMoreUser() {
    const response = http.get('https://afi-ecb4ca.webflow.io/');

        check(response, {
            'is status code 200': (r) => r.status === 200
        });
        sleep(1)
}

export default function () {

    //homePageWithOneUser();
    homePageWithMoreUser();
}
// The home page is runnig sucessfullly with one user at a time
// The home page is runnig sucessfullly with ten user at a time
// The hoem page having 1 request failed when the user no is 100
// The home page haing 3% request failed when the user no is 200
// The home page having more than 5% failed request when the user no is 300
// The home page having more than 5% failed request when the user no is 400
// The hoem page having 23% failed request when the user number is 500
/*
 The hoem page is having 31% of failed request whwn the user no is 600
✗ is status code 200
↳  69% — ✓ 831 / ✗ 369
*/
