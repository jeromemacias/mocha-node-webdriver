
var webdriver = require('selenium-webdriver'),
    test = require('selenium-webdriver/testing');

test.describe("local test server", function () {
  test.it("responds to GET /hello with 'world'", function () {
    driver.get('http://localhost:3000/hello');
    driver.wait(function () {
          return driver.getPageSource().then(function (content) {
            return content.indexOf('world') > -1;
          });
        }, 5000);
  });

  test.it("404s for root", function () {
    driver.get('http://localhost:3000/');
    driver.wait(function () {
          return driver.getPageSource().then(function (content) {
            return content.indexOf('Cannot GET /') > -1;
          });
        }, 5000);
  });
});
