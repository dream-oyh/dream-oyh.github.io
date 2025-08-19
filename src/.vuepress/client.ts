import { defineClientConfig } from "vuepress/client";
import Progress from "./components/prog.vue";
import bookList from "./components/bookList.vue";
import switText from "./components/switText.vue";
import showItem from "./components/showItem.vue";
import travelGrid from "./components/travelGrid.vue";
import vibeImage from "./components/vibeImage.vue";
import countDown from "./components/info/countDown.vue";
import banner from "./components/info/banner.vue";
import musicrank from "./components/info/musicrank.vue";
import musicRankList from "./components/info/musicRankList.vue";
export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("Progress", Progress);
    app.component("bookList", bookList);
    app.component("switText", switText);
    app.component("showItem", showItem);
    app.component("travelGrid", travelGrid);
    app.component("vibeImage", vibeImage);
    app.component("countDown", countDown);
    app.component("banner", banner);
    app.component("musicrank", musicrank);
    app.component("musicRankList", musicRankList);
  },
});
