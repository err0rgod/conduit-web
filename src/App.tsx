import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Docs from './pages/Docs';
import Pricing from './pages/Pricing';
import './index.css';

function Navigation() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <header>
      <Link to="/" className="brand">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
        CONDUIT
      </Link>
      <div className="nav">
        <Link to="/" style={{ color: path === '/' ? '#fff' : '#888' }}>Platform</Link>
        <Link to="/docs" style={{ color: path === '/docs' ? '#fff' : '#888' }}>Docs</Link>
        <Link to="/pricing" style={{ color: path === '/pricing' ? '#fff' : '#888' }}>Pricing</Link>
        <a href="https://github.com/err0rgod/skills/blob/main/conduit/SKILL.md">Skills</a>
      </div>
      <div className="status">
        <div className="status-dot"></div>
        Operational
      </div>
    </header>
  );
}

function App() {
  return (
    <Router>
      <div className="container">
        <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>

        <footer>
          <div className="copyright">© 2026 Conduit. The open-source browser bridge.</div>
          <div className="footer-links">
            <Link to="/">Platform</Link>
            <Link to="/docs">Docs</Link>
            <a href="https://github.com/err0rgod/conduit">GitHub</a>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
