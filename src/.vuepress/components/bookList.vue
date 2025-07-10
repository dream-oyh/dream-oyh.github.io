<template>

  <head>
    <meta name="referrer" content="no-referrer">
  </head>
  <div class="filter-list">
    <div class="filter" for="status">
      <p class="filter-text">选择状态：</p>
      <select name="status" id="status" v-model="selectedStatus" ref="filter_select">
        <option value="read">read</option>
        <option value="reading">reading</option>
        <option value="dropped">dropped</option>
      </select>
    </div>
    <div class="filter" for="stars">
      <p class="filter-text">选择星级（以上）</p>
      <select name="stars" id="stars" v-model="selectedStars" ref="filter_select">
        <option :value="5">5星</option>
        <option :value="4">4星</option>
        <option :value="3">3星</option>
        <option :value="2">2星</option>
        <option :value="1">1星</option>
      </select>

    </div>



  </div>
  <div class="book-shelf">
    <div class="book-list">
      <div v-for="book in bookList" :key="book.name + book.time.start">
        <div v-if="book.status == selectedStatus && book.stars >= selectedStars" class="book-card">

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
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import readBookList_zh from '../data/readBooks_zh'
import readBookList_en from '../data/readBooks_en';
import type { Book } from '../types/book';


let props = withDefaults(defineProps<{
  database?: string
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


  return [];
});


let selectedStatus = ref('read')
let selectedStars = ref(5)


</script>

<style scoped>
.book-shelf {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: flex;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}

.filter-list,
.filter {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.filter {
  border-style: solid;
  border-width: 2px;
  border-color: #6c3ab8;
  padding: 5px 15px 5px 15px;
  border-radius: 1000px;
}

.filter-text {
  margin-top: 0px;
  margin-bottom: 0px;
}

select {
  border: transparent;
  cursor: pointer;
}

h1 {
  text-align: center;
  margin-bottom: 40px;
  color: #333;
}

.comment-text {
  white-space: pre-wrap;
}




.book-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.book-card {
  display: flex;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.book-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}


.book-cover {
  width: 100px;
  height: 150px;
  object-fit: cover;
  flex-shrink: 0;
  margin-right: 20px;
  margin-top: 20px;
  margin-left: 20px;
  border-radius: 5%;
}

.book-details {
  padding: 15px 15px 15px 0;
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