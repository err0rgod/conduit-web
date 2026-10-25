import { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { Menu, X } from "lucide-react";
import Home, { chromeStoreUrl } from "./pages/Home";
import Docs from "./pages/Docs";
import Privacy from "./pages/Privacy";
import GitHubIcon from "./GitHubIcon";
import "./index.css";

function Navigation() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link to="/" className="brand" aria-label="Conduit home">
          <img src="./logo.jpg" alt="" className="brand-mark" />
          <span>Conduit</span>
        </Link>

        <nav
          className={open ? "nav open" : "nav"}
          aria-label="Primary navigation"
        >
          <Link to="/" className={pathname === "/" ? "active" : undefined}>
            Overview
          </Link>
          <Link
            to="/docs/getting-started"
            className={pathname.startsWith("/docs") ? "active" : undefined}
          >
            Docs
          </Link>
          <Link
            to="/privacy"
            className={pathname === "/privacy" ? "active" : undefined}
          >
            Privacy
          </Link>
          <a href="https://github.com/err0rgod/conduit/releases">Releases</a>
          <a
            className="nav-github"
            href="https://github.com/err0rgod/conduit"
            aria-label="Conduit on GitHub"
          >
            <GitHubIcon />
            <span>GitHub</span>
          </a>
          <a className="button small" href={chromeStoreUrl}>
            Add to Chrome
          </a>
        </nav>

        <button
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div className="footer-brand">
          <Link to="/" className="brand">
            <img src="./logo.jpg" alt="" className="brand-mark" />
            <span>Conduit</span>
          </Link>
          <p>
            Local-first browser control for AI agents. Open source under the MIT
            License.
          </p>
        </div>
        <div className="footer-col">
          <h4>Product</h4>
          <Link to="/">Overview</Link>
          <Link to="/docs/installation">Installation</Link>
          <a href={chromeStoreUrl}>Chrome Web Store</a>
          <a href="https://addons.mozilla.org/en-US/firefox/addon/conduit/">
            Firefox Add-ons
          </a>
        </div>
        <div className="footer-col">
          <h4>Resources</h4>
          <Link to="/docs/getting-started">Documentation</Link>
          <Link to="/docs/security">Security model</Link>
          <Link to="/docs/roadmap">Roadmap</Link>
          <Link to="/docs/changelog">Changelog</Link>
        </div>
        <div className="footer-col">
          <h4>Project</h4>
          <a href="https://github.com/err0rgod/conduit">GitHub</a>
          <a href="https://github.com/err0rgod/conduit/releases">Releases</a>
          <Link to="/privacy">Privacy</Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        © 2026 Conduit. Built in the open.
      </div>
    </footer>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/docs/:slug" element={<Docs />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
