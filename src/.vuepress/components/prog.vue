<template>
    <div class="prog-container">
        <div class="prog">
            <div class="prog-bar">
            </div>
        </div>
        <span class="prog-bar-value">{{ formattedProgress }}%</span>
    </div>

</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';

let input = withDefaults(defineProps<{ current?: number, goal: number }>(), { current: 0, goal: 1 })
const finalProgress = computed(() => {
    if (input.goal === 0) {
        return 0;
    }
    return (input.current / input.goal) * 100;
});

const formattedProgress = computed(() => {
    return finalProgress.value.toFixed(2); // 返回如 "20.0", "33.3" 等字符串
});

</script>

<style scoped>
.prog-container {
    display: inline-flex;
    vertical-align: middle;
    align-items: center;
    margin-left: 20px;
    gap: 10px;
}

.prog {
    width: 100px;
    height: 10px;
    background-color: #e5e5e5;
    border-radius: 10px;
    overflow: hidden;
}

.prog-bar {
    width: v-bind(formattedProgress + 'px');
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: #b07dfc;
    transition: width .6s ease;
    border-radius: 10px;
}

.prog-bar-value {
    font-size: 13px;
    color: black;
    margin-right: 5px;
}
</style>