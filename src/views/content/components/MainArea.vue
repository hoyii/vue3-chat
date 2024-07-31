<!-- 这是内容区域的中部 用于显示对话列表 -->
<template>
  <div>
    <div
      class="overflow-y-scroll"
      v-for="message in messageList"
      :key="message.id"
    >
      <div v-if="message.role === 'gpt'">{{ message.text }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

type Message = {
  id: number;
  role: string;
  text: string;
};

const messageList = ref<Array<Message>>([
  {
    id: 1,
    role: "user",
    text: "hello gpt",
  },
  {
    id: 2,
    role: "gpt",
    text: "hello user",
  },
]);
</script>

<style lang="scss" scoped></style>
