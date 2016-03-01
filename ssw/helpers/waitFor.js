export function waitForPageLoadAfter(driver, seleniumOperation) {
    let bodyElement;
    driver.
        findElement(webdriver.By.tagName('BODY')).
        then(element => {
            bodyElement = element;
        });
    seleniumOperation();
    driver.wait(() => {
        // better implementation:
        //   check error.message for "stale element reference: element is not attached to the page document"
        //   and reject the promise we're returning in that case
        return bodyElement.getAttribute('class').then(() => false, (error) => true);
    });
}
