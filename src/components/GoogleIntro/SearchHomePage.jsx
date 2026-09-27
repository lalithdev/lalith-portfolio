import React from 'react';
import lensImagePng from '../../assets/images/GoogleIntro/lensimage-removedbg.png';
import { motion, AnimatePresence } from 'framer-motion';
import { homePageVariants } from './animations';
import { INTRO_STAGES, AUTOCOMPLETE_SUGGESTIONS, DEVELOPER_HISTORY_SUGGESTIONS, getDynamicSuggestions } from './constants';

/**
 * Official Google 2015 Vector Wordmark (Product Sans geometry).
 * Single unified path with crisp rendering in pure white.
 */
const OfficialGoogleLogoWhite = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 180 59.5"
    style={{
      width: 'clamp(210px, 22vw, 272px)',
      height: 'auto',
      display: 'block',
    }}
  >
    <path
      fill="#ffffff"
      d="M23.4 46.9c-12.5 0-23-10.2-23-22.7s10.5-22.7 23-22.7c6.9 0 11.9 2.7 15.6 6.3l-4.4 4.4c-2.7-2.5-6.3-4.4-11.2-4.4C14.2 7.7 7.1 15 7.1 24.2c0 9.1 7.1 16.5 16.3 16.5 5.9 0 9.3-2.4 11.5-4.5 1.8-1.8 2.9-4.3 3.4-7.8H23.5v-6.2h20.7c.2 1.1.3 2.4.3 3.9 0 4.7-1.3 10.4-5.4 14.5-3.9 4.1-9 6.3-15.7 6.3zm52.7-14.6c0 8.4-6.6 14.6-14.7 14.6s-14.7-6.2-14.7-14.6c0-8.5 6.6-14.6 14.7-14.6 8.1-.1 14.7 6.1 14.7 14.6zm-6.4 0c0-5.3-3.8-8.9-8.3-8.9-4.4 0-8.3 3.6-8.3 8.9 0 5.2 3.8 8.9 8.3 8.9 4.5-.1 8.3-3.7 8.3-8.9zm38.3 0c0 8.4-6.6 14.6-14.7 14.6s-14.7-6.2-14.7-14.6c0-8.5 6.6-14.6 14.7-14.6 8.1-.1 14.7 6.1 14.7 14.6zm-6.5 0c0-5.3-3.8-8.9-8.3-8.9-4.4 0-8.3 3.6-8.3 8.9 0 5.2 3.8 8.9 8.3 8.9 4.5-.1 8.3-3.7 8.3-8.9zm37-13.8v26.3c0 10.8-6.4 15.2-13.9 15.2-7.1 0-11.4-4.8-13-8.6l5.6-2.3c1 2.4 3.4 5.2 7.4 5.2 4.8 0 7.8-3 7.8-8.6v-2.1h-.2c-1.4 1.8-4.2 3.3-7.7 3.3-7.3 0-14-6.4-14-14.6 0-8.3 6.7-14.7 14-14.7 3.5 0 6.3 1.6 7.7 3.3h.2v-2.4h6.1zm-5.7 13.8c0-5.2-3.4-8.9-7.8-8.9s-8.1 3.8-8.1 8.9c0 5.1 3.7 8.8 8.1 8.8 4.4 0 7.8-3.7 7.8-8.8zm16-29.2V46h-6.2V3.1h6.2zm24.9 34l5 3.3c-1.6 2.4-5.5 6.5-12.2 6.5-8.3 0-14.5-6.4-14.5-14.6 0-8.7 6.3-14.6 13.8-14.6 7.6 0 11.3 6 12.5 9.3l.7 1.7-19.6 8.1c1.5 2.9 3.8 4.4 7.1 4.4s5.5-1.7 7.2-4.1zm-15.3-5.3l13.1-5.4c-.7-1.8-2.9-3.1-5.4-3.1-3.4 0-7.9 2.9-7.7 8.5z"
    />
  </svg>
);

const WaffleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="#e8eaed">
    <circle cx="5" cy="5" r="2" />
    <circle cx="12" cy="5" r="2" />
    <circle cx="19" cy="5" r="2" />
    <circle cx="5" cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="19" cy="12" r="2" />
    <circle cx="5" cy="19" r="2" />
    <circle cx="12" cy="19" r="2" />
    <circle cx="19" cy="19" r="2" />
  </svg>
);

const SearchIconSVG = () => (
  <svg viewBox="0 0 24 24" className="w-[19px] h-[19px] flex-shrink-0 fill-[#5f6368]">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

const HistoryClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="#5f6368" className="w-[18px] h-[18px] flex-shrink-0">
    <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6a7 7 0 1 1 7 7 7.07 7.07 0 0 1-6-3.44l-1.45 1.45A8.93 8.93 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
  </svg>
);

/**
 * 4-Color Official Google Microphone
 */
const GoogleMicColored = () => (
  <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] flex-shrink-0 cursor-pointer">
    <path fill="#4285f4" d="M12 15c1.66 0 3-1.31 3-2.97V5.03C15 3.37 13.66 2 12 2S9 3.37 9 5.03v6.97c0 1.66 1.34 2.97 3 2.97z" />
    <path fill="#34a853" d="M11 18.08h2V22h-2z" />
    <path fill="#fbbc05" d="M7.05 16.87c-1.27-1.33-2.05-2.81-2.05-4.67h2c0 1.45.57 2.42 1.47 3.38v.32l-1.15 1.18-.27-.21z" />
    <path fill="#ea4335" d="M12 16.93a4.97 5.25 0 0 1-3.54-1.55l-1.41 1.49C8.31 18.21 10.07 19 12 19c3.87 0 6.99-2.92 6.99-7h-2c0 2.92-2.23 4.93-4.99 4.93z" />
  </svg>
);

/** Google Lens icon — exact asset, scaled to native Google UI size */
const GoogleLensColored = () => (
  <img
    src={lensImagePng}
    alt="Google Lens"
    draggable={false}
    className="flex-shrink-0 cursor-pointer select-none"
    style={{ width: 22, height: 22, objectFit: 'contain' }}
  />
);

/**
 * Magnifying glass + sparkle icon for AI Mode
 */
const AIModeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[17px] h-[17px] flex-shrink-0" fill="none">
    <circle cx="10" cy="11.5" r="5.5" stroke="#1f1f1f" strokeWidth="1.9" strokeLinecap="round" />
    <path d="M14.5 16L18.5 20" stroke="#1f1f1f" strokeWidth="2.2" strokeLinecap="round" />
    <path
      d="M17 2.5C17 4.5 18.7 6.2 20.7 6.2C18.7 6.2 17 7.9 17 9.9C17 7.9 15.3 6.2 13.3 6.2C15.3 6.2 17 4.5 17 2.5Z"
      fill="#1f1f1f"
    />
  </svg>
);

const ChromeWebStoreIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path fill="#4285F4" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

