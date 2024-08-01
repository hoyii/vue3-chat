<template>
  <div>
    <input
      ref="fileInput"
      type="file"
      style="display: none"
      accept=".pdf"
      @change="handleFileUpload"
    />
    <el-button @click="handleButtonClick">
      <IconoirProvider
        :icon-props="{
          color: '#000000',
          'stroke-width': 1.5,
          width: '2em',
          height: '2em',
        }"
      >
        <PlusCircle />
      </IconoirProvider>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { IconoirProvider, PlusCircle } from "@iconoir/vue";
import { useFileListStore } from "@/stores/fileList";
import { ref } from "vue";

const fileInput = ref<HTMLInputElement | null>(null);

// 处理文件上传
const handleFileUpload = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    const store = useFileListStore();
    store.appendFile(file);
  }
};

// 处理按钮点击事件
const handleButtonClick = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};
</script>

<style lang="less" scoped>
.el-button {
  background-color: #f4f4f4;
  --el-button-hover-border-color: #f4f4f4;
  --el-button-border-color: #f4f4f4;
  --el-button-disabled-border-color: #f4f4f4;
  --el-button-disabled-bg-color: none;
  --el-button-active-border-color: #f4f4f4;
}
</style>
