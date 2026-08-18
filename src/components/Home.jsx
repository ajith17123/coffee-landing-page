import React, { useState, useEffect, useRef } from 'react';
import '../assets/style/Home.css';
import chikmagalurImg from '../assets/images/chikmagalur.jpg';
import arakuImg from '../assets/images/araku.jpg';
import wayanadImg from '../assets/images/wayanad.jpg';
import heroCoffeeCupImg from '../assets/images/hero_coffee_cup.jpg';

export default function Home() {
  const [selectedGrind, setSelectedGrind] = useState('Whole Bean');
  const [activeRoast, setActiveRoast] = useState('Medium');
  const [bagCount, setBagCount] = useState(2);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const canvasRef = useRef(null);

  // Dynamic Smoke Particle Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = 400;
    canvas.height = 400;

    const particles = [];
    const particleCount = 45;

    class SmokeParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = canvas.width / 2 + (Math.random() * 70 - 35);
        this.y = canvas.height - 25;
        this.size = Math.random() * 8 + 6;
        this.speedY = Math.random() * 0.9 + 0.6;
        this.speedX = Math.random() * 0.6 - 0.3;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.maxLife = Math.random() * 120 + 80;
        this.life = 0;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX + Math.sin(this.life * 0.05) * 0.4;
        this.size += 0.35;
        this.life++;
        this.opacity -= 0.003;

        if (this.life >= this.maxLife || this.opacity <= 0) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size
        );
        gradient.addColorStop(0, `rgba(240, 230, 220, ${Math.max(this.opacity, 0)})`);
        gradient.addColorStop(0.6, `rgba(210, 195, 180, ${Math.max(this.opacity * 0.35, 0)})`);
        gradient.addColorStop(1, 'rgba(210, 195, 180, 0)');

        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      const p = new SmokeParticle();
      p.y = canvas.height - Math.random() * 220;
      particles.push(p);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const products = [
    {
      id: 1,
      name: 'Chikmagalur Reserve',
      origin: 'Karnatak, Western Ghats • 1,450m',
      notes: ['Roasted Almond', 'Wild Honey', 'Orange Zest'],
      roast: 'Light-Medium',
      score: '90.5 SCAA',
      price: 649,
      badge: 'Single Estate',
      image: chikmagalurImg,
    },
    {
      id: 2,
      name: 'Araku Valley Supremo',
      origin: 'Andhra Pradesh • 1,200m',
      notes: ['Dark Cocoa', 'Toffee', 'Dried Fig'],
      roast: 'Medium Roast',
      score: '88.5 SCAA',
      price: 599,
      badge: 'Bestseller',
      image: arakuImg,
    },
    {
      id: 3,
      name: 'Wayanad Dark Velvet',
      origin: 'Kerala • 1,100m',
      notes: ['Spiced Clove', 'Molasses', 'Smoked Cacao'],
      roast: 'Dark Roast',
      score: '87.0 SCAA',
      price: 549,
      badge: 'Signature Blend',
      image: wayanadImg,
    },
  ];

  const testimonials = [
    {
      quote: "The aroma when you break the seal is mesmerizing. The Chikmagalur Reserve has clean bergamot and honey notes that rival the finest Ethiopian geishas I've cupped.",
      author: "Aditya Roy",
      role: "Certified Q-Grader, Bengaluru",
      rating: "★★★★★"
    },
    {
      quote: "Switching our morning pour-over to Aura's fresh-roasted beans ruined café coffee for us. It's ridiculously fresh, naturally sweet, and never harsh.",
      author: "Pooja Hegde",
      role: "Home Barista, Mumbai",
      rating: "★★★★★"
    },
    {
      quote: "The subscription customization is flawless. My beans arrive exactly 48 hours post-roast date stamped on the bag. Top-tier craftsmanship.",
      author: "Vikram Sen",
      role: "Specialty Enthusiast, Delhi",
      rating: "★★★★★"
    }
  ];

  const faqs = [
    {
      q: 'How fresh are the beans when they reach me?',
      a: 'We roast micro-batches every Monday and Thursday. Orders are sealed with one-way degassing valves and dispatched within 24 to 48 hours of roasting.',
    },
    {
      q: 'Which grind size should I choose?',
      a: 'If you own a burr grinder, choose Whole Bean for peak aromatics. Otherwise, pick French Press (Coarse), Pour Over/Aeropress (Medium), or Espresso/Moka Pot (Fine).',
    },
    {
      q: 'Can I modify or pause my subscription at any time?',
      a: 'Yes. You can swap estate lots, adjust frequency, skip shipments, or cancel instantly from your dashboard with zero lock-in or cancellation fees.',
    },
    {
      q: 'Do you offer pan-India shipping?',
      a: 'Yes! We ship across all Indian pincodes via express air couriers. Orders above ₹499 qualify for complimentary delivery.',
    }
  ];

  return (
    <div className="coffee-page">
      {/* 1. Header & Navigation */}
      <header className="navbar">
        <div className="nav-container">
          <div className="logo-brand">
            <svg className="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>AURA ROASTERS</span>
          </div>
          <nav className="nav-links">
            <a href="#beans">Specialty Beans</a>
            <a href="#customizer">Customizer</a>
            <a href="#process">How It Works</a>
            <a href="#story">Estate Origins</a>
            <a href="#reviews">Reviews</a>
          </nav>
          <div className="nav-actions">
            <button className="btn-cart">Bag (0)</button>
            <a href="#beans" className="btn-nav-primary">Order Fresh</a>
          </div>
        </div>
      </header>

      {/* 2. Hero Section with Canvas Smoke & Generated Image */}
      <section className="hero-section">
        <div className="hero-glow"></div>
        <div className="hero-container">
          <div className="hero-text-content">
            <div className="hero-badge" data-aos="fade-down" data-aos-duration="800">
              <span className="pulse-dot"></span> Shade-Grown Single Estate Indian Coffees
            </div>
            <h1 className="hero-title" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
              Precision Roasted. <br />
              <span className="highlight-text">Pure Sensory Depth.</span>
            </h1>
            <p className="hero-description" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
              High-altitude Arabica harvested from generational estates in Karnataka & Kerala. Roasted in small batches within 48 hours of dispatch for unmatched sweetness and aromatic nuance.
            </p>
            <div className="hero-action-group" data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">
              <a href="#beans" className="btn-primary">Explore Single Estates</a>
              <a href="#customizer" className="btn-secondary">Configure Tasting Box</a>
            </div>
            <div className="hero-metrics" data-aos="fade-up" data-aos-delay="500" data-aos-duration="1000">
              <div className="metric-item">
                <span className="metric-num">88+</span>
                <span className="metric-label">Specialty Cupping Grade</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric-item">
                <span className="metric-num">48h</span>
                <span className="metric-label">Roast-to-Ship Standard</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric-item">
                <span className="metric-num">100%</span>
                <span className="metric-label">Ethical Direct Sourcing</span>
              </div>
            </div>
          </div>

          <div className="hero-visual-wrapper" data-aos="zoom-in" data-aos-delay="300" data-aos-duration="1200">
            <div className="smoky-cup-stage">
              {/* Particle Canvas for dynamic steam */}
              <canvas ref={canvasRef} className="smoke-canvas" />

              {/* Generated Premium Coffee Cup Image */}
              <div className="cup-image-container">
                <img src={heroCoffeeCupImg} alt="Premium Specialty Coffee Cup" className="hero-coffee-image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Trust Bar / Press Logos */}
      <section className="section-trust" data-aos="fade-up" data-aos-duration="1000">
        <div className="trust-inner">
          <span className="trust-label">ACCLAIMED & FEATURED IN</span>
          <div className="trust-logos">
            <span className="trust-logo-item">COFFEE INTELLIGENTSIA</span>
            <span className="trust-logo-item">INDIAN EXPRESS LIFESTYLE</span>
            <span className="trust-logo-item">SPECIALTY COFFEE GUILD</span>
            <span className="trust-logo-item">VOGUE HOSPITALITY</span>
            <span className="trust-logo-item">ARCHITECTURAL DIGEST</span>
          </div>
        </div>
      </section>

      {/* 4. Problem vs Solution */}
      <section className="section-comparison">
        <div className="section-header" data-aos="fade-up">
          <span className="section-subtitle">The Freshness Gap</span>
          <h2 className="section-title">Supermarket Shelf vs. Aura Micro-Roast</h2>
          <div className="gold-rule"></div>
        </div>

        <div className="comparison-grid">
          <div className="comparison-card stale-card" data-aos="fade-right" data-aos-delay="150">
            <h3 className="card-comp-title">Commercial Store Beans</h3>
            <ul className="comp-list">
              <li><span className="icon-neg">✕</span> Roasted 6–12 months ago with flat aromatics</li>
              <li><span className="icon-neg">✕</span> Over-roasted dark to conceal inferior defect beans</li>
              <li><span className="icon-neg">✕</span> Non-traceable commodity blends with zero origin data</li>
              <li><span className="icon-neg">✕</span> Harsh, bitter aftertaste requiring heavy dairy & sugar</li>
            </ul>
          </div>

          <div className="comparison-card aura-card" data-aos="fade-left" data-aos-delay="150">
            <div className="aura-ribbon">THE AURA STANDARD</div>
            <h3 className="card-comp-title">Aura Specialty Micro-Lots</h3>
            <ul className="comp-list">
              <li><span className="icon-pos">✓</span> Dispatched within 48 hours of roast with date stamp</li>
              <li><span className="icon-pos">✓</span> Precision profile roasting highlighting terroir notes</li>
              <li><span className="icon-pos">✓</span> 100% single-estate traceable down to block & elevation</li>
              <li><span className="icon-pos">✓</span> Silky mouthfeel, pleasant acidity, and natural sweetness</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Featured Single Estates */}
      <section id="beans" className="section-beans">
        <div className="section-header" data-aos="fade-up">
          <span className="section-subtitle">Current Harvest</span>
          <h2 className="section-title">Featured Micro-Lot Harvests</h2>
          <div className="gold-rule"></div>
        </div>

        <div className="product-grid">
          {products.map((item, idx) => (
            <div key={item.id} className="product-card" data-aos="fade-up" data-aos-delay={idx * 150}>
              <div className="card-badge">{item.badge}</div>
              <div className="card-media">
                <img src={item.image} alt={item.name} className="pouch-image" />
              </div>
              <div className="card-content">
                <div className="card-meta">
                  <span className="card-origin">{item.origin}</span>
                  <span className="card-score">{item.score}</span>
                </div>
                <h3 className="card-title">{item.name}</h3>
                <div className="tasting-tags">
                  {item.notes.map((note, idx) => (
                    <span key={idx} className="tasting-chip">{note}</span>
                  ))}
                </div>
                <div className="card-footer">
                  <div className="price-box">
                    <span className="currency">₹</span>
                    <span className="amount">{item.price}</span>
                    <span className="weight">/ 250g</span>
                  </div>
                  <button className="btn-card-add">Add to Bag</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Limited-Time Offer Section */}
      <section className="section-offer" data-aos="fade-up" data-aos-duration="1000">
        <div className="offer-container">
          <div className="offer-badge-ribbon">LIMITED RUN • SAVE 25%</div>
          
          <div className="offer-grid">
            <div className="offer-details" data-aos="fade-right" data-aos-delay="200">
              <span className="section-subtitle">Connoisseur Starter Set</span>
              <h2 className="offer-title">The Grand Heritage Discovery Kit</h2>
              <p className="offer-desc">
                Experience the spectrum of Indian high-altitude terroir. Includes three 250g estate-select pouches plus a precision solid brass measuring scoop.
              </p>

              <div className="offer-includes">
                <div className="include-item">
                  <span className="check-icon">✓</span>
                  <span>1x Chikmagalur Reserve 250g (Almond & Honey)</span>
                </div>
                <div className="include-item">
                  <span className="check-icon">✓</span>
                  <span>1x Araku Valley Supremo 250g (Dark Chocolate & Fig)</span>
                </div>
                <div className="include-item">
                  <span className="check-icon">✓</span>
                  <span>1x Wayanad Dark Velvet 250g (Spiced Cacao & Molasses)</span>
                </div>
                <div className="include-item">
                  <span className="check-icon">✓</span>
                  <span>1x Matte Brass Measuring Coffee Scoop (₹650 Value — Free)</span>
                </div>
              </div>

              <div className="offer-pricing-row">
                <div className="offer-price">
                  <span className="price-struck">₹2,447</span>
                  <span className="price-deal">₹1,699</span>
                  <span className="price-save">Save ₹748</span>
                </div>
                <button className="btn-primary btn-claim-offer">Claim Discovery Kit</button>
              </div>

              <div className="offer-urgency">
                <div className="urgency-bar-track">
                  <div className="urgency-bar-fill" style={{ width: '82%' }}></div>
                </div>
                <span className="urgency-text">🔥 Only <strong>18 kits</strong> available for this week's roast allocation</span>
              </div>
            </div>

            <div className="offer-visual" data-aos="fade-left" data-aos-delay="200">
              <div className="bundle-card">
                <div className="bundle-items-mockup">
                  <img src={chikmagalurImg} alt="Chikmagalur Reserve" className="mock-pouch-img p1" />
                  <img src={arakuImg} alt="Araku Valley Supremo" className="mock-pouch-img p2" />
                  <img src={wayanadImg} alt="Wayanad Dark Velvet" className="mock-pouch-img p3" />
                  <div className="mock-scoop"></div>
                </div>
                <div className="bundle-floating-pill">
                  <span>★ 4.96 / 5</span>
                  <small>(480+ Verified Tastings)</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Interactive Customizer */}
      <section id="customizer" className="section-customizer" data-aos="fade-up" data-aos-duration="1000">
        <div className="customizer-card">
          <div className="customizer-header">
            <span className="section-subtitle">Tailored Extraction</span>
            <h2>Configure Your Monthly Roast Schedule</h2>
            <p>Customize roast curves, precise brewing grinds, and shipment cadences.</p>
          </div>

          <div className="customizer-controls">
            <div className="control-group">
              <label>1. Select Preferred Roast Profile</label>
              <div className="toggle-row">
                {['Light (Floral & Bright)', 'Medium (Balanced & Sweet)', 'Dark (Rich & Smoky)'].map((profile) => {
                  const name = profile.split(' ')[0];
                  return (
                    <button
                      key={name}
                      onClick={() => setActiveRoast(name)}
                      className={`btn-toggle ${activeRoast === name ? 'active' : ''}`}
                    >
                      {profile}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="control-group">
              <label>2. Choose Preparation / Grind Size</label>
              <div className="toggle-row">
                {['Whole Bean', 'Pour Over (V60)', 'Espresso / Moka', 'French Press (Coarse)'].map((grind) => (
                  <button
                    key={grind}
                    onClick={() => setSelectedGrind(grind)}
                    className={`btn-toggle ${selectedGrind === grind ? 'active' : ''}`}
                  >
                    {grind}
                  </button>
                ))}
              </div>
            </div>

            <div className="control-group">
              <label>3. Select Monthly Volume</label>
              <div className="counter-row">
                <div className="counter-box">
                  <button onClick={() => setBagCount(Math.max(1, bagCount - 1))}>−</button>
                  <span>{bagCount} Bag{bagCount > 1 ? 's' : ''} (250g each)</span>
                  <button onClick={() => setBagCount(bagCount + 1)}>+</button>
                </div>
                <span className="shipping-tag">✓ Free Express Air Delivery Included</span>
              </div>
            </div>
          </div>

          <div className="customizer-summary-bar">
            <div className="summary-details">
              <span className="summary-label">Monthly Subscription (15% Automated Savings)</span>
              <span className="summary-total">₹{Math.round(bagCount * 599 * 0.85)} <small className="cadence">/ month</small></span>
            </div>
            <button className="btn-primary">Start Subscription</button>
          </div>
        </div>
      </section>

      {/* 8. How It Works (Process) */}
      <section id="process" className="section-process">
        <div className="section-header" data-aos="fade-up">
          <span className="section-subtitle">Seamless Journey</span>
          <h2 className="section-title">From Mountain Slope To Morning Cup</h2>
          <div className="gold-rule"></div>
        </div>

        <div className="process-grid">
          <div className="process-step" data-aos="fade-up" data-aos-delay="100">
            <div className="step-number">01</div>
            <h3 className="step-title">Select Your Profile</h3>
            <p className="step-desc">Pick whole bean or precision grind dialed specifically for your home brewer setup.</p>
          </div>
          <div className="process-step" data-aos="fade-up" data-aos-delay="250">
            <div className="step-number">02</div>
            <h3 className="step-title">Micro-Batch Roasted</h3>
            <p className="step-desc">We roast in 5kg convective drums twice weekly to bring out each estate lot's sweet terroir.</p>
          </div>
          <div className="process-step" data-aos="fade-up" data-aos-delay="400">
            <div className="step-number">03</div>
            <h3 className="step-title">Delivered in 48 Hours</h3>
            <p className="step-desc">Degassed, sealed, and shipped fresh to your door with the roast date stamped on every pouch.</p>
          </div>
        </div>
      </section>

      {/* 9. Craft & Direct Trade Story */}
      <section id="story" className="section-story">
        <div className="story-grid">
          <div className="story-content" data-aos="fade-right">
            <span className="section-subtitle">Generational Stewardship</span>
            <h2>Ethical Direct Trade With Indian Coffee Estates</h2>
            <p>
              We bypass opaque commodity brokers, partnering directly with artisanal planters across the Western Ghats and Araku highlands. We pay an average of 120% above standard Fair Trade pricing to support ecological agroforestry and soil regeneration.
            </p>
            <ul className="story-points">
              <li>
                <strong>100% High-Altitude Arabica:</strong> Shade-grown under indigenous silver oak and jackfruit canopies.
              </li>
              <li>
                <strong>Convective Air Roasting:</strong> Zero soot or bean charring, unlocking delicate botanical notes.
              </li>
              <li>
                <strong>Foil-Free Bioplastic Pouches:</strong> 100% industrially compostable packaging with aroma release valves.
              </li>
            </ul>
          </div>
          <div className="story-visual-card" data-aos="fade-left">
            <div className="story-stat-card">
              <h3>1,450m</h3>
              <p>Peak estate elevation across our partner farms</p>
            </div>
            <div className="story-stat-card highlight">
              <h3>₹420/kg</h3>
              <p>Average price premium paid directly to our planters</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Testimonials */}
      <section id="reviews" className="section-testimonials">
        <div className="section-header" data-aos="fade-up">
          <span className="section-subtitle">Verified Cuppings</span>
          <h2 className="section-title">Words From Daily Brewers</h2>
          <div className="gold-rule"></div>
        </div>

        <div className="testimonial-card" data-aos="zoom-in" data-aos-duration="1000">
          <div className="testimonial-stars">{testimonials[activeTestimonial].rating}</div>
          <p className="testimonial-quote">"{testimonials[activeTestimonial].quote}"</p>
          <div className="testimonial-author-box">
            <h4 className="author-name">{testimonials[activeTestimonial].author}</h4>
            <p className="author-role">{testimonials[activeTestimonial].role}</p>
          </div>
          <div className="testimonial-dots">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                className={`dot-btn ${activeTestimonial === idx ? 'active' : ''}`}
                onClick={() => setActiveTestimonial(idx)}
                aria-label={`View review ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 11. FAQ Accordion */}
      <section className="section-faq">
        <div className="section-header" data-aos="fade-up">
          <span className="section-subtitle">Clear Answers</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="gold-rule"></div>
        </div>
        <div className="faq-accordion">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeFaq === index ? 'open' : ''}`}
              onClick={() => setActiveFaq(activeFaq === index ? null : index)}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="faq-question">
                <h3>{faq.q}</h3>
                <span className="faq-icon">{activeFaq === index ? '−' : '+'}</span>
              </div>
              {activeFaq === index && <p className="faq-answer">{faq.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* 12. Final High-Contrast CTA Strip */}
      <section className="section-final-cta" data-aos="fade-up" data-aos-duration="1000">
        <div className="cta-strip-inner">
          <span className="section-subtitle">Elevate Your Ritual</span>
          <h2 className="cta-headline">Ready For A Truly Exceptional Morning Cup?</h2>
          <p className="cta-sub">
            Order your first small-batch roast today. Receive 15% off plus our complimentary digital brewing compendium.
          </p>
          <a href="#beans" className="btn-primary btn-cta-large">Explore Fresh Roasts</a>
        </div>
      </section>

      {/* 13. Footer */}
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <h2>AURA ROASTERS</h2>
            <p>Single estate Indian specialty coffees roasted to order with uncompromising precision.</p>
          </div>
          <div className="footer-links-col">
            <h4>Shop</h4>
            <a href="#beans">Single Estates</a>
            <a href="#customizer">Coffee Subscriptions</a>
            <a href="#beans">Tasting Collections</a>
            <a href="#customizer">Brew Equipment</a>
          </div>
          <div className="footer-links-col">
            <h4>Heritage</h4>
            <a href="#story">Estate Partners</a>
            <a href="#process">Roasting Science</a>
            <a href="#story">Sustainability Charter</a>
            <a href="#reviews">Cupping Notes</a>
          </div>
          <div className="footer-newsletter">
            <h4>The Connoisseur Circle</h4>
            <p>Subscribe for private micro-lot drops, estate field notes, and invite-only cuppings.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email address" />
              <button type="button">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Aura Specialty Roasters Pvt. Ltd. Bengaluru, India.</p>
          <div className="legal-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Trade</a>
            <a href="#shipping">Shipping & Returns</a>
          </div>
        </div>
      </footer>
    </div>
  );
}