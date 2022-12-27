const webdriver = require("selenium-webdriver");

module.exports = async (capabilities, uri) => {
  let driver = new webdriver.Builder()
    .usingServer(uri)
    .withCapabilities({
      ...capabilities,
      ...(capabilities["browser"] && { browserName: capabilities["browser"] }),
    })
    .build();
  try {
    await driver.get("https://flytant.com");
    setTimeout(async () => {
      await driver.executeScript(
        'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "all task done"}}'
      );
      await driver.quit();
    }, 60000);
  } catch (e) {
    await driver.executeScript(
      'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "Some elements failed to load!"}}'
    );
    await driver.quit();
  }
};
