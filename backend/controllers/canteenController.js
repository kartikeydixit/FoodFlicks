const express = require("express");
const Canteen = require("./../models/canteenModel");

exports.getAllCanteens = async (req, res, next) => {
  try {
    const canteens = await Canteen.find();

    return res.json({
      canteens,
    });
  } catch (err) {
    return res.json({
      err,
    });
  }
};

exports.createCanteen = (req, res, next) => {
  const canteen = new Canteen(req.body);
  canteen.save((err, result) => {
    if (err || !result) {
      return res.json({
        error: "Unable to Create Canteen",
      });
    }

    return res.json({
      result,
    });
  });
};

exports.getCanteenById = (req, res, next) => {
  Canteen.findById(req.params.id, (err, canteen) => {
    if (err || !canteen) {
      return res.json({
        error: "Some error Occured",
      });
    }

    return res.json({
      canteen,
    });
  });
};

exports.updateCanteenById = (req, res, next) => {
  Canteen.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, result) => {
      if (err || !result) {
        return res.json({
          error: "Some error in Updating the document!",
        });
      }

      return res.json({
        result,
      });
    }
  );
};

exports.updateCanteenMenuById = (req, res, next) => {
  Canteen.findById(req.params.id, (err, canteen) => {
    if (err || !canteen) {
      return res.json({
        error: "Some error Occurred",
      });
    }

    var newArray = req.body.menu;
    var menuArray = [...canteen.menu, ...newArray];
    canteen.menu = menuArray;
    canteen.save();
    return res.json({
      canteen,
    });
  });
};

exports.removeCanteenById = (req, res, next) => {
  Canteen.findByIdAndDelete(req.params.id, (err, canteen) => {
    if (err || !canteen) {
      return res.json({
        error: "Some error occurred",
      });
    }

    return res.json({
      message: "Canteen Deleted from DB",
      canteen,
    });
  });
};

//This is not completed till now
exports.getItemBySearch = async (req, res, next) => {
  // const { menu } = req.body;
  const obj = {
    price: 100,
    item: "samosa",
  };

  try {
    const result = await Canteen.find({
      "menu.item": req.body.item,
    }).populate();
    return res.json({
      result,
    });
  } catch (err) {
    return res.json({
      error: "some error occured",
      err,
    });
  }
};
