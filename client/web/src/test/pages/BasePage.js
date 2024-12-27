// Import necessary modules
const { By, Key, until } = require('selenium-webdriver');

class BasePage {
    
  constructor(driver) {
    this.driver = driver;
  }

 
  async find(locator) { // Method to Find an element using a locator
    return await this.driver.findElement(locator);
  }


  async set(locator, text) {  // Method to Clear an input field and set its value
    const element = await this.find(locator);
    await element.clear();
    await element.sendKeys(text);
  }

  
  async click(locator) {// Method to Click on an element
    const element = await this.find(locator);
    await element.click();
  }

  
  static async delay(milliseconds) {// Method Delay execution for a specified time (in milliseconds)
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }
}

module.exports = BasePage;
