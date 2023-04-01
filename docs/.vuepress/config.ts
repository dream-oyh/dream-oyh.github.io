import { defaultTheme, defineUserConfig } from 'vuepress'
const { searchPlugin } = require('@vuepress/plugin-search')

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'dream_oyh的blog',
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
    
    logo:'https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/logo.jpg',
    navbar:[
      
  {text:'学习',
      children:[
        {text:'课内学分',
        children:[
        '/study/learn/probability.md',      //概率论与数理统计
        '/study/learn/zhitu.md',          //机械制图（三）
        ],           
        },
        {text:'学分之外',
        children:[
        '/study/traffic/traffic.md',       //交通信控
        '/study/competition/math.md',       //数学建模
        ],           
        },
        {text:'English',
        children:[
        '/study/English/English.md',     //英语视频词汇积累
        '/study/English/free.md',        //FREE大学英语
        '/study/English/China.md',       //学习强国英语资源
        '/study/English/midnight.md',    //midnight 歌词
        '/study/English/Poems.md',       //英美诗歌品读
        ],           
        },
    {text:'阅读',
        children:[
        '/study/read/read.md',          //读书
        '/study/read/hamlet.md',        //哈姆雷特英语阅读
        ],           
        },
        {
        text:'编程',
        children:[
        '/study/code/matlab.md',    //matlab语法
        '/study/code/latex.md',     //latex公式编辑器
        '/study/code/vuepress.md',  //vuepress blog搭建
        ],
        }, 
        {
          text:'党的理论学习',
          link:'/study/CPC.md',  //党的理论学习
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
