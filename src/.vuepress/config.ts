import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: 'Dream_oyh 的 blog',
  description: '穿梭于大千世界的普通人',
  head:[
    ['link', { rel: 'stylesheet', href: '/mask.css' }],
    ['link', { rel: 'stylesheet', href: '/highlight.css' }],
    [
    "script",
    {
      async: true,
      src:"https://www.googletagmanager.com/gtag/js?id=G-NQR8MZSFKD",
    },
    ],
    [
    "script",
    {},
    `<!-- Google tag (gtag.js) -->
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-xxxxxxxx');`,
    ],
],
  
  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
