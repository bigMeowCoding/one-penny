import { defineConfig } from 'dumi'
import { components } from './components'

export default defineConfig({
  title: 'one-penny',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  alias: {
    // 'antd-mobile/es': process.cwd() + '/src',
    'demos': process.cwd() + '/src/demos/index.ts',
  },
  resolve: {
    includes: ['docs', 'src'],
    passivePreview: true,
  },
  metas: [
    {
      name: 'viewport',
      content:
        'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover',
    },
  ],
  hash: true,
  scripts: [
    `if (location.pathname.startsWith('/~demos/')) {
      document.documentElement.setAttribute('data-is-demo', 'true')
    }`,
    `
    if (!location.port) {
      // Enable Google Analytics
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', 'UA-72788897-2');
    }
    `,
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=UA-72788897-2',
      async: true,
    },
  ],
  navs: [
    {
      title: '组件',
      path: '/components',
    },
  ],
  menus: {
    '/': [
      {
        title: '首页',
        path: 'index',
      },
    ],
    '/components': [
      {
        title: '基础',
        children: components.basic,
      },
    ],
  },
  themeConfig: {
    hd: {
      rules: [
        // {mode: 'vw', options: [100, 750]}
      ],
    },
  },
  // more config: https://d.umijs.org/config
})
