// ─── constants.js ────────────────────────────────────────────────────────────
// Static data for the ultra-authentic Google search intro experience.

export const INTRO_STAGES = {
  HOME: 0,
  FOCUS: 1,
  SUGGESTIONS: 2,
  TYPING: 3,
  SUBMITTING: 4,
  RESULTS: 5,
  CURSOR_ENTER: 6,
  CURSOR_MOVE: 7,
  RESULT_HOVER: 8,
  RESULT_CLICK: 9,
  ENTER_PORTFOLIO: 10,
  COMPLETE: 11,
};

export const SEARCH_QUERY = 'Lalith Aditya';

/** Developer search history shown on clicking the empty search bar */
export const DEVELOPER_HISTORY_SUGGESTIONS = [
  { id: 'dev-1', text: 'how to center a div css' },
  { id: 'dev-2', text: 'react useeffect cleanup return function' },
  { id: 'dev-3', text: 'spring boot cors configuration' },
  { id: 'dev-4', text: 'postgres connection refused docker container' },
  { id: 'dev-5', text: 'github ssh key setup windows' },
  { id: 'dev-6', text: 'javascript event loop microtasks vs macrotasks' },
];

/** Exact autocomplete suggestions requested by user */
export const AUTOCOMPLETE_SUGGESTIONS = [
  {
    id: 1,
    type: 'search_active',
    query: 'Lalith Aditya',
    suffix: ' - Google Search',
  },
  {
    id: 2,
    type: 'history',
    text: 'lalith aditya singupurapu',
  },
  {
    id: 3,
    type: 'search',
    text: 'Lalith Aditya Singuparapu',
  },
  {
    id: 4,
    type: 'search',
    text: 'lalith aditya linkedin',
  },
  {
    id: 5,
    type: 'search',
    text: 'lalith aditya github',
  },
  {
    id: 6,
    type: 'search',
    text: 'lalith aditya portfolio',
  },
  {
    id: 7,
    type: 'search',
    text: 'lalith aditya KL University',
  },
  {
    id: 8,
    type: 'search',
    text: 'lalith aditya software developer',
  },
  {
    id: 9,
    type: 'search',
    text: 'lalith aditya projects',
  },
  {
    id: 10,
    type: 'search',
    text: 'lalith aditya web developer',
  },
];

/**
 * Generates dynamic suggestions matching the exact count of history items (6 items).
 * As the user types characters, suggestions evolve dynamically based on query characteristics.
 */
export function getDynamicSuggestions(query) {
  if (!query) {
    return DEVELOPER_HISTORY_SUGGESTIONS;
  }

  const activeItem = {
    id: 'active',
    type: 'search_active',
    query: query,
    suffix: ' - Google Search',
  };

  const historyItem = {
    id: 'hist-singupurapu',
    type: 'history',
    text: 'lalith aditya singupurapu',
  };

  const len = query.length;
  let candidates = [];

  if (len === 1) {
    // "L"
    candidates = [
      'leetcode',
      'linkedin',
      'Lalith Aditya Singuparapu',
      'linux commands',
    ];
  } else if (len === 2) {
    // "La"
    candidates = [
      'laravel documentation',
      'Lalith Aditya Singuparapu',
      'latest tech news',
      'lalith aditya linkedin',
    ];
  } else if (len === 3) {
    // "Lal"
    candidates = [
      'Lalith Aditya Singuparapu',
      'lalit modi',
      'lalith aditya linkedin',
      'laliga standings',
    ];
  } else if (len === 4) {
    // "Lali"
    candidates = [
      'Lalith Aditya Singuparapu',
      'lalith aditya linkedin',
      'lalith aditya github',
      'laliga fixtures',
    ];
  } else if (len === 5) {
    // "Lalit"
    candidates = [
      'Lalith Aditya Singuparapu',
      'lalith aditya linkedin',
      'lalith aditya github',
      'lalith aditya portfolio',
    ];
  } else if (len === 6) {
    // "Lalith"
    candidates = [
      'Lalith Aditya Singuparapu',
      'lalith aditya linkedin',
      'lalith aditya github',
      'lalith aditya KL University',
    ];
  } else if (len === 7) {
    // "Lalith "
    candidates = [
      'Lalith Aditya Singuparapu',
      'lalith aditya linkedin',
      'lalith aditya software developer',
      'lalith aditya projects',
    ];
  } else if (len === 8) {
    // "Lalith A"
    candidates = [
      'Lalith Aditya Singuparapu',
      'lalith aditya linkedin',
      'lalith aditya github',
      'lalith aditya web developer',
    ];
  } else if (len === 9) {
    // "Lalith Ad"
    candidates = [
      'Lalith Aditya Singuparapu',
      'lalith aditya portfolio',
      'lalith aditya software developer',
      'lalith aditya KL University',
    ];
  } else if (len === 10) {
    // "Lalith Adi"
    candidates = [
      'Lalith Aditya Singuparapu',
      'lalith aditya linkedin',
      'lalith aditya github',
      'lalith aditya projects',
    ];
  } else if (len === 11) {
    // "Lalith Adit"
    candidates = [
      'Lalith Aditya Singuparapu',
      'lalith aditya linkedin',
      'lalith aditya github',
      'lalith aditya web developer',
    ];
  } else if (len === 12) {
    // "Lalith Adity"
    candidates = [
      'Lalith Aditya Singuparapu',
      'lalith aditya linkedin',
      'lalith aditya github',
      'lalith aditya KL University',
    ];
  } else {
    // "Lalith Aditya" (Complete)
    candidates = [
      'Lalith Aditya Singuparapu',
      'lalith aditya linkedin',
      'lalith aditya github',
      'lalith aditya KL University',
    ];
  }

  // Active query + 1 history match + 4 dynamic candidates = exactly 6 items!
  return [
    activeItem,
    historyItem,
    ...candidates.map((text, idx) => ({
      id: `dynamic-${len}-${idx}`,
      type: 'search',
      text,
    })),
  ];
}

