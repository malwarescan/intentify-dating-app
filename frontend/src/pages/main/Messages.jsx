import React, { useState } from 'react';
import { Box, Typography, Paper, Container, IconButton, List, ListItem, ListItemText, ListItemAvatar, Avatar, TextField, InputAdornment, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonIcon from '@mui/icons-material/Person';

// Styled components
const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const TopBar = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  paddingBottom: theme.spacing(8),
}));

const MessageList = styled(List)(({ theme }) => ({
  padding: 0,
}));

const MessageItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 0),
}));

const MessageInputContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 56, // Height of bottom navigation
  left: 0,
  right: 0,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  zIndex: 10,
}));

const BottomNav = styled(BottomNavigation)(({ theme }) => ({
  width: '100%',
  position: 'fixed',
  bottom: 0,
  borderTop: `1px solid ${theme.palette.divider}`,
  zIndex: 10,
}));

// Mock data for conversations
const conversations = [
  {
    id: 1,
    name: 'Emma',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    lastMessage: 'I would love to try that new restaurant!',
    time: '10:30 AM',
    unread: true,
  },
  {
    id: 2,
    name: 'Michael',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastMessage: 'What are your plans for the weekend?',
    time: 'Yesterday',
    unread: false,
  },
  {
    id: 3,
    name: 'Sophia',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    lastMessage: 'That sounds like a great idea!',
    time: 'Yesterday',
    unread: false,
  },
  {
    id: 4,
    name: 'James',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    lastMessage: 'Looking forward to meeting you!',
    time: 'Mar 15',
    unread: false,
  },
];

function Messages() {
  const navigate = useNavigate();
  const [navValue, setNavValue] = useState(2); // Messages tab selected
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState('');

  const handleNavChange = (event, newValue) => {
    setNavValue(newValue);
    
    // Navigate based on bottom nav selection
    switch(newValue) {
      case 0: // Home
        navigate('/home');
        break;
      case 1: // Matches
        // This would navigate to a matches page in a full implementation
        break;
      case 2: // Messages
        // Already on messages
        break;
      case 3: // Milestones
        navigate('/milestones');
        break;
      case 4: // Profile
        navigate('/profile');
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    if (selectedConversation) {
      setSelectedConversation(null);
    } else {
      navigate('/home');
    }
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, this would send the message to the backend
      setMessageText('');
    }
  };

  return (
    <PageContainer>
      <TopBar>
        <IconButton edge="start" onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ ml: 2 }}>
          {selectedConversation ? selectedConversation.name : 'Messages'}
        </Typography>
      </TopBar>
      
      <ContentContainer>
        {selectedConversation ? (
          // Conversation view
          <Box>
            {/* This would be a real chat history in a full implementation */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pb: 10 }}>
              <Box sx={{ alignSelf: 'flex-start', maxWidth: '80%' }}>
                <Paper sx={{ p: 2, borderRadius: '18px 18px 18px 4px', bgcolor: 'grey.100' }}>
                  <Typography variant="body1">
                    Hi there! I noticed we have a lot in common. I'm also interested in hiking and photography.
                  </Typography>
                </Paper>
                <Typography variant="caption" color="text.secondary" sx={{ ml: 1, mt: 0.5 }}>
                  10:15 AM
                </Typography>
              </Box>
              
              <Box sx={{ alignSelf: 'flex-end', maxWidth: '80%' }}>
                <Paper sx={{ p: 2, borderRadius: '18px 18px 4px 18px', bgcolor: 'primary.light' }}>
                  <Typography variant="body1">
                    That's great! I've been hiking a lot lately. Do you have any favorite trails?
                  </Typography>
                </Paper>
                <Typography variant="caption" color="text.secondary" sx={{ mr: 1, mt: 0.5, textAlign: 'right', display: 'block' }}>
                  10:18 AM
                </Typography>
              </Box>
              
              <Box sx={{ alignSelf: 'flex-start', maxWidth: '80%' }}>
                <Paper sx={{ p: 2, borderRadius: '18px 18px 18px 4px', bgcolor: 'grey.100' }}>
                  <Typography variant="body1">
                    I love the trails at Mount Tamalpais. The views are incredible and it's perfect for photography. Have you been there?
                  </Typography>
                </Paper>
                <Typography variant="caption" color="text.secondary" sx={{ ml: 1, mt: 0.5 }}>
                  10:22 AM
                </Typography>
              </Box>
              
              <Box sx={{ alignSelf: 'flex-end', maxWidth: '80%' }}>
                <Paper sx={{ p: 2, borderRadius: '18px 18px 4px 18px', bgcolor: 'primary.light' }}>
                  <Typography variant="body1">
                    I haven't been to Mount Tamalpais yet, but I've heard great things about it. I would love to check it out sometime!
                  </Typography>
                </Paper>
                <Typography variant="caption" color="text.secondary" sx={{ mr: 1, mt: 0.5, textAlign: 'right', display: 'block' }}>
                  10:25 AM
                </Typography>
              </Box>
              
              <Box sx={{ alignSelf: 'flex-start', maxWidth: '80%' }}>
                <Paper sx={{ p: 2, borderRadius: '18px 18px 18px 4px', bgcolor: 'grey.100' }}>
                  <Typography variant="body1">
                    I would love to try that new restaurant downtown this weekend. Would you be interested in joining me?
                  </Typography>
                </Paper>
                <Typography variant="caption" color="text.secondary" sx={{ ml: 1, mt: 0.5 }}>
                  10:30 AM
                </Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          // Conversations list view
          <MessageList>
            {conversations.map((conversation) => (
              <React.Fragment key={conversation.id}>
                <MessageItem 
                  button 
                  onClick={() => handleSelectConversation(conversation)}
                  sx={{ 
                    bgcolor: conversation.unread ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                    borderRadius: 2,
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={conversation.avatar} alt={conversation.name} />
                  </ListItemAvatar>
                  <ListItemText 
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle1" component="span">
                          {conversation.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {conversation.time}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography 
                        variant="body2" 
                        color={conversation.unread ? "text.primary" : "text.secondary"}
                        sx={{ 
                          fontWeight: conversation.unread ? 500 : 400,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {conversation.lastMessage}
                      </Typography>
                    }
                  />
                </MessageItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </MessageList>
        )}
      </ContentContainer>
      
      {selectedConversation && (
        <MessageInputContainer>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    edge="end" 
                    color="primary"
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: 4,
              }
            }}
          />
        </MessageInputContainer>
      )}
      
      <BottomNav
        value={navValue}
        onChange={handleNavChange}
        showLabels
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Matches" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Messages" icon={<ChatIcon />} />
        <BottomNavigationAction label="Milestones" icon={<EmojiEventsIcon />} />
        <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
      </BottomNav>
    </PageContainer>
  );
}

export default Messages;
