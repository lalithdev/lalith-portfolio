import React from 'react';
import lensImagePng from '../../assets/images/GoogleIntro/lensimage-removedbg.png';
import { motion, AnimatePresence } from 'framer-motion';
import { INTRO_STAGES } from './constants';
import {
  resultsPageVariants,
  headerBarVariants,
  resultCardVariants,
  resultClickVariants,
  otherResultsFadeVariants,
} from './animations';

/* ─── Authentic Google Icons ────────────────────────────────────────────── */

/** Google 2015 vector wordmark in pure solid white */
const GoogleLogoWhite = () => (
  <svg
    viewBox="0 0 180 59.5"
    className="w-[92px] h-[30px] flex-shrink-0 cursor-pointer"
    fill="#ffffff"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#ffffff"
      d="M23.4 46.9c-12.5 0-23-10.2-23-22.7s10.5-22.7 23-22.7c6.9 0 11.9 2.7 15.6 6.3l-4.4 4.4c-2.7-2.5-6.3-4.4-11.2-4.4C14.2 7.7 7.1 15 7.1 24.2c0 9.1 7.1 16.5 16.3 16.5 5.9 0 9.3-2.4 11.5-4.5 1.8-1.8 2.9-4.3 3.4-7.8H23.5v-6.2h20.7c.2 1.1.3 2.4.3 3.9 0 4.7-1.3 10.4-5.4 14.5-3.9 4.1-9 6.3-15.7 6.3zm52.7-14.6c0 8.4-6.6 14.6-14.7 14.6s-14.7-6.2-14.7-14.6c0-8.5 6.6-14.6 14.7-14.6 8.1-.1 14.7 6.1 14.7 14.6zm-6.4 0c0-5.3-3.8-8.9-8.3-8.9-4.4 0-8.3 3.6-8.3 8.9 0 5.2 3.8 8.9 8.3 8.9 4.5-.1 8.3-3.7 8.3-8.9zm38.3 0c0 8.4-6.6 14.6-14.7 14.6s-14.7-6.2-14.7-14.6c0-8.5 6.6-14.6 14.7-14.6 8.1-.1 14.7 6.1 14.7 14.6zm-6.5 0c0-5.3-3.8-8.9-8.3-8.9-4.4 0-8.3 3.6-8.3 8.9 0 5.2 3.8 8.9 8.3 8.9 4.5-.1 8.3-3.7 8.3-8.9zm37-13.8v26.3c0 10.8-6.4 15.2-13.9 15.2-7.1 0-11.4-4.8-13-8.6l5.6-2.3c1 2.4 3.4 5.2 7.4 5.2 4.8 0 7.8-3 7.8-8.6v-2.1h-.2c-1.4 1.8-4.2 3.3-7.7 3.3-7.3 0-14-6.4-14-14.6 0-8.3 6.7-14.7 14-14.7 3.5 0 6.3 1.6 7.7 3.3h.2v-2.4h6.1zm-5.7 13.8c0-5.2-3.4-8.9-7.8-8.9s-8.1 3.8-8.1 8.9c0 5.1 3.7 8.8 8.1 8.8 4.4 0 7.8-3.7 7.8-8.8zm16-29.2V46h-6.2V3.1h6.2zm24.9 34l5 3.3c-1.6 2.4-5.5 6.5-12.2 6.5-8.3 0-14.5-6.4-14.5-14.6 0-8.7 6.3-14.6 13.8-14.6 7.6 0 11.3 6 12.5 9.3l.7 1.7-19.6 8.1c1.5 2.9 3.8 4.4 7.1 4.4s5.5-1.7 7.2-4.1zm-15.3-5.3l13.1-5.4c-.7-1.8-2.9-3.1-5.4-3.1-3.4 0-7.9 2.9-7.7 8.5z"
    />
  </svg>
);

const SearchIconGray = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="#9aa0a6">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

const ClearIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-[18px] h-[18px] flex-shrink-0 text-[#9aa0a6] hover:text-[#e8eaed] cursor-pointer" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

const GoogleMicIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0 cursor-pointer">
    <path fill="#4285f4" d="M12 15c1.66 0 3-1.31 3-2.97V5.03C15 3.37 13.66 2 12 2S9 3.37 9 5.03v6.97c0 1.66 1.34 2.97 3 2.97z"/>
    <path fill="#34a853" d="M11 18.08h2V22h-2z"/>
    <path fill="#fbbc05" d="M7.05 16.87c-1.27-1.33-2.05-2.81-2.05-4.67h2c0 1.45.57 2.42 1.47 3.38v.32l-1.15 1.18-.27-.21z"/>
    <path fill="#ea4335" d="M12 16.93a4.97 5.25 0 0 1-3.54-1.55l-1.41 1.49C8.31 18.21 10.07 19 12 19c3.87 0 6.99-2.92 6.99-7h-2c0 2.92-2.23 4.93-4.99 4.93z"/>
  </svg>
);

/** Google Lens icon — exact asset, scaled to native Google UI size */
const GoogleLensIcon = () => (
  <img
    src={lensImagePng}
    alt="Google Lens"
    draggable={false}
    className="flex-shrink-0 cursor-pointer select-none"
    style={{ width: 22, height: 22, objectFit: 'contain' }}
  />
);

const WaffleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="#e8eaed">
    <circle cx="5" cy="5" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="19" cy="5" r="2"/>
    <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
    <circle cx="5" cy="19" r="2"/><circle cx="12" cy="19" r="2"/><circle cx="19" cy="19" r="2"/>
  </svg>
);

const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] flex-shrink-0" fill="#91b6fb">
    <path d="M12 2C12 7.52 7.52 12 2 12C7.52 12 12 16.48 12 22C12 16.48 16.48 12 22 12C16.48 12 12 7.52 12 2Z" />
  </svg>
);

const SpeakerIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[13px] h-[13px] flex-shrink-0" fill="#f4f5f8">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
  </svg>
);

