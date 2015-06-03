
var webdriver = require('selenium-webdriver'),
    test = require('selenium-webdriver/testing'),
    helper = require('./../helper');

test.describe("pagination on remote server", function () {
  function clickNext() {
    helper.waitForPageLoadAfter(driver, function () {
      // don't like having to pick among multiple elements?  Switch to xpath and select on link text fragment, too
      driver.findElements(webdriver.By.css('p.description a')).
          then(function (elements) {
            var index = (elements.length == 4) ? 1 : 0;
            elements[index].click();
          });
    });
  }

  test.it("works on npmjs.org", function () {
    driver.get('https://www.npmjs.org/browse/updated');

    clickNext();
    clickNext();
    clickNext();

    driver.wait(function () {
          return driver.findElement(webdriver.By.css('p.description')).getText().then(function (navText) {
            return navText.indexOf('Page 4') > -1;
          });
        }, 5000);
  });
});
