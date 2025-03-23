<template>
    <div class="bookmark-manager" :class="{ 'dark-mode': isDarkMode }">
      <div class="bookmark-header">
        <h3>收藏的评论 <span class="bookmark-count" v-if="bookmarks.length">{{ bookmarks.length }}</span></h3>
        <div class="bookmark-filters">
          <div class="category-filter">
            <select v-model="selectedCategory" class="category-select">
              <option value="">全部分类</option>
              <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
            </select>
          </div>
        </div>
      </div>
  
      <div class="bookmarks-list" v-if="filteredBookmarks.length">
        <div v-for="(bookmark, index) in filteredBookmarks" :key="bookmark.id" class="bookmark-item">
          <div class="bookmark-content">
            <div class="bookmark-meta">
              <div class="user-info">
                <div class="user-avatar" :style="{ backgroundColor: generateAvatarColor(bookmark.username) }">
                  {{ bookmark.username.charAt(0).toUpperCase() }}
                </div>
                <span class="username">{{ bookmark.username }}</span>
              </div>
              <div class="bookmark-category" :style="{ backgroundColor: getCategoryColor(bookmark.category) }">
                {{ bookmark.category || '未分类' }}
              </div>
            </div>
            <div class="bookmark-text" v-html="formatText(bookmark.text)"></div>
            <div class="bookmark-footer">
              <div class="bookmark-time">{{ formatDate(bookmark.timestamp) }}</div>
              <div class="bookmark-page">{{ getPageTitle(bookmark.pagePath) }}</div>
            </div>
          </div>
          <div class="bookmark-actions">
            <button class="view-button" @click="navigateToComment(bookmark)">查看</button>
            <div class="category-dropdown">
              <button class="category-button" @click="toggleCategoryMenu(index)">
                <span>分类</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" class="dropdown-icon">
                  <path d="M12 16l-6-6h12z" fill="currentColor"/>
                </svg>
              </button>
              <div class="category-menu" v-if="activeCategoryMenuIndex === index">
                <div
                  v-for="category in ['有用', '收藏', '稍后查看', '重要']"
                  :key="category"
                  class="category-option"
                  @click="setCategory(index, category)"
                >
                  {{ category }}
                </div>
                <div class="category-option new-category">
                  <input
                    type="text"
                    v-model="newCategoryInput"
                    @keydown.enter="addNewCategory(index)"
                    placeholder="添加新分类..."
                    class="new-category-input"
                  />
                  <button class="add-category-btn" @click="addNewCategory(index)">添加</button>
                </div>
              </div>
            </div>
            <button class="remove-button" @click="removeBookmark(index)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
  
      <div v-else class="no-bookmarks">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" class="empty-icon">
          <path fill="none" d="M0 0h24v24H0z"/>
          <path d="M5 2h14a1 1 0 0 1 1 1v19.143a.5.5 0 0 1-.766.424L12 18.03l-7.234 4.536A.5.5 0 0 1 4 22.143V3a1 1 0 0 1 1-1zm13 2H6v15.432l6-3.761 6 3.761V4z" fill="currentColor"/>
        </svg>
        <p>暂无收藏的评论</p>
        <p class="bookmark-tip">在评论区点击收藏图标可以将评论加入收藏</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue';
  import { useData, useRouter } from 'vitepress';
  import * as marked from 'marked';
  
  // 使用VitePress提供的dark模式状态
  const { isDark } = useData();
  const router = useRouter();
  
  // 收藏状态
  const bookmarks = ref([]);
  const selectedCategory = ref('');
  const activeCategoryMenuIndex = ref(-1);
  const newCategoryInput = ref('');
  
  // 是否为深色模式
  const isDarkMode = computed(() => {
    return isDark.value;
  });
  
  // 筛选后的书签
  const filteredBookmarks = computed(() => {
    if (!selectedCategory.value) {
      return bookmarks.value;
    }
    return bookmarks.value.filter(bookmark => bookmark.category === selectedCategory.value);
  });
  
  // 所有已有的分类
  const categories = computed(() => {
    const categorySet = new Set();
    bookmarks.value.forEach(bookmark => {
      if (bookmark.category) {
        categorySet.add(bookmark.category);
      }
    });
    return Array.from(categorySet);
  });
  
  // 加载收藏
  const loadBookmarks = () => {
    const savedBookmarks = localStorage.getItem('ts-challenge-bookmarks');
    if (savedBookmarks) {
      bookmarks.value = JSON.parse(savedBookmarks);
    }
  };
  
  // 保存收藏
  const saveBookmarks = () => {
    localStorage.setItem('ts-challenge-bookmarks', JSON.stringify(bookmarks.value));
  };
  
  // 移除收藏
  const removeBookmark = (index) => {
    bookmarks.value.splice(index, 1);
    saveBookmarks();
  };
  
  // 设置分类
  const setCategory = (index, category) => {
    bookmarks.value[index].category = category;
    saveBookmarks();
    activeCategoryMenuIndex.value = -1;
  };
  
  // 新增分类
  const addNewCategory = (index) => {
    if (newCategoryInput.value.trim()) {
      bookmarks.value[index].category = newCategoryInput.value.trim();
      saveBookmarks();
      newCategoryInput.value = '';
      activeCategoryMenuIndex.value = -1;
    }
  };
  
  // 切换分类菜单显示状态
  const toggleCategoryMenu = (index) => {
    activeCategoryMenuIndex.value = activeCategoryMenuIndex.value === index ? -1 : index;
  };
  
  // 获取页面标题
  const getPageTitle = (path) => {
    // 从路径中提取页面标题
    if (!path) return '未知页面';
  
    const pathParts = path.split('/');
    let pageName = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2];
  
    // 移除扩展名和特殊字符
    pageName = pageName.replace(/\.html$/, '').replace(/-/g, ' ');
  
    // 首字母大写
    return pageName.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // 生成分类颜色
  const getCategoryColor = (category) => {
    if (!category) return '#9ca3af';
  
    const categoryColors = {
      '有用': '#10b981',
      '收藏': '#3b82f6',
      '稍后查看': '#8b5cf6',
      '重要': '#ef4444'
    };
  
    return categoryColors[category] || '#f59e0b';
  };
  
  // 导航到评论原页面
  const navigateToComment = (bookmark) => {
    if (bookmark.pagePath) {
      router.go(bookmark.pagePath);
    }
  };
  
  // 生成头像颜色
  const generateAvatarColor = (name) => {
    if (!name) return '#7e57c2';
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
      '#ec4899', '#f97316', '#8b5cf6', '#06b6d4', '#10b981',
      '#3b82f6', '#f43f5e', '#14b8a6', '#8b5cf6', '#a855f7'
    ];
    return colors[Math.abs(hash) % colors.length];
  };
  
  // 格式化文本
  const formatText = (text) => {
    if (!text) return '';
  
    // 处理@用户名
    text = text.replace(/@(\w+)/g, '<span class="mention">@$1</span>');
  
    // 使用marked处理Markdown
    let html = marked.parse(text);
  
    // 安全处理
    html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
    return html;
  };
  
  // 格式化时间显示
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
  
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // 秒数差
  
    if (diff < 60) {
      return '刚刚';
    } else if (diff < 3600) {
      return `${Math.floor(diff / 60)}分钟前`;
    } else if (diff < 86400) {
      return `${Math.floor(diff / 3600)}小时前`;
    } else if (diff < 2592000) {
      return `${Math.floor(diff / 86400)}天前`;
    } else {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    }
  };
  
  // 初始化时加载收藏
  onMounted(() => {
    loadBookmarks();
  });
  
  // 暴露方法给父组件
  defineExpose({
    addBookmark: (comment) => {
      // 检查是否已经收藏过
      const existingIndex = bookmarks.value.findIndex(b =>
        b.id === comment.id ||
        (b.text === comment.text && b.username === comment.username)
      );
  
      if (existingIndex >= 0) {
        // 已收藏过，提示或更新分类
        return false;
      }
  
      // 添加新收藏
      const bookmark = {
        ...comment,
        id: comment.id || Date.now(),
        bookmarkedAt: new Date().toISOString(),
        category: ''
      };
  
      bookmarks.value.unshift(bookmark);
      saveBookmarks();
      return true;
    },
  
    removeBookmarkById: (id) => {
      const index = bookmarks.value.findIndex(b => b.id === id);
      if (index >= 0) {
        bookmarks.value.splice(index, 1);
        saveBookmarks();
        return true;
      }
      return false;
    }
  });
  </script>
  
  <style scoped>
  .bookmark-manager {
    background-color: white;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #e5e7eb;
    margin-bottom: 2rem;
  }
  
  .dark-mode {
    background-color: #1e1e1e;
    border-color: #333;
  }
  
  .bookmark-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background-color: #f3f4f6;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .dark-mode .bookmark-header {
    background-color: #262626;
    border-color: #333;
  }
  
  .bookmark-header h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: #111827;
    display: flex;
    align-items: center;
  }
  
  .dark-mode .bookmark-header h3 {
    color: #f3f4f6;
  }
  
  .bookmark-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: #3b82f6;
    color: white;
    border-radius: 9999px;
    min-width: 1.5rem;
    height: 1.5rem;
    padding: 0 0.4rem;
    font-size: 0.75rem;
    margin-left: 0.5rem;
  }
  
  .bookmark-filters {
    display: flex;
    align-items: center;
  }
  
  .category-select {
    padding: 0.3rem 0.5rem;
    border-radius: 6px;
    border: 1px solid #d1d5db;
    background-color: white;
    color: #374151;
    font-size: 0.75rem;
    cursor: pointer;
  }
  
  .dark-mode .category-select {
    background-color: #333;
    border-color: #444;
    color: #e5e7eb;
  }
  
  .bookmarks-list {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .bookmark-item {
    background-color: #f9fafb;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    padding: 1rem;
    display: flex;
    position: relative;
  }
  
  .dark-mode .bookmark-item {
    background-color: #262626;
    border-color: #333;
  }
  
  .bookmark-content {
    flex: 1;
  }
  
  .bookmark-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }
  
  .user-info {
    display: flex;
    align-items: center;
  }
  
  .user-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.875rem;
    margin-right: 0.5rem;
  }
  
  .username {
    font-weight: 600;
    font-size: 0.875rem;
    color: #374151;
  }
  
  .dark-mode .username {
    color: #e5e7eb;
  }
  
  .bookmark-category {
    font-size: 0.7rem;
    padding: 0.2rem 0.5rem;
    border-radius: 9999px;
    color: white;
    font-weight: 500;
  }
  
  .bookmark-text {
    font-size: 0.875rem;
    line-height: 1.5;
    color: #374151;
    margin-bottom: 0.75rem;
    word-break: break-word;
  }
  
  .dark-mode .bookmark-text {
    color: #d1d5db;
  }
  
  .bookmark-text :deep(p) {
    margin: 0.4rem 0;
  }
  
  .bookmark-text :deep(code) {
    background-color: rgba(0, 0, 0, 0.05);
    padding: 0.125rem 0.25rem;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.8125rem;
  }
  
  .dark-mode .bookmark-text :deep(code) {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .bookmark-text :deep(.mention) {
    color: #3b82f6;
    font-weight: 600;
  }
  
  .bookmark-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
    color: #6b7280;
  }
  
  .bookmark-page {
    padding: 0.2rem 0.4rem;
    background-color: #f3f4f6;
    border-radius: 4px;
  }
  
  .dark-mode .bookmark-page {
    background-color: #333;
  }
  
  .bookmark-actions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-left: 1rem;
  }
  
  .view-button, .category-button, .remove-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.3rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .view-button {
    color: #3b82f6;
    background-color: rgba(59, 130, 246, 0.1);
  }
  
  .view-button:hover {
    background-color: rgba(59, 130, 246, 0.2);
  }
  
  .category-button {
    color: #10b981;
    background-color: rgba(16, 185, 129, 0.1);
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  
  .category-button:hover {
    background-color: rgba(16, 185, 129, 0.2);
  }
  
  .dropdown-icon {
    margin-left: 0.25rem;
  }
  
  .remove-button {
    color: #ef4444;
    background-color: rgba(239, 68, 68, 0.1);
  }
  
  .remove-button:hover {
    background-color: rgba(239, 68, 68, 0.2);
  }
  
  .category-dropdown {
    position: relative;
  }
  
  .category-menu {
    position: absolute;
    right: 0;
    top: calc(100% + 5px);
    background-color: white;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    min-width: 150px;
    z-index: 10;
  }
  
  .dark-mode .category-menu {
    background-color: #262626;
    border-color: #444;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
  }
  
  .category-option {
    padding: 0.5rem 0.75rem;
    font-size: 0.8125rem;
    cursor: pointer;
    color: #374151;
    transition: background-color 0.2s;
  }
  
  .dark-mode .category-option {
    color: #e5e7eb;
  }
  
  .category-option:hover {
    background-color: #f3f4f6;
  }
  
  .dark-mode .category-option:hover {
    background-color: #333;
  }
  
  .new-category {
    border-top: 1px solid #e5e7eb;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
  }
  
  .dark-mode .new-category {
    border-color: #444;
  }
  
  .new-category-input {
    padding: 0.3rem 0.5rem;
    border-radius: 4px;
    border: 1px solid #d1d5db;
    font-size: 0.8125rem;
    margin-bottom: 0.3rem;
  }
  
  .dark-mode .new-category-input {
    background-color: #333;
    border-color: #444;
    color: #e5e7eb;
  }
  
  .add-category-btn {
    background-color: #10b981;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.3rem;
    font-size: 0.75rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .add-category-btn:hover {
    background-color: #059669;
  }
  
  .no-bookmarks {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #6b7280;
    text-align: center;
  }
  
  .empty-icon {
    color: #9ca3af;
    margin-bottom: 1rem;
  }
  
  .dark-mode .empty-icon {
    color: #6b7280;
  }
  
  .bookmark-tip {
    font-size: 0.75rem;
    color: #9ca3af;
    margin-top: 0.5rem;
  }
  
  @media (max-width: 640px) {
    .bookmark-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
  
    .bookmark-filters {
      width: 100%;
    }
  
    .category-select {
      width: 100%;
    }
  
    .bookmark-item {
      flex-direction: column;
    }
  
    .bookmark-actions {
      flex-direction: row;
      margin-left: 0;
      margin-top: 0.75rem;
    }
  }
  </style>
  