import { defineConfig } from 'dumi';
import { components } from './components';

export default defineConfig({
  title: 'one-penny',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',

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
  // more config: https://d.umijs.org/config
});
