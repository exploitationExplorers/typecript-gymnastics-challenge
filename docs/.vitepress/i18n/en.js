export default {
  title: 'TypeScript Challenges',
  description: 'Learn TypeScript type system through challenges',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Easy', link: '/easy/' },
      { text: 'Medium', link: '/medium/' },
      { text: 'Hard', link: '/hard/' },
      { text: 'Common', link: '/common/' },
    ],
    sidebar: {
      '/easy/': [
        {
          text: 'Easy Challenges',
          items: [
            { text: 'Pick', link: '/easy/implement-pick' },
            { text: 'Readonly', link: '/easy/implement-readonly' },
            { text: 'Tuple to Object', link: '/easy/tuple-to-object' },
            { text: 'First', link: '/easy/first' },
            { text: 'Length of Tuple', link: '/easy/length-of-tuple' },
          ]
        }
      ],
      '/medium/': [
        {
          text: 'Medium Challenges',
          items: [
            { text: 'Get Return Type', link: '/medium/get-return-type' },
            { text: 'Omit', link: '/medium/implement-omit' },
            { text: 'DeepReadonly', link: '/medium/implement-deepreadonly' },
          ]
        }
      ],
      '/hard/': [
        {
          text: 'Hard Challenges',
          items: [
            { text: 'SimpleVue', link: '/hard/simplevue' },
            { text: 'UnionToIntersection', link: '/hard/union-to-intersection' },
          ]
        }
      ],
      '/common/': [
        {
          text: 'Common Techniques',
          items: [
            { text: 'Type Equality', link: '/common/type-equality' },
            { text: 'Recursive Depth', link: '/common/recursive-depth' },
          ]
        }
      ]
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © ${new Date().getFullYear()}`
    }
  }
}
