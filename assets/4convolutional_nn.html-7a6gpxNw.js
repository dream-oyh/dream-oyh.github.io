import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as t,c as l,e,d as s,b as a}from"./app-CWI7vXUH.js";const p={},i=e(`<h1 id="卷积神经网络" tabindex="-1"><a class="header-anchor" href="#卷积神经网络"><span>卷积神经网络</span></a></h1><h2 id="导入需要的包" tabindex="-1"><a class="header-anchor" href="#导入需要的包"><span>导入需要的包</span></a></h2><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> torch
<span class="token keyword">import</span> torch<span class="token punctuation">.</span>nn <span class="token keyword">as</span> nn
<span class="token keyword">import</span> torchvision
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="卷积运算函数" tabindex="-1"><a class="header-anchor" href="#卷积运算函数"><span>卷积运算函数</span></a></h2><p>卷积运算包含输入数组<code>X</code>与核数组<code>K</code>，输出数组<code>Y</code>，我们在<code>d2l</code>库中定义卷积函数如下。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># 本函数已封装在 d2lzh 包中</span>
<span class="token keyword">def</span> <span class="token function">corr2d</span><span class="token punctuation">(</span>X<span class="token punctuation">,</span>K<span class="token punctuation">)</span><span class="token punctuation">:</span>
  K_h<span class="token punctuation">,</span> K_w <span class="token operator">=</span> K<span class="token punctuation">.</span>shape
  X_h<span class="token punctuation">,</span> X_w <span class="token operator">=</span> X<span class="token punctuation">.</span>shape
  Y <span class="token operator">=</span> torch<span class="token punctuation">.</span>zeros<span class="token punctuation">(</span><span class="token punctuation">(</span>X_h<span class="token operator">-</span>K_h<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span> X_w<span class="token operator">-</span>K_w<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>Y<span class="token punctuation">.</span>shape<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">for</span> j <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>Y<span class="token punctuation">.</span>shape<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
      Y<span class="token punctuation">[</span>i<span class="token punctuation">,</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span>X<span class="token punctuation">[</span>i<span class="token punctuation">:</span>i<span class="token operator">+</span>K_h<span class="token punctuation">,</span>j<span class="token punctuation">:</span>j<span class="token operator">+</span>K_w<span class="token punctuation">]</span><span class="token operator">*</span>K<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token builtin">sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> Y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二维卷积层" tabindex="-1"><a class="header-anchor" href="#二维卷积层"><span>二维卷积层</span></a></h2><p>二维卷积层将输入数组和卷积数组做卷积运算，再加上一个标量偏差来得到输出。这个卷积数组的核中各元素值待定，标量偏差值待定，所以我们认为这是卷积层待训练参数，按照这个思路，我们就可以定义出<mark>包含待训练参数（权重参数和偏差参数）的二维卷积层</mark>，下面是代码实现。</p><blockquote><p>也不一定有这么严格的定义，标量偏差定义为 0 也是没问题的。</p></blockquote><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Conv2D</span><span class="token punctuation">(</span>nn<span class="token punctuation">.</span>Module<span class="token punctuation">)</span><span class="token punctuation">:</span>
  <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> kernel_size<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token builtin">super</span><span class="token punctuation">(</span>Conv2D<span class="token punctuation">,</span> self<span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span><span class="token punctuation">)</span>
    self<span class="token punctuation">.</span>weight <span class="token operator">=</span> nn<span class="token punctuation">.</span>Parameter<span class="token punctuation">(</span>torch<span class="token punctuation">.</span>randn<span class="token punctuation">(</span>kernel_size<span class="token punctuation">)</span><span class="token punctuation">)</span>
    self<span class="token punctuation">.</span>bias <span class="token operator">=</span> nn<span class="token punctuation">.</span>Parameter<span class="token punctuation">(</span>torch<span class="token punctuation">.</span>randn<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token keyword">def</span> <span class="token function">forward</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> corr2d<span class="token punctuation">(</span>x<span class="token punctuation">,</span> self<span class="token punctuation">.</span>weight<span class="token punctuation">)</span><span class="token operator">+</span>self<span class="token punctuation">.</span>bias
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="卷积层的填充-padding-与步幅-stride" tabindex="-1"><a class="header-anchor" href="#卷积层的填充-padding-与步幅-stride"><span>卷积层的填充 (padding) 与步幅 (stride)</span></a></h2><p>对于填充为 0，步幅为 1 的卷积运算而言，运算输出的 Y 尺寸为：</p>`,12),m=s("p",{class:"katex-block"},[s("span",{class:"katex-display"},[s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[s("semantics",null,[s("mrow",null,[s("mo",{stretchy:"false"},"("),s("msub",null,[s("mi",null,"h"),s("mi",null,"X")]),s("mo",null,"−"),s("msub",null,[s("mi",null,"h"),s("mi",null,"K")]),s("mo",null,"+"),s("mn",null,"1"),s("mo",{stretchy:"false"},")"),s("mo",null,"×"),s("mo",{stretchy:"false"},"("),s("msub",null,[s("mi",null,"w"),s("mi",null,"X")]),s("mo",null,"−"),s("msub",null,[s("mi",null,"w"),s("mi",null,"K")]),s("mo",null,"+"),s("mn",null,"1"),s("mo",{stretchy:"false"},")")]),s("annotation",{encoding:"application/x-tex"}," (h_X-h_K+1)\\times (w_X-w_K+1) ")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mopen"},"("),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"h"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3283em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.07847em"}},"X")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"−"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8444em","vertical-align":"-0.15em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"h"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3283em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.07153em"}},"K")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"+"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord"},"1"),s("span",{class:"mclose"},")"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"×"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mopen"},"("),s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.02691em"}},"w"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3283em"}},[s("span",{style:{top:"-2.55em","margin-left":"-0.0269em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.07847em"}},"X")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"−"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.7333em","vertical-align":"-0.15em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.02691em"}},"w"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3283em"}},[s("span",{style:{top:"-2.55em","margin-left":"-0.0269em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.07153em"}},"K")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"+"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord"},"1"),s("span",{class:"mclose"},")")])])])])],-1),c=s("p",null,[a("卷积层的两个超参数包括填充（padding）和步幅（stride），在考虑了填充与步幅之后，输出数组的尺寸就应该重新计算，记"),s("code",null,"p"),a("表示 padding，记"),s("code",null,"s"),a("表示 stride，则输出数组的尺寸为：")],-1),r=s("p",{class:"katex-block"},[s("span",{class:"katex-display"},[s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[s("semantics",null,[s("mrow",null,[s("mo",{stretchy:"false"},"("),s("msub",null,[s("mi",null,"h"),s("mi",null,"X")]),s("mo",null,"−"),s("msub",null,[s("mi",null,"h"),s("mi",null,"K")]),s("mo",null,"+"),s("msub",null,[s("mi",null,"h"),s("mi",null,"p")]),s("mo",null,"+"),s("msub",null,[s("mi",null,"h"),s("mi",null,"s")]),s("mo",{stretchy:"false"},")"),s("mi",{mathvariant:"normal"},"/"),s("msub",null,[s("mi",null,"h"),s("mi",null,"s")]),s("mo",null,"×"),s("mo",{stretchy:"false"},"("),s("msub",null,[s("mi",null,"w"),s("mi",null,"X")]),s("mo",null,"−"),s("msub",null,[s("mi",null,"w"),s("mi",null,"K")]),s("mo",null,"+"),s("msub",null,[s("mi",null,"w"),s("mi",null,"p")]),s("mo",null,"+"),s("msub",null,[s("mi",null,"w"),s("mi",null,"s")]),s("mo",{stretchy:"false"},")")]),s("annotation",{encoding:"application/x-tex"}," (h_X-h_K+h_p+h_s)/h_s \\times (w_X-w_K+w_p+w_s) ")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mopen"},"("),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"h"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3283em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.07847em"}},"X")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"−"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8444em","vertical-align":"-0.15em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"h"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3283em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.07153em"}},"K")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"+"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.9805em","vertical-align":"-0.2861em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"h"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.1514em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight"},"p")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.2861em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"+"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"h"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.1514em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight"},"s")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mclose"},")"),s("span",{class:"mord"},"/"),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"h"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.1514em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight"},"s")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"×"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mopen"},"("),s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.02691em"}},"w"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3283em"}},[s("span",{style:{top:"-2.55em","margin-left":"-0.0269em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.07847em"}},"X")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"−"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.7333em","vertical-align":"-0.15em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.02691em"}},"w"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3283em"}},[s("span",{style:{top:"-2.55em","margin-left":"-0.0269em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.07153em"}},"K")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"+"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8694em","vertical-align":"-0.2861em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.02691em"}},"w"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.1514em"}},[s("span",{style:{top:"-2.55em","margin-left":"-0.0269em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight"},"p")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.2861em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"+"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.02691em"}},"w"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.1514em"}},[s("span",{style:{top:"-2.55em","margin-left":"-0.0269em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight"},"s")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mclose"},")")])])])])],-1),o=s("blockquote",null,[s("p",null,[a("填充指的是在输入高和宽的两侧填充元素（通常是 0 元素），也就是说，如果横向"),s("code",null,"padding=1"),a("，那么填充过后的横向宽度就应该多 2，因为两侧各填充了 1")]),s("p",null,"步幅指的是卷积核的移动长度，一般为 1.")],-1),h=s("div",{class:"hint-container tip"},[s("p",{class:"hint-container-title"},"填充参数选择"),s("p",null,[a("在很多情况下，我们会设置"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("msub",null,[s("mi",null,"h"),s("mi",null,"p")]),s("mo",null,"="),s("msub",null,[s("mi",null,"h"),s("mi",null,"K")]),s("mo",null,"−"),s("mn",null,"1")]),s("annotation",{encoding:"application/x-tex"},"h_p=h_K−1")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.9805em","vertical-align":"-0.2861em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"h"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.1514em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight"},"p")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.2861em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),s("span",{class:"mrel"},"="),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8444em","vertical-align":"-0.15em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"h"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3283em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.07153em"}},"K")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"−"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6444em"}}),s("span",{class:"mord"},"1")])])]),a("和"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("msub",null,[s("mi",null,"w"),s("mi",null,"p")]),s("mo",null,"="),s("msub",null,[s("mi",null,"w"),s("mi",null,"K")]),s("mo",null,"−"),s("mn",null,"1")]),s("annotation",{encoding:"application/x-tex"},"w_p=w_K−1")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.7167em","vertical-align":"-0.2861em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.02691em"}},"w"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.1514em"}},[s("span",{style:{top:"-2.55em","margin-left":"-0.0269em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight"},"p")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.2861em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),s("span",{class:"mrel"},"="),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.7333em","vertical-align":"-0.15em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.02691em"}},"w"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3283em"}},[s("span",{style:{top:"-2.55em","margin-left":"-0.0269em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.07153em"}},"K")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"−"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6444em"}}),s("span",{class:"mord"},"1")])])]),a("来使输入和输出具有相同的高和宽。这样会方便在构造网络时推测每个层的输出形状。假设这里"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("msub",null,[s("mi",null,"h"),s("mi",null,"K")])]),s("annotation",{encoding:"application/x-tex"},"h_K")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8444em","vertical-align":"-0.15em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"h"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3283em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.07153em"}},"K")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])])])])]),a("​ 是奇数，我们会在高的两侧分别填充"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("msub",null,[s("mi",null,"h"),s("mi",null,"p")]),s("mi",{mathvariant:"normal"},"/"),s("mn",null,"2")]),s("annotation",{encoding:"application/x-tex"},"h_p/2")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1.0361em","vertical-align":"-0.2861em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"h"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.1514em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight"},"p")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.2861em"}},[s("span")])])])])]),s("span",{class:"mord"},"/2")])])]),a("行。如果"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("msub",null,[s("mi",null,"h"),s("mi",null,"K")])]),s("annotation",{encoding:"application/x-tex"},"h_K")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8444em","vertical-align":"-0.15em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"h"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3283em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.07153em"}},"K")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])])])])]),a("​ 是偶数，一种可能是在输入的顶端一侧填充"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mo",{stretchy:"false"},"⌈"),s("msub",null,[s("mi",null,"h"),s("mi",null,"p")]),s("mi",{mathvariant:"normal"},"/"),s("mn",null,"2"),s("mo",{stretchy:"false"},"⌉")]),s("annotation",{encoding:"application/x-tex"},"⌈h_p/2⌉")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1.0361em","vertical-align":"-0.2861em"}}),s("span",{class:"mopen"},"⌈"),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"h"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.1514em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight"},"p")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.2861em"}},[s("span")])])])])]),s("span",{class:"mord"},"/2"),s("span",{class:"mclose"},"⌉")])])]),a("行，而在底端一侧填充"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mo",{stretchy:"false"},"⌊"),s("msub",null,[s("mi",null,"h"),s("mi",null,"p")]),s("mi",{mathvariant:"normal"},"/"),s("mn",null,"2"),s("mo",{stretchy:"false"},"⌋")]),s("annotation",{encoding:"application/x-tex"},"⌊h_p/2⌋")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1.0361em","vertical-align":"-0.2861em"}}),s("span",{class:"mopen"},"⌊"),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"h"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.1514em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight"},"p")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.2861em"}},[s("span")])])])])]),s("span",{class:"mord"},"/2"),s("span",{class:"mclose"},"⌋")])])]),a("行。在宽的两侧填充同理。")])],-1),u=s("h2",{id:"多输入和多输出通道",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#多输入和多输出通道"},[s("span",null,"多输入和多输出通道")])],-1),g=[i,m,c,r,o,h,u];function d(v,y){return t(),l("div",null,g)}const w=n(p,[["render",d],["__file","4convolutional_nn.html.vue"]]),_=JSON.parse('{"path":"/code/python/pytorch/4convolutional_nn.html","title":"卷积神经网络","lang":"zh-CN","frontmatter":{"description":"卷积神经网络 导入需要的包 卷积运算函数 卷积运算包含输入数组X与核数组K，输出数组Y，我们在d2l库中定义卷积函数如下。 二维卷积层 二维卷积层将输入数组和卷积数组做卷积运算，再加上一个标量偏差来得到输出。这个卷积数组的核中各元素值待定，标量偏差值待定，所以我们认为这是卷积层待训练参数，按照这个思路，我们就可以定义出包含待训练参数（权重参数和偏差参数...","head":[["meta",{"property":"og:url","content":"https://dream-oyh.github.io/code/python/pytorch/4convolutional_nn.html"}],["meta",{"property":"og:site_name","content":"Dream_oyh 的 blog"}],["meta",{"property":"og:title","content":"卷积神经网络"}],["meta",{"property":"og:description","content":"卷积神经网络 导入需要的包 卷积运算函数 卷积运算包含输入数组X与核数组K，输出数组Y，我们在d2l库中定义卷积函数如下。 二维卷积层 二维卷积层将输入数组和卷积数组做卷积运算，再加上一个标量偏差来得到输出。这个卷积数组的核中各元素值待定，标量偏差值待定，所以我们认为这是卷积层待训练参数，按照这个思路，我们就可以定义出包含待训练参数（权重参数和偏差参数..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-18T13:18:03.000Z"}],["meta",{"property":"article:author","content":"OYH"}],["meta",{"property":"article:modified_time","content":"2024-02-18T13:18:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"卷积神经网络\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-02-18T13:18:03.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"OYH\\",\\"email\\":\\"19859860010@163.com\\"}]}"]]},"headers":[{"level":2,"title":"导入需要的包","slug":"导入需要的包","link":"#导入需要的包","children":[]},{"level":2,"title":"卷积运算函数","slug":"卷积运算函数","link":"#卷积运算函数","children":[]},{"level":2,"title":"二维卷积层","slug":"二维卷积层","link":"#二维卷积层","children":[]},{"level":2,"title":"卷积层的填充 (padding) 与步幅 (stride)","slug":"卷积层的填充-padding-与步幅-stride","link":"#卷积层的填充-padding-与步幅-stride","children":[]},{"level":2,"title":"多输入和多输出通道","slug":"多输入和多输出通道","link":"#多输入和多输出通道","children":[]}],"git":{"createdTime":1708262283000,"updatedTime":1708262283000,"contributors":[{"name":"dream_linux","email":"1399541701@qq.com","commits":1}]},"readingTime":{"minutes":2.06,"words":618},"filePathRelative":"code/python/pytorch/4convolutional_nn.md","localizedDate":"2024年2月18日","excerpt":"\\n<h2>导入需要的包</h2>\\n<div class=\\"language-python\\" data-ext=\\"py\\" data-title=\\"py\\"><pre class=\\"language-python\\"><code><span class=\\"token keyword\\">import</span> torch\\n<span class=\\"token keyword\\">import</span> torch<span class=\\"token punctuation\\">.</span>nn <span class=\\"token keyword\\">as</span> nn\\n<span class=\\"token keyword\\">import</span> torchvision\\n</code></pre></div>","autoDesc":true}');export{w as comp,_ as data};
