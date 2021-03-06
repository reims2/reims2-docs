const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'REIMS2 manual',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: 'This is the user documentation for REIMS2',

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'reims2/reims2-docs',
    editLinks: true,
    docsDir: 'src',
    docsBranch: 'main',
    repoLabel: false,
    sidebar: {
      '/dev/': [
        {
          title: 'Overview',
          path: '/dev/',
          collapsable: false,
          children: [
            'philscore',
            'deploy',
          ]
        },
        {
          title: 'Planning',
          path: '/dev/planning.html',
          collapsable: false,
          children: [
            'user-stories',
            'requirements',
          ]
        },
        {
          title: 'Other stuff',
          path: '/dev/other.html',
          collapsable: false,
          children: [
            'analysis', 
            'notes',
          ]
        },
      ],
      '/': [
        '/',
        'test',
        'test2'
      ],
    },
    nav: [
      {
        text: 'Open REIMS',
        link: 'https://reims2.app',
      },
      {
        text: 'Developer docs',
        link: '/dev/',
      }
    ]
  },

  base: '/docs/',

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    'vuepress-plugin-serve',
    ['@snowdog/vuepress-plugin-pdf-export', {
      puppeteerLaunchOptions: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      },
      outputFileName: "REIMS2_manual.pdf"
    }]
  ]
}
