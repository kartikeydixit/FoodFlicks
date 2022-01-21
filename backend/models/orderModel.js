const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderCartSchema = new mongoose.Schema({
  itemsDetail: [
    {
      mainitem: {
        item: String,
        price: Number,
      },
      count: Number,
      totalprice: Number,
      canteen: {
        type: String,
      },
    },
  ],
  totalAmount: {
    type: Number,
    default: 0,
  },
  user: {},
});

module.exports = mongoose.model("OrderCart", orderCartSchema);
