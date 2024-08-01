<!-- 这个页面用于没有消息时的展示 -->
<template>
  <div class="flex flex-col items-center justify-center w-full h-full">
    <IconoirProvider
      :icon-props="{
        color: '#000000',
        'stroke-width': 1,
        width: '5em',
        height: '5em',
      }"
    >
      <ChatLinesSolid />
    </IconoirProvider>
    <span class="mt-7 text-3xl">Hi!Can I help you?</span>
  </div>
</template>

<script setup lang="ts">
import { IconoirProvider, ChatLinesSolid } from "@iconoir/vue";
</script>

<style lang="less" scoped></style>
