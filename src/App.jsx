import React, { useState } from 'react';
import FruitNinja from './components/FruitNinja';
import Header from './components/Header';
import Footer from './components/Footer';
import IntroSection from './components/IntroSection';
import SkillsSection from './components/SkillsSection';
import EducationSection from './components/EducationSection';
import WorkExperienceSection from './components/WorkExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import ServiceSection from './components/ServiceSection';
import ContactSection from './components/ContactSection';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const [showPrompt, setShowPrompt] = useState(true);
  const [playGame, setPlayGame] = useState(false);

  const handlePlayGame = () => {
    setPlayGame(true);
    setShowPrompt(false);
  };

  const handleSkipGame = () => {
    setPlayGame(false);
    setShowPrompt(false);
  };

  if (showPrompt) {
    return (
      <div className="welcome-screen">
        <h2 className='section-title'>Welcome!</h2>
        <p>Do you want to play a game before viewing the portfolio?</p>
        <button onClick={handlePlayGame}>Play Game</button>
        <button onClick={handleSkipGame}>Skip Game</button>
      </div>
    );
  }

  return (
    <div className="App">
      {playGame ? (
        <FruitNinja onUnlock={() => setPlayGame(false)} />
      ) : (
        <>
          <Header />
          <IntroSection />
          <ServiceSection />
          <SkillsSection />
          <EducationSection />
          <WorkExperienceSection />
          <ProjectsSection />
          <ContactSection />
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
