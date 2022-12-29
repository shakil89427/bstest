require("dotenv").config();
const express = require("express");
const app = express();
const createBrowser = require("./createBrowser");
const runTest = require("./runTest");
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => res.send("Server running"));
app.post("/", (req, res) => {
  try {
    const { authData, url, waitFrom, waitTill } = req.body;
    if (!authData || !url || !waitFrom || !waitTill) {
      return res.send("invalid params");
    }
    if (
      !Array.isArray(authData) ||
      typeof waitFrom !== "number" ||
      typeof waitTill !== "number"
    ) {
      return res.send("invalid params");
    }
    if (waitFrom > waitTill) {
      return res.send("invalid params");
    }
    const waitTime = () => {
      return Math.floor(Math.random() * (waitTill - waitFrom + 1)) + waitFrom;
    };
    authData.forEach((auth) => {
      const authUri = `http://${auth}@hub-cloud.browserstack.com/wd/hub`;
      runTest(createBrowser(1), authUri, url, waitTime());
      runTest(createBrowser(2), authUri, url, waitTime());
      runTest(createBrowser(3), authUri, url, waitTime());
      runTest(createBrowser(4), authUri, url, waitTime());
      runTest(createBrowser(5), authUri, url, waitTime());
    });
    res.send("Command Started");
  } catch (error) {
    res.send("Something went wrong");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
