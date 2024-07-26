import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as n,e as a,d as s,b as i}from"./app-qnVddVOo.js";const l={},h=a(`<h1 id="pytorch-的配置与基本操作" tabindex="-1"><a class="header-anchor" href="#pytorch-的配置与基本操作"><span>Pytorch 的配置与基本操作</span></a></h1><p><a href="https://pytorch.org/" target="_blank" rel="noopener noreferrer">官网</a></p><p><a href="https://tangshusen.me/Dive-into-DL-PyTorch/" target="_blank" rel="noopener noreferrer">《动手学深度学习-Pytorch 版》学习文档</a></p><p><a href="https://zh.d2l.ai/index.html" target="_blank" rel="noopener noreferrer">《动手学深度学习》原书文档</a></p><h2 id="miniconda-配置-pytorch" tabindex="-1"><a class="header-anchor" href="#miniconda-配置-pytorch"><span>Miniconda 配置 Pytorch</span></a></h2><p>由于 poetry 配置 pytorch 很麻烦，所以我把 pytorch 配置在了 linux 环境下，并且采取 miniconda 作为包管理器。</p><p>到<a href="https://pytorch.org/get-started/locally/" target="_blank" rel="noopener noreferrer">官网的 Get started 文档</a> 选择你的 PC 端配置，可以在终端用<code>nvidia-smi</code>命令查看 PC 的 <code>CUDA</code> 版本。我的配置是：</p><ul><li><code>Pytorch Build</code> Stable(2.2.0)</li><li><code>Your OS</code> linux</li><li><code>Package</code> conda</li><li><code>Lanuage</code> python</li><li><code>Compute Platform</code> CUDA 11.8 运行以下代码来配置环境：</li></ul><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">conda</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pytorch</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> torchvision</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> torchaudio</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pytorch-cuda=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">11.8</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -c</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pytorch</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -c</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> nvidia</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><blockquote><p><strong>踩坑：</strong></p><p>如果决定采用<code>conda</code>做包管理器，就老老实实用<code>conda</code>创建虚拟环境，并且在虚拟环境中安装<code>pytorch</code>，GPU 加速版会大概占用 7 ～ 8 GB 空间，请注意磁盘空间的规划。不要像我一样没搞清楚，用了<code>conda</code>管理环境，又反用<code>pip</code>作包管理，最后这个环境整了一天才整出来</p></blockquote><ul><li>安装脚本</li></ul><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">conda</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> create</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -n</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> torch</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> python=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">3.9</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">conda</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> activate</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> torch</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">conda</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pytorch</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> torchvision</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> torchaudio</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pytorch-cuda=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">11.8</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -c</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pytorch</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -c</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> nvidia</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用：</p><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> torch</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="tensor-创建及基本操作" tabindex="-1"><a class="header-anchor" href="#tensor-创建及基本操作"><span>Tensor 创建及基本操作</span></a></h2><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">x </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> torch.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">tensor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">([</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">])  </span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># 指定数据创建 tensor</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">y </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> torch.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">empty</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)  </span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># 创建 2x3 空 tensor</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">x1 </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> torch.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">random</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)  </span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># 创建 2x3 随机 tensor</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">x2 </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> torch.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">zeros</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#986801;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">dtype</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">torch.long)  </span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># 创建 long 型的 0 tensor</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">x3 </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> torch.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">ones</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)  </span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># 创建 2x3 全 1 tensor</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">tuple</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> x1.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">size</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()  </span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># 返回一个 tuple，任何对于 tuple 的操作都可以适用</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># 加法</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">x </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">+</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> y</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">torch.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">add</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(x, y, </span><span style="--shiki-light:#986801;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">out</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">result) </span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># 通过 out 参数指定输出</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">y.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">add_</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(x)  </span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># pytorch 的 inplace 操作都有在最后加上下划线</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="torch-中的乘法" tabindex="-1"><a class="header-anchor" href="#torch-中的乘法"><span>Torch 中的乘法</span></a></h3><p><code>Torch</code>包中包括多种乘法方式，具体的细则可以看<a href="https://www.cnblogs.com/HOMEofLowell/p/15962140.html" target="_blank" rel="noopener noreferrer">这篇博客</a></p>`,18),r=s("div",{class:"hint-container tip"},[s("p",{class:"hint-container-title"},"总结"),s("ul",null,[s("li",null,[s("code",null,"torch.mul()"),i(" 有广播机制，各个元素相乘")]),s("li",null,[s("code",null,"torch.multiply()"),i(" 与"),s("code",null,"torch.mul()"),i("相同")]),s("li",null,[s("code",null,"torch.dot()"),i("计算两向量的点积")]),s("li",null,[s("code",null,"torch.mv()"),i(" 计算矩阵和向量的乘积（二者一定有一个维度尺寸相同）")]),s("li",null,[s("code",null,"torch.mm()"),i(" 线代中严格的矩阵乘法")]),s("li",null,[s("code",null,"torch.bmm()"),i(" 批量矩阵相乘，比如"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mo",{stretchy:"false"},"["),s("mi",null,"b"),s("mo",null,"×"),s("mi",null,"m"),s("mo",null,"×"),s("mi",null,"n"),s("mo",{stretchy:"false"},"]"),s("mo",null,"∗"),s("mo",{stretchy:"false"},"["),s("mi",null,"b"),s("mo",null,"×"),s("mi",null,"n"),s("mo",null,"×"),s("mi",null,"p"),s("mo",{stretchy:"false"},"]"),s("mo",null,"="),s("mo",{stretchy:"false"},"["),s("mi",null,"b"),s("mo",null,"×"),s("mi",null,"m"),s("mo",null,"×"),s("mi",null,"p"),s("mo",{stretchy:"false"},"]")]),s("annotation",{encoding:"application/x-tex"},"[b\\times m\\times n] * [b\\times n \\times p] = [b\\times m \\times p]")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mopen"},"["),s("span",{class:"mord mathnormal"},"b"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"×"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6667em","vertical-align":"-0.0833em"}}),s("span",{class:"mord mathnormal"},"m"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"×"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord mathnormal"},"n"),s("span",{class:"mclose"},"]"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"∗"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mopen"},"["),s("span",{class:"mord mathnormal"},"b"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"×"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6667em","vertical-align":"-0.0833em"}}),s("span",{class:"mord mathnormal"},"n"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"×"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord mathnormal"},"p"),s("span",{class:"mclose"},"]"),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),s("span",{class:"mrel"},"="),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mopen"},"["),s("span",{class:"mord mathnormal"},"b"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"×"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6667em","vertical-align":"-0.0833em"}}),s("span",{class:"mord mathnormal"},"m"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"×"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord mathnormal"},"p"),s("span",{class:"mclose"},"]")])])])]),s("li",null,[s("code",null,"torch.matmul()"),i(" 混合型矩阵乘法，会根据输入维度自动匹配，易出错，不建议使用。")])])],-1),p=a(`<p>的那是该博文中没有明确写<code>torch.matmul()</code>的用法，具体可以查<a href="https://pytorch.org/docs/stable/generated/torch.matmul.html" target="_blank" rel="noopener noreferrer">官方文档</a></p><h3 id="索引" tabindex="-1"><a class="header-anchor" href="#索引"><span>索引</span></a></h3><p>可以采用类似 numpy 的索引，<code>y=x[0,:]</code>，但是索引出的数据与原数据共享内存，修改一个另一个也会改变。</p><h3 id="改变形状" tabindex="-1"><a class="header-anchor" href="#改变形状"><span>改变形状</span></a></h3><p><code>view(*size)</code>可以改变<code>tensor</code>的形状，同理，与原数据共享内存，可以理解为：view 仅仅是改变了对这个张量的观察角度，内部数据并未改变。</p><p>如果需要返回一个新的独立副本，应该先<code>clone</code>再<code>view</code>，即：<code>x.clone().view(3,5)</code>\\</p><h3 id="线性代数" tabindex="-1"><a class="header-anchor" href="#线性代数"><span>线性代数</span></a></h3><p>与 MATLAB 语法类似：</p><table><thead><tr><th style="text-align:center;">语法</th><th style="text-align:left;">功能</th></tr></thead><tbody><tr><td style="text-align:center;"><code>trace</code></td><td style="text-align:left;">矩阵的迹</td></tr><tr><td style="text-align:center;"><code>diag</code></td><td style="text-align:left;">对角线元素</td></tr><tr><td style="text-align:center;"><code>triu/tril</code></td><td style="text-align:left;">上三角或下三角矩阵</td></tr><tr><td style="text-align:center;"><code>mm</code></td><td style="text-align:left;">矩阵乘法</td></tr><tr><td style="text-align:center;"><code>t</code></td><td style="text-align:left;">矩阵转置</td></tr><tr><td style="text-align:center;"><code>dot</code></td><td style="text-align:left;">矩阵内积</td></tr><tr><td style="text-align:center;"><code>inverse</code></td><td style="text-align:left;">求逆矩阵</td></tr><tr><td style="text-align:center;"><code>svd</code></td><td style="text-align:left;">奇异值分解</td></tr></tbody></table><h3 id="tensor-转-numpy" tabindex="-1"><a class="header-anchor" href="#tensor-转-numpy"><span>Tensor 转 numpy</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">a </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> torch.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">rand</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">b </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> a.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">numpy</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="numpy-转-tensor" tabindex="-1"><a class="header-anchor" href="#numpy-转-tensor"><span>numpy 转 Tensor</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">a </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> torch.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">rand</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">b </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> a.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">from_numpy</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container important"><p class="hint-container-title">注意</p><p>以上两种方法得到的 Tensor/numpy 共享内存，改变一个另一个也会改变。</p></div><h3 id="tensor的存储和读取" tabindex="-1"><a class="header-anchor" href="#tensor的存储和读取"><span><code>Tensor</code>的存储和读取</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">torch.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">save</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(x, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;tensor.pt&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)  </span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># 保存</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">x </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> torch.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">load</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;tensor.pt&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)  </span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># 读取</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>Tensor</code>的保存支持多种数据类型，可以是<code>Tensor</code>，也可以是<code>list</code>和<code>dictionary</code>，保存的 <code>Tensor</code> 和读取的 <code>Tensor</code> 具有相同的类型。<code>Tensor</code>会被保存到以<code>.pt</code>为后缀名的文件中。</p></blockquote><h2 id="自动求梯度" tabindex="-1"><a class="header-anchor" href="#自动求梯度"><span>自动求梯度</span></a></h2><h3 id="function对象" tabindex="-1"><a class="header-anchor" href="#function对象"><span><code>Function</code>对象</span></a></h3><p>如果将其属性<code>.requires_grad</code>设置为<code>True</code>，它将开始追踪 (track) 在其上的所有操作（这样就可以利用链式法则进行梯度传播了）。完成计算后，可以调用<code>.backward()</code>来完成所有梯度计算。此<code>Tensor</code>的梯度将累积到<code>.grad</code>属性中。</p><p>如果不想要被继续追踪，可以调用<code>.detach()</code>将其从追踪记录中分离出来，这样就可以防止将来的计算被追踪，这样梯度就传不过去了。此外，还可以用<code>with torch.no_grad()</code>将不想被追踪的操作代码块包裹起来，这种方法在评估模型的时候很常用，因为在评估模型时，我们并不需要计算可训练参数<code>（requires_grad=True）</code>的梯度。</p><p><code>Function</code>是另外一个很重要的类。<code>Tensor</code>和<code>Function</code>互相结合就可以构建一个记录有整个计算过程的有向无环图（DAG）。每个<code>Tensor</code>都有一个<code>.grad_fn</code>属性，该属性即创建该<code>Tensor</code>的<code>Function</code>, 就是说该<code>Tensor</code>是不是通过某些运算得到的，若是，则<code>grad_fn</code>返回一个与这些运算相关的对象，否则是<code>None</code>。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>这个 Function 能够反映该<code>Tensor</code>是如何被创建的，<code>print(x.grad_fn)</code>后可以显示其对象名称，包括但不限于：<code>&lt;AddBackward&gt;</code> , <code>&lt;MeanBackward1&gt;</code>, <code>&lt;SumBackward0&gt;</code></p></div><p>所以，梯度链一定是从一个 <code>Tensor(requires_grad=True)</code> 被创建开始的，这个 <code>Tensor</code>被称作叶子节点，Pytorch 提供了 <code>is_leaf()</code> 函数来角读取其是否为叶子节点。</p><h3 id="梯度" tabindex="-1"><a class="header-anchor" href="#梯度"><span>梯度</span></a></h3><p>首先我们得明白在计算流中反向传播的概念，推荐参考<a href="http://colah.github.io/posts/2015-08-Backprop/" target="_blank" rel="noopener noreferrer">colah&#39;s blog 有关反向传播的理解</a></p><div class="hint-container important"><p class="hint-container-title">前向传播与反向传播区别</p><p><strong>前向传播</strong>：只能获得一个输出量对指定自变量的梯度</p><p><strong>反向传播</strong>：遍历一次就可以获得输出量对于计算流图中任意节点的梯度</p></div><p><strong>反向传播</strong>的过程是累加的（这一部分还并没有找到相关原理的文章做支撑，暂且先记住），所以在反向传播之前需要将梯度清零。</p><h4 id="举例说明" tabindex="-1"><a class="header-anchor" href="#举例说明"><span>举例说明</span></a></h4><p>现有如下 python 程序：</p><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> torch</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">x </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> torch.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">ones</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#986801;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">requires_grad</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">True</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">y </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> x </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 2</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">z </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> y </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">*</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> y </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">*</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 3</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">out </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> z.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">mean</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,31),d=s("p",{class:"katex-block"},[s("span",{class:"katex-display"},[s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[s("semantics",null,[s("mrow",null,[s("mi",null,"o"),s("mi",null,"u"),s("mi",null,"t"),s("mo",null,"="),s("mfrac",null,[s("mn",null,"1"),s("mn",null,"4")]),s("msubsup",null,[s("mi",{mathvariant:"normal"},"Σ"),s("mrow",null,[s("mi",null,"i"),s("mo",null,"="),s("mn",null,"1")]),s("mn",null,"4")]),s("mn",null,"3"),s("mo",{stretchy:"false"},"("),s("msub",null,[s("mi",null,"x"),s("mi",null,"i")]),s("mo",null,"+"),s("mn",null,"2"),s("msup",null,[s("mo",{stretchy:"false"},")"),s("mn",null,"2")])]),s("annotation",{encoding:"application/x-tex"}," out=\\frac{1}{4}\\Sigma_{i=1}^{4}3(x_i+2)^2 ")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6151em"}}),s("span",{class:"mord mathnormal"},"o"),s("span",{class:"mord mathnormal"},"u"),s("span",{class:"mord mathnormal"},"t"),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),s("span",{class:"mrel"},"="),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"2.0074em","vertical-align":"-0.686em"}}),s("span",{class:"mord"},[s("span",{class:"mopen nulldelimiter"}),s("span",{class:"mfrac"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"1.3214em"}},[s("span",{style:{top:"-2.314em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},"4")])]),s("span",{style:{top:"-3.23em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"frac-line",style:{"border-bottom-width":"0.04em"}})]),s("span",{style:{top:"-3.677em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},"1")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.686em"}},[s("span")])])])]),s("span",{class:"mclose nulldelimiter"})]),s("span",{class:"mord"},[s("span",{class:"mord"},"Σ"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.8641em"}},[s("span",{style:{top:"-2.453em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mathnormal mtight"},"i"),s("span",{class:"mrel mtight"},"="),s("span",{class:"mord mtight"},"1")])])]),s("span",{style:{top:"-3.113em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mtight"},"4")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.247em"}},[s("span")])])])])]),s("span",{class:"mord"},"3"),s("span",{class:"mopen"},"("),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"x"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3117em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight"},"i")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"+"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1.1141em","vertical-align":"-0.25em"}}),s("span",{class:"mord"},"2"),s("span",{class:"mclose"},[s("span",{class:"mclose"},")"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.8641em"}},[s("span",{style:{top:"-3.113em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},"2")])])])])])])])])])])])],-1),k=a(`<p>现在对<code>out</code>反向传播，并求<code>out</code>对<code>x</code>的梯度（在反向传播之前需要将 x 的梯度清零）。</p><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">x.grad.data.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">zero_</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">out.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">backward</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(x.grad)</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># 输出</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">tensor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">([[</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">4.5000</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">4.5000</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">],</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        [</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">4.5000</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">4.5000</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">]])</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>现在看不懂可以不用纠结，因为我也不会（</p></blockquote><h2 id="学习资料" tabindex="-1"><a class="header-anchor" href="#学习资料"><span>学习资料</span></a></h2><ul><li><a href="https://speech.ee.ntu.edu.tw/~tlkagk/courses_ML20.html" target="_blank" rel="noopener noreferrer">台大李宏毅深度学习作业安排</a></li></ul>`,5),c=[h,r,p,d,k];function o(g,m){return n(),e("div",null,c)}const u=t(l,[["render",o],["__file","1pytorch.html.vue"]]),B=JSON.parse('{"path":"/code/python/pytorch/1pytorch.html","title":"Pytorch 的配置与基本操作","lang":"zh-CN","frontmatter":{"date":"2024-02-16T00:00:00.000Z","description":"Pytorch 的配置与基本操作 官网 《动手学深度学习-Pytorch 版》学习文档 《动手学深度学习》原书文档 Miniconda 配置 Pytorch 由于 poetry 配置 pytorch 很麻烦，所以我把 pytorch 配置在了 linux 环境下，并且采取 miniconda 作为包管理器。 到官网的 Get started 文档 选择...","head":[["meta",{"property":"og:url","content":"https://dream-oyh.github.io/code/python/pytorch/1pytorch.html"}],["meta",{"property":"og:site_name","content":"Dream_oyh 的 blog"}],["meta",{"property":"og:title","content":"Pytorch 的配置与基本操作"}],["meta",{"property":"og:description","content":"Pytorch 的配置与基本操作 官网 《动手学深度学习-Pytorch 版》学习文档 《动手学深度学习》原书文档 Miniconda 配置 Pytorch 由于 poetry 配置 pytorch 很麻烦，所以我把 pytorch 配置在了 linux 环境下，并且采取 miniconda 作为包管理器。 到官网的 Get started 文档 选择..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-19T14:31:50.000Z"}],["meta",{"property":"article:author","content":"OYH"}],["meta",{"property":"article:published_time","content":"2024-02-16T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-19T14:31:50.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Pytorch 的配置与基本操作\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-02-16T00:00:00.000Z\\",\\"dateModified\\":\\"2024-02-19T14:31:50.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"OYH\\",\\"email\\":\\"19859860010@163.com\\"}]}"]]},"headers":[{"level":2,"title":"Miniconda 配置 Pytorch","slug":"miniconda-配置-pytorch","link":"#miniconda-配置-pytorch","children":[]},{"level":2,"title":"Tensor 创建及基本操作","slug":"tensor-创建及基本操作","link":"#tensor-创建及基本操作","children":[{"level":3,"title":"Torch 中的乘法","slug":"torch-中的乘法","link":"#torch-中的乘法","children":[]},{"level":3,"title":"索引","slug":"索引","link":"#索引","children":[]},{"level":3,"title":"改变形状","slug":"改变形状","link":"#改变形状","children":[]},{"level":3,"title":"线性代数","slug":"线性代数","link":"#线性代数","children":[]},{"level":3,"title":"Tensor 转 numpy","slug":"tensor-转-numpy","link":"#tensor-转-numpy","children":[]},{"level":3,"title":"numpy 转 Tensor","slug":"numpy-转-tensor","link":"#numpy-转-tensor","children":[]},{"level":3,"title":"Tensor的存储和读取","slug":"tensor的存储和读取","link":"#tensor的存储和读取","children":[]}]},{"level":2,"title":"自动求梯度","slug":"自动求梯度","link":"#自动求梯度","children":[{"level":3,"title":"Function对象","slug":"function对象","link":"#function对象","children":[]},{"level":3,"title":"梯度","slug":"梯度","link":"#梯度","children":[]}]},{"level":2,"title":"学习资料","slug":"学习资料","link":"#学习资料","children":[]}],"git":{"createdTime":1707929375000,"updatedTime":1708353110000,"contributors":[{"name":"dream_linux","email":"1399541701@qq.com","commits":3},{"name":"dream同学0","email":"1399541701@qq.com","commits":1}]},"readingTime":{"minutes":5.19,"words":1556},"filePathRelative":"code/python/pytorch/1pytorch.md","localizedDate":"2024年2月16日","excerpt":"\\n<p><a href=\\"https://pytorch.org/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">官网</a></p>\\n<p><a href=\\"https://tangshusen.me/Dive-into-DL-PyTorch/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">《动手学深度学习-Pytorch 版》学习文档</a></p>\\n<p><a href=\\"https://zh.d2l.ai/index.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">《动手学深度学习》原书文档</a></p>","autoDesc":true}');export{u as comp,B as data};
