const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Issue = require('../models/IssueModel');

// Post route for issues /api/issues
router.post(
  '/',
  [
    check('deviceName', 'Device name is required.').not().isEmpty(),
    check('issueType', 'Type of issue field is required.').not().isEmpty(),
    check('issueDescription', 'Please describe the issue.').not().isEmpty(),
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
      createdBy,
    } = req.body;

    try {
      const newIssue = new Issue({
        deviceName,
        deviceIP,
        deviceLocation,
        issueType,
        issueSeverity,
        issueDescription,
        createdBy,
      });
      const issue = await newIssue.save();
      res.json(issue);
    } catch (error) {
      console.error('Error: ', error);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
