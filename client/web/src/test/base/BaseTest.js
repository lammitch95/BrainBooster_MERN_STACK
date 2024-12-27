const { Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');
const fs = require('fs');
const { setUtilityDriver } = require('../utils/Utility');
const BasePage = require('../tests/pages/BasePage'); 
const LoginPage = require('..tests/pages/LoginPage');

class BaseTest {
    constructor() {
        this.driver = null;
        this.localhost_URL = 'http://localhost:5173/';
        this.basePage = null;
        this.loginPage = null;
    }

    
    async before() {// Set up WebDriver before running any tests
        const options = new chrome.Options();
        options.addArguments('start-maximized');  // Maximize the window
        this.driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();
        this.basePage = new BasePage(this.driver);
        this.loginPage = new LoginPage(this.driver);
        setUtilityDriver(this.driver);  // Set global driver configurations if needed
    }

    
    async beforeEach() {// Load the application before each test
        await this.driver.get(this.localhost_URL);
    }

    async afterEach(test) {// Capture screenshot on failure
        if (test.state === 'failed') {
            const screenshotPath = path.join(__dirname, '../resources/screenshots', `${Date.now()}_${test.title}.png`);
            const screenshot = await this.driver.takeScreenshot();
            fs.writeFileSync(screenshotPath, screenshot, 'base64');
            console.log(`Screenshot saved at ${screenshotPath}`);
        }
    }

    async after() {// Clean up after all tests
        await this.driver.quit();
    }
}


module.exports = BaseTest;// Export the BaseTest class
