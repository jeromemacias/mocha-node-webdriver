import webdriver from 'selenium-webdriver';
import { before, afterEach, after } from 'selenium-webdriver/testing';
import helper from './helper';
import pm2 from 'pm2';
import request from 'request';

const pm2processName = 'webdriver-test-server';
let allPassed = true;

global.driver = 'is global';

before((done) => {
    pm2.connect(err => {
        if (err) {
            done(err);
            return;
        }

        pm2.start({
            name: pm2processName,
            script: __dirname + '/../local_server/server.js',
            exec_mode: 'fork'
        }, (err, apps) => {
            pm2.disconnect();
            done(err);
        });
    });

    if (process.env.SAUCE_USERNAME && process.env.SAUCE_ACCESS_KEY) {
        global.driver = helper.getSauceLabsDriver(process.env.SAUCE_USERNAME, process.env.SAUCE_ACCESS_KEY);
    } else if (process.env.VERBOSE_MODE) {
        global.driver = helper.getChromeDriverWithVerboseLogging();
    } else {
        global.driver = helper.getChromeDriver();
    }
});

afterEach(function() {
    allPassed = allPassed && (this.currentTest.state === 'passed');
});

if (process.env.SAUCE_USERNAME && process.env.SAUCE_ACCESS_KEY && allPassed) {
    after((done) => {
        global.driver.getSession().then(session => {
            request({
                url: `https://saucelabs.com/rest/v1/${process.env.SAUCE_USERNAME}/jobs/${session.getId()}`,
                method: 'PUT',
                auth: {
                    user: process.env.SAUCE_USERNAME,
                    pass: process.env.SAUCE_ACCESS_KEY
                },
                json: { passed: true }
            }, function (error, response, body) {
                if (error) {
                    return done(error);
                }
                console.log(`SauceLabs results available at https://saucelabs.com/beta/tests/${session.getId()}`);
                done();
            });
        });
    });
}

after((done) => {
    global.driver.quit();

    pm2.connect(err => {
        if (err) {
            done(err);
            return;
        }

        pm2.delete(pm2processName, () => {
            pm2.disconnect();
            done();
        });
    });
});
