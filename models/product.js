
const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    DOP: {
      type: String,
      required: true,
    },
    Available: {
      type: Number,
      required: true,
    },
    Total: {
      type: Number,
      required: true,
    },
    OCE: {
      type: Number,
      required: true,
    },
    SPE: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("OSMSPRODUCT", productSchema);

module.exports = Product;
