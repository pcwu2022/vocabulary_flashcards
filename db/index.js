const express = require("express");
const path = require("path");
const app = express();
const port = 3001;
const cors = require("cors");

const handler = require(path.join(__dirname, "./handler/handler.js"));

app.use(express.json());
app.use(cors());

app.use(express.static("./public"));

app.get("/:dbName/*", (req, res) => {
  // dbName = test -> test.json
  let dbName = req.params.dbName;
  let pathArr = req.path.split("/").filter((el) => el !== "" && el !== dbName);
  let sendObj = {
    success: false,
    data: null,
  };
  handler
    .loadFile(path.join(__dirname, "./databases/", dbName + ".json"))
    .then((data) => {
      let target = data;
      for (let key of pathArr) {
        if (target === undefined) {
          sendObj.success = true;
          res.send(sendObj);
          return;
        }
        target = target[key];
      }
      sendObj.success = true;
      sendObj.data = target === undefined ? null : target;
      res.send(sendObj);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).json({ message: "Database not found" });
    });
});

app.post("/create", async (req, res) => {
  let dbName = req.query.dbName;
  let sendObj = {
    success: true,
  };
  if (dbName != undefined){
    await handler.createDb(dbName + ".json");
    res.send(sendObj);
  } else {
    sendObj.success = false;
    res.send(sendObj);
  }
});

app.post("/:dbName/*", (req, res) => {
  // dbName = test -> test.json
  let dbName = req.params.dbName;
  let pathArr = req.path.split("/").filter((el) => el !== "" && el !== dbName);
  let sendObj = {
    success: false,
  };
  let values = req.body;
  handler
    .loadFile(path.join(__dirname, "./databases/", dbName + ".json"))
    .then(async (data) => {
      let target = data;
      if (target === undefined) {
        await handler.createDb(dbName + ".json");
      }
      for (let i = 0; i < pathArr.length; i++) {
        if (target[pathArr[i]] === undefined) {
          target[pathArr[i]] = {};
        }
        target = target[pathArr[i]];
      }
      for (let key in values) {
        target[key] = values[key];
      }
      await handler.writeFile(
        path.join(__dirname, "./databases/", dbName + ".json"),
        data,
      );
      sendObj.success = true;
      res.send(sendObj);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).json({ message: "Database not found" });
    });
});

app.listen(port, () =>
  console.log(`Database app listening at http://localhost:${port}`),
);
