import { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Education from './components/sections/Education';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import CustomCursor from './components/layout/CustomCursor';
import GoogleIntro from './components/GoogleIntro/GoogleIntro';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    // tiny delay so Hero starts its animation while overlay fades
    setTimeout(() => setShowIntro(false), 50);
  };

  // Prevent scrolling while intro is active
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showIntro]);

  return (
    <div className="relative min-h-screen text-[#f5f5f5]">
      {showIntro && <GoogleIntro onComplete={handleIntroComplete} />}

      {!showIntro && <Navbar />}
      {!showIntro && <CustomCursor />}

      <main>

        {/*
          ── SCENE WORLD ──────────────────────────────────────────
          Hero and About share ONE continuous cinematic environment.
          This wrapper provides the global atmospheric background
          that spans both sections — no hard background reset.
          ─────────────────────────────────────────────────────────
        */}
        <div
          className="scene-world relative"
          style={{
            background: 'linear-gradient(180deg, #020202 0%, #020408 50%, #030510 100%)',
          }}
        >
          {/* Global scene atmosphere — enormous, heavily blurred environmental lights */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{ zIndex: 0 }}
          >
            {/* Top-right: massive indigo key light — bleeds from Hero into About */}
            <div
              style={{
                position: 'absolute',
                top: '5%',
                right: '-15%',
                width: '90vw',
                height: '130vh',
                borderRadius: '50%',
                background:
                  'radial-gradient(ellipse, rgba(30,41,120,0.26) 0%, rgba(15,20,70,0.12) 45%, transparent 70%)',
                filter: 'blur(180px)',
              }}
            />
            {/* Bottom-left: deep midnight fill light */}
            <div
              style={{
                position: 'absolute',
                top: '40%',
                left: '-20%',
                width: '80vw',
                height: '120vh',
                borderRadius: '50%',
                background:
                  'radial-gradient(ellipse, rgba(20,30,100,0.18) 0%, rgba(10,15,60,0.08) 50%, transparent 70%)',
                filter: 'blur(160px)',
              }}
            />
            {/* Centre: subtle blue scene diffusion */}
            <div
              style={{
                position: 'absolute',
                top: '55%',
                left: '30%',
                width: '60vw',
                height: '80vh',
                borderRadius: '50%',
                background:
                  'radial-gradient(ellipse, rgba(79,70,229,0.09) 0%, transparent 70%)',
                filter: 'blur(120px)',
              }}
            />
          </div>

          <Hero introComplete={introComplete} />
          <About />
        </div>

        <Education />
        <Skills />
        <Projects />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;