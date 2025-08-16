const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema(
  {
    bugType: {
      type: String,
      enum: ['Functional', 'User-Interface', 'Performance', 'Security', 'Database', 'API'],
      required: true
    },
    bugModule: {
      type: String,
      default: 'General'   // Default module
    },
    bugDescription: {
      type: String,
      default: 'No description provided' // Default description
    },
    refLink: {
      type: String,
      default: '' // Default empty string
    },
    requirement: {
      type: String,
      default: 'Not specified'
    },
    severity: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      default: 'Medium'   // Default severity
    },
    priority: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      default: 'Low'      // Default priority
    },
    status: {
      type: String,
      enum: ['Open', 'Ongoing', 'Closed', 'Reopen'],
      default: 'Open'     // Default status
    }
  },
  {
    timestamps: true,
  }
);

const Bug = mongoose.model('Bug', bugSchema);
module.exports = Bug;
