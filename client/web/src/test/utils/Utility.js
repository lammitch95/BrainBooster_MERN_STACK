const { Builder, WebDriver } = require('selenium-webdriver');
const BasePage = require('./BasePage');

let driver;

function setUtilityDriver() {
    driver = BasePage.getDriver(); // Assuming BasePage has a method to return the driver.
}

module.exports = {
    setUtilityDriver
};