import React from 'react';
import { motion } from 'framer-motion';
import { INTRO_STAGES } from './constants';
import arrowCursorPng from '../../assets/images/GoogleIntro/arrowcursor-removedbg.png';
import pointerCursorPng from '../../assets/images/GoogleIntro/pointercursor-removedbg.png';

/**
 * AnimatedCursor
 *
 * Props:
 *   stage          — current animation stage (number)
 *   targetX, targetY — pixel coordinates computed via getBoundingClientRect
 *   showRipple     — boolean: trigger the click ripple burst
 */
const AnimatedCursor = ({ stage, targetX, targetY, showRipple }) => {
  const isVisible = stage >= INTRO_STAGES.CURSOR_ENTER && stage < INTRO_STAGES.ENTER_PORTFOLIO;
  const isHovering = stage >= INTRO_STAGES.RESULT_HOVER;
  const isClicking = stage >= INTRO_STAGES.RESULT_CLICK;

  // Compute cursor animation target based on stage
  const cursorAnimate = (() => {
    if (stage < INTRO_STAGES.CURSOR_ENTER || stage >= INTRO_STAGES.ENTER_PORTFOLIO) {
      return { opacity: 0, x: '50vw', y: '60vh' };
    }
    if (stage === INTRO_STAGES.CURSOR_ENTER) {
      return { opacity: 1, x: '50vw', y: '60vh' };
    }
    // Stages CURSOR_MOVE onwards → glide to target link
    return {
      opacity: 1,
      x: targetX ?? '50vw',
      y: targetY ?? '60vh',
      scale: isClicking ? 0.88 : 1,
    };
  })();

  const cursorTransition = (() => {
    if (stage === INTRO_STAGES.CURSOR_ENTER) return { duration: 0.25 };
    if (stage === INTRO_STAGES.CURSOR_MOVE) return { duration: 1.9, ease: [0.25, 0.1, 0.25, 1] };
    return { duration: 0.15 };
  })();

  if (!isVisible && stage < INTRO_STAGES.CURSOR_ENTER) return null;

  return (
    <motion.div
      animate={cursorAnimate}
      transition={cursorTransition}
      className="fixed top-0 left-0 pointer-events-none z-[130]"
      style={{ translateX: '-2px', translateY: '-2px' }}
    >
      {/* Pointer (hand) cursor when hovering / clicking */}
      {isHovering ? (
        <img
          src={pointerCursorPng}
          alt=""
          draggable={false}
          style={{
            width: 32,
            height: 32,
            objectFit: 'contain',
            objectPosition: 'top left',
            display: 'block',
            userSelect: 'none',
            filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.7))',
          }}
        />
      ) : (
        /* Arrow cursor (default) */
        <img
          src={arrowCursorPng}
          alt=""
          draggable={false}
          style={{
            width: 20,
            height: 20,
            objectFit: 'contain',
            objectPosition: 'top left',
            display: 'block',
            userSelect: 'none',
            filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.7))',
          }}
        />
      )}

      {/* Click ripple burst */}
      {showRipple && (
        <motion.div
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: [0, 2.2, 3.2], opacity: [0.8, 0.4, 0] }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="absolute -top-3 -left-3 w-6 h-6 rounded-full pointer-events-none"
          style={{ background: 'rgba(138, 180, 248, 0.55)' }}
        />
      )}
    </motion.div>
  );
};

export default AnimatedCursor;
