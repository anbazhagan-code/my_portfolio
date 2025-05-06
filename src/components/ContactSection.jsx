import React, { useState } from 'react';
import { FaEnvelope, FaPhoneAlt, FaLinkedin, FaGithub, FaInstagram, FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';
import 'aos/dist/aos.css';
import '../../assets/css/ContactSection.css';

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
      // Using Formspree free tier for form submission
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
        <motion.h2 
          className="section-title"
        >
          Get In Touch
        </motion.h2>

        <div className="contact-grid">
          {/* Left Side - Contact Info */}
          <motion.div 
            className="contact-info-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3>Contact Information</h3>
            
            <div className="contact-method">
              <div className="icon-circle">
                <FaEnvelope className="icon" />
              </div>
              <div>
                <h4>Email</h4>
                <a href="mailto:anbazhagan.code@gmail.com">anbazhagan.code@gmail.com</a>
              </div>
            </div>

            <div className="contact-method">
              <div className="icon-circle">
                <FaPhoneAlt className="icon" />
              </div>
              <div>
                <h4>Phone</h4>
                <a href="tel:+919344230554">+91-9344230554</a>
              </div>
            </div>

            <div className="social-links">
              <motion.a 
                href="https://www.linkedin.com/in/anbazhagan-s-4121052ba" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
              >
                <FaLinkedin />
              </motion.a>
              <motion.a 
                href="https://github.com/anbazhagan-code" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
              >
                <FaGithub />
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/anbuazhagan_18/?hl=en" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
              >
                <FaInstagram />
              </motion.a>
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.form 
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="form-group">
              <input 
                type="text" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                placeholder=" " 
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
                placeholder=" " 
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
                placeholder=" " 
                required 
              ></textarea>
              <label>Your Message</label>
              <span className="focus-border"></span>
            </div>

            <motion.button 
              type="submit" 
              className="submit-btn"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  <FaPaperPlane className="send-icon" /> Send Message
                </>
              )}
            </motion.button>

            {submitStatus === 'success' && (
              <motion.div 
                className="status-message success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Message sent successfully!
              </motion.div>
            )}
            {submitStatus === 'error' && (
              <motion.div 
                className="status-message error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Error sending message. Please try again.
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;