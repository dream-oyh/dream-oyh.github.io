# 概率论与数理统计

样本跟样本空间在某个维度发生的一种关系即为概率。

## 一维随机变量及概率分布内容思维导图

<div style="text-align: center; ">
<img alt="2.4思维导图" src="https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/probability_1.jpg"  width="100%" height="100%"/>
</div>

## 二维随机变量及其分布概念辨析

<div style="text-align: center; ">
<img alt="二维随机变量及其分布概念辨析" src="https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/probability_2.jpg"  width="100%" height="100%"/>
</div>

<div style="text-align: center; ">
<img alt="二维随机变量及其分布概念辨析" src="https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/probability_3.jpg"  width="100%" height="100%"/>
</div>

## 二维随机变量的条件分布

<div style="text-align: center; ">
<img alt="二维随机变量的条件分布" src="https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/probability_4.jpg"  width="100%" height="100%"/>
</div>

<div style="text-align: center; ">
<img alt="二维随机变量的条件分布" src="https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/probability_5.jpg"  width="100%" height="100%"/>
</div>

## 题型：若X是***连续型***随机变量，已知X的分布函数，如何求Y=g（X）的分布函数？

### 法一：分布函数法

<div style="text-align: center; ">
<img alt="分布函数法" src="https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/probability_6.jpg"  width="100%" height="100%"/>
</div>

### 法二：公式法

<div style="text-align: center; ">
<img alt="公式法" src="https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/probability_7.jpg"  width="100%" height="100%"/>
</div>

## 【难点】两个随机变量函数的分布

<div style="text-align: center; ">
<img alt="两个随机变量函数的分布" src="https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/probability_8.jpg"  width="100%" height="100%"/>
</div>

<div style="text-align: center; ">
<img alt="两个随机变量函数的分布" src="https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/probability_9.jpg"  width="100%" height="100%"/>
</div>

## 【总结】常见分布的期望与方差

<div style="text-align: center; ">
<img alt="常见分布的期望与方差" src="https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/probability_10.jpg"  width="100%" height="100%"/>
</div>

## 【难点】大数定律总结

### 切比雪夫不等式

**定理**：$X$为随机变量，若$EX,DX$存在，则对于$\forall \varepsilon >0$,

$$P\{|X-E(X)|\ge \varepsilon\}\le \frac{D(X)}{\varepsilon^2}$$
或
$$P\{|X-E(X)|< \varepsilon\}\ge 1-\frac{D(X)}{\varepsilon^2}$$

**证明**：设$X$是连续型随机变量，左边=
$$\int_{|X-E(X)|\ge \varepsilon}f(x)dx\le \int_{|X-E(X)|\ge \varepsilon}\frac{(X-E(X))^2}{\varepsilon ^2}f(x)dx$$

$\because \frac{(X-E(X))^2}{\varepsilon ^2}f(x)>0$，故：

$$\int_{|X-E(X)|\ge \varepsilon}\frac{(X-E(X))^2}{\varepsilon ^2}f(x)dx\le \int_{-\infty}^{\infty}\frac{(X-E(X))^2}{\varepsilon ^2}f(x)dx$$

$$=\frac{1}{\varepsilon^2}\int_{-\infty}^{\infty}(|X-E(X)|)^2 f(x)dx=\frac{E(|X-E(X)|)^2}{\varepsilon ^2}=\frac{D(X)}{\varepsilon ^2}$$

综上所述：
$$P\{|X-E(X)|\ge \varepsilon\}\le \frac{D(X)}{\varepsilon^2}$$
得证！

### 依概率收敛定义引入

回顾收敛定义：$a_n\to a$

$$\forall \varepsilon >0, \exists N>0, 使得n>N时，|a_n-a|<\varepsilon$$

依概率收敛：$a_n \overset{P}{\rightarrow} a$
$$\forall \varepsilon >0, \exists N>0, 使得n>N时，P\{|a_n-a|<\varepsilon\}=1$$
(理解：概率无限逼近但不等于1，不代表一定满足$|a_n-a|<\varepsilon$，可能偶尔有一两个点存在特殊情况)

如：频率$\overset{P}{\rightarrow}$概率，代表无数次实验后，频率依概率收敛于其概率，但是总有这么一两次实验，频率和概率差的很远（即：实验偶然性）

### 伯努利大数定律

**定理**：对于$n$重伯努利试验，$A$发生了$m_n$次，则频率为$\frac{m_n}{n}$，设概率为$p$，对$\forall \varepsilon >0$，则有：
$$\lim_{n \to \infty} P\{|\frac{m_n}{n}-p|<\varepsilon\}=1$$

**证明**：设$m_n\sim B(n,p)$，则$E(X)=np,D(X)=np(1-p)$，故，$E(\frac{m_n}{n})=p,D(\frac{m_n}{n})=\frac{p(1-p)}{n}$，由**切比雪夫不等式**，
$$1\ge P\{|\frac{m_n}{n}-E(\frac{m_n}{n})|< \varepsilon\}\ge 1-\frac{D(X)}{\varepsilon^2}$$
将$E(\frac{m_n}{n})=p,D(\frac{m_n}{n})=\frac{p(1-p)}{n}$代入可得：
$$1\ge P\{|\frac{m_n}{n}-p|< \varepsilon\}\ge 1-\frac{p(1-p)}{n\varepsilon^2}$$
当$n\to \infty$时，
$$\lim_{n \to \infty} 1=1,\lim_{n \to \infty}1-\frac{p(1-p)}{n\varepsilon^2}=1$$

