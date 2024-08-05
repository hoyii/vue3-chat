<!-- 这是模型的选择框 -->
<template>
  <div class="relative text-left">
    <div>
      <el-button
        @click="handleConfigButtonClick"
        class="rounded-2xl shadow-sm hover:bg-gray-50"
      >
        <img src="/setting.svg" alt="setting" />
      </el-button>
    </div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div v-show="showConfig" class="absolute right-0 z-20 w-96 top-10">
        <el-card class="rounded-2xl">
          <div class="flex space-x-4 items-center mb-4">
            <label class="inline-block text-sm font-bold w-20">API URL</label
            ><el-input v-model="config.apiUrl"></el-input>
          </div>
          <div class="flex space-x-4 items-center mb-4">
            <label class="inline-block text-sm font-bold w-20">API KEY</label
            ><el-input
              v-model="config.apiKey"
              type="password"
              show-password
            ></el-input>
          </div>
          <div class="flex justify-center">
            <el-button class="text-sm font-bold" @click="handleConfigButtonSave"
              >保存</el-button
            >
          </div>
        </el-card>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="less"></style>

<script setup lang="ts">
import { reactive, ref } from "vue";

import { useModelStore } from "@/stores/model";

const showConfig = ref(false);

type Config = {
  apiUrl: string;
  apiKey: string;
};

const config = reactive<Config>({
  apiUrl: useModelStore().getApiUrl,
  apiKey: useModelStore().getApiKey,
});

const handleConfigButtonClick = () => {
  showConfig.value = true;
};

function handleConfigButtonSave() {
  showConfig.value = false;
  useModelStore().setApiKey(config.apiKey);
  useModelStore().setApiUrl(config.apiUrl);
}

onmousedown = (event) => {
  console.log(event);
};
</script>
