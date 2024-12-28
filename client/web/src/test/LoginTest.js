import assert from 'assert';
import {Builder,By, until} from 'selenium-webdriver';

//test command node fileName

async function LoginTest(){
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost:5173/login');
    await driver.manage().window().maximize();

    
    let emailField = await driver.findElement(By.xpath("//form[@class='login-form']//input[@type='email']"));
    let passwordField = await driver.findElement(By.xpath("//form[@class='login-form']//input[@type='password']"));
    let loginButton = await driver.findElement(By.xpath("//button[text()='Log In']"));
    let errorMessage = await driver.findElement(By.xpath("//div[@class='errorMssg hideError']//p"));

    let testEmail = "lammitch420@gmail.com"; //valid emails
    let testPassword = "03272008Mitch!"; //valid password

    let incorrectPassword = "1234ABC!";//invalid Password

    await emailField.sendKeys(testEmail);
    await passwordField.sendKeys(testPassword)
    await loginButton.click();

    const resultMessage = await errorMessage.getText();

     assert.ok(!resultMessage.includes('Invalid Login credentials...'), 
        'Login has failed. Email & Password do not match');

    await driver.quit();
    
};

LoginTest();


