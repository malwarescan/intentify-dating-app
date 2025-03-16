import React, { useState } from 'react';
import { Box, Typography, Paper, Container, IconButton, Stepper, Step, StepLabel, StepContent, Button, Card, CardContent, LinearProgress, Divider, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonIcon from '@mui/icons-material/Person';
import CelebrationIcon from '@mui/icons-material/Celebration';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FlightIcon from '@mui/icons-material/Flight';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';

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
  padding: theme.spacing(3),
  paddingBottom: theme.spacing(8),
}));

const MilestoneCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
}));

const MilestoneHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const MilestoneIcon = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.primary.main,
  marginRight: theme.spacing(2),
}));

const ProgressContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
}));

const BottomNav = styled(BottomNavigation)(({ theme }) => ({
  width: '100%',
  position: 'fixed',
  bottom: 0,
  borderTop: `1px solid ${theme.palette.divider}`,
  zIndex: 10,
}));

// Mock data for relationship milestones
const milestones = [
  {
    id: 1,
    title: 'First Connection',
    description: 'You connected with Emma on March 15, 2025',
    icon: <FavoriteIcon />,
    completed: true,
    date: 'March 15, 2025',
  },
  {
    id: 2,
    title: 'First Date',
    description: 'Dinner at Osteria Francescana',
    icon: <RestaurantIcon />,
    completed: true,
    date: 'March 18, 2025',
    notes: 'We had an amazing conversation about our shared love for travel and photography.',
  },
  {
    id: 3,
    title: 'Weekend Getaway',
    description: 'Trip to Napa Valley',
    icon: <FlightIcon />,
    completed: false,
    planned: true,
    date: 'April 10-12, 2025',
  },
  {
    id: 4,
    title: 'Moving In Together',
    description: 'Not yet planned',
    icon: <HomeWorkIcon />,
    completed: false,
    planned: false,
  },
  {
    id: 5,
    title: 'Engagement',
    description: 'Not yet planned',
    icon: <CelebrationIcon />,
    completed: false,
    planned: false,
  },
];

// Future milestones to suggest
const suggestedMilestones = [
  {
    id: 101,
    title: 'Meet the Parents',
    description: 'Introduce each other to family',
    icon: <FamilyRestroomIcon />,
  },
  {
    id: 102,
    title: 'Anniversary Celebration',
    description: 'Plan something special for your first anniversary',
    icon: <CelebrationIcon />,
  },
];

function Milestones() {
  const navigate = useNavigate();
  const [navValue, setNavValue] = useState(3); // Milestones tab selected
  const [activeStep, setActiveStep] = useState(2); // Current milestone step

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
        navigate('/messages');
        break;
      case 3: // Milestones
        // Already on milestones
        break;
      case 4: // Profile
        navigate('/profile');
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    navigate('/home');
  };

  const completedMilestones = milestones.filter(m => m.completed).length;
  const totalMilestones = milestones.length;
  const progressPercentage = (completedMilestones / totalMilestones) * 100;

  return (
    <PageContainer>
      <TopBar>
        <IconButton edge="start" onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ ml: 2 }}>Relationship Milestones</Typography>
      </TopBar>
      
      <ContentContainer>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Your Journey with Emma
          </Typography>
          
          <Typography variant="body1" paragraph>
            Track your relationship progress and plan future milestones together.
          </Typography>
          
          <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Relationship Progress
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" sx={{ mr: 1 }}>
                {completedMilestones}/{totalMilestones} milestones completed
              </Typography>
              <Typography variant="body2" color="primary" fontWeight="bold">
                ({Math.round(progressPercentage)}%)
              </Typography>
            </Box>
            
            <LinearProgress 
              variant="determinate" 
              value={progressPercentage} 
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Paper>
        </Box>
        
        <Typography variant="h5" gutterBottom>
          Milestone Timeline
        </Typography>
        
        <Stepper orientation="vertical" activeStep={activeStep}>
          {milestones.map((milestone, index) => (
            <Step key={milestone.id} completed={milestone.completed}>
              <StepLabel
                StepIconProps={{
                  icon: milestone.icon,
                }}
              >
                <Typography variant="subtitle1">{milestone.title}</Typography>
                {milestone.completed && (
                  <Typography variant="caption" color="text.secondary">
                    {milestone.date}
                  </Typography>
                )}
                {milestone.planned && !milestone.completed && (
                  <Typography variant="caption" color="primary">
                    Planned: {milestone.date}
                  </Typography>
                )}
              </StepLabel>
              <StepContent>
                <Typography variant="body2" paragraph>
                  {milestone.description}
                </Typography>
                {milestone.notes && (
                  <Paper sx={{ p: 2, bgcolor: 'background.default', mb: 2 }}>
                    <Typography variant="body2">
                      {milestone.notes}
                    </Typography>
                  </Paper>
                )}
                {milestone.planned && !milestone.completed && (
                  <Box sx={{ mb: 2 }}>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      Mark as Completed
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                    >
                      Edit Details
                    </Button>
                  </Box>
                )}
                {!milestone.planned && !milestone.completed && (
                  <Button
                    variant="outlined"
                    size="small"
                  >
                    Plan This Milestone
                  </Button>
                )}
              </StepContent>
            </Step>
          ))}
        </Stepper>
        
        <Divider sx={{ my: 4 }} />
        
        <Typography variant="h5" gutterBottom>
          Suggested Milestones
        </Typography>
        
        <Typography variant="body2" paragraph color="text.secondary">
          Consider adding these milestones to your relationship journey
        </Typography>
        
        {suggestedMilestones.map((milestone) => (
          <MilestoneCard key={milestone.id}>
            <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
              <MilestoneIcon>
                {milestone.icon}
              </MilestoneIcon>
              <Box>
                <Typography variant="h6">{milestone.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {milestone.description}
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
              <Button variant="outlined" size="small">
                Add to Timeline
              </Button>
            </Box>
          </MilestoneCard>
        ))}
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

export default Milestones;