const SearchHomePage = ({ stage, typedText }) => {
  // Suggestions open when reaching SUGGESTIONS stage and remain visible while typing
  const showSuggestions = stage >= INTRO_STAGES.SUGGESTIONS && stage < INTRO_STAGES.SUBMITTING;

  return (
    <AnimatePresence>
      {stage < INTRO_STAGES.RESULTS && (
        <motion.div
          key="homepage"
          variants={homePageVariants}
          initial="visible"
          exit="exit"
          className="absolute inset-0 flex flex-col justify-between select-none"
          style={{
            background: '#35363a',
            fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
          }}
        >
          {/* ── Top-right Chrome nav ── */}
          <header className="flex items-center justify-end gap-5 px-6 py-4 flex-shrink-0 text-white/90 text-[13px]">
            <a className="cursor-pointer hover:underline">Gmail</a>
            <a className="cursor-pointer hover:underline">Images</a>
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <WaffleIcon />
            </button>
          </header>

          {/* ── Center: Google Wordmark + Unified White Search Box ── */}
          <main className="flex flex-col items-center flex-1" style={{ paddingTop: '14vh' }}>
            {/* Exact Google Typography Logo */}
            <div className="mb-7">
              <OfficialGoogleLogoWhite />
            </div>

            {/* Unified Search Box + Suggestions Overlay */}
            <div className="w-full px-4 relative z-30 h-[56px]" style={{ maxWidth: 680 }}>
              <div
                className="w-full bg-white text-gray-900 overflow-hidden absolute top-0 left-0 right-0 transition-all duration-200"
                style={{
                  borderRadius: showSuggestions ? '24px' : '28px',
                  boxShadow: showSuggestions
                    ? '0 8px 28px rgba(0,0,0,0.38), 0 2px 8px rgba(0,0,0,0.15)'
                    : '0 2px 10px rgba(0,0,0,0.15)',
                }}
              >
                {/* Search Bar Input Row */}
                <div className="h-[54px] md:h-[56px] px-5 md:px-6 flex items-center justify-between">
                  {/* Left side: Plus Icon & Placeholder / Typed Text */}
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <span className="text-[22px] text-[#202124] font-light flex-shrink-0 cursor-default select-none leading-none">
                      +
                    </span>
                    
                    <span className="text-[16px] text-[#70757a] font-normal truncate">
                      {typedText ? (
                        <span className="text-gray-900 font-normal">
                          {typedText}
                          {stage >= INTRO_STAGES.FOCUS && stage < INTRO_STAGES.SUBMITTING && (
                            <span
                              className="inline-block w-[2px] h-[20px] bg-[#1a73e8] ml-0.5 align-middle"
                              style={{ animation: 'blink-cursor 0.9s step-start infinite' }}
                            />
                          )}
                        </span>
                      ) : (
                        <>
                          {stage === INTRO_STAGES.HOME ? (
                            'Ask Google'
                          ) : (
                            <span
                              className="inline-block w-[2px] h-[20px] bg-[#1a73e8] align-middle"
                              style={{ animation: 'blink-cursor 0.9s step-start infinite' }}
                            />
                          )}
                        </>
                      )}
                    </span>
                  </div>

                  {/* Right side controls: Colored Mic, Colored Lens, Rainbow AI Mode */}
                  <div className="flex items-center gap-3.5 flex-shrink-0 ml-3">
                    <GoogleMicColored />
                    <GoogleLensColored />

                    {/* AI Mode pill button with Google Rainbow Border & Glow */}
                    <div
                      className="relative rounded-full p-[1.5px] cursor-pointer transition-transform hover:scale-[1.03] active:scale-[0.98]"
                      style={{
                        background:
                          'linear-gradient(135deg, #4285F4 0%, #4285F4 25%, #EA4335 55%, #FBBC05 78%, #34A853 100%)',
                        boxShadow:
                          '0 2px 8px rgba(66, 133, 244, 0.3), 0 1px 4px rgba(234, 67, 53, 0.2)',
                      }}
                    >
                      <div className="flex items-center gap-1.5 bg-[#f8fafd] hover:bg-white rounded-full px-3 py-1 transition-colors">
                        <AIModeIcon />
                        <span className="text-[13px] font-medium text-[#1f1f1f] tracking-tight">
                          AI Mode
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dropdown List: Developer history on click, discovery suggestions when typing */}
                <AnimatePresence>
                  {showSuggestions && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      {/* Google subtle horizontal divider line */}
                      <div className="h-[1px] bg-[#dfe1e5] mx-5 mb-2" />

                      <div className="pt-0.5 pb-2 px-1">
                        {/* Developer's search history shown before typing begins */}
                        {!typedText ? (
                          DEVELOPER_HISTORY_SUGGESTIONS.map((item) => (
                            <div
                              key={item.id}
                              className="mx-2 my-0.5 px-4 py-2.5 rounded-[8px] hover:bg-[#f1f3f4] flex items-center justify-between cursor-pointer transition-colors group"
                            >
                              <div className="flex items-center gap-3.5 min-w-0">
                                <HistoryClockIcon />
                                <span className="text-[14px] text-[#202124] leading-tight font-normal truncate">
                                  {item.text}
                                </span>
                              </div>
                              <span className="text-[12px] text-[#70757a] hover:text-[#1a73e8] hover:underline font-medium px-1 cursor-pointer">
                                Delete
                              </span>
                            </div>
                          ))
                        ) : (
                          /* Exactly 6 dynamic suggestions evolving with every keystroke */
                          getDynamicSuggestions(typedText).map((item) => {
                            // First item: active highlighted pill
                            if (item.type === 'search_active') {
                              const displayQuery = typedText || item.query;
                              return (
                                <div
                                  key={item.id}
                                  className="mx-2 my-0.5 px-4 py-2.5 rounded-[8px] bg-[#f1f3f4] flex items-center gap-3.5 cursor-pointer"
                                >
                                  <SearchIconSVG />
                                  <span className="text-[14px] text-gray-900 leading-tight truncate">
                                    <strong className="font-semibold text-black">{displayQuery}</strong>
                                    <span className="text-gray-600 font-normal">{item.suffix}</span>
                                  </span>
                                </div>
                              );
                            }

                            // Second item: history clock icon
                            if (item.type === 'history') {
                              return (
                                <div
                                  key={item.id}
                                  className="mx-2 my-0.5 px-4 py-2.5 rounded-[8px] hover:bg-[#f1f3f4] flex items-center justify-between cursor-pointer transition-colors group"
                                >
                                  <div className="flex items-center gap-3.5 min-w-0">
                                    <HistoryClockIcon />
                                    <span className="text-[14px] text-[#202124] leading-tight font-normal truncate">
                                      {item.text}
                                    </span>
                                  </div>
                                  <span className="text-[12px] text-[#70757a] hover:text-[#1a73e8] hover:underline font-medium px-1 cursor-pointer">
                                    Delete
                                  </span>
                                </div>
                              );
                            }

                            // Remaining dynamic search items (3-6)
                            return (
                              <div
                                key={item.id}
                                className="mx-2 my-0.5 px-4 py-2.5 rounded-[8px] hover:bg-[#f1f3f4] flex items-center gap-3.5 cursor-pointer transition-colors"
                              >
                                <SearchIconSVG />
                                <span className="text-[14px] text-[#202124] leading-tight font-normal truncate">
                                  {item.text}
                                </span>
                              </div>
                            );
                          })
                        )}
                      </div>

                      {/* Google Search buttons at bottom of suggestions dropdown */}
                      <div className="flex items-center justify-center gap-3 pt-2.5 pb-3 border-t border-[#f1f3f4]">
                        <button
                          type="button"
                          className="px-4 py-2 text-[13.5px] font-normal text-[#3c4043] bg-[#f8f9fa] hover:bg-[#f1f3f4] hover:border-[#dadce0] rounded-[4px] border border-[#f8f9fa] shadow-sm transition-all cursor-default"
                        >
                          Google Search
                        </button>
                        <button
                          type="button"
                          className="px-4 py-2 text-[13.5px] font-normal text-[#3c4043] bg-[#f8f9fa] hover:bg-[#f1f3f4] hover:border-[#dadce0] rounded-[4px] border border-[#f8f9fa] shadow-sm transition-all cursor-default"
                        >
                          I'm Feeling Lucky
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Shortcuts below search bar (Web Store & Add shortcut) */}
            <div
              className={`flex items-center gap-8 mt-8 transition-opacity duration-300 ${
                showSuggestions ? 'opacity-20 pointer-events-none' : 'opacity-100'
              }`}
            >
              <div className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-[#202124] flex items-center justify-center text-xl shadow-md border border-white/10 group-hover:bg-white/15 transition-colors">
                  <ChromeWebStoreIcon />
                </div>
                <span className="text-[12px] text-white/80 font-normal">Web Store</span>
              </div>

              <div className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-[#202124] flex items-center justify-center text-xl text-white shadow-md border border-white/10 group-hover:bg-white/15 transition-colors font-light">
                  +
                </div>
                <span className="text-[12px] text-white/80 font-normal">Add shortcut</span>
              </div>
            </div>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchHomePage;
