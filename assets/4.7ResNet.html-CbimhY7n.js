import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as e,o as p,c as o,d as s,b as n,a as l,e as c}from"./app-CtoNelhg.js";const i={},r=s("h1",{id:"resnet",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#resnet"},[s("span",null,"ResNet")])],-1),m=s("blockquote",null,[s("p",null,"What is ResNet?")],-1),u=s("p",null,[n("简单来说，在模型训练过程中，直接去拟合我们要的"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"f"),s("mo",{stretchy:"false"},"("),s("mi",null,"x"),s("mo",{stretchy:"false"},")")]),s("annotation",{encoding:"application/x-tex"},"f(x)")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord mathnormal",style:{"margin-right":"0.10764em"}},"f"),s("span",{class:"mopen"},"("),s("span",{class:"mord mathnormal"},"x"),s("span",{class:"mclose"},")")])])]),n("并不容易，但是通过测试发现，直接去拟合"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"f"),s("mo",{stretchy:"false"},"("),s("mi",null,"x"),s("mo",{stretchy:"false"},")"),s("mo",null,"−"),s("mi",null,"x")]),s("annotation",{encoding:"application/x-tex"},"f(x)-x")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord mathnormal",style:{"margin-right":"0.10764em"}},"f"),s("span",{class:"mopen"},"("),s("span",{class:"mord mathnormal"},"x"),s("span",{class:"mclose"},")"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"−"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.4306em"}}),s("span",{class:"mord mathnormal"},"x")])])]),n("会容易很多，所以残差网络其实就是在一系列卷积计算过后，先减去一个输入矩阵，再通过激活函数计算输出，这样就相当于拟合了"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"f"),s("mo",{stretchy:"false"},"("),s("mi",null,"x"),s("mo",{stretchy:"false"},")"),s("mo",null,"−"),s("mi",null,"x")]),s("annotation",{encoding:"application/x-tex"},"f(x)-x")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord mathnormal",style:{"margin-right":"0.10764em"}},"f"),s("span",{class:"mopen"},"("),s("span",{class:"mord mathnormal"},"x"),s("span",{class:"mclose"},")"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"−"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.4306em"}}),s("span",{class:"mord mathnormal"},"x")])])]),n("。")],-1),h={href:"https://tangshusen.me/Dive-into-DL-PyTorch/#/chapter05_CNN/5.11_resnet?id=_511-%e6%ae%8b%e5%b7%ae%e7%bd%91%e7%bb%9c%ef%bc%88resnet%ef%bc%89",target:"_blank",rel:"noopener noreferrer"},d=c(`<h2 id="residual-块" tabindex="-1"><a class="header-anchor" href="#residual-块"><span>Residual 块</span></a></h2><p>ResNet 沿用了 VGG 中 3×3 卷积层的设计。残差块里首先有 2 个有相同输出通道数的 3×3 卷积层。每个卷积层后接一个批量归一化层和 ReLU 激活函数。然后我们将输入跳过这两个卷积运算后直接加在最后的 ReLU 激活函数前。这样的设计要求两个卷积层的输出与输入形状一样，从而可以相加。如果想改变通道数，就需要引入一个额外的 1×1 卷积层来将输入变换成需要的形状后再做相加运算。</p><p>残差块的实现如下。它可以设定输出通道数以及卷积层的步幅。</p><blockquote><p>原文档说残差块要给一个超参数，用来判断是否需要引入额外的 1x1 卷积层，但是实际上不需要，只需要通过判断输入和输出的通道数是否相同来决定是否需要引入额外的 1x1 卷积层。</p></blockquote><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Residual</span><span class="token punctuation">(</span>nn<span class="token punctuation">.</span>Module<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> in_channels<span class="token punctuation">,</span> out_channels<span class="token punctuation">,</span> stride<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span>Residual<span class="token punctuation">,</span> self<span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>conv1 <span class="token operator">=</span> nn<span class="token punctuation">.</span>Conv2d<span class="token punctuation">(</span>in_channels<span class="token punctuation">,</span> out_channels<span class="token punctuation">,</span> kernel_size<span class="token operator">=</span><span class="token number">3</span><span class="token punctuation">,</span> stride<span class="token operator">=</span>stride<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>conv2 <span class="token operator">=</span> nn<span class="token punctuation">.</span>Conv2d<span class="token punctuation">(</span>out_channels<span class="token punctuation">,</span> out_channels<span class="token punctuation">,</span> kernel_size<span class="token operator">=</span><span class="token number">3</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> in_channels <span class="token operator">!=</span> out_channels<span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>conv3 <span class="token operator">=</span> nn<span class="token punctuation">.</span>Conv2d<span class="token punctuation">(</span>
                in_channels<span class="token punctuation">,</span> out_channels<span class="token punctuation">,</span> kernel_size<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> stride<span class="token operator">=</span>stride
            <span class="token punctuation">)</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>conv3 <span class="token operator">=</span> <span class="token boolean">None</span>
        self<span class="token punctuation">.</span>bn1 <span class="token operator">=</span> nn<span class="token punctuation">.</span>BatchNorm2d<span class="token punctuation">(</span>out_channels<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>bn2 <span class="token operator">=</span> nn<span class="token punctuation">.</span>BatchNorm2d<span class="token punctuation">(</span>out_channels<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">forward</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">:</span>
        y <span class="token operator">=</span> F<span class="token punctuation">.</span>relu<span class="token punctuation">(</span>self<span class="token punctuation">.</span>bn1<span class="token punctuation">(</span>self<span class="token punctuation">.</span>conv1<span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        y <span class="token operator">=</span> self<span class="token punctuation">.</span>bn2<span class="token punctuation">(</span>self<span class="token punctuation">.</span>conv2<span class="token punctuation">(</span>y<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> self<span class="token punctuation">.</span>conv3<span class="token punctuation">:</span>
            x <span class="token operator">=</span> self<span class="token punctuation">.</span>conv3<span class="token punctuation">(</span>x<span class="token punctuation">)</span>
        <span class="token keyword">return</span> F<span class="token punctuation">.</span>relu<span class="token punctuation">(</span>y <span class="token operator">+</span> x<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以写一个程序来测试一下输入图像的维数变化，此时输入维数与输出维数相等，不需要引入额外的 1x1 卷积层。</p>`,6);function k(x,g){const a=e("ExternalLinkIcon");return p(),o("div",null,[r,m,u,s("p",null,[n("残差网络的结构可以见"),s("a",h,[n("原文档"),l(a)]),n("，本节主要专注于程序上的实现难点。")]),d])}const v=t(i,[["render",k],["__file","4.7ResNet.html.vue"]]),b=JSON.parse('{"path":"/code/python/pytorch/4.7ResNet.html","title":"ResNet","lang":"zh-CN","frontmatter":{"date":"2024-02-26T00:00:00.000Z","description":"ResNet What is ResNet? 简单来说，在模型训练过程中，直接去拟合我们要的f(x)并不容易，但是通过测试发现，直接去拟合f(x)−x会容易很多，所以残差网络其实就是在一系列卷积计算过后，先减去一个输入矩阵，再通过激活函数计算输出，这样就相当于拟合了f(x)−x。 残差网络的结构可以见原文档，本节主要专注于程序上的实现难点。 Resid...","head":[["meta",{"property":"og:url","content":"https://dream-oyh.github.io/code/python/pytorch/4.7ResNet.html"}],["meta",{"property":"og:site_name","content":"Dream_oyh 的 blog"}],["meta",{"property":"og:title","content":"ResNet"}],["meta",{"property":"og:description","content":"ResNet What is ResNet? 简单来说，在模型训练过程中，直接去拟合我们要的f(x)并不容易，但是通过测试发现，直接去拟合f(x)−x会容易很多，所以残差网络其实就是在一系列卷积计算过后，先减去一个输入矩阵，再通过激活函数计算输出，这样就相当于拟合了f(x)−x。 残差网络的结构可以见原文档，本节主要专注于程序上的实现难点。 Resid..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-27T04:34:52.000Z"}],["meta",{"property":"article:author","content":"OYH"}],["meta",{"property":"article:published_time","content":"2024-02-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-27T04:34:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ResNet\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-02-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-02-27T04:34:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"OYH\\",\\"email\\":\\"19859860010@163.com\\"}]}"]]},"headers":[{"level":2,"title":"Residual 块","slug":"residual-块","link":"#residual-块","children":[]}],"git":{"createdTime":1708940430000,"updatedTime":1709008492000,"contributors":[{"name":"dream同学0","email":"1399541701@qq.com","commits":2}]},"readingTime":{"minutes":1.79,"words":538},"filePathRelative":"code/python/pytorch/4.7ResNet.md","localizedDate":"2024年2月26日","excerpt":"\\n<blockquote>\\n<p>What is ResNet?</p>\\n</blockquote>\\n<p>简单来说，在模型训练过程中，直接去拟合我们要的<span v-pre=\\"\\" class=\\"katex\\"><span class=\\"katex-mathml\\"><math xmlns=\\"http://www.w3.org/1998/Math/MathML\\"><semantics><mrow><mi>f</mi><mo stretchy=\\"false\\">(</mo><mi>x</mi><mo stretchy=\\"false\\">)</mo></mrow><annotation encoding=\\"application/x-tex\\">f(x)</annotation></semantics></math></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:1em;vertical-align:-0.25em;\\"></span><span class=\\"mord mathnormal\\" style=\\"margin-right:0.10764em;\\">f</span><span class=\\"mopen\\">(</span><span class=\\"mord mathnormal\\">x</span><span class=\\"mclose\\">)</span></span></span></span>并不容易，但是通过测试发现，直接去拟合<span v-pre=\\"\\" class=\\"katex\\"><span class=\\"katex-mathml\\"><math xmlns=\\"http://www.w3.org/1998/Math/MathML\\"><semantics><mrow><mi>f</mi><mo stretchy=\\"false\\">(</mo><mi>x</mi><mo stretchy=\\"false\\">)</mo><mo>−</mo><mi>x</mi></mrow><annotation encoding=\\"application/x-tex\\">f(x)-x</annotation></semantics></math></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:1em;vertical-align:-0.25em;\\"></span><span class=\\"mord mathnormal\\" style=\\"margin-right:0.10764em;\\">f</span><span class=\\"mopen\\">(</span><span class=\\"mord mathnormal\\">x</span><span class=\\"mclose\\">)</span><span class=\\"mspace\\" style=\\"margin-right:0.2222em;\\"></span><span class=\\"mbin\\">−</span><span class=\\"mspace\\" style=\\"margin-right:0.2222em;\\"></span></span><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:0.4306em;\\"></span><span class=\\"mord mathnormal\\">x</span></span></span></span>会容易很多，所以残差网络其实就是在一系列卷积计算过后，先减去一个输入矩阵，再通过激活函数计算输出，这样就相当于拟合了<span v-pre=\\"\\" class=\\"katex\\"><span class=\\"katex-mathml\\"><math xmlns=\\"http://www.w3.org/1998/Math/MathML\\"><semantics><mrow><mi>f</mi><mo stretchy=\\"false\\">(</mo><mi>x</mi><mo stretchy=\\"false\\">)</mo><mo>−</mo><mi>x</mi></mrow><annotation encoding=\\"application/x-tex\\">f(x)-x</annotation></semantics></math></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:1em;vertical-align:-0.25em;\\"></span><span class=\\"mord mathnormal\\" style=\\"margin-right:0.10764em;\\">f</span><span class=\\"mopen\\">(</span><span class=\\"mord mathnormal\\">x</span><span class=\\"mclose\\">)</span><span class=\\"mspace\\" style=\\"margin-right:0.2222em;\\"></span><span class=\\"mbin\\">−</span><span class=\\"mspace\\" style=\\"margin-right:0.2222em;\\"></span></span><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:0.4306em;\\"></span><span class=\\"mord mathnormal\\">x</span></span></span></span>。</p>","autoDesc":true}');export{v as comp,b as data};
