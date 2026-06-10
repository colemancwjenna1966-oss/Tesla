const express = require('express');
const Support = require('../models/Support');
const { authenticate, adminOnly } = require('../middleware/auth');
const router = express.Router();

// Create support ticket (fan)
router.post('/create', authenticate, async (req, res) => {
  try {
    const { subject, message, priority } = req.body;
    
    const ticket = new Support({
      userId: req.user.id,
      subject,
      message,
      priority: priority || 'medium'
    });
    
    await ticket.save();
    
    res.status(201).json({
      success: true,
      message: 'Support ticket created successfully',
      ticket
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get fan's support tickets
router.get('/my-tickets', authenticate, async (req, res) => {
  try {
    const tickets = await Support.find({ userId: req.user.id })
      .populate('userId', 'fullName email')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      tickets
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Reply to ticket (fan and admin)
router.post('/reply/:ticketId', authenticate, async (req, res) => {
  try {
    const { message } = req.body;
    
    const ticket = await Support.findByIdAndUpdate(
      req.params.ticketId,
      {
        $push: {
          replies: {
            author: req.user.id,
            message
          }
        }
      },
      { new: true }
    ).populate('replies.author', 'fullName role');
    
    res.json({
      success: true,
      message: 'Reply added successfully',
      ticket
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all tickets (admin only)
router.get('/all', authenticate, adminOnly, async (req, res) => {
  try {
    const tickets = await Support.find()
      .populate('userId', 'fullName email phone')
      .populate('replies.author', 'fullName role')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      tickets
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update ticket status (admin only)
router.put('/update/:ticketId', authenticate, adminOnly, async (req, res) => {
  try {
    const { status, assignedTo } = req.body;
    
    const ticket = await Support.findByIdAndUpdate(
      req.params.ticketId,
      { 
        status,
        assignedTo,
        ...(status === 'resolved' && { resolvedAt: new Date() })
      },
      { new: true }
    );
    
    res.json({
      success: true,
      message: 'Ticket updated successfully',
      ticket
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
