import { By } from 'selenium-webdriver';
import { describe, it } from 'selenium-webdriver/testing';
import driver from 'nodium/lib/driver';
import driverUtilsFactory from 'nodium/lib/driver/utils';
import { expect } from 'nodium/lib/assert/chai';

const { click, setValue } = driverUtilsFactory(driver);

describe('access to remote servers', () => {
    it('can search from Wikipedia\'s home page', () => {
        return driver.get('http://en.wikipedia.org')
            .then(() => setValue(By.name('search'), 'webdriver'))
            .then(() => click(By.name('go')))
            .then(() => {
                expect(driver.getTitle()).to.eventually.contain('Selenium (software) - Wikipedia');
            });
    });

    it('can see the example repo on GitHub', () => {
        return driver.get('http://github.com/gleneivey/mocha-node-webdriver.git')
            .then(() => driver.findElements(By.css('.octicon.octicon-git-pull-request')))
            .then((elements) => {
                expect(!!elements.length).to.be.truthy;
            });
    });
});
