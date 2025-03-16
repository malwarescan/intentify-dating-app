import React, { useState } from 'react';
import { Box, Typography, Button, Container, Paper, LinearProgress, TextField, Grid, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import FacebookIcon from '@mui/icons-material/Facebook';

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

const VerificationOption = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius * 2,
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[3],
  },
}));

const VerificationIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 48,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.light,
  marginRight: theme.spacing(2),
  color: theme.palette.primary.contrastText,
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: 320,
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
}));

function Verification() {
  const navigate = useNavigate();
  const [progress] = useState(40); // 2 of 5 steps (40%)
  const [activeVerification, setActiveVerification] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleVerificationSelect = (method) => {
    setActiveVerification(method);
  };

  const handleContinue = () => {
    navigate('/create-profile');
  };

  return (
    <PageContainer maxWidth="sm">
      <Paper 
        elevation={0}
        sx={{ 
          width: '100%', 
          padding: 4, 
          borderRadius: 4,
        }}
      >
        <ProgressContainer>
          <Typography variant="caption" align="left" display="block" gutterBottom>
            Step 2 of 5
          </Typography>
          <LinearProgress variant="determinate" value={progress} />
        </ProgressContainer>
        
        <Typography variant="h2" component="h1" gutterBottom>
          Let's Verify Your Account
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          We verify all users to ensure a safe and authentic community
        </Typography>
        
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Required Verification
          </Typography>
          
          <VerificationOption 
            onClick={() => handleVerificationSelect('phone')}
            sx={{ 
              border: activeVerification === 'phone' ? '2px solid' : '1px solid',
              borderColor: activeVerification === 'phone' ? 'primary.main' : 'divider',
            }}
          >
            <VerificationIcon>
              <PhoneIcon />
            </VerificationIcon>
            <Box>
              <Typography variant="h5">Phone Number</Typography>
              <Typography variant="body2" color="text.secondary">
                Verify with a code sent to your phone
              </Typography>
            </Box>
          </VerificationOption>
          
          {activeVerification === 'phone' && (
            <Box sx={{ p: 2, mb: 3 }}>
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1 (555) 123-4567"
                sx={{ mb: 2 }}
              />
              <Button 
                variant="contained" 
                color="primary"
                disabled={!phoneNumber}
              >
                Send Verification Code
              </Button>
            </Box>
          )}
          
          <VerificationOption 
            onClick={() => handleVerificationSelect('email')}
            sx={{ 
              border: activeVerification === 'email' ? '2px solid' : '1px solid',
              borderColor: activeVerification === 'email' ? 'primary.main' : 'divider',
            }}
          >
            <VerificationIcon>
              <EmailIcon />
            </VerificationIcon>
            <Box>
              <Typography variant="h5">Email</Typography>
              <Typography variant="body2" color="text.secondary">
                Verify with a link sent to your email
              </Typography>
            </Box>
          </VerificationOption>
          
          {activeVerification === 'email' && (
            <Box sx={{ p: 2, mb: 3 }}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                type="email"
                placeholder="your.email@example.com"
                sx={{ mb: 2 }}
              />
              <Button 
                variant="contained" 
                color="primary"
              >
                Send Verification Email
              </Button>
            </Box>
          )}
          
          <Divider sx={{ my: 4 }} />
          
          <Typography variant="h5" gutterBottom>
            Optional Verification (Recommended)
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <VerificationOption>
                <VerificationIcon>
                  <BadgeIcon />
                </VerificationIcon>
                <Box>
                  <Typography variant="h5">ID Verification</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Verify your identity
                  </Typography>
                </Box>
              </VerificationOption>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <VerificationOption>
                <VerificationIcon>
                  <FacebookIcon />
                </VerificationIcon>
                <Box>
                  <Typography variant="h5">Social Media</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Link your accounts
                  </Typography>
                </Box>
              </VerificationOption>
            </Grid>
          </Grid>
        </Box>
        
        <ButtonContainer sx={{ mx: 'auto', mt: 4 }}>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            size="large"
            onClick={handleContinue}
          >
            Continue with Verification
          </Button>
        </ButtonContainer>
      </Paper>
    </PageContainer>
  );
}

export default Verification;
