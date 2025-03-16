const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Milestone = require('../models/Milestone');
const Match = require('../models/Match');

// @route   GET api/milestones/:matchId
// @desc    Get all milestones for a match
// @access  Private
router.get('/:matchId', auth, async (req, res) => {
  try {
    // Check if match exists and user is part of it
    const match = await Match.findById(req.params.matchId);
    if (!match) {
      return res.status(404).json({ msg: 'Match not found' });
    }
    
    if (match.user1.toString() !== req.user.id && match.user2.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    // Get milestones for this match
    const milestones = await Milestone.find({ match: req.params.matchId })
      .sort({ date: 1 });
    
    res.json(milestones);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/milestones/:matchId
// @desc    Create a new milestone
// @access  Private
router.post('/:matchId', auth, async (req, res) => {
  const { title, description, date, planned, notes } = req.body;
  
  if (!title) {
    return res.status(400).json({ msg: 'Milestone title is required' });
  }
  
  try {
    // Check if match exists and user is part of it
    const match = await Match.findById(req.params.matchId);
    if (!match) {
      return res.status(404).json({ msg: 'Match not found' });
    }
    
    if (match.user1.toString() !== req.user.id && match.user2.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    // Check if match is connected
    if (match.status !== 'connected') {
      return res.status(400).json({ msg: 'Cannot create milestone for a match that is not connected' });
    }
    
    // Create new milestone
    const newMilestone = new Milestone({
      match: req.params.matchId,
      title,
      description,
      date: date ? new Date(date) : null,
      planned: planned || false,
      notes,
      createdBy: req.user.id
    });
    
    const milestone = await newMilestone.save();
    
    res.json(milestone);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/milestones/:id
// @desc    Update a milestone
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { title, description, date, completed, planned, notes } = req.body;
  
  try {
    let milestone = await Milestone.findById(req.params.id);
    if (!milestone) {
      return res.status(404).json({ msg: 'Milestone not found' });
    }
    
    // Check if user is part of the match
    const match = await Match.findById(milestone.match);
    if (!match) {
      return res.status(404).json({ msg: 'Match not found' });
    }
    
    if (match.user1.toString() !== req.user.id && match.user2.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    // Build milestone object
    const milestoneFields = {};
    if (title) milestoneFields.title = title;
    if (description !== undefined) milestoneFields.description = description;
    if (date) milestoneFields.date = new Date(date);
    if (completed !== undefined) milestoneFields.completed = completed;
    if (planned !== undefined) milestoneFields.planned = planned;
    if (notes !== undefined) milestoneFields.notes = notes;
    milestoneFields.updatedAt = Date.now();
    
    // Update milestone
    milestone = await Milestone.findByIdAndUpdate(
      req.params.id,
      { $set: milestoneFields },
      { new: true }
    );
    
    res.json(milestone);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/milestones/:id
// @desc    Delete a milestone
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const milestone = await Milestone.findById(req.params.id);
    if (!milestone) {
      return res.status(404).json({ msg: 'Milestone not found' });
    }
    
    // Check if user is part of the match
    const match = await Match.findById(milestone.match);
    if (!match) {
      return res.status(404).json({ msg: 'Match not found' });
    }
    
    if (match.user1.toString() !== req.user.id && match.user2.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    await milestone.remove();
    
    res.json({ msg: 'Milestone removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/milestones/suggestions
// @desc    Get milestone suggestions
// @access  Private
router.get('/suggestions', auth, async (req, res) => {
  try {
    // In a real app, this would be more sophisticated
    // For the prototype, we'll return static suggestions
    const suggestions = [
      {
        title: 'First Date',
        description: 'Your first in-person meeting'
      },
      {
        title: 'Meet Friends',
        description: 'Introduce each other to friends'
      },
      {
        title: 'Meet Family',
        description: 'Introduce each other to family members'
      },
      {
        title: 'Weekend Getaway',
        description: 'Take a short trip together'
      },
      {
        title: 'Moving In Together',
        description: 'Share a living space'
      },
      {
        title: 'Engagement',
        description: 'Commit to marriage'
      }
    ];
    
    res.json(suggestions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
