const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateSignupData } = require("../utils/validate");

const signup = async (req, res) => {
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
    const savedUser =await user.save();
    const token = await savedUser.getJWT();
    res.cookie("token", token, { expires:  new Date(Date.now() + 8 * 3600000) });
    res.send({data:savedUser,status:201,message:"User signed up successfully"});
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      console.log("qqq111");
      throw new Error("Invalid credentials");
    } else {
      const isValidPassword = await user.validatePassword(password);
      if (!isValidPassword) {
        console.log("qqq");

        throw new Error("Invalid credentials");
      } else {
        const token = await user.getJWT();
        res.cookie("token", token, { expires:  new Date(Date.now() + 8 * 3600000) });
        res.send({data:user,status:200,message:"User logged in successfully"});
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const logout = async (req, res) => {
  res.cookie("token", null, { maxAge: new Date().getTime() });
  res.send("Logout successfully.")
};

module.exports = {
  signup,
  login,
  logout
};
