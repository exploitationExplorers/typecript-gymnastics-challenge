import { defineConfig } from 'vitepress'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TypeScript chanllages",
  description: "🚀增强你的TypeScript类型能力🚀",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '🎉首页', link: '/' },
      { text: '⚡️挑战', link: '/challenges/' },
      { text: '🧭学习指南', link: '/guide/' },
      { text: '📆 更新日志', link: '/update-log' }
    ],

    sidebar: {
      '/challenges/': [
        {
          text: '挑战',
          items: [
            { text: '挑战介绍', link: '/challenges/' },
            { text: '简单', link: '/challenges/easy/' },
            { text: '中等', link: '/challenges/medium/' },
            { text: '困难', link: '/challenges/hard/' },
            { text: '地狱', link: '/challenges/extreme/' }
          ]
        }
      ],
      '/guide/': [
        {
          text: '学习指南',
          items: [
            { text: '开始', link: '/guide/' },
            { text: 'TypeScript基础', link: '/guide/basics' },
            { text: '类型操作', link: '/guide/type-operations' },
            { text: '高级技巧', link: '/guide/advanced' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
