const User = require("../model/user")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

exports.register = async (req, res, next) => {
    const { username, password } = req.body
    if (password.length < 6) {
      return res.status(400).json({ message: "Password less than 6 characters" })
    }
    try {
        bcrypt.hash(password, 10).then(async (hash) => {
            await User.create({
              username,
              password: hash,
            })
            .then((user) => {
                const maxAge = 3 * 60 * 60;
                const token = jwt.sign(
                    { 
                        id: user._id, 
                        username, 
                        role: user.role 
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: maxAge, // 3hrs in sec
                    })
                res.status(201).json({
                    message: "User successfully created",
                    result: {
                        token,
                        user
                    }
                })
            })
            .catch((error) =>
                res.status(400).json({
                    message: "User not successful created",
                    error: error.message,
                })
            )
          })
    } catch (err) {
      res.status(401).json({
        message: "User not successful created",
        error: error.mesage,
      })
    }
}

exports.login = async (req, res, next) => {
    const { username, password } = req.body
    // Check if username and password is provided
    if (!username || !password) {
      return res.status(400).json({
        message: "Username or Password not present",
      })
    }
    try {
      const user = await User.findOne({ username })
      if (!user) {
        res.status(400).json({
          message: "Login not successful",
          error: "User not found",
        })
      } else {
        // comparing given password with hashed password
        bcrypt.compare(password, user.password).then(function (result) {
            if (result) {
                const maxAge = 3 * 60 * 60;
                const token = jwt.sign(
                  { id: user._id, username, role: user.role },
                  process.env.JWT_SECRET,
                  {
                    expiresIn: maxAge, // 3hrs in sec
                  }
                )
                res.status(201).json({
                    message: "User successfully Logged in",
                    result: {
                        token,
                        user
                    }
                })
            } else {
                res.status(400).json({ message: "Login not succesful" });
            }
        })
      }
    } catch (error) {
      res.status(400).json({
        message: "An error occurred",
        error: error.message,
      })
    }
}