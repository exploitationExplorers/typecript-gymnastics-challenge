export default {
  title: 'TypeScript 类型挑战',
  description: '通过实战挑战学习 TypeScript 类型系统',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '入门', link: '/easy/' },
      { text: '中等', link: '/medium/' },
      { text: '困难', link: '/hard/' },
      { text: '通用技巧', link: '/common/' },
    ],
    sidebar: {
      '/easy/': [
        {
          text: '入门挑战',
          items: [
            { text: '实现 Pick', link: '/easy/implement-pick' },
            { text: '实现 Readonly', link: '/easy/implement-readonly' },
            { text: '元组转对象', link: '/easy/tuple-to-object' },
            { text: '第一个元素', link: '/easy/first' },
            { text: '获取元组长度', link: '/easy/length-of-tuple' },
          ]
        }
      ],
      '/medium/': [
        {
          text: '中等挑战',
          items: [
            { text: '获取函数返回类型', link: '/medium/get-return-type' },
            { text: '实现 Omit', link: '/medium/implement-omit' },
            { text: '实现 DeepReadonly', link: '/medium/implement-deepreadonly' },
          ]
        }
      ],
      '/hard/': [
        {
          text: '困难挑战',
          items: [
            { text: '简易版 Vue', link: '/hard/simplevue' },
            { text: '联合类型转交叉类型', link: '/hard/union-to-intersection' },
          ]
        }
      ],
      '/common/': [
        {
          text: '通用技巧',
          items: [
            { text: '判断两个类型相等', link: '/common/type-equality' },
            { text: '递归深度', link: '/common/recursive-depth' },
          ]
        }
      ]
    },
    footer: {
      message: '基于 MIT 许可发布',
      copyright: `版权所有 © ${new Date().getFullYear()}`
    }
  }
}
