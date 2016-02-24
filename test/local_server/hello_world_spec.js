import webdriver from 'selenium-webdriver';
import { describe, it } from 'selenium-webdriver/testing';
import { expect } from '../chai';

describe('local test server', () => {
    it('responds to GET /hello with "world"', () => {
        driver.get('http://localhost:3030/hello').then(() => {
            expect(driver.getPageSource()).to.eventually.contain('world');
        });
    });

    it('404s for root', () => {
        driver.get('http://localhost:3030/').then(() => {
            expect(driver.getPageSource()).to.eventually.contain('Cannot GET /');
        });
    });
});
