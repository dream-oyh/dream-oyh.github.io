import { defineClientConfig } from "vuepress/client";
import Progress from "./components/prog.vue";
export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("Progress", Progress);
  },
});
