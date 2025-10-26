import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className="landing-page" data-testid="landing-page">
      <section className="hero" data-testid="hero-section">
        <div className="decorative-circle decorative-circle--1"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title" data-testid="hero-title">
              Streamline Your Support with Ednut Ticket
            </h1>
            <p className="hero-description" data-testid="hero-description">
              The ultimate ticket management solution for teams of all sizes. 
              Track, prioritize, and resolve issues efficiently.
            </p>
            <div className="hero-actions">
              <Link 
                to="/auth" 
                className="btn btn--secondary"
                data-testid="hero-login-btn"
              >
                Login
              </Link>
              <Link 
                to="/auth" 
                className="btn btn--primary"
                data-testid="hero-get-started-btn"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="features" data-testid="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Ednut Ticket?</h2>
          <div className="features-grid">
            <div className="feature-card" data-testid="feature-card-1">
              <h3>Easy Ticket Management</h3>
              <p>Create, track, and resolve tickets with our intuitive interface.</p>
            </div>
            <div className="feature-card" data-testid="feature-card-2">
              <h3>Real-time Updates</h3>
              <p>Stay informed with live status updates and notifications.</p>
            </div>
            <div className="feature-card" data-testid="feature-card-3">
              <h3>Team Collaboration</h3>
              <p>Work together seamlessly with your team members.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="decorative-circle decorative-circle--2"></div>
    </div>
  )
}

export default LandingPage