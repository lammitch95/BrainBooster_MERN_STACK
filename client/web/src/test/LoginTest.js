import assert from 'assert';
import { login } from './utils/LoginUtils.js';
import BaseTest from './BaseTest.js';

class LoginTest extends BaseTest{
    constructor(){
        super();
    }

    async run(){  
        try{

            await this.setup();
            await this.driver.get('http://localhost:5173/login');
            await this.driver.manage().window().maximize();
            
            let testEmail = "lammitch420@gmail.com"; //valid emails
            let testPassword = "03272008Mitch!"; //valid password
            let incorrectPassword = "1234ABC!";//invalid Password
         
            const resultMessage = await login(this.driver, testEmail, incorrectPassword);
            
            assert.ok(!resultMessage.includes("Invalid Login credentials..."), 
            "Login has failed. Email & Password do not match");
        }catch(e){
            console.log(e);
        }finally{
            await this.teardown();
        }
    }
}

const test = new LoginTest();
test.run();


