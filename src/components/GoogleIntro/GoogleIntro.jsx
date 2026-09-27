/**
 * GoogleIntro.jsx — Orchestrator
 *
 * Implements the illusion:
 * 1. "Wait... is this a Google search page?"
 *    Looks 100% like real Google Dark Mode.
 * 2. "Oh shit, this is his portfolio."
 *    The search query types out, results appear with Lalith's portfolio as #1
 *    plus full Google Knowledge Graph, the cursor clicks the link, and
 *    smoothly zooms into the portfolio site.
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchHomePage from './SearchHomePage';
import SearchResults from './SearchResults';
import AnimatedCursor from './AnimatedCursor';
import { INTRO_STAGES, SEARCH_QUERY, humanTypingDelay } from './constants';
import { overlayZoomExit } from './animations';

const GoogleIntro = ({ onComplete }) => {
  const [stage, setStage] = useState(INTRO_STAGES.HOME);
  const [typedText, setTypedText] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showRipple, setShowRipple] = useState(false);
  const [cursorTarget, setCursorTarget] = useState({ x: '50vw', y: '55vh' });

  // Ref forwarded to result card #1 for getBoundingClientRect
  const firstResultRef = useRef(null);

  // ── Stage State Machine ──────────────────────────────────────────────────
  useEffect(() => {
    let t;

    switch (stage) {
      // 0: HOME — clean initial Google homepage
      case INTRO_STAGES.HOME:
        t = setTimeout(() => setStage(INTRO_STAGES.FOCUS), 700);
        break;

      // 1: FOCUS — search bar activates, cursor blinks
      case INTRO_STAGES.FOCUS:
        t = setTimeout(() => setStage(INTRO_STAGES.SUGGESTIONS), 480);
        break;

      // 2: SUGGESTIONS — developer search history drops down on click
      case INTRO_STAGES.SUGGESTIONS:
        t = setTimeout(() => setStage(INTRO_STAGES.TYPING), 1200);
        break;

      // 3: TYPING — human-paced keystrokes
      case INTRO_STAGES.TYPING: {
        if (typedText.length < SEARCH_QUERY.length) {
          const nextChar = SEARCH_QUERY[typedText.length];
          const delay = humanTypingDelay(nextChar, typedText.length);
          t = setTimeout(
            () => setTypedText(SEARCH_QUERY.slice(0, typedText.length + 1)),
            delay
          );
        } else {
          // Finished typing; pause to show suggestions, then submit
          t = setTimeout(() => setStage(INTRO_STAGES.SUBMITTING), 850);
        }
        break;
      }

      // 4: SUBMITTING — search executes, transition to results
      case INTRO_STAGES.SUBMITTING:
        t = setTimeout(() => {
          setShowResults(true);
          setStage(INTRO_STAGES.RESULTS);
        }, 360);
        break;

      // 5: RESULTS — search results rendered; calculate cursor position
      case INTRO_STAGES.RESULTS:
        t = setTimeout(() => {
          if (firstResultRef.current) {
            const rect = firstResultRef.current.getBoundingClientRect();
            // Aim precisely at the title of result #1
            setCursorTarget({
              x: rect.left + 80,
              y: rect.top + 14,
            });
          }
          setStage(INTRO_STAGES.CURSOR_ENTER);
        }, 600);
        break;

      // 6: CURSOR_ENTER — cursor appears
      case INTRO_STAGES.CURSOR_ENTER:
        t = setTimeout(() => setStage(INTRO_STAGES.CURSOR_MOVE), 150);
        break;

      // 7: CURSOR_MOVE — cursor glides towards Result #1 link
      case INTRO_STAGES.CURSOR_MOVE:
        t = setTimeout(() => setStage(INTRO_STAGES.RESULT_HOVER), 1250);
        break;

      // 8: RESULT_HOVER — hover state active (hand pointer + underline)
      case INTRO_STAGES.RESULT_HOVER:
        t = setTimeout(() => {
          setShowRipple(true);
          setStage(INTRO_STAGES.RESULT_CLICK);
        }, 550);
        break;

      // 9: RESULT_CLICK — click fired (ripple + visited purple flash)
      case INTRO_STAGES.RESULT_CLICK:
        t = setTimeout(() => {
          setShowRipple(false);
          setStage(INTRO_STAGES.ENTER_PORTFOLIO);
        }, 400);
        break;

      // 10: ENTER_PORTFOLIO — cinematic overlay zoom and blur into portfolio
      case INTRO_STAGES.ENTER_PORTFOLIO:
        t = setTimeout(() => setStage(INTRO_STAGES.COMPLETE), 860);
        break;

      // 11: COMPLETE — reveal portfolio
      case INTRO_STAGES.COMPLETE:
        t = setTimeout(() => onComplete(), 50);
        break;

      default:
        break;
    }

    return () => clearTimeout(t);
  }, [stage, typedText, onComplete]);

  // ── Recompute cursor target on window resize ─────────────────────────────
  useEffect(() => {
    if (stage < INTRO_STAGES.RESULTS) return;

    const handleResize = () => {
      if (firstResultRef.current) {
        const rect = firstResultRef.current.getBoundingClientRect();
        setCursorTarget({
          x: rect.left + 80,
          y: rect.top + 14,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [stage]);

  // ── Skip Handler ─────────────────────────────────────────────────────────
  const handleSkip = useCallback(() => {
    onComplete();
  }, [onComplete]);

  // ESC key to skip
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkip]);

  return (
    <>
      {/* Inject blink-cursor keyframes */}
      <style>{`
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>

      <AnimatePresence>
        {stage < INTRO_STAGES.COMPLETE && (
          <motion.div
            key="google-intro"
            variants={overlayZoomExit}
            initial="idle"
            animate={stage >= INTRO_STAGES.ENTER_PORTFOLIO ? 'exiting' : 'idle'}
            onClick={handleSkip}
            className="fixed inset-0 z-[100] overflow-hidden cursor-pointer select-none"
            style={{
              background: '#202124',
              fontFamily: "'Google Sans', Roboto, -apple-system, Arial, sans-serif",
              color: '#e8eaed',
              willChange: 'transform, opacity, filter',
            }}
          >
            {/* ── Real Google Homepage ── */}
            <SearchHomePage stage={stage} typedText={typedText} />

            {/* ── Real Google Results Page ── */}
            <SearchResults
              stage={stage}
              visible={showResults}
              onResultRef={firstResultRef}
            />

            {/* ── Animated Cursor ── */}
            <AnimatedCursor
              stage={stage}
              targetX={cursorTarget.x}
              targetY={cursorTarget.y}
              showRipple={showRipple}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GoogleIntro;
