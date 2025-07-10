import { defineClientConfig } from "vuepress/client";
import Progress from "./components/prog.vue";
import bookList from "./components/bookList.vue";
export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("Progress", Progress);
    app.component("bookList", bookList);
  },
});
