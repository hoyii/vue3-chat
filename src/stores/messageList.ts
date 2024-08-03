import { defineStore } from "pinia";
import { reactive } from "vue";
import { getAnswerStream, updateMemory } from "@/api/chat";
import { useDocumentListStore } from "./documentList";
import { useMemoryStore } from "./memory";

export type Message = {
  id?: number;
  content: string;
  role: string;
};

export const useMessageListStore = defineStore("messageList", () => {
  const state = reactive({
    messageList: <Array<Message>>[],
  });

  function addUserMessage(message: Message) {
    // 用数组长度作为新消息的id
    const newId = state.messageList.length;
    message.id = newId;
    state.messageList.push(message);
    // 发送api请求gpt回复
    addGptMessage(message.content);
  }

  function addGptMessage(question: string) {
    function updateMessage(id: number, content: string) {
      if (!state.messageList[id]) {
        // 添加一条消息
        state.messageList.push({
          id: id,
          content: content,
          role: "gpt",
        });
      } else {
        // 流式更新一条消息
        state.messageList[id].content += content;
      }
    }
    // 用数组长度作为新消息的id
    const newId = state.messageList.length;
    // 获取引用的文档 uids
    const ids = useDocumentListStore().getDocumentIDs() as Array<string>;
    const memory = useMemoryStore().getMemory;
    let answer = "";
    getAnswerStream(question, memory, ids)
      .then((stream) => {
        if (!stream) {
          throw new Error("Stream is undefined.");
        }
        const reader = stream.getReader();
        reader.read().then(function processText({ done, value }) {
          if (done) {
            // 更新记忆力
            updateMemory(question, memory, answer).then((data: any) => {
              useMemoryStore().setMemory(data.context);
              console.log("记忆力更新成功");
            });
            return;
          }
          // 在这里获取到了gpt的分段回复
          updateMessage(newId, value);
          answer += value;
          // 继续读取数据
          reader.read().then(processText);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return { state, addUserMessage };
});
