const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Message = require('../models/Message');
const Match = require('../models/Match');

// @route   GET api/messages/conversations
// @desc    Get all conversations for a user
// @access  Private
router.get('/conversations', auth, async (req, res) => {
  try {
    // Find all matches where the user is connected
    const matches = await Match.find({
      $or: [
        { user1: req.user.id },
        { user2: req.user.id }
      ],
      status: 'connected'
    }).populate('user1', ['name', 'photos'])
      .populate('user2', ['name', 'photos']);
    
    // For each match, get the latest message
    const conversations = await Promise.all(matches.map(async (match) => {
      const latestMessage = await Message.findOne({ match: match._id })
        .sort({ createdAt: -1 });
      
      // Determine the other user in the conversation
      const otherUser = match.user1._id.toString() === req.user.id ? 
        match.user2 : match.user1;
      
      // Count unread messages
      const unreadCount = await Message.countDocuments({
        match: match._id,
        recipient: req.user.id,
        read: false
      });
      
      return {
        matchId: match._id,
        user: otherUser,
        latestMessage: latestMessage ? latestMessage.content : null,
        timestamp: latestMessage ? latestMessage.createdAt : match.createdAt,
        unreadCount
      };
    }));
    
    // Sort conversations by latest message timestamp
    conversations.sort((a, b) => b.timestamp - a.timestamp);
    
    res.json(conversations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/messages/:matchId
// @desc    Get messages for a specific match
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
    
    // Get messages for this match
    const messages = await Message.find({ match: req.params.matchId })
      .sort({ createdAt: 1 });
    
    // Mark messages as read if user is the recipient
    await Message.updateMany(
      { match: req.params.matchId, recipient: req.user.id, read: false },
      { $set: { read: true } }
    );
    
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/messages/:matchId
// @desc    Send a message
// @access  Private
router.post('/:matchId', auth, async (req, res) => {
  const { content } = req.body;
  
  if (!content) {
    return res.status(400).json({ msg: 'Message content is required' });
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
      return res.status(400).json({ msg: 'Cannot send message to a match that is not connected' });
    }
    
    // Determine recipient
    const recipient = match.user1.toString() === req.user.id ? match.user2 : match.user1;
    
    // Create new message
    const newMessage = new Message({
      match: req.params.matchId,
      sender: req.user.id,
      recipient,
      content
    });
    
    const message = await newMessage.save();
    
    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
