// index.js
// where your node app starts

// init project
require("dotenv").config();
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// print full http header response
app.get("/api/header", (req, res) => {
  res.json({"header": req.headers})
});

// print language from header
app.get("/api/lang", (req, res, next) => {
  req.lang = req.headers["accept-language"]
  next();
}, (req, res) => {
  res.json({"language": req.lang})
});

// print whoami endpoint
app.get("/api/whoami", (req, res, next) => {
  req.hostname = req.headers["host"]
  req.lang = req.headers["accept-language"]
  req.software = req.headers["user-agent"]
  next();
}, (req, res) => {
  res.json({
    "ipaddress": req.hostname,
    "language": req.lang,
    "software": req.software,
  })
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
