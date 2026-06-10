const express = require('express');
const Prize = require('../models/Prize');
const { authenticate, adminOnly } = require('../middleware/auth');
const router = express.Router();

// Get all available prizes
router.get('/available', async (req, res) => {
  try {
    const prizes = await Prize.find({ status: 'available' });
    res.json({
      success: true,
      prizes
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create new prize (admin only)
router.post('/create', authenticate, adminOnly, async (req, res) => {
  try {
    const { name, description, value, category, imageUrl } = req.body;
    
    const prize = new Prize({
      name,
      description,
      value,
      category,
      imageUrl
    });
    
    await prize.save();
    
    res.status(201).json({
      success: true,
      message: 'Prize created successfully',
      prize
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Assign prize to fan (admin only)
router.put('/assign/:prizeId', authenticate, adminOnly, async (req, res) => {
  try {
    const { fanId } = req.body;
    const prize = await Prize.findByIdAndUpdate(
      req.params.prizeId,
      { assignedTo: fanId, status: 'assigned' },
      { new: true }
    ).populate('assignedTo');

    res.json({
      success: true,
      message: 'Prize assigned successfully',
      prize
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
