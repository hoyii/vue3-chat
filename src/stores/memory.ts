import { defineStore } from "pinia";
import { reactive, computed } from "vue";

export const useMemoryStore = defineStore("memory", () => {
  const state = reactive({
    memory: "",
  });

  const getMemory = computed(() => state.memory);

  function setMemory(memory: string) {
    state.memory = memory;
  }

  return { state, getMemory, setMemory };
});
