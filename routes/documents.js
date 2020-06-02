const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Document = require('../models/DocumentModel');

// Post route for documents /api/documents
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required.').not().isEmpty(),
      check('deviceType', 'Device type is required.').not().isEmpty(),
    ],
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      name,
      deviceSerialNumber,
      deviceType,
      deviceIP,
      deviceLocation,
      licenseStart,
      licenseExpire,
      notes,
    } = req.body;

    try {
      const newDocument = new Document({
        name,
        deviceSerialNumber,
        deviceType,
        deviceIP,
        deviceLocation,
        licenseStart,
        licenseExpire,
        notes,
        user: req.user.id,
      });
      const document = await newDocument.save();
      res.json(document);
    } catch (error) {
      console.error('Error: ', error);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
