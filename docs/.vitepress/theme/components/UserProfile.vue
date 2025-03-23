<template>
    <div class="user-profile-container" :class="{ 'dark-mode': isDarkMode }">
      <div class="profile-header">
        <h3>用户设置</h3>
        <button class="close-button" @click="$emit('close')">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" fill="currentColor"/>
          </svg>
        </button>
      </div>
  
      <div class="profile-body">
        <div class="avatar-section">
          <div class="avatar-preview" :style="{ backgroundColor: userColor, backgroundImage: userAvatar ? `url(${userAvatar})` : 'none' }">
            <span v-if="!userAvatar">{{ displayInitial }}</span>
          </div>
          <div class="avatar-options">
            <button class="avatar-upload" @click="triggerFileUpload">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M4 19h16v-7h2v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-8h2v7zM14 9v6h-4V9H5l7-7 7 7h-5z" fill="currentColor"/>
              </svg>
              上传头像
            </button>
            <input
              type="file"
              ref="fileInput"
              style="display: none"
              accept="image/*"
              @change="handleFileUpload"
            />
            <button v-if="userAvatar" class="avatar-remove" @click="removeAvatar">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zM9 4v2h6V4H9z" fill="currentColor"/>
              </svg>
              移除头像
            </button>
          </div>
          <div class="avatar-color-picker">
            <div class="color-picker-label">选择头像颜色:</div>
            <div class="color-options">
              <div
                v-for="color in avatarColors"
                :key="color"
                class="color-option"
                :style="{ backgroundColor: color }"
                :class="{ 'selected': userColor === color }"
                @click="selectColor(color)"
              ></div>
            </div>
          </div>
        </div>
  
        <div class="profile-fields">
          <div class="field-group">
            <label for="username">用户名</label>
            <input
              type="text"
              id="username"
              v-model="username"
              placeholder="输入您的显示名称"
              class="profile-input"
            />
          </div>
  
          <div class="field-group">
            <label for="bio">个人简介</label>
            <textarea
              id="bio"
              v-model="bio"
              placeholder="介绍一下自己 (选填)"
              class="profile-input bio-input"
              rows="3"
            ></textarea>
          </div>
  
          <div class="field-group">
            <label for="skill-level">TypeScript 技能水平</label>
            <select id="skill-level" v-model="skillLevel" class="profile-input">
              <option value="beginner">初学者</option>
              <option value="intermediate">中级</option>
              <option value="advanced">高级</option>
              <option value="expert">专家</option>
            </select>
          </div>
  
          <div class="field-group tags-input">
            <label for="tags">兴趣标签 (最多5个)</label>
            <div class="tags-container">
              <div v-for="(tag, index) in tags" :key="index" class="tag">
                {{ tag }}
                <span class="remove-tag" @click="removeTag(index)">×</span>
              </div>
              <input
                type="text"
                v-model="tagInput"
                @keydown.enter="addTag"
                placeholder="输入标签并按回车"
                class="tag-input"
                :disabled="tags.length >= 5"
              />
            </div>
          </div>
        </div>
      </div>
  
      <div class="profile-footer">
        <button class="cancel-button" @click="$emit('close')">取消</button>
        <button class="save-button" @click="saveProfile">保存</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useData } from 'vitepress';
  
  const { isDark } = useData();
  const fileInput = ref(null);
  const emit = defineEmits(['close', 'update:profile']);
  
  // 用户资料状态
  const username = ref('');
  const bio = ref('');
  const skillLevel = ref('beginner');
  const tags = ref([]);
  const tagInput = ref('');
  const userAvatar = ref('');
  const userColor = ref('#ec4899');
  
  // 可选的头像颜色
  const avatarColors = [
    '#ec4899', '#f97316', '#8b5cf6', '#06b6d4', '#10b981',
    '#3b82f6', '#f43f5e', '#14b8a6', '#a855f7', '#fbbf24'
  ];
  
  // 是否为深色模式
  const isDarkMode = computed(() => {
    return isDark.value;
  });
  
  // 显示名称的首字母作为头像
  const displayInitial = computed(() => {
    return username.value ? username.value.charAt(0).toUpperCase() : '?';
  });
  
  // 初始化时加载用户资料
  onMounted(() => {
    loadUserProfile();
  });
  
  // 加载用户资料
  const loadUserProfile = () => {
    const savedProfile = localStorage.getItem('ts-challenge-user-profile');
  
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      username.value = profile.username || '';
      bio.value = profile.bio || '';
      skillLevel.value = profile.skillLevel || 'beginner';
      tags.value = profile.tags || [];
      userAvatar.value = profile.avatar || '';
      userColor.value = profile.color || '#ec4899';
    } else {
      // 尝试从用户名设置中获取
      const savedUsername = localStorage.getItem('ts-challenge-username');
      if (savedUsername) {
        username.value = savedUsername;
      }
    }
  };
  
  // 保存用户资料
  const saveProfile = () => {
    if (!username.value.trim()) {
      // 显示错误提示
      alert('请输入用户名');
      return;
    }
  
    const profile = {
      username: username.value.trim(),
      bio: bio.value.trim(),
      skillLevel: skillLevel.value,
      tags: tags.value,
      avatar: userAvatar.value,
      color: userColor.value,
      updatedAt: new Date().toISOString()
    };
  
    // 保存到 localStorage
    localStorage.setItem('ts-challenge-user-profile', JSON.stringify(profile));
  
    // 同时更新用户名设置
    localStorage.setItem('ts-challenge-username', username.value.trim());
  
    // 通知父组件
    emit('update:profile', profile);
    emit('close');
  };
  
  // 添加标签
  const addTag = () => {
    const tag = tagInput.value.trim();
  
    if (tag && !tags.value.includes(tag) && tags.value.length < 5) {
      tags.value.push(tag);
      tagInput.value = '';
    }
  };
  
  // 移除标签
  const removeTag = (index) => {
    tags.value.splice(index, 1);
  };
  
  // 触发文件上传
  const triggerFileUpload = () => {
    fileInput.value.click();
  };
  
  // 处理文件上传
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    // 检查文件类型和大小
    if (!file.type.startsWith('image/')) {
      alert('请上传图片文件');
      return;
    }
  
    if (file.size > 2 * 1024 * 1024) {  // 限制2MB
      alert('图片大小不能超过2MB');
      return;
    }
  
    // 读取文件为 Data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      userAvatar.value = e.target.result;
    };
    reader.readAsDataURL(file);
  };
  
  // 移除头像
  const removeAvatar = () => {
    userAvatar.value = '';
  };
  
  // 选择头像颜色
  const selectColor = (color) => {
    userColor.value = color;
  };
  </script>
  
  <style scoped>
  .user-profile-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .dark-mode {
    background-color: #1e1e1e;
    color: #e5e7eb;
  }
  
  .profile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e5e7eb;
    background-color: #f3f4f6;
  }
  
  .dark-mode .profile-header {
    background-color: #262626;
    border-color: #333;
  }
  
  .profile-header h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
  }
  
  .dark-mode .profile-header h3 {
    color: #f3f4f6;
  }
  
  .close-button {
    background: none;
    border: none;
    cursor: pointer;
    color: #6b7280;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    transition: all 0.2s;
  }
  
  .close-button:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: #111827;
  }
  
  .dark-mode .close-button:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #f3f4f6;
  }
  
  .profile-body {
    padding: 1.5rem;
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  @media (min-width: 640px) {
    .profile-body {
      flex-direction: row;
      align-items: flex-start;
    }
  }
  
  .avatar-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .avatar-preview {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    font-weight: bold;
    color: white;
    background-size: cover;
    background-position: center;
  }
  
  .avatar-options {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }
  
  .avatar-upload, .avatar-remove {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.875rem;
    border: none;
    transition: all 0.2s;
  }
  
  .avatar-upload {
    background-color: #f3f4f6;
    color: #111827;
  }
  
  .dark-mode .avatar-upload {
    background-color: #333;
    color: #e5e7eb;
  }
  
  .avatar-upload:hover {
    background-color: #e5e7eb;
  }
  
  .dark-mode .avatar-upload:hover {
    background-color: #444;
  }
  
  .avatar-remove {
    background-color: rgba(239, 68, 68, 0.1);
    color: #ef4444;
  }
  
  .avatar-remove:hover {
    background-color: rgba(239, 68, 68, 0.2);
  }
  
  .avatar-color-picker {
    margin-top: 0.5rem;
    width: 100%;
  }
  
  .color-picker-label {
    font-size: 0.75rem;
    color: #6b7280;
    margin-bottom: 0.5rem;
  }
  
  .color-options {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }
  
  .color-option {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;
    border: 2px solid transparent;
  }
  
  .color-option:hover {
    transform: scale(1.1);
  }
  
  .color-option.selected {
    border-color: #111827;
    transform: scale(1.15);
  }
  
  .dark-mode .color-option.selected {
    border-color: #e5e7eb;
  }
  
  .profile-fields {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .field-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .field-group label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #4b5563;
  }
  
  .dark-mode .field-group label {
    color: #9ca3af;
  }
  
  .profile-input {
    padding: 0.625rem 0.75rem;
    border-radius: 6px;
    border: 1px solid #d1d5db;
    background-color: white;
    color: #111827;
    font-size: 0.875rem;
    transition: all 0.2s;
  }
  
  .dark-mode .profile-input {
    background-color: #333;
    border-color: #444;
    color: #e5e7eb;
  }
  
  .profile-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
  
  .bio-input {
    resize: vertical;
    min-height: 80px;
  }
  
  .tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid #d1d5db;
    background-color: white;
  }
  
  .dark-mode .tags-container {
    background-color: #333;
    border-color: #444;
  }
  
  .tag {
    display: flex;
    align-items: center;
    background-color: #e5e7eb;
    color: #4b5563;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
  }
  
  .dark-mode .tag {
    background-color: #4b5563;
    color: #e5e7eb;
  }
  
  .remove-tag {
    margin-left: 0.25rem;
    cursor: pointer;
    font-weight: bold;
  }
  
  .tag-input {
    flex: 1;
    min-width: 120px;
    border: none;
    outline: none;
    background: none;
    font-size: 0.875rem;
    color: #111827;
    padding: 0.25rem 0;
  }
  
  .dark-mode .tag-input {
    color: #e5e7eb;
  }
  
  .profile-footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid #e5e7eb;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    background-color: #f9fafb;
  }
  
  .dark-mode .profile-footer {
    background-color: #262626;
    border-color: #333;
  }
  
  .cancel-button, .save-button {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .cancel-button {
    background-color: #f3f4f6;
    color: #4b5563;
    border: 1px solid #d1d5db;
  }
  
  .dark-mode .cancel-button {
    background-color: #333;
    border-color: #444;
    color: #9ca3af;
  }
  
  .cancel-button:hover {
    background-color: #e5e7eb;
  }
  
  .dark-mode .cancel-button:hover {
    background-color: #444;
  }
  
  .save-button {
    background-color: #3b82f6;
    color: white;
    border: none;
  }
  
  .save-button:hover {
    background-color: #2563eb;
  }
  
  @media (max-width: 640px) {
    .user-profile-container {
      width: 100%;
      height: 100%;
      max-height: 100%;
      border-radius: 0;
      top: 0;
      left: 0;
      transform: none;
    }
  
    .profile-body {
      padding: 1rem;
    }
  
    .avatar-preview {
      width: 100px;
      height: 100px;
    }
  }
  </style>
  