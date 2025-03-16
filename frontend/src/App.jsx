import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// Onboarding pages
import Welcome from './pages/onboarding/Welcome';
import PurposeExplanation from './pages/onboarding/PurposeExplanation';
import Verification from './pages/onboarding/Verification';
import ProfileCreation from './pages/onboarding/ProfileCreation';
import ValuesAssessment from './pages/onboarding/ValuesAssessment';
import RelationshipExpectations from './pages/onboarding/RelationshipExpectations';

// Main app pages
import Home from './pages/main/Home';
import MatchProfile from './pages/main/MatchProfile';
import Compatibility from './pages/main/Compatibility';
import Messages from './pages/main/Messages';
import Milestones from './pages/main/Milestones';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Onboarding Flow */}
          <Route path="/" element={<Welcome />} />
          <Route path="/purpose" element={<PurposeExplanation />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/create-profile" element={<ProfileCreation />} />
          <Route path="/values" element={<ValuesAssessment />} />
          <Route path="/relationship-goals" element={<RelationshipExpectations />} />
          
          {/* Main App */}
          <Route path="/home" element={<Home />} />
          <Route path="/match/:id" element={<MatchProfile />} />
          <Route path="/compatibility/:id" element={<Compatibility />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/milestones" element={<Milestones />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
