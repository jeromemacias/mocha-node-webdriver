import { By } from 'selenium-webdriver';
import { describe, it } from 'selenium-webdriver/testing';
import driver from 'nodium/lib/driver';
import driverUtilsFactory from 'nodium/lib/driver/utils';
import { expect } from 'nodium/lib/assert/chai';

const { waitForElementVisible, click } = driverUtilsFactory(driver);

describe('pagination on remote server', () => {
    function clickNext() {
        waitForElementVisible(By.css('a.next'));
        return click(By.css('a.next'));
    }

    it('includes value of echo parameter in response', () => {
        const echoString = 'please echo this';
        return driver.get('https://www.npmjs.org/browse/updated')
                             // first page, no offset in URL
            .then(clickNext) // second page, offset=36         (+36)
            .then(clickNext) // third page, offset=79          (+43)
            .then(clickNext) // fourth page, offset=118        (+39)
                             // URL for fifth page, offset=156 (+38)
            .then(() => driver.findElement(By.css('a.next')))
            .then((nextPage) => nextPage.getAttribute('href'))
            .then((nextPageLink) => {
                const offset = nextPageLink.match(/=([0-9]+)$/)[1];
                expect(Number(offset)).to.be.above(120);
            });
    });
});
