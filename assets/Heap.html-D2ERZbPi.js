import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as l,c as o,d as t,a as i,w as r,b as a,e,o as p}from"./app-D4bhvlFF.js";const c="/images/data_structure/heap/array.png",m={},h=t("h1",{id:"堆",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#堆"},[t("span",null,"堆")])],-1),u=t("h2",{id:"二叉堆",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#二叉堆"},[t("span",null,"二叉堆")])],-1),d=t("p",null,"二叉堆是一种完全二叉树，每个节点存有一个权值。",-1),g=t("ol",null,[t("li",null,[t("p",null,"完全二叉树只允许最后一行不为满")]),t("li",null,[t("p",null,"且最后一行必须从左往右排序")]),t("li",null,[t("p",null,"最后一行元素之间不可以有间隔")])],-1),_=e('<blockquote><p>注意：二叉堆不是二叉搜索树，并不满足左节点小于右节点</p></blockquote><p><strong>堆序性：</strong></p><ul><li>大根堆：堆的父节点权值大于子节点</li><li>小根堆：堆的父节点权值小于子节点</li></ul><p>由堆序性可知，堆的节点处存有最大值或最小值。</p><p><strong>实现形式：</strong></p><p>堆因为具有堆序性，可以使用<strong>数组/链表</strong>来实现。数组存储堆的顺序为<strong>层序遍历</strong>。</p><figure><img src="'+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>因为堆是完全二叉树，所以每个下标和树的每个位置是一一对应的。</p>',8),y=t("p",null,[a("假设父节点的索引是 "),t("span",{class:"katex"},[t("span",{class:"katex-mathml"},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("semantics",null,[t("mrow",null,[t("mi",null,"i")]),t("annotation",{encoding:"application/x-tex"},"i")])])]),t("span",{class:"katex-html","aria-hidden":"true"},[t("span",{class:"base"},[t("span",{class:"strut",style:{height:"0.6595em"}}),t("span",{class:"mord mathnormal"},"i")])])]),a("，则其左节点的索引是 "),t("span",{class:"katex"},[t("span",{class:"katex-mathml"},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("semantics",null,[t("mrow",null,[t("mn",null,"2"),t("mi",null,"i"),t("mo",null,"+"),t("mn",null,"1")]),t("annotation",{encoding:"application/x-tex"},"2i+1")])])]),t("span",{class:"katex-html","aria-hidden":"true"},[t("span",{class:"base"},[t("span",{class:"strut",style:{height:"0.7429em","vertical-align":"-0.0833em"}}),t("span",{class:"mord"},"2"),t("span",{class:"mord mathnormal"},"i"),t("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),t("span",{class:"mbin"},"+"),t("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),t("span",{class:"base"},[t("span",{class:"strut",style:{height:"0.6444em"}}),t("span",{class:"mord"},"1")])])]),a("，右节点的索引是 "),t("span",{class:"katex"},[t("span",{class:"katex-mathml"},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("semantics",null,[t("mrow",null,[t("mn",null,"2"),t("mi",null,"i"),t("mo",null,"+"),t("mn",null,"2")]),t("annotation",{encoding:"application/x-tex"},"2i+2")])])]),t("span",{class:"katex-html","aria-hidden":"true"},[t("span",{class:"base"},[t("span",{class:"strut",style:{height:"0.7429em","vertical-align":"-0.0833em"}}),t("span",{class:"mord"},"2"),t("span",{class:"mord mathnormal"},"i"),t("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),t("span",{class:"mbin"},"+"),t("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),t("span",{class:"base"},[t("span",{class:"strut",style:{height:"0.6444em"}}),t("span",{class:"mord"},"2")])])]),a("。")],-1),b=e('<h3 id="基本操作" tabindex="-1"><a class="header-anchor" href="#基本操作"><span>基本操作</span></a></h3><h4 id="上浮" tabindex="-1"><a class="header-anchor" href="#上浮"><span>上浮</span></a></h4><blockquote><p>以大根堆为例</p></blockquote><p>将叶子节点根据堆序性向上调整，若叶子节点小于父节点，对于大根堆而言不满足堆序性，此时考虑交换叶子节点与父节点，如此循环，即可恢复堆序性。</p><figure><img src="https://oi-wiki.org/ds/images/binary_heap_insert.svg" alt="" width="400" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h4 id="下沉" tabindex="-1"><a class="header-anchor" href="#下沉"><span>下沉</span></a></h4><blockquote><p>以大根堆为例</p></blockquote><p>将父节点根据堆序性向下调整，若父节点小于叶子节点，对于大根堆而言不满足堆序性，此时考虑交换父节点和较大的叶子节点，如此循环，即可恢复堆序性。</p>',8);function x(k,f){const s=l("RouteLink");return p(),o("div",null,[h,u,d,t("blockquote",null,[t("p",null,[i(s,{to:"/study/DataStructure/tree.html#binary-tree"},{default:r(()=>[a("完全二叉树")]),_:1}),a("的定义：")]),g]),_,y,b])}const v=n(m,[["render",x],["__file","Heap.html.vue"]]),M=JSON.parse('{"path":"/study/DataStructure/Heap.html","title":"堆","lang":"zh-CN","frontmatter":{"date":"2024-08-10T00:00:00.000Z","tag":"data_structure","description":"堆 二叉堆 二叉堆是一种完全二叉树，每个节点存有一个权值。 的定义： 完全二叉树只允许最后一行不为满 且最后一行必须从左往右排序 最后一行元素之间不可以有间隔 注意：二叉堆不是二叉搜索树，并不满足左节点小于右节点 堆序性： 大根堆：堆的父节点权值大于子节点 小根堆：堆的父节点权值小于子节点 由堆序性可知，堆的节点处存有最大值或最小值。 实现形式： 堆因...","head":[["meta",{"property":"og:url","content":"https://dream-oyh.github.io/study/DataStructure/Heap.html"}],["meta",{"property":"og:site_name","content":"Dream_oyh 的 blog"}],["meta",{"property":"og:title","content":"堆"}],["meta",{"property":"og:description","content":"堆 二叉堆 二叉堆是一种完全二叉树，每个节点存有一个权值。 的定义： 完全二叉树只允许最后一行不为满 且最后一行必须从左往右排序 最后一行元素之间不可以有间隔 注意：二叉堆不是二叉搜索树，并不满足左节点小于右节点 堆序性： 大根堆：堆的父节点权值大于子节点 小根堆：堆的父节点权值小于子节点 由堆序性可知，堆的节点处存有最大值或最小值。 实现形式： 堆因..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://dream-oyh.github.io/images/data_structure/heap/array.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-08-10T09:02:43.000Z"}],["meta",{"property":"article:author","content":"OYH"}],["meta",{"property":"article:tag","content":"data_structure"}],["meta",{"property":"article:published_time","content":"2024-08-10T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-08-10T09:02:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"堆\\",\\"image\\":[\\"https://dream-oyh.github.io/images/data_structure/heap/array.png\\",\\"https://oi-wiki.org/ds/images/binary_heap_insert.svg =400x\\"],\\"datePublished\\":\\"2024-08-10T00:00:00.000Z\\",\\"dateModified\\":\\"2024-08-10T09:02:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"OYH\\",\\"email\\":\\"19859860010@163.com\\"}]}"]]},"headers":[{"level":2,"title":"二叉堆","slug":"二叉堆","link":"#二叉堆","children":[{"level":3,"title":"基本操作","slug":"基本操作","link":"#基本操作","children":[]}]}],"git":{"createdTime":1723280563000,"updatedTime":1723280563000,"contributors":[{"name":"dream-oyh","email":"1399541701@qq.com","commits":1}]},"readingTime":{"minutes":1.37,"words":410},"filePathRelative":"study/DataStructure/Heap.md","localizedDate":"2024年8月10日","excerpt":"\\n<h2>二叉堆</h2>\\n<p>二叉堆是一种完全二叉树，每个节点存有一个权值。</p>\\n<blockquote>\\n<p><a href=\\"/study/DataStructure/tree.html#binary-tree\\" target=\\"_blank\\">完全二叉树</a>的定义：</p>\\n<ol>\\n<li>\\n<p>完全二叉树只允许最后一行不为满</p>\\n</li>\\n<li>\\n<p>且最后一行必须从左往右排序</p>\\n</li>\\n<li>\\n<p>最后一行元素之间不可以有间隔</p>\\n</li>\\n</ol>\\n</blockquote>\\n<blockquote>\\n<p>注意：二叉堆不是二叉搜索树，并不满足左节点小于右节点</p>\\n</blockquote>","autoDesc":true}');export{v as comp,M as data};
