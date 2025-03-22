import enConfig from './i18n/en.js';
import zhConfig from './i18n/zh.js';

// 根据系统语言决定默认语言，默认使用中文
const userLanguage = typeof navigator !== 'undefined'
  ? navigator.language
  : 'zh-CN';
const defaultLang = userLanguage.startsWith('zh') ? 'zh' : 'en';

// 获取对应语言的配置
const getConfig = (lang) => {
  return lang === 'zh' ? zhConfig : enConfig;
};

// 合并特定语言配置和通用配置
const mergeConfig = (lang) => {
  const langConfig = getConfig(lang);

  return {
    lang: lang === 'zh' ? 'zh-CN' : 'en-US',
    title: langConfig.title,
    description: langConfig.description,

    // 启用深色模式选项
    appearance: true,

    // 基本配置
    themeConfig: {
      // 从语言配置中获取标题、导航等
      ...langConfig.themeConfig,

      // Logo 保持不变
      logo: '/logo.svg',

      // 添加语言切换
      nav: [
        ...langConfig.themeConfig.nav,
        {
          text: lang === 'zh' ? '切换语言' : 'Language',
          items: [
            { text: '中文', link: '/zh/' },
            { text: 'English', link: '/en/' }
          ]
        },
        {
          text: 'GitHub',
          link: 'https://github.com/your-username/typescript-challenges'
        }
      ],

      // 外观切换配置
      darkModeSwitchLabel: lang === 'zh' ? '外观' : 'Appearance',
      lightModeSwitchTitle: lang === 'zh' ? '切换到深色模式' : 'Switch to dark mode',
      darkModeSwitchTitle: lang === 'zh' ? '切换到浅色模式' : 'Switch to light mode',

      // 社交链接
      socialLinks: [
        { icon: 'github', link: 'https://github.com/your-username/typescript-challenges' }
      ]
    }
  };
};

// 导出配置工厂函数
export default {
  // 使用默认语言配置
  ...mergeConfig(defaultLang),

  // 多语言支持
  locales: {
    '/': mergeConfig(defaultLang),
    '/zh/': mergeConfig('zh'),
    '/en/': mergeConfig('en')
  }
};
