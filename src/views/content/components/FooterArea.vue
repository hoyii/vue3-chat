<!-- 这是底部的输入区域 -->
<template>
  <div>
    <div class="flex flex-col items-center mt-4 mb-8">
      <FileList></FileList> <InputBox></InputBox>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import FileList from "@/components/DocumentList.vue";
import InputBox from "@/components/InputBox.vue";
</script>
