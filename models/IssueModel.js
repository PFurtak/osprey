const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
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
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      text: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  resolved: {
    type: Boolean,
    default: false,
  },
  issueDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('issue', IssueSchema);
