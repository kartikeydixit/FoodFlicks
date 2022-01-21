const mongoose = require("mongoose");

const canteenSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  location: {
    type: String,
  },
  menu: [
    {
      item: String,
      price: Number,
    },
  ],
  opening_time: {
    type: Date,
  },
  closing_time: {
    type: Date,
  },
});

module.exports = mongoose.model("Canteen", canteenSchema);
