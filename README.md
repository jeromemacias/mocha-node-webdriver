mocha-node-webdriver [![Build Status](https://travis-ci.org/jeromemacias/mocha-node-webdriver.svg?branch=master)](https://travis-ci.org/jeromemacias/mocha-node-webdriver)
====================

An example of using mocha to write web app integration tests that run in node.js
and execute through a browser using Selenium WebDriver.

This repository contains a minimal configuration for writing integration tests:

* in JavaScript
* that execute in `node.js`
* written for the `mocha` test-runner
* using `selenium-webdriver` to control a browser
* that can access either remote or local servers
* which start/stop the local server instance as needed

There is a trivial web "application" for use as a test target under the
directory `local_server`.  It has its own `package.json` file and has to
be `npm install`ed separately, but is otherwise boring.

To run the tests in this example, you'll need to have `git`, `node`,
`npm`, and the Chrome browser installed already.  If you don't, or the versions
don't match this code's requirements, error messages will let you know.
In addition, [setup `chromedriver` for your system](https://sites.google.com/a/chromium.org/chromedriver/getting-started)
Once prerequisites in place, follow these steps particular to
this example:

1. go to somewhere you want to keep your local copy of this repository
2. `git clone https://github.com/gleneivey/mocha-node-webdriver.git`
3. `cd mocha-node-webdriver`
4. `make install`
8. `make test-local`

`make test-local` launches a local web server, opens the Chrome browser, and
then navigates the browser to the server (`localhost:3030`) to execute a
handful of trivial tests.
If you've been able to install and things are configured correctly, mocha
should run and report "3 passing" tests.

#### Details of Note

* There are several things that would be configureable in a real system
(the local server port, test file paths, etc.) that have been
hard-coded for simplicity/clarity.
* Integration tests are slow.  The file `test/mocha.opts` is used
to increase mocha's default test timeout from 2 seconds to 30
seconds.  Hopefully this is high enough to accommodate any system
you're trying to run these tests on, but if you get timeout failures,
try increasing the value here.
* The file `test/for_all_tests.js` contains code that puts the
`driver` variable into the global name space, as well as mocha
`before()` and `after()` calls that initialize and close the
browser and WebDriver sessions. It also includes start of local server.
This file must be included in the file list given to mocha, and cannot
be named by the `--require` option or `required` from within the test files.
* The remote tests don't perform a search on www.google.com like
many other Selenuim WebDriver examples do.  It turns out that it's
actually difficult for Chrome to navigate *off* a Google results
page with a simple `driver.get()`.  When putting this example
together, the results page was constantly "navigating" itself
(to check to see if it could sing in to Google+, etc.), and the
Selenium-requested navigation worked less than 10% of the time.
