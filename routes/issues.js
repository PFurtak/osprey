const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Issue = require('../models/IssueModel');
const User = require('../models/UserModel');
const moment = require('moment');

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
    const issues = await Issue.find({}).lean().sort({
      date: -1,
    });

    // Normalize dates
    issues.forEach((issue) => {
      issue.issueDate = moment(issue.issueDate).format('ll');

      if (issue.comments) {
        issue.comments.forEach((comment) => {
          comment.date = moment(comment.date).format('ll');
        });
      }
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

//@route POST api/issues/comment/:id
//@desc Comment on issue
//@access private
router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const issue = await Issue.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        firstName: user.firstName,
        lastName: user.lastName,
        user: req.user.id,
      };

      issue.comments.unshift(newComment);

      await issue.save();

      res.json(issue.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route DELETE api/issues/comment/:id/:comment_id
//@desc remove comment on issue
//@access private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    // pull comment from issue
    const comment = issue.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User is not authorized' });
    }

    const removeIndex = issue.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    issue.comments.splice(removeIndex, 1);

    await issue.save();

    res.json(issue.comments);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
