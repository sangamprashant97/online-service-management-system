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
const OSMSPRODUCT = mongoose.model("OSMSPRODUCT");
const requireLoginAdmin = require("../middleware/requireLoginAdmin")



// POST request to create a new product
router.post('/api/add/products', async (req, res) => {
    const { name, DOP, Total, OCE, SPE,}=req.body
    if(!name|| !DOP|| !Total|| !OCE|| !SPE){
      return res.status(500).json({ error: 'Please enter all the fields' });
    }
    try {
      
      const newProduct = new OSMSPRODUCT({
        name,
        DOP,
        Available:Total,
        Total,
        OCE,
        SPE,
      });
  
      const savedProduct = await newProduct.save();
      return res.status(200).json({ message: ' Product Added Succesfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  });

//Product to get
router.get('/api/admin/products', async (req, res) => {
  try {
    const products = await OSMSPRODUCT.find({});
    res.status(200).json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// Delete product by ID
router.delete('/api/products/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedProduct = await OSMSPRODUCT.findByIdAndDelete(productId);
    if (!deletedProduct) {
      res.status(200).json({ error: ' Product  Not Found' });
    } else {
      res.status(200).json({ message: ' Product Deleted Succesfully' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
  module.exports = router;
