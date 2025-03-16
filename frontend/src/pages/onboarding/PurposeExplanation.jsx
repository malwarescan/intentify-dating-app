import React, { useState } from 'react';
import { Box, Typography, Button, Container, Paper, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Styled components
const PageContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: theme.spacing(4),
  textAlign: 'center',
}));

const ProgressContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(3),
}));

const IllustrationBox = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 300,
  height: 200,
  margin: '0 auto',
  marginBottom: theme.spacing(4),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: 320,
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
}));

function PurposeExplanation() {
  const navigate = useNavigate();
  const [progress] = useState(20); // 1 of 5 steps (20%)

  const handleContinue = () => {
    navigate('/verify');
  };

  const handleSkip = () => {
    navigate('/verify');
  };

  return (
    <PageContainer maxWidth="sm">
      <Paper 
        elevation={0}
        sx={{ 
          width: '100%', 
          padding: 4, 
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <ProgressContainer>
          <Typography variant="caption" align="left" display="block" gutterBottom>
            Step 1 of 5
          </Typography>
          <LinearProgress variant="determinate" value={progress} />
        </ProgressContainer>
        
        <Typography variant="h2" component="h1" gutterBottom>
          Intentional Dating
        </Typography>
        
        <IllustrationBox>
          {/* Placeholder for illustration */}
          <Box
            sx={{
              width: 150,
              height: 150,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #5E35B1 0%, #E57373 100%)',
              opacity: 0.7,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h4" color="white">Connection</Typography>
          </Box>
        </IllustrationBox>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          Intentify is designed for people seeking meaningful, long-term relationships. We focus on compatibility beyond surface-level attraction.
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          Our approach helps you find someone who shares your values, life goals, and relationship expectations.
        </Typography>
        
        <ButtonContainer>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            size="large"
            onClick={handleContinue}
          >
            Continue
          </Button>
          
          <Button 
            variant="text" 
            color="primary" 
            onClick={handleSkip}
          >
            Skip Introduction
          </Button>
        </ButtonContainer>
      </Paper>
    </PageContainer>
  );
}

export default PurposeExplanation;
