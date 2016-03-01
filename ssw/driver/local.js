import chrome from 'selenium-webdriver/chrome';

function getChromeService() {
    const chromeBinary = __dirname + '/../../node_modules/.bin/chromedriver';

    return (new chrome.ServiceBuilder(chromeBinary)).build();
}

function getChromeDriver() {
    return new chrome.Driver(null, getChromeService());
}

function getChromeDriverWithVerboseLogging(filePath) {
    const service = getChromeService()
        .enableVerboseLogging()
        .loggingTo(filePath || __dirname + '/../../chromedriver.log')
        .build();

    return new chrome.Driver(null, service);
}

export default function getLocalDriver(browser, options = {}) {
    switch (browser) {
    case 'chrome':
        if (options.verbose) {
            return getChromeDriverWithVerboseLogging(options.logPath)
        }
        return getChromeDriver();
    default: throw new Error('No local driver found for ' + browser);
    }
}
