---
layout: home
hero:
  name: TypeScript 类型挑战
  text: 掌握 TypeScript 类型系统
  tagline: 通过练习学习 TypeScript 高级类型
  actions:
    - theme: brand
      text: 开始学习
      link: /easy/implement-pick
    - theme: alt
      text: 常用技巧
      link: /common/type-equality
features:
  - title: 全面的内容
    details: 通过全面的练习和示例掌握 TypeScript 类型系统
  - title: 循序渐进
    details: 挑战从简单到复杂，帮助你逐步提高 TypeScript 技能
  - title: 深入的解释
    details: 每个挑战都有详细的解释和逐步的解决方案
---

<div class="home-content">
  <h1 class="main-title">TypeScript <span class="pink-text">类型挑战</span></h1>
  <h2 class="sub-title">掌握 TypeScript 类型系统</h2>
  <p class="description">通过练习学习 TypeScript 高级类型</p>

  <div class="action-buttons">
    <a href="/easy/implement-pick" class="action-button primary">开始学习</a>
    <a href="/common/type-equality" class="action-button secondary">常用技巧</a>
  </div>

  <div class="feature-container">
    <div class="feature-item">
      <h3>全面的内容</h3>
      <p>通过全面的练习和示例掌握 TypeScript 类型系统</p>
    </div>
    <div class="feature-item">
      <h3>循序渐进</h3>
      <p>挑战从简单到复杂，帮助你逐步提高 TypeScript 技能</p>
    </div>
    <div class="feature-item">
      <h3>深入的解释</h3>
      <p>每个挑战都有详细的解释和逐步的解决方案</p>
    </div>
  </div>
</div>

<div class="content-section">
  <h1 class="section-title">TypeScript <span class="pink-text">类型挑战</span></h1>

  <p>欢迎来到 TypeScript 类型挑战集合！本站旨在帮助你通过实际练习提高对 TypeScript 类型系统的理解。</p>

  <h2>入门指南</h2>

  <p>如果你是 TypeScript 类型系统的新手，可以从<a href="/easy/implement-pick">入门挑战</a>开始，建立坚实的基础。</p>

  <h2>挑战级别</h2>

  <p>挑战按难度分类：</p>

  <ul class="challenge-list">
    <li class="challenge-list-item"><strong>入门</strong>：基础类型操作</li>
    <li class="challenge-list-item"><strong>中等</strong>：更高级的类型操作</li>
    <li class="challenge-list-item"><strong>困难</strong>：复杂的类型谜题</li>
    <li class="challenge-list-item"><strong>常用技巧</strong>：日常 TypeScript 开发中有用的技术</li>
  </ul>
</div>

<div class="contribution-section">
  <h2>贡献</h2>
  <p>本站是开源的，欢迎通过以下方式做出贡献：</p>
  <p>通过 <a href="https://github.com/your-username/typescript-challenges" class="github-link">GitHub 仓库</a> 提交拉取请求来贡献新的挑战或改进现有的挑战。</p>
</div>

<style>
:root {
  --pink-primary: #ec4899;
  --pink-light: #f472b6;
  --pink-dark: #db2777;
}

.pink-text {
  color: var(--pink-primary);
}

.dark .pink-text {
  color: var(--pink-light);
}

.home-content {
  padding: 2rem 0;
  text-align: center;
  margin-bottom: 3rem;
}

.main-title {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.sub-title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.description {
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
}

.action-button {
  display: inline-block;
  padding: 0.6rem 1.5rem;
  border-radius: 24px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none !important;
  transition: all 0.3s ease;
}

.action-button.primary {
  background-color: var(--pink-primary);
  color: white !important;
  box-shadow: 0 4px 10px rgba(236, 72, 153, 0.3);
}

.action-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(236, 72, 153, 0.4);
  background-color: var(--pink-light);
}

.action-button.secondary {
  background-color: #f4f4f8;
  color: var(--vp-c-text-1) !important;
  border: 1px solid var(--vp-c-divider);
}

.dark .action-button.secondary {
  background-color: #2a2a2a;
  border-color: #444;
  color: rgba(255, 255, 255, 0.9) !important;
}

.action-button.secondary:hover {
  background-color: #ececf0;
  transform: translateY(-2px);
}

.dark .action-button.secondary:hover {
  background-color: #333;
}

.feature-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 0 auto;
  max-width: 1000px;
  padding: 0 1rem;
}

.feature-item {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: left;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.2s ease;
}

.dark .feature-item {
  background-color: #2a2a2a;
  border: 1px solid #343434;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
}

.feature-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.dark .feature-item:hover {
  border-color: var(--pink-primary);
  box-shadow: 0 5px 20px rgba(236, 72, 153, 0.15);
}

.feature-item h3 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  font-size: 1.2rem;
  color: var(--vp-c-text-1);
}

.feature-item p {
  margin: 0;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.content-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section-title {
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
}

.challenge-list {
  padding-left: 1.5rem;
  list-style-type: none;
}

.challenge-list-item {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

.challenge-list-item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.6em;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--pink-primary);
}

.dark .challenge-list-item::before {
  background-color: var(--pink-light);
}

.contribution-section {
  margin: 3rem auto;
  padding: 2rem;
  max-width: 800px;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  border-left: 4px solid var(--pink-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.dark .contribution-section {
  background-color: #2a2a2a;
  border-left-color: var(--pink-primary);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
}

.github-link {
  display: inline-flex;
  align-items: center;
  padding: 6px 16px;
  background-color: #24292e;
  color: white !important;
  text-decoration: none !important;
  border-radius: 4px;
  font-weight: 600;
  margin-top: 0.5rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.github-link:hover {
  background-color: #2b3137;
  transform: translateY(-2px);
}

.github-link::before {
  content: "";
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='white' d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
}

/* 移动端响应式布局 */
@media (max-width: 768px) {
  .main-title {
    font-size: 2rem;
  }

  .sub-title {
    font-size: 1.5rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .feature-container {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;
    align-items: center;
  }

  .action-button {
    width: 100%;
    max-width: 200px;
    text-align: center;
  }

  .content-section,
  .contribution-section {
    padding: 0 1rem;
  }

  .contribution-section {
    padding: 1.5rem;
    margin: 2rem 1rem;
  }
}

/* 平板响应式布局 */
@media (min-width: 769px) and (max-width: 1024px) {
  .feature-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 隐藏VitePress默认的hero部分 */
.VPHero {
  display: none !important;
}

/* 移除默认特性部分 */
.VPFeatures {
  display: none !important;
}

/* 深色模式时的整体背景 */
.dark body {
  background-color: #1a1a1a;
}
</style>
