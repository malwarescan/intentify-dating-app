import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Styled components
const WelcomeContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: theme.spacing(4),
  textAlign: 'center',
}));

const Logo = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& img': {
    width: 120,
    height: 120,
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

const TermsText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  fontSize: '12px',
}));

function Welcome() {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate('/purpose');
  };

  const handleLogin = () => {
    // For the prototype, we'll just navigate to the purpose page as well
    navigate('/purpose');
  };

  return (
    <WelcomeContainer maxWidth="sm">
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
        <Logo>
          {/* Placeholder for logo */}
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              backgroundColor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h2" color="white">I</Typography>
          </Box>
        </Logo>
        
        <Typography variant="h1" component="h1" gutterBottom>
          Intentify
        </Typography>
        
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Dating with purpose
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          Connect with people who share your vision for the future
        </Typography>
        
        <ButtonContainer>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            size="large"
            onClick={handleCreateAccount}
          >
            Create Account
          </Button>
          
          <Button 
            variant="outlined" 
            color="primary" 
            fullWidth 
            size="large"
            onClick={handleLogin}
          >
            Log In
          </Button>
        </ButtonContainer>
        
        <TermsText color="text.secondary">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </TermsText>
      </Paper>
    </WelcomeContainer>
  );
}

export default Welcome;
