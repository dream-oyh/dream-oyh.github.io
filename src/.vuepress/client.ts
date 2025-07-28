import { defineClientConfig } from "vuepress/client";
import Progress from "./components/prog.vue";
import bookList from "./components/bookList.vue";
import switText from "./components/switText.vue";
import showItem from "./components/showItem.vue";
import travelGrid from "./components/travelGrid.vue";
export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("Progress", Progress);
    app.component("bookList", bookList);
    app.component("switText", switText);
    app.component("showItem", showItem);
    app.component("travelGrid", travelGrid);
  },
});
