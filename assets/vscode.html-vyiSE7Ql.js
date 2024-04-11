import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as s,o as c,c as d,d as e,b as n,a as o,w as r,e as a}from"./app-Bf2EFtk3.js";const p={},u=a(`<h1 id="vscode" tabindex="-1"><a class="header-anchor" href="#vscode"><span>VSCode</span></a></h1><h2 id="c-开发环境配置" tabindex="-1"><a class="header-anchor" href="#c-开发环境配置"><span>C++ 开发环境配置</span></a></h2><p><em>2024.03.18</em>，我终于狠下心来鼓起勇气开始看 C++ 的环境配置，看了一晚上基本算是看了一个大概。</p><p>我采用 Clang-Tidy + Clang-format 作为 linter 和 formatter。</p><p>插件下载：<em>Clang-Format</em>, <em>CS 128 Clang-Tidy</em></p><h3 id="clang-format-配置" tabindex="-1"><a class="header-anchor" href="#clang-format-配置"><span>Clang-Format 配置</span></a></h3><p>在<em>settings.json</em>中加入：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;editor.formatOnSave&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">&quot;clang-format.executable&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/absolute/path/to/clang-format&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),m=e("em",null,"clang-format.exe",-1),g=e("code",null,"llvm",-1),h=a(`<p>同时将<code>&quot;[c]&quot;</code>与<code>&quot;[cpp]&quot;</code>修改为下方所示的配置。</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;[c]&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;editor.defaultFormatter&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xaver.clang-format&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;[cpp]&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;editor.defaultFormatter&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xaver.clang-format&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="clang-tidy-配置" tabindex="-1"><a class="header-anchor" href="#clang-tidy-配置"><span>Clang-Tidy 配置</span></a></h3><p>在 <em>VSCode setting</em> 中，更改如下配置。</p><ul><li><code>clang-tidy.executable</code> 可执行文件路径，与 format 一样，搜索<code>clang-tidy.exe</code>的绝对路径</li><li><code>clang-tidy.lintOnSave</code> True</li><li><code>clang-tidy.fixOnSave</code> True</li></ul><h2 id="arduino-开发环境配置" tabindex="-1"><a class="header-anchor" href="#arduino-开发环境配置"><span>Arduino 开发环境配置</span></a></h2><p>踩了无数的坑之后，终于把 Arduino 开发板的配置搞定了。</p><p>Arduino 作为入手成本很低的嵌入式开发工具，很受 biginner 欢迎，但是您能不能把编辑器做好一点（微笑），原生的编辑器设计我不敢恭维，没有自动补全，没有 formatter，差劲的代码高亮，这些都让开发变得极其困难。秉持着 All in VSCode 的原则，我尝试了一下将 Arduino 开发环境也集成进 VSCode，结果一折腾就是半天，现将经验整理如下。</p>`,8),v=e("p",null,"安装环境",-1),C=e("li",null,"安装 VSCode",-1),_={href:"https://www.arduino.cc/en/software",target:"_blank",rel:"noopener noreferrer"},b=e("blockquote",null,[e("p",null,[e("strong",null,"踩坑 (?)")]),e("p",null,[n("这里我到现在也没法确定我是不是被这一步的版本所害，总之在最后，我下载的是"),e("code",null,"1.8.19"),n("版本的 IDE，如果我下载最新版的就没法用（但是做到最后，我又感觉下最新版的应该也可以用，有没有小伙伴替我踩踩坑）")])],-1),k=a(`<li><p>安装插件</p><ul><li>VSCode 中安装<code>arduino</code>插件</li></ul></li><li><p>配置插件</p><ul><li><code>arduino.enableUSBDetection</code> true</li><li><code>arduino.useArduinoCli</code> true <blockquote><p>在 setting 中配置这俩即可，arduino 配置时必须保证<code>arduino.Path</code>和<code>arduino.Command Path</code>是空的，而勾选<code>useArduinoCli</code>则意味着采用扩展捆绑的编辑器，所以和之前下载的版本应该是没有关系的（但是不代表不要下载 IDE，下载 IDE 过程中会把 arduino 编译器下载到 C 盘中，等会儿会用到）。</p></blockquote></li></ul></li><li><p>配置 <code>C/C++</code> 环境</p><blockquote><p>我最大的踩坑就在这，由于最开始不知道要配置 C/C++ 环境，才导致 arduino 直接就不可用</p></blockquote><ul><li>VSCode 中按<code>&lt;Ctrl-Shift-P&gt;</code>打开命令面板，选择<code>C/C++: 编辑配置（UI）</code>，添加配置名为<code>Arduino</code>，将下方的指定编译器改为：</li></ul><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&quot;C:\\Users\\&lt;Username&gt;\\AppData\\Local\\Arduino15\\packages\\arduino\\tools\\avr-gcc\\7.3.0-atmel3.6.1-arduino7\\bin\\avr-g++&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意其中的<code>&lt;Username&gt;</code>需要改成 windows 用户名。（在设置之前，最好查看一下该路径下是否存在<code>avr-g++.exe</code>，如果不存在，说明最开始安装<code>arduino IDE</code>时没有安装成功）</p><blockquote><p>这和前面 IDE 的安装路径无关，这个编译器默认是安装在这个路径下的，找就行了，安装过程中也无法修改他的安装路径。</p></blockquote><ul><li>将该配置页面下的<code>IntelliSense模式</code>改成<code>gcc-x64(legacy)</code><div class="hint-container important"><p class="hint-container-title">提示</p><p>此时，如果不出意外，在该文件夹内应该会出现<code>.vscode</code>文件夹，内部有<code>c_cpp_properities.json</code>文件，该文件内存储了我们刚刚输入的配置信息。这个也是<code>VSCode</code>的局部配置。之后会出现的<code>arduino.json</code>也同理，是局部配置。</p><blockquote><p>（知道叫这个名就行，区别于<code>settings.json</code>，这里面写的都是全局配置，局部配置只在其所在文件夹中生效）</p></blockquote><p>所以之后 arduino 项目的创建都得在该文件夹下进行。(建议重开一个文件夹专门用于 arduino 项目管理，并且把<code>.vscode</code>文件夹捎上)</p></div></li></ul></li><li><p>新建一个<code>.ino</code>程序，输入：</p></li>`,4),f=a(`<div class="language-c++ line-numbers-mode" data-ext="c++" data-title="c++"><pre class="language-c++"><code>void setup(){

}
void loop(){

} // 随便写点什么都可以

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>点击 VSCode 右下角<code>WIN32</code>，在跳出窗口中选择<code>Arduino</code>。</li><li>VSCode 中按<code>&lt;Ctrl-Shift-P&gt;</code>打开命令面板，选择<code>arduino:initialize</code>，运行指令后，根据具体情况在右下角的<code>&lt;Select Programmer&gt;</code> <code>&lt;Select Board Type&gt;</code> <code>&lt;Select Serial Port&gt;</code>，之后会发现<code>.vscode</code>文件夹中又生成了<code>arduino.json</code>文件。</li></ul><p>到此为止，环境就算配置成功了！</p>`,3),y={class:"hint-container details"},q=e("summary",null,"Warning 解决：[Warning] Output path is not specified. Unable to reuse previously compiled files. Verify could be slow.",-1),x={href:"https://arduino.stackexchange.com/questions/45347/warning-when-verifying-sketch-with-vs-code",target:"_blank",rel:"noopener noreferrer"},S=e("p",null,[n("需要在刚产生的"),e("code",null,"arduino.json"),n("文件里，添加"),e("code",null,'"output": "../ArduinoOutput"'),n("（这个路径可以自定义和更改），这样这个"),e("code",null,"warning"),n("就能解决了。 "),e("s",null,"添加时，注意不要漏了逗号")],-1),V={class:"hint-container details"},j=e("summary",null,"问题解决：Verify 后终端出现中文乱码",-1),T={href:"https://blog.csdn.net/weixin_42225355/article/details/104906950",target:"_blank",rel:"noopener noreferrer"},w=e("s",null,"你就说这个破 arduino 做的是什么东西啊，乱七八糟的问题一堆。。",-1);function A(D,F){const l=s("RouteLink"),t=s("ExternalLinkIcon");return c(),d("div",null,[u,e("p",null,[n("其中第二个参数填入"),m,n("的绝对路径，可以用"),o(l,{to:"/articles/software.html#everything"},{default:r(()=>[n(" everything ")]),_:1}),n("查找一下，选择在"),g,n("文件夹下的 exe 文件即可。")]),h,e("ul",null,[e("li",null,[v,e("ul",null,[C,e("li",null,[n("安装 "),e("a",_,[n("Arduino IDE"),o(t)]),b])])]),k]),f,e("details",y,[q,e("p",null,[n("在网上搜索后，找到了"),e("a",x,[n("参考文档"),o(t)])]),S]),e("details",V,[j,e("p",null,[n("参考"),e("a",T,[n("该文档"),o(t)]),n("修改即可 "),w])])])}const O=i(p,[["render",A],["__file","vscode.html.vue"]]),N=JSON.parse('{"path":"/code/vscode.html","title":"VSCode","lang":"zh-CN","frontmatter":{"icon":"vscode","category":"工具","tag":"教程","description":"VSCode C++ 开发环境配置 2024.03.18，我终于狠下心来鼓起勇气开始看 C++ 的环境配置，看了一晚上基本算是看了一个大概。 我采用 Clang-Tidy + Clang-format 作为 linter 和 formatter。 插件下载：Clang-Format, CS 128 Clang-Tidy Clang-Format 配置 ...","head":[["meta",{"property":"og:url","content":"https://dream-oyh.github.io/code/vscode.html"}],["meta",{"property":"og:site_name","content":"Dream_oyh 的 blog"}],["meta",{"property":"og:title","content":"VSCode"}],["meta",{"property":"og:description","content":"VSCode C++ 开发环境配置 2024.03.18，我终于狠下心来鼓起勇气开始看 C++ 的环境配置，看了一晚上基本算是看了一个大概。 我采用 Clang-Tidy + Clang-format 作为 linter 和 formatter。 插件下载：Clang-Format, CS 128 Clang-Tidy Clang-Format 配置 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-11T06:26:10.000Z"}],["meta",{"property":"article:author","content":"OYH"}],["meta",{"property":"article:tag","content":"教程"}],["meta",{"property":"article:modified_time","content":"2024-04-11T06:26:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"VSCode\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-11T06:26:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"OYH\\",\\"email\\":\\"19859860010@163.com\\"}]}"]]},"headers":[{"level":2,"title":"C++ 开发环境配置","slug":"c-开发环境配置","link":"#c-开发环境配置","children":[{"level":3,"title":"Clang-Format 配置","slug":"clang-format-配置","link":"#clang-format-配置","children":[]},{"level":3,"title":"Clang-Tidy 配置","slug":"clang-tidy-配置","link":"#clang-tidy-配置","children":[]}]},{"level":2,"title":"Arduino 开发环境配置","slug":"arduino-开发环境配置","link":"#arduino-开发环境配置","children":[]}],"git":{"createdTime":1707929375000,"updatedTime":1712816770000,"contributors":[{"name":"dream同学0","email":"1399541701@qq.com","commits":5},{"name":"dream-oyh","email":"1399541701@qq.com","commits":1},{"name":"dream_linux","email":"1399541701@qq.com","commits":1},{"name":"lxl66566","email":"lxl66566@gmail.com","commits":1}]},"readingTime":{"minutes":3.94,"words":1183},"filePathRelative":"code/vscode.md","localizedDate":"2024年2月14日","excerpt":"\\n<h2>C++ 开发环境配置</h2>\\n<p><em>2024.03.18</em>，我终于狠下心来鼓起勇气开始看 C++ 的环境配置，看了一晚上基本算是看了一个大概。</p>\\n<p>我采用 Clang-Tidy + Clang-format 作为 linter 和 formatter。</p>\\n<p>插件下载：<em>Clang-Format</em>, <em>CS 128 Clang-Tidy</em></p>\\n<h3>Clang-Format 配置</h3>\\n<p>在<em>settings.json</em>中加入：</p>\\n<div class=\\"language-json\\" data-ext=\\"json\\" data-title=\\"json\\"><pre class=\\"language-json\\"><code><span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token property\\">\\"editor.formatOnSave\\"</span><span class=\\"token operator\\">:</span> <span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token property\\">\\"clang-format.executable\\"</span><span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"/absolute/path/to/clang-format\\"</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{O as comp,N as data};
