
var webdriver = require('selenium-webdriver'),
    test = require('selenium-webdriver/testing'),
    helper = require('./../helper');

test.describe("pagination on remote server", function () {
  function clickNext() {
    helper.waitForPageLoadAfter(driver, function () {
      driver
          .findElements(webdriver.By.css('a.next'))
          .then(function (elements) {
            elements[0].click();
          });
    });
  }

  test.it("works on npmjs.org", function () {
    driver.get('https://www.npmjs.org/browse/updated');

                   // first page, no offset in URL
    clickNext();   // second page, offset=36         (+36)
    clickNext();   // third page, offset=79          (+43)
    clickNext();   // fourth page, offset=118        (+39)
                   // URL for fifth page, offset=156 (+38)

    driver.wait(function () {
          return driver
              .findElement(webdriver.By.css('a.next'))
              .getAttribute('href')
              .then(function (nextPageLink) {
                    var offset = nextPageLink.match(/=([0-9]+)$/)[1];
                    return parseInt(offset) > 120;
                  });
        }, 5000);
  });
});
