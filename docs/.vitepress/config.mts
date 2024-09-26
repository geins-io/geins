// import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid';

// https://vitepress.dev/reference/site-config
export default withMermaid({
  title: 'Geins SDK',
  description: 'A perfect developer experience for node.js devlopment',
  head: [['link', { rel: 'icon', href: '/assets/favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      light: '/assets/geins-g.svg',
      dark: '/assets/geins-g-white.svg',
      alt: 'Geins SDK',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Quickstart', link: '/quick-start' },
      { text: 'Examples', link: '/examples' },
    ],

    sidebar: [
      {
        text: 'Installation',
        link: '/installation',
      },
      {
        text: 'Examples',
        link: '/examples',
      },

      {
        text: 'Packages',
        link: '/packages',
        items: [
          {
            text: '@geins/core',
            link: '/packages/core',
            items: [
              { text: 'API Client', link: '/packages/core/api-client' },
              { text: 'Channels', link: '/packages/core/channel' },
              { text: 'Events', link: '/packages/core/events' },
              { text: 'Cookies', link: '/packages/core/cookies' },

              { text: 'Routing', link: '/packages/core/routing' },
            ],
          },
          {
            text: '@geins/cms',
            link: '/packages/cms',
            items: [
              { text: 'Menus', link: '/packages/cms/menu' },
              { text: 'Content Areas', link: '/packages/cms/content-areas' },
              { text: 'Pages', link: '/packages/cms/pages' },
              { text: 'Content', link: '/packages/cms/content' },
              { text: 'Preview', link: '/packages/cms/preview' },
            ],
          },
          {
            text: '@geins/crm',
            link: '/packages/crm',
            items: [
              { text: 'Authentication', link: '/packages/crm/authentication' },
              { text: 'User Information', link: '/packages/crm/user' },
              { text: 'Password reset', link: '/packages/crm/password' },
            ],
          },
          {
            text: '@geins/types',
            link: '/packages/types',
          },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/geins-io/geins' },
    ],
    outline: {
      level: [2, 4],
    },

    search: {
      provider: 'local',
    },
  },
  mermaid: {},
});