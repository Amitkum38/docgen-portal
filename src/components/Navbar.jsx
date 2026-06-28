import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { IconMenu, IconClose } from './Icons.jsx'

export default function Navbar() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { to: '/', label: 'Home', end: true },
    { to: '/features', label: 'Features' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' }
  ]

  return (
    <header className={'navbar' + (scrolled ? ' is-scrolled' : '')}>
      <div className="container nav-inner">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <img src="/logo.png" alt="" className="brand-logo" />
          <div className="brand-text">
            <span className="brand-title">Digital Document Generator</span>
            <  span className="brand-sub"> Fast • Secure • Reliable</span>
          </div>
        </NavLink>

        <nav className={'nav-links' + (open ? ' is-open' : '')}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            >
              {l.label}
            </NavLink>
          ))}

          <div className="nav-actions-mobile">
            <button className="btn btn-ghost" onClick={() => { setOpen(false); navigate('/user-login') }}>User Login</button>
            <button className="btn btn-primary" onClick={() => { setOpen(false); navigate('/master-login') }}>Master Login</button>
          </div>
        </nav>

        <div className="nav-actions">
          <button className="btn btn-ghost" onClick={() => navigate('/user-login')}>User Login</button>
          <button className="btn btn-primary" onClick={() => navigate('/master-login')}>Master Login</button>
        </div>

        <button className="nav-toggle" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
          {open ? <IconClose width="22" height="22" /> : <IconMenu width="22" height="22" />}
        </button>
      </div>
    </header>
  )
}
