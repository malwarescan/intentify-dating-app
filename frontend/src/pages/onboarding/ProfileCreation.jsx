import React, { useState } from 'react';
import { Box, Typography, Button, Container, Paper, LinearProgress, TextField, Grid, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

const PhotoUploadContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const PhotoUploadBox = styled(Box)(({ theme }) => ({
  width: 100,
  height: 100,
  borderRadius: theme.shape.borderRadius,
  border: `1.5px dashed ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  backgroundColor: theme.palette.background.paper,
}));

const PhotoPreview = styled(Box)(({ theme }) => ({
  width: 100,
  height: 100,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  position: 'relative',
  '&:hover .overlay': {
    opacity: 1,
  },
}));

const PhotoOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.2s ease-in-out',
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: 320,
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
}));

function ProfileCreation() {
  const navigate = useNavigate();
  const [progress] = useState(60); // 3 of 5 steps (60%)
  const [photos, setPhotos] = useState([null, null, null, null, null, null]);

  const handlePhotoUpload = (index) => {
    // In a real app, this would open a file picker
    // For the prototype, we'll just set a placeholder image
    const newPhotos = [...photos];
    newPhotos[index] = `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 1}.jpg`;
    setPhotos(newPhotos);
  };

  const handleContinue = () => {
    navigate('/values');
  };

  const handleBack = () => {
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
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={handleBack} edge="start" sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4">Create Your Profile</Typography>
        </Box>
        
        <ProgressContainer>
          <Typography variant="caption" align="left" display="block" gutterBottom>
            Step 3 of 5
          </Typography>
          <LinearProgress variant="determinate" value={progress} />
        </ProgressContainer>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          Let's create a profile that showcases the real you
        </Typography>
        
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Basic Information
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                required
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Age"
                variant="outlined"
                type="number"
                required
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Location"
                variant="outlined"
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Occupation"
                variant="outlined"
                required
              />
            </Grid>
          </Grid>
          
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Photos (minimum 3, maximum 8)
          </Typography>
          
          <PhotoUploadContainer>
            {photos.map((photo, index) => (
              photo ? (
                <PhotoPreview key={index}>
                  <img src={photo} alt={`Profile ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <PhotoOverlay className="overlay">
                    <IconButton size="small" sx={{ color: 'white' }}>
                      <AddAPhotoIcon />
                    </IconButton>
                  </PhotoOverlay>
                </PhotoPreview>
              ) : (
                <PhotoUploadBox key={index} onClick={() => handlePhotoUpload(index)}>
                  <AddAPhotoIcon color="action" />
                </PhotoUploadBox>
              )
            ))}
          </PhotoUploadContainer>
          
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            About You
          </Typography>
          
          <TextField
            fullWidth
            label="Bio"
            variant="outlined"
            multiline
            rows={4}
            placeholder="Tell potential matches about yourself..."
            sx={{ mb: 2 }}
          />
        </Box>
        
        <ButtonContainer sx={{ mx: 'auto', mt: 4 }}>
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
            onClick={() => {}}
          >
            Save and Continue Later
          </Button>
        </ButtonContainer>
      </Paper>
    </PageContainer>
  );
}

export default ProfileCreation;
