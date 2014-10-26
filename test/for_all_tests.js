
var webdriver = require('selenium-webdriver'),
    helper = require('./helper');

driver = 'is global';

before(function() {
      // use either one
  driver = helper.getChromeDriver();
  //driver = helper.getChromeDriverWithVerboseLogging();
});

after(function(done) {
  driver.
      quit().
      then(function() { done(); });
});
