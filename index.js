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
    if (!Array.isArray(req.body.authData)) return res.send("Auth required");
    req.body.authData.forEach((auth) => {
      const uri = `http://${auth}@hub-cloud.browserstack.com/wd/hub`;
      runTest(createBrowser(1), uri);
      runTest(createBrowser(2), uri);
      runTest(createBrowser(3), uri);
      runTest(createBrowser(4), uri);
      runTest(createBrowser(5), uri);
    });
    res.send("Command Started");
  } catch (error) {
    res.send("Something went wrong");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
