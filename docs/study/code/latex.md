# Latex 公式编辑器

核心思想：内容与格式的分离

## 安装与学习

安装：见知乎老哥专栏：[如何安装latex](https://zhuanlan.zhihu.com/p/56982388)

学习：想要学习latex数学公式编辑语法可以用妈咪说搭建的可视化网站：[在线Latex公式编辑器](https://www.latexlive.com/)

如果有梯子的话，建议使用[Overleaf](https://www.overleaf.com)网站，在线的latex语法编辑器

## latex自带帮助文档

cmd窗口中输入texdoc ctex 打开ctex宏集手册
cmd窗口中输入texdoc graphicx 打开graphicx宏集手册


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
    \usepackage{ctex} % 引入ctex宏包，从而可以输出中文
```

- newcommand命令
在导言区加入newcommand指令，可自定义命令
``` latex
\newcommand {\自定义命令符}{代码，指令}
% 如：
\newcommand {\myfont}{\textit{\textbf{\textsf{Hello World}}}}
```

## latex字体设置

<strong>字体属性</strong>

* 字体编码
  - 正文字体编码：OT1，T1，U1等
  - 数学字体编码：OML，OMS，OMX等
* 字体族
  - 罗马字体：笔画起始处有装饰
  - 无衬线字体：笔画起始处无装饰
  - 打字机字体：每个字符宽度相同，又称为等宽字体（常常用作代码字体）
* 字体系列
  - 粗细
  - 宽度
* 字体形状
  - 直立
  - 斜体
  - 伪斜体
  - 小型大写
* 字体大小

<strong>设置字体族：</strong>

  ``` latex

  \textrm{hello dream-oyh}  % 设置罗马字体
  \textsf{hello dream-oyh}  % 设置无衬线字体
  \texttt{hello dream-oyh}  % 设置打字机字体

  % 或用下面语句声明之后的文本都是该字体，直到碰到新的字体指令
  \rmfamily hello dream-oyh!  % 设置罗马字体
  \sffamily hello dream-oyh!  % 设置无衬线字体
  \ttfamily hello dream-oyh!  % 设置打字机字体

  % 或用大括号确定字体更改区域
  {\rmfamily hello dream-oyh!……}  % 设置罗马字体
  {\sffamily hello dream-oyh!……}  % 设置无衬线字体
  {\ttfamily hello dream-oyh!……}  % 设置打字机字体
  ```

  预览：

<div style="text-align: center; ">

  $\textrm{hello dream-oyh}$  % 设置罗马字体

  $\textsf{hello dream-oyh}$  % 设置无衬线字体

  $\texttt{hello dream-oyh}$  % 设置打字机字体

</div>

<strong>设置字体系列：</strong>

``` latex

\textmd{dream-oyh is dream-oyh} % 设置细体
\textbf{dream-oyh is dream-oyh} % 设置粗体

% 或用大括号确定字体更改区域

{\mdseries dream-oyh is dream-oyh} % 设置细体
{\bfseries dream-oyh is dream-oyh} % 设置粗体
```

预览：


<div style="text-align: center; ">

  $\textmd{dream-oyh is dream-oyh}$  % 设置细体

  $\textbf{dream-oyh is dream-oyh}$  % 设置粗体

</div>

<strong>设置字体形状：</strong>

``` latex

\textup{oyh is messing around}  % 设置直立字体
\textit{oyh is messing around}  % 设置斜体
\textsl{oyh is messing around}  % 设置伪斜体
\textsc{oyh is messing around}  % 设置小型大写

% 或用大括号确定字体更改区域

{\upshape oyh is messing around}  % 设置直立字体
{\itshape oyh is messing around}  % 设置斜体
{\slshape oyh is messing around}  % 设置伪斜体
{\scshape oyh is messing around}  % 设置小型大写

```

预览：


<div style="text-align: center; ">

$\textup{oyh is messing around}$  % 设置直立字体

$\textit{oyh is messing around}$  % 设置斜体

(伪斜体与小型大写不支持在此展示)

</div>

<strong>中文字体设置：</strong>

```latex
% 注意：处理中文需要加上ctex宏包
{\songti oyh在摆烂} % 设置宋体
{\heiti oyh在摆烂} % 设置黑体
{\kaishu oyh在摆烂} % 设置楷书
{\fangsong oyh在摆烂} % 设置仿宋
```
中文字体也可执行$\textbf{粗体}$与$\textit{斜体}$

```latex
% 注意：处理中文需要加上ctex宏包
\textbf{粗体} % 设置粗体
\textif{斜体} % 设置斜体
```

<strong>设置字体大小：</strong>

```latex
{\tiny dream-oyh}
{\scriptsize dream-oyh }
{\footnotesize dream-oyh}
{\small dream-oyh}
{\normalsize dream-oyh} % 标准大小
{\large dream-oyh}
{\Large dream-oyh}
{\LARGE dream-oyh}
{\huge dream-oyh}
{\Huge dream-oyh}
```
预览：
<div style="text-align: center; ">

${\tiny dream-oyh}$

${\scriptsize dream-oyh }$

${\footnotesize dream-oyh}$

${\small dream-oyh}$

${\normalsize dream-oyh}$ 

${\large dream-oyh}$

${\Large dream-oyh}$

${\LARGE dream-oyh}$

${\huge dream-oyh}$

${\Huge dream-oyh}$

</div>

字体大小为相对于$normalsize$的大小，而$normalsize$的大小由文档类控制，如：

``` latex
\documentclass[10pt]{article} % 设置normalsize的大小为10磅（一般选择在10pt,11pt,12pt）
```

* 中文字号设置命令
```latex
\zihao{-0} 你好！

% -0 表示小初号
% 5 表示五号
% 其余字体大小声明细节可以在ctex宏集手册中查找
```

## latex篇章结构

- 构建小节

```latex
  \section{引言}  % 构建“引言”小节
  \section{实验方法}
  \section{实验结果}
    \subsection{数据} % 构建“数据”子小节
    \subsection{图表}
      \subsubsection{实验条件} % 构建“实验条件”子子小节
      \subsubsection{实验过程}
    \subsection{结果分析}
  \section{结论}
  \section{致谢}
```
预览：
<div style="text-align: center; ">
<img alt="预览_2" src="https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/latex_2.png" width="30%" height="30%"/>
</div>

- 正文格式

```latex
  \section{引言}  % 构建“引言”小节

  oyh真的在摆烂，他就是一个摆烂王捏~oyh真的在摆烂，他就是一个摆烂王捏~
  oyh真的在摆烂，他就是一个摆烂王捏~oyh真的在摆烂，他就是一个摆烂王捏~
  oyh真的在摆烂，他就是一个摆烂王捏~
  重要的话要多说几遍，你才能看得出来这个段落是有首行缩进的，
  不然文字内容太少你就看不出来了。
  没啥字可以打的就这么凑合用吧……

  真的，跟你说了你爱信不信 % 插入一个空行起分段作用

  有啥好骗你的，他就是一个憨批，\\老坑了 % 可用两个连续的反斜杠强制换行，但并没有产生新的段落 
  
  虽然坑吧，但是也别忘记了“$\backslash$ par”命令可以强制分段，比如说这样： \par 你看就分段了 % 哦对，\backslash 可以输出反斜杠
  \section{实验方法}  % 可用\par 指令强行分段
  
```
预览：
<div style="text-align: center; ">
<img alt="预览_3" src="https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/latex_3.png" />
</div>

- 目录
```latex
\tableofcontents  % 产生大纲目录
```

## latex特殊符号

- 空白符号

```latex
%空行分段，多个空行等同一个
%分段会自动缩进，不需要用空格代替
%英文中多个空格会自动处理为1个空格，中文中空格会忽略
%汉字与其他字符的间距将会由latex自动处理
%禁止使用中文全角空格

a\quad b % 1em（一个字符M的宽度）
a\qquad b % 2em
a\,b  a\thinspace b % 1/6em
a\enspace b % 1/2em
a\ b % 空格
a~b % 硬空格 
```

预览：
<div style="text-align: center; ">


$a\quad b % 1em（一个字符M的宽度）$

$a\qquad b % 2em$

$a\,b % 1/6em$ 

$a\thinspace b % 1/6em$

$a\enspace b % 1/2em$

$a\ b % 空格$

$a~b % 硬空格$

</div>

- 控制符

|符号|控制符表示|
|:---:|:---:|
|#|`\#`|
|$|`\$`|
|%|`\%`|
|{|`\{`|
|}|`\}`|
|~|`\~{}`|
|^|`\^{}`|
|_|`|_{}`|
|\ |`\backslash`|
|&|`\&`|

- 排版符号

|排版符号|代码表示|
|:---:|:---:|
|$\S$|`\S`|
|$\P$|`\P`|
|$\dag$|`\dag`|
|$\ddag$|`\ddag`|
|$\copyright$|`\copyright`|
|$\pounds$|`\pounds`|

(似乎vuepress不支持这些符号，哭)

- latex标志符号

|标志符号|代码表示|
|:---:|:---:|
|$\TeX{}$|`\TeX{}`|
|$\LaTeX{}$|`\LaTeX{}`|

- 引号

|引号|代码表示|
|:---:|:---:|
|‘|`  |
|’|`'`|
|“|` `` `|
|”|`''`|

- 连字符

|连字符|代码表示|
|:---:|:---:|
|-|-|
|--|—|
|---|——|

## latex插图

```latex
\usepackage{graphicx} % 导言区引入graphicx宏包

\graphicspath{{<地址1>},{<地址2>},……} % 在导言区插入该命令，以说明图像的文件夹所在目录，应为相对路由地址，如：figure/
% graphicx宏包支持EPS，PDF，PNG，JPEG，BMP等多种图像格式

\includegraphics[<选项>]{<文件名>}  % 导入图片的语法： “选项”中包含缩放指令，旋转等参数，不需要调整时可以忽略


% ====选项中的参数=====

[scale=0.3] % 缩放比例
[height=2cm] % 调整高度
[height=0.1\textheight] % 调整高度为0.1倍当前文档格式标准高度
[width=2cm] % 调整宽度
[width=0.1\textwidth] % 调整高度为0.1倍当前文档格式标准宽度
[angle=45] % 旋转角度
```

## latex中的表格

```latex
\begin{tabular} {|l||c|c|c|r|}
% 用该命令生成表格,l指定左对齐，c指定居中对齐，r指定右对齐，
有多少字母就有几列;用绝对值符号产生表格竖线，两个绝对值符号产生表格双竖线

% p{<宽度>}能够限定列宽，并且可以自动换行
  \hline %用该命令产生表格横线
  姓名 & 语文 & 数学 & 外语 & 备注 \\ % 不同列之间用&分割，并且用\\结束一行，进入下一行
  \hline\hline % 两个hline命令产生双横线
  张三 & 87 & 100 & 93 & 优秀 \\
  \hline 
  李四 & 75 & 64 & 52 & 补考另行通知\\
  \hline
  王二 & 80 & 82 & 78 & \\
  \hline
\end{tabular}
```


预览：
<div style="text-align: center; ">
<img alt="预览_4" src="https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/latex_4.png" />
</div>

## latex浮动体环境

仅仅用`\includegraphics`与`tabular`语法，只能实现表格与图片的创建，无法对其进行排版，创建浮动体环境，即可对于表格与图片进行位置调整，插入题注，交叉引用等操作。

- 浮动体环境的创建
``` latex
%======图片的浮动体环境=====
\begin{figure}
  \includegraphics{} % 插入图片
\end{figure}
%======表格的浮动体环境=====
\begin{table}
  \begin{tabular}{|l|c|c|c|}

  \begin{tabular}
\end{table}
```

- 居中排版

在浮动体环境中用`\centering`命令，居中排版，他只影响环境中的内容
```latex
\begin{figure}
  \centering % 居中排版
  \includegraphics{} % 插入图片
\end{figure}
```
- 参数

通过可选参数指定浮动体的排版位置
如：
`\begin{figure}[htbp]` 

`h`(here)——代码所在的上下文位置

`t`(top)——代码所在的页面或之后页面的顶部

`b`(bottom)——代码所在页面或之后页面的底部

`p`(page)——独立一页

`htbp`——任意位置均可

- 插入题主

`\caption{text}`

若在其之后添加标签，可为改图片命名，并在其他语句中进行引用

添加标签语法：`\caption{text}\label{figure1}`

若要引用：`数据结果可见图\ref{figure1}`

代码：
```latex
xxx可见图\ref{figure1}

\begin{figure}[hbtp]
  \centering
  \includegraphics[scale=0.1]{xxx.png}
  \caption{xxx}\label{figure1}
\end{figure}
```

预览：
<div style="text-align: center; ">
<img alt="预览_5" src="https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/latex_5.png" />
</div>

## latex数学公式初步

注1：由于跨平台的问题，部分latex语法在vuepress中无法使用<span class="mask" title="嘿嘿嘿，被发现了捏~">对，vuepress太辣鸡了，下次建博客别用vuepress</span>

注2：`\text{}`可用于在数学模式下临时切换成文本模式

### 行内公式

<strong>用一对dollar符号进行排版</strong>

`$f(x)=x^2+3x+2$`&emsp;&emsp;$f(x)=x^2+3x+2$

<strong>用一对小括号进行排版</strong>

`\(f(x)=x^2+3x+2\)`&emsp;&emsp;(这在vuepress中无法使用)

<strong>用math环境输入公式</strong>

```latex
\begin{math}
  f(x)=x^2+3x+2
\end{math}

% 好的这在vuepress中无法使用
```

### 行间公式

行间公式：自动跳转下一行并居中

<strong>用两对dollar符号进行排版</strong>

`$$f(x)=x^2+3x+2$$`(这在vuepress中无法使用)

<strong>用一对中括号进行排版</strong>

`\[f(x)=x^2+3x+2\]`(这在vuepress中无法使用)

<strong>在displaymath环境中输入公式</strong>

```latex
\begin{displaymath}
  f(x)=x^2+3x+2
\end{displaymath}

% 好的这在vuepress中也无法使用
```


### 基本排版

|语句/符号|作用|示例代码|示例效果|
|:---:|:---:|:---:|:---:|
|□^□|上标|`$e^x$` `$e^{sinx}$`|$e^x$ $e^{sinx}$|
|□_□|下标|`$a_0$` `$a_{20}$`|$a_0$ $a_{20}$|
|\frac{□}{□}|分式|`$\frac{3}{4}$`|$\frac{3}{4}$|
|□_{□}^{□}|上下标|`$a_2^2$`<br/>`$a_{20}^{20}$`|$a_2^2$<br/>$a_{20}^{20}$|

- 常用省略号

|省略号|代码|
|:---:|:---:|
|$\dots$|`$\dots$`|
|$\vdots$|`$\vdots$`|
|$\ddots$|`$\ddots$`|
|…………|`$\hdotsfor{□}$`<br/>（跨列省略号）|


- 希腊字母

:::details
|希腊字母|代码|
|:---:|:---:|
|$\alpha$|`$\alpha$`|
|$\beta$|`$\beta$`|
|$\gamma$|`$\gamma$`|
|$\epsilon$|`$\epsilon$`|
|$\pi$|`$\pi$`|
|$\omega$|`$\omega$`|
|$\Gamma$|`$\Gamma$`|
|$\Delta$|`$\Delta$`|
|$\Theta$|`$\Theta$`|
|$\Pi$|`$\Pi$`|
|$\Omega$|`$\Omega$`|
|$\Sigma$|`$\Sigma$`|
:::

- 数学函数

:::details
|语句/符号|作用|示例代码|示例效果|
|:---:|:---:|:---:|:---:|
|\log|log函数|`$\log x$`<br/>`log x`|$\log x$<br/>$log\, x$<br/>区别有斜杠和无斜杠的效果|
|\ln|ln函数|`$\ln x$` |$\ln x$|
|\log_□|log函数搭配下标效果（其余函数同理）|`$\log_2 x$`|$\log_2 x$|
|\sin|sin函数|`$\sin x$`|$\sin x$|
|\cos|cos函数|`$\cos x$`|$\cos x$|
|\tan|tan函数|`$\tan x$`|$\tan x$|
|\arcsin|arcsin函数|`$\arcsin x$`|$\arcsin x$|
|\arccos|arccos函数|`$\arccos x$`|$\arccos x$|
|\arctan|arctan函数|`$\arctan x$`|$\arctan x$|
|\sin^{□}|sin函数搭配上标效果（其余函数同理）|`$\sin^{-1} x$`|$\sin^{-1} x$|
|sqrt{□}|根号|`$\sqrt{20}$`<br/>`$\sqrt{2+\sqrt{2}}$`|$\sqrt{20}$<br/>$\sqrt{2+\sqrt{2}}$|
|sqrt[□]{□}|n次根号|`$\sqrt[4]{49}$`|$\sqrt[4]{49}$|
|°|角度|`$^{\circ}$`|45$^{\circ}$|
:::

### 公式编号

在equation环境中实现公式编号

```latex
\begin{equation}
  f(x)=3x^2+2x+3  \label{eq1}
\end{equation}
```

同样，也可使用`\label{□}`进行公式编号，进而通过`ref{□}`实现交叉引用

若不需要公式编号，需要在equation*中输入公式，使用此环境前需要在导言区引入amsmath宏包（语句：`\usepackage{amsmath}`）。

此环境中允许`\label{□}`标签与`ref{□}`的交叉引用，此时的编号为公式所在小节编号
```latex
\begin{equation*}
  f(x)=3x^2+2x+3  \label{eq2}
\end{equation*}
```

### 矩阵排版

引入amsmath宏包（语句：`\usepackage{amsmath}`）后，在matrix环境下实现矩阵的排版


```latex
\begin{matrix}
  0&1\\
  1&0
\end{matrix}
```
（行与列的语法同[表格](/study/code/latex.md#latex中的表格)章节）

但是这样的环境下无法加入两边的括号，于是有不同环境，以加入不同的括号：
::: details 不同的矩阵环境
```latex
%=====不加边线========
\begin{matrix}
  0&1\\
  1&0
\end{matrix}
%=====用于加小括号====
\begin{pmatrix}
  0&1\\
  1&0
\end{pmatrix}
%=====用于加中括号====
\begin{bmatrix}
  0&1\\
  1&0
\end{bmatrix}
%=====用于加大括号====
\begin{Bmatrix}
  0&1\\
  1&0
\end{Bmatrix}
%=====用于加单竖线====
\begin{vmatrix}
  0&1\\
  1&0
\end{vmatrix}
%=====用于加双竖线====
\begin{Vmatrix}
  0&1\\
  1&0
\end{Vmatrix}
```
:::

预览：
:::details 矩阵排版
$%=====不加边线========
\begin{matrix}
  0&1\\
  1&0
\end{matrix}\qquad
%=====用于加小括号====
\begin{pmatrix}
  0&1\\
  1&0
\end{pmatrix}\qquad
%=====用于加中括号====
\begin{bmatrix}
  0&1\\
  1&0
\end{bmatrix}\qquad
%=====用于加大括号====
\begin{Bmatrix}
  0&1\\
  1&0
\end{Bmatrix}\qquad
%=====用于加单竖线====
\begin{vmatrix}
  0&1\\
  1&0
\end{vmatrix}\qquad
%=====用于加双竖线====
\begin{Vmatrix}
  0&1\\
  1&0
\end{Vmatrix}$
:::

- 插入行内小矩阵

```latex
\begin{math}
  \left(% 需要手动加上左括号
    \begin{smallmatrix}
    x&y\\
    y&x
    \end{smallmatrix}
  \right)% 需要手动加上右括号
\end{math}
```

预览：$\left(% 需要手动加上左括号
    \begin{smallmatrix}
    x&y\\
    y&x
    \end{smallmatrix}
  \right)% 需要手动加上右括号$

- array环境构造更为复杂的矩阵

下面以一个极为复杂的例子进行研究
:::details 代码
```latex
\begin{array}{c@{\hspace{-5pt}}l} % @{<内容>}——添加任意内容，不占据表项计数
% 此处添加一个负值空白，表示向左移动-5pt距离

% 1row 1column
\left(
  \begin{array}{ccc|ccc}% 一共6列，每列居中对齐，中间用竖线分割
  a & \cdots & a & b & \cdots & b \\
  & \ddots & \vdots & \vdots & \adots \\
  &        & a & b \\
  \hline
  &        &   & c & \cdots & c \\
  &        &   & \vdots & & \vdots \\
  \multicolumn{3}{c| }{\raisebox{2ex}[0pt]{\Huge 0}}
  & c & \cdots & c 
  % multicolumn合并多列，c表示居中，且“|”添加竖线分割
  %\raisebox表示将0抬高，且不做左右移动
  \end{array}
\right)  
&
% 1row 2column
\begin{array}{l}
\left.\rule{0mm}{7mm}\right\}p\\
% \left.仅表示与\right\}配队，不产生任何输出
\\
\left.\rule{0mm}{7mm}\right\}q
\end{array}
\\[-5pt]
% 2row 1column
\begin{array}{cc}
\underbrace{\rule{17mm}{0mm}}_m&
\underbrace{\rule{17mm}{0mm}}_m
% \underbrace 添加横大括号
\end{arrat}
&% 2row 2column
\end{array}

```
:::

预览：

<div style="text-align: center; ">
<img alt="预览_6" src="https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/latex_6.jpg"     width="40%"  height="40%"/>
</div>

### 多行公式

需要引入amsmath，amssymb宏包
（命令：\usepackage{amsmath}，\usepackage{amssymb}）

整体概述：

|环境名称|作用|
|:---:|:---|
|gather|带编号的多行公式排版（可用\notag阻止编号）|
|gather*|不带编号的多行公式排版|
|align|实现带编号的多行公式排版，可用“&”实现公式在指定位置对齐（\notag也可取消编号）|
|align*|相比于align，取消编号，其余一致|
|split|实现一条公式的多行排版，可与equation环境搭配使用实现多行公式的单独编号，也可使用"&"使公式在指定位置对齐|、
|cases|分段函数指令，逗号分隔值与条件，且自带大括号|


在gather环境中实现**带编号的**多行公式的排版
```latex
\begin{gather}
% 可以使用\\换行
% 自带编号
f(x)=x^2+3x+2\\
ab \\
ba
\end{gather}
```
预览：

$$\begin{gather}
% 可以使用\\换行
% 自带编号
f(x)=x^2+3x+2\\
ab \\
ba
\end{gather}$$

（emmm vuepress不支持捏）

在gather*环境中实现**不带编号的**多行公式的排版
```latex
\begin{gather*}
% 可以使用\\换行
% 不自带编号
f(x)=x^2+3x+2\\
ab \\
ba
\end{gather*}
```

也可以在\\前使用\notag阻止编号
```latex
\begin{gather}
f(x)=x^2+3x+2 \notag\\
ab \\
ba
\end{gather}
```

预览：
$$\begin{gather}
f(x)=x^2+3x+2 \notag\\
ab \\
ba
\end{gather}$$

利用align环境实现公式在指定位置（&符号）对齐
```latex
\begin{align}
2x+4y&=3+\sin x\\
x+5y&=2
\end{align}
```

$$\begin{align}
2x+4y&=3+\sin x\\
x+5y&=2
\end{align}$$

同理，align*环境能取消编号

但是若多行公式仅需要一个序号，需要split环境与equation环境结合使用（align*与align环境无法与equation共用）

split环境下，公式对齐与align同理
```latex
\begin{equation}
\begin{split}
\cos 2x&=\cos^2 x-\sin^2 x\\
&=1-2\sin^2 x
\end{split}
\end{equation}
```
预览：
$$\begin{equation}
\begin{split}
\cos 2x&=\cos^2 x-\sin^2 x\\
&=1-2\sin^2 x
\end{split}
\end{equation}$$

- 分段函数的排版

使用case环境，每行公式中使用&分割为两个部分，通常表示值和后面的条件
```latex
\begin{equation}
D(x)=\begin{cases}
1,& \text{如果} x \in \mathbb{Q};\\
0,& \text{如果} x \in \mathbb{R}\setminus\mathbb{Q};
\end{cases}
\end{equation}
```
预览：
$$\begin{equation}
D(x)=\begin{cases}
1,& \text{如果} x \in \mathbb{Q};\\
0,& \text{如果} x \in \mathbb{R}\setminus\mathbb{Q};
\end{cases}
\end{equation}$$

## latex新命令的定义

导言区加入`\newcommand`命令以实现新命令的定义

语法：
```latex
\newcommand<命令>[<参数个数>][<首参数默认值>]{<具体定义>}
```

不带参数的newcommand命令可以实现字符替换，如：

\newcommand\oyh{dream-oyh}

则下次打出\oyh时，会自动编译为dream-oyh

- 带参数的新命令

参数个数最多是9个，使用时用#1，#2，#3，……，#9表示

例如：

新定义：`\newcommand\eat[2]{#1 吃 #2}`

则下次使用时： \eat{dream-oyh}{lxl66566}

编译为：dream-oyh吃lxl66566

% 可对首参数值赋予默认值，若后续引用时需要修改，需要用中括号标出

新定义：`\newcommand\eat[3][吃]{#2 #1 #3}`

则下次使用时： \eat[不吃]{dream-oyh}{lxl66566}

编译为：dream-oyh不吃lxl66566

## latex有序列表环境

- 有序列表 enumerate环境

```latex
\begin{enumerate}
\item lalala
\item blabla
\item lvelvelve
\end{enumerate}
```

- 无序列表 itemize环境

```latex
\begin{itemize}
\item lalala
\item blabla
\item lvelvelve
\end{itemize}
```
可通过[]更改项目符号

```latex
\begin{itemize}
\item[*] lalala
\item[*] blabla
\item[*] lvelvelve
\end{itemize}
```

- 描述 decription环境

```latex
\begin{decription}
\item[lala] lalala
\item[bla] blabla
\item[lve] lvelvelve
\end{decription}
```
描述环境中，方括号内的字体会加粗并且充当序号
