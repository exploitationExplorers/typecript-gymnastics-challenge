// 导入默认主题
import DefaultTheme from 'vitepress/theme';
// 导入 Vue 组件
import { h, nextTick, createApp } from 'vue';

// 导入自定义组件
import ThemeColorPicker from './components/ThemeColorPicker.vue';
import CommentSection from './components/CommentSection.vue';

// 导入自定义样式
import './custom.css';

// 设置默认模式为深色模式
const prefersDark = () => {
  if (typeof window === 'undefined') return true;
  // 检查localStorage中是否有保存的主题设置
  const stored = localStorage.getItem('vitepress-theme-appearance');
  if (stored) {
    return stored === 'dark';
  }
  // 否则默认使用深色模式
  return true;
};

// 应用深色模式
const applyDarkMode = () => {
  if (typeof document === 'undefined') return;

  const isDark = prefersDark();
  if (isDark) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('vitepress-theme-appearance', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('vitepress-theme-appearance', 'light');
  }
};

// 向文档中注入主题切换增强脚本
const enhanceAppearanceToggle = () => {
  if (typeof window === 'undefined') return;

  // 添加延迟，确保DOM已经完全加载
  setTimeout(() => {
    // 获取原始主题切换按钮，增强其行为
    const originalToggle = document.querySelector('.VPSwitchAppearance');
    if (originalToggle) {
      // 为主题切换添加动画效果
      originalToggle.addEventListener('click', () => {
        document.documentElement.classList.add('theme-transition');
        setTimeout(() => {
          document.documentElement.classList.remove('theme-transition');
        }, 600);
      });

      // 默认隐藏原始主题切换按钮 (可选，取决于是否完全替换)
      // originalToggle.style.display = 'none';
    }
  }, 1000);
};

// 添加评论组件到文章页面
const enhanceWithComments = () => {
  if (typeof window === 'undefined') return;

  // 确保页面已完全加载
  nextTick(() => {
    // 查找可能的挑战页面 - 根据内容结构判断
    const contentContainer = document.querySelector('.VPDoc .content-container .content');

    if (contentContainer) {
      // 确保只在实际的挑战页面添加评论
      const isChallengePage =
        // 检查是否在挑战相关的路径
        window.location.pathname.includes('/easy/') ||
        window.location.pathname.includes('/medium/') ||
        window.location.pathname.includes('/hard/') ||
        window.location.pathname.includes('/common/');

      if (isChallengePage) {
        // 创建评论节点容器
        const commentsContainer = document.createElement('div');
        commentsContainer.className = 'challenge-comments-container';

        // 添加到内容区域底部
        contentContainer.appendChild(commentsContainer);

        // 渲染评论组件
        const commentApp = createApp(CommentSection);
        commentApp.mount(commentsContainer);
      }
    }
  });
};

// 扩展默认主题
export default {
  ...DefaultTheme,

  // 扩展默认主题布局
  Layout() {
    // 使用默认主题布局，但添加我们的自定义组件
    return h(DefaultTheme.Layout, null, {
      // 在导航栏末尾插入颜色选择器组件
      'nav-bar-content-after': () => h(ThemeColorPicker),

      // 在文档末尾插入评论组件
      'doc-after': () => h(CommentSection)
    });
  },

  // 增强应用
  enhanceApp({ app, router }) {
    // 注册自定义组件
    app.component('ThemeColorPicker', ThemeColorPicker);
    app.component('CommentSection', CommentSection);

    // 页面加载后应用主题增强
    if (typeof window !== 'undefined') {
      // 初始应用暗色模式
      applyDarkMode();

      // 在路由变化时重新应用主题增强
      router.onAfterRouteChanged = () => {
        enhanceAppearanceToggle();
        updateSyntaxHighlightingAndLineNumbers();
        enhanceWithComments(); // 添加评论组件
      };

      // 初始页面加载时应用主题增强
      window.addEventListener('DOMContentLoaded', () => {
        enhanceAppearanceToggle();
        updateSyntaxHighlightingAndLineNumbers();
        enhanceWithComments(); // 添加评论组件

        // 添加主题过渡效果样式
        const style = document.createElement('style');
        style.textContent = `
          .theme-transition,
          .theme-transition * {
            transition: background-color 0.3s ease,
                        color 0.3s ease,
                        border-color 0.3s ease !important;
          }
        `;
        document.head.appendChild(style);

        // 恢复之前保存的主题色
        const savedThemeColor = localStorage.getItem('vitepress-theme-color');
        if (savedThemeColor) {
          document.documentElement.classList.add(`theme-${savedThemeColor}`);
        }
      });
    }
  }
};

// 为代码块添加行号和语法高亮增强
function updateSyntaxHighlightingAndLineNumbers() {
  if (typeof window === 'undefined') return;

  // 延迟执行以确保DOM已加载
  setTimeout(() => {
    // 查找所有代码块
    const codeBlocks = document.querySelectorAll('div[class*="language-"] pre code');

    codeBlocks.forEach(codeBlock => {
      // 如果已经处理过，跳过
      if (codeBlock.classList.contains('line-numbers-added')) return;

      // 标记为已处理
      codeBlock.classList.add('line-numbers-added');

      // 分割代码为行并添加行包装器
      const content = codeBlock.innerHTML.trim();
      const lines = content.split('\n');

      let newContent = '';
      lines.forEach((line, index) => {
        // 创建包含行号的行
        newContent += `<span class="line">${line}</span>\n`;
      });

      // 更新代码块内容
      codeBlock.innerHTML = newContent;

      // 添加TypeScript Playground链接（仅对TypeScript代码块）
      const parentDiv = codeBlock.closest('div[class*="language-"]');

      if (parentDiv && (
        parentDiv.classList.contains('language-ts') ||
        parentDiv.classList.contains('language-typescript')
      )) {
        const code = codeBlock.textContent;

        // 创建"在TypeScript Playground中尝试"按钮
        const playgroundButton = document.createElement('button');
        playgroundButton.className = 'playground-button';
        playgroundButton.textContent = '在Playground中打开';
        playgroundButton.title = '在TypeScript Playground中打开此代码';

        // 点击时在新窗口中打开TypeScript Playground
        playgroundButton.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();

          // 构造TypeScript Playground URL
          const encodedCode = encodeURIComponent(code);
          const playgroundUrl = `https://www.typescriptlang.org/play?#code/${encodedCode}`;

          // 在新窗口中打开
          window.open(playgroundUrl, '_blank');
        });

        // 将按钮添加到代码块
        parentDiv.appendChild(playgroundButton);

        // 为有按钮的代码块添加样式
        parentDiv.classList.add('has-playground-button');

        // 添加按钮的CSS
        if (!document.getElementById('playground-button-styles')) {
          const style = document.createElement('style');
          style.id = 'playground-button-styles';
          style.textContent = `
            .has-playground-button {
              padding-bottom: 40px !important;
              position: relative;
            }

            .playground-button {
              position: absolute;
              bottom: 8px;
              right: 8px;
              background-color: var(--ts-pink, #ec4899);
              color: white;
              border: none;
              border-radius: 4px;
              padding: 6px 12px;
              font-size: 12px;
              cursor: pointer;
              transition: background-color 0.2s, transform 0.2s;
              opacity: 0.8;
            }

            .playground-button:hover {
              opacity: 1;
              transform: translateY(-2px);
              background-color: var(--ts-pink-light, #f472b6);
            }
          `;
          document.head.appendChild(style);
        }
      }
    });
  }, 1000);
}
