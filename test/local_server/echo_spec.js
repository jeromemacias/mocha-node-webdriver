
var webdriver = require('selenium-webdriver');

describe("operation GET /echo?echo=", function() {
  it("includes value of echo parameter in response", function(done) {
    var echoString = 'please echo this';
    driver.get('http://localhost:3000/echo?echo=' + echoString.replace(/ /g, '%20'));

    driver.
        wait(function() {
          return driver.getPageSource().then(function(content) {
            return content.indexOf(echoString) > -1;
          });
        }, 5000).
        then(function() {
          done();
        });
  });
});
