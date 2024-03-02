import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'REIMS2 manual',
  description: 'This is the documentation for REIMS2',
  lastUpdated: true,
  appearance: true,
  base: '/docs',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Manual', link: '/' },
      { text: 'For developers', link: '/dev/' },
    ],
    search: {
      provider: 'local',
    },

    sidebar: {
      '/': [
        {
          text: 'Overview',
          items: [
            { link: '/', text: 'About REIMS2' },
            { link: '/howto', text: 'How to use REIMS2' },
          ],
        },
        {
          text: 'Internals',
          items: [{ link: '/philscore', text: 'PhilScore' }],
        },
      ],
      '/dev/': [
        {
          text: 'Overview',
          items: [
            { link: '/dev/', text: 'Introduction' },
            { link: '/dev/system', text: 'System overview' },
            { link: '/dev/analysis', text: 'REIMS1 analysis' },
          ],
        },
        {
          text: 'Planning',
          items: [
            { link: '/dev/user-stories', text: 'User Stories' },
            { link: '/dev/requirements', text: 'Requirements' },
          ],
        },
        {
          text: 'Notes',
          items: [
            { link: '/dev/notes', text: 'Meetings' },
            { link: '/dev/ideas', text: 'Ideas' },
          ],
        },
      ],
    },
    lastUpdated: {
      formatOptions: {
        timeStyle: undefined,
        dateStyle: 'long',
      },
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/reims2' }],
    editLink: {
      pattern: 'https://github.com/reims2/reims2-docs/edit/main/src/:path',
    },
  },
})
