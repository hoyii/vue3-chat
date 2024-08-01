<!-- 这个组件用于展示文件列表 -->
<template>
  <div class="flex justify-start items-start">
    <!-- <IconoirProvider
      v-for="_ in fileList"
      :icon-props="{
        color: '#000000',
        'stroke-width': 1,
        width: '2em',
        height: '2em',
      }"
    >
      <BookSolid />
    </IconoirProvider> -->
    <img v-for="_ in fileList" src="/pdf.svg" alt="Logo" class="w-20" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
// import { IconoirProvider, BookSolid } from "@iconoir/vue";
import { useFileListStore } from "@/stores/fileList";

const store = useFileListStore();

const fileList = computed(() => store.state.fileList);
</script>

<style scoped></style>
