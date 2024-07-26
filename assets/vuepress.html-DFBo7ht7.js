import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as l,c as h,a,e,d as s,b as n,o as p}from"./app-qnVddVOo.js";const r={},d=e(`<h1 id="问题列表" tabindex="-1"><a class="header-anchor" href="#问题列表"><span>问题列表</span></a></h1><h2 id="github-图床建立" tabindex="-1"><a class="header-anchor" href="#github-图床建立"><span>github 图床建立</span></a></h2><p>建立 tuchuang.sh 脚本，脚本内容如下（在 git bash 中运行命令）：</p><p>首先需要在 github 中创建 images 分支，作图床载体</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">cd</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">文件目录地</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">址&gt; </span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">#我这里是docs/.vuepress/public/images    # 1.进入images文件目录下</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> init</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">      # 2.创建仓库</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> add</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -A</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">     # 3.添加目录下所有文件至暂存区</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> remote</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> add</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> origin</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> git@github.com:dream-oyh/dream-oyh.github.io.git</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">     # 4.连接远程仓库</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> commit</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -m</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;注释&#39;</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">    #此处注释可改为$(date &quot;+%Y%m%d-%H:%M:%S&quot;)，以用系统时间代替</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> branch</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -m</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> images</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> push</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -u</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -f</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> origin</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> images</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>origin</code> 可自行编辑，ssh 地址优先于 https 地址</p><p>这里需要用<code>-f</code>进行强制覆盖，<code>origin</code>应与上文中仓库名称相同</p><h2 id="博客部署及源码上传" tabindex="-1"><a class="header-anchor" href="#博客部署及源码上传"><span>博客部署及源码上传</span></a></h2><p>部署代码采用 bash 脚本，脚本代码如下：</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> init</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> add</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -A</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> commit</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -m</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;deploy:&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">$(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">date</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;+%Y%m%d-%H:%M:%S&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> checkout</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -b</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> code_hope</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> push</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> git@github.com:dream-oyh/dream-oyh.github.io.git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> code_hope</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">pnpm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> build</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">cd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> src/.vuepress/dist</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> init</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> add</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -A</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> commit</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -m</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;deploy:&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">$(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">date</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;+%Y%m%d-%H:%M:%S&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> checkout</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -b</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> main_hope</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> push</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> git@github.com:dream-oyh/dream-oyh.github.io.git</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -f</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> main_hope</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">exec</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /bin/bash</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">cd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> -</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="weak-map-key-错误信息" tabindex="-1"><a class="header-anchor" href="#weak-map-key-错误信息"><span>“weak map key”错误信息</span></a></h2><p>原因：使用了<code>&lt;/font&gt;</code>等未知 html 标签以及一些自定义组件标签。</p><p><code>&lt;/font&gt;</code>改用<code>&lt;/text&gt;</code>标签之后即可正常使用</p><p>错误代码如下：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>TypeError: Invalid value used as weak map key</span></span>
<span class="line"><span>    at WeakMap.set (&lt;anonymous&gt;)</span></span>
<span class="line"><span>    at normalizePropsOptions (C:\\Users\\oyh\\vuepress-starter\\node_modules\\@vue\\runtime-core\\dist\\runtime-core.cjs.prod.js:3179:15)</span></span>
<span class="line"><span>    at createComponentInstance (C:\\Users\\oyh\\vuepress-starter\\node_modules\\@vue\\runtime-core\\dist\\runtime-core.cjs.prod.js:5695:23)</span></span>
<span class="line"><span>    at renderComponentVNode (C:\\Users\\oyh\\vuepress-starter\\node_modules\\@vue\\server-renderer\\dist\\server-renderer.cjs.prod.js:168:22)</span></span>
<span class="line"><span>    at Object.ssrRenderComponent (C:\\Users\\oyh\\vuepress-starter\\node_modules\\@vue\\server-renderer\\dist\\server-renderer.cjs.prod.js:605:12)</span></span>
<span class="line"><span>    at _sfc_ssrRender$b (C:\\Users\\oyh\\vuepress-starter\\docs\\.vuepress\\.temp\\.server\\app.js:1362:24)</span></span>
<span class="line"><span>    at renderComponentSubTree (C:\\Users\\oyh\\vuepress-starter\\node_modules\\@vue\\server-renderer\\dist\\server-renderer.cjs.prod.js:250:13)</span></span>
<span class="line"><span>    at renderComponentVNode (C:\\Users\\oyh\\vuepress-starter\\node_modules\\@vue\\server-renderer\\dist\\server-renderer.cjs.prod.js:185:16)</span></span>
<span class="line"><span>    at renderVNode (C:\\Users\\oyh\\vuepress-starter\\node_modules\\@vue\\server-renderer\\dist\\server-renderer.cjs.prod.js:292:22)</span></span>
<span class="line"><span>    at renderComponentSubTree (C:\\Users\\oyh\\vuepress-starter\\node_modules\\@vue\\server-renderer\\dist\\server-renderer.cjs.prod.js:256:13)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="在-vuepress-中插入思维导图" tabindex="-1"><a class="header-anchor" href="#在-vuepress-中插入思维导图"><span>在 vuepress 中插入思维导图</span></a></h2>`,16),k=s("p",null,"在 vscode 中下载“markmap”插件，如下图所示：",-1),g=s("div",{style:{"text-align":"center"}},[s("img",{alt:"markmap插件",src:"https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/vuepress_1.png",width:"60%",height:"60%"})],-1),o=s("p",null,"新建一个.md 或.mm 文档，用于构建思维导图 html 文件",-1),c=s("p",null,"点击 vscode 右上角思维导图图标（若没有该图标，则是未成功安装插件）",-1),m=s("div",{style:{"text-align":"center"}},[s("img",{alt:"markmap思维导图图标",src:"https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/vuepress_2.png"})],-1),u=s("p",null,"即可打开思维导图窗口进行绘制",-1),y=s("p",null,[n("绘制完成后，点击右下角"),s("code",null,"export"),n("，生成 html 文件")],-1),A=s("p",null,"将 html 文件移动至 docs/.vuepress/public/markmap/中",-1),v=e('<p>利用 iframe 标签在你的 markdown 中插入思维导图</p><div class="language-html line-numbers-mode" data-highlighter="shiki" data-ext="html" data-title="html" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">iframe</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> :src</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;$withBase(&#39;/markmap/xxx.html&#39;)&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> width</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;100%&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> height</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;800&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> frameborder</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;0&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> scrolling</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;Yes&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> leftmargin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;0&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> topmargin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;0&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">iframe</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="思维导图语法" tabindex="-1"><a class="header-anchor" href="#思维导图语法"><span>思维导图语法</span></a></h3><p>所有 markdown 所具有的文本编辑语法都可以使用</p><p>思维导图构建语法见下图</p><div style="text-align:center;"><img alt="思维导图语法" src="https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/vuepress_3.png"></div><h2 id="转移-blog-本地文件至-ubuntu" tabindex="-1"><a class="header-anchor" href="#转移-blog-本地文件至-ubuntu"><span>转移 Blog 本地文件至 Ubuntu</span></a></h2><p>由于之前在本地搭建了 Blog，现在若需要在 Ubuntu 系统上编辑时，需要调整 <code>node.js</code>版本，具体步骤如下：</p><ol><li>先删除本地文件内<code>node_modules</code>文件夹</li><li>执行<code>npm i</code>重新安装即可。</li></ol><h2 id="npm-配置镜像源" tabindex="-1"><a class="header-anchor" href="#npm-配置镜像源"><span>npm 配置镜像源</span></a></h2><p>采用阿里镜像源：</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">npm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> config</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> set</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> registry</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> https://registry.npmmirror.com</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>若要撤销，变更回 npm 官方镜像源</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">npm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> config</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> set</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> registry</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> https://registry.npmjs.org</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="vuepress-theme-hope-waline-评论配置问题" tabindex="-1"><a class="header-anchor" href="#vuepress-theme-hope-waline-评论配置问题"><span>vuepress-theme-hope Waline 评论配置问题</span></a></h2>',15),F=e(`<p>参照官方文档配置 Waline 评论插件后，出现了<code>failed to fetch</code>报错，在检查 Vercel 服务器，LeanCloud 数据存储服务的配置后，均未发现与官方文档配置不一致之处，还未找到原因。</p><p>因此本博客的评论区配置转用<code>Giscus</code>方案，方便易用，具体步骤可以参考<a href="https://plugin-comment2.vuejs.press/zh/guide/giscus.html" target="_blank" rel="noopener noreferrer">官方文档</a>。</p><h2 id="博客部署至-cloudflare-pages" tabindex="-1"><a class="header-anchor" href="#博客部署至-cloudflare-pages"><span>博客部署至 Cloudflare Pages</span></a></h2><p>先将渲染后的博客静态文件上传至 github repo（仓库名不重要）的 main 分支（其他分支也行）</p><p>打开<a href="https://pages.cloudflare.com/" target="_blank" rel="noopener noreferrer">pages.dev</a>，用邮箱注册帐号并登陆。进入平台后，依照提示选择绑定 github 帐号，链接到仓库的 main 分支（也就是你存放的分支）。按照个人喜好定义<code>Project name</code>，比如本博客是<code>dream-oyh</code>，生成的域名会显示在下方，有关<code>build</code>的选项可以不选，直接点击<code>Save and deploy</code>即可完成。</p><h2 id="博客访客数据分析-google-analytics" tabindex="-1"><a class="header-anchor" href="#博客访客数据分析-google-analytics"><span>博客访客数据分析-Google Analytics</span></a></h2><p>利用 Google Analytics 提供的服务分析网页数据。直接进<a href="https://analytics.google.com/analytics/web/" target="_blank" rel="noopener noreferrer"> 官网操作 </a>，按照提示填写账号和媒体资源，最后填写博客域名，Google 会给出一段 html 代码，将其加入<code>config.ts</code>的<code>head</code>中即可，代码如下：</p><div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" data-title="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">head</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:[</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &quot;script&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      async</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      src</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;https://www.googletagmanager.com/gtag/js?id=G-NQR8MZSFKD&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    },</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    ],</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &quot;script&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    {},</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    \`&lt;!-- Google tag (gtag.js) --&gt;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    window.dataLayer = window.dataLayer || [];</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    function gtag(){dataLayer.push(arguments);}</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    gtag(&#39;js&#39;, new Date());</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    gtag(&#39;config&#39;, &#39;G-xxxxxxxx&#39;);\`</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    ],</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">]</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8);function b(B,C){const i=l("Badge");return p(),h("div",null,[d,a(i,{text:"step1"}),k,g,a(i,{text:"step2"}),o,c,m,u,a(i,{text:"step3"}),y,a(i,{text:"step4"}),A,a(i,{text:"step5"}),v,a(i,{text:"未解决！"}),F])}const x=t(r,[["render",b],["__file","vuepress.html.vue"]]),E=JSON.parse(`{"path":"/blog/vuepress.html","title":"问题列表","lang":"zh-CN","frontmatter":{"date":"2022-07-26T00:00:00.000Z","icon":"ask","category":"博客","tag":"问题记录","description":"问题列表 github 图床建立 建立 tuchuang.sh 脚本，脚本内容如下（在 git bash 中运行命令）： 首先需要在 github 中创建 images 分支，作图床载体 origin 可自行编辑，ssh 地址优先于 https 地址 这里需要用-f进行强制覆盖，origin应与上文中仓库名称相同 博客部署及源码上传 部署代码采用 ba...","head":[["meta",{"property":"og:url","content":"https://dream-oyh.github.io/blog/vuepress.html"}],["meta",{"property":"og:site_name","content":"Dream_oyh 的 blog"}],["meta",{"property":"og:title","content":"问题列表"}],["meta",{"property":"og:description","content":"问题列表 github 图床建立 建立 tuchuang.sh 脚本，脚本内容如下（在 git bash 中运行命令）： 首先需要在 github 中创建 images 分支，作图床载体 origin 可自行编辑，ssh 地址优先于 https 地址 这里需要用-f进行强制覆盖，origin应与上文中仓库名称相同 博客部署及源码上传 部署代码采用 ba..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-27T08:24:20.000Z"}],["meta",{"property":"article:author","content":"OYH"}],["meta",{"property":"article:tag","content":"问题记录"}],["meta",{"property":"article:published_time","content":"2022-07-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-27T08:24:20.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"问题列表\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-07-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-04-27T08:24:20.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"OYH\\",\\"email\\":\\"19859860010@163.com\\"}]}"]]},"headers":[{"level":2,"title":"github 图床建立","slug":"github-图床建立","link":"#github-图床建立","children":[]},{"level":2,"title":"博客部署及源码上传","slug":"博客部署及源码上传","link":"#博客部署及源码上传","children":[]},{"level":2,"title":"“weak map key”错误信息","slug":"weak-map-key-错误信息","link":"#weak-map-key-错误信息","children":[]},{"level":2,"title":"在 vuepress 中插入思维导图","slug":"在-vuepress-中插入思维导图","link":"#在-vuepress-中插入思维导图","children":[{"level":3,"title":"思维导图语法","slug":"思维导图语法","link":"#思维导图语法","children":[]}]},{"level":2,"title":"转移 Blog 本地文件至 Ubuntu","slug":"转移-blog-本地文件至-ubuntu","link":"#转移-blog-本地文件至-ubuntu","children":[]},{"level":2,"title":"npm 配置镜像源","slug":"npm-配置镜像源","link":"#npm-配置镜像源","children":[]},{"level":2,"title":"vuepress-theme-hope Waline 评论配置问题","slug":"vuepress-theme-hope-waline-评论配置问题","link":"#vuepress-theme-hope-waline-评论配置问题","children":[]},{"level":2,"title":"博客部署至 Cloudflare Pages","slug":"博客部署至-cloudflare-pages","link":"#博客部署至-cloudflare-pages","children":[]},{"level":2,"title":"博客访客数据分析-Google Analytics","slug":"博客访客数据分析-google-analytics","link":"#博客访客数据分析-google-analytics","children":[]}],"git":{"createdTime":1707976316000,"updatedTime":1714206260000,"contributors":[{"name":"dream同学0","email":"1399541701@qq.com","commits":3},{"name":"dream_linux","email":"1399541701@qq.com","commits":2},{"name":"dream-oyh","email":"1399541701@qq.com","commits":1}]},"readingTime":{"minutes":4.05,"words":1215},"filePathRelative":"blog/vuepress.md","localizedDate":"2022年7月26日","excerpt":"\\n<h2>github 图床建立</h2>\\n<p>建立 tuchuang.sh 脚本，脚本内容如下（在 git bash 中运行命令）：</p>\\n<p>首先需要在 github 中创建 images 分支，作图床载体</p>\\n<div class=\\"language-sh line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"sh\\" data-title=\\"sh\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#0184BC;--shiki-dark:#56B6C2\\">cd</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\"> &lt;</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">文件目录地</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">址&gt; </span><span style=\\"--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic\\">#我这里是docs/.vuepress/public/images    # 1.进入images文件目录下</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#4078F2;--shiki-dark:#61AFEF\\">git</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> init</span><span style=\\"--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic\\">      # 2.创建仓库</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#4078F2;--shiki-dark:#61AFEF\\">git</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> add</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> -A</span><span style=\\"--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic\\">     # 3.添加目录下所有文件至暂存区</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#4078F2;--shiki-dark:#61AFEF\\">git</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> remote</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> add</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> origin</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> git@github.com:dream-oyh/dream-oyh.github.io.git</span><span style=\\"--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic\\">     # 4.连接远程仓库</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#4078F2;--shiki-dark:#61AFEF\\">git</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> commit</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> -m</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> '注释'</span><span style=\\"--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic\\">    #此处注释可改为$(date \\"+%Y%m%d-%H:%M:%S\\")，以用系统时间代替</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#4078F2;--shiki-dark:#61AFEF\\">git</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> branch</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> -m</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> images</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#4078F2;--shiki-dark:#61AFEF\\">git</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> push</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> -u</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> -f</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> origin</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> images</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{x as comp,E as data};
