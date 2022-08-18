# Latex 公式编辑器

## 安装与学习

安装：见知乎老哥专栏：[如何安装latex](https://zhuanlan.zhihu.com/p/56982388)

学习：想要学习latex数学公式编辑语法可以用妈咪说搭建的可视化网站：[在线Latex公式编辑器](https://www.latexlive.com/)

如果有梯子的话，建议使用[Overleaf](https://www.overleaf.com)网站，在线的latex语法编辑器

## latex程序框架

``` latex

% =======导言区（类似于全局设置）=========
\documentclass{article} % 还有book letter等文档类

\title{test} % 文本标题
\author{o yh} % 作者
\date{\today} % 编辑日期

% =========文稿区==========

\begin{document}

\maketitle  % 输出文档的作者，文本标题，编辑日期等信息（注：该命令不可用于letter文档类

%  请在此区域内输入你的内容
Hello dream-oyh!

\end{document}

```

预览：
<div style="text-align: center; ">
<img alt="预览_1" src="https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/latex_1.png" width="60%" height="60%" />
</div>

- 若需要处理中文

  则需要在导言区加上如下代码：
``` latex
    \usepackage{ctex} % 引入ctex宏包，以致于可以输出中文
```
