import { defineStore } from "pinia";
import { reactive, computed } from "vue";

export const useQuestionStore = defineStore("question", () => {
  const state = reactive({
    question: "",
  });

  const getQuestion = computed(() => state.question);

  function setQuestion(question: string) {
    state.question = question;
  }

  return { state, getQuestion, setQuestion };
});
