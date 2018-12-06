const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
  console.log("First always");
  next();
});
app.use("/add-product", (req, res, next) => {
  console.log("In /add-product middleware!");
  res.send("<h1>Add Product Page</h1>");
});
app.use("/", (req, res, next) => {
  console.log("In /root middleware!");
  res.send("<h1>Hello from exppress!</h1>");
});

app.listen(3000);