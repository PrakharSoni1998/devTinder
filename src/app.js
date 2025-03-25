const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignupData } = require("./utils/validate");
const app = express();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

const port = 7777;

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);
    let { firstName, lastName, emailId, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    };
    const user = new User(userData);
    await user.save();
    res.send("User signed up successfully.");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      console.log("qqq111");
      throw new Error("Invalid credentials");
    } else {
      const isValidPassword = await user.validatePassword(password)
      if (!isValidPassword) {
        console.log("qqq");
        
        throw new Error("Invalid credentials");
      } else {
        const token = await user.getJWT()
        res.cookie("token", token,{maxAge:4302002002});
        res.send("User logged in successfully");
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post("/connectionRequest", userAuth, async (req, res) => {
  try {
    console.log("here");
    res.send("testing");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

connectDB()
  .then(() => {
    console.log("DB connected");
    app.listen(port, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("err", err);
  });
