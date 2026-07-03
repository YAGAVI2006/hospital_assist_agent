import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Mail, Phone, Shield, ShieldCheck, Heart } from 'lucide-react';

const About = ({ hospitalData }) => {
  // Use fallback data if state is still loading
  const data = hospitalData || {
    hospitalName: "Starlight Medical Center",
    address: {
      street: "1200 Wellness Avenue",
      city: "Springfield",
      state: "Illinois",
      zipCode: "62704",
      country: "USA"
    },
    contact: {
      phone: "+1 (217) 555-0123",
      email: "info@starlightmedical.org"
    },
    opTimings: {
      weekdays: "08:00 AM - 08:00 PM",
      saturday: "09:00 AM - 06:00 PM",
      sunday: "09:00 AM - 02:00 PM"
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="about" className="about-section">
      <div className="about-bg-elements">
        <div className="about-blur-shape"></div>
      </div>

      <div className="about-container">
        {/* Section Header */}
        <motion.div 
          className="about-header-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
        >
          <span className="hero-badge">
            <Heart size={14} className="pulse-icon text-red-500" />
            <span>Discover Starlight</span>
          </span>
          <h2 className="section-title-large">
            Providing World-Class Healthcare with <span className="gradient-text">Empathy & Care</span>
          </h2>
          <p className="section-subtitle-text">
            For over two decades, {data.hospitalName} has been at the forefront of medical excellence, offering comprehensive patient-centered healthcare treatments.
          </p>
        </motion.div>

        {/* Section Content */}
        <motion.div 
          className="about-content-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Left Column: Story & Mission */}
          <motion.div className="about-story-column" variants={itemVariants}>
            <h3 className="about-subtitle">Our Mission & Commitment</h3>
            <p className="about-description">
              At Starlight, we believe healthcare is more than just treatments; it is about building trust and supporting you at every stage of your life. Our state-of-the-art facilities are staffed by board-certified physicians, caring nurses, and support personnel who work collaboratively to deliver exceptional clinical results.
            </p>
            <p className="about-description">
              We leverage advanced diagnostics and specialized clinical pathways to ensure you receive precise, personalized therapies. From emergency interventions to routing check-ups, your wellness is our single greatest priority.
            </p>

            <div className="about-values-list">
              <div className="about-value-item">
                <div className="about-value-icon">
                  <ShieldCheck size={20} className="text-blue-500" />
                </div>
                <div>
                  <h4>Clinical Excellence</h4>
                  <p>Adhering to rigorous safety protocols and global medical standards.</p>
                </div>
              </div>
              <div className="about-value-item">
                <div className="about-value-icon">
                  <Heart size={20} className="text-purple-500" />
                </div>
                <div>
                  <h4>Compassionate Focus</h4>
                  <p>Treating every patient with dignity, understanding, and personal care.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Operational Info Cards */}
          <motion.div className="about-info-column" variants={itemVariants}>
            <div className="about-info-cards-stack">
              {/* Timing Card */}
              <div className="about-info-card">
                <div className="about-card-icon-wrapper blue">
                  <Clock size={22} />
                </div>
                <div className="about-card-content">
                  <h4>Operating Timings</h4>
                  <ul className="timings-list">
                    <li>
                      <span className="day">Weekdays</span>
                      <span className="hours">{data.opTimings.weekdays}</span>
                    </li>
                    <li>
                      <span className="day">Saturdays</span>
                      <span className="hours">{data.opTimings.saturday}</span>
                    </li>
                    <li>
                      <span className="day">Sundays</span>
                      <span className="hours">{data.opTimings.sunday}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Location Card */}
              <div className="about-info-card">
                <div className="about-card-icon-wrapper purple">
                  <MapPin size={22} />
                </div>
                <div className="about-card-content">
                  <h4>Our Location</h4>
                  <p className="address-text">
                    {data.address.street}<br />
                    {data.address.city}, {data.address.state} {data.address.zipCode}<br />
                    {data.address.country}
                  </p>
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(`${data.address.street}, ${data.address.city}, ${data.address.state} ${data.address.zipCode}`)}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="location-map-link"
                  >
                    <span>View on Google Maps</span>
                    <span>→</span>
                  </a>
                </div>
              </div>

              {/* Contact Card */}
              <div className="about-info-card">
                <div className="about-card-icon-wrapper emerald">
                  <Phone size={22} />
                </div>
                <div className="about-card-content">
                  <h4>Contact Channels</h4>
                  <div className="contact-details-grid">
                    <a href={`tel:${data.contact.phone}`} className="contact-item-link">
                      <Phone size={14} />
                      <span>{data.contact.phone}</span>
                    </a>
                    <a href={`mailto:${data.contact.email}`} className="contact-item-link">
                      <Mail size={14} />
                      <span>{data.contact.email}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
