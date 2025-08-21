import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "Forrest blog",
  description: "穿梭于大千世界的普通人",
  head: [
    [
      "script",
      {
        // defer 属性，等同于 <script defer>
        defer: true,
        // src 属性
        src: "https://static.cloudflareinsights.com/beacon.min.js",
        // data-cf-beacon 属性
        "data-cf-beacon": '{"token": "e371d6a45e2b41f6a4423e7d9da5c04e"}',
      },
    ],
  ],

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
