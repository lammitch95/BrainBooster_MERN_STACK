const assert = require('assert');
const BaseTest = require('../tests/base/BaseTest'); 
const LoginPage = require('../tests/pages/LoginPage'); 

class LoginTest extends BaseTest{

    constructor(){
        super();
    }

    async before() {
        await super.before(); // Initialize the WebDriver and page objects
    }

    async beforeEach() {
        await super.beforeEach(); // Load the application before each test
    }

    async afterEach() {
        await super.afterEach(this.currentTest); // Capture screenshot if the test fails
    }

    async after() {
        await super.after(); // Quit the WebDriver after all tests
    }


    async testLoginPage() {// Test: Validate login 

        let testEmail = "lammitch420@gmail.com";
        let testPassword = "03272008Mitch!";

        await this.loginPage.setEmail(testEmail);
        await this.loginPage.setPassword(testPassword);
        await this.loginPage.clickLoginButton();

        const resultMessage = await this.loginPage.getErrorMessage();

        assert.ok(resultMessage.includes('Epic sadface'), 'Error message does not match');
    }
}

module.exports = LoginTests;