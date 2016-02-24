import webdriver from 'selenium-webdriver';
import test from 'selenium-webdriver/testing';
import helper from './helper';
import pm2 from 'pm2';

const pm2processName = 'webdriver-test-server';

global.driver = 'is global';

test.before((done) => {
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

test.after((done) => {
    global.driver.quit();

    pm2.connect(err => {
        if (err) {
            done();

            return;
        }

        pm2.delete(pm2processName, () => {
            pm2.disconnect();
            done();
        });
    });
});
