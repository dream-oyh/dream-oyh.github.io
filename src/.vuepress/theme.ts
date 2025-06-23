import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://dream-oyh.github.io",
  pure: true,
  author: {
    name: "OYH",
    email: "19859860010@163.com",
  },
  favicon: "/web_logo.jpg",
  logo: "/web_logo.jpg",
  repo: "https://github.com/dream-oyh/dream-oyh.github.io",
  darkmode: "toggle",
  fullscreen: false,
  docsDir: "src",
  // 导航栏
  navbar,
  navbarLayout: {
    start: ["Brand"],
    center: ["Links"],
    end: ["Repo", "Outlook", "Search"],
  },
  // 侧边栏
  sidebar,
  // 页脚
  footer: "希望你能在此有所收获",
  displayFooter: true,
  encrypt: {
    config: {
      "/articles/diary.html": ["0712"],
      "/articles/CSU.html": ["0712"],
    },
  },
  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    tabs: true,
    highlighter: "shiki",
    hint: true,
    figure: true,
    footnote: true,
    imgLazyload: true,
    imgSize: true,
    include: true,
    math: true,
    tasklist: true,
    vPre: true,
    spoiler: true,
    demo: true,
    flowchart: true,
    mark: true,
    mermaid: true,
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
    sub: true,
    sup: true,
  },
  // 博客相关
  blog: {
    intro: "/intro.html",
    medias: {
      BiliBili: "https://space.bilibili.com/1901628168?spm_id_from=333.1007.0.0",
      GitHub: "https://github.com/dream-oyh",
      WechatMP: "https://mp.weixin.qq.com/s/1RJsBxf1yf5aGAzjEWKtZg",
      XiaoHongShu: "https://www.xiaohongshu.com/user/profile/62fd04b7000000001200ff72",
      Douban: "https://www.douban.com/people/248255485/?_i=01385087aP_-jr",
    },
    timeline: "新的内容正在产出……",
    articlePerPage: 5,
    articleInfo: ["Date", "Category", "Tag", "ReadingTime"],
  },
  // 在这里配置主题提供的插件
  plugins: {
    blog: true,
    slimsearch: {
      indexContent: true,
      suggestion: true,
    },
    components: {
      components: ["SiteInfo", "PDF", "Badge"],
      componentOptions: {
        pdf: {
          pdfjs: "/pdfjs-4.5.136-dist",
        },
      },
    },
    icon: {
      assets: "//at.alicdn.com/t/c/font_4435976_nx6nfnrgt4m.css",
    },
    comment: {
      //   provider: "Waline",
      //   serverURL: "https://blog-comments-glpemzd6z-dream-oyhs-projects.vercel.app/",
      //   emoji:['//unpkg.com/@waline/emojis@1.2.0/qq'],
      //   requiredMeta:["nick"],
      //   pageSize:5,
      provider: "Giscus",
      repo: "dream-oyh/Blog_comments_with_Giscus",
      repoId: "R_kgDOLSurkg",
      category: "Announcements",
      categoryId: "DIC_kwDOLSurks4CdPJJ",
    },
  },
});
