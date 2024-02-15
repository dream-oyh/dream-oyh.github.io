import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/code/":[
            {
                text: "编程",
                link:"/code/",
                children:[
                    "html.md",
                    "markdown.md",
                    "python.md",
                ],
            },
            {
                text: "工具",
                children:[
                    "git.md",
                    "vscode.md",
                    "latex.md"
                ],
            },
            {
                text: "Python 库",
                children:[
                    "python/pandas.md",
                    "python/Pytorch.md",
                    "python/Seaborn.md",
                    "python/web_crawler.md",
                ],
            },

  ],
  "/english/":[
            {
                text:"目录",
                icon:"language",
                link:"",
            },
            {
                text: "英语视频词汇积累",
                collapsible: true,
                icon: "state",
                prefix: "video/",
                children:[
                   "1.md",
                   "2.md",
                   "3.md", 
                   "4.md", 
                   "5.md", 
                   "6.md", 
                   "7.md", 
                   "8.md", 
                   "9.md", 
                ],
            },
            {
                text: "FREE 大学英语阅读写作能力提升课",
                collapsible: true,
                icon:"build",
                prefix: "free/",
                children:[
                   "1.md",
                   "2.md",
                   "3.md", 
                   "4.md", 
                   "5.md", 
                   "6.md", 
                   "7.md", 
                   "8.md", 
                   "9.md", 
                ],
            },
            {
                text: "学习强国官方英语资源",
                collapsible: true,
                icon: "article",
                prefix: "china/",
                children:[
                   "10.22.md",
                   "10.23.md",
                   "10.24.md", 
                   "10.25.md", 
                   "10.26.md", 
                   "10.27.md", 
                   "10.28.md", 
                   "10.29.md", 
                   "10.30.md", 
                   "10.31.md", 
                   "11.1.md", 
                   "11.2.md", 
                ],
            },
    
  ],
  "/article/":[
            {
                text: "文章",
                link:"/article/",
            },
  ],
  "/credit/":[
            {
                text: "学习资料",
                link:"/credit/",
            },
  ],
  "/blog/":[
            {
                text: "关于博客",
                link:"/blog/",
                icon:"vue",
            },
            {
                text: "博客日志",
                link:"log.md",
                icon:"blog",
            },
            {
                text: "问题列表",
                link:"vuepress.md",
                icon:"ask",
            },
            {
                text:"博客日程",
                link:"schedule.md",
                icon:"check"
            },
            {
                text:"博客常用站点跳转",
                link:"spots.md",
                icon:"at"
            }
  ]
})
