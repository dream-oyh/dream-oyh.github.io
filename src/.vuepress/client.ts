import { defineClientConfig } from "vuepress/client";
import Progress from "./components/prog.vue";
import bookList from "./components/bookList.vue";
import switText from "./components/switText.vue";
export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("Progress", Progress);
    app.component("bookList", bookList);
    app.component("switText", switText);

  },
});
