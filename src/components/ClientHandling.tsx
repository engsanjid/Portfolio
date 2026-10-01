import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ClientWork {
  id: string;
  number: string;
  name: string;
  clientType: string;
  role: string;
  status: string;
  liveUrl: string;
  accent: string;
  icon: string;
  overview: string;
  highlights: string[];
  techStack: string[];
  screenshots: {
    title: string;
    description: string;
    src: string;
  }[];
}

const CLIENT_PROJECTS: ClientWork[] = [
  {
    id: 'easy-tech-solution',
    number: 'CLIENT — 01',
    name: 'Easy Tech Solution',
    clientType: 'Full-Stack Enterprise Migration & Client Management',
    role: 'Full-Stack Architecture & Development',
    status: 'Live in Production',
    liveUrl: 'https://easytech.org.uk',
    accent: '#00f5ff',
    icon: 'fas fa-server',
    overview:
      'Modernized and unified Easy Tech Solution’s entire platform by migrating a legacy Vite frontend and Express backend into a high-performance Next.js App Router full-stack web application with serverless MongoDB caching, Firebase token authentication, and real-time Meta WhatsApp business notifications.',
    highlights: [
      'Next.js App Router Architecture: Unified frontend UI (src/app) and backend Route Handlers into a single deployable Vercel application.',
      'Firebase Bearer Token Security: All protected API endpoints (/api/auth, /api/entries, /api/payments) are safeguarded with Firebase ID Token verification and role-based admin access.',
      'Comprehensive Client Ledger: Engineered client workflows, payment tracking (/api/entries/:id/payments), and JSON bulk entry import automation.',
      'Automated Meta WhatsApp Notifications: Real-time WhatsApp Cloud API integration notifying clients on entry status transitions (Complete, Progress, Due Later).',
      'Optimized MongoDB Caching: Global database connection caching on globalThis, eliminating cold starts across Vercel serverless function invocations.',
    ],
    techStack: [
      'Next.js (App Router)',
      'TypeScript',
      'MongoDB Atlas',
      'Firebase Auth',
      'Meta WhatsApp API',
      'Mongoose',
      'Tailwind CSS',
      'Vercel',
    ],
    screenshots: [
      {
        title: 'Executive Dashboard',
        description: 'Comprehensive business metrics, payment summaries, and live status distribution.',
        src: '/client1/dashboard.png',
      },
      {
        title: 'Client Ledger & All Entries',
        description: 'Detailed client accounts, payment histories, search filtering, and JSON import.',
        src: '/client1/all-entry.png',
      },
      {
        title: 'WhatsApp Automation Notification',
        description: 'Automated Meta WhatsApp notifications dispatched to clients on status updates.',
        src: '/client1/notification.png',
      },
    ],
  },
  {
    id: 'akshar-bhander',
    number: 'CLIENT — 02',
    name: 'Akshar Bhander',
    clientType: 'E-Commerce Platform & Online Bookstore',
    role: 'E-Commerce & WordPress Specialist',
    status: 'Live in Production',
    liveUrl: 'https://www.aksharbhander.com/',
    accent: '#f59e0b',
    icon: 'fas fa-book-open',
    overview:
      'Designed and developed a custom, high-converting online book commerce website for Akshar Bhander. Engineered an intuitive book catalog, frictionless CartFlows sales funnels, and a mobile-first shopping experience tailored for book enthusiasts and academic readers.',
    highlights: [
      'Full-Featured Book Store: Built an end-to-end e-commerce store with WordPress & WooCommerce optimized for book retail and author catalogs.',
      'High-Converting Checkout: Configured CartFlows sales funnels to streamline checkout and drastically decrease cart abandonment.',
      'Responsive Mobile-First UI: Crafted a clean, modern aesthetic with optimized images for lightning-fast loading on mobile networks.',
      'Payment & Order Management: Integrated local payment solutions, cash on delivery (COD), and automated customer order updates.',
      'Custom Categorization: Structured multi-tier book taxonomy with dynamic search by author, publication, and genre.',
    ],
    techStack: [
      'WordPress',
      'WooCommerce',
      'CartFlows',
      'Elementor Pro',
      'PHP',
      'MySQL',
      'Payment Gateway',
      'SEO Optimization',
    ],
    screenshots: [
      {
        title: 'Online Bookstore Showcase',
        description: 'Custom e-commerce storefront showcasing published titles, categories, and special offers.',
        src: '/client2/akshar-bhandar.png',
      },
      {
        title: 'Store Promotional Feature',
        description: 'Branded promotional presentation and featured publications banner.',
        src: '/client2/akshar-banner.jpeg',
      },
    ],
  },
];

