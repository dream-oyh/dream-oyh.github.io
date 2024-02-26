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
                    "latex.md",
                    "shell.md",
                    "vim.md",
                    "Linux.md",
                    "github.md",
                  
                ],
            },
            {
                text: "Python 库",
                children:[
                    "python/pandas.md",
                    {
                        text:"Pytorch",
                        icon:"pytorch",
                        link:"python/pytorch/1pytorch.md"
                    },
                    "python/Seaborn.md",
                    "python/web_crawler.md",
                ],
            },
            {
                text: "锦囊",
                collapsible: true,
                children:[
                    "tips/regex.md"
                ],
            },

  ],
  "/code/python/pytorch/":[
            {
                text: "Pytorch 学习笔记",
                icon: "pytorch",
                children:[
                    {
                      text:"Pytorch 基础",
                      link: "1pytorch.md",
                    },
                    {
                      text:"常见的模型源码实现",
                      collapsible: true,
                      children:[
                        "2.1linear_regression.md",
                        "2.2FashionMNIST.md",
                        "2.3softmax.md",
                        "2.4MLP.md",
                      ]
                    },
                    {
                      text:"走进深度学习",
                      link: "3.1Deeplearning_basic.md",
                    },
                    {
                      text: "卷积神经网络",
                      collapsible: true,
                      children:[
                        "4.1convolutional_nn_basic.md",
                        "4.2LeNet.md",
                        "4.3AlexNet.md",
                        "4.4VGG.md",
                        "4.5NiN.md",
                        "4.6GoogleNet.md",

                      ]
                    }
                ],
            }
                
            
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
                icon: "Article",
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
                text: "随笔",
                icon: "pen",
                children:[
                    "article.md",
                    "weakness.md",
                ]
            },
            {
                text: "推荐",
                icon: "34wujiaoxingpingfenshixin",
                children:[
                    "software.md",
                    "web.md",
                    "film_recommend.md",
                ]
            },
            {
                text: "读书笔记",
                icon: "note",
                children:[
                    "read.md",
                    "hamlet.md"
                ]
            },
            {
                text: "他山之石",
                icon: "communityfill",
                link:"external.md"
            }
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
            },
            {
                text: "博客日志",
                link:"log.md",
            },
            {
                text: "问题列表",
                link:"vuepress.md",
            },
            {
                text:"博客日程",
                link:"schedule.md",
            },
            {
                text:"博客常用站点跳转",
                link:"spots.md",
            }
  ]
})
