import React, { useState } from 'react';
import { Box, Typography, Button, Container, Paper, LinearProgress, Grid, Checkbox, FormControlLabel } from '@mui/material';
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

const ValueCard = styled(Paper)(({ theme, selected }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  height: '100%',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  border: selected ? `2px solid ${theme.palette.primary.main}` : '1px solid transparent',
  backgroundColor: selected ? theme.palette.primary.light + '20' : theme.palette.background.paper,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[2],
  },
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: 320,
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
}));

// List of values
const valuesList = [
  { id: 1, name: 'Family', description: 'Strong family connections' },
  { id: 2, name: 'Career', description: 'Professional growth and success' },
  { id: 3, name: 'Personal Growth', description: 'Continuous self-improvement' },
  { id: 4, name: 'Adventure', description: 'Seeking new experiences' },
  { id: 5, name: 'Stability', description: 'Security and predictability' },
  { id: 6, name: 'Creativity', description: 'Artistic expression and innovation' },
  { id: 7, name: 'Community', description: 'Connection to broader groups' },
  { id: 8, name: 'Health', description: 'Physical and mental wellbeing' },
  { id: 9, name: 'Spirituality', description: 'Connection to something greater' },
  { id: 10, name: 'Independence', description: 'Self-reliance and autonomy' },
  { id: 11, name: 'Knowledge', description: 'Learning and intellectual growth' },
  { id: 12, name: 'Honesty', description: 'Truthfulness and integrity' },
];

function ValuesAssessment() {
  const navigate = useNavigate();
  const [progress] = useState(80); // 4 of 5 steps (80%)
  const [selectedValues, setSelectedValues] = useState([]);

  const handleValueToggle = (valueId) => {
    if (selectedValues.includes(valueId)) {
      setSelectedValues(selectedValues.filter(id => id !== valueId));
    } else {
      if (selectedValues.length < 5) {
        setSelectedValues([...selectedValues, valueId]);
      }
    }
  };

  const handleContinue = () => {
    navigate('/relationship-goals');
  };

  const handleBack = () => {
    navigate('/create-profile');
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
          <Typography variant="h4">What Matters Most to You?</Typography>
        </Box>
        
        <ProgressContainer>
          <Typography variant="caption" align="left" display="block" gutterBottom>
            Step 4 of 5
          </Typography>
          <LinearProgress variant="determinate" value={progress} />
        </ProgressContainer>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          Select your top 5 values from the list below. These will help us match you with compatible partners.
        </Typography>
        
        <Box sx={{ mt: 3, mb: 2 }}>
          <Typography variant="body2" color="primary">
            Selected: {selectedValues.length}/5
          </Typography>
        </Box>
        
        <Grid container spacing={2}>
          {valuesList.map((value) => (
            <Grid item xs={6} sm={4} md={3} key={value.id}>
              <ValueCard 
                selected={selectedValues.includes(value.id)}
                onClick={() => handleValueToggle(value.id)}
              >
                <Typography variant="h5" component="h3" gutterBottom>
                  {value.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {value.description}
                </Typography>
              </ValueCard>
            </Grid>
          ))}
        </Grid>
        
        <ButtonContainer sx={{ mx: 'auto', mt: 4 }}>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            size="large"
            onClick={handleContinue}
            disabled={selectedValues.length === 0}
          >
            Continue
          </Button>
        </ButtonContainer>
      </Paper>
    </PageContainer>
  );
}

export default ValuesAssessment;
