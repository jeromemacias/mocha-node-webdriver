
var webdriver = require('selenium-webdriver'),
    test = require('selenium-webdriver/testing'),
    helper = require('./helper');

driver = 'is global';

test.before(function () {
      // use either one
  driver = helper.getChromeDriver();
  //driver = helper.getChromeDriverWithVerboseLogging();
});

test.after(function () {
  driver.quit();
});
