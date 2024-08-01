<!-- 封装单个消息框的样式 -->
<template>
  <div v-if="props.role === 'gpt'" class="flex justify-start">
    <el-card shadow="hover" class="card rounded-3xl">
      <div v-html="renderMarkdown(props.content)" class="render" />
    </el-card>
  </div>
  <div v-else class="flex justify-end">
    <el-card shadow="hover" class="back-color card rounded-3xl">
      <div v-html="renderMarkdown(props.content)" class="render" />
    </el-card>
  </div>
</template>

<style lang="less" scoped>
@import "@/styles/markdown-styles-light.less";
.back-color {
  background-color: #f4f4f4;
}
:deep(.card) .el-card__body {
  padding: 10px !important;
}
// :deep(.render) pre {
//   display: block;
//   overflow: auto;
//   font-size: 1em;
//   padding: 1em;
//   border-radius: 1em;
// }
// :deep(.render) li {
//   font-size: 1em;
//   background-color: #f4f4f4;
//   border-radius: 0.3em;
//   padding: 0.2em 0.4em;
//   color: #333;
// }
</style>

<script setup lang="ts">
import { ElCard } from "element-plus";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

const props = defineProps<{
  role: string;
  content: string;
}>();

// 高亮代码
const highlightCode = (str: string, lang: string): string => {
  const language = hljs.getLanguage(lang);
  if (language) {
    try {
      return (
        '<pre class="hljs"><code>' +
        hljs.highlight(lang, str, true).value +
        "</code></pre>"
      );
    } catch (error) {
      console.error(error);
    }
  }
  // 如果未指定语言或无法识别语言，则使用默认的逃逸 HTML 处理
  return (
    '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
  );
};

const md = new MarkdownIt({
  breaks: true,
  html: true,
  linkify: true,
  typographer: true,
  highlight: highlightCode,
});

const renderMarkdown = (text: string) => {
  return md.render(text);
};
</script>
