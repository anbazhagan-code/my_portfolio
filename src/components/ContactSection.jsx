import React, { useState } from 'react';
import { 
  FaEnvelope, FaPhoneAlt, FaLinkedin, FaGithub, 
  FaInstagram, FaPaperPlane, FaMapMarkerAlt, 
  FaClock, FaCheckCircle, FaExclamationCircle 
} from 'react-icons/fa';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/mbloodgj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <span className="section-badge"><FaEnvelope className="tag-icon" />Get In Touch</span>
          <h2 className="section-title">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind? I'd love to hear about it
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Side - Contact Info */}
          <div className="contact-info">
            <div className="info-card">
              <div className="info-header">
                <h3>Contact Information</h3>
                <p>Feel free to reach out anytime</p>
              </div>
              
              <div className="info-items">
                <div className="info-item">
                  <div className="info-icon email">
                    <FaEnvelope />
                  </div>
                  <div className="info-details">
                    <h4>Email Me</h4>
                    <a href="mailto:anbazhagan.code@gmail.com">anbazhagan.code@gmail.com</a>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon phone">
                    <FaPhoneAlt />
                  </div>
                  <div className="info-details">
                    <h4>Call Me</h4>
                    <a href="tel:+919344230554">+91-9344230554</a>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon location">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="info-details">
                    <h4>Location</h4>
                    <span>Pudukkottai, India</span>
                  </div>
                </div>

                {/* <div className="info-item">
                  <div className="info-icon hours">
                    <FaClock />
                  </div>
                  <div className="info-details">
                    <h4>Working Hours</h4>
                    <span>Mon-Fri: 9AM - 6PM</span>
                  </div>
                </div> */}
              </div>

              <div className="social-section">
                <h4>Connect With Me</h4>
                <div className="social-links">
                  <a 
                    href="https://www.linkedin.com/in/anbazhagan-s-4121052ba" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link linkedin"
                  >
                    <FaLinkedin />
                  </a>
                  <a 
                    href="https://github.com/anbazhagan-code" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link github"
                  >
                    <FaGithub />
                  </a>
                  <a 
                    href="https://www.instagram.com/anbuazhagan_18/?hl=en" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link instagram"
                  >
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-header">
                <h3>Send a Message</h3>
                <p>I'll get back to you within 24 hours</p>
              </div>
              
              <div className="form-group">
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
                <label>Your Name</label>
                <span className="focus-border"></span>
              </div>

              <div className="form-group">
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
                <label>Your Email</label>
                <span className="focus-border"></span>
              </div>

              <div className="form-group">
                <textarea 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  required 
                ></textarea>
                <label>Your Message</label>
                <span className="focus-border"></span>
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="status-message success">
                  <FaCheckCircle />
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="status-message error">
                  <FaExclamationCircle />
                  Error sending message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;