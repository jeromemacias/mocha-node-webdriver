import webdriver from 'selenium-webdriver';

export default function getSauceLabsDriver(username, accessKey, browser, projectName = 'ssw sample test', tunnelName = 'local', capabilities = {}) {
    // auto detect tunnel name depends on travis-ci env var
    if (process.env.TRAVIS_JOB_NUMBER) {
        tunnelName = process.env.TRAVIS_JOB_NUMBER;
    }

    return (new webdriver.Builder()).
        usingServer('http://ondemand.saucelabs.com:80/wd/hub').
        withCapabilities({
            browserName: browser.name.charAt(0).toUpperCase() + browser.name.slice(1).toLowerCase(),
            platform: browser.platform,
            version: browser.version,
            name: projectName,
            username,
            accessKey,
            'tunnel-identifier': tunnelName,
            ...capabilities
        }).
        build();
}
