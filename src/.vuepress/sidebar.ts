import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/code/":[
            {
                text: "编程",
                link:"/code/",
                children:[
                    "git.md",
                    "html.md",
                    "markdown.md",
                    "python.md",
                    "vscode.md",
                ],
            },

  ],
  "/english/":[
            {
                text: "English",
                link:"/english/",
                children:[
                   "English.md",
                   "free.md",
                   "China.md", 
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
            }
  ]
})
