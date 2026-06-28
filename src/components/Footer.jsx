import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <div className="brand">
            <img src="/logo.png" alt="" className="brand-logo" />
            <div className="brand-text">
              <span className="brand-title">Digital Document Generator</span>
              <  span className="brand-sub"> Fast • Secure • Reliable</span>
            </div>
          </div>
          <p className="footer-tag">A modern dashboard for generating government scheme PDFs — fast, secure and beautifully designed.</p>
        </div>

        <div className="footer-col">
          <h4>Product</h4>
          <NavLink to="/features">Features</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>

        <div className="footer-col">
          <h4>Schemes</h4>
          <a href="#schemes">Aadhaar</a>
          <a href="#schemes">Ayushman</a>
          <a href="#schemes">ABHA</a>
          <a href="#schemes">MP Ration Card</a>
        </div>

        <div className="footer-col">
          <h4>Account</h4>
          <NavLink to="/user-login">User Login</NavLink>
          <NavLink to="/master-login">Master Login</NavLink>
        </div>
      </div>

      <div className="container footer-bottom">
        <div>© {new Date().getFullYear()} Digital Document Generator. All rights reserved.</div>
        <div className="footer-credit">
          <span className="footer-credit-label">Developed by</span>{' '}
          <a
            href="https://amitkumportfolio.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-credit-link"
          >
            Amit — Software Development Engineer (Frontend)
          </a>
        </div>
      </div>
    </footer>
  )
}
