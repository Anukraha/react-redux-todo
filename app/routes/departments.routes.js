const express = require('express');
const router = express.Router();
const Department = require('../models').departments; // Assuming you have a Department model

// Route to create a new department
router.post('/', async (req, res) => {
  try {
    const { dept_name } = req.body; // Assuming the department name is sent in the request body
    const newDepartment = await Department.create({ dept_name });
    res.status(201).json(newDepartment);
  } catch (error) {
    console.error('Error creating department:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
