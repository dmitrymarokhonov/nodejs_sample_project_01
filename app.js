const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const indexRoute = require("./routes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(indexRoute);


app.listen(3000);
