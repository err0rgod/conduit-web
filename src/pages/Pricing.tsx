import { Check } from 'lucide-react';

export default function Pricing() {
  return (
    <main>
      <section className="hero" style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h1 style={{ margin: '0 auto', marginBottom: '1rem' }}>Start without the ceremony.</h1>
        <p style={{ margin: '0 auto' }}>
          Open-source and entirely local. No API keys, no subscriptions, no tracking.
        </p>
      </section>

      <div className="grid-3" style={{ maxWidth: '900px', margin: '0 auto', gridTemplateColumns: '1fr 1fr' }}>
        
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.5rem' }}>Open Source</h3>
          <div style={{ fontSize: '3rem', fontWeight: 600, margin: '1rem 0' }}>$0<span style={{ fontSize: '1rem', color: '#888', fontWeight: 400 }}>/mo</span></div>
          <p style={{ marginBottom: '2rem' }}>For personal agents, prototypes, and shipping the first version.</p>
          
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
            <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><Check size={18} color="#fff" /> Local daemon</li>
            <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><Check size={18} color="#fff" /> Full MCP compatibility</li>
            <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><Check size={18} color="#fff" /> Unlimited requests</li>
            <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><Check size={18} color="#fff" /> Unrestricted domains</li>
          </ul>
          
          <a href="https://github.com/err0rgod/conduit" className="button" style={{ marginTop: '2rem', width: '100%' }}>View Source</a>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', borderColor: '#fff' }}>
          <h3 style={{ fontSize: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Pro <span style={{ fontSize: '0.75rem', backgroundColor: '#fff', color: '#000', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>COMING SOON</span>
          </h3>
          <div style={{ fontSize: '3rem', fontWeight: 600, margin: '1rem 0' }}>$0<span style={{ fontSize: '1rem', color: '#888', fontWeight: 400 }}>/mo</span></div>
          <p style={{ marginBottom: '2rem' }}>For high-volume agents, cloud orchestration, and remote fleet management.</p>
          
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
            <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><Check size={18} color="#fff" /> Everything in Open Source</li>
            <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: '#888' }}><Check size={18} color="#888" /> Headless chromium farms</li>
            <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: '#888' }}><Check size={18} color="#888" /> Remote tunneling</li>
            <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: '#888' }}><Check size={18} color="#888" /> Multi-agent multiplexing</li>
          </ul>
          
          <button className="button secondary" style={{ marginTop: '2rem', width: '100%', cursor: 'not-allowed', color: '#666', borderColor: '#333' }} disabled>Join Waitlist</button>
        </div>

      </div>

      <section className="section" style={{ marginTop: '8rem', textAlign: 'center' }}>
        <h2>Know where every request went.</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '600px', margin: '3rem auto 0', textAlign: 'left' }}>
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Do you store any browser data?</h4>
            <p style={{ color: '#888' }}>No. Conduit operates entirely locally. We do not proxy, store, or inspect your traffic. The extension and daemon communicate strictly over localhost.</p>
          </div>
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Do I need a credit card?</h4>
            <p style={{ color: '#888' }}>No. The software is 100% open source under the MIT license. You can clone, build, and run it for free forever.</p>
          </div>
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Will my agents break when a site updates?</h4>
            <p style={{ color: '#888' }}>Conduit provides structured accessibility trees instead of fragile CSS selectors, making agents highly resilient to visual DOM changes.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
