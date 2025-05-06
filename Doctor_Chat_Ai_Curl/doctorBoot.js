const { Builder, Browser, By, until } = require("selenium-webdriver");
require('dotenv').config();


(async function example() {
  
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get(process.env.websiteNameBoot);

    const button = await driver.wait(
      until.elementLocated(By.css("button.w-\\[110px\\]")),
      5000
    );
    await driver.executeScript("arguments[0].click();", button);

    await driver.sleep(3000);

    await driver
      .findElement(By.tagName("textarea"))
      .sendKeys("hello doctor help me");

    const sendButton = await driver.wait(
      until.elementLocated(By.css('button[type="submit"]')),
      5000
    );
    await driver.executeScript("arguments[0].click();", sendButton);

    await driver.sleep(5000);

    allBubbles = await driver.findElements(
      By.xpath(
        "//div[contains(@class, 'chat-bubble') and contains(@class, 'bg-turquoise')]"
      )
    );

    if (allBubbles.length === 0) {
      console.log("answer no.");
    } else {
      const lastBubble = allBubbles[allBubbles.length - 1];
      const responseText = await lastBubble.getText();
      console.log("Hello i doctor", responseText.slice(17));
    }
  } finally {
    await driver.quit();
  }
})();
