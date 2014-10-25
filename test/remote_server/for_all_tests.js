
var webdriver = require('selenium-webdriver'),
    helper = require('./helper');

driver = 'is global';

before(function() {
console.log("running global before[All]");
  // use either one
  driver = helper.getChromeDriver();
  //driver = helper.getChromeDriverWithVerboseLogging();
});

after(function(done) {
console.log("running global after[All]");
  driver.
      quit().
      then(function() { done(); });
});

