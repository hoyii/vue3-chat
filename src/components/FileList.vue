<!-- 这个组件用于展示文件列表 -->
<template>
  <div v-if="fileList.length !== 0" class="bg-[#f4f4f4] rounded-2xl w-1/2 p-6">
    <div class="flex overflow-x-auto p-2 space-x-4">
      <FileInfo
        v-for="(file, index) in fileList"
        :key="file.name + file.size"
        :file-index="index"
        :file-name="file.name"
        :file-size="file.size"
      ></FileInfo>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
// import { IconoirProvider, BookSolid } from "@iconoir/vue";
import { useFileListStore } from "@/stores/fileList";

import FileInfo from "@/components/FileInfo.vue";

const store = useFileListStore();

const fileList = computed(() => store.state.fileList);
</script>

<style scoped></style>
