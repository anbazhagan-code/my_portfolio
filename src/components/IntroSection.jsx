import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail } from 'lucide-react';
import '../../assets/css/IntroSection.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { TypeAnimation } from 'react-type-animation';
import { useInView } from 'react-intersection-observer';
import profileImage from './assets/profile_1.png';

const IntroSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
      mirror: false
    });
  }, []);
  
  return (
    <section id="home" className="intro-section">
      <div className="intro-container">
        {/* Content Section */}
        <motion.div 
          className="intro-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2 }}
        >
          <h1 className="intro-title">
            Hi, I'm <span className="matrix-highlight" data-text="Anbazhagan">Anbazhagan</span>
          </h1>
          <h2 className="intro-subtitle">
            <TypeAnimation
              sequence={[
                'Web Developer',
                1500,
                'WordPress Developer',
                1500,
                'Web Designer',
                1500
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              style={{ display: 'inline-block' }}
            />
          </h2>
          <p className="intro-description">
            I craft robust web solutions with clean code and pixel-perfect designs. 
            Passionate about creating seamless digital experiences that drive results.
          </p>
          
          <div className="intro-cta">
            <motion.button 
              className="cta-button primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('/Anbu_Resume.pdf', '_blank')}
            >
              <Download size={18} className="icon" />
              Download CV
            </motion.button>
            
            <motion.button 
              className="cta-button secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = 'https://github.com/anbazhagan-code'}
            >
              View My Work
            </motion.button>
          </div>
        </motion.div>

        {/* Photo Section */}
        <motion.div
  className="intro-image flip-card"
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 2, delay: 0.2 }}
>
  <div className="flip-card-inner">
    {/* Front Side - Profile Photo */}
    <div className="flip-card-front">
      <img 
        src={profileImage} 
        alt="Anbazhagan" 
        className="profile-image" 
      />
    </div>
    
    {/* Back Side - Quote */}
    <div className="flip-card-back">
      <div className="quote-content">
        <blockquote>
          "Code is like poetry. When done well,
          it transforms complexity into elegance."
        </blockquote>
        <div className="quote-decoration">❝</div>
      </div>
    </div>
  </div>
</motion.div>
      </div>
    </section>
  );
};

export default IntroSection;