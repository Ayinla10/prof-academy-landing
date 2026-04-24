import { useState } from 'react'
import ebookMockup from './assets/ebook-mockup.png'

function App() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const [confirmedEmail, setConfirmedEmail] = useState('')

  const handlePayment = (e) => {
    if (e) e.preventDefault();
    
    if (!email || !name) {
      alert('Please enter your name and email to proceed.');
      return;
    }

    setIsProcessing(true);

    // Simulated Payment Flow
    setTimeout(() => {
      setIsProcessing(false);
      console.log('Payment successful (Simulated)');
      sendEmailNotification(email, name);
      setConfirmedEmail(email);
      setIsModalOpen(false);
      setIsSuccessOpen(true);
      // Clean up inputs for next time (optional, keep for confirmation display)
    }, 2000);
  };

  const handleCloseSuccess = () => {
    setIsSuccessOpen(false);
    setEmail('');
    setName('');
  };

  const sendEmailNotification = async (userEmail, userName) => {
    try {
      const response = await fetch('/.netlify/functions/send-ebook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail, name: userName }),
      });
      const data = await response.json();
      console.log('Email response:', data);
    } catch (error) {
      console.error('Error triggering email:', error);
    }
  };

  return (
    <div className="app">
      <nav>
        <div className="container">
          <div className="logo">
            <span style={{color: 'var(--primary)'}}>Prof</span>Academy
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#modules">Modules</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
            <button onClick={() => document.getElementById('pricing').scrollIntoView({behavior: 'smooth'})} className="btn btn-primary">Enroll Now</button>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="price-tag">Best Seller 2026</span>
              <h1>Build your dream <span>e-business Today.</span></h1>
              <p>Everything you need to build, launch, and scale your online business from scratch. Get certified by Prof Tidjani at Bluecrest College.</p>
              <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
                <button onClick={() => document.getElementById('pricing').scrollIntoView({behavior: 'smooth'})} className="btn btn-primary">Get the E-book — GH₵199</button>
                <a href="#features" style={{color: 'var(--text-muted)', textDecoration: 'none', fontWeight: '500'}}>Learn more →</a>
              </div>
              <div style={{marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <div style={{display: 'flex'}}>
                  {'⭐⭐⭐⭐⭐'.split('').map((s, i) => <span key={i} style={{color: '#FFD700'}}>{s}</span>)}
                </div>
                <span style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>5,000+ Students enrolled</span>
              </div>
            </div>
            <div className="hero-image">
              <img src={ebookMockup} alt="E-Business for Bluecrest Students by Prof Tidjani" />
              <div style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                background: 'rgba(0,0,0,0.8)',
                color: 'white',
                padding: '1rem',
                borderRadius: '12px',
                backdropFilter: 'blur(5px)',
                fontSize: '0.8rem'
              }}>
                <strong>Limited Offer</strong><br/>
                GH₵199 <span style={{textDecoration: 'line-through', opacity: 0.5}}>GH₵400</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="section" style={{background: 'var(--bg-subtle)'}}>
        <div className="container">
          <div className="section-title">
            <span style={{color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem'}}>Why Choose Us</span>
            <h2>Everything you need to win online — in one place.</h2>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>Find your winning idea</h3>
              <p>We show you how to identify profitable niches that align with your skills.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Launch in 30 days</h3>
              <p>A step-by-step roadmap to get your first customer within a month.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Marketing that converts</h3>
              <p>Master the art of social media selling and high-conversion ads.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="modules" className="section">
        <div className="container">
          <div className="section-title">
            <span style={{color: 'var(--primary)', fontWeight: '700'}}>Curriculum</span>
            <h2>12 modules. 80 lessons. One transformation.</h2>
            <p style={{maxWidth: '600px', margin: '1rem auto', color: 'var(--text-muted)'}}>Our curriculum is designed to take you from a total beginner to a proficient e-business owner.</p>
          </div>
          <div className="modules-grid">
            {[
              "The Entrepreneur Mindset", "Digital Product Selection", "Building Your First Website", 
              "Setting Up Payment Gateways", "Copywriting for Sales", "Social Media Mastery",
              "Facebook & IG Ads", "Email Marketing Automation", "Customer Support Systems",
              "Scaling to GH₵10k/mo", "Legalizing Your Business", "Building a Sustainable Brand"
            ].map((module, i) => (
              <div key={module} className="module-item">
                <span className="module-number">{(i + 1).toString().padStart(2, '0')}</span>
                <span style={{fontWeight: '600'}}>{module}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="section" style={{background: 'var(--bg-subtle)'}}>
        <div className="container">
          <div className="section-title">
            <h2>Start your journey today.</h2>
          </div>
          <div className="pricing-card">
            <h3>Prof Academy E-book</h3>
            <div className="price">GH₵199 <span>one-time</span></div>
            <ul className="pricing-features">
              <li>Complete 12-Module Guide</li>
              <li>E-business Mockup Templates</li>
              <li>Lifetime Access to Updates</li>
              <li>Certificate of Completion</li>
              <li>Bluecrest Discount Voucher</li>
            </ul>
            <button onClick={() => setIsModalOpen(true)} className="btn btn-primary" style={{width: '100%', padding: '1.2rem'}}>Get My E-book</button>
            <p style={{marginTop: '1rem', fontSize: '0.8rem', opacity: 0.6}}>Secure Checkout • Instant Delivery</p>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Questions? Let's talk before you enroll.</h2>
              <p>We're here to help you make the best decision for your future.</p>
              <div className="info-item">
                <h4>📍 Visit Us</h4>
                <p>Bluecrest University College,<br/>Cockerel Hall, Accra, Ghana</p>
              </div>
              <div className="info-item">
                <h4>📞 Call Us</h4>
                <p>+233 20 000 0000</p>
              </div>
              <div className="info-item">
                <h4>✉️ Email Us</h4>
                <p>info@profacademy.com.gh</p>
              </div>
            </div>
            <div className="contact-form">
              <form onSubmit={(e) => {e.preventDefault(); alert('Message sent! We will contact you soon.');}}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="John Doe" required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="john@example.com" required />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea rows="4" placeholder="How can we help you?" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      <div className={`modal-overlay ${isModalOpen ? 'active' : ''}`} onClick={() => !isProcessing && setIsModalOpen(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={() => !isProcessing && setIsModalOpen(false)}>×</button>
          <div className="modal-header">
            <h3>Complete Purchase</h3>
            <p>Access "E-Business for Bluecrest Students" for GH₵199</p>
          </div>
          <div className="form-group">
            <label>Your Full Name</label>
            <input 
              type="text" 
              placeholder="e.g. Kofi Mensah" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{border: '1px solid #ddd'}}
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="kofi@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{border: '1px solid #ddd'}}
            />
          </div>
          <button 
            onClick={handlePayment} 
            disabled={isProcessing} 
            className="btn btn-primary" 
            style={{width: '100%', marginTop: '1rem', padding: '1.2rem'}}
          >
            {isProcessing ? 'Verifying Payment...' : 'Secure Checkout'}
          </button>
          <div style={{marginTop: '1.5rem', textAlign: 'center', opacity: 0.6, fontSize: '0.8rem'}}>
            🔒 Your transaction is encrypted and secure.
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <div className={`modal-overlay ${isSuccessOpen ? 'active' : ''}`} onClick={handleCloseSuccess}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="success-icon">✓</div>
          <div className="success-message" style={{textAlign: 'center'}}>
            <h2>Payment Successful!</h2>
            <p>Your ebook <strong>"E-Business for Bluecrest Students"</strong> is on its way!</p>
            <p>We've sent the download link to: <br/> <span className="email-highlight">{confirmedEmail}</span></p>
            <p style={{fontSize: '0.9rem'}}>Please check your inbox (and spam folder) shortly. Welcome to the academy!</p>
            <button onClick={handleCloseSuccess} className="btn btn-primary" style={{width: '100%'}}>Great, thanks!</button>
          </div>
        </div>
      </div>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="logo" style={{color: 'white'}}>Prof Academy</div>
            <p>© 2024 Prof Academy | Powered by Bluecrest Ghana</p>
            <div className="nav-links">
              <a href="#" style={{color: 'white', opacity: 0.7}}>Privacy</a>
              <a href="#" style={{color: 'white', opacity: 0.7}}>Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
