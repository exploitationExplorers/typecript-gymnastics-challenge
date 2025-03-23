<template>
    <div class="notifications-container" v-if="notifications.length > 0" :class="{ 'dark-mode': isDarkMode }">
      <div class="notifications-header">
        <h3>通知 <span class="notification-count">{{ notifications.length }}</span></h3>
        <button class="clear-all" @click="clearAllNotifications">清除全部</button>
      </div>
      <transition-group name="notification-list" tag="div" class="notifications-list">
        <div
          v-for="(notification, index) in notifications"
          :key="notification.id"
          class="notification-item"
          :class="{ 'unread': !notification.read }"
        >
          <div class="notification-avatar" :style="{ backgroundColor: generateAvatarColor(notification.sender) }">
            {{ notification.sender.charAt(0).toUpperCase() }}
          </div>
          <div class="notification-content">
            <div class="notification-text">
              <strong>{{ notification.sender }}</strong> 回复了您的评论: {{ truncateText(notification.text) }}
            </div>
            <div class="notification-time">{{ formatDate(notification.timestamp) }}</div>
          </div>
          <div class="notification-actions">
            <button class="view-button" @click="viewNotification(notification, index)">查看</button>
            <button class="dismiss-button" @click="dismissNotification(index)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </transition-group>
      <div v-if="notifications.length === 0" class="no-notifications">
        <p>暂无新通知</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue';
  import { useData, useRouter } from 'vitepress';
  
  // 使用VitePress提供的dark模式状态
  const { isDark } = useData();
  const router = useRouter();
  
  // 通知状态
  const notifications = ref([]);
  
  // 是否为深色模式
  const isDarkMode = computed(() => {
    return isDark.value;
  });
  
  // 加载通知
  const loadNotifications = () => {
    const savedNotifications = localStorage.getItem('ts-challenge-notifications');
    if (savedNotifications) {
      notifications.value = JSON.parse(savedNotifications);
    }
  };
  
  // 保存通知
  const saveNotifications = () => {
    localStorage.setItem('ts-challenge-notifications', JSON.stringify(notifications.value));
  };
  
  // 清除所有通知
  const clearAllNotifications = () => {
    notifications.value = [];
    saveNotifications();
  };
  
  // 从通知文本中提取页面路径
  const extractPathFromNotification = (notification) => {
    return notification.pagePath || '/';
  };
  
  // 查看通知详情
  const viewNotification = (notification, index) => {
    // 标记为已读
    notifications.value[index].read = true;
    saveNotifications();
  
    // 跳转到相关页面
    const path = extractPathFromNotification(notification);
    router.go(path);
  };
  
  // 关闭单个通知
  const dismissNotification = (index) => {
    notifications.value.splice(index, 1);
    saveNotifications();
  };
  
  // 截断通知文本
  const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
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
  
  // 初始化时加载通知
  onMounted(() => {
    loadNotifications();
  });
  
  // 导出方法，供其他组件调用
  defineExpose({
    addNotification: (notification) => {
      notification.id = Date.now();
      notification.read = false;
      notification.timestamp = new Date().toISOString();
      notifications.value.unshift(notification);
      saveNotifications();
    }
  });
  </script>
  
  <style scoped>
  .notifications-container {
    position: fixed;
    top: 60px;
    right: 20px;
    width: 320px;
    max-height: 400px;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    z-index: 100;
    border: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
  }
  
  .dark-mode {
    background-color: #1e1e1e;
    border-color: #333;
  }
  
  .notifications-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #e5e7eb;
    background-color: #f3f4f6;
  }
  
  .dark-mode .notifications-header {
    background-color: #262626;
    border-color: #333;
  }
  
  .notifications-header h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #111827;
    display: flex;
    align-items: center;
  }
  
  .dark-mode .notifications-header h3 {
    color: #f3f4f6;
  }
  
  .notification-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: #ec4899;
    color: white;
    border-radius: 9999px;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    font-size: 12px;
    margin-left: 8px;
  }
  
  .clear-all {
    background: none;
    border: none;
    color: #6b7280;
    font-size: 12px;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
  }
  
  .clear-all:hover {
    background-color: #f3f4f6;
    color: #111827;
  }
  
  .dark-mode .clear-all:hover {
    background-color: #333;
    color: #f3f4f6;
  }
  
  .notifications-list {
    overflow-y: auto;
    max-height: 350px;
    padding: 8px;
  }
  
  .notification-item {
    display: flex;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 8px;
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    transition: all 0.2s ease;
    position: relative;
  }
  
  .dark-mode .notification-item {
    background-color: #262626;
    border-color: #333;
  }
  
  .notification-item.unread {
    background-color: #f0f9ff;
    border-left: 3px solid #0ea5e9;
  }
  
  .dark-mode .notification-item.unread {
    background-color: rgba(14, 165, 233, 0.15);
    border-left: 3px solid #0ea5e9;
  }
  
  .notification-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 14px;
    margin-right: 12px;
    flex-shrink: 0;
  }
  
  .notification-content {
    flex: 1;
    overflow: hidden;
  }
  
  .notification-text {
    font-size: 14px;
    line-height: 1.4;
    color: #374151;
    margin-bottom: 4px;
    word-break: break-word;
  }
  
  .dark-mode .notification-text {
    color: #e5e7eb;
  }
  
  .notification-time {
    font-size: 12px;
    color: #6b7280;
  }
  
  .notification-actions {
    display: flex;
    align-items: center;
    margin-left: 8px;
  }
  
  .view-button, .dismiss-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px 8px;
    font-size: 12px;
    border-radius: 4px;
    transition: all 0.2s;
  }
  
  .view-button {
    color: #0ea5e9;
    margin-right: 4px;
  }
  
  .view-button:hover {
    background-color: rgba(14, 165, 233, 0.1);
  }
  
  .dismiss-button {
    color: #6b7280;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 0;
  }
  
  .dismiss-button:hover {
    color: #ef4444;
    background-color: rgba(239, 68, 68, 0.1);
  }
  
  .no-notifications {
    padding: 24px;
    text-align: center;
    color: #6b7280;
  }
  
  /* 动画效果 */
  .notification-list-enter-active,
  .notification-list-leave-active {
    transition: all 0.3s ease;
  }
  
  .notification-list-enter-from,
  .notification-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  
  .notification-list-move {
    transition: transform 0.3s ease;
  }
  
  @media (max-width: 640px) {
    .notifications-container {
      width: calc(100% - 40px);
      right: 20px;
    }
  }
  </style>
  