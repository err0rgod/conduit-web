import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Docs from "./pages/Docs";
import Privacy from "./pages/Privacy";
import "./index.css";

function Navigation() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <header className="site-header">
      <Link to="/" className="brand" aria-label="Conduit home">
        <span className="brand-mark" aria-hidden="true">
          <img src="/logo.jpg" alt="" />
        </span>
        <span>CONDUIT</span>
      </Link>
      <nav className="nav" aria-label="Primary navigation">
        <Link to="/" className={path === "/" ? "active" : undefined}>
          Platform
        </Link>
        <Link
          to="/docs/getting-started"
          className={path.startsWith("/docs") ? "active" : undefined}
        >
          Docs
        </Link>
        <Link
          to="/privacy"
          className={path === "/privacy" ? "active" : undefined}
        >
          Privacy
        </Link>
        <a href="https://github.com/err0rgod/conduit/releases">Releases</a>
        <a href="https://github.com/err0rgod/conduit">GitHub</a>
      </nav>
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
          <Route path="/docs/:slug" element={<Docs />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>

        <footer>
          <div className="copyright">
            © 2026 Conduit. Open source under the MIT License.
          </div>
          <div className="footer-links">
            <Link to="/">Platform</Link>
            <Link to="/docs/getting-started">Docs</Link>
            <Link to="/privacy">Privacy</Link>
            <a href="https://github.com/err0rgod/conduit">GitHub</a>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
