import { defaultTheme, defineUserConfig } from 'vuepress'
const { searchPlugin } = require('@vuepress/plugin-search')

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'dream_oyh 的 blog',
  description: '穿梭于大千世界的普通人',
  head:[
    ['link', { rel: 'stylesheet', href: '/mask.css' }],
    ['link', { rel: 'stylesheet', href: '/highlight.css' }]
  ],

  plugins: [
    searchPlugin({
      locales: {
        '/': {
          placeholder: '搜索',
        },
      },
      maxSuggestions: 10,
    }),
    ],
  theme:defaultTheme({
    
    logo:'https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/logo_2023.jpg',
    navbar:[

    {text:'编程',
        children:[
        '/study/code/latex.md',     //latex
        '/study/code/vuepress.md',  //vuepress blog 搭建
        '/study/code/python.md',    //python
        '/study/code/vscode.md',    //vscode
        '/study/code/git.md',       //git
        '/study/code/markdown.md',  //markdown
        '/study/code/html.md',  //html
        ],
        }, 




  {text:'English',
      children:[
      '/study/English/English.md',     //英语视频词汇积累
      '/study/English/free.md',        //FREE 大学英语
      '/study/English/China.md',       //学习强国英语资源
    ],           
    },

    {
      text:'文章',
      children:[
        '/artical/artical.md',     //文章
        '/write/write.md', //随笔
        '/record/web.md',//网站推荐
        '/study/CPC.md',  //党的理论学习
        '/study/read/read.md',  //阅读
        '/artical/weakness.md'  //产品吐槽
        
      ],  
    },
    {
      text:'blog 日志',
      link:'/log/log.md',     //博客日志
    },
    ],
    
    
  })
})
