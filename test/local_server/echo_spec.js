
var webdriver = require('selenium-webdriver'),
    test = require('selenium-webdriver/testing');

test.describe("operation GET /echo?echo=", function () {
  test.it("includes value of echo parameter in response", function () {
    var echoString = 'please echo this';
    driver.get('http://localhost:3000/echo?echo=' + echoString.replace(/ /g, '%20'));
    driver.wait(function () {
          return driver.getPageSource().then(function (content) {
                return content.indexOf(echoString) > -1;
          });
        }, 5000);
  });
});
