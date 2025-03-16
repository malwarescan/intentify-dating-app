import React, { useState } from 'react';
import { Box, Typography, Button, Container, Paper, LinearProgress, Grid, Slider, FormControl, InputLabel, Select, MenuItem, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

// Styled components
const PageContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: theme.spacing(4),
}));

const ProgressContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(3),
}));

const SectionContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const DealBreakerChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: 320,
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
}));

// Deal breaker options
const dealBreakers = [
  'Smoking', 'Drinking', 'Different religious views', 'Different political views',
  'Long distance', 'Has children', 'Doesn\'t want children', 'Pets',
  'Different education levels', 'Different financial goals'
];

function RelationshipExpectations() {
  const navigate = useNavigate();
  const [progress] = useState(100); // 5 of 5 steps (100%)
  const [relationshipType, setRelationshipType] = useState('');
  const [timeline, setTimeline] = useState(3); // Years
  const [familyPlans, setFamilyPlans] = useState('');
  const [selectedDealBreakers, setSelectedDealBreakers] = useState([]);

  const handleDealBreakerToggle = (dealBreaker) => {
    if (selectedDealBreakers.includes(dealBreaker)) {
      setSelectedDealBreakers(selectedDealBreakers.filter(item => item !== dealBreaker));
    } else {
      setSelectedDealBreakers([...selectedDealBreakers, dealBreaker]);
    }
  };

  const handleComplete = () => {
    navigate('/home');
  };

  const handleBack = () => {
    navigate('/values');
  };

  return (
    <PageContainer maxWidth="md">
      <Paper 
        elevation={0}
        sx={{ 
          width: '100%', 
          padding: 4, 
          borderRadius: 4,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={handleBack} edge="start" sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4">Your Relationship Goals</Typography>
        </Box>
        
        <ProgressContainer>
          <Typography variant="caption" align="left" display="block" gutterBottom>
            Step 5 of 5
          </Typography>
          <LinearProgress variant="determinate" value={progress} />
        </ProgressContainer>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          Help us understand what you're looking for in a relationship so we can find compatible matches.
        </Typography>
        
        <SectionContainer>
          <Typography variant="h5" gutterBottom>
            Relationship Type
          </Typography>
          
          <FormControl fullWidth>
            <InputLabel>What type of relationship are you seeking?</InputLabel>
            <Select
              value={relationshipType}
              label="What type of relationship are you seeking?"
              onChange={(e) => setRelationshipType(e.target.value)}
            >
              <MenuItem value="long-term">Long-term relationship leading to marriage</MenuItem>
              <MenuItem value="serious">Serious relationship, not necessarily marriage</MenuItem>
              <MenuItem value="casual">Casual dating but exclusive</MenuItem>
              <MenuItem value="undecided">Still figuring it out</MenuItem>
            </Select>
          </FormControl>
        </SectionContainer>
        
        <SectionContainer>
          <Typography variant="h5" gutterBottom>
            Relationship Timeline
          </Typography>
          
          <Typography variant="body2" gutterBottom>
            How soon would you like to reach significant relationship milestones? (in years)
          </Typography>
          
          <Box sx={{ px: 2 }}>
            <Slider
              value={timeline}
              onChange={(e, newValue) => setTimeline(newValue)}
              step={1}
              marks={[
                { value: 1, label: '1' },
                { value: 3, label: '3' },
                { value: 5, label: '5' },
                { value: 7, label: '7+' }
              ]}
              min={1}
              max={7}
              valueLabelDisplay="auto"
            />
          </Box>
        </SectionContainer>
        
        <SectionContainer>
          <Typography variant="h5" gutterBottom>
            Family Planning
          </Typography>
          
          <FormControl fullWidth>
            <InputLabel>What are your family planning preferences?</InputLabel>
            <Select
              value={familyPlans}
              label="What are your family planning preferences?"
              onChange={(e) => setFamilyPlans(e.target.value)}
            >
              <MenuItem value="want-children">Want children</MenuItem>
              <MenuItem value="maybe-children">Maybe want children</MenuItem>
              <MenuItem value="no-children">Don't want children</MenuItem>
              <MenuItem value="have-children">Already have children</MenuItem>
            </Select>
          </FormControl>
        </SectionContainer>
        
        <SectionContainer>
          <Typography variant="h5" gutterBottom>
            Deal Breakers
          </Typography>
          
          <Typography variant="body2" gutterBottom>
            Select factors that would be deal breakers for you in a relationship.
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
            {dealBreakers.map((dealBreaker) => (
              <DealBreakerChip
                key={dealBreaker}
                label={dealBreaker}
                onClick={() => handleDealBreakerToggle(dealBreaker)}
                color={selectedDealBreakers.includes(dealBreaker) ? "primary" : "default"}
                variant={selectedDealBreakers.includes(dealBreaker) ? "filled" : "outlined"}
              />
            ))}
          </Box>
        </SectionContainer>
        
        <ButtonContainer sx={{ mx: 'auto', mt: 4 }}>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            size="large"
            onClick={handleComplete}
          >
            Complete Profile
          </Button>
        </ButtonContainer>
      </Paper>
    </PageContainer>
  );
}

export default RelationshipExpectations;
