import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/code/": [
    {
      text: "编程",
      link: "/code/",
      children: ["markdown.md", "python.md", "Arduino/index.md", "cpp.md"],
    },
    {
      text: "工具",
      children: ["git.md", "latex.md", "shell.md", "vim.md", "Linux.md", "docker.md", "github.md", "vscode.md", "aliyun.md"],
    },
    {
      text: "Python 库",
      prefix: "python/",
      children: [
        //"pandas.md",
        "pytorch/",
        "Seaborn.md",
        "web_crawler.md",
        "websocket.md",
        "LocalAugment.md",
      ],
    },
    {
      text: "锦囊",
      children: ["tips/regex.md", "tips/pdf2docx.md", "tips/keyboard_remap.md", "tips/voc.md"],
    },
  ],
  "/code/python/pytorch/": [
    {
      text: "Pytorch 学习笔记",
      icon: "pytorch",
      children: [
        "1pytorch.md",
        {
          text: "常见的模型源码实现",
          children: ["2.1linear_regression.md", "2.2FashionMNIST.md", "2.3softmax.md", "2.4MLP.md"],
        },
        "3.1Deeplearning_basic.md",
        {
          text: "卷积神经网络",
          children: ["4.1convolutional_nn_basic.md", "4.2LeNet.md", "4.3AlexNet.md", "4.4VGG.md", "4.5NiN.md", "4.6GoogleNet.md"],
        },
        "img.md",
      ],
    },
  ],
  "/english/": [
    {
      text: "主题语料库",
      collapsible: true,
      icon: "diary",
      prefix: "repo/",
      link: "repo/index.md",
      children: ["negative.md", "life.md", "growth.md", "community.md"],
    },
    {
      text: "英语视频词汇积累",
      collapsible: true,
      icon: "state",
      prefix: "video/",
      children: ["1.md", "2.md", "3.md", "4.md", "5.md", "6.md", "7.md", "8.md", "9.md"],
    },
    {
      text: "FREE 大学英语阅读写作能力提升课",
      collapsible: true,
      icon: "build",
      prefix: "free/",
      children: ["1.md", "2.md", "3.md", "4.md", "5.md", "6.md", "7.md", "8.md", "9.md"],
    },
    {
      text: "学习强国官方英语资源",
      collapsible: true,
      icon: "Article",
      prefix: "china/",
      children: ["10.22.md", "10.23.md", "10.24.md", "10.25.md", "10.26.md", "10.27.md", "10.28.md", "10.29.md", "10.30.md", "10.31.md", "11.1.md", "11.2.md"],
    },
  ],
  "/articles/": [
    {
      text: "他山之石",
      icon: "communityfill",
      collapsible: true,
      prefix: "external",
      children: ["2025.md"],
    },
    {
      text: "日拱一卒",
      icon: "pen",
      collapsible: true,
      prefix: "rigongyizu",
      children: ["2024.md", "2025.md"],
    },
    {
      text: "推荐",
      icon: "34wujiaoxingpingfenshixin",
      collapsible: true,
      children: ["software.md", "web.md", "boardcast.md"],
    },
    "fool.md",
    "pcdiy.md",
    "CSU.md",
    "read.md",
    "video_game.md",
    "rss.md",
  ],
  "/credit/": ["index.md"],
  "/blog/": ["index.md", "log.md", "vuepress.md", "spots.md"],
  "/study/": [
    {
      text: "Summer Camp Reivew",
      icon: "xialingying",
      collapsible: true,
      prefix: "/study/SummerCampReview",
      children: ["PhysNet.md", "ObjectDetection.md", "ControlEngineering.md"],
    },
    {
      text: "数据结构（全英）",
      icon: "relation-full",
      collapsible: true,
      prefix: "/study/DataStructure/",
      link: "/study/DataStructure/",
      children: ["linked_list.md", "stack.md", "queue.md", "tree.md", "graph.md", "HashTable.md", "Heap.md"],
    },
    {
      text: "算法学习",
      prefix: "/study/Algorithm/",
      icon: "code",
      collapsible: true,
      link: "/study/Algorithm/index.md",
    },
    {
      text: "科研",
      prefix: "/study/",
      children: ["ros.md", "literature_search.md", "uuvsimulator.md", "proxy.md"],
    },
  ],
  "/study/Algorithm/": [
    {
      text: "算法学习",
      icon: "code",
      link: "index.md",
      children: ["array.md", "linkedlist.md", "hashtable.md", "string.md"],
    },
  ],
});
