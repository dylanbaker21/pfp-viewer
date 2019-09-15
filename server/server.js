//const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");

// port to run server on
const API_PORT = 3001;

// use cors to bypass cross-origin security
const app = express();
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const router = express.Router();

// (optional) only used for logging and
// parsing the request body to be readable json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// NO-AUTH: Test Route
router.get("/test/:id", (req, res) => {
  console.log(req.params.id);
  axios.get(`https://vsco.co/${req.params.id}`).then(response => {
    const $ = cheerio.load(response.data);
    let fullPicLink = $(".css-147a4kv").attr("src");
    let trimmedPicLink = fullPicLink.split("?")[0];
    res.json({
      profilePic: trimmedPicLink
    });
  });
});

// append /api for our http requests
app.use("/api", router);

// launch backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
