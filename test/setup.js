import { before, afterEach, after } from 'selenium-webdriver/testing';
import { pm2start, pm2stop } from '../ssw/hook/pm2';
import { postJobUpdate } from '../ssw/hook/sauce';
import driver from '../ssw/driver';

const pm2processName = 'webdriver-test-server';
let allPassed = true;

before((done) => {
    pm2start(pm2processName, {
        script: __dirname + '/../local_server/build/server.js',
        exec_mode: 'fork'
    }, done);
});

afterEach(function() {
    allPassed = allPassed && (this.currentTest.state === 'passed');
});

if (process.env.SAUCE_USERNAME && process.env.SAUCE_ACCESS_KEY) {
    after((done) => {
        postJobUpdate(driver, process.env.SAUCE_USERNAME, process.env.SAUCE_ACCESS_KEY, allPassed, done);
    });
}

after((done) => {
    driver.quit();

    pm2stop(pm2processName, done);
});