<template>
  <div class="comment-section" :class="{ 'dark-mode': isDarkMode }">
    <div class="section-title" @click="toggleComments">
      <div class="title-content">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10c-1.702 0-3.305-.425-4.708-1.175L2 22l1.176-5.29A9.966 9.966 0 0 1 2 12C2 6.477 6.477 2 12 2zm0 2a8 8 0 0 0-8 8c0 1.335.326 2.618.94 3.766l.35.654-.656 2.946 2.948-.654.653.349A7.955 7.955 0 0 0 12 20a8 8 0 0 0 0-16zm0 3a1 1 0 0 1 1 1v3h3a1 1 0 0 1 0 2h-3v3a1 1 0 0 1-2 0v-3H8a1 1 0 0 1 0-2h3V8a1 1 0 0 1 1-1z" fill="currentColor" />
        </svg>
        <h2>社区讨论 <span class="comment-count">{{ comments.length }}</span></h2>
      </div>
      <span class="toggle-icon" :class="{ 'open': showComments }">▼</span>
    </div>

    <transition name="fade">
      <div v-if="showComments" class="comments-container">
        <!-- 评论输入框 -->
        <div class="comment-form">
          <div class="user-avatar" :style="{ backgroundColor: generateAvatarColor(username) }">
            {{ username.charAt(0).toUpperCase() || '?' }}
          </div>
          <div class="input-container">
            <div class="username-container">
              <input type="text" v-model="username" placeholder="输入您的昵称..." class="username-input" />
            </div>
            <div class="textarea-container">
              <textarea
                v-model="newComment"
                placeholder="分享您的解决方案或提问..."
                @keydown.enter="handleEnter"
                ref="commentInput"
              ></textarea>
              <div class="comment-tools">
                <div class="emoji-selector">
                  <button class="emoji-button" @click="toggleEmojiPicker">
                    <span>😊</span>
                  </button>
                  <div class="emoji-picker" v-if="showEmojiPicker">
                    <div v-for="emoji in emojis" :key="emoji" @click="addEmoji(emoji)" class="emoji">
                      {{ emoji }}
                    </div>
                  </div>
                </div>
                <div class="format-buttons">
                  <button title="加粗" @click="formatText('**', '**')">B</button>
                  <button title="斜体" @click="formatText('*', '*')">I</button>
                  <!-- <button title="代码" @click="formatText('`', '`')">{`{`}</button>
                  <button title="代码块" @click="formatText('\n```typescript\n', '\n```')">{`{ }`}</button> -->
                </div>
                <button
                  class="send-button"
                  @click="addComment"
                  :disabled="!newComment.trim() || !username.trim()"
                >
                  发送
                  <span class="send-icon">↗</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 评论列表 -->
        <transition-group name="comment-list" tag="div" class="comments-list">
          <div v-for="(comment, index) in comments" :key="index" class="comment-item" :class="{ 'new-comment': index === 0 && isNewComment }">
            <div class="comment-header">
              <div class="user-avatar" :style="{ backgroundColor: generateAvatarColor(comment.username) }">
                {{ comment.username.charAt(0).toUpperCase() }}
              </div>
              <div class="user-info">
                <div class="username">{{ comment.username }}</div>
                <div class="comment-time">{{ formatDate(comment.timestamp) }}</div>
              </div>
              <div class="like-button" @click="toggleLike(index)" :class="{ liked: comment.liked }">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="like-icon">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
                </svg>
                <span class="like-count">{{ comment.likes }}</span>
              </div>
            </div>
            <div class="comment-content" v-html="formatComment(comment.text)"></div>
            <div class="comment-actions">
              <button class="reply-button" @click="replyToComment(index)">回复</button>
            </div>
          </div>
        </transition-group>

        <!-- 无评论提示 -->
        <div v-if="comments.length === 0" class="no-comments">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="empty-icon">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" fill="currentColor" />
            <path d="M12 15l1.57-3.43L17 10l-3.43-1.57L12 5l-1.57 3.43L7 10l3.43 1.57z" fill="currentColor" />
          </svg>
          <p>成为第一个评论的人！</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue';
