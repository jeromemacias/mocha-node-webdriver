import getLocalDriver from './local';
import getSauceLabsDriver from './sauce';

let driver;

if (process.env.SAUCE_USERNAME && process.env.SAUCE_ACCESS_KEY) {
    driver = getSauceLabsDriver(process.env.SAUCE_USERNAME, process.env.SAUCE_ACCESS_KEY);
} else {
    const options = {};
    if (process.env.VERBOSE_MODE) {
        options.verbose = true;
    }
    driver = getLocalDriver(process.env.SELENINIUM_BROWSER || 'chrome', options);
}

export default driver;
