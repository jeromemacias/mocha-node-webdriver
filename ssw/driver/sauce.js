import webdriver from 'selenium-webdriver';

export default function getSauceLabsDriver(username, accessKey, projectName = 'ssw sample test', tunnelName = 'local', capabilities = {}) {
    // auto detect tunnel name depends on travis-ci env var
    if (process.env.TRAVIS_JOB_NUMBER) {
        tunnelName = process.env.TRAVIS_JOB_NUMBER;
    }

    return (new webdriver.Builder()).
        usingServer('http://ondemand.saucelabs.com:80/wd/hub').
        withCapabilities({
            browserName: 'Chrome',
            platform: 'Windows 10',
            version: '48.0',
            name: projectName,
            username,
            accessKey,
            'tunnel-identifier': tunnelName,
            ...capabilities
        }).
        build();
}
