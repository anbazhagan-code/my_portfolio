import React, { useState } from 'react';
import FruitNinja from './components/FruitNinja';
import Header from './components/Header';
import Footer from './components/Footer';
import IntroSection from './components/IntroSection';
import SkillsSection from './components/SkillsSection';
import EducationSection from './components/EducationSection';
import WorkExperienceSection from './components/WorkExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import './App.css';

const App = () => {
  const [unlocked, setUnlocked] = useState(false);

  const handleUnlock = () => {
    setUnlocked(true);
  };

  return (
    <div className="App">
      {!unlocked ? (
        <FruitNinja onUnlock={handleUnlock} />
      ) : (
        <>
          <Header />
          <IntroSection />
          <SkillsSection />
          <EducationSection />
          <WorkExperienceSection />
          <ProjectsSection />
          <TestimonialsSection />
          <ContactSection />
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
