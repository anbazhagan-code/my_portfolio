import React, { useEffect, useState } from 'react';
import { FaLaravel, FaWordpress, FaHtml5, FaCss3, FaJs, FaBootstrap, FaGitAlt, FaPython, FaReact, FaPhp, FaDatabase } from 'react-icons/fa';
import '../../assets/css/SkillsSection.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const skillsData = [
  { name: "Laravel", icon: <FaLaravel />, level: "Intermediate", tagline: "Code like a pro!" },
  { name: "WordPress", icon: <FaWordpress />, level: "Intermediate", tagline: "Building blocks of the web!" },
  { name: "HTML & CSS", icon: <><FaHtml5 /><FaCss3 /></>, level: "Expert", tagline: "Structure and Style!" },
  { name: "JavaScript", icon: <FaJs />, level: "Advanced", tagline: "Scripting your ideas!" },
  { name: "Bootstrap", icon: <FaBootstrap />, level: "Expert", tagline: "Responsive design made easy!" },
  { name: "Git", icon: <FaGitAlt />, level: "Advanced", tagline: "Version control master!" },
  { name: "Python", icon: <FaPython />, level: "Intermediate", tagline: "Automating everything!" },
  { name: "React.js", icon: <FaReact />, level: "Advanced", tagline: "Building the future!" },
  { name: "PHP", icon: <FaPhp />, level: "Advanced", tagline: "Server-side champion!" },
  { name: "MySQL", icon: <FaDatabase />, level: "Advanced", tagline: "Data on demand!" },
];

const SkillsSection = () => {
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    
    // Staggered animation for cards
    const timer = setTimeout(() => {
      const intervals = skillsData.map((_, index) => {
        return setTimeout(() => {
          setVisibleCards(prev => [...prev, index]);
        }, index * 150);
      });
      return () => intervals.forEach(clearTimeout);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="skills" className="skills-section">
  <div className="skills-container">
    <h2 className="section-title" data-aos="flip-up">Skills</h2>
    <div className="skills-grid">
      {skillsData.map((skill, index) => (
        <div
          key={index}
          className={`skill-card ${visibleCards.includes(index) ? 'visible' : ''}`}
          style={{ '--delay': `${index * 150}ms` }}
          data-aos="fade-up"
          data-aos-delay={index * 100}
        >
              <div className="card-inner">
                <div className="card-front">
                  <div className="skill-icon">
                    {skill.icon}
                    <div className="icon-shadow"></div>
                  </div>
                  <h3 className="skill-name">{skill.name}</h3>
                </div>
                <div className="card-back">
                  <div className="skill-level">
                    {skill.level}
                  </div>
                  <div className="fun-tagline">
                    <p>{skill.tagline}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
