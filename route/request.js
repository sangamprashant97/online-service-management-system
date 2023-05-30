const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const OSMSUSER = mongoose.model("OSMSUSER");
const OSMSREQUEST = mongoose.model("OSMSREQUEST");
const requireLoginUser = require("../middleware/requireLoginUser")


// Create a new request
router.post("/api/user/request/make", requireLoginUser, async (req, res) => {
  try {
    const {reqInfo,description,name,address1,address2,city,state,zip,email,mobile,date,} = req.body;

    if (!reqInfo || !description || !name || !address1 || !address2 || !city || !state || !zip || !email || !mobile || !date) {
      return res.status(422).json({ error: "Please fill in all the fields" });
    }

    const request = new OSMSREQUEST({reqInfo,description,name,address1,address2,city,state,zip,email,mobile,date,requestedBy: req.user._id,});

    const savedRequest = await request.save();
    if (savedRequest) {
      return res.json({ message: "Request created successfully" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});
router.get('/api/requests/made/history', requireLoginUser,async (req, res) => {
  try {
    const userId = req.user._id;

    // Find all requests where the requestedBy field matches the user ID
    const allRequests = await OSMSREQUEST.find({ requestedBy: userId });

    // Separate the requests into two arrays based on the technicianAlloc field
    const requestsWithTechnician = allRequests.filter((req) => req.technicianAlloc !== null);
    const requestsWithoutTechnician = allRequests.filter((req) => req.technicianAlloc === null);

    res.status(200).json({ 
      requestsWithTechnician: requestsWithTechnician, 
      requestsWithoutTechnician: requestsWithoutTechnician 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
