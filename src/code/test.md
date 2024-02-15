


**设置字体形状：**

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

::: center

$\textup{oyh is messing around}$  % 设置直立字体

$\textit{oyh is messing around}$  % 设置斜体

(伪斜体与小型大写不支持在此展示)

:::

**中文字体设置：**

```latex
% 注意：处理中文需要加上 ctex 宏包
{\songti oyh 在摆烂} % 设置宋体
{\heiti oyh 在摆烂} % 设置黑体
{\kaishu oyh 在摆烂} % 设置楷书
{\fangsong oyh 在摆烂} % 设置仿宋
```

中文字体也可执行 $\textbf{粗体}$ 与 $\textit{斜体}$

```latex
% 注意：处理中文需要加上 ctex 宏包
\textbf{粗体} % 设置粗体
\textif{斜体} % 设置斜体
```

**设置字体大小：**

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

::: center

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

:::

字体大小为相对于 $normalsize$ 的大小，而 $normalsize$ 的大小由文档类控制，如：

``` latex
\documentclass[10pt]{article} % 设置normalsize的大小为10磅（一般选择在10pt,11pt,12pt）
```

- 中文字号设置命令

```latex
\zihao{-0} 你好！

% -0 表示小初号
% 5 表示五号
% 其余字体大小声明细节可以在 ctex 宏集手册中查找
```

## latex 篇章结构

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

::: center
![](https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/latex_2.png =x300)
:::

- 正文格式

```latex
  \section{引言}  % 构建“引言”小节

  oyh 真的在摆烂，他就是一个摆烂王捏~oyh 真的在摆烂，他就是一个摆烂王捏~
  oyh 真的在摆烂，他就是一个摆烂王捏~oyh 真的在摆烂，他就是一个摆烂王捏~
  oyh 真的在摆烂，他就是一个摆烂王捏~
  重要的话要多说几遍，你才能看得出来这个段落是有首行缩进的，
  不然文字内容太少你就看不出来了。
  没啥字可以打的就这么凑合用吧……

  真的，跟你说了你爱信不信 % 插入一个空行起分段作用

  有啥好骗你的，他就是一个憨批，\\老坑了 % 可用两个连续的反斜杠强制换行，但并没有产生新的段落 
  
  虽然坑吧，但是也别忘记了“$\backslash$ par”命令可以强制分段，比如说这样： \par 你看就分段了 % 哦对，\backslash 可以输出反斜杠
  \section{实验方法}  % 可用\par 指令强行分段
```

预览：
::: center
![](https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/latex_3.png)
:::

> 画外音：（写于 2024.2）
> 2022 年的 oyh 都在写些什么啊，太羞耻了。

- 目录

```latex
\tableofcontents  % 产生大纲目录
```

## latex 特殊符号

- 空白符号

```latex
%空行分段，多个空行等同一个
%分段会自动缩进，不需要用空格代替
%英文中多个空格会自动处理为 1 个空格，中文中空格会忽略
%汉字与其他字符的间距将会由 latex 自动处理
%禁止使用中文全角空格

a\quad b % 1em（一个字符 M 的宽度）
a\qquad b % 2em
a\,b  a\thinspace b % 1/6em
a\enspace b % 1/2em
a\ b % 空格
a~b % 硬空格 
```

预览：
::: center
$a\quad b $ % 1em（一个字符 M 的宽度）

$a\qquad b $ % 2em

$a\,b $ % 1/6em

$a\thinspace b $ % 1/6em

$a\enspace b $ % 1/2em

$a\ b $ % 空格

$a~b $ % 硬空格
:::

- 控制符

|符号 | 控制符表示 |
|:---:|:---:|
|#|`\#`|
|%|`\%`|
|{|`\{`|
|}|`\}`|
|~|`\~{}`|
|^|`\^{}`|
|_|`_{}`|
|\ |`\backslash`|
|&|`\&`|

- 排版符号

