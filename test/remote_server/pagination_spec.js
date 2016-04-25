import webdriver from 'selenium-webdriver';
import { describe, it } from 'selenium-webdriver/testing';
import driver from '../../nodium/driver';
import { expect } from '../../nodium/assert/chai';

describe('pagination on remote server', () => {
    function clickNext() {
        return driver.findElements(webdriver.By.css('a.next'))
            .then(elements => elements[0].click());
    }

    it('includes value of echo parameter in response', () => {
        const echoString = 'please echo this';
        driver.get('https://www.npmjs.org/browse/updated')
                             // first page, no offset in URL
            .then(clickNext) // second page, offset=36         (+36)
            .then(clickNext) // third page, offset=79          (+43)
            .then(clickNext) // fourth page, offset=118        (+39)
                             // URL for fifth page, offset=156 (+38)
            .then(() => driver.findElement(webdriver.By.css('a.next')))
            .then((nextPage) => nextPage.getAttribute('href'))
            .then((nextPageLink) => {
                const offset = nextPageLink.match(/=([0-9]+)$/)[1];
                expect(Number(offset)).to.be.above(120);
            });
    });
});
