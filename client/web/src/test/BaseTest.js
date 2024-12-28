import {Builder} from 'selenium-webdriver';

export default class BaseTest{

    constructor(){
        this.driver = null
    }

    async setup(){
        if (this.driver === null) {
            this.driver = await new Builder().forBrowser('chrome').build();
        }
       
    }

    async teardown() {
        if (this.driver) {
          await this.driver.quit();
          this.driver = null;
        }
      }

}