import React from 'react';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import '../../assets/css/WorkExperienceSection.css'; // Create this CSS file

const WorkExperienceSection = () => {
  const experiences = [
    {
      id: 1,
      role: "Web Developer",
      company: "Zaroid Technologies",
      duration: "Feb 2025 - Present",
      location: "Kumbakonam, India",
      responsibilities: [
        "Developing responsive web applications using modern frameworks.",
        "Creating and customizing WordPress websites based on client requirements.",
        "Managing and maintaining Laravel-based backend systems.",
        "Testing and debugging applications to ensure cross-browser compatibility and performance."
      ],
      skills: ["HTML/CSS", "JavaScript", "Bootstrap", "Laravel", "Wordpress", "MySQL"]
    },
    {
      id: 2,
      role: "Intern Web Developer",
      company: "Sivasethu Infotech",
      duration: "Apr 2024 - May 2024",
      location: "Trichy, India",
      responsibilities: [
        "Learned industry best practices for web development.",
        "Assisted in developing and maintaining company websites.",
        "Worked on the development of an online exam portal, focusing on user interface and functionality."
      ],
      skills: ["HTML/CSS", "JavaScript", "PHP", "MySQL"]
    }
    
  ];

  return (
    <section id="experience" className="work-experience">
      <div className="container">
        <h2 className="section-title">
          Work Experience
        </h2>
        
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div 
              key={exp.id}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="timeline-card">
                <div className="card-header">
                  <h3>{exp.role}</h3>
                  <h4>{exp.company}</h4>
                  <div className="meta">
                    <span><FaCalendarAlt /> {exp.duration}</span>
                    <span><FaMapMarkerAlt /> {exp.location}</span>
                  </div>
                </div>
                <div className="card-body">
                  <h5>Key Responsibilities:</h5>
                  <ul>
                    {exp.responsibilities.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="card-footer">
                  <div className="skills">
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
