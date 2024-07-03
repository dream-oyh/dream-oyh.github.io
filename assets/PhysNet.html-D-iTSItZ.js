import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as n,o as i,c as m,a as r,e as t,d as s,b as a}from"./app-Bw7vtU4M.js";const p="/images/Study/PhysNet_structure.png",c={},o=t('<h1 id="rppg-physnet-review" tabindex="-1"><a class="header-anchor" href="#rppg-physnet-review"><span>rPPG: PhysNet Review</span></a></h1><h2 id="conventional-model-drawbacks" tabindex="-1"><a class="header-anchor" href="#conventional-model-drawbacks"><span>Conventional Model Drawbacks</span></a></h2><ol><li>Only one simple output - HR, which limits usage in demanding medical applications.</li><li>end-to-end neural networks lost the pre-processing and post-processing steps.</li><li>Without considering temporal context features.</li><li>Need pure empirical knowledge and handcrafted processing, which may cause crucial features lost.</li></ol><h2 id="physnet-advantages" tabindex="-1"><a class="header-anchor" href="#physnet-advantages"><span>PhysNet Advantages</span></a></h2><ol><li>Considering the temporal context</li><li>Multiple spatio-temporal neural networks are compared</li><li>Not only predict HR, but also output Heart Rate Variability(HRV), efficient for medical application.</li><li>Generalized well.</li></ol><h2 id="how-does-it-works" tabindex="-1"><a class="header-anchor" href="#how-does-it-works"><span>How does it works?</span></a></h2>',6),h=t('<p>其中，<code>[step1]</code>和<code>[step2]</code>采用 3DCNN 网络来实现，相较于传统方法考虑到了时间上下文特征。</p><figure><img src="'+p+'" alt="PhysNet 3DCNN Sturcture" tabindex="0" loading="lazy"><figcaption>PhysNet 3DCNN Sturcture</figcaption></figure><h2 id="loss-function-and-ground-truth" tabindex="-1"><a class="header-anchor" href="#loss-function-and-ground-truth"><span>Loss Function and Ground Truth</span></a></h2><h3 id="loss-function" tabindex="-1"><a class="header-anchor" href="#loss-function"><span>Loss Function</span></a></h3>',4),g=s("p",{class:"katex-block"},[s("span",{class:"katex-display"},[s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[s("semantics",null,[s("mrow",null,[s("mi",null,"L"),s("mi",null,"o"),s("mi",null,"s"),s("mi",null,"s"),s("mo",null,"="),s("mn",null,"1"),s("mo",null,"−"),s("mfrac",null,[s("mrow",null,[s("mi",null,"T"),s("msubsup",null,[s("mi",{mathvariant:"normal"},"Σ"),s("mn",null,"1"),s("mi",null,"T")]),s("mi",null,"x"),s("mi",null,"y"),s("mo",null,"−"),s("msubsup",null,[s("mi",{mathvariant:"normal"},"Σ"),s("mn",null,"1"),s("mi",null,"T")]),s("mi",null,"x"),s("msubsup",null,[s("mi",{mathvariant:"normal"},"Σ"),s("mn",null,"1"),s("mi",null,"T")]),s("mi",null,"y")]),s("msqrt",null,[s("mrow",null,[s("mo",{stretchy:"false"},"("),s("mi",null,"T"),s("msubsup",null,[s("mi",{mathvariant:"normal"},"Σ"),s("mn",null,"1"),s("mi",null,"T")]),s("msup",null,[s("mi",null,"x"),s("mn",null,"2")]),s("mo",null,"−"),s("mo",{stretchy:"false"},"("),s("msubsup",null,[s("mi",{mathvariant:"normal"},"Σ"),s("mn",null,"1"),s("mi",null,"T")]),s("mi",null,"x"),s("msup",null,[s("mo",{stretchy:"false"},")"),s("mn",null,"2")]),s("mo",{stretchy:"false"},")"),s("mo",{stretchy:"false"},"("),s("mi",null,"T"),s("msubsup",null,[s("mi",{mathvariant:"normal"},"Σ"),s("mn",null,"1"),s("mi",null,"T")]),s("msup",null,[s("mi",null,"y"),s("mn",null,"2")]),s("mo",null,"−"),s("mo",{stretchy:"false"},"("),s("msubsup",null,[s("mi",{mathvariant:"normal"},"Σ"),s("mn",null,"1"),s("mi",null,"T")]),s("mi",null,"y"),s("msup",null,[s("mo",{stretchy:"false"},")"),s("mn",null,"2")]),s("mo",{stretchy:"false"},")")])])])]),s("annotation",{encoding:"application/x-tex"}," Loss=1-\\frac{T\\Sigma_1^Txy-\\Sigma^T_1x\\Sigma_1^Ty}{\\sqrt{(T\\Sigma_1^Tx^2-(\\Sigma_1^Tx)^2)(T\\Sigma_1^Ty^2-(\\Sigma_1^Ty)^2)}} ")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6833em"}}),s("span",{class:"mord mathnormal"},"L"),s("span",{class:"mord mathnormal"},"oss"),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),s("span",{class:"mrel"},"="),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.7278em","vertical-align":"-0.0833em"}}),s("span",{class:"mord"},"1"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"−"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"2.6483em","vertical-align":"-1.13em"}}),s("span",{class:"mord"},[s("span",{class:"mopen nulldelimiter"}),s("span",{class:"mfrac"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"1.5183em"}},[s("span",{style:{top:"-2.1466em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord"},[s("span",{class:"mord sqrt"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.9634em"}},[s("span",{class:"svg-align",style:{top:"-3.2em"}},[s("span",{class:"pstrut",style:{height:"3.2em"}}),s("span",{class:"mord",style:{"padding-left":"1em"}},[s("span",{class:"mopen"},"("),s("span",{class:"mord mathnormal",style:{"margin-right":"0.13889em"}},"T"),s("span",{class:"mord"},[s("span",{class:"mord"},"Σ"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.8231em"}},[s("span",{style:{top:"-2.4337em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},"1")])]),s("span",{style:{top:"-3.0448em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.13889em"}},"T")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.2663em"}},[s("span")])])])])]),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"x"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.7401em"}},[s("span",{style:{top:"-2.989em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},"2")])])])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"−"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mopen"},"("),s("span",{class:"mord"},[s("span",{class:"mord"},"Σ"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.8231em"}},[s("span",{style:{top:"-2.4337em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},"1")])]),s("span",{style:{top:"-3.0448em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.13889em"}},"T")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.2663em"}},[s("span")])])])])]),s("span",{class:"mord mathnormal"},"x"),s("span",{class:"mclose"},[s("span",{class:"mclose"},")"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.7401em"}},[s("span",{style:{top:"-2.989em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},"2")])])])])])])]),s("span",{class:"mclose"},")"),s("span",{class:"mopen"},"("),s("span",{class:"mord mathnormal",style:{"margin-right":"0.13889em"}},"T"),s("span",{class:"mord"},[s("span",{class:"mord"},"Σ"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.8231em"}},[s("span",{style:{top:"-2.4337em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},"1")])]),s("span",{style:{top:"-3.0448em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.13889em"}},"T")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.2663em"}},[s("span")])])])])]),s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.03588em"}},"y"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.7401em"}},[s("span",{style:{top:"-2.989em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},"2")])])])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"−"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mopen"},"("),s("span",{class:"mord"},[s("span",{class:"mord"},"Σ"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.8231em"}},[s("span",{style:{top:"-2.4337em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},"1")])]),s("span",{style:{top:"-3.0448em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.13889em"}},"T")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.2663em"}},[s("span")])])])])]),s("span",{class:"mord mathnormal",style:{"margin-right":"0.03588em"}},"y"),s("span",{class:"mclose"},[s("span",{class:"mclose"},")"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.7401em"}},[s("span",{style:{top:"-2.989em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},"2")])])])])])])]),s("span",{class:"mclose"},")")])]),s("span",{style:{top:"-2.9234em"}},[s("span",{class:"pstrut",style:{height:"3.2em"}}),s("span",{class:"hide-tail",style:{"min-width":"1.02em",height:"1.28em"}},[s("svg",{xmlns:"http://www.w3.org/2000/svg",width:"400em",height:"1.28em",viewBox:"0 0 400000 1296",preserveAspectRatio:"xMinYMin slice"},[s("path",{d:`M263,681c0.7,0,18,39.7,52,119
c34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120
c340,-704.7,510.7,-1060.3,512,-1067
l0 -0
c4.7,-7.3,11,-11,19,-11
H40000v40H1012.3
s-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232
c-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1
s-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26
c-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z
M1001 80h400000v40h-400000z`})])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.2766em"}},[s("span")])])])])])]),s("span",{style:{top:"-3.23em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"frac-line",style:{"border-bottom-width":"0.04em"}})]),s("span",{style:{top:"-3.677em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.13889em"}},"T"),s("span",{class:"mord"},[s("span",{class:"mord"},"Σ"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.8413em"}},[s("span",{style:{top:"-2.4519em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},"1")])]),s("span",{style:{top:"-3.063em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.13889em"}},"T")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.2481em"}},[s("span")])])])])]),s("span",{class:"mord mathnormal"},"x"),s("span",{class:"mord mathnormal",style:{"margin-right":"0.03588em"}},"y"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"−"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},"Σ"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.8413em"}},[s("span",{style:{top:"-2.4519em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},"1")])]),s("span",{style:{top:"-3.063em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.13889em"}},"T")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.2481em"}},[s("span")])])])])]),s("span",{class:"mord mathnormal"},"x"),s("span",{class:"mord"},[s("span",{class:"mord"},"Σ"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.8413em"}},[s("span",{style:{top:"-2.4519em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},"1")])]),s("span",{style:{top:"-3.063em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.13889em"}},"T")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.2481em"}},[s("span")])])])])]),s("span",{class:"mord mathnormal",style:{"margin-right":"0.03588em"}},"y")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"1.13em"}},[s("span")])])])]),s("span",{class:"mclose nulldelimiter"})])])])])])],-1),u=s("p",null,[a("其中，"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"T")]),s("annotation",{encoding:"application/x-tex"},"T")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6833em"}}),s("span",{class:"mord mathnormal",style:{"margin-right":"0.13889em"}},"T")])])]),a("是信号长度，"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"x")]),s("annotation",{encoding:"application/x-tex"},"x")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.4306em"}}),s("span",{class:"mord mathnormal"},"x")])])]),a("为预测的 rPPG 信号，"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"y")]),s("annotation",{encoding:"application/x-tex"},"y")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.625em","vertical-align":"-0.1944em"}}),s("span",{class:"mord mathnormal",style:{"margin-right":"0.03588em"}},"y")])])]),a("为真实的 PPG 信号。")],-1),d=s("p",null,[a("该损失函数是 1 减去负皮尔逊相关系数，Loss 越小说明 rPPG 与 Ground Truth 越相关，确保二者的"),s("strong",null,"趋势相似性（Trend-similarity）和最小化峰值位置误差（minimize-peak-location-errors）")],-1),y=s("h3",{id:"ground-truth",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#ground-truth"},[s("span",null,"Ground Truth")])],-1),v=s("p",null,[a("选择 "),s("strong",null,"PPG 信号"),a("作为真实值")],-1),w=s("div",{class:"hint-container tip"},[s("p",{class:"hint-container-title"},"PPG 信号与 ECG（心电图）信号相比较"),s("p",null,"因为从手腕上采集的 PPG 信号与我们恢复的 rPPG 信号更相似，ECG 信号包含了肌电的活动，这在 rPPG 上是恢复不出来的，所以采用 PPG 做标定")],-1);function f(x,z){const e=n("FlowChart");return i(),m("div",null,[o,r(e,{id:"flowchart-56",code:"eJxlkcFOwkAQhu/zFD3qwQNwI2lv6tXExAvpoZEGm5CWtCXxKNEgNCAaowSaGMAaxChWg4LY4ssw2/bEK7hQ0ohcNvvvTr75/xmN5TRdUPUksyMcSkKWOZDSogKqqOWzOstJci6vK3mdnklG3dvbZfaljCxkNRBllhPldJLZltOg6WIuxnJKTlQFXVLkJJNaPPFADMPvFoPOFfkoEOMG3Tcs2eC3H3FS8E9dNExiDvDB9Zpn4Jff0e3hy6XXGwf1wYIaX6fG+f+VaFVDNpBvK2hY2HjCe3vmVLB/513YntkH0jqf/rSxNlyyw0zU80rCVHjhAa1mcNIMCtfUNrodmDmlKAa1SuqfQEFe+YvGQHMyc8oLt4l1twkeYscxrA697itpjdAuUjb8hfvuM1Zup6MxTB3b77cpfz5p2mNuFMc1LNUBtA1Vyhzpm1t0X3SyKyoeqWWsld9EpMKtRlKU4RdoogMG",preset:"vue"}),h,g,u,d,y,v,w])}const P=l(c,[["render",f],["__file","PhysNet.html.vue"]]),T=JSON.parse('{"path":"/study/SummerCampReview/PhysNet.html","title":"rPPG: PhysNet Review","lang":"zh-CN","frontmatter":{"date":"2024-06-29T00:00:00.000Z","description":"rPPG: PhysNet Review Conventional Model Drawbacks Only one simple output - HR, which limits usage in demanding medical applications. end-to-end neural networks lost the pre-proc...","head":[["meta",{"property":"og:url","content":"https://dream-oyh.github.io/study/SummerCampReview/PhysNet.html"}],["meta",{"property":"og:site_name","content":"Dream_oyh 的 blog"}],["meta",{"property":"og:title","content":"rPPG: PhysNet Review"}],["meta",{"property":"og:description","content":"rPPG: PhysNet Review Conventional Model Drawbacks Only one simple output - HR, which limits usage in demanding medical applications. end-to-end neural networks lost the pre-proc..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://dream-oyh.github.io/images/Study/PhysNet_structure.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T17:04:16.000Z"}],["meta",{"property":"article:author","content":"OYH"}],["meta",{"property":"article:published_time","content":"2024-06-29T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T17:04:16.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"rPPG: PhysNet Review\\",\\"image\\":[\\"https://dream-oyh.github.io/images/Study/PhysNet_structure.png\\"],\\"datePublished\\":\\"2024-06-29T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T17:04:16.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"OYH\\",\\"email\\":\\"19859860010@163.com\\"}]}"]]},"headers":[{"level":2,"title":"Conventional Model Drawbacks","slug":"conventional-model-drawbacks","link":"#conventional-model-drawbacks","children":[]},{"level":2,"title":"PhysNet Advantages","slug":"physnet-advantages","link":"#physnet-advantages","children":[]},{"level":2,"title":"How does it works?","slug":"how-does-it-works","link":"#how-does-it-works","children":[]},{"level":2,"title":"Loss Function and Ground Truth","slug":"loss-function-and-ground-truth","link":"#loss-function-and-ground-truth","children":[{"level":3,"title":"Loss Function","slug":"loss-function","link":"#loss-function","children":[]},{"level":3,"title":"Ground Truth","slug":"ground-truth","link":"#ground-truth","children":[]}]}],"git":{"createdTime":1719718516000,"updatedTime":1720026256000,"contributors":[{"name":"dream-oyh","email":"1399541701@qq.com","commits":2}]},"readingTime":{"minutes":1.44,"words":432},"filePathRelative":"study/SummerCampReview/PhysNet.md","localizedDate":"2024年6月29日","excerpt":"\\n<h2>Conventional Model Drawbacks</h2>\\n<ol>\\n<li>Only one simple output - HR, which limits usage in demanding medical applications.</li>\\n<li>end-to-end neural networks lost the pre-processing and post-processing steps.</li>\\n<li>Without considering temporal context features.</li>\\n<li>Need pure empirical knowledge and handcrafted processing, which may cause crucial features lost.</li>\\n</ol>","autoDesc":true}');export{P as comp,T as data};
