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

.section-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.notification-bell, .bookmark-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  color: #6b7280;
  position: relative;
  transition: all 0.2s ease;
}

.notification-bell:hover, .bookmark-button:hover {
  color: #ec4899;
  background-color: rgba(236, 72, 153, 0.1);
}

.notification-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #ef4444;
  color: white;
  border-radius: 50%;
  min-width: 18px;
  height: 18px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #f3f4f6;
}

.dark-mode .notification-badge {
  border-color: #262626;
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

.comment-actions-top {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.like-button, .comment-actions-top .bookmark-button {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  background-color: #f3f4f6;
  cursor: pointer;
  transition: all 0.2s;
}

.dark-mode .like-button, .dark-mode .comment-actions-top .bookmark-button {
  background-color: #333;
}

.like-button:hover, .comment-actions-top .bookmark-button:hover {
  background-color: #e5e7eb;
}

.dark-mode .like-button:hover, .dark-mode .comment-actions-top .bookmark-button:hover {
  background-color: #444;
}

.like-button.liked {
  background-color: #fee2e2;
  color: #ef4444;
}

.dark-mode .like-button.liked {
  background-color: rgba(239, 68, 68, 0.2);
}

.comment-actions-top .bookmark-button.bookmarked {
  background-color: #dbeafe;
  color: #3b82f6;
}

.dark-mode .comment-actions-top .bookmark-button.bookmarked {
  background-color: rgba(59, 130, 246, 0.2);
}

.like-icon, .bookmark-icon {
  width: 16px;
  height: 16px;
  color: #6b7280;
}

.dark-mode .like-icon, .dark-mode .bookmark-icon {
  color: #9ca3af;
}

.like-button.liked .like-icon {
  color: #ef4444;
}

.comment-actions-top .bookmark-button.bookmarked .bookmark-icon {
  color: #3b82f6;
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

  .section-controls {
    gap: 0.5rem;
  }

  .notification-bell, .bookmark-button {
    width: 28px;
    height: 28px;
  }
}
</style>

<template>
  <div class="comment-section">
    <div class="section-title" @click="toggleComments">
      <h2>Comments</h2>
      <span class="comment-count">{{ comments.length }}</span>
    </div>
    <div class="section-controls">
      <notification-bell />
      <bookmark-button />
    </div>
    <CommentSearch
      v-if="showComments"
      :comments="comments"
      :userProfile="userProfile"
      @update:filtered-comments="filteredComments = $event"
      class="comment-search-container"
    />
    <div v-if="showUserProfile">
      <UserProfile @close="showUserProfile = false" @update:profile="updateUserProfile" />
      <div class="overlay" @click="showUserProfile = false"></div>
    </div>
    <div class="comments-container" v-if="showComments">
      <transition-group name="comment-list" tag="div" class="comments-list">
        <div v-for="(comment, index) in displayedComments" :key="comment.id || index" class="comment-item" :class="{ 'new-comment': index === 0 && isNewComment }">
          <div class="comment-header">
            <div
              class="user-avatar"
              :style="{
                backgroundColor: comment.userColor || generateAvatarColor(comment.username),
                backgroundImage: comment.userAvatar ? `url(${comment.userAvatar})` : 'none'
              }"
            >
              <span v-if="!comment.userAvatar">{{ comment.username.charAt(0).toUpperCase() }}</span>
            </div>
            <div class="user-info">
              <div class="username-row">
                <div class="username">{{ comment.username }}</div>
                <div v-if="comment.skillLevel" class="user-skill-badge" :class="comment.skillLevel">
                  {{ getUserSkillLabel(comment.skillLevel) }}
                </div>
              </div>
              <div class="comment-time">{{ formatDate(comment.timestamp) }}</div>
              <div v-if="comment.bio" class="user-bio">{{ truncateBio(comment.bio) }}</div>
            </div>
            <div class="comment-actions-top">
              <div class="like-button" @click="toggleLike(getOriginalIndex(comment))" :class="{ liked: comment.liked }">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="like-icon">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
                </svg>
                <span class="like-count">{{ comment.likes }}</span>
              </div>
              <div class="bookmark-button" @click="toggleBookmark(comment, getOriginalIndex(comment))" :class="{ bookmarked: isBookmarked(comment) }">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="bookmark-icon">
                  <path fill="none" d="M0 0h24v24H0z"/>
                  <path d="M5 2h14a1 1 0 0 1 1 1v19.143a.5.5 0 0 1-.766.424L12 18.03l-7.234 4.536A.5.5 0 0 1 4 22.143V3a1 1 0 0 1 1-1zm2 2v15.432l5-3.761 5 3.761V4H7z" fill="currentColor"/>
                </svg>
              </div>
            </div>
          </div>
          <div class="comment-content" v-html="formatComment(comment.text)"></div>
          <div class="comment-actions">
            <button class="reply-button" @click="replyToComment(getOriginalIndex(comment))">回复</button>

            <div v-if="comment.tags && comment.tags.length > 0" class="user-tags">
              <div v-for="(tag, tagIndex) in comment.tags" :key="tagIndex" class="user-tag">
                {{ tag }}
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import UserProfile from './UserProfile.vue';
import CommentSearch from './CommentSearch.vue';

export default {
  components: {
    UserProfile,
    CommentSearch,
  },
  setup() {
    const showUserProfile = ref(false);
    const userProfile = ref(null);
    const filteredComments = ref([]);
    const comments = ref([]); // Assuming comments is defined and fetched elsewhere
    const newComment = ref('');
    const username = ref('');
    const isNewComment = ref(false);
    const showComments = ref(true);

    const displayedComments = computed(() => {
      return filteredComments.value.length > 0 ? filteredComments.value : comments.value;
    });

    onMounted(() => {
      // (existing code)

      // Load user profile
      loadUserProfile();
    });

    // Load user profile
    const loadUserProfile = () => {
      const savedProfile = localStorage.getItem('ts-challenge-user-profile');
      if (savedProfile) {
        userProfile.value = JSON.parse(savedProfile);
      }
    };

    // Update user profile
    const updateUserProfile = (profile) => {
      userProfile.value = profile;

      // Update the username in the form
      username.value = profile.username;

      // Update any existing comments by this user
      const updatedComments = comments.value.map(comment => {
        if (comment.username.toLowerCase() === profile.username.toLowerCase()) {
          return {
            ...comment,
            userAvatar: profile.avatar,
            userColor: profile.color,
            bio: profile.bio,
            skillLevel: profile.skillLevel,
            tags: profile.tags
          };
        }
        return comment;
      });

      comments.value = updatedComments;
      saveComments();
    };

    // Add user profile info to comment
    const addUserProfileToComment = (comment) => {
      if (userProfile.value) {
        comment.userAvatar = userProfile.value.avatar;
        comment.userColor = userProfile.value.color;
        comment.bio = userProfile.value.bio;
        comment.skillLevel = userProfile.value.skillLevel;
        comment.tags = userProfile.value.tags;
      }
      return comment;
    };

    // Get original index from filtered comments
    const getOriginalIndex = (comment) => {
      // If not filtered, just return the index from the comments array
      if (filteredComments.value.length === 0) {
        return comments.value.findIndex(c =>
          (c.id && c.id === comment.id) ||
          (!c.id && c.timestamp === comment.timestamp)
        );
      }

      // Find the original comment in the comments array
      const originalComment = comments.value.find(c =>
        (c.id && c.id === comment.id) ||
        (!c.id && c.timestamp === comment.timestamp)
      );

      return comments.value.indexOf(originalComment);
    };

    // Get user skill level label
    const getUserSkillLabel = (skillLevel) => {
      const labels = {
        'beginner': '初学者',
        'intermediate': '中级',
        'advanced': '高级',
        'expert': '专家'
      };
      return labels[skillLevel] || skillLevel;
    };

    // Truncate bio text
    const truncateBio = (bio, maxLength = 50) => {
      if (!bio) return '';
      if (bio.length <= maxLength) return bio;
      return bio.substring(0, maxLength) + '...';
    };

    // Modify addComment function to include user profile data
    const addComment = () => {
      if (!newComment.value.trim() || !username.value.trim()) return;

      // 保存用户名
      localStorage.setItem('ts-challenge-username', username.value);

      // 创建新评论
      let comment = {
        id: Date.now(),
        username: username.value,
        text: newComment.value,
        timestamp: new Date().toISOString(),
        likes: 0,
        liked: false,
        pagePath: route.path
      };

      // Add user profile info
      comment = addUserProfileToComment(comment);

      // 添加到评论列表前端
      comments.value.unshift(comment);

      // 如果这是回复某条评论
      if (replyingToCommentId.value) {
        // 发送通知给被回复的用户
        sendReplyNotification(replyingToCommentId.value, comment);
        replyingToCommentId.value = null;
      }

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

    return {
      showUserProfile,
      userProfile,
      filteredComments,
      comments,
      newComment,
      username,
      isNewComment,
      showComments,
      displayedComments,
      loadUserProfile,
      updateUserProfile,
      addUserProfileToComment,
      getOriginalIndex,
      getUserSkillLabel,
      truncateBio,
      addComment,
    };
  }
};
</script>
