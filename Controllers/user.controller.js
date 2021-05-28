const User = require("../Models/users.model");
const jwt = require("jsonwebtoken");
const {
  emailIdCheck,
  hashingPasswords,
  confirmPasswordCheck,
} = require("../Utils/userUtils");
const bcrypt = require("bcrypt");

const signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  let data = null;
  if (!name && !email && !password && !emailIdCheck(email)) {
    return res.status(400).json({
      ok: false,
      message: "Invalid Request",
    });
  }
  try {
    if (await User.findOne({ email: email })) {
      return res.status(409).json({
        ok: false,
        message: "User Already exists in the system",
      });
    }
    const newPassword = await hashingPasswords(password);
    data = await User.create({
      name: name,
      email: email,
      password: newPassword,
    });
    if (data) {
      return res.status(201).json({
        ok: true,
        message: "User Added Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      message: "Unable to create new user please try again later",
    });
  }
};

const changePassword = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  try {
    if (confirmPasswordCheck(password, confirmPassword)) {
      return res.status(405).json({
        ok: false,
        message: "Passwords are invalid",
      });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      const newPassword = await hashingPasswords(password);
      await user.update({ password: newPassword });
      return res.status(200).json({
        ok: true,
        message: "Password Updated Successfully",
      });
    } else {
      return res.status(404).json({
        ok: false,
        message: "invalid Email ID",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      message: "Unable to update password please try again later",
    });
  }
};

const signinUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({
        ok: false,
        message: "Invalid username or password",
      });
    }
    return res.status(200).json({
      message: "Sign in successful, here is your token, please keep it safe!",
      data: {
        ok: true,
        token: jwt.sign({ userId: user._id }, process.env["SECRET"], {
          expiresIn: "24h",
        }),
        userName: user.name,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      message: "Unable to signin user please try again later",
    });
  }
};

module.exports = { signupUser, changePassword, signinUser };
