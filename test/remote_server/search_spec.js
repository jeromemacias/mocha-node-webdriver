import webdriver from 'selenium-webdriver';
import { describe, it } from 'selenium-webdriver/testing';
import driver from '../../ssw/driver';
import { expect } from '../../ssw/assert/chai';

describe('access to remote servers', () => {
    it('can search from Wikipedia\'s home page', () => {
        driver.get('http://en.wikipedia.org')
            .then(() => driver.findElement(webdriver.By.name('search')))
            .then((element) => element.sendKeys('webdriver'))
            .then(() => driver.findElement(webdriver.By.name('go')))
            .then((element) => element.click())
            .then(() => {
                expect(driver.getTitle()).to.eventually.contain('Selenium (software) - Wikipedia, the free encyclopedia');
            });
    });

    it('can see the example repo on GitHub', () => {
        driver.get('http://github.com/gleneivey/mocha-node-webdriver.git')
            .then(() => driver.findElement(webdriver.By.css('.octicon.octicon-git-pull-request')))
            .then((element) => {
                expect(element.getOuterHtml()).to.eventually.not.be.null;
            });
    });
});
