import { useState, FormEvent } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import emailjs from '@emailjs/browser';
interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const CONTACT_INFO = [
  {
    icon: 'fas fa-envelope',
    label: 'Email',
    value: 'mdsanjidi36@gmail.com',
    href: 'mailto:mdsanjidi36@gmail.com',
  },
  {
    icon: 'fas fa-phone',
    label: 'Phone',
    value: '+8801745532902',
    href: 'tel:+8801745532902',
  },
  {
    icon: 'fab fa-github',
    label: 'GitHub',
    value: 'github.com/engsanjid',
    href: 'https://github.com/engsanjid',
  },
  {
    icon: 'fab fa-linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/md-sanjid-islam/',
    href: 'https://www.linkedin.com/in/md-sanjid-islam/',
  },
  {
    icon: 'fas fa-map-marker-alt',
    label: 'Location',
    value: 'Dhaka, Bangladesh',
    href: '#',
  },
];

export default function Contact() {
  const headingRef = useScrollReveal<HTMLDivElement>();
  const leftRef    = useScrollReveal<HTMLDivElement>();
  const rightRef   = useScrollReveal<HTMLDivElement>();

  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

 

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  if (!form.name || !form.email || !form.message) {
    setError('Please fill in all required fields.');
    return;
  }
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRx.test(form.email)) {
    setError('Please enter a valid email address.');
    return;
  }

  setSending(true);
  try {
    await emailjs.send(
      'service_kaswqho',   // ← আপনার Service ID
      'template_a2xrz2l',  // ← আপনার Template ID
      {
        from_name:  form.name,
        from_email: form.email,
        from_initial: form.name.charAt(0).toUpperCase(),
        year: new Date().getFullYear().toString(),
        subject:    form.subject || 'No Subject',
        message:    form.message,
      },
      'og_bwRgqBjO_RvGtJ'  // ← আপনার Public Key
    );
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  } catch (err) {
    setError('Failed to send message. Please try again.');
  } finally {
    setSending(false);
  }
};
  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(176,0,255,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div ref={headingRef} className="reveal text-center mb-16">
          <span className="section-tag">05 — Get in Touch</span>
          <h2 className="section-title mt-2">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <div className="neon-divider max-w-xs mx-auto mt-4" />
          <p className="mt-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
            Have a project in mind? Let's build something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <div ref={leftRef} className="reveal-left lg:col-span-2 space-y-5">
            <div className="glass-card p-6">
              <h3
                className="text-base font-bold mb-4"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
              >
                Contact Info
              </h3>
              <div className="space-y-4">
                {CONTACT_INFO.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-sm flex-shrink-0 transition-all duration-200"
                      style={{
                        background: 'rgba(0,245,255,0.08)',
                        border: '1px solid rgba(0,245,255,0.15)',
                        color: 'var(--cyan)',
                      }}
                    >
                      <i className={item.icon} />
                    </div>
                    <div>
                      <p
                        className="text-xs mb-0.5 tracking-wider uppercase"
                        style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}
                      >
                        {item.label}
                      </p>
                      <p
                        className="text-sm font-medium transition-colors duration-200"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div
              className="p-5 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(0,245,255,0.06), rgba(176,0,255,0.06))',
                border: '1px solid rgba(0,245,255,0.15)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="status-dot" />
                <span
                  className="text-xs font-semibold tracking-wider uppercase"
                  style={{ color: '#00ff88', fontFamily: 'var(--font-mono)' }}
                >
                  Currently Available
                </span>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Seeking Frontend Developer role. Open for collaborative opportunities. Response within 24 hours.
              </p>
            </div>
          </div>

          <div ref={rightRef} className="reveal-right lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-card p-7 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-xs mb-2 tracking-wider uppercase"
                    style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}
                  >
                    Name <span style={{ color: 'var(--cyan)' }}>*</span>
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-xs mb-2 tracking-wider uppercase"
                    style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}
                  >
                    Email <span style={{ color: 'var(--cyan)' }}>*</span>
                  </label>
                  <input
                    className="form-input"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-xs mb-2 tracking-wider uppercase"
                  style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}
                >
                  Subject
                </label>
                <input
                  className="form-input"
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                />
              </div>

              <div>
                <label
                  className="block text-xs mb-2 tracking-wider uppercase"
                  style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}
                >
                  Message <span style={{ color: 'var(--cyan)' }}>*</span>
                </label>
                <textarea
                  className="form-input resize-none"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                />
              </div>

              {error && (
                <p
                  className="text-sm"
                  style={{ color: '#ff5f57', fontFamily: 'var(--font-mono)' }}
                >
                  <i className="fas fa-exclamation-circle mr-2" />
                  {error}
                </p>
              )}

              {sent && (
                <p
                  className="text-sm"
                  style={{ color: '#00ff88', fontFamily: 'var(--font-mono)' }}
                >
                  <i className="fas fa-check-circle mr-2" />
                  Message sent! I'll get back to you soon.
                </p>
              )}

              <button
                type="submit"
                className="btn-primary w-full justify-center"
                disabled={sending}
              >
                {sending ? (
                  <>
                    <i className="fas fa-circle-notch fa-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
