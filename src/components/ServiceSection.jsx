import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Code, Monitor, Layout } from 'lucide-react';
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
];

const ServiceSection = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-out', once: true });
  }, []);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 320; // Adjust based on card width + margin
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 px-5">
      <div className="services-container">
        <h2 className="section-title" data-aos="fade-down">Services</h2>

        <div className="card-scroll-wrapper">
          <div className="card-grid" ref={scrollRef}>
            {services.map((service, index) => (
              <motion.div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="service-card"
                whileHover={{ scale: 1.01 }}
              >
                <div className="icon-wrapper">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="arrow-controls">
            <button onClick={() => scroll('left')}>&larr;</button>
            <button onClick={() => scroll('right')}>&rarr;</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