import { useData, useRoute } from 'vitepress';
import * as marked from 'marked';

// 使用VitePress提供的dark模式状态
const { isDark } = useData();
const route = useRoute();

// 组件状态
const showComments = ref(false);
const showEmojiPicker = ref(false);
const newComment = ref('');
const username = ref('');
const comments = ref([]);
const isNewComment = ref(false);
const commentInput = ref(null);

// 表情列表
const emojis = ['😊', '👍', '🎉', '🤔', '😄', '❤️', '👏', '🔥', '✨', '🚀', '💡', '💯'];

// 页面路径作为评论的唯一标识
const pageKey = computed(() => {
  return route.path;
});

// 是否为深色模式
const isDarkMode = computed(() => {
  return isDark.value;
});

// 初始化时加载评论
onMounted(() => {
  // 从localStorage获取用户名
  const savedUsername = localStorage.getItem('ts-challenge-username');
  if (savedUsername) {
    username.value = savedUsername;
  }
// 加载评论 (使用localStorage模拟数据存储)


  // 加载评论
  loadComments();

  // 自动展开评论区如果有评论
  if (comments.value.length > 0) {
    showComments.value = true;
  }
});
const loadComments = () => {
  const key = `ts-challenge-comments-${pageKey.value}`;
  const savedComments = localStorage.getItem(key);

  if (savedComments) {
    comments.value = JSON.parse(savedComments);
  } else {
    comments.value = [];
  }
};
// 当路由变化时，加载对应页面的评论
watch(() => route.path, () => {
  loadComments();
}, { immediate: true });


// 保存评论
const saveComments = () => {
  const key = `ts-challenge-comments-${pageKey.value}`;
  localStorage.setItem(key, JSON.stringify(comments.value));
};

// 添加新评论
const addComment = () => {
  if (!newComment.value.trim() || !username.value.trim()) return;

  // 保存用户名
  localStorage.setItem('ts-challenge-username', username.value);

  // 创建新评论
  const comment = {
    username: username.value,
    text: newComment.value,
    timestamp: new Date().toISOString(),
    likes: 0,
    liked: false
  };

  // 添加到评论列表前端
  comments.value.unshift(comment);

  // 保存评论
  saveComments();

  // 动画效果
  isNewComment.value = true;
  setTimeout(() => {
    isNewComment.value = false;
  }, 2000);

  // 清空输入框
  newComment.value = '';
};

// 切换评论区显示状态
const toggleComments = () => {
  showComments.value = !showComments.value;
};

// 切换表情选择器显示状态
const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value;
};

// 为用户名生成一个一致的颜色
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

// 添加表情到评论
const addEmoji = (emoji) => {
  newComment.value += emoji;
  showEmojiPicker.value = false;
  if (commentInput.value) {
    commentInput.value.focus();
  }
};

// 格式化文本（添加 Markdown 格式）
const formatText = (prefix, suffix) => {
  if (!commentInput.value) return;

  const textarea = commentInput.value;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = newComment.value.substring(start, end);

  newComment.value =
    newComment.value.substring(0, start) +
    prefix + selectedText + suffix +
    newComment.value.substring(end);

  // 光标位置调整
  nextTick(() => {
    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd =
      start + prefix.length + selectedText.length + suffix.length;
  });
};

// 在按下回车键时处理
const handleEnter = (e) => {
  // 如果按下Shift+Enter，则插入换行而不是提交
  if (!e.shiftKey) {
    e.preventDefault();
    addComment();
  }
};

// 点赞/取消点赞
const toggleLike = (index) => {
  comments.value[index].liked = !comments.value[index].liked;
  comments.value[index].likes += comments.value[index].liked ? 1 : -1;
  saveComments();
};

