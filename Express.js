const express = require("express");

const app = express();

// app.use((req, res, next) => {
//   console.log("Function 1");
//   next();
// });
// app.use((req, res, next) => {
//   console.log("Function 2");
//   res.send("<p>One response returned</p>");
// });
const handleMiddleware = (res, message) => {
    res.send(`<p>One response returned from ${message}</p>`)
}

app.use("/users", (req, res, next) => {
    console.log("Users route");
    handleMiddleware(res, "users route");
});
app.use("/", (req, res, next) => {
  console.log("Root route");
  handleMiddleware(res, "root route");
});



app.listen(3000);
