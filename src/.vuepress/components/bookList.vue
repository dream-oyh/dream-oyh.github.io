<template>

  <head>
    <meta name="referrer" content="no-referrer">
  </head>
  <div class="book-shelf">
    <div class="book-list">
      <div v-for="book in bookList" :key="book.name + book.time.start" class="book-card">
        <!-- 封面图片 -->
        <img :src="book.cover" :alt="book.name + '封面'" class="book-cover">

        <div class="book-details">
          <!-- 书名 -->
          <h2 class="book-title">{{ book.name }}</h2>

          <!-- 评分 -->
          <div class="book-stars" v-if="book.stars">
            <span>{{ '★'.repeat(book.stars) }}{{ '☆'.repeat(5 - book.stars) }}</span>
            <span class="stars-text"> ({{ book.stars }} / 5)</span>
          </div>

          <!-- 状态 -->
          <div class="book-status">
            <p class="status" :id="book.status">
              {{ book.status }}
            </p>
          </div>

          <!-- 已读时间 -->
          <p class="book-time">
            <strong>阅读时间:</strong> {{ book.time.start }} 至 {{ book.time.end }}
          </p>

          <!-- 书评 -->
          <div class="book-comments">
            <strong>书评:</strong>

            <p v-if="book.comments" class="comment-text">{{ book.comments }}</p>
            <p v-else class="no-comments">暂无书评</p>
          </div>

          <div class="book-tag-list">
            <p v-for="t in book.tag" key="t" class="book-tags">
              #{{ t }}
            </p>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- script 部分保持不变，此处省略 -->
<script setup lang="ts">
// ...你的 script 代码完全不用动
import { computed, ref } from 'vue';
import readBookList_zh from '../data/readBooks_zh'
import readBookList_en from '../data/readBooks_en';
import type { Book } from '../types/book';


let props = withDefaults(defineProps<{
  database?: string // 是否必传
}>(), {
  database: 'zh'
})

const bookList = computed<Book[]>(() => {
  if (props.database === 'zh') {
    return readBookList_zh;
  }

  if (props.database === 'en') {
    return readBookList_en;
  }

  // 返回一个默认值或空数组，以处理其他未预料到的情况
  return [];
});







</script>

<style scoped>
.book-shelf {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  /* 为了让单列不至于太宽，可以适当减小 max-width */
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 40px;
  color: #333;
}

.comment-text {
  white-space: pre-wrap;
}

/* --- 这是核心修改部分 --- */
.book-list {
  display: flex;
  flex-direction: column;
  /* 1. 设置主轴为垂直方向 */
  gap: 20px;
  /* 2. 设置项目之间的垂直间距 */
}

.book-card {
  display: flex;
  /* 卡片内部仍然使用 flex，默认是水平排列 */
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  /* 阴影可以稍微柔和一些 */
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.book-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

/* --- 修改结束 --- */


.book-cover {
  width: 100px;
  height: 150px;
  object-fit: cover;
  flex-shrink: 0;
  /* 添加一个右边距，让图片和文字有呼吸空间 */
  margin-right: 20px;
  margin-top: 20px;
  margin-left: 20px;
  border-radius: 5%;
}

.book-details {
  padding: 15px 15px 15px 0;
  /* 左边距通过封面的 margin-right 实现，这里设为0 */
  display: flex;
  flex-direction: column;
}

.book-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.book-stars {
  color: #f5a623;
  /* margin-bottom: 10px; */
  font-size: 1rem;
}

.stars-text {
  color: #999;
  font-size: 0.8rem;
  margin-left: 5px;
}

.book-time {
  font-size: 0.85rem;
  color: #555;
  margin: 0 0 10px 0;
}

.book-comments {
  font-size: 0.9rem;
  color: #333;
}

.book-comments strong {
  display: block;
  margin-bottom: 5px;
}

.no-comments {
  color: #aaa;
  font-style: italic;
}

.book-tag-list {
  display: flex;

}

.book-tags {
  margin-right: 10px;
  background-color: #E7DEF5;
  font-size: 12px;
  color: #6c3ab8;
  padding: 5px;
  border-radius: 20px;
}

.status {
  width: 30px;
  text-align: center;
  margin-right: 10px;
  font-size: 12px;
  padding: 5px;
  border-radius: 20px;
}

.status#read {
  background-color: #d9ffe8;
  color: #267948;
}

.status#reading {
  width: 50px;
  background-color: #d9f0ff;
  color: #264779;
}

.status#dropped {
  width: 50px;
  background-color: #ffd9d9;
  color: #792626;
}
</style>