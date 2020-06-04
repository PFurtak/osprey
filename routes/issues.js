const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Issue = require('../models/IssueModel');

// Post route for issues /api/issues
router.post(
  '/',
  [
    auth,
    [
      check('deviceName', 'Device name is required.').not().isEmpty(),
      check('issueType', 'Type of issue field is required.').not().isEmpty(),
      check('issueDescription', 'Please describe the issue.').not().isEmpty(),
    ],
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      deviceName,
      deviceIP,
      deviceLocation,
      issueType,
      issueSeverity,
      issueDescription,
    } = req.body;

    try {
      const newIssue = new Issue({
        deviceName,
        deviceIP,
        deviceLocation,
        issueType,
        issueSeverity,
        issueDescription,
        user: req.user.id,
      });
      const issue = await newIssue.save();
      res.json(issue);
    } catch (error) {
      console.error('Error: ', error);
      res.status(500).send('Server error');
    }
  }
);

// GET route for /api/issues
// GET all issues
router.get('/', auth, async (req, res) => {
  try {
    const issues = await Issue.find({}).sort({
      date: -1,
    });
    res.json(issues);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// PUT route for /api/issues/:id
// Update an issue
router.put('/:id', auth, async (req, res) => {
  const {
    deviceName,
    deviceIP,
    deviceLocation,
    issueType,
    issueSeverity,
    issueDescription,
  } = req.body;

  const issueFields = {};
  if (deviceName) issueFields.deviceName = deviceName;
  if (deviceIP) issueFields.deviceIP = deviceIP;
  if (deviceLocation) issueFields.deviceLocation = deviceLocation;
  if (issueType) issueFields.issueType = issueType;
  if (issueSeverity) issueFields.issueSeverity = issueSeverity;
  if (issueDescription) issueFields.issueDescription = issueDescription;

  try {
    let issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ msg: 'Issue not found.' });

    issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { $set: issueFields },
      { new: true }
    );
    res.json(issue);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error.');
  }
});

// DELETE request to /api/issues/:id
// Delete an issue by ID
router.delete('/:id', auth, async (req, res) => {
  try {
    let issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ msg: 'Not Authorized' });

    await Issue.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Issue removed.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error.');
  }
});

module.exports = router;
