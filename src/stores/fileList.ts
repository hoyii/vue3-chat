import { defineStore } from "pinia";
import { reactive, computed } from "vue";

export const useFileListStore = defineStore("fileList", () => {
  const state = reactive({
    fileList: <Array<File>>[],
  });

  const getFileList = computed(() => state.fileList);

  function appendFile(file: File) {
    state.fileList.push(file);
  }

  function deleteFile(index: number) {
    state.fileList.splice(index, 1);
  }

  return { state, getFileList, appendFile, deleteFile };
});
