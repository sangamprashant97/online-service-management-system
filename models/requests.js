const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const requestSchema = new mongoose.Schema(
  {
    reqInfo: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    DateAlloc: {
      type: String,
      default: null,
    },
    technicianAlloc: {
      type: String,
      default: null,
    },
    requestedBy: {
      type: ObjectId,
      ref: "OSMSUSER",
    },
  },
  { timestamps: true }
);

mongoose.model("OSMSREQUEST", requestSchema);
