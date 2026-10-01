import Background  from './components/Background';
import Navigation  from './components/Navigation';
import Hero        from './components/Hero';
import About       from './components/About';
import Skills      from './components/Skills';
import Stats       from './components/Stats';
import Projects    from './components/Projects';
import ClientHandling from './components/ClientHandling';
import Contact     from './components/Contact';
import Footer      from './components/Footer';

export default function App() {
  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', position: 'relative',overflowX: 'hidden', width: '100%' }}>
      <Background />
      <Navigation />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Skills />
        <Stats />
        <Projects />
        <ClientHandling />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
