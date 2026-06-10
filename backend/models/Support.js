const mongoose = require('mongoose');

const supportSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    required: [true, 'Please provide a subject']
  },
  message: {
    type: String,
    required: [true, 'Please provide a message']
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved', 'closed'],
    default: 'open'
  },
  attachments: [String],
  replies: [
    {
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      message: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  resolvedAt: Date,
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// Generate ticket ID before saving
supportSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await mongoose.model('Support').countDocuments();
    this.ticketId = `TSK-${Date.now()}-${count + 1}`;
  }
  next();
});

module.exports = mongoose.model('Support', supportSchema);
