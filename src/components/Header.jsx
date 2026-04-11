import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X } from 'lucide-react';
import '../../assets/css/Header.css';
import logo from './assets/logo_1.png';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'services', 'skills', 'education', 'experience', 'projects', 'contact'];
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

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src={logo} alt="Logo" className="logo-img" />
        </div>
        
        <nav className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
          {['home', 'services', 'skills', 'education', 'experience', 'projects', 'contact'].map((item) => (
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
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button className="mobile-menu-button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;