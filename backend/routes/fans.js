const express = require('express');
const User = require('../models/User');
const Prize = require('../models/Prize');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

// Get fan dashboard (requires authentication)
router.get('/dashboard', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const prizes = await Prize.find({ assignedTo: req.user.id });

    res.json({
      success: true,
      user: {
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        isSelected: user.isSelected,
        registeredAt: user.registeredAt
      },
      winnings: prizes
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update fan profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    const { fullName, phone, address } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { fullName, phone, address },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get fan's prizes
router.get('/prizes', authenticate, async (req, res) => {
  try {
    const prizes = await Prize.find({ assignedTo: req.user.id });
    res.json({
      success: true,
      prizes
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
