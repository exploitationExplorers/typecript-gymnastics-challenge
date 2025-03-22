// 导入默认主题
import DefaultTheme from 'vitepress/theme';

// 导入自定义样式
import './custom.css';

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
    }
  }, 1000);
};

// 扩展默认主题
export default {
  ...DefaultTheme,
  enhanceApp({ app, router }) {
    // 页面加载后应用主题增强
    if (typeof window !== 'undefined') {
      // 在路由变化时重新应用主题增强
      router.onAfterRouteChanged = () => {
        enhanceAppearanceToggle();
      };

      // 初始页面加载时应用主题增强
      window.addEventListener('DOMContentLoaded', () => {
        enhanceAppearanceToggle();

        // 添加主题转换样式
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
      });
    }
  }
};
