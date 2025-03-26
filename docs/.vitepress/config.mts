import { defineConfig } from 'vitepress'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TypeScript chanllages",
  description: "🚀增强你的TypeScript类型能力🚀",
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    logo: '/logo.png',
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
      { icon: 'github', link: 'https://github.com/exploitationExplorers/typecript-gymnastics-challenge' },
      {
        icon: {
          svg: '<svg t="1743000394173" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4569" width="200" height="200"><path d="M222.208 309.248H28.672v-92.16h494.592v92.16h-194.56v497.664H222.208V309.248zM655.36 655.36s64.512 62.464 147.456 62.464c45.056 0 86.016-23.552 86.016-71.68 0-105.472-278.528-87.04-278.528-268.288 0-98.304 84.992-171.008 197.632-171.008 116.736 0 176.128 63.488 176.128 63.488l-46.08 87.04s-56.32-51.2-130.048-51.2c-50.176 0-89.088 28.672-89.088 70.656 0 104.448 277.504 78.848 277.504 267.264 0 94.208-71.68 173.056-194.56 173.056-131.072 0-203.776-80.896-203.776-80.896L655.36 655.36z" fill="#0090E0" p-id="4570"></path></svg>'
        },
        link: 'https://github.com/exploitationExplorers/typecript-gymnastics-challenge'
      }
    ],
  }
})
