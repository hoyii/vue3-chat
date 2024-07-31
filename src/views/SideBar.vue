<!-- 这是侧边栏 -->
<template>
  <div>
    <div>历史记录</div>
    <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
      <li v-for="i in count" :key="i" class="infinite-list-item">
        这是第{{ i }}条历史记录
      </li>
    </ul>
  </div>
</template>

<style>
.infinite-list {
  height: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
const count = ref(0);
const load = () => {
  count.value += 2;
};
</script>
