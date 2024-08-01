import axios from "@/plugins/axios";

import { parsePack } from "@/utils/parsePack";

import { apiKey, apiUrl } from "@/config/config.ts";

export const getAnswer = async (question: string) => {
  try {
    const response = await axios.post(
      apiUrl,
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant.",
          },
          {
            role: "user",
            content: question,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAnswerStream = async (question: string) => {
  const url = "https://api.gpt.ge/v1/chat/completions";
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      method: "POST",
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a helpful assistant that accurately answers queries using GitHub Privacy Statement. Use the text provided to form your answer, but avoid copying word-for-word from the context. Try to use your own words when possible. Keep your answer under 5 sentences. Be accurate, helpful, concise, and clear.`,
          },
          {
            role: "user",
            content: question,
          },
        ],
        stream: true,
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
            const chunk = parsePack(
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
