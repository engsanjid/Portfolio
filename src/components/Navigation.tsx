import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Home',     href: '#home' },
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Clients',  href: '#clients' },
  { label: 'Contact',  href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['home', 'about', 'skills', 'projects', 'clients', 'contact'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(5, 5, 16, 0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,245,255,0.08)' : 'none',
        }}
      >
       <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between w-full">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
            className="font-display text-lg font-bold tracking-widest"
            style={{ color: 'var(--cyan)', fontFamily: 'var(--font-display)' }}
          >
            SANJID<span style={{ color: 'var(--purple)' }}>.</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`nav-link${active === link.href.replace('#', '') ? ' active' : ''}`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:mdsanjidi36@gmail.com"
              className="btn-primary text-xs py-2 px-5"
            >
              <i className="fas fa-paper-plane" />
              Hire Me
            </a>
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ cursor: 'none' }}
          >
            <span
              className="block h-0.5 w-6 transition-all duration-300"
              style={{
                background: 'var(--cyan)',
                transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
              }}
            />
            <span
              className="block h-0.5 w-6 transition-all duration-300"
              style={{
                background: 'var(--cyan)',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-0.5 w-6 transition-all duration-300"
              style={{
                background: 'var(--cyan)',
                transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className="text-2xl font-display font-bold tracking-widest transition-colors"
              style={{
                fontFamily: 'var(--font-display)',
                color: active === link.href.replace('#', '') ? 'var(--cyan)' : 'var(--text-secondary)',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:mdsanjidi36@gmail.com"
            className="btn-primary mt-4"
            onClick={() => setMenuOpen(false)}
          >
            <i className="fas fa-paper-plane" />
            Hire Me
          </a>
        </div>
      )}
    </>
  );
}
