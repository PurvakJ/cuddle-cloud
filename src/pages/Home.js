// Home.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getReviews } from '../api';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const phoneNumber = '+917696329012';
  const whatsappNumber = '917696329012';
  const whatsappMessage = encodeURIComponent("Hello Cuddle Cloud, I'm interested in your premium mattresses. I'd like to know more about your products and consultation services.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;


  const getCategoryDisplayName = useCallback((categoryValue) => {
    const displayNames = {
      'orthopedic': 'Orthopedic Support',
      'memory-foam': 'Memory Foam',
      'latex': 'Natural Latex',
      'hybrid': 'Hybrid Mattress',
      'back-pain': 'Back Pain Relief',
      'couple': 'Couple Mattress',
      'kids': 'Kids Mattress',
      'luxury': 'Luxury Collection'
    };
    return displayNames[categoryValue] || 
           categoryValue?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }, []);

  const getCategoryIcon = useCallback((category) => {
    const icons = {
      'orthopedic': '🩺',
      'memory-foam': '🌀',
      'latex': '🌿',
      'hybrid': '✨',
      'back-pain': '💪',
      'couple': '💑',
      'kids': '🧸',
      'luxury': '👑'
    };
    return icons[category] || '🛌';
  }, []);

  const openWhatsApp = (productName) => {
    const message = encodeURIComponent(`Hello Cuddle Cloud, I'm interested in the "${productName}" mattress. Could you please share more details and the best price?`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (selectedProduct && selectedProduct.images && selectedProduct.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedProduct.images.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (selectedProduct && selectedProduct.images && selectedProduct.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + selectedProduct.images.length) % selectedProduct.images.length);
    }
  };

  // Cuddle Cloud Features
  const cuddleCloudFeatures = [
    { icon: "☁️", title: "Zero Gravity", description: "Weightless rest experience with advanced memory foam & coil technology" },
    { icon: "🩺", title: "Orthopedic Support", description: "Doctor-approved design for perfect spinal alignment" },
    { icon: "💨", title: "Breathable Core", description: "Extreme wellness fabric with superior airflow" },
    { icon: "💪", title: "Ultra Durable", description: "Premium materials with lifetime cloud warranty" }
  ];

  // Categories
  const categories = [
    { name: "Zero Gravity", icon: "☁️", link: "/products?category=zero-gravity", description: "Weightless sleep experience", image: "https://m.media-amazon.com/images/I/71bLn6bjYuL.jpg" },
    { name: "Orthopedic", icon: "🩺", link: "/products?category=orthopedic", description: "Doctor-recommended support", image: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/660560s2.jpg?im=Resize,width=750" },
    { name: "Memory Foam", icon: "🌀", link: "/products?category=memory-foam", description: "Pressure-relieving comfort", image: "https://s.yimg.com/ny/api/res/1.2/AhBLxPwESH86Op.Ry2YVkw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTI0MDA7aD0xMzUwO2NmPXdlYnA-/https://media.zenfs.com/en/toms_guide_826/11c9993368b95e81f6e7b8633b632a04" },
    { name: "Hybrid", icon: "✨", link: "/products?category=hybrid", description: "Best of both worlds", image: "https://images-cdn.ubuy.co.in/669eeae2e620e2469e48f254-3-inch-memory-foam-mattress-topper.jpg" }
  ];

  // Pillars
  const pillars = [
    { icon: "🏆", title: "Premium Quality", description: "Made with the finest materials and craftsmanship" },
    { icon: "🛡️", title: "Lifetime Warranty", description: "Cloud warranty for complete peace of mind" },
    { icon: "🌿", title: "Eco-Friendly", description: "Sustainable materials for a better tomorrow" }
  ];

  const loadProducts = useCallback(async () => {
    try {
      const data = await getProducts();
      const validProducts = data.filter(product => product && product.id);
      const featured = validProducts.filter(p => p.featured === true);
      let productsToShow = featured.length >= 3 ? featured.slice(0, 6) : validProducts.slice(0, 6);
      setFeaturedProducts(productsToShow);
    } catch (error) {
      console.error('Error loading products:', error);
      const fallbackProducts = [
        {
          id: 1,
          name: "Cloud Zero Gravity",
          price: 24999,
          description: "Experience weightless rest with our advanced memory foam and coil technology. Engineered for perfect spinal alignment and pressure relief.",
          images: ["https://mysleepyhead.com/cdn/shop/files/Original_PDP_5.jpg?v=1768928275&width=800"],
          category: "zero-gravity",
          featured: true
        },
        {
          id: 2,
          name: "Orthopedic Wellness Core",
          price: 29999,
          description: "Doctor-approved orthopedic mattress featuring breathable fabric and extreme wellness technology for restorative sleep.",
          images: ["https://www.duroflexworld.com/cdn/shop/files/2_2026e6ee-a9e8-4ff5-88c7-104fea9cefb8.jpg?v=1744560694&width=800"],
          category: "orthopedic",
          featured: true
        },
        {
          id: 3,
          name: "Breathable Hybrid Elite",
          price: 34999,
          description: "Ultra-premium hybrid with advanced airflow and pressure-relieving comfort layers. Lifetime cloud warranty included.",
          images: ["https://www.rentomojo.com/blog/wp-content/uploads/2025/08/benefits-of-orthopedic-mattress.png"],
          category: "hybrid",
          featured: true
        },
        {
          id: 4,
          name: "Luxury Memory Cloud",
          price: 39999,
          description: "Premium memory foam with cooling gel technology for the ultimate sleep experience.",
          images: ["https://images-cdn.ubuy.co.in/669eeae2e620e2469e48f254-3-inch-memory-foam-mattress-topper.jpg"],
          category: "memory-foam",
          featured: true
        },
        {
          id: 5,
          name: "Back Relief Pro",
          price: 27999,
          description: "Specially designed for back pain relief with targeted lumbar support.",
          images: ["https://sealy.in/cdn/shop/articles/Checking_the_memory_foam_layer_of_a_mattress.png?crop=center&height=1200&v=1763952574&width=1200"],
          category: "back-pain",
          featured: true
        },
        {
          id: 6,
          name: "Couple's Harmony",
          price: 32999,
          description: "Dual-zone comfort with motion isolation for undisturbed sleep.",
          images: ["https://static.independent.co.uk/2026/04/22/12/43/Emma-original-mattress.png"],
          category: "couple",
          featured: true
        }
      ];
      setFeaturedProducts(fallbackProducts);
    }
  }, []);

  const loadReviews = useCallback(async () => {
    try {
      const allReviews = await getReviews();
      if (allReviews && Array.isArray(allReviews)) {
        const shuffled = [...allReviews];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setReviews(shuffled.slice(0, 6));
      } else {
        const demoReviews = [
          { id: 1, name: "Rahul Mehta", rating: 5, comment: "Absolutely life-changing mattress! My back pain has significantly reduced in just 2 weeks. The zero gravity feel is incredible.", featured: true },
          { id: 2, name: "Priya Sharma", rating: 5, comment: "Best investment for my sleep. The quality is unmatched and customer service was exceptional. Highly recommend Cuddle Cloud!", featured: true },
          { id: 3, name: "Amit Patel", rating: 4, comment: "Very comfortable and breathable. My sleep quality has improved dramatically. Worth every rupee.", featured: false },
          { id: 4, name: "Neha Gupta", rating: 5, comment: "Amazing orthopedic support! My husband and I both love it. Finally found the perfect mattress.", featured: true },
          { id: 5, name: "Vikram Singh", rating: 5, comment: "Premium quality and excellent warranty. The delivery was smooth and the mattress exceeded expectations.", featured: false }
        ];
        setReviews(demoReviews);
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  }, []);

  useEffect(() => {
    loadProducts();
    loadReviews();
  }, [loadProducts, loadReviews]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedProduct]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    reveals.forEach(reveal => observer.observe(reveal));
    return () => observer.disconnect();
  }, []);

  // Create floating stars for CTA
  useEffect(() => {
    const starsContainer = document.querySelector('.stars-bg');
    if (starsContainer) {
      for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        star.style.animationDelay = `${Math.random() * 5}s`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        starsContainer.appendChild(star);
      }
    }
  }, []);


  // Slider functionality
  const sliderRef = useRef(null);
  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="home">
      {/* Hero Section - Cinematic Design */}
      <section className="hero-section">
        <div className="hero-bg-morph"></div>
        <div className="hero-floating-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
        <div className="container">
          <div className="hero-content-new">
            <div className="hero-text-new reveal-left">
              <span className="hero-badge">✦ LUXURY SLEEP COLLECTION ✦</span>
              <h1>Sleep Like Never<br /><span className="text-gradient">Before</span></h1>
              <p>Experience the perfect fusion of zero gravity technology and orthopedic precision. Engineered for those who demand the extraordinary in every night's rest.</p>
              <div className="hero-buttons">
                <Link to="/products" className="btn-primary">Explore Collection →</Link>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-outline-light">💬 WhatsApp Consultation</a>
              </div>
              <div className="hero-stats-new">
                <div className="stat-item-new">
                  <span className="stat-number-new">50k+</span>
                  <span className="stat-label-new">Happy Sleepers</span>
                </div>
                <div className="stat-item-new">
                  <span className="stat-number-new">Lifetime</span>
                  <span className="stat-label-new">Cloud Warranty</span>
                </div>
                <div className="stat-item-new">
                  <span className="stat-number-new">100%</span>
                  <span className="stat-label-new">Non-Toxic</span>
                </div>
              </div>
            </div>
            <div className="hero-image-new reveal-right">
              <div className="floating-card-new">
                <img src="https://i.postimg.cc/sXT4LCnq/beautiful-luxury-comfortable-white-pillow-blanket-decoration-interior-bedroom.jpg" alt="Cuddle Cloud Premium Mattress" />
                <div className="trust-ring">
                  <span className="icon">🏆</span>
                  <span>India's Most Trusted Mattress</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Glass Card Design */}
      <section className="features-showcase">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge-new">Why Choose Us</div>
            <h2>The Cuddle Cloud <span style={{color: 'var(--blue-primary)'}}>Difference</span></h2>
            <p>Experience innovation that redefines comfort and support</p>
          </div>
          <div className="features-grid-glass">
            {cuddleCloudFeatures.map((feature, index) => (
              <div key={index} className="feature-glass-card reveal" style={{transitionDelay: `${index * 0.1}s`}}>
                <div className="feature-icon-glass">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showreel Section */}
      <section className="showreel-section">
        <div className="container">
          <div className="showreel-container">
            <div className="showreel-content reveal-left">
              <div className="section-badge-new" style={{background: 'rgba(212, 175, 55, 0.2)', color: 'var(--gold-light)'}}>Experience Innovation</div>
              <h2>Engineered for the <span style={{color: 'var(--gold-light)'}}>Perfect Night</span></h2>
              <p>Every Cuddle Cloud mattress undergoes rigorous testing to ensure optimal support, temperature regulation, and pressure relief.</p>
              <div className="showreel-stats">
                <div className="showreel-stat">
                  <span className="number">17+</span>
                  <span className="label">Years Innovation</span>
                </div>
                <div className="showreel-stat">
                  <span className="number">100+</span>
                  <span className="label">Hours Testing</span>
                </div>
                <div className="showreel-stat">
                  <span className="number">20+</span>
                  <span className="label">Patents Pending</span>
                </div>
              </div>
            </div>
            <div className="showreel-video reveal-right">
              <img src="https://sealy.in/cdn/shop/articles/Checking_the_memory_foam_layer_of_a_mattress.png?crop=center&height=1200&v=1763952574&width=1200" alt="Cuddle Cloud Technology" />
            </div>
          </div>
        </div>
      </section>

      {/* Category Showcase - 3D Tilt */}
      <section className="category-showcase">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge-new">Our Collections</div>
            <h2>Find Your <span style={{color: 'var(--blue-primary)'}}>Perfect Match</span></h2>
            <p>Tailored solutions for every sleep need and preference</p>
          </div>
          <div className="category-grid-3d">
            {categories.map((category, index) => (
              <Link to={category.link} key={index} className="category-card-3d reveal" style={{transitionDelay: `${index * 0.1}s`}}>
                <div className="category-image-3d">
                  <img src={category.image} alt={category.name} />
                </div>
                <div className="category-info-3d">
                  <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>{category.icon}</div>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section - Slider */}
<section className="products-section">
  <div className="container1">
    <div className="section-header reveal">
      <div className="section-badge-new">Best Sellers</div>
      <h2>Featured <span style={{color: 'var(--blue-primary)'}}>Mattresses</span></h2>
      <p>Our most loved collections trusted by thousands</p>
    </div>
    <div className="products-slider-container">
      <div className="products-slider-track" ref={sliderRef}>
        {featuredProducts.slice(0, 3).map((product, index) => (
          <div key={product.id} className="product-slide">
            <div className="product-card-luxury" onClick={() => setSelectedProduct(product)}>
              <div className="product-media-luxury">
                {product.images && product.images[0] ? (
                  <img src={product.images[0]} alt={product.name} loading="lazy" />
                ) : (
                  <div className="image-placeholder">☁️</div>
                )}
                {product.featured && <div className="product-tag-luxury">⭐ Bestseller</div>}
              </div>
              <div className="product-details-luxury">
                <span style={{fontSize: '0.7rem', color: 'var(--blue-soft)'}}>
                  {getCategoryIcon(product.category)} {getCategoryDisplayName(product.category)}
                </span>
                <h3>{product.name}</h3>
                <div className="product-price-luxury">₹{product.price?.toLocaleString() || '0'}</div>
                <div className="product-features-luxury">
                  <span>✓ Zero Gravity</span>
                  <span>✓ Lifetime Warranty</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="slider-controls">
        <button className="slider-arrow" onClick={() => scrollSlider('left')}>❮</button>
        <button className="slider-arrow" onClick={() => scrollSlider('right')}>❯</button>
      </div>
    </div>
  </div>
</section>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="modal-premium-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-premium-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-premium" onClick={() => setSelectedProduct(null)}>×</button>
            <div className="modal-premium-inner">
              <div className="modal-premium-gallery">
                {selectedProduct.images && selectedProduct.images.length > 0 ? (
                  <img src={selectedProduct.images[currentImageIndex]} alt={selectedProduct.name} />
                ) : (
                  <div style={{textAlign: 'center', fontSize: '3rem'}}>☁️</div>
                )}
                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <div style={{display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '1rem'}}>
                    <button onClick={prevImage} style={{background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer'}}>❮</button>
                    <button onClick={nextImage} style={{background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer'}}>❯</button>
                  </div>
                )}
              </div>
              <div className="modal-premium-info">
                <span style={{fontSize: '0.8rem', color: 'var(--blue-soft)'}}>
                  {getCategoryIcon(selectedProduct.category)} {getCategoryDisplayName(selectedProduct.category)}
                </span>
                <h2>{selectedProduct.name}</h2>
                <div className="modal-premium-price">₹{selectedProduct.price?.toLocaleString() || '0'}</div>
                <div style={{display: 'flex', gap: '10px', marginBottom: '1rem', flexWrap: 'wrap'}}>
                  <span style={{padding: '4px 12px', background: 'var(--blue-mist)', borderRadius: '40px', fontSize: '0.7rem'}}>✓ Free Delivery</span>
                  <span style={{padding: '4px 12px', background: 'var(--blue-mist)', borderRadius: '40px', fontSize: '0.7rem'}}>✓ Lifetime Warranty</span>
                  <span style={{padding: '4px 12px', background: 'var(--blue-mist)', borderRadius: '40px', fontSize: '0.7rem'}}>✓ 100 Night Trial</span>
                </div>
                <p style={{color: 'var(--blue-medium)', lineHeight: '1.7'}}>{selectedProduct.description || 'Experience weightless rest with our advanced memory foam and coil technology.'}</p>
                <div className="modal-premium-buttons">
                  <a href={`tel:${phoneNumber}`} className="btn-primary" style={{textAlign: 'center'}}>📞 Call for Best Price</a>
                  <button onClick={() => openWhatsApp(selectedProduct.name)} className="btn-wa" style={{textAlign: 'center'}}>💬 Chat on WhatsApp</button>
                  <Link to="/book-appointment" className="btn-secondary" style={{textAlign: 'center'}}>Book Free Consultation →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pillars Section - Interactive */}
      <section className="pillars-interactive">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge-new" style={{background: 'rgba(212, 175, 55, 0.2)', color: 'var(--gold-light)'}}>Our Promise</div>
            <h2 style={{color: 'var(--cream-bg)'}}>Built on <span style={{color: 'var(--gold-light)'}}>Trust & Excellence</span></h2>
            <p style={{color: 'rgba(253, 251, 247, 0.8)'}}>Every Cuddle Cloud mattress is a testament to quality and care</p>
          </div>
          <div className="pillars-grid-interactive">
            {pillars.map((pillar, index) => (
              <div key={index} className="pillar-interactive-card reveal" style={{transitionDelay: `${index * 0.1}s`}}>
                <div className="pillar-icon-interactive">{pillar.icon}</div>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Testimonials Spotlight */}
<section className="testimonials-spotlight">
  <div className="container">
    <div className="section-header reveal">
      <div className="section-badge-new">Testimonials</div>
      <h2>Trusted by <span style={{color: 'var(--blue-primary)'}}>Thousands</span></h2>
      <p>Real stories from our happy customers</p>
    </div>
    <div className="testimonials-wrapper">
      <div className="testimonials-grid-new">
        {reviews.slice(0, 3).map((review) => (
          <div key={review.id} className="testimonial-spotlight-card">
            <div className="testimonial-quote">“</div>
            <p className="testimonial-text">{review.comment}</p>
            <div className="testimonial-author-spotlight">
              <div className="author-avatar-spotlight">{review.name.charAt(0)}</div>
              <div className="author-info-spotlight">
                <h4>{review.name}</h4>
                <p>{'★'.repeat(review.rating)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* CTA Section - Cosmic */}
      <section className="cta-cosmic">
        <div className="stars-bg"></div>
        <div className="container">
          <div className="reveal">
            <h2>Ready for the <span style={{color: 'var(--gold-light)'}}>Ultimate Sleep Experience?</span></h2>
            <p>Join 50,000+ happy sleepers who've discovered the magic of Cuddle Cloud</p>
            <div className="cta-buttons-cosmic">
              <Link to="/products" className="btn-primary">Explore Collection →</Link>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-outline-light">💬 Chat on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;