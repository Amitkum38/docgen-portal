import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Features from './pages/Features.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import MasterLogin from './pages/MasterLogin.jsx'
import UserLogin from './pages/UserLogin.jsx'
import MasterDashboard from './pages/MasterDashboard.jsx'
import UserDashboard from './pages/UserDashboard.jsx'
import SchemeWorkflow from './pages/SchemeWorkflow.jsx'
import MeraKisanWorkflow from './pages/MeraKisanWorkflow.jsx'
import Footer from './components/Footer.jsx'

function PublicLayout({ children }) {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">{children}</main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/features" element={<PublicLayout><Features /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/master-login" element={<PublicLayout><MasterLogin /></PublicLayout>} />
      <Route path="/user-login" element={<PublicLayout><UserLogin /></PublicLayout>} />
      <Route path="/admin-login" element={<Navigate to="/master-login" replace />} />

      <Route path="/master/dashboard" element={<MasterDashboard />} />
      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path="/user/scheme/mera-kisan" element={<MeraKisanWorkflow />} />
      <Route path="/user/scheme/mera-khas" element={<Navigate to="/user/scheme/mera-kisan" replace />} />
      <Route path="/user/scheme/:schemeId" element={<SchemeWorkflow />} />
    </Routes>
  )
}
