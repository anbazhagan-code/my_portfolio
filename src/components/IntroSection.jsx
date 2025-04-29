import React from 'react';
import '../../assets/css/IntroSection.css'; // Import the CSS file

const IntroSection = () => (
  <section id="home" className="section container">
    <div className="row">
      {/* Content Section */}
      <div className="col-6 content">
        <h2>Welcome!</h2>
        <p>I'm Anbazhagan, a passionate Laravel and WordPress Developer.</p>
      </div>
      {/* Photo Section */}
      <div className="col-6 photo">
        <img 
          src="/your-image.jpg" 
          alt="Anbazhagan" 
          className="profile-image" 
        />
      </div>
    </div>
  </section>
);

export default IntroSection;