import React, { useEffect } from 'react';
import '../../assets/css/IntroSection.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import reactLogo from './assets/profile_1.png';

const IntroSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

  return (
    <section id="home" className="section container">
      <div className="row">
        {/* Content Section */}
        <div className="col-6 content" data-aos="fade-right" data-aos-delay="100">
          <h2 className="title">Welcome!</h2>
          <p className="subtitle">I'm Anbazhagan, a passionate Laravel and WordPress Developer.</p>
          <div className="cta-container">
            <button className="cta-button">View My Work</button>
          </div>
        </div>
        
        {/* Photo Section */}
        <div className="col-6 photo" data-aos="fade-left" data-aos-delay="200">
          <div className="image-container">
          <img 
              src={reactLogo} 
              alt="Anbazhagan" 
              className="profile-image" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;