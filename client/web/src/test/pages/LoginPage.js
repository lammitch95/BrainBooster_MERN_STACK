const BasePage = require('./BasePage'); // Assuming BasePage.js is where common functions are written
const { By } = require('selenium-webdriver');

class LoginPage extends BasePage {
    constructor(driver) {
        super(driver);  // Call the constructor of BasePage
        this.emailField = By.xpath("//form[@class='login-form']//input[@type='email']");
        this.passwordField = By.xpath("//form[@class='login-form']//input[@type='password']");
        this.loginButton = By.id("login-button");
        this.errorMessage = By.cssSelector("#login_button_container h3");
    }

    async setEmail(email) { // Set email in the email field
        await this.set(this.emailField, email);
    }

    async setPassword(password) { // Set password in the password field
        await this.set(this.passwordField, password);
    }

    // Click login button and return ProductsPage object
    async clickLoginButton() {
        await this.click(this.loginButton);
        //const ProductsPage = require('./ProductsPage');  // Assuming you have ProductsPage.js
       //return new ProductsPage(this.driver);  // Returning ProductsPage object
    }

   
    async logIntoApp(username, password) { // Perform login and return ProductsPage object
        await this.setUsername(username);
        await this.setPassword(password);
        return await this.clickLoginButton();
    }

    // Get error message text
    async getErrorMessage() {
        return await this.find(this.errorMessage).getText();
    }
}

module.exports = LoginPage;