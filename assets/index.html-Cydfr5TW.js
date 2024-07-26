import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as a,c as d,d as o,b as t,a as i,w as l,e,o as c}from"./app-qnVddVOo.js";const s={},p=e('<h1 id="arduino-开发板" tabindex="-1"><a class="header-anchor" href="#arduino-开发板"><span>Arduino 开发板</span></a></h1><p>我的测试技术与信号处理被再一次地分到了肖老师的班上，绪论课上，老师向我们展示了往年学生用 Arduino 开发板做的小车，一时兴起，准备以此为契机，开启我的嵌入式开发之旅 <s>（虽然我也不知道这算不算嵌入式开发，但总归算是一块板子）</s></p><p>查了一下 Arduino 的官网，发现文档写的还算详细，学起来应该会简单一点，<a href="https://docs.arduino.cc/" target="_blank" rel="noopener noreferrer">官方 tutorials</a> 在这里。</p><p><a href="http://www.taichi-maker.com/" target="_blank" rel="noopener noreferrer">国内太极创客网站</a>提供了非常详细的入门教程，的确是从零开始入门了，但是这会导致他的技术路线被拉得太长，如果有一定基础可以跳过基础部分直接看项目。</p><h2 id="editor" tabindex="-1"><a class="header-anchor" href="#editor"><span>Editor</span></a></h2><p>官方提供了 Arduino IDE 编辑器，很难用，没有自动补全，代码高亮也很差劲。</p>',6),h=e('<details class="hint-container details"><summary>Archived(第一次配置 VSCode，失败后写的吐槽)</summary><p><strong>踩坑</strong></p><p>我想把它集成进 VSCode 里做开发，但是发现这样会影响我 VSCode 的 C++ 环境（Arduino extension 捆绑与<code>C/C++</code>使用，但是我的 C++ 环境准备用 Clangd 配置，VSCode 提示两者冲突）。并且，我根据官方文档安装好 Arduino extension 后，发现仍然有报错，无法识别<code>pinMode</code>外调函数，也无法识别第三方库，查看解决方式后，竟然是将<code>C/C++</code>的报错引擎关闭…… <s>很合理不是吗，让 Linter 不报错，那程序就没有错（确信）</s></p></details><p>》就算配置到了 VSCode，Arduino 的包管理也是依托屑，建议以 Arduino 为跳板转到 51 和 stm32 作开发。</p><h2 id="智能避障小车" tabindex="-1"><a class="header-anchor" href="#智能避障小车"><span>智能避障小车</span></a></h2><ul><li>设备材料：</li></ul><table><thead><tr><th style="text-align:center;">设备名称</th><th style="text-align:center;">个数</th><th style="text-align:center;">单价/元</th></tr></thead><tbody><tr><td style="text-align:center;">Arduino UNO R3 开发板</td><td style="text-align:center;">1</td><td style="text-align:center;">30</td></tr><tr><td style="text-align:center;">AFMotor 电机拓展板</td><td style="text-align:center;">1</td><td style="text-align:center;">11.21</td></tr><tr><td style="text-align:center;">轮子</td><td style="text-align:center;">4</td><td style="text-align:center;">2.4</td></tr><tr><td style="text-align:center;">tt 直流电机</td><td style="text-align:center;">4</td><td style="text-align:center;">4.6</td></tr><tr><td style="text-align:center;">电池槽 (3 节)</td><td style="text-align:center;">1</td><td style="text-align:center;">3.03</td></tr><tr><td style="text-align:center;">杜邦线（公对公）</td><td style="text-align:center;">一排</td><td style="text-align:center;">4</td></tr><tr><td style="text-align:center;">杜邦线（母对母）</td><td style="text-align:center;">一排</td><td style="text-align:center;">2.31</td></tr></tbody></table><p>（2024-03-02 截止）</p><table><thead><tr><th style="text-align:center;">设备名称</th><th style="text-align:center;">个数</th><th style="text-align:center;">单价/元</th></tr></thead><tbody><tr><td style="text-align:center;">HC-R6 蓝牙模块</td><td style="text-align:center;">1</td><td style="text-align:center;">12</td></tr><tr><td style="text-align:center;">sg90 舵机 + HC-SR04 超声模块 + 支架</td><td style="text-align:center;">1</td><td style="text-align:center;">13</td></tr></tbody></table><p>（2024-03-10 截止）</p>',8);function u(g,m){const r=a("RouteLink");return c(),d("div",null,[p,o("p",null,[t("所以我考虑集成进 VSCode 编辑，配置过程可以参考"),i(r,{to:"/code/vscode.html#arduino-%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE"},{default:l(()=>[t("此处")]),_:1}),t("。")]),h])}const A=n(s,[["render",u],["__file","index.html.vue"]]),_=JSON.parse('{"path":"/code/Arduino/","title":"Arduino 开发板","lang":"zh-CN","frontmatter":{"date":"2024-03-01T00:00:00.000Z","icon":"arduino","description":"Arduino 开发板 我的测试技术与信号处理被再一次地分到了肖老师的班上，绪论课上，老师向我们展示了往年学生用 Arduino 开发板做的小车，一时兴起，准备以此为契机，开启我的嵌入式开发之旅 查了一下 Arduino 的官网，发现文档写的还算详细，学起来应该会简单一点，官方 tutorials 在这里。 国内太极创客网站提供了非常详细的入门教程，的...","head":[["meta",{"property":"og:url","content":"https://dream-oyh.github.io/code/Arduino/"}],["meta",{"property":"og:site_name","content":"Dream_oyh 的 blog"}],["meta",{"property":"og:title","content":"Arduino 开发板"}],["meta",{"property":"og:description","content":"Arduino 开发板 我的测试技术与信号处理被再一次地分到了肖老师的班上，绪论课上，老师向我们展示了往年学生用 Arduino 开发板做的小车，一时兴起，准备以此为契机，开启我的嵌入式开发之旅 查了一下 Arduino 的官网，发现文档写的还算详细，学起来应该会简单一点，官方 tutorials 在这里。 国内太极创客网站提供了非常详细的入门教程，的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-12T08:46:02.000Z"}],["meta",{"property":"article:author","content":"OYH"}],["meta",{"property":"article:published_time","content":"2024-03-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-12T08:46:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Arduino 开发板\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-03-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-03-12T08:46:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"OYH\\",\\"email\\":\\"19859860010@163.com\\"}]}"]]},"headers":[{"level":2,"title":"Editor","slug":"editor","link":"#editor","children":[]},{"level":2,"title":"智能避障小车","slug":"智能避障小车","link":"#智能避障小车","children":[]}],"git":{"createdTime":1709307031000,"updatedTime":1710233162000,"contributors":[{"name":"dream同学0","email":"1399541701@qq.com","commits":5}]},"readingTime":{"minutes":1.89,"words":566},"filePathRelative":"code/Arduino/index.md","localizedDate":"2024年3月1日","excerpt":"\\n<p>我的测试技术与信号处理被再一次地分到了肖老师的班上，绪论课上，老师向我们展示了往年学生用 Arduino 开发板做的小车，一时兴起，准备以此为契机，开启我的嵌入式开发之旅 <s>（虽然我也不知道这算不算嵌入式开发，但总归算是一块板子）</s></p>\\n<p>查了一下 Arduino 的官网，发现文档写的还算详细，学起来应该会简单一点，<a href=\\"https://docs.arduino.cc/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">官方 tutorials</a> 在这里。</p>\\n<p><a href=\\"http://www.taichi-maker.com/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">国内太极创客网站</a>提供了非常详细的入门教程，的确是从零开始入门了，但是这会导致他的技术路线被拉得太长，如果有一定基础可以跳过基础部分直接看项目。</p>","autoDesc":true}');export{A as comp,_ as data};
