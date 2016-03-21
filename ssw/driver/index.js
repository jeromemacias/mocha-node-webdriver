import getLocalDriver from './local';
import getSauceLabsDriver from './sauce';

let driver;

if (process.env.SAUCE) {
    const browser = {
        name: process.env.SELENIUM_BROWSER || 'chrome',
        platform: process.env.SAUCE_PLATFORM || 'Windows 10'
    };
    if (process.env.SAUCE_VERSION) {
        browser.version = process.env.SAUCE_VERSION;
    } else {
        switch (browser.name.toLowerCase()) {
        case 'chrome':
            browser.version = '48';
            break;
        case 'firefox':
            browser.version = '44';
            break;
        default:
            throw new Error(`Cannot set default version for browser ${browser.name}`);
        }
    }
    driver = getSauceLabsDriver(process.env.SAUCE_USERNAME, process.env.SAUCE_ACCESS_KEY, browser);
    console.log(`Use ${browser.name.toLowerCase()} browser`);
} else {
    const browser = process.env.SELENIUM_BROWSER || 'chrome';
    const options = {};
    if (process.env.VERBOSE_MODE) {
        options.verbose = true;
    }
    driver = getLocalDriver(browser.toLowerCase(), options);
    console.log(`Use ${browser.toLowerCase()} browser`);
}

export default driver;
