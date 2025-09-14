<template>

  <head>
    <meta name="referrer" content="no-referrer">
  </head>
  <div class="filter-list">

    <Select filter_text="选择状态" :key_value="[
      { Key: 'read', Value: 'read', },
      { Key: 'reading', Value: 'reading', },
      { Key: 'dropped', Value: 'dropped', },
    ]" v-model="selectedStatus" />

    <Select filter_text="选择星级（以上）" :key_value="[
      { Key: '5星', Value: 5, },
      { Key: '4星', Value: 4, },
      { Key: '3星', Value: 3, },
      { Key: '2星', Value: 2, },
      { Key: '1星', Value: 1, },
    ]" v-model="selectedStars" />

  </div>
  <div class="book-shelf">
    <div class="book-list">
      <div v-for="book in bookList" :key="book.name + book.time.start" class="book-card-container">
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
              <div class="comment-text">
                <slot :name="book.name">
                  <p class="no-comments">暂无书评</p>
                </slot>
              </div>

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
import Select from './Select.vue';

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
let selectedStars = ref(1)

</script>

<style scoped>
.book-shelf {
  display: flex;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}

.filter-list {
  display: flex;
  justify-content: space-evenly;
}


.comment-text {
  white-space: pre-wrap;
  overflow-y: auto;
  width: 100%;
  max-height: 300px;
  /* --- 1. Firefox 的简单样式 --- */
  /* 设置滚动条的宽度: auto | thin | none */
  scrollbar-width: thin;
  /* 设置滚动条颜色: [滑块颜色] [轨道颜色] */
  scrollbar-color: #888 #f1f1f1;
  color: light-dark(#333, #CECED6);
}




.book-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}



.book-card {
  display: flex;
  background-color: transparent;
  border-color: light-dark(transparent, #929292);
  border-width: 1px;
  border-style: solid;
  border-radius: 8px;
  box-shadow: 0 2px 8px light-dark(rgba(0, 0, 0, 0.08), rgba(255, 255, 255, 0.08));
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
  color: light-dark(#333, #CECED6);
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
  color: light-dark(#555, #CECED6  );
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