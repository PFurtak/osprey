const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Document = require('../models/DocumentModel');

// Post route for documents /api/documents
// Create a new document
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

// GET route for api/documents
// Gets all documents for logged in users
router.get('/', auth, async (req, res) => {
  try {
    const documents = await Document.find({}).sort({
      createDate: -1,
    });
    res.json(documents);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// PUT route for api/documents/:id
// Updates existing document
router.put('/:id', auth, async (req, res) => {
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

  const documentFields = {};
  if (name) documentFields.name = name;
  if (deviceSerialNumber)
    documentFields.deviceSerialNumber = deviceSerialNumber;
  if (deviceType) documentFields.deviceType = deviceType;
  if (deviceIP) documentFields.deviceIP = deviceIP;
  if (deviceLocation) documentFields.deviceLocation = deviceLocation;
  if (licenseStart) documentFields.licenseStart = licenseStart;
  if (licenseExpire) documentFields.licenseExpire = licenseExpire;
  if (notes) documentFields.notes = notes;

  try {
    let document = await Document.findById(req.params.id);
    if (!document) return res.status(404).json({ msg: 'Document not found.' });

    document = await Document.findByIdAndUpdate(
      req.params.id,
      { $set: documentFields },
      { new: true }
    );
    res.json(document);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error.');
  }
});

// DELETE route for api/documents/:id
// Delete document
router.delete('/:id', auth, async (req, res) => {
  try {
    let document = await Document.findById(req.params.id);
    if (!document) return res.status(404).json({ msg: 'Not Authorized' });

    await Document.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Document removed.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error.');
  }
});

module.exports = router;
