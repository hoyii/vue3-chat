<template>
  <div>
    <input
      ref="fileInput"
      type="file"
      style="display: none"
      accept=".pdf"
      multiple="true"
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
import { type Document, useDocumentListStore } from "@/stores/documentList";
import { uploadFile } from "@/api/chat";
import { ElNotification } from "element-plus";
import { reactive, ref } from "vue";

const fileInput = ref<HTMLInputElement | null>(null);

// 处理文件上传
const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement; // Type assertion
  const fileList = input.files ? input.files : null;
  if (!fileList) return;
  Array.from(fileList).forEach((file) => {
    const document: Document = reactive({
      documentID: "",
      documentFile: file,
      isLoading: true,
    });
    const store = useDocumentListStore();
    uploadFile(file).then((data: any) => {
      document.isLoading = false;
      document.documentID = data.documentID;
      ElNotification.success(`${data.documentName} 上传成功`);
      console.log(document);
    });
    store.appendDocument(document);
  });
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
