/**
 * siteConfig.js: the single source of truth for brand and global content.
 * Buyers: edit this file to rebrand the whole template.
 */
export const siteConfig = {
  name: "FRAME",
  /** Shown beside the name, e.g. FRAME® */
  trademark: "®",
  tagline: "Independent film production & creative studio",
  descriptor: "Film · Commercials · Documentary · Music Video",
  url: "https://www.example.com",

  seo: {
    titleSeparator: " — ",
    defaultDescription:
      "FRAME® is an independent film production and creative studio making commercials, documentaries, music videos and brand films.",
    ogImage: "/images/og-image.jpg",
  },

  navigation: [
    { label: "Home", path: "/" },
    { label: "Work", path: "/work" },
    { label: "Services", path: "/services" },
    { label: "About", path: "/about" },
    { label: "Journal", path: "/journal" },
    { label: "Contact", path: "/contact" },
  ],

  /** Secondary links, used in the footer (Phase 2). */
  secondaryNavigation: [
    { label: "Team", path: "/team" },
    { label: "Careers", path: "/careers" },
    { label: "Privacy Policy", path: "/privacy" },
  ],

  contact: {
    email: "hello@frame-studio.example",
    phone: "+1 (555) 014-2290",
    address: ["120 Lumière Street", "Studio 4B", "Los Angeles, CA 90028"],
    location: "Los Angeles, CA",
  },

  social: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "Vimeo", href: "https://vimeo.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
  ],

  footer: {
    copyright: "All rights reserved.",
    credit: "Demo content is fictional.",
  },

  media: {
    usePlaceholders: true, // true = generated cinematic placeholders, false = your real files
  },
  /**
   * Cinematic preloader.
   * oncePerSession: show only on the first page load of a browser session.
   * minDurationMs:  minimum animation time (it then waits for fonts + page load, capped by maxDurationMs).
   * Reduced-motion visitors never see it.
   */
  preloader: {
    enabled: true,
    oncePerSession: true,
    minDurationMs: 1400,
    maxDurationMs: 3500,
  },

  /** Custom cursor (desktop mouse only; automatically off for touch and reduced motion). */
  cursor: {
    enabled: true,
  },

  /**
   * Contact form delivery (used in Phase 5).
   * provider: 'none' | 'formspree' | 'custom'
   * With 'none' the form will validate but will NOT claim to have sent anything.
   */
  form: {
    provider: "formspree",
    endpoint: import.meta.env.VITE_FORM_ENDPOINT || "",
  },
};

export const siteTitle = `${siteConfig.name}${siteConfig.trademark}`;
