
var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome');

var helpers = {
  getChromeDriver: function() {
    return new webdriver.Builder().
        withCapabilities(webdriver.Capabilities.chrome()).
        build();
  },

  getChromeDriverWithVerboseLogging: function(filePath) {
    var builder = new chrome.ServiceBuilder();
    builder.enableVerboseLogging();
    builder.loggingTo(filePath || 'chromedriver.log');
    var service = builder.build();
    return new chrome.Driver(null, service);
  }
};

module.exports = helpers;
