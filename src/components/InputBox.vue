<!-- 这是一个输入框 -->
<template>
  <div class="flex p-8 space-x-2">
    <el-input v-model="text">这是一个输入框</el-input>
    <el-button>Done</el-button>
  </div>
</template>

<style lang="scss" scoped></style>

<script setup>
import { ref } from "vue";

const text = ref("");
</script>
