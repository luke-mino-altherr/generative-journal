// FIXME: Update this configuration file based on your project information

import { colors } from '@/config/theme';

export const AppConfig = {
  site_name: 'generative-journal',
  title: 'Generative Journal',
  description: 'The digital workspace of Luke Mino-Altherr',
  locale: 'en',

  // SEO Configuration
  seo: {
    author: 'Luke Mino-Altherr',
    siteUrl: 'https://gen.minalt.xyz',
    keywords: [
      'creative coding',
      'p5.js',
      'generative art',
      'software engineer',
      'music',
      'art',
      'audio',
    ],

    // Open Graph image configuration
    ogImage: {
      url: '/og.jpeg',
      width: 1280,
      height: 849,
      alt: 'Generative Journal - The digital workspace of Luke Mino-Altherr',
    },

    // Theme colors for mobile browsers
    themeColor: {
      light: colors.background.light,
      dark: colors.background.dark,
    },

    // Social media URLs for structured data
    socialProfiles: [
      'https://www.linkedin.com/in/luke-mino-altherr/',
      'https://github.com/luke-mino-altherr',
      'https://soundcloud.com/minalt',
      'https://www.instagram.com/lminalt/',
    ],

    // Person structured data
    person: {
      name: 'Luke Mino-Altherr',
      jobTitle: 'Software Engineer',
      email: 'lminoaltherr@gmail.com',
    },
  },
};
