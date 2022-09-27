import { defaultTheme, defineUserConfig } from 'vuepress'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'dream_oyh的blog',
  description: '模仿绝对值_x的高科技产物，卑微人企图咸鱼翻身',
  head:[
    ['link', { rel: 'stylesheet', href: '/mask.css' }]
  ],
  
  extendsMarkdown: md => {
    md.use(require('markdown-it-mathjax3'))
    md.linkify.set({ fuzzyEmail: false })
  },
  
  theme:defaultTheme({
    logo:'https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/logo.jpg',
    navbar:[
      {text:'学习',
       children:[
        {text:'课内学分',
      children:[
      '/study/learn/English.md',          //英语
      '/study/learn/probability.md',      //概率论与数理统计
      '/study/learn/zhitu.md',          //机械制图（三）
    ],           
    },
    {text:'竞赛',
    children:[
      '/study/competition/math.md',      //数学建模
  ],           
  },
    {text:'阅读',
      children:[
      '/study/read/read.md',             //读书
      '/study/read/hamlet.md',        //哈姆雷特英语阅读
    ],           
    },
    {
      text:'编程',
      children:[
        '/study/code/matlab.md',    //matlab语法
        '/study/code/latex.md',     //latex公式编辑器
        '/study/code/vuepress.md',       //vuepress blog搭建
        ],
    },
        
      ],
      
    },
    {
      text:'blog日志',
      link:'/log/log.md',     //博客日志
    },
    {
      text:'游戏',
      children:[
        '/game/genshin_impact.md',  //原神
        '/game/hollow_knight.md',   //空洞骑士
      ]
    },
    {
      text:'旅行',
      link:'/tour/tour.md',
    },

    {
      text:'文章',
      link:'/artical/artical.md',
    },
    {
      text:'推荐',
      children:[
        '/record/up_recommend.md',
        '/record/film_recommend.md',
        '/record/web.md',
      ],
    },
    {
      text:'随笔',
      link:'/write/write.md',
    },
    ],
  })
})

