<template>
  <div class="flex h-screen overflow-hidden">
    <!-- <SideBar class="flex-none w-1/6"></SideBar> -->
    <Content class="flex-grow"></Content>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import Content from "./views/content/ContentView.vue";
import SideBar from "./views/SideBar.vue";
</script>
