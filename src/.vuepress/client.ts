import { defineClientConfig } from "vuepress/client";
import Progress from "./components/prog.vue";
import Container from "./components/container.vue";
export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("Progress", Progress);
    app.component("Container", Container);
  },
});