故由夹逼定理，

$$\lim_{n \to \infty} P\{|\frac{m_n}{n}-p|<\varepsilon\}=1$$

### 切比雪夫大数定律

**定理**：若$X_1,X_2,X_3,\cdots ,X_n$是**两两不相关**的变量（没说同分布，也没说独立），若$E(X_i)，D(X_i)$均存在且方差有界（$D(X_i)\le M$）,则对于$\forall \varepsilon >0$，

$$\lim_{n \to \infty}P\{|\frac{1}{n}\sum_{i=1}^{n}X_i-\frac{1}{n}\sum_{i=1}^{n}E(X_i)|<\varepsilon\}=1$$

即：无数次实验后，变量的均值会依概率收敛于期望的均值

**证明**：
$$E(\frac{1}{n}\sum_{i=1}^{n}X_i)=\frac{1}{n}\sum_{i=1}^{n}E(X_i)$$

由于$X_1,X_2,X_3,\cdots ,X_n$是**两两不相关**的变量，故：

$$D(\frac{1}{n}\sum_{i=1}^{n}X_i)=\frac{1}{n^2}\sum_{i=1}^{n}D(X_i)$$

由**切比雪夫不等式**：

$$1\ge P\{|\frac{1}{n}\sum_{i=1}^{n}X_i-\frac{1}{n}\sum_{i=1}^{n}E(X_i)|<\varepsilon\}\ge 1-\frac{1}{n^2\varepsilon^2}\sum_{i=1}^{n}D(X_i)$$

而当$n \to \infty$时，

$$\lim_{n \to \infty} 1=1,\lim_{n \to \infty}1-\frac{1}{n^2\varepsilon^2}\sum_{i=1}^{n}D(X_i)=1$$

故由夹逼定理：

$$\lim_{n \to \infty}P\{|\frac{1}{n}\sum_{i=1}^{n}X_i-\frac{1}{n}\sum_{i=1}^{n}E(X_i)|<\varepsilon\}=1$$

- 推论：

若$X_1,X_2,X_3,\cdots ,X_n$相互独立且同分布，$E(X_i)=\mu ,D(X_i)=\sigma^2$,则对于$\forall \varepsilon >0$,

$$\lim_{n \to \infty}P\{|\frac{1}{n}\sum_{i=1}^{n}X_i-\mu|<\varepsilon\}=1$$

### 辛钦大数定律

若$X_1,X_2,X_3,\cdots ,X_n$相互独立且同分布，$E(X_i)=\mu$ ,**方差无要求**,则对于$\forall \varepsilon >0$,

$$\lim_{n \to \infty}P\{|\frac{1}{n}\sum_{i=1}^{n}X_i-\mu|<\varepsilon\}=1$$

## 相关系数$|\rho_{XY}|\le 1$的证明

**证明如下：**

构造

$$
\begin{align}
e(a,b)&=E\{[Y-(a+bx)]^2\}\\
\\
&=E(Y^2)+b^2E(X^2)+a^2-2bE(XY)+2abE(X)-2aE(Y)
\end{align}$$

$e$可看作$a,b$的函数，故由多元函数求极值的方法，可得：
$$
\begin{cases}
\frac{\partial e}{\partial a}=2a+2bE(X)-2E(Y)=0\\
\\
\frac{\partial e}{\partial b}=2bE(X^2)-2E(XY)+2aE(X)=0
\end{cases}
$$

解得：
$$
\begin{gather}
b_0=\frac{Cov(X,Y)}{D(X)}\\
\\
a_0=E(X)\left[1-\frac{Cov(X,Y)}{D(X)}\right]
\end{gather}
$$

且由第一式可得：

$$E(Y-bx-a)=0$$

故：

$$
\begin{align}
e(a_0,b_0)&=E\{[Y-(a_0+b_0x)]^2\}\\
\\
&=D[Y-(a_0+b_0x)]+E^2[Y-(a_0+b_0x)]\\
\\
由E(Y-bx-a)=0，得到：\\
\\
e(a_0,b_0)&=D[Y-(a_0+b_0x)]\\
\\
&=D(Y)-b_0^2D(X)+2b_0Cov(X,Y)\\
\\
&=D(Y)-\frac{Cov^2(X,Y)}{D(X)}+2\frac{Cov^2(X,Y)}{D(X)}\\
\\
&=D(Y)-\frac{Cov^2(X,Y)}{D(X)}\\
\\
&=D(Y)\left[1-\frac{Cov^2(X,Y)}{D(X)D(Y)}\right]\\
\\
&=D(Y)(1-\rho_{XY}^2)
\end{align}
$$

而由于$[Y-(a_0+b_0x)]^2\ge 0$，故$e(a_0,b_0)\ge 0$，故$1-\rho_{XY}^2\ge 0$，即：

$$\rho_{XY}^2\le 1$$