interface ModalGallery {
  clientName: string;
  clientType: string;
  accent: string;
  liveUrl: string;
  screenshots: {
    title: string;
    description: string;
    src: string;
  }[];
  currentIndex: number;
}

interface ClientCardProps {
  client: ClientWork;
  delay: number;
  onOpenGallery: (client: ClientWork, index: number) => void;
}

function ClientCard({ client, delay, onOpenGallery }: ClientCardProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), delay);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const activeScreenshot = client.screenshots[activeImageIndex] || client.screenshots[0];

  return (
    <div
      ref={cardRef}
      className="reveal project-card p-6 md:p-8 flex flex-col gap-6"
      style={{
        border: `1px solid ${client.accent}33`,
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10" style={{ position: 'relative', zIndex: 20 }}>
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg flex-shrink-0"
            style={{
              background: `${client.accent}18`,
              border: `1px solid ${client.accent}40`,
              color: client.accent,
              boxShadow: `0 0 20px ${client.accent}20`,
            }}
          >
            <i className={client.icon} />
          </div>

          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="text-xs font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full"
                style={{
                  background: `${client.accent}15`,
                  color: client.accent,
                  border: `1px solid ${client.accent}30`,
                }}
              >
                {client.number}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {client.status}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold mt-1 text-white">
              {client.name}
            </h3>
            <p className="text-xs font-mono text-gray-400 mt-0.5">
              {client.clientType} • <span style={{ color: client.accent }}>{client.role}</span>
            </p>
          </div>
        </div>

        {/* Live Demo Action */}
        <div className="flex items-center gap-3">
          <a
            href={client.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs py-2.5 px-4 flex items-center gap-2 group transition-all duration-300"
            style={{
              border: `1px solid ${client.accent}60`,
              background: `linear-gradient(135deg, ${client.accent}20, ${client.accent}08)`,
              color: client.accent,
              boxShadow: `0 0 15px ${client.accent}15`,
              position: 'relative',
              zIndex: 20,
              pointerEvents: 'auto',
            }}
            title={`Visit ${client.name} Live`}
          >
            <span>Live Website</span>
            <i className="fas fa-external-link-alt group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Main Grid: Description + Interactive Visual Demo */}
      <div className="grid lg:grid-cols-12 gap-8 items-start" style={{ position: 'relative', zIndex: 20 }}>
        {/* Left: Overview & Key Highlights (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-gray-400 mb-2">
              Project Architecture & Impact
            </h4>
            <p className="text-sm leading-relaxed text-gray-300">
              {client.overview}
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-gray-400 mb-3">
              Key Engineering Deliverables
            </h4>
            <ul className="space-y-2.5">
              {client.highlights.map((highlight, idx) => {
                const [title, ...descParts] = highlight.split(':');
                const desc = descParts.join(':');
                return (
                  <li key={idx} className="text-xs text-gray-300 flex items-start gap-2.5 leading-relaxed">
                    <i
                      className="fas fa-check-circle mt-0.5 flex-shrink-0 text-xs"
                      style={{ color: client.accent }}
                    />
                    <span>
                      <strong className="text-white font-medium">{title}:</strong>
                      {desc}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Tech Stack Tags */}
          <div className="pt-2">
            <h4 className="text-xs uppercase font-mono tracking-wider text-gray-400 mb-2.5">
              Technologies & Infrastructure
            </h4>
            <div className="flex flex-wrap gap-2">
              {client.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2.5 py-1 rounded-md font-mono"
                  style={{
                    background: `${client.accent}0d`,
                    border: `1px solid ${client.accent}25`,
                    color: client.accent,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Live Interactive Demo Showcase (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3" style={{ position: 'relative', zIndex: 20 }}>
          {/* Main Visual Frame (Clickable) */}
          <div
            className="group relative rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer"
            style={{
              borderColor: `${client.accent}44`,
              background: 'rgba(5, 5, 18, 0.95)',
              boxShadow: `0 10px 30px rgba(0,0,0,0.5)`,
              pointerEvents: 'auto',
            }}
            onClick={() => onOpenGallery(client, activeImageIndex)}
            role="button"
            tabIndex={0}
            aria-label={`View full preview of ${activeScreenshot.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenGallery(client, activeImageIndex);
              }
            }}
          >
            {/* Browser Top Bar Decoration */}
            <div className="flex items-center justify-between px-3 py-2 bg-black/60 border-b border-white/10 text-xs font-mono text-gray-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="truncate max-w-[150px] text-[10px] text-gray-400">
                {client.liveUrl.replace('https://', '')}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenGallery(client, activeImageIndex);
                }}
                className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] transition-all hover:scale-105"
                style={{
                  background: `${client.accent}18`,
                  color: client.accent,
                  border: `1px solid ${client.accent}40`,
                }}
                title="Expand & View Fullscreen"
              >
                <i className="fas fa-expand text-[9px]" />
                <span className="hidden sm:inline">View Full</span>
              </button>
            </div>

            {/* Screenshot Display */}
            <div className="relative aspect-[16/10] overflow-hidden bg-black/60 flex items-center justify-center">
              <img
                src={activeScreenshot.src}
                alt={`${client.name} - ${activeScreenshot.title}`}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white font-mono p-4 text-center">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${client.accent}30`,
                    border: `1.5px solid ${client.accent}`,
                    boxShadow: `0 0 20px ${client.accent}50`,
                  }}
                >
                  <i className="fas fa-search-plus text-base" style={{ color: client.accent }} />
                </div>
                <span className="text-xs font-semibold tracking-wide text-white">
                  Click to View Full Image
                </span>
                <span className="text-[10px] text-gray-300">
                  {client.screenshots.length} screenshots available • Click to enlarge
                </span>
              </div>
            </div>

            {/* Caption */}
            <div className="p-3 bg-black/50 border-t border-white/5 flex items-center justify-between">
              <div className="truncate pr-2">
                <div className="text-xs font-semibold text-white flex items-center gap-2">
                  <span className="truncate">{activeScreenshot.title}</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5 truncate">
                  {activeScreenshot.description}
                </p>
              </div>
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded-full flex-shrink-0 font-bold"
                style={{
                  background: `${client.accent}15`,
                  color: client.accent,
                  border: `1px solid ${client.accent}30`,
                }}
              >
                {activeImageIndex + 1} / {client.screenshots.length}
              </span>
            </div>
          </div>

          {/* Screenshot Switcher Thumbnails / Tabs (Clickable to switch or open) */}
          {client.screenshots.length > 1 && (
            <div className={`grid gap-2 ${client.screenshots.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {client.screenshots.map((s, idx) => {
                const isActive = idx === activeImageIndex;
                return (
                  <div key={idx} className="relative group/thumb">
                    <button
                      type="button"
                      onClick={() => {
                        if (isActive) {
                          onOpenGallery(client, idx);
                        } else {
                          setActiveImageIndex(idx);
                        }
                      }}
                      onDoubleClick={() => onOpenGallery(client, idx)}
                      className="w-full flex flex-col text-left p-1.5 rounded-lg border transition-all text-[11px] cursor-pointer"
                      style={{
                        borderColor: isActive ? client.accent : 'rgba(255,255,255,0.08)',
                        background: isActive ? `${client.accent}15` : 'rgba(255,255,255,0.02)',
                        boxShadow: isActive ? `0 0 12px ${client.accent}25` : 'none',
                        pointerEvents: 'auto',
                      }}
                      title={`${s.title} (Click to switch preview, click view icon to open full)`}
                    >
                      <div className="relative h-11 w-full rounded overflow-hidden mb-1 bg-black/40">
                        <img
                          src={s.src}
                          alt={s.title}
                          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/thumb:scale-105"
                        />
                        {/* Quick View Button overlay on thumbnail */}
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenGallery(client, idx);
                          }}
                          className="absolute inset-0 bg-black/50 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center gap-1 text-[10px] text-white font-mono"
                          title="Open full size"
                        >
                          <i className="fas fa-search-plus" style={{ color: client.accent }} />
                          <span className="text-[9px]">View</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-1 w-full">
                        <span
                          className="truncate font-mono text-[10px] block font-medium"
                          style={{ color: isActive ? client.accent : 'var(--text-secondary)' }}
                        >
                          {s.title}
                        </span>
                        {isActive && (
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: client.accent }}
                          />
                        )}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ClientHandling() {
  const headingRef = useScrollReveal<HTMLDivElement>();
  const [modalGallery, setModalGallery] = useState<ModalGallery | null>(null);

  // Keyboard navigation & body scroll locking for lightbox modal
  useEffect(() => {
    if (!modalGallery) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalGallery(null);
      } else if (e.key === 'ArrowLeft') {
        setModalGallery((prev) =>
          prev
            ? {
                ...prev,
                currentIndex:
                  (prev.currentIndex - 1 + prev.screenshots.length) %
                  prev.screenshots.length,
              }
            : null
        );
      } else if (e.key === 'ArrowRight') {
        setModalGallery((prev) =>
          prev
            ? {
                ...prev,
                currentIndex: (prev.currentIndex + 1) % prev.screenshots.length,
              }
            : null
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalGallery]);

  const handleOpenGallery = (client: ClientWork, index: number) => {
    setModalGallery({
      clientName: client.name,
      clientType: client.clientType,
      accent: client.accent,
      liveUrl: client.liveUrl,
      screenshots: client.screenshots,
      currentIndex: index,
    });
  };

  const nextImage = () => {
    setModalGallery((prev) =>
      prev
        ? {
            ...prev,
            currentIndex: (prev.currentIndex + 1) % prev.screenshots.length,
          }
        : null
    );
  };

  const prevImage = () => {
    setModalGallery((prev) =>
      prev
        ? {
            ...prev,
            currentIndex:
              (prev.currentIndex - 1 + prev.screenshots.length) %
              prev.screenshots.length,
          }
        : null
    );
  };

  return (
    <section id="clients" className="relative py-24 lg:py-32">
      {/* Background Neon Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 80% 50%, rgba(176,0,255,0.06) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 20% 30%, rgba(0,245,255,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div ref={headingRef} className="reveal text-center mb-16">
          <span className="section-tag">04 — Client Handling</span>
          <h2 className="section-title mt-2">
            Client <span className="gradient-text">Handling & Work</span>
          </h2>
          <div className="neon-divider max-w-xs mx-auto mt-4" />
          <p className="mt-4 text-sm max-w-2xl mx-auto text-gray-400">
            Real-world commercial client projects, high-impact architecture migrations, and production-deployed web solutions delivered with precision.
          </p>
        </div>

        {/* Client Cards Showcase */}
        <div className="flex flex-col gap-10">
          {CLIENT_PROJECTS.map((client, i) => (
            <ClientCard
              key={client.id}
              client={client}
              delay={i * 150}
              onOpenGallery={handleOpenGallery}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Preview Modal with Full Gallery Navigation */}
      {modalGallery &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex flex-col justify-between bg-black/92 backdrop-blur-lg p-3 sm:p-6 overflow-hidden select-none animate-fadeIn"
            onClick={(e) => {
              if (e.target === e.currentTarget) setModalGallery(null);
            }}
            style={{ cursor: 'auto' }}
          >
            {/* Modal Header */}
            <div className="max-w-6xl w-full mx-auto flex items-center justify-between gap-4 pb-3 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="text-xs font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex-shrink-0"
                  style={{
                    background: `${modalGallery.accent}20`,
                    color: modalGallery.accent,
                    border: `1px solid ${modalGallery.accent}40`,
                  }}
                >
                  {modalGallery.clientName}
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-white truncate">
                    {modalGallery.screenshots[modalGallery.currentIndex]?.title}
                  </h3>
                  <span className="text-xs text-gray-400 font-mono hidden sm:inline">
                    Screenshot {modalGallery.currentIndex + 1} of {modalGallery.screenshots.length}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                {/* Live Website Link */}
                <a
                  href={modalGallery.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all text-gray-300 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10"
                  title={`Visit ${modalGallery.clientName} live`}
                >
                  <span className="hidden md:inline">Visit Site</span>
                  <i className="fas fa-external-link-alt text-[10px]" />
                </a>

                {/* Open Original Full-Res Image */}
                <a
                  href={modalGallery.screenshots[modalGallery.currentIndex]?.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30"
                  title="Open original high-resolution screenshot in new tab"
                >
                  <i className="fas fa-expand text-[11px]" />
                  <span className="hidden sm:inline">Original Res</span>
                </a>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setModalGallery(null)}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-red-500/20 text-gray-300 hover:text-red-400 border border-white/10 hover:border-red-500/40 flex items-center justify-center transition-all cursor-pointer"
                  title="Close (Esc)"
                >
                  <i className="fas fa-times text-sm" />
                </button>
              </div>
            </div>

            {/* Modal Body / Image Viewer with Prev & Next Arrows */}
            <div className="relative flex-1 flex items-center justify-center py-2 sm:py-4 min-h-0 w-full max-w-6xl mx-auto">
              {/* Previous Button */}
              {modalGallery.screenshots.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-2 sm:left-4 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/75 hover:bg-black/95 text-white flex items-center justify-center border border-white/20 hover:border-cyan-400 transition-all duration-200 hover:scale-110 shadow-2xl cursor-pointer"
                  style={{
                    boxShadow: '0 0 25px rgba(0,0,0,0.8)',
                  }}
                  title="Previous image (← Left arrow)"
                >
                  <i className="fas fa-chevron-left text-base sm:text-lg" />
                </button>
              )}

              {/* Central Main Image */}
              <div
                className="relative max-h-full max-w-full flex flex-col items-center justify-center px-10 sm:px-16"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="relative rounded-xl overflow-hidden border bg-black/80 flex items-center justify-center"
                  style={{
                    borderColor: `${modalGallery.accent}40`,
                    boxShadow: `0 0 40px ${modalGallery.accent}20, 0 20px 60px rgba(0,0,0,0.8)`,
                  }}
                >
                  <img
                    key={modalGallery.screenshots[modalGallery.currentIndex]?.src}
                    src={modalGallery.screenshots[modalGallery.currentIndex]?.src}
                    alt={modalGallery.screenshots[modalGallery.currentIndex]?.title}
                    className="max-h-[58vh] sm:max-h-[66vh] md:max-h-[70vh] w-auto max-w-full object-contain rounded-xl select-none animate-fadeIn cursor-pointer"
                    onClick={modalGallery.screenshots.length > 1 ? nextImage : undefined}
                    title={modalGallery.screenshots.length > 1 ? "Click image to see next" : ""}
                  />
                </div>

                {/* Caption / Description below image */}
                <p className="mt-2.5 text-center text-xs sm:text-sm text-gray-300 font-sans max-w-2xl px-4 leading-relaxed">
                  {modalGallery.screenshots[modalGallery.currentIndex]?.description}
                </p>
              </div>

              {/* Next Button */}
              {modalGallery.screenshots.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-2 sm:right-4 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/75 hover:bg-black/95 text-white flex items-center justify-center border border-white/20 hover:border-cyan-400 transition-all duration-200 hover:scale-110 shadow-2xl cursor-pointer"
                  style={{
                    boxShadow: '0 0 25px rgba(0,0,0,0.8)',
                  }}
                  title="Next image (→ Right arrow)"
                >
                  <i className="fas fa-chevron-right text-base sm:text-lg" />
                </button>
              )}
            </div>

            {/* Modal Bottom: Thumbnails Strip & Keyboard Shortcuts Guide */}
            <div
              className="max-w-4xl w-full mx-auto pt-2 border-t border-white/10 flex flex-col items-center gap-2 flex-shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Thumbnails row */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap max-w-full overflow-x-auto py-1">
                {modalGallery.screenshots.map((s, idx) => {
                  const isCur = idx === modalGallery.currentIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() =>
                        setModalGallery((prev) =>
                          prev ? { ...prev, currentIndex: idx } : null
                        )
                      }
                      className="group/thumb flex items-center gap-2 px-2.5 py-1.5 rounded-lg border transition-all text-left cursor-pointer"
                      style={{
                        borderColor: isCur ? modalGallery.accent : 'rgba(255,255,255,0.15)',
                        background: isCur ? `${modalGallery.accent}25` : 'rgba(255,255,255,0.03)',
                        boxShadow: isCur ? `0 0 15px ${modalGallery.accent}35` : 'none',
                      }}
                      title={`Switch to ${s.title}`}
                    >
                      <div className="w-10 h-7 rounded overflow-hidden bg-black/50 flex-shrink-0">
                        <img
                          src={s.src}
                          alt={s.title}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="hidden sm:block">
                        <span
                          className="text-[11px] font-mono block leading-tight font-medium"
                          style={{
                            color: isCur ? modalGallery.accent : '#aaa',
                          }}
                        >
                          {s.title}
                        </span>
                        <span className="text-[9px] text-gray-500 font-mono">
                          Image {idx + 1}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Instructions / Keyboard Hints */}
              <div className="flex items-center justify-center gap-4 text-[11px] text-gray-400 font-mono">
                <span className="hidden sm:inline">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white text-[10px]">←</kbd>{' '}
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white text-[10px]">→</kbd> to navigate
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white text-[10px]">ESC</kbd> to close
                </span>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
