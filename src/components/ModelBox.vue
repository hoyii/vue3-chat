<!-- 这是模型的选择框 -->
<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="inline-flex w-full justify-center gap-x-1.5 rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        {{ modelSelect }}
        <ChevronDownIcon
          class="-mr-1 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-2xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1">
          <MenuItem
            v-slot="{ active }"
            v-for="model in Object.keys(models)"
            :key="model"
            @click="handleItemClick(model)"
          >
            <div
              href="#"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm',
              ]"
            >
              {{ model }}
            </div>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<style scoped></style>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import { models, useModelStore } from "@/stores/model";

const modelStore = useModelStore();
const modelSelect = ref(modelStore.getModel);

onMounted(() => {
  const model = modelStore.getModel;

  if (!model) {
    modelSelect.value = "GPT-4o mini";
    modelStore.setModel(modelSelect.value);
  } else {
    modelSelect.value = model;
  }
});

const handleItemClick = (model: string) => {
  modelSelect.value = model;
};

// 监听 modelSelect 的变化，并同步更新到 store 中
watch(modelSelect, (newValue: any) => {
  modelStore.setModel(newValue);
});
</script>
