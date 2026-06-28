import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Thanks ${form.name}! We'll get back to you soon.`)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section className="page">
      <div className="container">
        <h1>Contact Us</h1>
        <p className="lead">Have a question or feedback? Send us a message and our team will reply within 24 hours.</p>

        <form className="auth-card" style={{ marginTop: 28 }} onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="c-name">Name</label>
            <input id="c-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
          </div>
          <div className="field">
            <label htmlFor="c-email">Email</label>
            <input id="c-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
          </div>
          <div className="field">
            <label htmlFor="c-message">Message</label>
            <input id="c-message" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="How can we help?" />
          </div>
          <button type="submit" className="btn btn-primary full-btn">Send Message</button>
        </form>
      </div>
    </section>
  )
}
