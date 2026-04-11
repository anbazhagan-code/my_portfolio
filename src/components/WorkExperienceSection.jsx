import React, { useEffect, useRef } from 'react';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaBuilding } from 'react-icons/fa';
import '../../assets/css/WorkExperienceSection.css';

const WorkExperienceSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = document.querySelectorAll('.timeline-item');
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('visible');
              }, index * 200);
            });
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

  const experiences = [
    {
      id: 1,
      role: "Web Developer",
      company: "Salesqueen Software Solution",
      duration: "Feb 2026 - Present",
      location: "Chennai, India",
      responsibilities: [
        "Working on ERP-based web applications using CodeIgniter framework",
        "Developing and maintaining modules for inventory, billing, and user management",
        "Improving UI and functionality for internal business workflows",
        "Debugging issues and optimizing application performance"
      ],
      skills: ["CodeIgniter", "PHP", "MySQL", "JavaScript", "HTML/CSS", "Bootstrap"]
    },
    {
      id: 2,
      role: "Web Developer",
      company: "Sivasethu Info Tech",
      duration: "Feb 2025 - Jan 2026",
      location: "Trichy, India",
      responsibilities: [
        "Developed CRM and eCommerce web applications using Laravel framework",
        "Built and customized WordPress websites based on client requirements",
        "Created responsive static websites using HTML, CSS, and JavaScript",
        "Handled bug fixing, testing, and deployment support for live projects"
      ],
      skills: ["Laravel", "WordPress", "PHP", "MySQL", "JavaScript", "HTML/CSS", "Bootstrap"]
    }
  ];

  return (
    <section id="experience" className="experience-section" ref={sectionRef}>
      <div className="experience-container">
        <div className="experience-header">
          <span className="section-badge">
            <FaBriefcase className="tag-icon" />
            Career Journey
          </span>
          <h2 className="section-title">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subtitle">
            Professional experience building web solutions
          </p>
        </div>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <div 
              key={exp.id}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
            >
              <div className="timeline-dot">
                <div className="dot-inner"></div>
              </div>
              
              <div className="timeline-card">
                <div className="card-header flex-column">
                  <div className="role-badge">
                    <FaBriefcase />
                    <span>{exp.role}</span>
                  </div>
                  
                  <div className="company-info">
                    <FaBuilding />
                    <h3>{exp.company}</h3>
                  </div>
                  
                  <div className="meta-info">
                    <div className="meta-item">
                      <FaCalendarAlt />
                      <span>{exp.duration}</span>
                    </div>
                    <div className="meta-item">
                      <FaMapMarkerAlt />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="card-body">
                  <h4>Key Responsibilities</h4>
                  <ul className="responsibilities-list">
                    {exp.responsibilities.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="card-footer">
                  <h4>Technologies Used</h4>
                  <div className="skills-cloud">
                    {exp.skills.map((skill, i) => (
                      <span key={i} className="skill-tag">{skill}</span>
                    ))}
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

export default WorkExperienceSection;