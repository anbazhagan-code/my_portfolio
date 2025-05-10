import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaGraduationCap, FaSchool, FaBook } from 'react-icons/fa';
import '../../assets/css/EducationSection.css'; // Updated CSS path

const EducationSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true, // Animations trigger only once
    });
    AOS.refresh();
  }, []);

  const educationData = [
    {
      id: 1,
      degree: "Bachelor's Degree in Information Technology",
      school: "Indra Ganesan College of Engineering, Trichy",
      period: "2020 - 2024",
      icon: <FaGraduationCap className="edu-icon" />,
      description: "Specialized in Web Development, DBMS, Data Structures, and Algorithms. GPA: 8.4/10."
    },
    {
      id: 2,
      degree: "HSC & SSLC",
      school: "Lions Matriculation Hr Sec School, Ponnamaravathy",
      period: "2018 - 2020 (HSC) | 2017 - 2018 (SSLC)",
      icon: <FaSchool className="edu-icon" />,
      description: "Scored 68% in HSC and 85% in SSLC."
    }
  ];

  return (
    <section id="education" className="education-section">
      <div className="container">
        <h2 className="section-title" data-aos="flip-down">
          Education
        </h2>
        
        <div className="education-timeline">
          {educationData.map((edu, index) => (
            <div 
              key={edu.id}
              className="education-card"
              data-aos="fade-up"
              data-aos-delay={100 * (index + 1)}
            >
              <div className="card-icon">{edu.icon}</div>
              <div className="card-content">
                <h3>{edu.degree}</h3>
                <p className="school">{edu.school}</p>
                <p className="period">{edu.period}</p>
                <p className="description">{edu.description}</p>
                <div className="progress-line" data-aos="zoom-in-left" data-aos-delay="300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;