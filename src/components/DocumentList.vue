<!-- 这个组件用于展示文件列表 -->
<template>
  <div
    v-if="documentList.length !== 0"
    class="bg-[#f4f4f4] rounded-2xl w-1/2 p-2"
  >
    <div class="flex overflow-x-auto p-2 space-x-4">
      <DocumentInfo
        v-for="(document, index) in documentList"
        :key="document.documentFile.name + document.documentFile.size"
        :is-loading="document.isLoading"
        :file-index="index"
        :file-name="document.documentFile.name"
        :file-size="document.documentFile.size"
      ></DocumentInfo>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
// import { IconoirProvider, BookSolid } from "@iconoir/vue";
import { useDocumentListStore } from "@/stores/documentList";

import DocumentInfo from "@/components/DocumentInfo.vue";

const store = useDocumentListStore();

const documentList = computed(() => store.state.documentList);
</script>

<style scoped></style>
