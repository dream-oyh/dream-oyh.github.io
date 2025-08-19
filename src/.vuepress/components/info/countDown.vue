<template>
  <div class="countdown-container">
    <div v-if="isTimeUp" class="time-up-message">
      目标日期已到达或已过！
    </div>
    <div v-else class="timer">
      <p>距离 <span class="target-date">{{ formattedTargetDate }}</span> 还有：</p>
      <div class="time-display">
        <div class="time-block">
          <span class="time-value">{{ remaining.days }}</span>
          <span class="time-label">天</span>
        </div>
        <div class="time-block">
          <span class="time-value">{{ remaining.hours }}</span>
          <span class="time-label">小时</span>
        </div>
        <div class="time-block">
          <span class="time-value">{{ remaining.minutes }}</span>
          <span class="time-label">分钟</span>
        </div>
        <div class="time-block">
          <span class="time-value">{{ remaining.seconds }}</span>
          <span class="time-label">秒</span>
        </div>
      </div>
      <!-- 如果你只想显示天数，可以使用下面这行代码 -->
      <!-- <p class="days-only">
        剩余 <span class="days-value">{{ remaining.days }}</span> 天
      </p> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, reactive } from 'vue';

// 1. 定义组件接收的 props
const props = defineProps({
  // 目标日期，字符串格式，例如 "2024-12-31 23:59:59"
  targetDate: {
    type: String,
    required: true,
  },
});

// 2. 创建响应式数据来存储剩余时间
const remaining = reactive({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

// 倒计时是否结束的状态
const isTimeUp = ref(false);

// 定时器的引用，用于在组件销毁时清除
let timer = null;

// 3. 计算剩余时间的核心函数
const calculateRemainingTime = () => {
  const now = new Date();
  const target = new Date(props.targetDate);

  // 计算时间差（毫秒）
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    // 时间已到或已过
    isTimeUp.value = true;
    // 清空剩余时间并停止定时器
    Object.assign(remaining, { days: 0, hours: 0, minutes: 0, seconds: 0 });
    if (timer) {
      clearInterval(timer);
    }
    return;
  }

  // 将毫秒差转换为天、小时、分钟、秒
  remaining.days = Math.floor(diff / (1000 * 60 * 60 * 24));
  remaining.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  remaining.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  remaining.seconds = Math.floor((diff % (1000 * 60)) / 1000);
};

// 4. 使用生命周期钩子
onMounted(() => {
  // 组件挂载后，立即计算一次时间
  calculateRemainingTime();
  // 设置一个每秒执行一次的定时器
  timer = setInterval(calculateRemainingTime, 1000);
});

onUnmounted(() => {
  // 组件卸载（销毁）时，清除定时器，防止内存泄漏
  if (timer) {
    clearInterval(timer);
  }
});

// 5. 一个计算属性，用于美化目标日期的显示
const formattedTargetDate = computed(() => {
  const date = new Date(props.targetDate);
  // 只显示年月日
  return date.toLocaleDateString();
});
</script>

<style scoped>
.countdown-container {
  font-family: 'Arial', sans-serif;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  background: linear-gradient(-45deg, #d6ecfd, #f0f8ff);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 20px auto;
}

.timer p {
  font-size: 1.2em;
  color: #333;
  margin-bottom: 15px;
}

.target-date {
  font-weight: bold;
  color: #007bff;
}

.time-display {
  display: flex;
  justify-content: space-around;
}

.time-block {
  display: flex;
  flex-direction: column;
}

.time-value {
  font-size: 2.5em;
  font-weight: bold;
  color: #2c3e50;
  line-height: 1;
}

.time-label {
  font-size: 0.9em;
  color: #7f8c8d;
  text-transform: uppercase;
}

.time-up-message {
  font-size: 1.5em;
  font-weight: bold;
  color: #e74c3c;
}

/* 只显示天数的样式 (如果使用) */
.days-only {
  font-size: 1.5em;
  color: #333;
}

.days-value {
  font-size: 2.5em;
  font-weight: bold;
  color: #2c3e50;
}
</style>