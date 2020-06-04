const mongoose = require('mongoose');

const IssueSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  deviceName: {
    type: String,
    required: true,
  },
  deviceIP: {
    type: String,
  },
  deviceLocation: {
    type: String,
  },
  issueType: {
    type: String,
    required: true,
  },
  issueSeverity: {
    type: String,
  },
  issueDescription: {
    type: String,
    required: true,
  },
  issueDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('issue', IssueSchema);
