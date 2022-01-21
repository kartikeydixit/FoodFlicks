const express = require("express");
const User = require("./../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  console.log("failing here");
  console.log(req.headers);
  const token = req.headers["x-access-token"];
  console.log("or here");
  console.log(token);
  if (token == "null") {
    console.log("here is problem");
    return res.json({
      error: "Please Login First!",
    });
  } else {
    console.log("we are arriving here for verify");
    console.log(typeof token);
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    try {
      req.user = await User.findById(decodedData.id);
      next();
    } catch (error) {
      return res.json({
        error: "ERROR! , Not authenticated!",
      });
    }
  }
};

exports.isAdmin = (req, res, next) => {
  const role = req.user.role;
  if (role < 1) {
    return res.json({
      error: "Access Denied , you are not a Admin",
    });
  }

  next();
};

exports.verifyJWT = (req, res, next) => {};
