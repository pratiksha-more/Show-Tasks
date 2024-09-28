const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { log } = require("console");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  fs.readdir(`./files`, function (err, files) {
    // console.log(files);
    res.render("index", { files: files });
  });
});

app.post("/create", function (req, res) {
  fs.writeFile(
    `./files/${req.body.title.split(` `).join(``)}.txt`,
    req.body.details,
    function (err) {
      res.redirect("/");
    }
  );
});

app.get("/file/:filename", function (req, res) {
  fs.readFile(
    `./files/${req.params.filename}`,
    "utf-8",
    function (err, filedata) {
      // console.log(filedata);
      res.render("showdata", {
        filename: req.params.filename,
        filedata: filedata,
      });
    }
  );
});

app.get("/edit/:filename", function (req, res) {
  res.render(`edit`, { filename: req.params.filename });
});


app.listen(5000, () => {
  console.log("Server start on port : 5000");
});
