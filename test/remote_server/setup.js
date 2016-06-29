import { before, afterEach, after } from 'selenium-webdriver/testing';
import { postJobUpdate as saucePostUpdateJob } from 'nodium/lib/hook/saucelabs';
import driver from 'nodium/lib/driver';

let allPassed = true;

afterEach(function () { // we need to keep the original this (do not use arrow function)
    allPassed = allPassed && (this.currentTest.state === 'passed');
});

if (process.env.SAUCE) {
    after((done) => {
        saucePostUpdateJob(driver, process.env.SAUCE_USERNAME, process.env.SAUCE_ACCESS_KEY, allPassed, done);
    });
}

after(() => {
    driver.quit();
});
