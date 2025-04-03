import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from 'vitepress-plugin-group-icons'
import { GitChangelog, GitChangelogMarkdownSection } from '@nolebase/vitepress-plugin-git-changelog/vite'
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
      { text: '👥关于我们', link: '/about'},
      { text: '📆 更新日志', link: '/update-log' }
    ],

    sidebar: {
      '/challenges/': [
        {
          text: '挑战',
          items: [
            { text: '挑战介绍', link: '/challenges/' },
            { text: '简单', 
              items: [
                { text: '实现Pick', link: '/challenges/easy/pick' },
                { text: '元组转换为对象', link: '/challenges/easy/tuples' },
                { text: '实现Readonly', link: '/challenges/easy/readonly' },
                { text: '实现Awaited', link: '/challenges/easy/awaited' },
                { text: '实现Parameters', link: '/challenges/easy/paramEters' },
              ]
             },
            { text: '中等',
              items: [
                { text: '实现Absolute', link: '/challenges/medium/Absolute' },
                { text: '实现Capitalize', link: '/challenges/medium/Capitalize' },
                { text: '百分比解析器', link: '/challenges/medium/percentageParser' },
                { text: '获取函数返回类型', link: '/challenges/medium/function-return' },
                { text: '计算字符的长度', link: '/challenges/medium/character-length' },
                { text: '实现DeepReadonly', link: '/challenges/medium/DeepReadonly' },
                { text: '实现ReplaceAll', link: '/challenges/medium/ReplaceAll' },
                { text: '实现TrimLeft', link: '/challenges/medium/TrimLeft' },
                { text: '实现TrimRight', link: '/challenges/medium/TrimRight' },
                { text: '实现Trim', link: '/challenges/medium/Trim' },
                { text: '实现Diff', link: '/challenges/medium/Diff' },
                { text: '实现Omit', link: '/challenges/medium/Omit' },
                { text: '实现ReadonlyKeys', link: '/challenges/medium/ReadonlyKeys' },
                { text: '实现Flatten', link: '/challenges/medium/Flatten' },
                { text: '实现Merge', link: '/challenges/medium/Merge' },
                { text: '实现Promise.all', link: '/challenges/medium/Promise.all' },
                { text: '实现Replace', link: '/challenges/medium/Replace' },
                { text: '实现KebabCase', link: '/challenges/medium/KebabCase' },
                { text: '实现Pop', link: '/challenges/medium/Pop' },
                { text: '最后一个元素', link: '/challenges/medium/lastOne' },
              ]
             },
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

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },
  },
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    },
    // toc显示1-6级标题
    toc: {level: [1,2,3,4,5,6]},
    image: {
      lazyLoading: true  // 开启图片懒加载
      
    }
  },
  vite: {
    plugins: [
      groupIconVitePlugin(
      {
        customIcon: {
          ts: localIconLoader(import.meta.url, '../public/svg/ts.svg'), //本地ts图标导入
          js: 'logos:javascript', //js图标
          md: 'logos:markdown', //markdown图标
          css: 'logos:css-3', //css图标
        },
      }
    ), 
    GitChangelog({
      repoURL: 'https://github.com/exploitationExplorers/typecript-gymnastics-challenge',
    }),
    GitChangelogMarkdownSection()
  ]
  },
  base: '/typecript-gymnastics-challenge/'
})
