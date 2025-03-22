<template>
  <div class="theme-color-picker">
    <button
      class="theme-color-toggle"
      @click="toggleColorPalette"
      :title="pickerTitle"
    >
      <span class="current-color" :style="{ backgroundColor: currentColor }"></span>
      <span class="toggle-icon">▼</span>
    </button>
    <div class="color-palette" :class="{ open: isOpen }">
      <div class="theme-mode-selector">
        <button
          class="theme-mode-button"
          :class="{ active: !isDark }"
          @click="setThemeMode('light')"
          title="切换到浅色模式"
        >
          ☀️
        </button>
        <button
          class="theme-mode-button"
          :class="{ active: isDark }"
          @click="setThemeMode('dark')"
          title="切换到深色模式"
        >
          🌙
        </button>
      </div>
      <div class="color-grid">
        <button
          v-for="(color, name) in themeColors"
          :key="name"
          class="color-option"
          :class="{ active: currentTheme === name }"
          :style="{ backgroundColor: color.base }"
          :title="colorTitles[name]"
          @click="setThemeColor(name)"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useData } from 'vitepress';

const { isDark } = useData();
const isOpen = ref(false);
const currentTheme = ref('pink'); // 默认主题为粉色

// 定义主题颜色
const themeColors = {
  typescript: { base: '#3178c6', light: '#4d8ddd', dark: '#265d9c' },
  rust: { base: '#f74c00', light: '#ff6a1f', dark: '#c54100' },
  react: { base: '#61dafb', light: '#7ee3ff', dark: '#39a7c9' },
  vue: { base: '#42b883', light: '#5accaa', dark: '#33a06f' },
  purple: { base: '#7e57c2', light: '#9575cd', dark: '#673ab7' },
  pink: { base: '#ec4899', light: '#f472b6', dark: '#db2777' },
};

// 定义颜色名称（多语言支持）
const colorTitles = {
  typescript: 'TypeScript 蓝',
  rust: 'Rust 橙',
  react: 'React 蓝',
  vue: 'Vue 绿',
  purple: '紫色',
  pink: '粉色',
};

// 计算当前颜色
const currentColor = computed(() => {
  const theme = themeColors[currentTheme.value];
  return isDark.value ? theme.light : theme.base;
});

// 计算选择器标题
const pickerTitle = computed(() => {
  return '选择主题颜色';
});

// 切换颜色面板
const toggleColorPalette = () => {
  isOpen.value = !isOpen.value;
  // 点击外部关闭面板
  if (isOpen.value) {
    setTimeout(() => {
      document.addEventListener('click', closeOnClickOutside);
    }, 10);
  } else {
    document.removeEventListener('click', closeOnClickOutside);
  }
};

// 点击外部关闭面板
const closeOnClickOutside = (event) => {
  const picker = event.target.closest('.theme-color-picker');
  if (!picker) {
    isOpen.value = false;
    document.removeEventListener('click', closeOnClickOutside);
  }
};

// 设置主题颜色
const setThemeColor = (themeName) => {
  currentTheme.value = themeName;
  applyThemeColor(themeName);
  isOpen.value = false;
};

// 设置深色/浅色模式
const setThemeMode = (mode) => {
  document.documentElement.classList.toggle('dark', mode === 'dark');
  localStorage.setItem('vitepress-theme-appearance', mode);
};

// 应用主题颜色到CSS变量
const applyThemeColor = (themeName) => {
  const theme = themeColors[themeName];
  const root = document.documentElement;

  // 存储当前主题名称
  localStorage.setItem('vitepress-theme-color', themeName);

  // 清除所有主题类
  Object.keys(themeColors).forEach(name => {
    root.classList.remove(`theme-${name}`);
  });

  // 添加选中的主题类
  root.classList.add(`theme-${themeName}`);

  // 添加颜色过渡效果
  root.classList.add('theme-color-transition');
  setTimeout(() => {
    root.classList.remove('theme-color-transition');
  }, 600);
};

// 初始化
onMounted(() => {
  // 从 localStorage 恢复上次选择的主题颜色
  const savedTheme = localStorage.getItem('vitepress-theme-color') || 'pink';
  if (themeColors[savedTheme]) {
    currentTheme.value = savedTheme;
    applyThemeColor(savedTheme);
  }

  // 确保应用深色模式
  if (isDark.value) {
    document.documentElement.classList.add('dark');
  }
});
</script>

<style scoped>
.theme-color-picker {
  position: relative;
  margin-right: 8px;
  z-index: 20;
}

.theme-color-toggle {
  display: flex;
  align-items: center;
  background: none;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 4px 8px;
  cursor: pointer;
  transition: all 0.25s;
}

.theme-color-toggle:hover {
  border-color: var(--ts-pink, #ec4899);
  transform: scale(1.05);
}

.current-color {
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  margin-right: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.toggle-icon {
  font-size: 10px;
  opacity: 0.7;
  transition: transform 0.2s;
}

.color-palette {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 200px;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 12px;
  opacity: 0;
  transform: translateY(-10px);
  visibility: hidden;
  transition: all 0.2s ease;
}

.dark .color-palette {
  background-color: #2a2a2a;
  border-color: #444;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.color-palette.open {
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 12px;
}

.color-option {
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.color-option:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.color-option.active {
  border-color: var(--vp-c-text-1);
  box-shadow: 0 0 0 2px var(--vp-c-bg), 0 0 0 4px var(--ts-pink, #ec4899);
}

.dark .color-option.active {
  border-color: white;
  box-shadow: 0 0 0 2px #2a2a2a, 0 0 0 4px var(--ts-pink-light, #f472b6);
}

.theme-mode-selector {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 12px;
}

.dark .theme-mode-selector {
  border-color: #444;
}

.theme-mode-button {
  background: none;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 6px 12px;
  margin: 0 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 16px;
}

.dark .theme-mode-button {
  border-color: #444;
}

.theme-mode-button:hover {
  background-color: var(--vp-c-bg-soft);
  transform: translateY(-2px);
}

.theme-mode-button.active {
  background-color: var(--ts-pink, #ec4899);
  border-color: var(--ts-pink, #ec4899);
  color: white;
}

.dark .theme-mode-button.active {
  background-color: var(--ts-pink-light, #f472b6);
  border-color: var(--ts-pink-light, #f472b6);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .color-palette {
    width: 180px;
    right: -10px;
  }

  .theme-color-toggle {
    padding: 3px 6px;
  }

  .current-color {
    width: 16px;
    height: 16px;
  }
}
</style>