// 回复评论
const replyToComment = (index) => {
  const comment = comments.value[index];
  if (!comment) return;

  // 添加@用户名到输入框
  const replyPrefix = `@${comment.username} `;
  if (!newComment.value.includes(replyPrefix)) {
    newComment.value = replyPrefix + newComment.value;
  }

  // 聚焦输入框
  if (commentInput.value) {
    commentInput.value.focus();
  }

  // 确保评论区已展开
  showComments.value = true;
};

// 格式化Markdown内容 (安全处理)
const formatComment = (text) => {
  if (!text) return '';

  // 处理@用户名
  text = text.replace(/@(\w+)/g, '<span class="mention">@$1</span>');

  // 处理emoji (保留原样)
  text = text.replace(/:([\w+-]+):/g, (match, emoji) => {
    return match;
  });

  // 使用marked处理Markdown
  let html = marked.parse(text);

  // 对HTML进行基本安全处理 (在生产环境中应使用DOMPurify等库)
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
</script>

<style scoped>
.comment-section {
  margin: 3rem 0;
  border-radius: 12px;
  overflow: hidden;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
  position: relative;
}

.dark-mode {
  background-color: #1e1e1e;
  border-color: #333;
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  cursor: pointer;
  background-color: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.3s ease;
}

.dark-mode .section-title {
  background-color: #262626;
  border-color: #333;
}

.title-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon {
  width: 24px;
  height: 24px;
  color: #ec4899;
}

.dark-mode .icon {
  color: #f472b6;
}

.section-title h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.dark-mode .section-title h2 {
  color: #f3f4f6;
}

.comment-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #ec4899;
  color: white;
  border-radius: 9999px;
  min-width: 1.75rem;
  height: 1.75rem;
  padding: 0 0.5rem;
  font-size: 0.875rem;
  margin-left: 0.5rem;
}

.toggle-icon {
  font-size: 0.875rem;
  transition: transform 0.3s ease;
}

.toggle-icon.open {
  transform: rotate(180deg);
}

.comments-container {
  padding: 1.5rem;
}

