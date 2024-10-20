const express = require('express');  // Updated 'users' to 'express' for consistency
const Users = require('../models/userModel');

const router = express.Router();  // Updated 'users.Router()' to 'express.Router()'


router.post('/saveUsers', async (req, res) => {
  const { id, name, email, gender, status } = req.body;

  try {
    if (id) {
      // Update existing record
      await Users.findByIdAndUpdate(id, { name, email, gender, status });
      res.json({ status: true, internalMessage: 'Record updated successfully' });
    } else {
      // Create new record
      const newUsers = new Users({ name, email, gender, status });
      await newUsers.save();
      res.json({ status: true, internalMessage: 'Record saved successfully' });
    }
  } catch (error) {
    res.json({ status: false, internalMessage: 'Error saving record' });
  }
});


router.get('/getUsers', async (req, res) => {
  try {
    const users = await Users.find();
    res.json({ data: users });
  } catch (error) {
    res.json({ status: false, internalMessage: 'Error fetching records' });
  }
});


router.delete('/deleteUsers', async (req, res) => {
  const { id } = req.body;
  try {
    await Users.findByIdAndDelete(id);
    res.json({ status: true, internalMessage: 'Record deleted successfully' });
  } catch (error) {
    res.json({ status: false, internalMessage: 'Error deleting record' });
  }
});

// Separated the edit route from deleteUsers
router.post('/editUsers', async (req, res) => {
  const { id, name, email, gender, status } = req.body;
  try {
    await Users.findByIdAndUpdate(id, { name, email, gender, status });
    res.json({ status: true, internalMessage: 'Record updated successfully' });
  } catch (error) {
    res.json({ status: false, internalMessage: 'Error updating record' });
  }
});

module.exports = router;