/** Google Search Result #1 (Portfolio) with authentic sitelinks */
export const PRIMARY_RESULT = {
  urlDisplay: 'https://lalithaditya.dev',
  pathDisplay: 'https://lalithaditya.dev › portfolio',
  siteTitle: 'Lalith Aditya',
  title: 'Lalith Aditya – Software Engineer | Full Stack & AI Developer',
  description:
    'Official portfolio of Lalith Aditya Singuparapu. Computer Science undergraduate at KL University specializing in high-performance web systems, React, Spring Boot, and AI architectures.',
  sitelinks: [
    {
      title: 'Featured Projects',
      snippet: 'Explore BookMyCare, CertifyMe, and production-grade applications.',
      tag: 'Projects',
    },
    {
      title: 'About Lalith',
      snippet: 'Undergraduate background, education at KL University, and technical journey.',
      tag: 'About',
    },
    {
      title: 'Skills & Tech Stack',
      snippet: 'React, Next.js, Java, Spring Boot, PostgreSQL, Python, and cloud tools.',
      tag: 'Skills',
    },
    {
      title: 'Contact & Resume',
      snippet: 'Get in touch for software engineering opportunities and collaborations.',
      tag: 'Contact',
    },
  ],
};

/** Secondary Search Result for realism */
export const SECONDARY_RESULT = {
  urlDisplay: 'https://github.com › lalithdev',
  siteTitle: 'GitHub',
  title: 'lalithdev (Lalith Aditya) · GitHub',
  description:
    'Software engineer and open source contributor. Check out repositories for full-stack architectures, API services, and ML experiments.',
};

/** Knowledge Panel data (matches Google's official desktop knowledge graph) */
export const KNOWLEDGE_PANEL_DATA = {
  name: 'Lalith Aditya Singuparapu',
  title: 'Software Engineer',
  subtitle: 'Full-stack developer & AI systems enthusiast',
  about:
    'Lalith Aditya Singuparapu is an Indian software engineer and Computer Science undergraduate at KL University, known for building robust full-stack applications and intelligent developer tooling.',
  facts: [
    { label: 'Education', value: 'KL University (B.Tech CSE, 2024–2028)' },
    { label: 'Primary Focus', value: 'Backend Engineering, Distributed Systems, AI' },
    { label: 'Languages', value: 'Java, Python, TypeScript, SQL' },
    { label: 'Location', value: 'India' },
  ],
  profiles: [
    { name: 'GitHub', handle: '@lalithdev' },
    { name: 'LinkedIn', handle: 'lalith-aditya-singuparapu' },
  ],
};

/** Human-paced typing delay per character */
export function humanTypingDelay(char, index) {
  if (char === ' ') return 170 + Math.random() * 40;
  if (index > 0 && index % 3 === 0) {
    return 100 + Math.random() * 80;
  }
  return 60 + Math.random() * 60;
}
