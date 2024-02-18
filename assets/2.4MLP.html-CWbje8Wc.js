import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as t,o as p,c as e,d as n,b as o,a as c,e as i}from"./app-CWI7vXUH.js";const l={},u=n("h1",{id:"多层感知机-mlp",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#多层感知机-mlp"},[n("span",null,"多层感知机（MLP）")])],-1),r={href:"https://zh.wikipedia.org/wiki/%E5%A4%9A%E5%B1%82%E6%84%9F%E7%9F%A5%E5%99%A8",target:"_blank",rel:"noopener noreferrer"},k=i(`<h2 id="导入需要的包" tabindex="-1"><a class="header-anchor" href="#导入需要的包"><span>导入需要的包</span></a></h2><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> torch<span class="token punctuation">.</span>nn <span class="token keyword">as</span> nn
<span class="token keyword">import</span> torch
<span class="token keyword">import</span> sys

sys<span class="token punctuation">.</span>path<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">import</span> d2lzh_pytorch <span class="token keyword">as</span> d2l
<span class="token keyword">from</span> torch<span class="token punctuation">.</span>nn <span class="token keyword">import</span> init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="定义模型" tabindex="-1"><a class="header-anchor" href="#定义模型"><span>定义模型</span></a></h2><p>不同于 softmax 和简单的线性回归，多层感知机多了隐藏层，由于层数的增多，需要在不同层之间定义激活函数，否则多个线性层最终能合并成一个线性层。</p><p>定义隐藏层权重矩阵为<code>784x256</code>，定义输出层权重矩阵为<code>256x10</code></p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code>num_inputs<span class="token punctuation">,</span> num_outputs<span class="token punctuation">,</span> num_hidden <span class="token operator">=</span> <span class="token number">784</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">256</span>

net <span class="token operator">=</span> nn<span class="token punctuation">.</span>Sequential<span class="token punctuation">(</span>
    d2l<span class="token punctuation">.</span>FlattenLayer<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    nn<span class="token punctuation">.</span>Linear<span class="token punctuation">(</span>num_inputs<span class="token punctuation">,</span> num_hidden<span class="token punctuation">)</span><span class="token punctuation">,</span>
    nn<span class="token punctuation">.</span>ReLU<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    nn<span class="token punctuation">.</span>Linear<span class="token punctuation">(</span>num_hidden<span class="token punctuation">,</span> num_outputs<span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="初始化模型参数" tabindex="-1"><a class="header-anchor" href="#初始化模型参数"><span>初始化模型参数</span></a></h2><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">for</span> parameter <span class="token keyword">in</span> net<span class="token punctuation">.</span>parameters<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    init<span class="token punctuation">.</span>normal_<span class="token punctuation">(</span>parameter<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0.01</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="读取数据、定义损失函数和优化器并训练模型" tabindex="-1"><a class="header-anchor" href="#读取数据、定义损失函数和优化器并训练模型"><span>读取数据、定义损失函数和优化器并训练模型</span></a></h2><p>这里为了优化代码，直接调用了 <code>d2lzh</code> 包中的<code>train_ch3</code>函数。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code>batch_size <span class="token operator">=</span> <span class="token number">256</span>
train_iter<span class="token punctuation">,</span> test_iter <span class="token operator">=</span> d2l<span class="token punctuation">.</span>load_data_fashion_mnist<span class="token punctuation">(</span>batch_size<span class="token punctuation">)</span>
loss <span class="token operator">=</span> nn<span class="token punctuation">.</span>CrossEntropyLoss<span class="token punctuation">(</span><span class="token punctuation">)</span>
optimizer <span class="token operator">=</span> torch<span class="token punctuation">.</span>optim<span class="token punctuation">.</span>SGD<span class="token punctuation">(</span>net<span class="token punctuation">.</span>parameters<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> lr<span class="token operator">=</span><span class="token number">0.1</span><span class="token punctuation">)</span>
num_epochs <span class="token operator">=</span> <span class="token number">5</span>
d2l<span class="token punctuation">.</span>train_ch3<span class="token punctuation">(</span>net<span class="token punctuation">,</span> train_iter<span class="token punctuation">,</span> test_iter<span class="token punctuation">,</span> loss<span class="token punctuation">,</span> num_epochs<span class="token punctuation">,</span> batch_size<span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">,</span> optimizer<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>d2lzh</code>包中的<code>train_ch3</code>函数定义如下：</p><details class="hint-container details"><summary>\`train_ch3\`函数定义</summary><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">train_ch3</span><span class="token punctuation">(</span>net<span class="token punctuation">,</span> train_iter<span class="token punctuation">,</span> test_iter<span class="token punctuation">,</span> loss<span class="token punctuation">,</span> num_epochs<span class="token punctuation">,</span> batch_size<span class="token punctuation">,</span>
              params<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> lr<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> optimizer<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">for</span> epoch <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>num_epochs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        train_l_sum<span class="token punctuation">,</span> train_acc_sum<span class="token punctuation">,</span> n <span class="token operator">=</span> <span class="token number">0.0</span><span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">,</span> <span class="token number">0</span>
        <span class="token keyword">for</span> X<span class="token punctuation">,</span> y <span class="token keyword">in</span> train_iter<span class="token punctuation">:</span>
            y_hat <span class="token operator">=</span> net<span class="token punctuation">(</span>X<span class="token punctuation">)</span>
            l <span class="token operator">=</span> loss<span class="token punctuation">(</span>y_hat<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token builtin">sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

            <span class="token comment"># 梯度清零</span>
            <span class="token keyword">if</span> optimizer <span class="token keyword">is</span> <span class="token keyword">not</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
                optimizer<span class="token punctuation">.</span>zero_grad<span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">elif</span> params <span class="token keyword">is</span> <span class="token keyword">not</span> <span class="token boolean">None</span> <span class="token keyword">and</span> params<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>grad <span class="token keyword">is</span> <span class="token keyword">not</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
                <span class="token keyword">for</span> param <span class="token keyword">in</span> params<span class="token punctuation">:</span>
                    param<span class="token punctuation">.</span>grad<span class="token punctuation">.</span>data<span class="token punctuation">.</span>zero_<span class="token punctuation">(</span><span class="token punctuation">)</span>

            l<span class="token punctuation">.</span>backward<span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> optimizer <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
                sgd<span class="token punctuation">(</span>params<span class="token punctuation">,</span> lr<span class="token punctuation">,</span> batch_size<span class="token punctuation">)</span>
            <span class="token keyword">else</span><span class="token punctuation">:</span>
                optimizer<span class="token punctuation">.</span>step<span class="token punctuation">(</span><span class="token punctuation">)</span>


            train_l_sum <span class="token operator">+=</span> l<span class="token punctuation">.</span>item<span class="token punctuation">(</span><span class="token punctuation">)</span>
            train_acc_sum <span class="token operator">+=</span> <span class="token punctuation">(</span>y_hat<span class="token punctuation">.</span>argmax<span class="token punctuation">(</span>dim<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">==</span> y<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token builtin">sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>item<span class="token punctuation">(</span><span class="token punctuation">)</span>
            n <span class="token operator">+=</span> y<span class="token punctuation">.</span>shape<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
        test_acc <span class="token operator">=</span> evaluate_accuracy<span class="token punctuation">(</span>test_iter<span class="token punctuation">,</span> net<span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;epoch %d, loss %.4f, train acc %.3f, test acc %.3f&#39;</span>
              <span class="token operator">%</span> <span class="token punctuation">(</span>epoch <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> train_l_sum <span class="token operator">/</span> n<span class="token punctuation">,</span> train_acc_sum <span class="token operator">/</span> n<span class="token punctuation">,</span> test_acc<span class="token punctuation">)</span><span class="token punctuation">)</span>
ef train_ch3<span class="token punctuation">(</span>net<span class="token punctuation">,</span> train_iter<span class="token punctuation">,</span> test_iter<span class="token punctuation">,</span> loss<span class="token punctuation">,</span> num_epochs<span class="token punctuation">,</span> batch_size<span class="token punctuation">,</span>
              params<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> lr<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> optimizer<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">for</span> epoch <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>num_epochs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        train_l_sum<span class="token punctuation">,</span> train_acc_sum<span class="token punctuation">,</span> n <span class="token operator">=</span> <span class="token number">0.0</span><span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">,</span> <span class="token number">0</span>
        <span class="token keyword">for</span> X<span class="token punctuation">,</span> y <span class="token keyword">in</span> train_iter<span class="token punctuation">:</span>
            y_hat <span class="token operator">=</span> net<span class="token punctuation">(</span>X<span class="token punctuation">)</span>
            l <span class="token operator">=</span> loss<span class="token punctuation">(</span>y_hat<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token builtin">sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

            <span class="token comment"># 梯度清零</span>
            <span class="token keyword">if</span> optimizer <span class="token keyword">is</span> <span class="token keyword">not</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
                optimizer<span class="token punctuation">.</span>zero_grad<span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">elif</span> params <span class="token keyword">is</span> <span class="token keyword">not</span> <span class="token boolean">None</span> <span class="token keyword">and</span> params<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>grad <span class="token keyword">is</span> <span class="token keyword">not</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
                <span class="token keyword">for</span> param <span class="token keyword">in</span> params<span class="token punctuation">:</span>
                    param<span class="token punctuation">.</span>grad<span class="token punctuation">.</span>data<span class="token punctuation">.</span>zero_<span class="token punctuation">(</span><span class="token punctuation">)</span>

            l<span class="token punctuation">.</span>backward<span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> optimizer <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
                sgd<span class="token punctuation">(</span>params<span class="token punctuation">,</span> lr<span class="token punctuation">,</span> batch_size<span class="token punctuation">)</span>
            <span class="token keyword">else</span><span class="token punctuation">:</span>
                optimizer<span class="token punctuation">.</span>step<span class="token punctuation">(</span><span class="token punctuation">)</span>

            train_l_sum <span class="token operator">+=</span> l<span class="token punctuation">.</span>item<span class="token punctuation">(</span><span class="token punctuation">)</span>
            train_acc_sum <span class="token operator">+=</span> <span class="token punctuation">(</span>y_hat<span class="token punctuation">.</span>argmax<span class="token punctuation">(</span>dim<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">==</span> y<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token builtin">sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>item<span class="token punctuation">(</span><span class="token punctuation">)</span>
            n <span class="token operator">+=</span> y<span class="token punctuation">.</span>shape<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
        test_acc <span class="token operator">=</span> evaluate_accuracy<span class="token punctuation">(</span>test_iter<span class="token punctuation">,</span> net<span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;epoch %d, loss %.4f, train acc %.3f, test acc %.3f&#39;</span>
              <span class="token operator">%</span> <span class="token punctuation">(</span>epoch <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> train_l_sum <span class="token operator">/</span> n<span class="token punctuation">,</span> train_acc_sum <span class="token operator">/</span> n<span class="token punctuation">,</span> test_acc<span class="token punctuation">)</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,13);function d(m,v){const s=t("ExternalLinkIcon");return p(),e("div",null,[u,n("p",null,[n("a",r,[o("是什么？"),c(s)])]),k])}const y=a(l,[["render",d],["__file","2.4MLP.html.vue"]]),_=JSON.parse('{"path":"/code/python/pytorch/2.4MLP.html","title":"多层感知机（MLP）","lang":"zh-CN","frontmatter":{"description":"多层感知机（MLP） 是什么？ 导入需要的包 定义模型 不同于 softmax 和简单的线性回归，多层感知机多了隐藏层，由于层数的增多，需要在不同层之间定义激活函数，否则多个线性层最终能合并成一个线性层。 定义隐藏层权重矩阵为784x256，定义输出层权重矩阵为256x10 初始化模型参数 读取数据、定义损失函数和优化器并训练模型 这里为了优化代码，直...","head":[["meta",{"property":"og:url","content":"https://dream-oyh.github.io/code/python/pytorch/2.4MLP.html"}],["meta",{"property":"og:site_name","content":"Dream_oyh 的 blog"}],["meta",{"property":"og:title","content":"多层感知机（MLP）"}],["meta",{"property":"og:description","content":"多层感知机（MLP） 是什么？ 导入需要的包 定义模型 不同于 softmax 和简单的线性回归，多层感知机多了隐藏层，由于层数的增多，需要在不同层之间定义激活函数，否则多个线性层最终能合并成一个线性层。 定义隐藏层权重矩阵为784x256，定义输出层权重矩阵为256x10 初始化模型参数 读取数据、定义损失函数和优化器并训练模型 这里为了优化代码，直..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-18T13:18:03.000Z"}],["meta",{"property":"article:author","content":"OYH"}],["meta",{"property":"article:modified_time","content":"2024-02-18T13:18:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"多层感知机（MLP）\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-02-18T13:18:03.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"OYH\\",\\"email\\":\\"19859860010@163.com\\"}]}"]]},"headers":[{"level":2,"title":"导入需要的包","slug":"导入需要的包","link":"#导入需要的包","children":[]},{"level":2,"title":"定义模型","slug":"定义模型","link":"#定义模型","children":[]},{"level":2,"title":"初始化模型参数","slug":"初始化模型参数","link":"#初始化模型参数","children":[]},{"level":2,"title":"读取数据、定义损失函数和优化器并训练模型","slug":"读取数据、定义损失函数和优化器并训练模型","link":"#读取数据、定义损失函数和优化器并训练模型","children":[]}],"git":{"createdTime":1708262283000,"updatedTime":1708262283000,"contributors":[{"name":"dream_linux","email":"1399541701@qq.com","commits":1}]},"readingTime":{"minutes":1.56,"words":468},"filePathRelative":"code/python/pytorch/2.4MLP.md","localizedDate":"2024年2月18日","excerpt":"\\n<p><a href=\\"https://zh.wikipedia.org/wiki/%E5%A4%9A%E5%B1%82%E6%84%9F%E7%9F%A5%E5%99%A8\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">是什么？</a></p>\\n<h2>导入需要的包</h2>\\n<div class=\\"language-python\\" data-ext=\\"py\\" data-title=\\"py\\"><pre class=\\"language-python\\"><code><span class=\\"token keyword\\">import</span> torch<span class=\\"token punctuation\\">.</span>nn <span class=\\"token keyword\\">as</span> nn\\n<span class=\\"token keyword\\">import</span> torch\\n<span class=\\"token keyword\\">import</span> sys\\n\\nsys<span class=\\"token punctuation\\">.</span>path<span class=\\"token punctuation\\">.</span>append<span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\".\\"</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token keyword\\">import</span> d2lzh_pytorch <span class=\\"token keyword\\">as</span> d2l\\n<span class=\\"token keyword\\">from</span> torch<span class=\\"token punctuation\\">.</span>nn <span class=\\"token keyword\\">import</span> init\\n</code></pre></div>","autoDesc":true}');export{y as comp,_ as data};
