<!-- 这是内容区域 -->
<template>
  <div class="flex flex-col h-full">
    <Header class="flex-none h-1/8"></Header>
    <Main class="flex-grow"></Main>
    <Footer class="flex-none h-1/8"></Footer>
  </div>
</template>

<style lang="scss" scoped></style>

<script setup>
import Header from "./components/HeaderArea.vue";
import Main from "./components/MainArea.vue";
import Footer from "./components/FooterArea.vue";
</script>
