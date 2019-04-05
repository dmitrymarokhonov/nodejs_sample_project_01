const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const pageNotFoundController = require("./controllers/404");
const User = require("./models/user");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById(`5c7bdcfe80e0a72b684a014a`)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(pageNotFoundController);

mongoose
  .connect(
    "mongodb+srv://dmitry:KUyt17sX88iDUKnM@cluster0-qvwe4.mongodb.net/mongoose_shop?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(() => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: "Dima",
          email: "dmitry.marokhnonov@gmail.com",
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => console.log(err));
