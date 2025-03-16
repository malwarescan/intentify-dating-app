const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Match = require('../models/Match');
const User = require('../models/User');

// @route   GET api/matches
// @desc    Get all matches for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Find matches where the user is either user1 or user2
    const matches = await Match.find({
      $or: [
        { user1: req.user.id },
        { user2: req.user.id }
      ]
    }).populate('user1', ['name', 'age', 'photos', 'occupation', 'location'])
      .populate('user2', ['name', 'age', 'photos', 'occupation', 'location']);
    
    res.json(matches);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/matches/potential
// @desc    Get potential matches for a user
// @access  Private
router.get('/potential', auth, async (req, res) => {
  try {
    // Get current user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Find existing matches to exclude
    const existingMatches = await Match.find({
      $or: [
        { user1: req.user.id },
        { user2: req.user.id }
      ]
    });
    
    // Extract IDs of users already matched with
    const matchedUserIds = existingMatches.map(match => {
      return match.user1.toString() === req.user.id ? 
        match.user2.toString() : match.user1.toString();
    });
    
    // Add current user ID to exclude list
    matchedUserIds.push(req.user.id);

    // Find potential matches
    // In a real app, this would use more sophisticated matching algorithms
    // For the prototype, we'll just find users not already matched with
    const potentialMatches = await User.find({
      _id: { $nin: matchedUserIds },
      verified: true
    }).select('-password').limit(10);

    // Add mock compatibility scores
    const potentialMatchesWithScores = potentialMatches.map(match => {
      // In a real app, this would calculate actual compatibility
      const compatibility = Math.floor(Math.random() * 30) + 70; // Random score between 70-99
      
      return {
        ...match._doc,
        compatibility
      };
    });
    
    res.json(potentialMatchesWithScores);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/matches
// @desc    Create a new match request
// @access  Private
router.post('/', auth, async (req, res) => {
  const { userId, compatibility } = req.body;

  try {
    // Check if match already exists
    const existingMatch = await Match.findOne({
      $or: [
        { user1: req.user.id, user2: userId },
        { user1: userId, user2: req.user.id }
      ]
    });

    if (existingMatch) {
      return res.status(400).json({ msg: 'Match already exists' });
    }

    // Create new match
    const newMatch = new Match({
      user1: req.user.id,
      user2: userId,
      compatibility,
      compatibilityDetails: {
        values: { score: Math.floor(Math.random() * 20) + 80, details: 'Strong alignment in personal values' },
        goals: { score: Math.floor(Math.random() * 20) + 80, details: 'Similar relationship goals' },
        expectations: { score: Math.floor(Math.random() * 20) + 80, details: 'Compatible expectations' }
      },
      status: 'pending',
      initiatedBy: req.user.id
    });

    const match = await newMatch.save();
    
    // Populate user details
    const populatedMatch = await Match.findById(match._id)
      .populate('user1', ['name', 'age', 'photos', 'occupation', 'location'])
      .populate('user2', ['name', 'age', 'photos', 'occupation', 'location']);

    res.json(populatedMatch);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/matches/:id
// @desc    Update match status (accept/reject)
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { status } = req.body;

  // Check if status is valid
  if (!['connected', 'rejected'].includes(status)) {
    return res.status(400).json({ msg: 'Invalid status' });
  }

  try {
    let match = await Match.findById(req.params.id);
    
    if (!match) {
      return res.status(404).json({ msg: 'Match not found' });
    }

    // Check if user is part of the match
    if (match.user1.toString() !== req.user.id && match.user2.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Check if user is the recipient of the match request
    if (match.initiatedBy.toString() === req.user.id) {
      return res.status(400).json({ msg: 'Cannot update status of match you initiated' });
    }

    // Update match
    match = await Match.findByIdAndUpdate(
      req.params.id,
      { 
        $set: { 
          status,
          updatedAt: Date.now()
        } 
      },
      { new: true }
    ).populate('user1', ['name', 'age', 'photos', 'occupation', 'location'])
      .populate('user2', ['name', 'age', 'photos', 'occupation', 'location']);

    res.json(match);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/matches/:id/compatibility
// @desc    Get detailed compatibility for a match
// @access  Private
router.get('/:id/compatibility', auth, async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    
    if (!match) {
      return res.status(404).json({ msg: 'Match not found' });
    }

    // Check if user is part of the match
    if (match.user1.toString() !== req.user.id && match.user2.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Get the other user in the match
    const otherUserId = match.user1.toString() === req.user.id ? match.user2 : match.user1;
    const otherUser = await User.findById(otherUserId).select('-password');
    
    // In a real app, this would calculate actual compatibility
    // For the prototype, we'll return mock data
    const compatibilityData = {
      overallScore: match.compatibility,
      categories: [
        { name: 'Values Alignment', score: match.compatibilityDetails.values.score },
        { name: 'Life Goals', score: match.compatibilityDetails.goals.score },
        { name: 'Relationship Expectations', score: match.compatibilityDetails.expectations.score }
      ],
      strongAlignments: [
        'You both prioritize personal growth and adventure',
        'Similar timeline for relationship milestones',
        'Shared interest in travel and new experiences'
      ],
      growthOpportunities: [
        'Different communication preferences',
        'Varying approaches to financial planning'
      ],
      user: otherUser
    };
    
    res.json(compatibilityData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
