import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, Monitor, Layout, Smartphone, ShoppingCart, 
  Palette, Zap, Shield, Globe, Database, Cloud, 
  Figma, Github, Server, Cpu, Settings, 
  ChevronLeft, ChevronRight, Sparkles
} from 'lucide-react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import '../../assets/css/ServiceSection.css';

const services = [
  {
    title: 'Web Development',
    description: 'Building responsive web apps using Laravel, CodeIgniter, and modern frontend tools efficiently.',
    icon: <Code className="service-icon" />,
    gradient: 'gradient-1',
    tags: ['Laravel', 'CodeIgniter', 'PHP']
  },
  {
    title: 'Frontend Development',
    description: 'Creating clean UI using React, HTML, CSS, and JavaScript for smooth and responsive user experience.',
    icon: <Layout className="service-icon" />,
    gradient: 'gradient-2',
    tags: ['React', 'HTML', 'CSS', 'JS']
  },
  {
    title: 'WordPress Development',
    description: 'Developing WordPress sites with theme customization, plugin setup, and easy content management tools.',
    icon: <Monitor className="service-icon" />,
    gradient: 'gradient-3',
    tags: ['WordPress', 'Themes', 'Plugins']
  },
  {
    title: 'Responsive Design',
    description: 'Designing mobile-first layouts that adapt smoothly across devices, ensuring consistency and usability.',
    icon: <Smartphone className="service-icon" />,
    gradient: 'gradient-4',
    tags: ['Mobile', 'Tablet', 'Desktop']
  },
  {
    title: 'Website Maintenance',
    description: 'Handling bug fixes, updates, and performance improvements to keep websites stable and running smoothly.',
    icon: <Settings className="service-icon" />,
    gradient: 'gradient-5',
    tags: ['Bug Fixing', 'Updates', 'Support']
  },
  {
    title: 'Basic SEO Optimization',
    description: 'Improving visibility using meta tags, structured content, and performance tweaks for better ranking.',
    icon: <Globe className="service-icon" />,
    gradient: 'gradient-6',
    tags: ['SEO', 'Meta Tags', 'Performance']
  }
];
const ServiceSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [cardsPerView, setCardsPerView] = useState(3);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-out', once: false });
    
    const handleResize = () => {
      if (window.innerWidth < 640) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 4000);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [currentIndex, isAutoPlaying]);

  const totalSlides = Math.ceil(services.length / cardsPerView);
  const currentServices = services.slice(
    currentIndex * cardsPerView,
    (currentIndex + 1) * cardsPerView
  );

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return (
    <section id="services" className="services-section">
      {/* Animated Background */}
      <div className="services-bg">
        <div className="bg-gradient-1"></div>
        <div className="bg-gradient-2"></div>
        <div className="bg-gradient-3"></div>
      </div>

      <div className="services-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="services-header"
        >
          <span className="section-badge">
            <Globe size={16} />
            What I Offer
          </span>
          <h2 className="section-title">
            Services & Solutions
          </h2>
          <p className="section-subtitle">
            Comprehensive web solutions tailored to your business needs
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="carousel-container">
          <button 
            className="carousel-nav prev"
            onClick={prevSlide}
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="carousel-track" ref={carouselRef}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="services-grid"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {currentServices.map((service, idx) => (
                  <motion.div
                    key={service.title}
                    className={`service-card ${service.gradient}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    whileHover={{ 
                      y: -10,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="card-glow"></div>
                    
                    <div className="icon-container">
                      {service.icon}
                      <div className="icon-bg"></div>
                    </div>
                    
                    <h3 className="service-title">{service.title}</h3>
                    
                    <p className="service-description">{service.description}</p>
                    
                    <div className="service-tags">
                      {service.tags.map((tag, i) => (
                        <span key={i} className="tag">{tag}</span>
                      ))}
                    </div>
                    
                    <motion.button 
                      className="learn-more"
                      whileHover={{ x: 5 }}
                      onClick={() => console.log(`Learn more about ${service.title}`)}
                    >
                      Learn More →
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <button 
            className="carousel-nav next"
            onClick={nextSlide}
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="carousel-dots">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              className={`dot ${currentIndex === idx ? 'active' : ''}`}
              onClick={() => goToSlide(idx)}
            >
              <span className="dot-inner"></span>
            </button>
          ))}
        </div>

        {/* Auto-play Indicator */}
        <div className="auto-play-indicator">
          <div className="auto-play-bar" style={{ animation: isAutoPlaying ? 'slideBar 4s linear infinite' : 'none' }}></div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;