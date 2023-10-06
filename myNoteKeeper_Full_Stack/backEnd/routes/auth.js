const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SEC = "sdhfhb!#$321jkbda!#$398";

// ROUTE 1:
//create user using POST: /api/auth : No authentication required
router.post(
  "/createuser",
  // using validation to verify valid inputs
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],

  // creating async fucntion to wait upon responses from database
  async (req, res) => {
    let success = false;
    const errors = validationResult(req); // getting the results from the validation (if this is not empty then, validation failed)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // now, checking if another user with same email exists or not
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "User with email already exists!" });
      }

      // if new user is unique then, create new entry in database

      // generating hash and salt
      const salt = await bcrypt.genSalt(10); // salt
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      console.log("id " + user.id);
      const data = {
        user: {
          id: user.id,
        },
      };

      // creating an authentication token and sending that instead of user details
      const authToken = jwt.sign(data, JWT_SEC);
      // console.log(authToken);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      // if any error, then this will catch it rather than crashing the server
      console.error("Error in create user\n" + error);
      res.status(500).send("Internal Server Error!");
    }
  }
);

// ROUTE 2:
// authenticate a user: No login required
router.post(
  "/login",
  [
    // using validation to verify valid inputs
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank!").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req); // getting the results from the validation (if this is not empty then, validation failed)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Login with proper credentials!" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success, error: "Login with proper credentials!" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      // creating an authentication token and sending that instead of user details
      success = true;
      const authToken = jwt.sign(data, JWT_SEC);
      res.json({ success, authToken });
    } catch (error) {
      console.error("Error in Login\n" + error);
      res.status(500).send("Internal Server Error!");
    }
  }
);

// ROUTE 3:
// get logged in user's credentials. Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error("Error in getuser\n" + error);
    res.status(500).send("Internal Server Error!");
  }
});

module.exports = router;
