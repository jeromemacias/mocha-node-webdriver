import { before, afterEach, after } from 'selenium-webdriver/testing';
import { postJobUpdate } from '../../ssw/hook/sauce';
import driver from '../../ssw/driver';

let allPassed = true;

afterEach(function () { // we need to keep the original this (do not use arrow function)
    allPassed = allPassed && (this.currentTest.state === 'passed');
});

if (process.env.SAUCE) {
    after((done) => {
        postJobUpdate(driver, process.env.SAUCE_USERNAME, process.env.SAUCE_ACCESS_KEY, allPassed, done);
    });
}

after(() => {
    driver.quit();
});
