const express = require("express");
const User = require("./../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = (req, res, next) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.json({
      error: "Fill All the fields",
    });
  }
  User.findOne({ email: req.body.email }, (err, prevUser) => {
    if (prevUser) {
      return res.json({
        error: "This email already exists!!",
      });
    }

    bcrypt.genSalt(2, (err, salt) => {
      if (err || !salt) {
        return res.json({
          error: "Some error Occurred",
        });
      }
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err || !hash) {
          return res.json({
            error: "Some error Occurred",
          });
        }
        req.body.password = hash;
        const user = new User(req.body);
        user.save((err, result) => {
          if (err || !result) {
            return res.json({
              error: "Some error Occurred",
            });
          }

          return res.json({
            result,
          });
        });
      });
    });
  });
};

exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      error: "Fill all the fields!",
    });
  }

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.json({
        error: "Some error Occurred",
      });
    }

    if (user == null) {
      return res.json({
        error: "Email or password is invalid!",
      });
    }

    bcrypt
      .compare(req.body.password, user.password)
      .then((result) => {
        if (result == false) {
          return res.json({
            error: "Email or password is invalid!",
          });
        } else {
          // Creating token for logged user
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "2d",
          });

          return res.json({
            message: "LogIn Successfull",
            token,
            user,
          });
        }
      })
      .catch((err) => {
        return res.json({
          error: "Some error Occurred",
        });
      });
  });
};

exports.logoutUser = (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  return res.json({
    message: "Logged Out successfully",
  });
};

exports.userProfile = (req, res, next) => {
  console.log("reaching to user profile");
  req.user.password = undefined;
  const user = req.user;
  return res.json({
    user,
  });
};

exports.getUserById = (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err || !user) {
      return res.json({
        error: "Some error Occurred",
      });
    }

    return res.json({
      user,
    });
  });
};

exports.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err || !users) {
      return res.json({
        error: "Some error Occured",
      });
    }

    return res.json({
      users,
    });
  });
};
