
var webdriver = require('selenium-webdriver');

describe("local test server", function(done) {
  it("responds to GET /hello with 'world'", function(done) {
    driver.get('http://localhost:3000/hello');

    driver.
        wait(function() {
          return driver.getPageSource().then(function(content) {
            return content.indexOf('world') > -1;
          });
        }, 5000).
        then(function() {
          done();
        });
  });

  it("404s for root", function(done) {
    driver.get('http://localhost:3000/');

    driver.
        wait(function() {
          return driver.getPageSource().then(function(content) {
            return content.indexOf('Cannot GET /') > -1;
          });
        }, 5000).
        then(function() {
          done();
        });
  })
});