|排版符号 | 代码表示 |
|:---:|:---:|
| $\S$ |`\S`|
| $\P$ |`\P`|
| $\dag$ |`\dag`|
| $\ddag$ |`\ddag`|
| $\copyright$ |`\copyright`|
| $\pounds$ |`\pounds`|

(似乎 vuepress 不支持这些符号，哭)

- latex 标志符号

|标志符号 | 代码表示 |
|:---:|:---:|
|$\TeX{}$|`\TeX{}`|
|$\LaTeX{}$|`\LaTeX{}`|

- 引号

|引号 | 代码表示 |
|:---:|:---:|
|‘|`  |
|’|`'`|
|“|` `` `|
|”|`''`|

- 连字符

|连字符 | 代码表示 |
|:---:|:---:|
|-|-|
|--|—|
|---|——|

## latex 插图

```latex
\usepackage{graphicx} % 导言区引入 graphicx 宏包

\graphicspath{{<地址 1>},{<地址 2>},……} % 在导言区插入该命令，以说明图像的文件夹所在目录，应为相对路由地址，如：figure/
% graphicx 宏包支持 EPS，PDF，PNG，JPEG，BMP 等多种图像格式

\includegraphics[<选项>]{<文件名>}  % 导入图片的语法： “选项”中包含缩放指令，旋转等参数，不需要调整时可以忽略


% ====选项中的参数=====

[scale=0.3] % 缩放比例
[height=2cm] % 调整高度
[height=0.1\textheight] % 调整高度为 0.1 倍当前文档格式标准高度
[width=2cm] % 调整宽度
[width=0.1\textwidth] % 调整高度为 0.1 倍当前文档格式标准宽度
[angle=45] % 旋转角度
```

## latex 中的表格

```latex
\begin{tabular} {|l||c|c|c|r|}
% 用该命令生成表格，l 指定左对齐，c 指定居中对齐，r 指定右对齐，
有多少字母就有几列;用绝对值符号产生表格竖线，两个绝对值符号产生表格双竖线

% p{<宽度>}能够限定列宽，并且可以自动换行
  \hline %用该命令产生表格横线
  姓名 & 语文 & 数学 & 外语 & 备注 \\ % 不同列之间用&分割，并且用\\结束一行，进入下一行
  \hline\hline % 两个 hline 命令产生双横线
  张三 & 87 & 100 & 93 & 优秀 \\
  \hline 
  李四 & 75 & 64 & 52 & 补考另行通知\\
  \hline
  王二 & 80 & 82 & 78 & \\
  \hline
\end{tabular}
```

预览：
::: center
![](https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/latex_4.png)
:::

## latex 浮动体环境

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

- 插入题注

`\caption{text}`

若在其之后添加标签，可为改图片命名，并在其他语句中进行引用

添加标签语法：`\caption{text}\label{figure1}`

若要引用：`数据结果可见图\ref{figure1}`

代码：

```latex
xxx 可见图\ref{figure1}

\begin{figure}[hbtp]
  \centering
  \includegraphics[scale=0.1]{xxx.png}
  \caption{xxx}\label{figure1}
\end{figure}
```

预览：

::: center
![](https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/latex_5.png)
:::

## latex 数学公式初步

注 1：由于跨平台的问题，部分 latex 语法在 vuepress 中无法使用<span class="mask" title="嘿嘿嘿，被发现了~">对，vuepress 太辣鸡了，下次建博客别用 vuepress</span>

注 2：`\text{}`可用于在数学模式下临时切换成文本模式

### 行内公式

**用一对 dollar 符号进行排版**

`$f(x)=x^2+3x+2$` &emsp;&emsp; $f(x)=x^2+3x+2$

**用一对小括号进行排版**

`\(f(x)=x^2+3x+2\)`&emsp;&emsp;(这在 vuepress 中无法使用)

**用 math 环境输入公式**

```latex
\begin{math}
  f(x)=x^2+3x+2
\end{math}
% 这在 vuepress 中无法使用
```

### 行间公式

