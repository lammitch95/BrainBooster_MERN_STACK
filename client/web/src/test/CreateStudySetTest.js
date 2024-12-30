import assert from 'assert';
import BaseTest from './BaseTest.js';
import { login } from './utils/LoginUtils.js';
import { createStudySet } from './utils/CreateStudySetUtil.js';

class CreateStudySetTest extends BaseTest{
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

                console.log("Login Utilities Called");
                let resultmessage = await login(this.driver, testEmail, testPassword);

                console.log("CreateStudySet Utilities Called");
                const endMessage = await createStudySet(this.driver);
                assert.ok(endMessage.includes("Card Set Created"),
                    "Study Set is Good");    
             

           }catch(e){
               console.log(e);
           }finally{
               await this.teardown();
           }
       }
};

const test = new CreateStudySetTest();
test.run();