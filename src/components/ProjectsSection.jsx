import React, { useState, useRef } from 'react';
import { FaGithub, FaExternalLinkAlt, FaCode, FaFilter, FaTimes } from 'react-icons/fa';
import '../../assets/css/ProjectsSection.css';
import project1Img from './assets/project_1.jpg';
import project2Img from './assets/project_2.jpg';
import project3Img from './assets/project_3.jpg';
import project4Img from './assets/project_4.jpg';
import project5Img from './assets/project_5.png';
import project6Img from './assets/project_6.png';

const ProjectsSection = () => {
  const gridTopRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "Modern responsive portfolio showcasing my work with smooth animations and clean design.",
      tags: ["React", "AOS", "CSS3", "Responsive"],
      category: "Web",
      image: project1Img,
      github: "https://github.com/anbazhagan-code/my_portfolio",
      live: "https://anbazhagan.netlify.app/",
      featured: true
    },
    {
      id: 2,
      title: "Fashion E-commerce",
      description: "WordPress-based dress shop with WooCommerce integration and custom theme development.",
      tags: ["WordPress", "WooCommerce", "PHP", "Elementor"],
      category: "CMS",
      image: project2Img,
      github: "https://github.com/anbazhagan-code/wp_dress_shop",
      live: "#",
      featured: false
    },
    {
      id: 3,
      title: "React Mini Games",
      description: "A collection of interactive mind games built with React, including Memory Match, Tic Tac Toe, Typing Test, and more.",
      tags: ["React", "JavaScript", "Hooks", "Games"],
      category: "Others",
      image: project3Img,
      github: "https://github.com/anbazhagan-code/mini-games",
      live: "https://anbazhagan-code.github.io/mini-games/",
      featured: true
    },
    {
      id: 4,
      title: "Portfolio-2",
      description: "A clean and responsive personal portfolio built with Bootstrap 5, AOS animations, and smooth scrolling.",
      tags: ["Bootstrap", "HTML", "CSS", "AOS", "Responsive"],
      category: "Web",
      image: project4Img,
      github: "https://github.com/anbazhagan-code/portfolio_2",
      live: "#",
      featured: false
    },
    {
      id: 5,
      title: "Mental Health Counseling Website",
      description: "Static Mental Health Counseling Website with modern design and responsive layout.",
      tags: ["Bootstrap", "HTML", "CSS", "AOS", "Responsive"],
      category: "Web",
      image: project5Img,
      github: "https://github.com/anbazhagan-code/THULIR-IDAM",
      live: "https://thuliridam.netlify.app/",
      featured: false
    },
    {
      id: 6,
      title: "Taxi Booking Application",
      description: "Complete taxi booking system with Laravel backend, Filament admin panel, and MySQL database.",
      tags: ["Laravel", "Bootstrap", "MySQL", "Filament", "PHP"],
      category: "Web",
      image: project6Img,
      github: "#",
      live: "https://friendstrack.cloud/",
      featured: true
    }
  ];

  const filters = ['All', 'Web', 'CMS', 'Others'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 3);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <div className="projects-header">
          <span className="section-badge">
            <FaCode className="tag-icon" />
            My Work
          </span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A showcase of my best work and technical expertise
          </p>
        </div>

        {/* Filter Buttons - Desktop */}
        <div className="filters-desktop">
          {filters.map(filter => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => {
                setActiveFilter(filter);
                setShowAll(false);
              }}
            >
              {filter}
              {activeFilter === filter && <span className="filter-count">{filteredProjects.length}</span>}
            </button>
          ))}
        </div>

        {/* Filter Dropdown - Mobile */}
        <div className="filters-mobile">
          <button 
            className="mobile-filter-btn"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          >
            <FaFilter />
            {activeFilter}
            <span className="filter-count">{filteredProjects.length}</span>
          </button>
          {mobileFilterOpen && (
            <div className="mobile-filter-dropdown">
              {filters.map(filter => (
                <button
                  key={filter}
                  className={`mobile-filter-option ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => {
                    setActiveFilter(filter);
                    setShowAll(false);
                    setMobileFilterOpen(false);
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid" ref={gridTopRef}>
          {displayedProjects.map((project, index) => (
            <div 
              key={project.id}
              className={`project-card ${project.featured ? 'featured' : ''}`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {project.featured && (
                <div className="featured-badge">
                  <FaCode />
                  Featured
                </div>
              )}
              
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className={`project-overlay ${hoveredProject === project.id ? 'active' : ''}`}>
                  <div className="overlay-buttons">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="overlay-btn github"
                    >
                      <FaGithub />
                      <span>Code</span>
                    </a>
                    {project.live && project.live !== '#' && (
                      <a 
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="overlay-btn live"
                      >
                        <FaExternalLinkAlt />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="project-content">
                <div className="project-category">{project.category}</div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {filteredProjects.length > 3 && (
          <div className="view-more">
            <button
              className="view-more-btn"
              onClick={() => {
                if (showAll) {
                  setShowAll(false);
                  setTimeout(() => {
                    gridTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                } else {
                  setShowAll(true);
                }
              }}
            >
              {showAll ? 'Show Less Projects' : `View All Projects (${filteredProjects.length})`}
              {showAll ? <FaTimes /> : <FaExternalLinkAlt />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;