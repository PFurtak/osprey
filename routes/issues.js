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

//GET route for /api/issues
//GET all issues
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

module.exports = router;
