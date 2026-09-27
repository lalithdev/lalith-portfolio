import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroImg from '../../assets/images/Hero/lalithheroimgfinal.png';
import Magnetic from '../common/Magnetic';
import { personalData } from '../../data/personal';

const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export default function Hero({ introComplete = false }) {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // ── Scroll-driven cinematic dissolve ──
  const imgScale      = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const imgBlur       = useTransform(scrollYProgress, [0, 0.7, 1], [0, 7, 16]);
  const imgBrightness = useTransform(scrollYProgress, [0, 1], [1, 0.22]);

  // Combine blur + brightness into a single CSS filter string
  const imgFilter = useTransform(
    [imgBlur, imgBrightness],
    ([b, br]) => `blur(${b}px) brightness(${br})`
  );

  const contentY       = useTransform(scrollYProgress, [0, 1], [0, -55]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  // Cinematic fog rises from below as hero dissolves
  const fogOpacity = useTransform(scrollYProgress, [0.12, 0.75], [0, 1]);
  const fogY       = useTransform(scrollYProgress, [0, 1], [0, -110]);

  // Gate: animate entrance after Google intro completes
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    if (introComplete) {
      // slight delay so the google overlay fully fades before hero falls in
      const t = setTimeout(() => setEntered(true), 120);
      return () => clearTimeout(t);
    }
  }, [introComplete]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full flex flex-col items-center justify-center"
      style={{ backgroundColor: '#020408', overflow: 'hidden' }}
    >

      {/* ── CINEMATIC IMAGE — scroll-driven scale + blur + dim ── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: imgScale, filter: imgFilter }}
      >
        <img
          src={heroImg}
          alt="Cinematic Atmosphere"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* ── VIGNETTE ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ boxShadow: 'inset 0 0 280px rgba(0,0,0,0.92)' }}
      />

      {/* ── NOISE TEXTURE ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: noiseSvg,
          opacity: 0.06,
          mixBlendMode: 'overlay',
        }}
      />

      {/* ── BOTTOM FADE — dissolves into the About world ── */}
      <div
        className="absolute bottom-0 left-0 w-full z-[2] pointer-events-none"
        style={{
          height: '60%',
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(2,4,14,0.35) 35%, rgba(2,4,14,0.92) 75%, #020408 100%)',
        }}
      />

      {/* ── CINEMATIC FOG — blue haze rises from below on scroll ── */}
      <motion.div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          y: fogY,
          opacity: fogOpacity,
          background:
            'radial-gradient(ellipse 120% 80% at 50% 100%, rgba(30,41,83,0.65) 0%, rgba(10,15,50,0.38) 55%, transparent 100%)',
          filter: 'blur(48px)',
        }}
      />

      {/* ── EDITORIAL TYPOGRAPHY ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center justify-center text-center"
      >
        {/* Heading — falls in from above, line by line */}
        <motion.div
          initial={{ opacity: 0, y: -60 }}
          animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: -60 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        >
          <h1
            className="font-body text-white/85"
            style={{
              fontSize: 'clamp(1.8rem, 3.8vw, 4.2rem)',
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              textShadow: '0 4px 30px rgba(0,0,0,0.6)',
            }}
          >
            Hi, I'm{' '}
            <span className="text-[1.05em] text-white/88 italic tracking-[-0.02em] [font-family:'Playfair_Display',serif] [font-weight:500] [font-style:italic] [-webkit-font-smoothing:antialiased] [-moz-osx-font-smoothing:grayscale]">
              {personalData.shortName}.
            </span>
            <br />
            an{' '}
            <span className="text-[1.05em] text-white/88 italic tracking-[-0.02em] [font-family:'Playfair_Display',serif] [font-weight:500] [font-style:italic] [-webkit-font-smoothing:antialiased] [-moz-osx-font-smoothing:grayscale]">
              {personalData.role}
            </span>
            <br />
            based in {personalData.country}. Here you<br />
            can see some of my latest<br />
            engineering &amp; projects.
          </h1>
        </motion.div>
      </motion.div>

      {/* ── FOOTER METADATA — falls in from above with stagger after heading ── */}
      <motion.div
        style={{
          opacity: contentOpacity,
          textShadow: '0 2px 10px rgba(0,0,0,0.9)',
        }}
        className="absolute bottom-10 left-0 w-full px-8 lg:px-16 z-10"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
          {[{
            href: `mailto:${personalData.email}`,
            label: personalData.email,
            target: undefined,
          }, {
            href: personalData.github,
            label: personalData.github.replace('https://', ''),
            target: '_blank',
          }, {
            href: personalData.linkedin,
            label: personalData.linkedin.replace('https://', ''),
            target: '_blank',
          }].map(({ href, label, target }, i) => (
            <motion.div
              key={href}
              initial={{ opacity: 0, y: -40 }}
              animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.35 + i * 0.12,
              }}
            >
              <Magnetic>
                <a
                  href={href}
                  target={target}
                  rel={target ? 'noreferrer' : undefined}
                  className="font-body text-[10px] sm:text-xs text-white/70 hover:text-white tracking-widest transition-colors text-center inline-block p-2"
                >
                  {label}
                </a>
              </Magnetic>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </section>
  );
}