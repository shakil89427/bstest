const webdriver = require("selenium-webdriver");

module.exports = async (capabilities, authUri, url, waitTime) => {
  let driver = new webdriver.Builder()
    .usingServer(authUri)
    .withCapabilities({
      ...capabilities,
      ...(capabilities["browser"] && { browserName: capabilities["browser"] }),
    })
    .build();
  try {
    await driver.get(url);
    await new Promise((resolve) => setTimeout(resolve, waitTime));
    await driver.executeScript(
      'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "all task done"}}'
    );
  } catch (e) {
    await driver.executeScript(
      'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "Some elements failed to load!"}}'
    );
  }
  await driver.quit();
};