const ChevronDownIcon = ({ expanded = false }) => (
  <svg
    viewBox="0 0 24 24"
    className={`w-[14px] h-[14px] text-[#6ea0e0] transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
    fill="currentColor"
  >
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
  </svg>
);

const DotsMenuIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#9aa0a6] hover:text-[#e8eaed] cursor-pointer flex-shrink-0" fill="currentColor">
    <circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/>
  </svg>
);

/** Authentic Portfolio favicon using Lalith's actual website brand mark */
const PortfolioFavicon = ({ size = 26, imgSize = 18 }) => (
  <div
    style={{ width: size, height: size }}
    className="rounded-full bg-[#1e1f20] border border-[#3c4043] flex items-center justify-center flex-shrink-0 overflow-hidden"
  >
    <img
      src="/codefaviconremovedbgmuchbigger.png"
      alt="Portfolio"
      style={{ width: imgSize, height: imgSize }}
      className="object-contain"
    />
  </div>
);

/** Official GitHub brand icon on dark circular badge */
const GitHubFavicon = ({ size = 26, iconSize = 16 }) => (
  <div
    style={{ width: size, height: size }}
    className="rounded-full bg-[#161b22] border border-[#30363d] flex items-center justify-center flex-shrink-0 overflow-hidden"
  >
    <svg viewBox="0 0 24 24" style={{ width: iconSize, height: iconSize }} fill="#ffffff">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  </div>
);

/** Authentic LinkedIn blue favicon matching the official brand and screenshot */
const LinkedInFavicon = ({ size = 26, iconSize = 14, rounded = 'rounded-full' }) => (
  <div
    style={{ width: size, height: size }}
    className={`${rounded} bg-[#0a66c2] flex items-center justify-center flex-shrink-0 overflow-hidden`}
  >
    <svg viewBox="0 0 24 24" style={{ width: iconSize, height: iconSize }} fill="#ffffff">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  </div>
);

/** LinkedIn favicon chip — reuses LinkedInFavicon at citation-chip scale with real square favicon shape */
const LinkedInChipIcon = () => (
  <LinkedInFavicon size={16} iconSize={10} rounded="rounded-full" />
);

/** Generic profile avatar silhouette on white rounded square (exact match to Google screenshot) */
const ProfileAvatar = ({ size = 58 }) => (
  <div
    style={{ width: size, height: size }}
    className="rounded-[10px] bg-[#ffffff] flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm"
  >
    <svg viewBox="0 0 24 24" className="w-[36px] h-[36px]" fill="#70757a">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
  </div>
);

/* ─── Main SearchResults Component ──────────────────────────────────────── */

const SearchResults = ({ stage, visible, onResultRef }) => {
  const tabs = [
    { label: 'AI Mode', active: false },
    { label: 'All', active: true },
    { label: 'Images', active: false },
    { label: 'Videos', active: false },
    { label: 'Shopping', active: false },
    { label: 'News', active: false },
    { label: 'Forums', active: false },
    { label: 'More ▾', active: false },
    { label: 'Tools ▾', active: false },
  ];

  const isHovering = stage >= INTRO_STAGES.RESULT_HOVER;
  const isClicked = stage >= INTRO_STAGES.RESULT_CLICK;
  const isZooming = stage >= INTRO_STAGES.ENTER_PORTFOLIO;

  const [isAiExpanded, setIsAiExpanded] = React.useState(false);
  const [isTelugu, setIsTelugu] = React.useState(false);
  const [isSpeaking, setIsSpeaking] = React.useState(false);

  const handleSpeak = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const text = isTelugu
      ? "సింగుపరపు లలిత్ ఆదిత్య కెఎల్ యూనివర్శిటీలో కంప్యూటర్ సైన్స్ అండ్ ఇంజనీరింగ్ చదువుతున్న అండర్‌గ్రాడ్యుయేట్ విద్యార్థి."
      : "Singuparapu Lalith Aditya is a Computer Science and Engineering undergraduate student studying at KL University. Profile Overview: Education, Computer Science and Engineering Undergraduate at KL University. Primary Interests, Software development, backend engineering, and building practical applications to solve real-world problems.";
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const titleColor = isClicked ? '#c58af9' : '#8ab4f8';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="results"
          variants={resultsPageVariants}
          initial="hidden"
          animate="visible"
          className="absolute inset-0 flex flex-col overflow-hidden select-none"
          style={{
            background: '#181c22',
            fontFamily: "'Google Sans Text', 'Google Sans', Roboto, -apple-system, Arial, sans-serif",
            color: '#e8eaed',
          }}
        >
          {/* ══════════════════════════════════════════════════════════════════
              1. GOOGLE HEADER
              ══════════════════════════════════════════════════════════════════ */}
          <motion.div
            variants={headerBarVariants}
            initial="hidden"
            animate="visible"
            className="flex-shrink-0 flex items-center px-4 lg:px-[40px] pt-4 pb-3"
            style={{ background: '#181c22' }}
          >
            {/* Left: Google Wordmark in Solid White (sized & positioned so search bar aligns at x = 235px) */}
            <div className="w-[195px] flex-shrink-0 cursor-pointer pt-0.5">
              <GoogleLogoWhite />
            </div>

            {/* Center: Search Bar Matching Prototype Scale & Proportions */}
            <div
              className="flex-1 flex items-center gap-3 px-4 rounded-full"
              style={{
                background: '#303134',
                boxShadow: '0 1px 6px rgba(32,33,36,.28)',
                maxWidth: 692,
                height: 46,
              }}
            >
              <SearchIconGray />
              <span className="flex-1 text-[16px] text-[#e8eaed] font-normal truncate">
                Singuparapu Lalith Aditya
              </span>

              {/* Right Search Field Controls: Clear, Divider, Mic, Lens, Search */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <ClearIcon />
                <div className="h-5 w-[1px] bg-[#5f6368]" />
                <GoogleMicIcon />
                <GoogleLensIcon />
                <SearchIconGray />
              </div>
            </div>

            {/* Top Right Controls: Gmail, Images, Apps grid (NO profile avatar) */}
            <div className="flex items-center gap-4 ml-auto flex-shrink-0 text-[13px] text-[#e8eaed]">
              <a className="cursor-pointer hover:underline hidden sm:inline-block">Gmail</a>
              <a className="cursor-pointer hover:underline hidden sm:inline-block">Images</a>
              <button
                type="button"
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#3c4043] transition-colors cursor-pointer"
                title="Google apps"
              >
                <WaffleIcon />
              </button>
            </div>
          </motion.div>

          {/* ══════════════════════════════════════════════════════════════════
              2. SEARCH NAVIGATION TABS (Aligned to x = 235px)
              ══════════════════════════════════════════════════════════════════ */}
          <div
            className="flex-shrink-0 flex items-center gap-4 md:gap-5 pl-4 md:pl-[180px] lg:pl-[235px] pr-4 text-[13px] overflow-x-auto no-scrollbar"
            style={{ borderBottom: '1px solid #3c4043' }}
          >
            {tabs.map((tab) => (
              <div
                key={tab.label}
                className="px-2.5 py-2.5 cursor-pointer whitespace-nowrap transition-colors"
                style={{
                  color: tab.active ? '#ffffff' : '#9aa0a6',
                  borderBottom: tab.active ? '3px solid #ffffff' : '3px solid transparent',
                  marginBottom: '-1px',
                  fontWeight: tab.active ? 500 : 400,
                }}
              >
                {tab.label}
              </div>
            ))}
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              3. SCROLLABLE CONTENT BODY (Aligned to x = 235px)
              ══════════════════════════════════════════════════════════════════ */}
          <div className="flex-1 overflow-y-auto pl-4 md:pl-[180px] lg:pl-[235px] pr-4 md:pr-10 pt-4 pb-16">
            {/* Did You Mean Spelling Suggestion */}
            <div
              className="text-[15px] leading-snug mb-[16px]"
              style={{ fontFamily: "'Google Sans Text', Roboto, sans-serif" }}
            >
              <span className="text-[#f8694f]">Did you mean: </span>
              <span className="italic font-bold text-[#7eb7fb] cursor-pointer hover:underline">
                Singupurapu{' '}
              </span>
              <span className="text-[#7eb7fb] cursor-pointer hover:underline font-normal">
                Lalith Aditya
              </span>
            </div>

            {/* ══════════════════════════════════════════════════════════════════
                4. AI MODE SECTION (Two Columns: Main AI Results + Right Web Cards)
                ══════════════════════════════════════════════════════════════════ */}
            <div className="w-full max-w-[1030px] mb-7">
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">
                
                {/* ── Left Column: AI Overview Content ── */}
                <div className="w-full lg:w-[652px] min-w-0 flex-shrink-0">
                  {/* Heading Row: ✦ AI Overview, Telugu pill, Speaker icon */}
                  <div className="flex items-center gap-[9px] mb-[14px]">
                    <SparkleIcon />
                    <span
                      className="text-[15px] font-medium text-[#f9f9f9] tracking-[-0.01em]"
                      style={{ fontFamily: "'Google Sans', sans-serif" }}
                    >
                      AI Overview
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsTelugu(!isTelugu)}
                      className="bg-[#29303f] hover:bg-[#343e52] text-[#afd1f1] text-[12px] h-[24px] px-[11px] rounded-full flex items-center justify-center cursor-pointer transition-colors border-0 font-normal ml-0.5"
                      style={{ fontFamily: "'Noto Sans Telugu', 'Google Sans', sans-serif" }}
                    >
                      {isTelugu ? 'English' : 'తెలుగు'}
                    </button>
                    <button
                      type="button"
                      onClick={handleSpeak}
                      title={isSpeaking ? 'Stop audio' : 'Listen to overview'}
                      className={`w-[24px] h-[24px] rounded-full bg-[#29303f] hover:bg-[#343e52] ${
                        isSpeaking ? 'ring-1 ring-[#7eb7fb]' : ''
                      } flex items-center justify-center transition-colors cursor-pointer border-0 text-[#f4f5f8]`}
                    >
                      <SpeakerIcon />
                    </button>
                  </div>

                  {/* Main Paragraph with inline text-selection highlight + citation chip */}
                  {!isTelugu ? (
                    <p
                      className="text-[14px] leading-[22px] text-[#dbdde1] mb-[12px]"
                      style={{ fontFamily: "'Google Sans Text', Roboto, sans-serif" }}
                    >
                      <strong className="font-bold text-[#fdfdfd]">Singuparapu Lalith Aditya</strong> is a{' '}
                      <span
                        className="inline text-white"
                        style={{
                          backgroundColor: '#1a73e8',
                          color: '#ffffff',
                          padding: '0 2px',
                          borderRadius: '2px',
                          boxDecorationBreak: 'clone',
                          WebkitBoxDecorationBreak: 'clone',
                        }}
                      >
                        <strong className="font-bold text-white">Computer Science and Engineering (CSE)</strong>{' '}
                        undergraduate student studying at{' '}
                        <strong className="font-bold text-white">KL University.</strong>
                      </span>
                      {' '}
                      <span className="inline-flex items-center gap-[4px] align-middle bg-[#29303f] rounded-full px-[8px] py-[2px] text-[11px] text-[#8ab4f8] cursor-pointer hover:bg-[#343e52] transition-colors ml-[2px]">
                        <LinkedInChipIcon />
                        <span className="text-[#9aa0a6]">LinkedIn India · Lalith Adity...</span>
                      </span>
                    </p>
                  ) : (
                    <p
                      className="text-[14px] leading-[22px] text-[#dbdde1] mb-[12px]"
                      style={{ fontFamily: "'Noto Sans Telugu', 'Google Sans Text', sans-serif" }}
                    >
                      <strong className="font-bold text-[#fdfdfd]">సింగుపరపు లలిత్ ఆదిత్య</strong> కెఎల్ యూనివర్శిటీలో{' '}
                      <span
                        className="inline text-white"
                        style={{
                          backgroundColor: '#1a73e8',
                          color: '#ffffff',
                          padding: '0 2px',
                          borderRadius: '2px',
                          boxDecorationBreak: 'clone',
                          WebkitBoxDecorationBreak: 'clone',
                        }}
                      >
                        <strong className="font-bold text-white">కంప్యూటర్ సైన్స్ అండ్ ఇంజనీరింగ్ (సిఎస్ఇ)</strong>{' '}
                        చదువుతున్న అండర్‌గ్రాడ్యుయేట్ విద్యార్థి.
                      </span>
                      {' '}
                      <span className="inline-flex items-center gap-[4px] align-middle bg-[#29303f] rounded-full px-[8px] py-[2px] text-[11px] text-[#8ab4f8] cursor-pointer hover:bg-[#343e52] transition-colors ml-[2px]">
                        <LinkedInChipIcon />
                        <span className="text-[#9aa0a6]">LinkedIn India · Lalith Adity...</span>
                      </span>
                    </p>
                  )}

                  {/* Section: Profile Overview */}
                  <h3
                    className="text-[20px] font-normal text-[#fefdfe] tracking-[-0.01em] mb-[16px]"
                    style={{ fontFamily: "'Google Sans', sans-serif" }}
                  >
                    {!isTelugu ? 'Profile Overview' : 'ప్రొఫైల్ అవలోకనం'}
                  </h3>

                  {/* Bullets matching prototype */}
                  {!isTelugu ? (
                    <ul
                      className="space-y-[12px] text-[14px] leading-[21px] text-[#dbdde1] pl-5 list-disc mb-[21px]"
                      style={{ fontFamily: "'Google Sans Text', Roboto, sans-serif" }}
                    >
                      <li>
                        <strong className="font-bold text-[#fbfcfc]">Education: </strong>
                        Computer Science &amp; Engineering Undergraduate at KL University
                      </li>
                      <li>
                        <strong className="font-bold text-[#fbfcfc]">Primary Interests: </strong>
                        Software development, backend engineering, and building practical applications to solve real-world problems.{' '}
                        <span className="inline-flex items-center gap-[4px] align-middle bg-[#29303f] rounded-full px-[8px] py-[2px] text-[11px] text-[#8ab4f8] cursor-pointer hover:bg-[#343e52] transition-colors ml-[2px]">
                          <LinkedInChipIcon />
                          <span className="text-[#9aa0a6]">LinkedIn India · Lalith Adity...</span>
                        </span>
                      </li>
                    </ul>
                  ) : (
                    <ul
                      className="space-y-[12px] text-[14px] leading-[21px] text-[#dbdde1] pl-5 list-disc mb-[21px]"
                      style={{ fontFamily: "'Noto Sans Telugu', 'Google Sans Text', sans-serif" }}
                    >
                      <li>
                        <strong className="font-bold text-[#fbfcfc]">విద్య: </strong>
                        కెఎల్ విశ్వవిద్యాలయంలో కంప్యూటర్ సైన్స్ &amp; ఇంజనీరింగ్ అండర్‌గ్రాడ్యుయేట్
                      </li>
                      <li>
                        <strong className="font-bold text-[#fbfcfc]">ముఖ్య ఆసక్తులు: </strong>
                        సాఫ్ట్‌వేర్ అభివృద్ధి, బ్యాకెండ్ ఇంజనీరింగ్ మరియు వాస్తవ సమస్యలను పరిష్కరించే ఆచరణాత్మక అప్లికేషన్ల నిర్మాణం.{' '}
                        <span className="inline-flex items-center gap-[4px] align-middle bg-[#29303f] rounded-full px-[8px] py-[2px] text-[11px] text-[#8ab4f8] cursor-pointer hover:bg-[#343e52] transition-colors ml-[2px]">
                          <LinkedInChipIcon />
                          <span className="text-[#9aa0a6]">LinkedIn India · Lalith Adity...</span>
                        </span>
                      </li>
                    </ul>
                  )}

                  {/* Muted Continuation Note */}
                  <p
                    className="text-[13.5px] leading-[20px] text-[#929eac] mb-[14px]"
                    style={{ fontFamily: "'Google Sans Text', Roboto, sans-serif" }}
                  >
                    {!isTelugu
                      ? 'If you are looking for specific projects, professional background, or contact details regarding Singuparapu Lalith Aditya, please let me know what details you need.'
                      : 'సింగుపరపు లలిత్ ఆదిత్యకు సంబంధించి నిర్దిష్ట ప్రాజెక్ట్‌లు, వృత్తిపరమైన నేపథ్యం లేదా సంప్రదింపు వివరాల కోసం చూస్తున్నట్లయితే, మీకు ఏ వివరాలు కావాలో తెలియజేయండి.'}
                  </p>

                  {/* Expandable Section if "Show more" is clicked */}
                  {isAiExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mb-[16px] overflow-hidden space-y-3 pt-1"
                      style={{ fontFamily: "'Google Sans Text', Roboto, sans-serif" }}
                    >
                      <div>
                        <h4
                          className="text-[16px] font-normal text-[#fefdfe] mb-1"
                          style={{ fontFamily: "'Google Sans', sans-serif" }}
                        >
                          Core Competencies
                        </h4>
                        <p className="text-[14px] leading-[21px] text-[#dbdde1]">
                          Full-stack web architecture, modern frontend development (React, Next.js, Tailwind CSS), backend REST APIs, distributed databases, and cloud integrations.
                        </p>
                      </div>
                      <div>
                        <h4
                          className="text-[16px] font-normal text-[#fefdfe] mb-1"
                          style={{ fontFamily: "'Google Sans', sans-serif" }}
                        >
                          Portfolio &amp; Projects
                        </h4>
                        <p className="text-[14px] leading-[21px] text-[#dbdde1]">
                          Explore verified production projects, source code, and professional milestones linked in the organic results below.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Centered Show More Pill Button */}
                  <div className="flex justify-center w-full">
                    <button
                      type="button"
                      onClick={() => setIsAiExpanded(!isAiExpanded)}
                      className="w-full max-w-[420px] h-[36px] rounded-full border border-[#3c4043] bg-[#181c22] hover:bg-[#222731] hover:border-[#4a5363] text-[#f1f2f2] text-[13px] font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      style={{ fontFamily: "'Google Sans', Roboto, sans-serif" }}
                    >
                      <span>{isAiExpanded ? 'Show less' : 'Show more'}</span>
                      <ChevronDownIcon expanded={isAiExpanded} />
                    </button>
                  </div>
                </div>

                {/* ── Right Column: Two Compact Google Discovered Entity Cards (LinkedIn & GitHub) ── */}
                <motion.div
                  variants={isZooming ? otherResultsFadeVariants : undefined}
                  animate={isZooming ? 'fading' : undefined}
                  className="hidden lg:flex flex-col gap-3 w-[320px] flex-shrink-0 mt-8"
                >
                  {/* Card 1: LinkedIn Entity Card */}
                  <a
                    href="https://www.linkedin.com/in/lalith-aditya-singuparapu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-[8px] border border-[#3c4043] bg-[#202124] hover:bg-[#282a2d] hover:border-[#5f6368] p-3 transition-colors cursor-pointer"
                  >
                    {/* Header row: favicon + domain + 3 dots */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <LinkedInFavicon size={18} iconSize={11} rounded="rounded-full" />
                      <span className="text-[12px] text-[#bdc1c6] font-normal truncate flex-1">
                        linkedin.com
                      </span>
                      <DotsMenuIcon />
                    </div>
                    {/* Title */}
                    <h4
                      className="text-[14px] font-medium text-[#8ab4f8] hover:underline leading-snug mb-1"
                      style={{ fontFamily: "'Google Sans Text', Roboto, sans-serif" }}
                    >
                      Lalith Aditya Singuparapu
                    </h4>
                    {/* Snippet */}
                    <p className="text-[12px] leading-[1.4] text-[#9aa0a6]">
                      CSE Undergraduate at KL University. Passionate about building real-world software.
                    </p>
                  </a>

                  {/* Card 2: GitHub Entity Card */}
                  <a
                    href="https://github.com/lalithdev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-[8px] border border-[#3c4043] bg-[#202124] hover:bg-[#282a2d] hover:border-[#5f6368] p-3 transition-colors cursor-pointer"
                  >
                    {/* Header row: favicon + domain + 3 dots */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <GitHubFavicon size={18} iconSize={11} />
                      <span className="text-[12px] text-[#bdc1c6] font-normal truncate flex-1">
                        github.com
                      </span>
                      <DotsMenuIcon />
                    </div>
                    {/* Title */}
                    <h4
                      className="text-[14px] font-medium text-[#8ab4f8] hover:underline leading-snug mb-1"
                      style={{ fontFamily: "'Google Sans Text', Roboto, sans-serif" }}
                    >
                      lalithdev
                    </h4>
                    {/* Snippet */}
                    <p className="text-[12px] leading-[1.4] text-[#9aa0a6]">
                      Open source projects, contributions and code repositories.
                    </p>
                  </a>
                </motion.div>

              </div>

              {/* Dividing line after AI Mode: extends from left margin across to right edge of right web cards! */}
              <div className="w-full h-[1px] bg-[#3c4043] mt-7" />
            </div>

            {/* ══════════════════════════════════════════════════════════════════
                5. ORGANIC SEARCH RESULTS (Portfolio, then LinkedIn)
                ══════════════════════════════════════════════════════════════════ */}
            <div className="w-full max-w-[652px] min-w-0 flex-shrink-0">

              {/* 1. Primary Organic Result: Portfolio (The Entry Point!) */}
              <motion.div
                variants={isZooming ? resultClickVariants : resultCardVariants}
                animate={isZooming ? 'clicked' : undefined}
                className="mb-7"
              >
                {/* Favicon & Breadcrumb */}
                <div className="flex items-center gap-3 mb-1">
                  <PortfolioFavicon size={26} imgSize={18} />
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[14px] text-[#dadce0] font-normal leading-tight">
                      meetlalith.vercel.app
                    </span>
                    <span className="text-[12px] text-[#bdc1c6] truncate leading-tight">
                      https://meetlalith.vercel.app/
                    </span>
                  </div>
                  <DotsMenuIcon />
                </div>

                {/* Result Title */}
                <motion.h2
                  ref={onResultRef}
                  animate={{
                    color: titleColor,
                    textDecoration: isHovering ? 'underline' : 'none',
                  }}
                  transition={{ duration: 0.15 }}
                  className="text-[20px] font-normal leading-[1.3] cursor-pointer my-1.5 inline-block"
                  style={{ color: titleColor }}
                >
                  Lalith Aditya — CSE Undergraduate | Portfolio
                </motion.h2>

                {/* Result Snippet */}
                <p className="text-[14px] leading-[1.58] text-[#bdc1c6]">
                  Welcome to my portfolio! I'm a Computer Science and Engineering undergraduate passionate about building practical software applications, backend systems, and solving real-world problems. Explore my projects, skills, and journey.
                </p>
              </motion.div>

              {/* 2. Second Organic Result: LinkedIn */}
              <motion.div
                variants={isZooming ? otherResultsFadeVariants : resultCardVariants}
                animate={isZooming ? 'fading' : undefined}
                className="mb-8"
              >
                {/* Favicon & Breadcrumb */}
                <div className="flex items-center gap-3 mb-1">
                  <LinkedInFavicon size={26} iconSize={15} rounded="rounded-full" />
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[14px] text-[#dadce0] font-normal leading-tight">
                      linkedin.com
                    </span>
                    <span className="text-[12px] text-[#bdc1c6] truncate leading-tight">
                      https://www.linkedin.com/in/lalith-aditya-singuparapu/
                    </span>
                  </div>
                  <DotsMenuIcon />
                </div>

                {/* Result Title */}
                <h3 className="text-[20px] font-normal leading-[1.3] text-[#8ab4f8] hover:underline cursor-pointer my-1.5">
                  Lalith Aditya Singuparapu — CSE Undergraduate at KL University
                </h3>

                {/* Result Snippet */}
                <p className="text-[14px] leading-[1.58] text-[#bdc1c6]">
                  I'm a <strong className="font-bold text-[#fdfdfd]">Computer Science undergraduate</strong> passionate about building practical software that solves real-world problems. My primary focus is on backend engineering,
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchResults;

