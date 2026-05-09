import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  const phoneNumber = '+917696329012';
  const whatsappNumber = '917696329012';
  const whatsappMessage = encodeURIComponent("Hello Cuddle Cloud, I'm interested in your premium zero gravity mattresses. I'd like to know more about your products and consultation services.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <div className="logo-icon">
              <img 
                src="https://i.postimg.cc/zf6D50dD/Whats-App-Image-2026-05-09-at-19-23-32-1-removebg-preview.png" 
                alt="Cuddle Cloud Logo" 
              />
            </div>
            <h3>Cuddle Cloud</h3>
          </div>
          <p className="brand-tagline">Sleep On Air. Wake Refreshed.</p>
          <p className="brand-description">Premium mattress brand dedicated to engineering zero gravity sleep solutions that merge advanced memory foam technology with orthopedic precision. Experience weightless rest every night. Proudly made in India.</p>
          <div className="trust-badges">
            <span>🇮🇳 Made in India</span>
            <span>🩺 Doctor Recommended</span>
            <span>☁️ Lifetime Cloud Warranty</span>
            <span>⭐ 50,000+ Happy Sleepers</span>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Our Mattresses</Link></li>
            <li><Link to="/about">About Cuddle Cloud</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/book-appointment">Free Consultation</Link></li>
            <li><Link to="/reviews">Customer Reviews</Link></li>
            <li><Link to="/admin">Admin</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Our Collections</h3>
          <ul>
            <li><Link to="/products?category=zero-gravity">☁️ Zero Gravity Collection</Link></li>
            <li><Link to="/products?category=orthopedic">🩺 Orthopedic Support</Link></li>
            <li><Link to="/products?category=memory-foam">🌀 Memory Foam</Link></li>
            <li><Link to="/products?category=hybrid">✨ Hybrid Elite</Link></li>
            <li><Link to="/products?category=luxury">👑 Luxury Collection</Link></li>
            <li><Link to="/products">View All Products</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Visit Our Experience Center</h3>
          <ul className="contact-info">
            <li>
              <span className="contact-icon">📍</span>
              <span>Near Ganga Oil Mill, J.K. Road, Mansa (151505)<br />Distt. Mansa, Punjab, India</span>
            </li>
            <li>
              <span className="contact-icon">📞</span>
              <span>
                <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
                <br></br>
                <a href={`tel:${+917696341505}`}>+917696341505</a>
              </span>
            </li>
            <li>
              <span className="contact-icon">💬</span>
              <span>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
              </span>
            </li>
            <li>
              <span className="contact-icon">🕒</span>
              <span>Monday - Saturday: 10:00 AM - 7:00 PM<br />Sunday: By Appointment Only</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {currentYear} Cuddle Cloud. All rights reserved.</p>
          <p className="footer-tagline">☁️ Zero Gravity Comfort | Lifetime Cloud Warranty | Better Sleep ☁️</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;