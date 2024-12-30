import { By, until } from 'selenium-webdriver';

export async function login(driver, email, password) {
    
    let emailField = await driver.findElement(By.xpath("//form[@class='login-form']//input[@type='email']"));
    let passwordField = await driver.findElement(By.xpath("//form[@class='login-form']//input[@type='password']"));
    let loginButton = await driver.findElement(By.xpath("//button[text()='Log In']"));
    let errorMessage = await driver.findElement(By.xpath("//div[@class='errorMssg hideError']//p"));

    await emailField.sendKeys(email);
    await passwordField.sendKeys(password);
    await loginButton.click();

    //await driver.wait(until.elementIsVisible(errorMessage), 2000);
    await driver.wait(until.urlContains("home"), 5000); 

    const resultMessage = await errorMessage.getText();

    return resultMessage; 
}