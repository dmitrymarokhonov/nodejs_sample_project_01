const express = require("express");
const { check, body } = require("express-validator");

const authController = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

router.get("/login", authController.getLogin);
router.post(
  "/login",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter valid email.")
      .custom((val, { req }) => {
        return User.findOne({ email: val }).then(userDoc => {
          if (!userDoc) {
            return Promise.reject(
              "Inserted email is not registered please sign-up as a new user"
            );
          }
        });
      }),
      // .normalizeEmail(),
    body(
      "password",
      "Please enter password with only numbers and text ant at least 5 characters."
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim()
  ],
  authController.postLogin
);

router.get("/signup", authController.getSignup);
router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        // if (value === "test@test.com") {
        //   throw new Error("This email address is forbidden.");
        // }
        // return true;
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject("E-Mail existst already, please pick another one.");
          }
        });
      }),
      // .normalizeEmail()
    body(
      "password",
      "Please enter a password with only numbers and text and at least 5 characters."
    )
      .isLength({ min: 5 })
      .trim()
      .isAlphanumeric(),
    body("confirmPassword").trim().custom((val, { req }) => {
      if (val !== req.body.password) {
        throw new Error("Passwords have to match!");
      }
      return true;
    })
  ],
  authController.postSignup
);

router.get("/reset", authController.getReset);
router.post("/reset", authController.postReset);

router.post("/logout", authController.postLogout);

router.get("/reset/:token", authController.getNewPassword);
router.post("/new-password", authController.postNewPassword);

module.exports = router;
