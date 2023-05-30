const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Jwt_secret  = process.env.JWT_SECRET
const OSMSADMINUSER = mongoose.model("OSMSADMINUSER");
const OSMSUSER = mongoose.model("OSMSUSER");
const OSMSREQUEST = mongoose.model("OSMSREQUEST");
const OSMSTECHNECIAN = mongoose.model("OSMSTECHNECIAN");
const requireLoginAdmin = require("../middleware/requireLoginAdmin")

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

router.post("/api/admin/signup", async (req, res) => {
  const { name, email, password} = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ error: "Please fill in all the fields" });
  }

 
  if (!emailRegex.test(email)) {
    return res.status(422).json({ error: "Invalid email" });
  }


  try {
    const existingUser = await OSMSADMINUSER.findOne({  email:email });
    if (existingUser) {
      return res
        .status(422)
        .json({ error: "User already exists with that email or mobile number" });
    }

    // Save user to database
    const hashedPassword = await bcrypt.hash(password, 12);

    const userec = new OSMSADMINUSER({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await userec.save();
    if (savedUser) {
      return res.json({ message: "Registered successfully" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});
//signin
router.post("/api/admin/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Please add email and password" });
  } else if (!emailRegex.test(email)) {
    return res.status(422).json({ error: "Invalid email" });
  } 

  OSMSADMINUSER.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "no user with this email" });
    }

    bcrypt
      .compare(password, savedUser.password)
      .then((match) => {
        if (match) {
          const token = jwt.sign({ _id: savedUser.id }, Jwt_secret);
          const { _id, name, email,admin } = savedUser;
          res.json({ token, user: { _id, name, email,admin} });
        } else {
          return res.status(422).json({ error: "Invalid password" });
        }
      })
      .catch((err) => console.log(err));
  });
});
// PUT request to change user's password
router.put('/api/admin/password', requireLoginAdmin, async (req, res) => {
  try {
    // Get the current user's ID from the authMiddleware
    const userId = req.user._id;

    // Find the user by their ID
    const user = await OSMSADMINUSER.findById(userId);

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Check if the current password provided in the request body matches the user's current password
    const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid current password' });
    }
    if (req.body.currentPassword===req.body.newPassword) {
      return res.status(400).json({ error: "New Password Can't Be Old Password" });
    }

    // Hash the new password provided in the request body
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 12);

    // Update the user's password with the new hashed password
    user.password = hashedPassword;

    // Save the updated user to the database
    await user.save();

    // Return a success message with the updated user object
    res.json({ message: 'User password updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});
// GET request to retrieve all users
router.get("/api/admin/allusers", async (req, res) => {
  try {
    // Find all users in the database and return them as an array
    const users = await OSMSUSER.find();

    // If there are no users, return an empty array
    if (!users) {
      return res.json([]);
    }

    // Return the array of users as the response
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
//admi cont 
router.get("/api/admin/workCounts", async (req, res) => {
  try {
    const works = await OSMSREQUEST.find();
    const technicians = await OSMSTECHNECIAN.find();

    const nullTechCount = works.filter((work) => work.technicianAlloc === null).length;
    const notNullTechCount = works.filter((work) => work.technicianAlloc !== null).length;
    const totalWorks = works.length;
    const totalTechnicians = technicians.length;

    res.json({
      nullTechCount,
      notNullTechCount,
      totalWorks,
      totalTechnicians,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
//workdone count
router.get("/api/admin/workdone", async (req, res) => {
  try {
    const users = await OSMSREQUEST.find({ technicianAlloc: { $ne: null } }).exec();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post("/api/admin/user/add", async (req, res) => {
  const { name, email, password} = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ error: "Please fill in all the fields" });
  }

 
  if (!emailRegex.test(email)) {
    return res.status(422).json({ error: "Invalid email" });
  }


  try {
    const existingUser = await OSMSUSER.findOne({  email:email });
    if (existingUser) {
      return res
        .status(422)
        .json({ error: "User already exists with that email" });
    }

    // Save user to database
    const hashedPassword = await bcrypt.hash(password, 12);

    const userec = new OSMSUSER({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await userec.save();
    if (savedUser) {
      return res.json({ message: "User Registered successfully" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});
// Delete a user by ID
router.delete('/api/user/delete/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const deletedUser = await OSMSUSER.findOneAndDelete({ _id: userId });
    if (!deletedUser) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
//getting un assigned requests 
router.get('/api/admin/requests/unassigned', async (req, res) => {
  try {
    const requests = await OSMSREQUEST.find({ technicianAlloc: null }).populate('requestedBy');
    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//find the requst to assign the technician
// Find request by ID
router.get("/api/requests/:requestId", (req, res) => {
  OSMSREQUEST.findById(req.params.requestId)
    .populate("requestedBy", "_id name email")
    .then((request) => {
      if (!request) {
        return res.status(404).json({ error: "Request not found" });
      }
      res.json(request);
    })
    .catch((err) => {
      return res.status(500).json({ error: "Internal server error" });
    });
});
//to allocate technician and date to serve 
router.put("/api/requests/:requestId", (req, res) => {
  const { technicianAlloc, DateAlloc } = req.body;
  if (!technicianAlloc|| !DateAlloc) {
    return res.status(404).json({ error: "Please Enter Technician and Date " });
  }
  OSMSREQUEST.findByIdAndUpdate(
    req.params.requestId,
    {
      technicianAlloc,
      DateAlloc,
    },
    { new: true }
  )
    .populate("requestedBy", "_id name email")
    .then((request) => {
      if (!request) {
        return res.status(404).json({ error: "Request not found" });
      }
      console.log(request);
      res.json(request);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;
