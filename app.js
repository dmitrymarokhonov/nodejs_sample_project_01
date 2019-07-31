const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const mongoose = require("mongoose");

const pageNotFoundController = require("./controllers/404");
const User = require("./models/user");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById('5d4049153b902028c05b7ffe')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(favicon(path.join(__dirname, 'images', 'icons8-laptop-50.png')));

app.use(pageNotFoundController);

mongoose
  .connect(
    "mongodb+srv://dmitry:OvOTvIZHoxySg5PN@cluster0-qvwe4.mongodb.net/shop?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: "Dmitry Marokhonov",
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