行间公式：自动跳转下一行并居中

**用两对 dollar 符号进行排版**

`$$f(x)=x^2+3x+2$$`(这在 vuepress 中无法使用)

**用一对中括号进行排版**

`\[f(x)=x^2+3x+2\]`(这在 vuepress 中无法使用)

**在 displaymath 环境中输入公式**

```latex
\begin{displaymath}
  f(x)=x^2+3x+2
\end{displaymath}

% 这在 vuepress 中也无法使用
```

### 基本排版

|语句/符号 | 作用 | 示例代码 | 示例效果 |
|:---:|:---:|:---:|:---:|
|`□^□`|上标|`$e^x$` `$e^{sinx}$`|$e^x$ $e^{sinx}$|
|`□_□`|下标|`$a_0$` `$a_{20}$`|$a_0$ $a_{20}$|
|`\frac{□}{□}`|分式|`$\frac{3}{4}$`|$\frac{3}{4}$|
|`□_{□}^{□}`|上下标|`$a_2^2$` <br/> `$a_{20}^{20}$`| $a_2^2$ <br/> $a_{20}^{20}$ |

- 常用省略号

|省略号 | 代码 |
|:---:|:---:|
|$\dots$|`$\dots$`|
|$\vdots$|`$\vdots$`|
|$\ddots$|`$\ddots$`|
|…………|`$\hdotsfor{□}$`<br/>（跨列省略号）|


- 希腊字母

:::details
|希腊字母 | 代码 |
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

|语句/符号 | 作用 | 示例代码 | 示例效果 |
|:---:|:---:|:---:|:---:|
|\log|log 函数|`$\log x$`|$\log x$ |
|\ln|ln 函数|`$\ln x$` |$\ln x$|
|\log_□|log 函数搭配下标效果（其余函数同理）|`$\log_2 x$`|$\log_2 x$|
|\sin|sin 函数|`$\sin x$`|$\sin x$|
|\cos|cos 函数|`$\cos x$`|$\cos x$|
|\tan|tan 函数|`$\tan x$`|$\tan x$|
|\arcsin|arcsin 函数|`$\arcsin x$`|$\arcsin x$|
|\arccos|arccos 函数|`$\arccos x$`|$\arccos x$|
|\arctan|arctan 函数|`$\arctan x$`|$\arctan x$|
|\sin^{□}|sin 函数搭配上标效果（其余函数同理）|`$\sin^{-1} x$`|$\sin^{-1} x$|
|sqrt{□}|根号|`$\sqrt{20}$`|$\sqrt{20}$ |
|sqrt[□]{□}|n 次根号|`$\sqrt[4]{49}$`|$\sqrt[4]{49}$|
|°|角度|`$^{\circ}$`|45$^{\circ}$|


### 公式编号

在 equation 环境中实现公式编号

```latex
\begin{equation}
  f(x)=3x^2+2x+3  \label{eq1}
\end{equation}
```

同样，也可使用`\label{□}`进行公式编号，进而通过`ref{□}`实现交叉引用

若不需要公式编号，需要在 equation*中输入公式，使用此环境前需要在导言区引入 amsmath 宏包（语句：`\usepackage{amsmath}`）。

此环境中允许`\label{□}`标签与`ref{□}`的交叉引用，此时的编号为公式所在小节编号

```latex
\begin{equation*}
  f(x)=3x^2+2x+3  \label{eq2}
\end{equation*}
```

### 矩阵排版

引入 amsmath 宏包（语句：`\usepackage{amsmath}`）后，在 matrix 环境下实现矩阵的排版


