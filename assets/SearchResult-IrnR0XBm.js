import{u as $,g as te,h as le,i as U,j as se,P as ae,t as re,k as ie,l as q,m as H,n as oe,p as G,q as l,s as he,R as N,v as ne,x as ue,y as ce,C as me,z as de,A as pe,B as ye,D as ve,E as ge,F as k,G as Ee,H as Ae,I as fe,J as O,K as j,L as we}from"./app-qnVddVOo.js";const Re=["/","/intro.html","/articles/CPC.html","/articles/CSU.html","/articles/article.html","/articles/external.html","/articles/film_recommend.html","/articles/hamlet.html","/articles/","/articles/read.html","/articles/software.html","/articles/weakness.html","/articles/web.html","/blog/","/blog/log.html","/blog/spots.html","/blog/vuepress.html","/code/Linux.html","/code/cpp.html","/code/git.html","/code/github.html","/code/html.html","/code/","/code/latex.html","/code/markdown.html","/code/python.html","/code/shell.html","/code/vim.html","/code/vscode.html","/credit/","/code/Arduino/","/code/python/LocalAugment.html","/code/python/Seaborn.html","/code/python/pandas.html","/code/python/web_crawler.html","/code/python/websocket.html","/code/tips/pdf2docx.html","/code/tips/regex.html","/english/china/10.22.html","/english/china/10.23.html","/english/china/10.24.html","/english/china/10.25.html","/english/china/10.26.html","/english/china/10.27.html","/english/china/10.28.html","/english/china/10.29.html","/english/china/10.30.html","/english/china/10.31.html","/english/china/11.1.html","/english/china/11.2.html","/english/free/1.html","/english/free/2.html","/english/free/3.html","/english/free/4.html","/english/free/5.html","/english/free/6.html","/english/free/7.html","/english/free/8.html","/english/free/9.html","/english/repo/community.html","/english/repo/growth.html","/english/repo/","/english/repo/life.html","/english/repo/negative.html","/english/repo/unarchived.html","/english/video/1.html","/english/video/2.html","/english/video/3.html","/english/video/4.html","/english/video/5.html","/english/video/6.html","/english/video/7.html","/english/video/8.html","/english/video/9.html","/study/Algorithm/Enumerate.html","/study/Algorithm/Sort.html","/study/DataStructure/HashTable.html","/study/DataStructure/graph.html","/study/DataStructure/","/study/DataStructure/linked_list.html","/study/DataStructure/queue.html","/study/DataStructure/stack.html","/study/DataStructure/tree.html","/study/LiteratureReview/01.html","/study/SummerCampReview/ObjectDetection.html","/study/SummerCampReview/PhysNet.html","/code/python/pytorch/1pytorch.html","/code/python/pytorch/2.1linear_regression.html","/code/python/pytorch/2.2FashionMNIST.html","/code/python/pytorch/2.3softmax.html","/code/python/pytorch/2.4MLP.html","/code/python/pytorch/3.1Deeplearning_basic.html","/code/python/pytorch/4.1convolutional_nn_basic.html","/code/python/pytorch/4.2LeNet.html","/code/python/pytorch/4.3AlexNet.html","/code/python/pytorch/4.4VGG.html","/code/python/pytorch/4.5NiN.html","/code/python/pytorch/4.6GoogleNet.html","/code/python/pytorch/img.html","/404.html","/code/python/","/code/tips/","/english/china/","/english/","/english/free/","/english/video/","/study/Algorithm/","/study/","/study/LiteratureReview/","/study/SummerCampReview/","/code/python/pytorch/","/category/","/category/%E6%8E%A8%E8%8D%90/","/category/%E5%8D%9A%E5%AE%A2/","/category/%E8%AE%A1%E7%AE%97%E6%9C%BA/","/category/%E5%BA%95%E5%B1%82/","/category/%E5%B7%A5%E5%85%B7/","/category/%E5%89%8D%E7%AB%AF/","/category/%E7%BC%96%E7%A8%8B/","/category/%E7%AC%94%E8%AE%B0/","/category/%E8%B5%84%E6%96%99%E7%AB%99/","/category/python-%E5%BA%93/","/category/%E9%94%A6%E5%9B%8A/","/tag/","/tag/%E6%96%87%E7%AB%A0/","/tag/index/","/tag/%E6%97%A5%E5%BF%97/","/tag/%E9%97%AE%E9%A2%98%E8%AE%B0%E5%BD%95/","/tag/%E7%AC%94%E8%AE%B0/","/tag/%E6%95%99%E7%A8%8B/","/tag/algorithm/","/tag/data-structure/","/article/","/star/","/timeline/"],Se="SEARCH_PRO_QUERY_HISTORY",g=$(Se,[]),He=()=>{const{queryHistoryCount:s}=k,a=s>0;return{enabled:a,queryHistory:g,addQueryHistory:r=>{a&&(g.value=Array.from(new Set([r,...g.value.slice(0,s-1)])))},removeQueryHistory:r=>{g.value=[...g.value.slice(0,r),...g.value.slice(r+1)]}}},_=s=>Re[s.id]+("anchor"in s?`#${s.anchor}`:""),ke="SEARCH_PRO_RESULT_HISTORY",{resultHistoryCount:I}=k,E=$(ke,[]),xe=()=>{const s=I>0;return{enabled:s,resultHistory:E,addResultHistory:a=>{if(s){const r={link:_(a),display:a.display};"header"in a&&(r.header=a.header),E.value=[r,...E.value.slice(0,I-1)]}},removeResultHistory:a=>{E.value=[...E.value.slice(0,a),...E.value.slice(a+1)]}}},De=s=>{const a=me(),r=U(),x=de(),o=q(0),w=H(()=>o.value>0),p=pe([]);return ye(()=>{const{search:y,terminate:D}=ve(),A=ge(u=>{const f=u.join(" "),{searchFilter:C=d=>d,splitWord:b,suggestionsFilter:F,...v}=a.value;f?(o.value+=1,y(u.join(" "),r.value,v).then(d=>C(d,f,r.value,x.value)).then(d=>{o.value-=1,p.value=d}).catch(d=>{console.warn(d),o.value-=1,o.value||(p.value=[])})):p.value=[]},k.searchDelay-k.suggestDelay);G([s,r],([u])=>A(u),{immediate:!0}),Ee(()=>{D()})}),{isSearching:w,results:p}};var be=te({name:"SearchResult",props:{queries:{type:Array,required:!0},isFocusing:Boolean},emits:["close","updateQuery"],setup(s,{emit:a}){const r=le(),x=U(),o=se(ae),{enabled:w,addQueryHistory:p,queryHistory:y,removeQueryHistory:D}=He(),{enabled:A,resultHistory:u,addResultHistory:f,removeResultHistory:C}=xe(),b=w||A,F=re(s,"queries"),{results:v,isSearching:d}=De(F),i=ie({isQuery:!0,index:0}),c=q(0),m=q(0),P=H(()=>b&&(y.value.length>0||u.value.length>0)),B=H(()=>v.value.length>0),L=H(()=>v.value[c.value]||null),M=()=>{const{isQuery:e,index:t}=i;t===0?(i.isQuery=!e,i.index=e?u.value.length-1:y.value.length-1):i.index=t-1},Y=()=>{const{isQuery:e,index:t}=i;t===(e?y.value.length-1:u.value.length-1)?(i.isQuery=!e,i.index=0):i.index=t+1},V=()=>{c.value=c.value>0?c.value-1:v.value.length-1,m.value=L.value.contents.length-1},z=()=>{c.value=c.value<v.value.length-1?c.value+1:0,m.value=0},J=()=>{m.value<L.value.contents.length-1?m.value+=1:z()},K=()=>{m.value>0?m.value-=1:V()},Q=e=>e.map(t=>we(t)?t:l(t[0],t[1])),W=e=>{if(e.type==="customField"){const t=Ae[e.index]||"$content",[h,S=""]=fe(t)?t[x.value].split("$content"):t.split("$content");return e.display.map(n=>l("div",Q([h,...n,S])))}return e.display.map(t=>l("div",Q(t)))},R=()=>{c.value=0,m.value=0,a("updateQuery",""),a("close")},X=()=>w?l("ul",{class:"search-pro-result-list"},l("li",{class:"search-pro-result-list-item"},[l("div",{class:"search-pro-result-title"},o.value.queryHistory),y.value.map((e,t)=>l("div",{class:["search-pro-result-item",{active:i.isQuery&&i.index===t}],onClick:()=>{a("updateQuery",e)}},[l(O,{class:"search-pro-result-type"}),l("div",{class:"search-pro-result-content"},e),l("button",{class:"search-pro-remove-icon",innerHTML:j,onClick:h=>{h.preventDefault(),h.stopPropagation(),D(t)}})]))])):null,Z=()=>A?l("ul",{class:"search-pro-result-list"},l("li",{class:"search-pro-result-list-item"},[l("div",{class:"search-pro-result-title"},o.value.resultHistory),u.value.map((e,t)=>l(N,{to:e.link,class:["search-pro-result-item",{active:!i.isQuery&&i.index===t}],onClick:()=>{R()}},()=>[l(O,{class:"search-pro-result-type"}),l("div",{class:"search-pro-result-content"},[e.header?l("div",{class:"content-header"},e.header):null,l("div",e.display.map(h=>Q(h)).flat())]),l("button",{class:"search-pro-remove-icon",innerHTML:j,onClick:h=>{h.preventDefault(),h.stopPropagation(),C(t)}})]))])):null;return oe("keydown",e=>{if(s.isFocusing){if(B.value){if(e.key==="ArrowUp")K();else if(e.key==="ArrowDown")J();else if(e.key==="Enter"){const t=L.value.contents[m.value];p(s.queries.join(" ")),f(t),r.push(_(t)),R()}}else if(A){if(e.key==="ArrowUp")M();else if(e.key==="ArrowDown")Y();else if(e.key==="Enter"){const{index:t}=i;i.isQuery?(a("updateQuery",y.value[t]),e.preventDefault()):(r.push(u.value[t].link),R())}}}}),G([c,m],()=>{var e;(e=document.querySelector(".search-pro-result-list-item.active .search-pro-result-item.active"))==null||e.scrollIntoView(!1)},{flush:"post"}),()=>l("div",{class:["search-pro-result-wrapper",{empty:s.queries.length?!B.value:!P.value}],id:"search-pro-results"},s.queries.length?d.value?l(he,{hint:o.value.searching}):B.value?l("ul",{class:"search-pro-result-list"},v.value.map(({title:e,contents:t},h)=>{const S=c.value===h;return l("li",{class:["search-pro-result-list-item",{active:S}]},[l("div",{class:"search-pro-result-title"},e||o.value.defaultTitle),t.map((n,ee)=>{const T=S&&m.value===ee;return l(N,{to:_(n),class:["search-pro-result-item",{active:T,"aria-selected":T}],onClick:()=>{p(s.queries.join(" ")),f(n),R()}},()=>[n.type==="text"?null:l(n.type==="title"?ne:n.type==="heading"?ue:ce,{class:"search-pro-result-type"}),l("div",{class:"search-pro-result-content"},[n.type==="text"&&n.header?l("div",{class:"content-header"},n.header):null,l("div",W(n))])])})])})):o.value.emptyResult:b?P.value?[X(),Z()]:o.value.emptyHistory:o.value.emptyResult)}});export{be as default};
