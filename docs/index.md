---
layout: home
---

<script>
// 根据浏览器语言自动跳转
const userLang = navigator.language || navigator.userLanguage;
const isZh = userLang.startsWith('zh');
window.location.href = isZh ? '/zh/' : '/en/';
</script>

<!-- 如果JavaScript被禁用，显示下面的内容 -->
<noscript>
  <h1>选择语言 | Choose Language</h1>
  <ul>
    <li><a href="/zh/">中文</a></li>
    <li><a href="/en/">English</a></li>
  </ul>
</noscript>

hero:
  name: TypeScript Challenges
  text: Master TypeScript Type System
  tagline: Learn advanced TypeScript types through practice
  actions:
    - theme: brand
      text: Start Learning
      link: /easy/implement-pick
    - theme: alt
      text: Common Techniques
      link: /common/type-equality
features:
  - title: Comprehensive Content
    details: Master the TypeScript type system with a comprehensive set of exercises and examples
  - title: Progressive Learning
    details: Challenges range from simple to complex, helping you gradually improve your TypeScript skills
  - title: In-depth Explanations
    details: Each challenge comes with detailed explanations and step-by-step solutions
---

# TypeScript Type Challenges

Welcome to the TypeScript Type Challenges collection! This site is designed to help you improve your understanding of TypeScript's type system through practical exercises.

## Getting Started

If you're new to TypeScript types, start with the [Easy Challenges](/easy/implement-pick) to build a solid foundation.

## Challenge Levels

The challenges are organized by difficulty:

- **Easy**: Basic type manipulations
- **Medium**: More advanced type operations
- **Hard**: Complex type puzzles
- **Common**: Useful techniques for everyday TypeScript development

## Contributing

This site is open source. Feel free to contribute new challenges or improve existing ones by submitting a pull request to our [GitHub repository](https://github.com/your-username/typescript-challenges).
