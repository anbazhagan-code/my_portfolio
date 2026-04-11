import React, { useEffect, useState, useRef } from 'react';
import { 
  FaLaravel, FaWordpress, FaHtml5, FaCss3, FaJs, 
  FaBootstrap, FaGitAlt, FaPython, FaReact, FaPhp, 
  FaDatabase, FaRocket 
} from 'react-icons/fa';
import { SiCodeigniter } from 'react-icons/si';
import '../../assets/css/SkillsSection.css';

const skillsData = [
  { name: "Laravel", icon: <FaLaravel />, level: "Advanced", tagline: "Elegant PHP Framework", color: "#ff2d20" },
  { name: "CodeIgniter", icon: <SiCodeigniter />, level: "Advanced", tagline: "Lightning Fast MVC", color: "#EF4223" },
  { name: "WordPress", icon: <FaWordpress />, level: "Advanced", tagline: "CMS Master", color: "#21759b" },
  { name: "React.js", icon: <FaReact />, level: "Intermediate", tagline: "UI Library", color: "#61dafb" },
  { name: "PHP", icon: <FaPhp />, level: "Advanced", tagline: "Server-side Scripting", color: "#777bb4" },
  { name: "JavaScript", icon: <FaJs />, level: "Advanced", tagline: "Dynamic Web", color: "#f7df1e" },
  { name: "HTML5", icon: <FaHtml5 />, level: "Expert", tagline: "Structure", color: "#e34f26" },
  { name: "CSS3", icon: <FaCss3 />, level: "Expert", tagline: "Styling", color: "#1572b6" },
  { name: "Bootstrap", icon: <FaBootstrap />, level: "Expert", tagline: "Responsive Design", color: "#7952b3" },
  { name: "MySQL", icon: <FaDatabase />, level: "Advanced", tagline: "Database Management", color: "#4479a1" },
  { name: "Git", icon: <FaGitAlt />, level: "Advanced", tagline: "Version Control", color: "#f05032" },
  { name: "Python", icon: <FaPython />, level: "Intermediate", tagline: "Automation & AI", color: "#3776ab" }
];

const SkillsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Simple intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = document.querySelectorAll('.skill-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('visible');
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      {/* Animated Background Elements */}
      <div className="skills-bg">
        <div className="bg-blob blob-1"></div>
        <div className="bg-blob blob-2"></div>
        <div className="bg-blob blob-3"></div>
      </div>

      <div className="skills-container">
        <div className="skills-header">
          <span className="section-badge">
            <FaRocket className="badge-icon" />
            Technical Expertise
          </span>
          <h2 className="section-title">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="section-subtitle">
            Technologies I work with to build amazing digital experiences
          </p>
        </div>

        <div className="skills-grid">
          {skillsData.map((skill, index) => (
            <div
              key={index}
              className={`skill-card ${hoveredIndex === index ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="card-glow" style={{ background: `radial-gradient(circle at center, ${skill.color}20 0%, transparent 70%)` }}></div>
              
              <div className="skill-icon-wrapper">
                <div className="skill-icon" style={{ color: skill.color }}>
                  {skill.icon}
                </div>
                <div className="icon-ring" style={{ borderColor: `${skill.color}40` }}></div>
              </div>
              
              <h3 className="skill-name">{skill.name}</h3>
              
              <div className="skill-level">
                <span className="level-badge" style={{ background: `${skill.color}20`, color: skill.color }}>
                  {skill.level}
                </span>
              </div>
              
              <p className="skill-tagline">{skill.tagline}</p>
              
              <div className="skill-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      background: skill.color,
                      width: hoveredIndex === index ? '100%' : '0%'
                    }}
                  ></div>
                </div>
              </div>
              
              <div className="skill-overlay"></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="skills-stats">
          <div className="stat-item">
            <div className="stat-number">1+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">20+</div>
            <div className="stat-label">Projects Completed</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">10+</div>
            <div className="stat-label">Technologies</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Commitment to Quality</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;