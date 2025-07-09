---
Date: 2025-06-27
icon: wancheng
---

# 学习计划

::: info 正在学习的内容

- [ ] 完成优恩捷横向项目开发（2025.6.19-2025.10.10）

  - [x] 阅读诊断及刷写规范相关文件
  - [x] 编写 FBL 刷写流程的 C 语言协议框架
  - [ ] 整理框架内容，确定函数接口，按照命名规范修改代码
  - [ ] 确定硬件接口，列出函数清单

- [ ] [EZ.Encoder 社区](https://www.ez-encoder.com/feed)[强化学习入门课](https://www.youtube.com/watch?v=TMbidgQBI8M)
- [ ] 学习[ Vue3 基础语法课](https://www.bilibili.com/video/BV1Za4y1r7KE) <Progress :current="56" :goal="71"/>
  - [x] 尝试在博客里自己写组件

::: details done 归档

- [ ] 完成优恩捷横向项目开发（2025.6.19-2025.10.10）
  - [x] 首先完成 FM33FG0xA CAN 通信测试 <Progress :current="7" :goal="7"/>
    - [x] 用该板子完成点灯操作
    - [x] 阅读 FM33FG0xA 数据手册 CAN 部分
    - [x] 列出一个寄存器清单，搞清楚每一个寄存器都是做啥用的
    - [x] 阅读复旦微官方提供的 CAN 库函数
    - [x] 通过调用寄存器，手动编写自发自收 CAN 通信测试，发送一个数据后让 led 灯亮起。
    - [x] 优化代码，接收数据时对`RxMessage`的处理有点勉强（
    - [x] 连接 CAN PHY 实现两个设备间的 CAN 通信
  - [ ] ~~学习[ OTA 相关知识](https://www.bilibili.com/video/BV1SatHeBEVG)~~
  - [ ] ~~写 OTA 的 BootLoader 代码~~
    - [x] ~~配置串口 USART 和 DMA 资源的初始化~~
    - [ ] ~~写串口的接收和发送函数~~
    - [ ] ~~PC 端配置串口助手用于测试~~
- [x] 学习 C++编程环境搭建
  - [x] 初步学习[XMake 的使用](https://zhuanlan.zhihu.com/p/640701847)
  - [x] 重新整理 [C++ 板块](/code/cpp.html)的笔记
- [x] 学习[江科大 PID 控制课程](https://www.bilibili.com/video/BV1G9zdYQEr3)

:::

::: tip 短期想做的

- [ ] 杭州 7.9 蒋村 English Corner

::: details done 归档

- [x] 在浙大买辆二手电动
- [x] 进一批新纸质书
- [x] 浙大探图
- [x] 杭州 7.2 蒋村 English Corner

- [ ] ~~杭州 7.6 黑神话悟空艺术展~~

:::

::: important 课外目标+需要坚持做的事

- 在读书目
  - [ ] 《我的天才女友》——那不勒斯四部曲第一部 <Progress :current="50" :goal="400"/>
  - [ ] 《To the Lighthouse》 <Progress :current="3" :goal="160"/>
- 运动
  - [ ] 周二、四、六长跑 3km
- English
  - [ ] 每晚一小时外语阅读 + 周末做单词梳理

::: details done 归档

- [x] 《人类简史》 <Progress :current="408" :goal="408"/>
- [x] 《孤儿的新年礼物-兰波诗集》 <Progress :current="200" :goal="200"/>

:::

::: danger 未来要做的事

- [ ] 基于 stm32 的平衡车开发
- [ ] 学前端开发 ~~（这辈子也学不上系列）~~
- [ ] 学 Qt 开发 ~~（这辈子也学不上系列）~~
- [ ] [斯坦福 CS336：手把手带你从零构建 ChatGPT](https://www.bilibili.com/video/BV1BWEWzfEKi)

:::

#### 每日背单词数量统计

<iframe frameborder="no" src="/charts/words.html" width="100%" height="280" loading="lazy"></iframe>
