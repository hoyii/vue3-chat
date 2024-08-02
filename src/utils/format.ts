// 文件名格式化函数
export const formatName = (fileName: string) => {
  fileName = fileName.slice(0, fileName.indexOf(".pdf"));
  const maxLength = 10;
  let truncated = "";
  let length = 0;

  for (const char of fileName) {
    const charLength = char.match(/[^\x00-\xff]/) ? 2 : 1; // 中文字符占2个长度，英文字符占1个长度
    if (length + charLength > maxLength) break;
    truncated += char;
    length += charLength;
  }

  return truncated;
};

// 文件大小格式化函数
export const formatSize = (fileSize: number) => {
  if (fileSize >= 1024 * 1024) {
    return (fileSize / (1024 * 1024)).toFixed(2) + " MB";
  } else {
    return (fileSize / 1024).toFixed(2) + " KB";
  }
};