.comment-form {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ec4899;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.input-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.username-container {
  margin-bottom: 0.5rem;
}

.username-input {
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 0.875rem;
  width: 100%;
  max-width: 250px;
  background-color: white;
  color: #111827;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.dark-mode .username-input {
  background-color: #333;
  border-color: #444;
  color: #e5e7eb;
}

.username-input:focus {
  outline: none;
  border-color: #ec4899;
  box-shadow: 0 0 0 2px rgba(236, 72, 153, 0.2);
}

.textarea-container {
  position: relative;
}

.textarea-container textarea {
  width: 100%;
  min-height: 100px;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  resize: vertical;
  font-family: inherit;
  font-size: 0.875rem;
  background-color: white;
  color: #111827;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.dark-mode .textarea-container textarea {
  background-color: #333;
  border-color: #444;
  color: #e5e7eb;
}

.textarea-container textarea:focus {
  outline: none;
  border-color: #ec4899;
  box-shadow: 0 0 0 2px rgba(236, 72, 153, 0.2);
}

.comment-tools {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.emoji-selector {
  position: relative;
}

.emoji-button {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.emoji-button:hover {
  background-color: #f3f4f6;
}

.dark-mode .emoji-button:hover {
  background-color: #3a3a3a;
}

.emoji-picker {
  position: absolute;
  bottom: calc(100% + 5px);
  left: 0;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.25rem;
  z-index: 10;
}

.dark-mode .emoji-picker {
  background-color: #262626;
  border-color: #444;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
}

.emoji {
  font-size: 1.25rem;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.emoji:hover {
  background-color: #f3f4f6;
}

.dark-mode .emoji:hover {
  background-color: #3a3a3a;
}

.format-buttons {
  display: flex;
  gap: 0.25rem;
}

.format-buttons button {
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
  color: #4b5563;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.dark-mode .format-buttons button {
  background-color: #333;
  border-color: #444;
  color: #d1d5db;
}

.format-buttons button:hover {
  background-color: #e5e7eb;
  color: #111827;
}

.dark-mode .format-buttons button:hover {
  background-color: #444;
  color: white;
}

.send-button {
  background-color: #ec4899;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: all 0.2s;
}

.send-button:hover {
  background-color: #db2777;
  transform: translateY(-1px);
}

.send-button:disabled {
  background-color: #d1d5db;
  cursor: not-allowed;
  transform: none;
}

.dark-mode .send-button:disabled {
  background-color: #4b5563;
}

.send-icon {
  font-size: 0.75rem;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.comment-item {
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  position: relative;
  transition: all 0.3s ease;
}

.dark-mode .comment-item {
  background-color: #262626;
  border-color: #333;
}

.comment-item.new-comment {
  animation: highlight 2s ease;
}

@keyframes highlight {
  0%, 100% {
    background-color: transparent;
  }
  50% {
    background-color: rgba(236, 72, 153, 0.1);
  }
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
}

.user-info {
  margin-left: 0.75rem;
  flex: 1;
}

.username {
  font-weight: 600;
  font-size: 0.875rem;
  color: #111827;
}

.dark-mode .username {
  color: #f3f4f6;
}

.comment-time {
  font-size: 0.75rem;
  color: #6b7280;
}

.like-button {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  background-color: #f3f4f6;
  cursor: pointer;
  transition: all 0.2s;
}

.dark-mode .like-button {
  background-color: #333;
}

.like-button:hover {
  background-color: #e5e7eb;
}

.dark-mode .like-button:hover {
  background-color: #444;
}

.like-button.liked {
  background-color: #fee2e2;
  color: #ef4444;
}

.dark-mode .like-button.liked {
  background-color: rgba(239, 68, 68, 0.2);
}

.like-icon {
  width: 16px;
  height: 16px;
  color: #6b7280;
}

.dark-mode .like-icon {
  color: #9ca3af;
}

.like-button.liked .like-icon {
  color: #ef4444;
}

.like-count {
  font-size: 0.75rem;
  font-weight: 600;
}

.comment-content {
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 0.75rem;
  color: #374151;
  word-break: break-word;
}

.dark-mode .comment-content {
  color: #d1d5db;
}

.comment-content :deep(p) {
  margin: 0.5rem 0;
}

.comment-content :deep(a) {
  color: #ec4899;
  text-decoration: none;
}

.comment-content :deep(a:hover) {
  text-decoration: underline;
}

.comment-content :deep(code) {
  background-color: #f3f4f6;
  padding: 0.125rem 0.25rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.8125rem;
}

.dark-mode .comment-content :deep(code) {
  background-color: #333;
}

.comment-content :deep(pre) {
  background-color: #f3f4f6;
  padding: 0.75rem;
  border-radius: 6px;
  overflow-x: auto;
  margin: 0.75rem 0;
}

.dark-mode .comment-content :deep(pre) {
  background-color: #262626;
}

.comment-content :deep(pre code) {
  background-color: transparent;
  padding: 0;
  font-size: 0.8125rem;
}

.comment-content :deep(.mention) {
  color: #ec4899;
  font-weight: 600;
}

.comment-actions {
  display: flex;
  gap: 0.5rem;
}

.reply-button {
  background: none;
  border: none;
  color: #6b7280;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
}

.reply-button:hover {
  color: #ec4899;
  text-decoration: underline;
}

.no-comments {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: #6b7280;
}

.empty-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 1rem;
  color: #9ca3af;
}

.dark-mode .empty-icon {
  color: #6b7280;
}

.no-comments p {
  font-size: 0.875rem;
}

/* 动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.comment-list-enter-active,
.comment-list-leave-active {
  transition: all 0.5s ease;
}

.comment-list-enter-from,
.comment-list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.comment-list-move {
  transition: transform 0.5s ease;
}

@media (max-width: 640px) {
  .comment-form {
    flex-direction: column;
    align-items: center;
  }

  .input-container {
    width: 100%;
  }

  .comment-tools {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .send-button {
    margin-left: auto;
  }
}
</style>
