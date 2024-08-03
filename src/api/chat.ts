import axios from "@/plugins/axios";

import { serverUrl, token } from "@/config/config";

import { parsePack2 } from "@/utils/parsePack";

export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("documentFile", file);
    const resp = await axios.post(
      `${serverUrl}/document/multi_file_chat_upload`,
      formData,
      {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return resp.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAnswerStream = async (
  question: string,
  context: string,
  uid: Array<string>
) => {
  const url = `${serverUrl}/chat/mulit_file_chat_generate_flow`;
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      method: "POST",
      body: JSON.stringify({
        question: question,
        context: context,
        uid: uid,
      }),
    });
    if (!res.body) {
      throw new Error("Network response was not ok");
    }
    const reader = res.body?.getReader();
    const decoder = new TextDecoder("utf-8");

    return new ReadableStream({
      async start(controller) {
        function push() {
          // "done" is a Boolean and value a "Uint8Array"
          reader.read().then(({ done, value }) => {
            // If there is no more data to read
            if (done) {
              // console.log("done", done);
              controller.close();
              return;
            }
            const chunk = parsePack2(
              decoder.decode(value, { stream: true })
            ) as any;
            // Get the data and send it to the browser via the controller
            controller.enqueue(chunk);
            // Check chunks by logging to the console
            push();
          });
        }
        push();
      },
    });
  } catch (error: any) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
};

// 更新记忆力
export const updateMemory = async (
  question: string,
  context: string,
  answer: string
) => {
  try {
    const data = {
      question: question,
      context: context,
      answer: answer,
    };
    const resp = await axios.post(`${serverUrl}/chat/summarize`, data, {
      headers: {
        Authorization: token,
      },
    });
    return resp.data.data;
  } catch (error) {
    console.log(error);
  }
};
