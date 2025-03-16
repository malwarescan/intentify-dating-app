import React, { useState } from 'react';
import { Box, Typography, Paper, Container, BottomNavigation, BottomNavigationAction, Card, CardMedia, CardContent, Button, Avatar, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

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
  justifyContent: 'space-between',
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontFamily: '"Playfair Display", serif',
  fontWeight: 700,
  color: theme.palette.primary.main,
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  paddingBottom: theme.spacing(8),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(3),
}));

const MatchCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
  marginBottom: theme.spacing(2),
}));

const CompatibilityBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 12,
  right: 12,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: 12,
  padding: theme.spacing(0.5, 1.5),
  fontWeight: 600,
  fontSize: 14,
}));

const BottomNav = styled(BottomNavigation)(({ theme }) => ({
  width: '100%',
  position: 'fixed',
  bottom: 0,
  borderTop: `1px solid ${theme.palette.divider}`,
  zIndex: 1000,
}));

// Mock data for matches
const mockMatches = [
  {
    id: 1,
    name: 'Emma',
    age: 28,
    occupation: 'Marketing Manager',
    compatibility: 92,
    photo: 'https://randomuser.me/api/portraits/women/33.jpg',
  },
  {
    id: 2,
    name: 'Michael',
    age: 31,
    occupation: 'Software Engineer',
    compatibility: 87,
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 3,
    name: 'Sophia',
    age: 27,
    occupation: 'Graphic Designer',
    compatibility: 85,
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
];

// Mock data for saved matches
const savedMatches = [
  {
    id: 4,
    name: 'James',
    age: 30,
    occupation: 'Financial Analyst',
    compatibility: 89,
    photo: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
];

function Home() {
  const navigate = useNavigate();
  const [navValue, setNavValue] = useState(0);

  const handleNavChange = (event, newValue) => {
    setNavValue(newValue);
    
    // Navigate based on bottom nav selection
    switch(newValue) {
      case 0: // Home
        // Already on home
        break;
      case 1: // Matches
        // This would navigate to a matches page in a full implementation
        break;
      case 2: // Messages
        navigate('/messages');
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

  const handleViewProfile = (id) => {
    navigate(`/match/${id}`);
  };

  return (
    <PageContainer>
      <TopBar>
        <Logo variant="h4">Intentify</Logo>
        <Avatar 
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/profile')}
        >
          <PersonIcon />
        </Avatar>
      </TopBar>
      
      <ContentContainer>
        <SectionTitle variant="h4">Today's Matches</SectionTitle>
        <Typography variant="body2" color="text.secondary" paragraph>
          We've selected these matches based on your compatibility
        </Typography>
        
        {mockMatches.map((match) => (
          <MatchCard key={match.id}>
            <CardMedia
              component="img"
              height="300"
              image={match.photo}
              alt={match.name}
            />
            <CompatibilityBadge>
              {match.compatibility}% Match
            </CompatibilityBadge>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h5" component="div">
                  {match.name}, {match.age}
                </Typography>
                <Chip 
                  label="Verified" 
                  size="small" 
                  color="primary" 
                  variant="outlined"
                />
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {match.occupation}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button 
                  variant="outlined" 
                  color="primary"
                  sx={{ borderRadius: 4, flex: 1, mr: 1 }}
                >
                  Pass
                </Button>
                <Button 
                  variant="contained" 
                  color="primary"
                  sx={{ borderRadius: 4, flex: 1, ml: 1 }}
                  onClick={() => handleViewProfile(match.id)}
                >
                  View Profile
                </Button>
              </Box>
            </CardContent>
          </MatchCard>
        ))}
        
        {savedMatches.length > 0 && (
          <>
            <SectionTitle variant="h4">Saved Matches</SectionTitle>
            {savedMatches.map((match) => (
              <MatchCard key={match.id}>
                <CardMedia
                  component="img"
                  height="300"
                  image={match.photo}
                  alt={match.name}
                />
                <CompatibilityBadge>
                  {match.compatibility}% Match
                </CompatibilityBadge>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h5" component="div">
                      {match.name}, {match.age}
                    </Typography>
                    <Chip 
                      label="Verified" 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {match.occupation}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button 
                      variant="outlined" 
                      color="primary"
                      sx={{ borderRadius: 4, flex: 1, mr: 1 }}
                    >
                      Remove
                    </Button>
                    <Button 
                      variant="contained" 
                      color="primary"
                      sx={{ borderRadius: 4, flex: 1, ml: 1 }}
                      onClick={() => handleViewProfile(match.id)}
                    >
                      View Profile
                    </Button>
                  </Box>
                </CardContent>
              </MatchCard>
            ))}
          </>
        )}
      </ContentContainer>
      
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

export default Home;
