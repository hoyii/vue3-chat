// 解析消息格式
export const parsePack = (str: string) => {
  const dataPattern = /({"content":".*?"})/g;
  let match;
  const dataList = [];

  while ((match = dataPattern.exec(str)) !== null) {
    try {
      //   console.log(match[1]);
      const json = JSON.parse(match[1]);
      if (json.content) {
        dataList.push(json.content);
      }
    } catch (e) {
      console.log("JSON parse error: ", e);
    }
  }

  return dataList.join("");
};

export const parsePack2 = (str: string) => {
  const dataPattern = /("data": ".*?")/g;
  let match;
  const dataList = [];

  while ((match = dataPattern.exec(str)) !== null) {
    try {
      let temp = `{${match[1]}}`;
      temp = temp.replace("data", "content");
      const json = JSON.parse(temp);
      if (json.content) {
        dataList.push(json.content);
      }
    } catch (e) {
      console.log("JSON parse error: ", e);
    }
  }

  return dataList.join("");
};
