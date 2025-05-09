import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Monitor, ShoppingCart, Layout } from 'lucide-react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import '../../assets/css/ServiceSection.css';

const services = [
  {
    title: 'Web Design',
    description: 'Modern, clean, and responsive designs to make your website stand out.',
    icon: <Layout className="service-icon text-blue-400" />,
  },
  {
    title: 'Web Development',
    description: 'Dynamic, responsive, and scalable websites using the latest web technologies.',
    icon: <Code className="service-icon text-green-400" />,
  },
  {
    title: 'WordPress Development',
    description: 'Build user-friendly e-commerce websites with custom themes and easy product management.',
    icon: <Monitor className="service-icon text-purple-400" />,
  },
  // Add more services if needed
];

const ServiceSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-out', once: true });
  }, []);

  return (
    <section id="services" className="py-20 px-5">
      <div className="services-container">
        <h2 className="section-title" data-aos="fade-down">
          Services
        </h2>
        <div 
          className="card-grid" 
          data-count={services.length}
          style={services.length > 3 ? { justifyContent: 'flex-start' } : { justifyContent: 'space-around' }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="service-card"
              whileHover={{ scale: 1.01 }}
            >
              <div className="icon-wrapper">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;