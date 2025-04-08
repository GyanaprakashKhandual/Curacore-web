import http from "k6/http";
import { check } from "k6";

const testType = __ENV.TEST_TYPE || "10"; 

let vus = 1;
let iterations = 1;

if (testType === "10") {
    vus = 10;
    iterations = 10;
} else if (testType === "100") {
    vus = 100;
    iterations = 100;
} else if (testType === "200") {
    vus = 200;
    iterations = 200;
} else if (testType === "300") {
    vus = 300;
    iterations = 300;
} else if (testType === "400") {
    vus = 400;
    iterations = 400;
} else if (testType === "500") {
    vus = 500;
    iterations = 500;
} else if (testType === "600") {
    vus = 600;
    iterations = 600;
} else {
    console.error(`Invalid TEST_TYPE: ${testType}. Please use 10, 100, 200, 300, 400, 500, or 600.`);
    throw new Error("Invalid TEST_TYPE");
}

export const options = {
    vus: vus,
    iterations: iterations,
};

function sectionPage() {
    const response = http.get('https://afi-ecb4ca.webflow.io/sections');
    check(response, {
        'is status code 200': (r) => r.status === 200,
    });
}

export default function () {
    sectionPage();
}
/*
--> When the user no is 100 
✗ is status code 200
      ↳  80% — ✓ 962 / ✗ 238
*/

/*
--> When the user is 200
✗ is status code 200
      ↳  49% — ✓ 596 / ✗ 604
*/

/*
--> When the user is 300
✗ is status code 200
      ↳  69% — ✓ 837 / ✗ 363
*/
 
/*
--> When the user on is 400
 ✗ is status code 200
      ↳  33% — ✓ 407 / ✗ 793
*/

/*
--> when the use no is 500
 ✗ is status code 200
      ↳  40% — ✓ 484 / ✗ 716
*/

/*
--When the user no is 600
 ✗ is status code 200
      ↳  72% — ✓ 873 / ✗ 327
      */
