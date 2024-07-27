import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as a,e as t}from"./app-BnmE-FK_.js";const n={},l=t(`<h1 id="贪心算法" tabindex="-1"><a class="header-anchor" href="#贪心算法"><span>贪心算法</span></a></h1><p>贪心算法是用于解决 NP 完全问题的算法，即：一个问题除了暴力枚举以外没有其他有效的解决方法，时间空间复杂度在问题组合数变多时急剧增大，不利于算法求解。此时考虑用贪心算法进行近似的计算，贪心算法不要求提供最好的最优解，但是能够缩小时间和空间复杂度以达到一个近似的完美解。</p><p>什么时候要使用贪心算法，就要学会辨识 NP 完全问题，一般分为两类：</p><ol><li>集合覆盖问题</li><li>旅行商问题</li></ol><div class="hint-container tip"><p class="hint-container-title">判断 NP 完全问题的方法——《算法图解》</p><ol><li>元素较少时算法的运行速度很快，但随着元素数量增加，速度会变得非常慢</li><li>涉及“所有组合”的问题通常是 NP 完全问题</li><li>不能将问题分成小问题，必须考虑各种可能的情况，这可能是 NP 完全问题</li><li>如果问题涉及序列（如旅行商中的城市序列）且难以解决，这可能是 NP 完全问题</li><li>如果问题涉及集合（如广播台集合）且难以解决，这可能是 NP 完全问题</li><li>如果问题能够转化为集合覆盖问题或旅行商问题，那他肯定是 NP 完全问题</li></ol></div><h2 id="集合覆盖问题" tabindex="-1"><a class="header-anchor" href="#集合覆盖问题"><span>集合覆盖问题</span></a></h2><p><strong>题目：</strong></p><p>我们需要在美国选取若干广播台，要求选取尽可能少的广播台来覆盖我们需要的洲（每个广播台覆盖范围一定，集：覆盖的洲一定），现已给出需要覆盖的洲和各个广播台的覆盖洲范围，设计算法完成问题。</p><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">needed_states </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> set</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">([</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;mt&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;wa&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;or&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;id&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;nv&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;ut&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;ca&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;az&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">])  </span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># 要覆盖的洲</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">boardcast_stations </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">boardcast_stations[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;kone&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> set</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">([</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;id&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;nv&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;ut&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">])</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">boardcast_stations[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;ktwo&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> set</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">([</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;wa&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;id&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;mt&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">])</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">boardcast_stations[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;kthree&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> set</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">([</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;or&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;nv&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;ca&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">])</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">boardcast_stations[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;kfour&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> set</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">([</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;nv&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;ut&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">])</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">boardcast_stations[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;kfive&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> set</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">([</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;ca&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;az&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">final_stations </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> set</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">while</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> needed_states:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    best_station </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> None</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    covered_states </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> set</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> station, states </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">in</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> boardcast_stations.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">items</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">():</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        to_be_covered_states </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> needed_states </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">&amp;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> states</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        if</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> len</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(to_be_covered_states) </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">&gt;</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> len</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(covered_states):</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">            best_station </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> station</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">            covered_states </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> to_be_covered_states</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    needed_states </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">-=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> covered_states</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    final_stations.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">add</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(best_station)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(final_stations)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>一句话题解：</strong> 每次选一台广播台，保证选的广播台相比其他未选的广播台能够覆盖最多的未被覆盖的洲，直至所有需要被覆盖的洲都被覆盖</p>`,10),h=[l];function e(k,p){return a(),i("div",null,h)}const B=s(n,[["render",e],["__file","GreedyAlgorithm.html.vue"]]),o=JSON.parse('{"path":"/study/Algorithm/GreedyAlgorithm.html","title":"贪心算法","lang":"zh-CN","frontmatter":{"date":"2024-07-27T00:00:00.000Z","tag":"algorithm","description":"贪心算法 贪心算法是用于解决 NP 完全问题的算法，即：一个问题除了暴力枚举以外没有其他有效的解决方法，时间空间复杂度在问题组合数变多时急剧增大，不利于算法求解。此时考虑用贪心算法进行近似的计算，贪心算法不要求提供最好的最优解，但是能够缩小时间和空间复杂度以达到一个近似的完美解。 什么时候要使用贪心算法，就要学会辨识 NP 完全问题，一般分为两类： 集...","head":[["meta",{"property":"og:url","content":"https://dream-oyh.github.io/study/Algorithm/GreedyAlgorithm.html"}],["meta",{"property":"og:site_name","content":"Dream_oyh 的 blog"}],["meta",{"property":"og:title","content":"贪心算法"}],["meta",{"property":"og:description","content":"贪心算法 贪心算法是用于解决 NP 完全问题的算法，即：一个问题除了暴力枚举以外没有其他有效的解决方法，时间空间复杂度在问题组合数变多时急剧增大，不利于算法求解。此时考虑用贪心算法进行近似的计算，贪心算法不要求提供最好的最优解，但是能够缩小时间和空间复杂度以达到一个近似的完美解。 什么时候要使用贪心算法，就要学会辨识 NP 完全问题，一般分为两类： 集..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-27T08:45:26.000Z"}],["meta",{"property":"article:author","content":"OYH"}],["meta",{"property":"article:tag","content":"algorithm"}],["meta",{"property":"article:published_time","content":"2024-07-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-27T08:45:26.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"贪心算法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-27T08:45:26.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"OYH\\",\\"email\\":\\"19859860010@163.com\\"}]}"]]},"headers":[{"level":2,"title":"集合覆盖问题","slug":"集合覆盖问题","link":"#集合覆盖问题","children":[]}],"git":{"createdTime":1722069926000,"updatedTime":1722069926000,"contributors":[{"name":"dream-oyh","email":"1399541701@qq.com","commits":1}]},"readingTime":{"minutes":1.97,"words":590},"filePathRelative":"study/Algorithm/GreedyAlgorithm.md","localizedDate":"2024年7月27日","excerpt":"\\n<p>贪心算法是用于解决 NP 完全问题的算法，即：一个问题除了暴力枚举以外没有其他有效的解决方法，时间空间复杂度在问题组合数变多时急剧增大，不利于算法求解。此时考虑用贪心算法进行近似的计算，贪心算法不要求提供最好的最优解，但是能够缩小时间和空间复杂度以达到一个近似的完美解。</p>\\n<p>什么时候要使用贪心算法，就要学会辨识 NP 完全问题，一般分为两类：</p>\\n<ol>\\n<li>集合覆盖问题</li>\\n<li>旅行商问题</li>\\n</ol>\\n<div class=\\"hint-container tip\\">\\n<p class=\\"hint-container-title\\">判断 NP 完全问题的方法——《算法图解》</p>\\n<ol>\\n<li>元素较少时算法的运行速度很快，但随着元素数量增加，速度会变得非常慢</li>\\n<li>涉及“所有组合”的问题通常是 NP 完全问题</li>\\n<li>不能将问题分成小问题，必须考虑各种可能的情况，这可能是 NP 完全问题</li>\\n<li>如果问题涉及序列（如旅行商中的城市序列）且难以解决，这可能是 NP 完全问题</li>\\n<li>如果问题涉及集合（如广播台集合）且难以解决，这可能是 NP 完全问题</li>\\n<li>如果问题能够转化为集合覆盖问题或旅行商问题，那他肯定是 NP 完全问题</li>\\n</ol>\\n</div>","autoDesc":true}');export{B as comp,o as data};
