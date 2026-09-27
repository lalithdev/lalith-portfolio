import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AUTOCOMPLETE_SUGGESTIONS } from './constants';
import { suggestionContainerVariants, suggestionItemVariants } from './animations';

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="#5f6368" className="w-[18px] h-[18px] flex-shrink-0">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

const HistoryClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="#5f6368" className="w-[18px] h-[18px] flex-shrink-0">
    <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6a7 7 0 1 1 7 7 7.07 7.07 0 0 1-6-3.44l-1.45 1.45A8.93 8.93 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
  </svg>
);

const SearchSuggestions = ({ visible, typedText }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          variants={suggestionContainerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full bg-white text-gray-900 pt-1 pb-3 px-1 rounded-b-[24px] shadow-2xl border-t border-gray-100"
          style={{
            boxShadow: '0 12px 32px rgba(0,0,0,0.28)',
          }}
        >
          {AUTOCOMPLETE_SUGGESTIONS.map((item) => {
            // First item: active highlighted search row matching user specification
            if (item.type === 'search_active') {
              const displayQuery = typedText || item.query;
              return (
                <motion.div
                  key={item.id}
                  variants={suggestionItemVariants}
                  className="mx-2 my-1 px-3.5 py-2 rounded-full bg-[#f1f3f4] flex items-center gap-3.5 cursor-pointer"
                >
                  <SearchIcon />
                  <span className="text-[14px] text-gray-900 leading-tight">
                    <strong className="font-semibold text-black">{displayQuery}</strong>
                    <span className="text-gray-500 font-normal">{item.suffix}</span>
                  </span>
                </motion.div>
              );
            }

            // Second item: history clock icon
            if (item.type === 'history') {
              return (
                <motion.div
                  key={item.id}
                  variants={suggestionItemVariants}
                  className="mx-2 my-0.5 px-3.5 py-2 rounded-full hover:bg-gray-100 flex items-center gap-3.5 cursor-pointer transition-colors"
                >
                  <HistoryClockIcon />
                  <span className="text-[14px] text-[#202124] leading-tight font-normal">
                    {item.text}
                  </span>
                </motion.div>
              );
            }

            // Search query items (3-10)
            return (
              <motion.div
                key={item.id}
                variants={suggestionItemVariants}
                className="mx-2 my-0.5 px-3.5 py-2 rounded-full hover:bg-gray-100 flex items-center gap-3.5 cursor-pointer transition-colors"
              >
                <SearchIcon />
                <span className="text-[14px] text-[#202124] leading-tight font-normal">
                  {item.text}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchSuggestions;
