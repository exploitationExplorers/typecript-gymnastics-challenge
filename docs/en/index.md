---
layout: home
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

<div class="home-content">
  <h1 class="main-title">TypeScript <span class="pink-text">Challenges</span></h1>
  <h2 class="sub-title">Master TypeScript Type System</h2>
  <p class="description">Learn advanced TypeScript types through practice</p>

  <div class="action-buttons">
    <a href="/easy/implement-pick" class="action-button primary">Start Learning</a>
    <a href="/common/type-equality" class="action-button secondary">Common Techniques</a>
  </div>

  <div class="feature-container">
    <div class="feature-item">
      <h3>Comprehensive Content</h3>
      <p>Master the TypeScript type system with a comprehensive set of exercises and examples</p>
    </div>
    <div class="feature-item">
      <h3>Progressive Learning</h3>
      <p>Challenges range from simple to complex, helping you gradually improve your TypeScript skills</p>
    </div>
    <div class="feature-item">
      <h3>In-depth Explanations</h3>
      <p>Each challenge comes with detailed explanations and step-by-step solutions</p>
    </div>
  </div>
</div>

<div class="content-section">
  <h1 class="section-title">TypeScript <span class="pink-text">Challenges</span></h1>

  <p>Welcome to the TypeScript Type Challenges collection! This site is designed to help you improve your understanding of TypeScript's type system through practical exercises.</p>

  <h2>Getting Started</h2>

  <p>If you're new to TypeScript types, start with the <a href="/easy/implement-pick">Easy Challenges</a> to build a solid foundation.</p>

  <h2>Challenge Levels</h2>

  <p>The challenges are organized by difficulty:</p>

  <ul class="challenge-list">
    <li><strong>Easy</strong>: Basic type manipulations</li>
    <li><strong>Medium</strong>: More advanced type operations</li>
    <li><strong>Hard</strong>: Complex type puzzles</li>
    <li><strong>Common</strong>: Useful techniques for everyday TypeScript development</li>
  </ul>
</div>

<div class="contribution-section">
  <h2>Contributing</h2>
  <p>This site is open source. Feel free to contribute in the following ways:</p>
  <p>Submit pull requests to add new challenges or improve existing ones through our <a href="https://github.com/your-username/typescript-challenges" class="github-link">GitHub repository</a>.</p>
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

.action-button.secondary:hover {
  background-color: #ececf0;
  transform: translateY(-2px);
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
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

.challenge-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

.challenge-list li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: var(--pink-primary);
  font-weight: bold;
  font-size: 1.2rem;
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
</style>
