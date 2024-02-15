import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: 'Dream_oyh 的 blog',
  description: '穿梭于大千世界的普通人',
  head:[
    ['link', { rel: 'stylesheet', href: '/mask.css' }],
    ['link', { rel: 'stylesheet', href: '/highlight.css' }]
  ],
  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
