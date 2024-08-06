import { defineStore } from "pinia";
import { reactive } from "vue";
import { getAnswerStream } from "@/api/gpt";
import { models, useModelStore } from "./model";

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
    let answer = "";
    const model = models[useModelStore().getModel as string];
    const apiUrl = `${useModelStore().getApiUrl}/chat/completions` as string;
    const apiKey = useModelStore().getApiKey as string;
    getAnswerStream(question, model, apiUrl, apiKey)
      .then((stream) => {
        if (!stream) {
          throw new Error("Stream is undefined.");
        }
        const reader = stream.getReader();
        reader.read().then(function processText({ done, value }) {
          // 在这里获取到了gpt的分段回复
          if (done) {
            return;
          }
          if (value !== "") {
            updateMessage(newId, value);
            answer += value;
          }
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
