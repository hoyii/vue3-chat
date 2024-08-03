<!-- 这是一个输入框 -->
<template>
  <div class="bg-color flex p-4 space-x-2 rounded-2xl w-1/2 items-end">
    <FileUploader />
    <el-input
      id="input_1"
      class="textarea"
      type="textarea"
      v-model="input"
      :autosize="{ minRows: 1, maxRows: 8 }"
      placeholder="请输入你的问题"
      resize="none"
      @keydown.enter.prevent="handleButtonClick"
    ></el-input>
    <div>
      <el-button :disabled="!input" @click="handleButtonClick">
        <IconoirProvider
          :icon-props="{
            color: '#000000',
            'stroke-width': 1,
            width: '2em',
            height: '2em',
          }"
        >
          <SendSolid />
        </IconoirProvider>
      </el-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
@focus-border-color: #000000;

.el-button {
  background-color: #f4f4f4;
  --el-button-hover-border-color: #f4f4f4;
  --el-button-border-color: #f4f4f4;
  --el-button-disabled-border-color: #f4f4f4;
  --el-button-disabled-bg-color: none;
  --el-button-active-border-color: #f4f4f4;
}

.bg-color {
  background-color: #f4f4f4;
}

.el-textarea {
  font-family:
    ui-sans-serif,
    -apple-system,
    system-ui,
    Segoe UI,
    Roboto,
    Ubuntu,
    Cantarell,
    Noto Sans,
    sans-serif,
    Helvetica,
    Apple Color Emoji,
    Arial,
    Segoe UI Emoji,
    Segoe UI Symbol;
  font-size: 1rem;
  --el-input-focus-border-color: none;
  --el-input-bg-color: none;
  --el-input-border-color: none;
  --el-input-hover-border-color: none;
}
</style>

<script setup lang="ts">
import { IconoirProvider, SendSolid } from "@iconoir/vue";

import { ref, nextTick } from "vue";

import { useMessageListStore } from "@/stores/messageList";

import FileUploader from "./DocumentUploader.vue";

const input = ref("");

// 在这里处理按钮点击事件 向gpt发送问题
const handleButtonClick = (e: KeyboardEvent) => {
  if (e.key === "Enter" && e.shiftKey) {
    input.value += "\n";
    const textarea = document.getElementById("input_1");
    nextTick(() => {
      if (!textarea) return;
      textarea.scrollTop = textarea.scrollHeight;
    });
    return;
  }
  if (!input.value) {
    return;
  }
  const question = input.value;
  input.value = "";
  const messageList = useMessageListStore();
  messageList.addUserMessage({
    role: "user",
    content: question,
  });
};
</script>
