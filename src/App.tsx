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
    <header>
      <Link to="/" className="brand">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
        CONDUIT
      </Link>
      <div className="nav">
        <Link to="/" style={{ color: path === "/" ? "#fff" : "#888" }}>
          Platform
        </Link>
        <Link
          to="/docs/getting-started"
          style={{ color: path.startsWith("/docs") ? "#fff" : "#888" }}
        >
          Docs
        </Link>
        <Link
          to="/privacy"
          style={{ color: path === "/privacy" ? "#fff" : "#888" }}
        >
          Privacy
        </Link>
        <a href="https://github.com/err0rgod/conduit/releases">Releases</a>
        <a href="https://github.com/err0rgod/conduit">GitHub</a>
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
