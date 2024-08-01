import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./input.css";
import App from "./App.vue";

const app = createApp(App);

const pinia = createPinia();

app.use(ElementPlus).use(pinia);
app.mount("#app");
