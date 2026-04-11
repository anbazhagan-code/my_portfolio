import React, { useEffect, useRef } from 'react';
import { FaGraduationCap, FaSchool, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import '../../assets/css/EducationSection.css';

const EducationSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = document.querySelectorAll('.education-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('visible');
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

  const educationData = [
    {
      id: 1,
      degree: "Bachelor of Engineering in Information Technology",
      institution: "Indra Ganesan College of Engineering",
      location: "Trichy, Tamil Nadu",
      period: "2020 - 2024",
      score: "CGPA: 8.4/10",
      icon: <FaGraduationCap />,
      courses: ["Web Development", "Database Management", "Data Structures", "Algorithms"]
    },
    {
      id: 2,
      degree: "Higher Secondary Education (HSC)",
      institution: "Lions Matriculation Higher Secondary School",
      location: "Ponnamaravathy, Tamil Nadu",
      period: "2018 - 2020",
      score: "Percentage: 68%",
      icon: <FaSchool />,
      courses: ["Tamil", "English","Biology", "Mathematics", "Physics"]
    },
    {
      id: 3,
      degree: "Secondary School Leaving Certificate (SSLC)",
      institution: "Lions Matriculation Higher Secondary School",
      location: "Ponnamaravathy, Tamil Nadu",
      period: "2017 - 2018",
      score: "Percentage: 85%",
      icon: <FaSchool />,
      courses: ["Tamil", "English","Mathematics","Science"]
    }
  ];

  return (
    <section id="education" className="education-section" ref={sectionRef}>
      <div className="education-container">
        <div className="education-header">
          <span className="section-badge"><FaGraduationCap className="tag-icon" />Academic Journey</span>
          <h2 className="section-title">
            Education <span className="gradient-text">Background</span>
          </h2>
          <p className="section-subtitle">
            My formal education and academic achievements
          </p>
        </div>

        <div className="education-grid">
          {educationData.map((edu, index) => (
            <div 
              key={edu.id}
              className="education-card"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="card-header">
                <div className="icon-wrapper">
                  {edu.icon}
                </div>
                <div className="period-badge">
                  <FaCalendarAlt />
                  <span>{edu.period}</span>
                </div>
              </div>
              
              <div className="card-body">
                <h3 className="degree">{edu.degree}</h3>
                <p className="institution">{edu.institution}</p>
                
                <div className="location">
                  <FaMapMarkerAlt />
                  <span>{edu.location}</span>
                </div>
                
                <div className="score-badge">
                  {edu.score}
                </div>
                
                <div className="courses">
                  <h4>Key Subjects</h4>
                  <div className="courses-list">
                    {edu.courses.map((course, idx) => (
                      <span key={idx} className="course-tag">{course}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="card-border"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;