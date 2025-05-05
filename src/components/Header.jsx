import React, { useState, useEffect } from 'react';
import '../../assets/css/Header.css';
import logo from './assets/logo_1.png';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Highlight active section
      const sections = ['home', 'skills', 'education', 'experience', 'projects', 'contact'];
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveLink(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
      <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
  <img src={logo} alt="Anbu Logo" className="logo-img" />
</div>
        
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <nav className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
          {['home', 'skills', 'education', 'experience', 'projects', 'contact'].map((item) => (
            <a 
              key={item}
              href={`#${item}`} 
              className={`nav-link ${activeLink === item ? 'active' : ''}`}
              onClick={() => {
                setActiveLink(item);
                setMobileMenuOpen(false);
              }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
              <span className="nav-link-underline"></span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;