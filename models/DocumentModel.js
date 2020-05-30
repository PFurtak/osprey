const mongoose = require('mongoose');

const DocumentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  deviceSerialNumber: {
    type: String,
  },
  deviceType: {
    type: String,
    required: true,
  },
  deviceIP: {
    type: String,
  },
  deviceLocation: {
    type: String,
  },
  licenseStart: {
    type: Date,
  },
  licenseExpire: {
    type: Date,
  },
  notes: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('document', DocumentSchema);
