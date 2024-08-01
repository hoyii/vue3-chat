<!-- 这是侧边栏 -->
<template>
  <div class="backgrourd-color">
    <div class="flex justify-between p-4">
      <el-button>折叠</el-button>
      <el-button>新聊天</el-button>
    </div>
    <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
      <li v-for="i in count" :key="i" class="infinite-list-item rounded-3xl">
        <el-button class="flex-1 h-full rounded-3xl"
          >这是第{{ i }}条历史记录</el-button
        >
      </li>
    </ul>
  </div>
</template>

<style>
.backgrourd-color {
  background-color: #f9f9f9;
}
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
  background: #f9f9f9;
  margin: 10px;
  color: #000000;
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
