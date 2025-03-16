import React from 'react';
import { Box, Typography, Paper, Container, IconButton, LinearProgress, Button, Divider, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
  paddingBottom: theme.spacing(10),
}));

const CompatibilityCircle = styled(Box)(({ theme }) => ({
  width: 160,
  height: 160,
  borderRadius: '50%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginBottom: theme.spacing(4),
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: theme.palette.primary.contrastText,
  boxShadow: theme.shadows[3],
}));

const CompatibilitySection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
}));

const CompatibilityBar = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const AlignmentItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: theme.palette.background.paper,
  zIndex: 10,
}));

// Mock data for compatibility
const compatibilityData = {
  id: 1,
  name: 'Emma',
  age: 28,
  overallScore: 92,
  categories: [
    { name: 'Values Alignment', score: 95 },
    { name: 'Life Goals', score: 88 },
    { name: 'Relationship Expectations', score: 90 },
  ],
  strongAlignments: [
    'You both prioritize personal growth and adventure',
    'Similar timeline for relationship milestones',
    'Shared interest in travel and new experiences',
  ],
  growthOpportunities: [
    'Different communication preferences',
    'Varying approaches to financial planning',
  ],
};

function Compatibility() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBack = () => {
    navigate(`/match/${id}`);
  };

  const handleConnect = () => {
    // In a real app, this would send a connection request
    navigate('/messages');
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
        <Typography variant="h6" sx={{ ml: 2 }}>Compatibility</Typography>
      </TopBar>
      
      <ContentContainer>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Your Compatibility with {compatibilityData.name}
        </Typography>
        
        <CompatibilityCircle>
          <Typography variant="h2" component="div" fontWeight="bold">
            {compatibilityData.overallScore}%
          </Typography>
          <Typography variant="body2">
            Compatibility
          </Typography>
        </CompatibilityCircle>
        
        <Typography variant="body1" paragraph align="center">
          You have a strong compatibility with {compatibilityData.name} based on your shared values and relationship goals.
        </Typography>
        
        <CompatibilitySection>
          <Typography variant="h5" gutterBottom>
            Compatibility Breakdown
          </Typography>
          
          {compatibilityData.categories.map((category) => (
            <CompatibilityBar key={category.name}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">{category.name}</Typography>
                <Typography variant="body2" fontWeight="bold">{category.score}%</Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={category.score} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  background: (theme) => theme.palette.grey[200],
                  '& .MuiLinearProgress-bar': {
                    background: (theme) => `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  }
                }}
              />
            </CompatibilityBar>
          ))}
        </CompatibilitySection>
        
        <CompatibilitySection>
          <Typography variant="h5" gutterBottom>
            Strong Alignment Areas
          </Typography>
          
          {compatibilityData.strongAlignments.map((alignment, index) => (
            <AlignmentItem key={index}>
              <CheckCircleIcon color="success" sx={{ mr: 2 }} />
              <Typography variant="body1">{alignment}</Typography>
            </AlignmentItem>
          ))}
        </CompatibilitySection>
        
        <CompatibilitySection>
          <Typography variant="h5" gutterBottom>
            Growth Opportunities
          </Typography>
          
          {compatibilityData.growthOpportunities.map((opportunity, index) => (
            <AlignmentItem key={index}>
              <Avatar 
                sx={{ 
                  width: 24, 
                  height: 24, 
                  bgcolor: 'secondary.main',
                  fontSize: 14,
                  mr: 2
                }}
              >
                !
              </Avatar>
              <Typography variant="body1">{opportunity}</Typography>
            </AlignmentItem>
          ))}
        </CompatibilitySection>
        
        <Typography variant="body1" paragraph align="center">
          Remember, compatibility is just one factor in a successful relationship. Communication, mutual respect, and shared experiences are also important.
        </Typography>
      </ContentContainer>
      
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

export default Compatibility;
