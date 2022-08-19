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
    logo:'http://raw.githubusercontent.com/dream-oyh/dream-oyh.github.io/images/logo.jpg',
    navbar:[
      {text:'学习',
       children:[
        {text:'学业',
      children:[
        '/study/math.md',      //数学建模
      '/study/English.md',          //英语
      '/study/read.md',             //读书
      '/study/probability.md',      //概率论与数理统计
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

    {
      text:'B站',

      link:'/bilibili/bilibili.md'
    },
    ],
  })
})

