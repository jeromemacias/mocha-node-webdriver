import webdriver from 'selenium-webdriver';
import { describe, it } from 'selenium-webdriver/testing';
import driver from '../../nodium/driver';
import { expect } from '../../nodium/assert/chai';

describe('local test server', () => {
    it('responds to GET /hello with "world"', () => {
        driver.get('http://localhost:3030/hello');

        return expect(driver.getPageSource()).to.eventually.contain('world');
    });

    it('404s for root', () => {
        driver.get('http://localhost:3030/');

        return expect(driver.getPageSource()).to.eventually.contain('Not Found');
    });
});
