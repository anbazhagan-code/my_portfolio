import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Download, ArrowRight, Sparkles } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import '../../assets/css/IntroSection.css';
import profileImage from './assets/profile_1.png';
import { FaLaravel, FaWordpress, FaHtml5, FaReact } from "react-icons/fa";

const IntroSection = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section id="home" className="intro-section">
      <div className="animated-bg">
        <div className="gradient-sphere"></div>
        <div className="gradient-sphere-2"></div>
      </div>
      
      <div className="intro-container">
        <motion.div 
          className="intro-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div 
            className="badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles size={16} />
            <span>Full Stack Developer</span>
          </motion.div>
          
          <h1 className="intro-title">
            Crafting Digital
            <span className="gradient-text"> Experiences</span>
          </h1>
          
          <div className="intro-subtitle">
            I'm <span className="highlight">Anbazhagan</span> — 
            <TypeAnimation
              sequence={[
                'Web Developer',
                2000,
                'Laravel & CodeIgniter Expert',
                2000,
                'WordPress Specialist',
                2000,
                'Clean Code. Smooth UI.',
                2000
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              speed={50}
              className="typed-text"
            />
          </div>
          
          <p className="intro-description">
            I build exceptional digital experiences with clean code, 
            stunning designs, and powerful performance. Let's bring your ideas to life.
          </p>
          
          <div className="intro-cta">
            <motion.button 
              className="cta-button primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('/Anbu_Resume.pdf', '_blank')}
            >
              <Download size={18} />
              Download CV
            </motion.button>
            
            <motion.button 
              className="cta-button secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              Let's Talk
              <ArrowRight size={18} />
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          className="intro-image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ y, opacity }}
        >
          <div className="image-wrapper">
            <div className="glow-effect"></div>
            <img src={profileImage} alt="Anbazhagan" className="profile-image" />
            <div className="floating-elements">
              <div className="floating-element laravel"><FaLaravel /></div>
              <div className="floating-element wordpress"><FaWordpress /></div>
              <div className="floating-element js"><FaHtml5 /></div>
              <div className="floating-element react"><FaReact /></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroSection;