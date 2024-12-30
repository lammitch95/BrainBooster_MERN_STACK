import { By, until } from "selenium-webdriver";

export async function createStudySet(driver) {

    console.log("CreateStudySet Utilities Called");

    const studySetTitle = "Space Exploration Trivia";
    const descriptionText = "";
    const qaList = [
        {question: "What was the name of the first manned mission to land on the Moon?", answer: "Apollo 11"},
        {question: "Which planet is known as the Red Planet?", answer: "Mars" },
        {question: "What is the name of the largest moon of Jupiter?", answer: "Ganymede" },
        {question: "Which space telescope has provided images of distant galaxies since 1990?", answer: "Hubble Space Telescope" },
        {question: "Who was the first human to travel into space?", answer: "Yuri Gagarin" },
        {question: "What is the term for a star that has exploded in a brilliant burst of light?", answer: "Supernova" },
    ];

    const scrollToElement = async (element) => {
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", element);
    };

     // Wait and click "Create" button on nav bar
    const createBtn = await driver.wait(
        until.elementLocated(By.xpath("//div[contains(@class,'group-create')]//label[text()='create']")),
        5000
    );
    await driver.wait(until.elementIsVisible(createBtn), 5000); 
    await driver.wait(until.elementIsEnabled(createBtn), 5000);

    await createBtn.click();
    console.log("Clicked Create button");

    // Wait and click "Study Set" button on create selection bar
    const studySetBtn = await driver.wait(
        until.elementLocated(By.xpath("//div[contains(@class,'createSetMenu')]//button[@class='createItem']//label[text()='Study Set']")),
        5000
    );
    
    // Ensure element is not only visible but also interactable
    await driver.wait(until.elementIsVisible(studySetBtn), 10000);
    await driver.wait(until.elementIsEnabled(studySetBtn), 10000);

    await driver.executeScript("arguments[0].click();", studySetBtn);
    console.log("Clicked Study Set button");

    await driver.wait(until.urlContains("create-set"), 5000); 

    let titleField = await driver.findElement(By.xpath("//input[@class='createSet-title']"));
    scrollToElement(titleField);
    titleField.sendKeys(studySetTitle);

    let descriptionField = await driver.findElement(By.xpath("//textarea[@class='createSet-description']"));
    scrollToElement(descriptionField);
    descriptionField.sendKeys(descriptionText);

    for (let i = 0; i <= qaList.length; i++) {
        if (i > 4) {
            let addCardButton = await driver.findElement(By.xpath("//button[@class='newCardBtn']"));
            await scrollToElement(addCardButton);
            await driver.wait(until.elementIsVisible(addCardButton), 5000);
            await driver.wait(until.elementIsEnabled(addCardButton), 5000);
            await addCardButton.click();
        }

        let termField = await driver.wait(
            until.elementLocated(By.id(`term-${i+1}`)),
            5000
        );
        await scrollToElement(termField);
        await termField.sendKeys(qaList[i].question);

        let defField = await driver.wait(
            until.elementLocated(By.id(`def-${i+1}`)),
            5000
        );
        await scrollToElement(defField);
        await defField.sendKeys(qaList[i].answer);
    } 

    return "Card Set Created";
}