```latex
\begin{matrix}
  0&1\\
  1&0
\end{matrix}
```
（行与列的语法同[表格](/code/latex.md#latex中的表格)章节）

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
$$%=====不加边线========
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
\end{Vmatrix}$$
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

预览：

$$\left(
    \begin{smallmatrix}
    x&y\\
    y&x
    \end{smallmatrix}
  \right)$$

- array 环境构造更为复杂的矩阵

下面以一个极为复杂的例子进行研究
:::details 代码

```latex
\begin{array}{c@{\hspace{-5pt}}l} % @{<内容>}——添加任意内容，不占据表项计数
% 此处添加一个负值空白，表示向左移动 -5pt 距离

% 1row 1column
\left(
  \begin{array}{ccc|ccc}% 一共 6 列，每列居中对齐，中间用竖线分割
  a & \cdots & a & b & \cdots & b \\
  & \ddots & \vdots & \vdots & \adots \\
  &        & a & b \\
  \hline
  &        &   & c & \cdots & c \\
  &        &   & \vdots & & \vdots \\
  \multicolumn{3}{c| }{\raisebox{2ex}[0pt]{\Huge 0}}
  & c & \cdots & c 
  % multicolumn 合并多列，c 表示居中，且“|”添加竖线分割
  %\raisebox 表示将 0 抬高，且不做左右移动
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

::: center
![](https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/latex_6.jpg)
:::

### 多行公式

需要引入 amsmath，amssymb 宏包
（命令：\usepackage{amsmath}，\usepackage{amssymb}）

整体概述：

|环境名称 | 作用 |
|:---:|:---|
|gather|带编号的多行公式排版（可用\notag 阻止编号）|
|gather*|不带编号的多行公式排版 |
|align|实现带编号的多行公式排版，可用“&”实现公式在指定位置对齐（\notag 也可取消编号）|
|align*|相比于 align，取消编号，其余一致 |
|split|实现一条公式的多行排版，可与 equation 环境搭配使用实现多行公式的单独编号，也可使用"&"使公式在指定位置对齐|、
|cases|分段函数指令，逗号分隔值与条件，且自带大括号|


在 gather 环境中实现**带编号的**多行公式的排版

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
f(x)=x^2+3x+2\\
ab \\
ba
\end{gather}$$

（emmm vuepress 不支持）

在 gather*环境中实现**不带编号的**多行公式的排版

```latex
\begin{gather*}
% 可以使用\\换行
% 不自带编号
f(x)=x^2+3x+2\\
ab \\
ba
\end{gather*}
```

也可以在\\前使用\notag 阻止编号

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

利用 align 环境实现公式在指定位置（&符号）对齐

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

但是若多行公式仅需要一个序号，需要 split 环境与 equation 环境结合使用（align*与 align 环境无法与 equation 共用）

split 环境下，公式对齐与 align 同理

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

使用 case 环境，每行公式中使用&分割为两个部分，通常表示值和后面的条件

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

## latex 新命令的定义

导言区加入`\newcommand`命令以实现新命令的定义

语法：

```latex
\newcommand<命令>[<参数个数>][<首参数默认值>]{<具体定义>}
```

不带参数的 newcommand 命令可以实现字符替换，如：

\newcommand\oyh{dream-oyh}

则下次打出\oyh 时，会自动编译为 dream-oyh

- 带参数的新命令

参数个数最多是 9 个，使用时用#1，#2，#3，……，#9 表示

例如：

新定义：`\newcommand\eat[2]{#1 吃 #2}`

则下次使用时： \eat{dream-oyh}{lxl66566}

编译为：dream-oyh 吃 lxl66566

% 可对首参数值赋予默认值，若后续引用时需要修改，需要用中括号标出

新定义：`\newcommand\eat[3][吃]{#2 #1 #3}`

则下次使用时： \eat[不吃]{dream-oyh}{lxl66566}

编译为：dream-oyh 不吃 lxl66566

## latex 有序列表环境

- 有序列表 enumerate 环境

```latex
\begin{enumerate}
\item lalala
\item blabla
\item lvelvelve
\end{enumerate}
```

- 无序列表 itemize 环境

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

- 描述 decription 环境

```latex
\begin{decription}
\item[lala] lalala
\item[bla] blabla
\item[lve] lvelvelve
\end{decription}
```

描述环境中，方括号内的字体会加粗并且充当序号
