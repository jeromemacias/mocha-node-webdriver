import { before, afterEach, after } from 'selenium-webdriver/testing';
import { pm2start, pm2stop } from 'nodium/lib/hook/pm2';
import { postJobUpdate as browserstackPostUpdateJob } from 'nodium/lib/hook/browserstack';
import { postJobUpdate as saucePostUpdateJob } from 'nodium/lib/hook/saucelabs';
import driver from 'nodium/lib/driver';

const pm2processName = 'webdriver-test-server';
let allPassed = true;

before((done) => {
    pm2start(pm2processName, {
        script: __dirname + '/../../local_server/build/server.js',
        exec_mode: 'fork'
    }, (err, resp) => {
        if (err) {
            return done(err);
        };
        setTimeout(() => {
            done(null, resp);
        }, 5000);
    });
});

afterEach(function () { // we need to keep the original this (do not use arrow function)
    allPassed = allPassed && (this.currentTest.state === 'passed');
});

if (process.env.BROWSERSTACK) {
    after((done) => {
        browserstackPostUpdateJob(driver, process.env.BROWSERSTACK_USERNAME, process.env.BROWSERSTACK_ACCESS_KEY, allPassed, done);
    });

} else if (process.env.SAUCE) {
    after((done) => {
        saucePostUpdateJob(driver, process.env.SAUCE_USERNAME, process.env.SAUCE_ACCESS_KEY, allPassed, done);
    });
}

after((done) => {
    driver.quit();

    pm2stop(pm2processName, done);
});
