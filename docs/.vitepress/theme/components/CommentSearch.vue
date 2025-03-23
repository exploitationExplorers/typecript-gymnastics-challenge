<template>
    <div class="comment-search" :class="{ 'dark-mode': isDarkMode }">
      <div class="search-header">
        <div class="search-input-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="search-icon">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" fill="currentColor"/>
          </svg>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="搜索评论内容或用户名..."
            class="search-input"
            @input="searchComments"
          />
          <button
            v-if="searchQuery"
            class="clear-button"
            @click="clearSearch"
            title="清除搜索"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" fill="currentColor"/>
            </svg>
          </button>
        </div>
  
        <div class="filters-dropdown">
          <button class="filter-button" @click="toggleFilters">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M14 14v6l-4 2v-8L4 5V3h16v2l-6 9zM6.404 5L12 13.394 17.596 5H6.404z" fill="currentColor"/>
            </svg>
            筛选
            <span class="filter-count" v-if="activeFiltersCount">{{ activeFiltersCount }}</span>
          </button>
  
          <div class="filters-panel" v-if="showFilters">
            <div class="filter-group">
              <div class="filter-title">排序方式</div>
              <div class="filter-options">
                <label class="filter-option">
                  <input type="radio" v-model="sortBy" value="newest" />
                  <span>最新</span>
                </label>
                <label class="filter-option">
                  <input type="radio" v-model="sortBy" value="oldest" />
                  <span>最早</span>
                </label>
                <label class="filter-option">
                  <input type="radio" v-model="sortBy" value="mostLiked" />
                  <span>最多点赞</span>
                </label>
              </div>
            </div>
  
            <div class="filter-group">
              <div class="filter-title">时间范围</div>
              <div class="filter-options">
                <label class="filter-option">
                  <input type="radio" v-model="timeFilter" value="all" />
                  <span>所有时间</span>
                </label>
                <label class="filter-option">
                  <input type="radio" v-model="timeFilter" value="day" />
                  <span>今天</span>
                </label>
                <label class="filter-option">
                  <input type="radio" v-model="timeFilter" value="week" />
                  <span>本周</span>
                </label>
                <label class="filter-option">
                  <input type="radio" v-model="timeFilter" value="month" />
                  <span>本月</span>
                </label>
              </div>
            </div>
  
            <div class="filter-group">
              <div class="filter-title">其他筛选</div>
              <div class="filter-options">
                <label class="filter-option">
                  <input type="checkbox" v-model="onlyLiked" />
                  <span>只看点赞</span>
                </label>
                <label class="filter-option">
                  <input type="checkbox" v-model="onlyWithLinks" />
                  <span>包含链接</span>
                </label>
                <label class="filter-option" v-if="userProfile">
                  <input type="checkbox" v-model="onlyCurrentUser" />
                  <span>我的评论</span>
                </label>
              </div>
            </div>
  
            <div class="filter-actions">
              <button class="filter-reset" @click="resetFilters">重置筛选</button>
              <button class="filter-apply" @click="applyFilters">应用</button>
            </div>
          </div>
        </div>
      </div>
  
      <div v-if="resultsCount !== null" class="search-results-info">
        <span>{{ resultsCount }} 条评论</span>
        <div v-if="activeFiltersCount" class="active-filters">
          <div v-for="(filter, index) in activeFiltersDisplay" :key="index" class="active-filter">
            {{ filter }}
            <span class="remove-filter" @click="removeFilter(filter)">×</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  import { useData } from 'vitepress';
  
  const props = defineProps({
    comments: {
      type: Array,
      default: () => []
    },
    userProfile: {
      type: Object,
      default: null
    }
  });
  
  const emit = defineEmits(['update:filtered-comments']);
  
  const { isDark } = useData();
  
  // 搜索和筛选状态
  const searchQuery = ref('');
  const showFilters = ref(false);
  const sortBy = ref('newest');
  const timeFilter = ref('all');
  const onlyLiked = ref(false);
  const onlyWithLinks = ref(false);
  const onlyCurrentUser = ref(false);
  const resultsCount = ref(null);
  
  // 是否为深色模式
  const isDarkMode = computed(() => {
    return isDark.value;
  });
  
  // 活跃筛选器计数
  const activeFiltersCount = computed(() => {
    let count = 0;
    if (sortBy.value !== 'newest') count++;
    if (timeFilter.value !== 'all') count++;
    if (onlyLiked.value) count++;
    if (onlyWithLinks.value) count++;
    if (onlyCurrentUser.value) count++;
    return count;
  });
  
  // 活跃筛选器显示
  const activeFiltersDisplay = computed(() => {
    const filters = [];
  
    if (sortBy.value === 'oldest') filters.push('按最早');
    else if (sortBy.value === 'mostLiked') filters.push('按最多点赞');
  
    if (timeFilter.value === 'day') filters.push('今天');
    else if (timeFilter.value === 'week') filters.push('本周');
    else if (timeFilter.value === 'month') filters.push('本月');
  
    if (onlyLiked.value) filters.push('只看点赞');
    if (onlyWithLinks.value) filters.push('包含链接');
    if (onlyCurrentUser.value) filters.push('我的评论');
  
    return filters;
  });
  
  // 监听评论变化，重新应用搜索和筛选
  watch(() => props.comments, () => {
    if (searchQuery.value || activeFiltersCount.value > 0) {
      applyFilters();
    } else {
      // 如果没有搜索或筛选，返回所有评论
      emit('update:filtered-comments', props.comments);
      resultsCount.value = props.comments.length;
    }
  }, { deep: true });
  
  // 监听搜索查询变化
  watch(searchQuery, () => {
    searchComments();
  });
  
  // 搜索评论
  const searchComments = () => {
    const query = searchQuery.value.toLowerCase().trim();
    if (!query && activeFiltersCount.value === 0) {
      // 如果没有搜索查询和筛选器，返回所有评论
      emit('update:filtered-comments', props.comments);
      resultsCount.value = props.comments.length;
      return;
    }
  
    let filteredComments = [...props.comments];
  
    // 应用搜索
    if (query) {
      filteredComments = filteredComments.filter(comment => {
        return (
          comment.text.toLowerCase().includes(query) ||
          comment.username.toLowerCase().includes(query)
        );
      });
    }
  
    // 应用筛选
    filteredComments = applyFiltersToComments(filteredComments);
  
    // 更新结果
    emit('update:filtered-comments', filteredComments);
    resultsCount.value = filteredComments.length;
  };
  
  // 应用所有筛选
  const applyFilters = () => {
    showFilters.value = false;
    searchComments();
  };
  
  // 将筛选应用到评论列表
  const applyFiltersToComments = (comments) => {
    let filtered = [...comments];
  
    // 应用时间筛选
    if (timeFilter.value !== 'all') {
      const now = new Date();
      let cutoffDate = new Date();
  
      if (timeFilter.value === 'day') {
        cutoffDate.setDate(now.getDate() - 1);
      } else if (timeFilter.value === 'week') {
        cutoffDate.setDate(now.getDate() - 7);
      } else if (timeFilter.value === 'month') {
        cutoffDate.setMonth(now.getMonth() - 1);
      }
  
      filtered = filtered.filter(comment => {
        const commentDate = new Date(comment.timestamp);
        return commentDate >= cutoffDate;
      });
    }
  
    // 应用点赞筛选
    if (onlyLiked.value) {
      filtered = filtered.filter(comment => comment.likes > 0);
    }
  
    // 应用链接筛选
    if (onlyWithLinks.value) {
      filtered = filtered.filter(comment => {
        return comment.text.includes('http://') ||
               comment.text.includes('https://') ||
               comment.text.includes('](');
      });
    }
  
    // 应用当前用户筛选
    if (onlyCurrentUser.value && props.userProfile) {
      filtered = filtered.filter(comment =>
        comment.username.toLowerCase() === props.userProfile.username.toLowerCase()
      );
    }
  
    // 应用排序
    if (sortBy.value === 'newest') {
      filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } else if (sortBy.value === 'oldest') {
      filtered.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    } else if (sortBy.value === 'mostLiked') {
      filtered.sort((a, b) => b.likes - a.likes);
    }
  
    return filtered;
  };
  
  // 切换筛选面板显示
  const toggleFilters = () => {
    showFilters.value = !showFilters.value;
  };
  
  // 清除搜索
  const clearSearch = () => {
    searchQuery.value = '';
    searchComments();
  };
  
  // 重置所有筛选
  const resetFilters = () => {
    sortBy.value = 'newest';
    timeFilter.value = 'all';
    onlyLiked.value = false;
    onlyWithLinks.value = false;
    onlyCurrentUser.value = false;
  
    // 立即应用重置的筛选
    applyFilters();
  };
  
  // 移除单个筛选器
  const removeFilter = (filter) => {
    if (filter === '按最早' || filter === '按最多点赞') {
      sortBy.value = 'newest';
    } else if (['今天', '本周', '本月'].includes(filter)) {
      timeFilter.value = 'all';
    } else if (filter === '只看点赞') {
      onlyLiked.value = false;
    } else if (filter === '包含链接') {
      onlyWithLinks.value = false;
    } else if (filter === '我的评论') {
      onlyCurrentUser.value = false;
    }
  
    // 立即应用更新后的筛选
    applyFilters();
  };
  </script>
  
  <style scoped>
  .comment-search {
    margin-bottom: 1.5rem;
  }
  
  .search-header {
    display: flex;
    gap: 0.5rem;
  }
  
  .search-input-container {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
  }
  
  .search-icon {
    position: absolute;
    left: 0.75rem;
    width: 16px;
    height: 16px;
    color: #9ca3af;
  }
  
  .search-input {
    width: 100%;
    padding: 0.625rem 2.5rem 0.625rem 2.25rem;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    background-color: white;
    color: #111827;
    font-size: 0.875rem;
    transition: all 0.2s;
  }
  
  .dark-mode .search-input {
    background-color: #333;
    border-color: #444;
    color: #e5e7eb;
  }
  
  .search-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
  
  .clear-button {
    position: absolute;
    right: 0.75rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #9ca3af;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
  
  .clear-button:hover {
    color: #6b7280;
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  .dark-mode .clear-button:hover {
    color: #d1d5db;
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .filters-dropdown {
    position: relative;
  }
  
  .filter-button {
    height: 100%;
    padding: 0.625rem 1rem;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    background-color: white;
    color: #6b7280;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }
  
  .dark-mode .filter-button {
    background-color: #333;
    border-color: #444;
    color: #9ca3af;
  }
  
  .filter-button:hover {
    border-color: #3b82f6;
    color: #3b82f6;
  }
  
  .dark-mode .filter-button:hover {
    border-color: #3b82f6;
    color: #60a5fa;
  }
  
  .filter-count {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #3b82f6;
    color: white;
    border-radius: 9999px;
    min-width: 18px;
    height: 18px;
    font-size: 0.75rem;
    padding: 0 4px;
  }
  
  .filters-panel {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    width: 260px;
    background-color: white;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 10;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .dark-mode .filters-panel {
    background-color: #262626;
    border-color: #444;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .filter-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: #4b5563;
  }
  
  .dark-mode .filter-title {
    color: #9ca3af;
  }
  
  .filter-options {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .filter-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #6b7280;
    cursor: pointer;
    user-select: none;
  }
  
  .dark-mode .filter-option {
    color: #d1d5db;
  }
  
  .filter-option input {
    cursor: pointer;
  }
  
  .filter-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid #e5e7eb;
  }
  
  .dark-mode .filter-actions {
    border-color: #444;
  }
  
  .filter-reset, .filter-apply {
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .filter-reset {
    background-color: #f3f4f6;
    color: #4b5563;
    border: 1px solid #d1d5db;
  }
  
  .dark-mode .filter-reset {
    background-color: #333;
    border-color: #444;
    color: #9ca3af;
  }
  
  .filter-reset:hover {
    background-color: #e5e7eb;
  }
  
  .dark-mode .filter-reset:hover {
    background-color: #444;
  }
  
  .filter-apply {
    background-color: #3b82f6;
    color: white;
    border: none;
  }
  
  .filter-apply:hover {
    background-color: #2563eb;
  }
  
  .search-results-info {
    margin-top: 0.75rem;
    font-size: 0.875rem;
    color: #6b7280;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }
  
  .dark-mode .search-results-info {
    color: #9ca3af;
  }
  
  .active-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .active-filter {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background-color: #f3f4f6;
    color: #4b5563;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
  }
  
  .dark-mode .active-filter {
    background-color: #333;
    color: #d1d5db;
  }
  
  .remove-filter {
    cursor: pointer;
    font-weight: bold;
  }
  
  .remove-filter:hover {
    color: #ef4444;
  }
  
  @media (max-width: 640px) {
    .search-header {
      flex-direction: column;
    }
  
    .filters-panel {
      width: 100%;
      left: 0;
      right: 0;
    }
  }
  </style>
  