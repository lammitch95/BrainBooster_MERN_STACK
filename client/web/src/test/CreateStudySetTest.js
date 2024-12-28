import assert from 'assert';
import {Builder,By, until} from 'selenium-webdriver';

async function CreateStudySetTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost:5173/home');
    await driver.manage().window().maximize();
};

CreateStudySetTest();