import React, { useState } from 'react';
import { Box, Typography, Paper, Container, IconButton, Tabs, Tab, Button, Chip, Avatar, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HeightIcon from '@mui/icons-material/Height';
import VerifiedIcon from '@mui/icons-material/Verified';

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

const PhotoContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 400,
  backgroundColor: theme.palette.grey[200],
}));

const Photo = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const CompatibilityBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: 12,
  padding: theme.spacing(0.5, 1.5),
  fontWeight: 600,
  fontSize: 14,
}));

const ProfileInfo = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1.5),
}));

const ValueChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  position: 'sticky',
  bottom: 0,
  backgroundColor: theme.palette.background.paper,
  zIndex: 10,
}));

// Mock data for the match profile
const matchData = {
  id: 1,
  name: 'Emma',
  age: 28,
  occupation: 'Marketing Manager',
  education: 'Master\'s in Business',
  location: 'San Francisco',
  distance: '5 miles away',
  height: '5\'6"',
  compatibility: 92,
  verified: true,
  photos: [
    'https://randomuser.me/api/portraits/women/33.jpg',
    'https://randomuser.me/api/portraits/women/44.jpg',
    'https://randomuser.me/api/portraits/women/68.jpg',
  ],
  bio: 'I\'m passionate about marketing, travel, and trying new restaurants. Looking for someone who shares my love for adventure and meaningful conversations.',
  values: ['Family', 'Personal Growth', 'Adventure', 'Creativity', 'Health'],
  goals: ['Travel to 30 countries', 'Start a family within 5 years', 'Advance to marketing director'],
};

function MatchProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleBack = () => {
    navigate('/home');
  };

  const handleNextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % matchData.photos.length);
  };

  const handleConnect = () => {
    // In a real app, this would send a connection request
    navigate('/compatibility/' + id);
  };

  const handlePass = () => {
    navigate('/home');
  };

  return (
    <PageContainer>
      <TopBar>
        <IconButton edge="start" onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ ml: 2 }}>Profile</Typography>
      </TopBar>
      
      <PhotoContainer onClick={handleNextPhoto}>
        <Photo src={matchData.photos[currentPhoto]} alt={matchData.name} />
        <CompatibilityBadge>
          {matchData.compatibility}% Match
        </CompatibilityBadge>
      </PhotoContainer>
      
      <Container>
        <ProfileInfo>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h4" component="h1">
                {matchData.name}, {matchData.age}
              </Typography>
              {matchData.verified && (
                <VerifiedIcon color="primary" sx={{ ml: 1 }} />
              )}
            </Box>
            <Chip 
              label="Verified" 
              color="primary" 
              variant="outlined"
              icon={<VerifiedIcon />}
            />
          </Box>
          
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ mb: 3 }}
          >
            <Tab label="About" />
            <Tab label="Values" />
            <Tab label="Goals" />
            <Tab label="Compatibility" />
          </Tabs>
          
          {tabValue === 0 && (
            <Box>
              <Typography variant="body1" paragraph>
                {matchData.bio}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <InfoItem>
                <WorkIcon color="action" sx={{ mr: 2 }} />
                <Typography variant="body1">{matchData.occupation}</Typography>
              </InfoItem>
              
              <InfoItem>
                <SchoolIcon color="action" sx={{ mr: 2 }} />
                <Typography variant="body1">{matchData.education}</Typography>
              </InfoItem>
              
              <InfoItem>
                <LocationOnIcon color="action" sx={{ mr: 2 }} />
                <Typography variant="body1">{matchData.location} • {matchData.distance}</Typography>
              </InfoItem>
              
              <InfoItem>
                <HeightIcon color="action" sx={{ mr: 2 }} />
                <Typography variant="body1">{matchData.height}</Typography>
              </InfoItem>
            </Box>
          )}
          
          {tabValue === 1 && (
            <Box>
              <Typography variant="body1" paragraph>
                These are the values that matter most to {matchData.name}:
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
                {matchData.values.map((value) => (
                  <ValueChip 
                    key={value}
                    label={value}
                    color="primary"
                  />
                ))}
              </Box>
              
              <Typography variant="body1" sx={{ mt: 3 }}>
                You share 3 out of 5 values with {matchData.name}.
              </Typography>
            </Box>
          )}
          
          {tabValue === 2 && (
            <Box>
              <Typography variant="body1" paragraph>
                {matchData.name}'s life goals:
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                {matchData.goals.map((goal, index) => (
                  <Paper 
                    key={index}
                    sx={{ 
                      p: 2, 
                      mb: 2, 
                      display: 'flex',
                      alignItems: 'center',
                      borderRadius: 2
                    }}
                  >
                    <FavoriteIcon color="secondary" sx={{ mr: 2 }} />
                    <Typography variant="body1">{goal}</Typography>
                  </Paper>
                ))}
              </Box>
            </Box>
          )}
          
          {tabValue === 3 && (
            <Box>
              <Typography variant="h5" gutterBottom>
                Your Compatibility with {matchData.name}
              </Typography>
              
              <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <Avatar 
                    sx={{ 
                      width: 80, 
                      height: 80, 
                      bgcolor: 'primary.main',
                      fontSize: 24,
                      fontWeight: 'bold'
                    }}
                  >
                    {matchData.compatibility}%
                  </Avatar>
                </Box>
                
                <Typography variant="body1" align="center" paragraph>
                  You have a strong compatibility with {matchData.name} based on your shared values and relationship goals.
                </Typography>
              </Paper>
              
              <Typography variant="h6" gutterBottom>
                Strong Alignment Areas:
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <InfoItem>
                  <Chip label="Values" color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body1">You both prioritize personal growth and adventure</Typography>
                </InfoItem>
                
                <InfoItem>
                  <Chip label="Goals" color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body1">Similar timeline for relationship milestones</Typography>
                </InfoItem>
              </Box>
              
              <Typography variant="h6" gutterBottom>
                Growth Opportunities:
              </Typography>
              
              <InfoItem>
                <Chip label="Communication" color="secondary" sx={{ mr: 1 }} />
                <Typography variant="body1">Different communication preferences</Typography>
              </InfoItem>
            </Box>
          )}
        </ProfileInfo>
      </Container>
      
      <ButtonContainer>
        <Button 
          variant="outlined" 
          color="primary"
          sx={{ borderRadius: 4, flex: 1, mr: 1 }}
          onClick={handlePass}
        >
          Pass
        </Button>
        <Button 
          variant="contained" 
          color="primary"
          sx={{ borderRadius: 4, flex: 1, ml: 1 }}
          onClick={handleConnect}
        >
          Connect
        </Button>
      </ButtonContainer>
    </PageContainer>
  );
}

export default MatchProfile;
