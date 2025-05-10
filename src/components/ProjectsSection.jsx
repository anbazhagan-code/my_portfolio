import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa';
import { motion } from 'framer-motion';
import 'aos/dist/aos.css';
import '../../assets/css/ProjectsSection.css';

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [showAll, setShowAll] = useState(false); // 👈 for toggling project view

  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "Modern responsive portfolio showcasing my work with smooth animations and clean design.",
      tags: ["React", "GSAP", "CSS3", "Responsive"],
      category: "Frontend",
      image: "/images/portfolio.jpg",
      github: "#",
      live: "#"
    },
    {
      id: 2,
      title: "Fashion E-commerce",
      description: "WordPress-based dress shop with WooCommerce integration and custom theme development.",
      tags: ["WordPress", "WooCommerce", "PHP", "Elementor"],
      category: "CMS",
      image: "/images/fashion.jpg",
      github: "#",
      live: "#"
    },
    // Add more projects as needed
  ];

  const filters = ['All', 'Full Stack', 'Frontend', 'CMS'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 3); // 👈 show only 3 if showAll is false

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          My Projects
        </motion.h2>

        <motion.div 
          className="filters"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {filters.map(filter => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => {
                setActiveFilter(filter);
                setShowAll(false); // 👈 reset view on filter change
              }}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        <div className="projects-grid">
          {displayedProjects.map((project, index) => (
            <motion.div 
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className={`overlay ${hoveredProject === project.id ? 'active' : ''}`}>
                  <div className="overlay-content">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <FaGithub /> Code
                    </a>
                    {project.live && (
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <FaExternalLinkAlt /> Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length > 3 && (
          <motion.div
            className="view-more"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <button className="cta-btn" onClick={() => setShowAll(!showAll)}>
              {showAll ? 'Show Less Projects' : 'View More Projects'} <FaCode className="icon" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
