<!-- 这是内容区域的中部 用于显示对话列表 -->
<template>
  <div ref="messageContainer" class="flex justify-center overflow-y-auto p-8">
    <div class="w-1/2">
      <Empty v-show="messageList.length == 0"></Empty>
      <div v-for="message in messageList" :key="message.id" class="mb-10">
        <MessageBox
          :role="message.role"
          :content="message.content"
        ></MessageBox>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MessageBox from "@/components/MessageBox.vue";
import Empty from "@/components/Empty.vue";
import { useMessageListStore } from "@/stores/messageList";
import { ref, computed, watch, nextTick } from "vue";

const store = useMessageListStore();

const messageContainer = ref<HTMLElement | null>(null);

const messageList = computed(() => {
  return store.state.messageList;
});

// 监听消息变化并自动滚动到底部
watch(store.state.messageList, (newValue) => {
  if (newValue) {
    scrollToBottom();
  }
});

const scrollToBottom = () => {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
    }
  });
};
</script>

<style lang="scss" scoped></style>
