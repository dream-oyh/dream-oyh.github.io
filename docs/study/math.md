# 数学建模

## 数学建模思维导图

<iframe :src="$withBase('/markmap/math.html')" width="100%" height="800" frameborder="0" scrolling="Yes" leftmargin="0" topmargin="0">
</iframe>

:::tip 思维导图使用方法

节点支持收纳与展开

鼠标中键滚动放大缩小

鼠标左键拖动可移动导图
:::

## 相关性分析

- 总体皮尔逊$Pearson$相关系数

对两组总体数据：$X:{X_1,X_2,X_3,\cdots,X_n}$与$Y:{Y_1,Y_2,Y_3,\cdots,Y_n}$

根据《概率论与数理统计》有关知识，总体均值：
$$E(X)=\frac{\sum_{i=1}^{n} X_i}{n}$$

$$E(Y)=\frac{\sum_{i=1}^{n} Y_i}{n}$$

总体协方差：
$$
\begin{align*}
Cov(X,Y)&=\frac{\sum_{i=1}^{n} (X_i-E(X))(Y_i-E(Y))}{n}\\
\\
&=E[(X-E(X))(Y-E(Y))]
\end{align*}
$$

但协方差受两变量的量纲影响，不便于作比较，故需要对其进行标准化，可得总体$Pearson$相关系数：
$$\rho _{XY}=\frac{Cov(X,Y)}{\sigma_X \sigma_Y}=\frac{\sum_{i=1}^{n}\frac{X_i-E(X)}{\sigma_X}\frac{Y_i-E(Y)}{\sigma_Y}}{n}$$

:::tip 为什么这么进行标准化？
1. 从量纲上考虑，$X_i-E(X)$的量纲为$X$的单位$[X]$，$Y_i-E(Y)$的量纲为$Y$的单位$[Y]$，则分子$[X_i-E(X)][Y_i-E(Y)]$的单位为$[X][Y]$。分母$\sigma_X \sigma_Y$的单位也为$[X][Y]$，故起到消除量纲的作用。


2. 可类比正态分布：若$X\sim {}N(\mu,\sigma)$，则
$$\frac{X-\mu}{\sigma}\sim N(0,1)$$
同理，$\frac{X_i-E(X)}{\sigma_X}\frac{Y_i-E(Y)}{\sigma_Y}$可起到标准化作用
:::

而其中，
$$\sigma_X=\sqrt{\frac{\sum_{i=1}^{n}(X_i-E(X))^2}{n}}$$

$$\sigma_Y=\sqrt{\frac{\sum_{i=1}^{n}(Y_i-E(Y))^2}{n}}$$

难证但可以证明：$|\rho_{XY}|\le 1$,（证明过程可以不用管，挺复杂）

且当$Y=aX+b$（即：为线性关系）时，
$$\rho _{XY}=\begin{cases}1,&a>0\\-1,&a<0\end{cases}$$

- 样本皮尔逊$Pearson$相关系数

对两组样本数据：$X:{X_1,X_2,X_3,\cdots,X_n}$与$Y:{Y_1,Y_2,Y_3,\cdots,Y_n}$

根据《概率论与数理统计》有关知识，样本均值：
$$E(X)=\frac{\sum_{i=1}^{n} X_i}{n}$$

$$E(Y)=\frac{\sum_{i=1}^{n} Y_i}{n}$$

样本协方差：
$$
\begin{align*}
Cov(X,Y)&=\frac{\sum_{i=1}^{n} (X_i-E(X))(Y_i-E(Y))}{\textbf{n-1}}
\end{align*}
$$

样本$Pearson$相关系数：
$$r_{XY}=\frac{Cov(X,Y)}{S_X S_Y}=\frac{\sum_{i=1}^{n}\frac{X_i-E(X)}{S_X}\frac{Y_i-E(Y)}{S_Y}}{\textbf{n-1}}$$

其中，
$$S_X=\sqrt{\frac{\sum_{i=1}^{n}(X_i-E(X))^2}{\textbf{n-1}}}$$

$$S_Y=\sqrt{\frac{\sum_{i=1}^{n}(Y_i-E(Y))^2}{\textbf{n-1}}}$$

又：$|r_{XY}|\le 1$,

当$Y=aX+b$时，
$$r_{XY}=\begin{cases}1,&a>0\\-1,&a<0\end{cases}$$

:::tip
样本皮尔逊相关系数与总体皮尔逊相关系数的差别在于相关系数，协方差，方差的分母，总体为$n$，样本为$n-1$。(上文中已标粗显示，具体推导复杂，此处不做记录)
:::

- $Pearson$相关系数的误区

<div style="text-align: center; ">
<img alt="math_1" src="https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/math_1.jpg" width="500" />
</div>

以上四图，相关系数均为0.816，本应该呈严格线性相关，但却产生不同情况。

`图一`——姑且存在一定线性相关关系

`图二`——二次关系也可能使得相关系数很大

`图三`——离群点对相关系数影响大

`图四`——如果两个编量的相关系数很大也不能说明两者相关，可能存在异常值影响，若无异常点，则$\rho_{XY}=0$，则$X,Y$无关。

<div style="text-align: center; ">
<img alt="math_2" src="https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/math_2.jpg" width="500" />
</div>

以上情况，表明相关系数为0时，只能说不是线性相关，但可能存在更为复杂的相关关系

:::danger 注意
在计算$Pearson$相关系数之前，需要画出散点图，以确定两个变量之间符合线性相关，这样，$Pearson$相关系数才有意义
:::

- 相关系数结论

1. <text style="color:red;">如果两个变量本身就是线性关系，</text>那么$Pearson$相关系数绝对值大的就是相关性强，小的就是相关性弱

2. 在不确定两个变量是什么关系的情况下，即使算出$Pearson$相关系数，发现很大，也不能说明那两个变量线性相关，甚至不能说他们相关，必须先画出散点图！

- 描述性统计

在拿到一系列数据进行相关性分析之前，需要对数据进行描述性统计，此时，需要借用matlab代码，可见[matlab-描述性统计](/study/code/matlab.html#matlab中基本统计量函数——描述性统计)

- 假设检验

作用：分析**显著性水平**

相关概念：
|概念名称|含义|
|:---:|:---|
|原假设|人为假设出的结论，或者说需要证明，然后去相信的结论|
|备择假设|不相信的假设，与原假设相反|
|显著性水平$\alpha$|我们有多大可能不相信原假设|
|置信水平$\beta$|我们有多大可能相信原假设|

例：小明称体重94斤，但之前都是90斤，进行假设检验，以说明小明是否长胖（即：94~90的变化是否显著）

①确定原假设$H_0$与备择假设$H_1$

$H_0$与$H_1$为恰好相反的两面

我们要检验：这个月体重是否仍为90斤（或者说和90斤体重是否有显著差异，设体重为W），则：

$$\begin{split}
H_0&:W=90\\
H_1&:W\ne 90\\
即：H_1&:\begin{cases}
W>90\\
W<90
\end{cases}
\end{split}$$

注：这种检验称之为双侧检验

②在$H_0$成立的条件下，根据我们要检验的量构造一个分布（数模中可以查阅文献得到待检验量的准确分布）

$$
\begin{cases}
标准正态分布\\
t分布\\
F分布\\
X^2分布\\
\end{cases}
$$

例：在$H_0:W=90$成立的条件下，设：$W\sim N(90,4)$,标准化后得：$\frac{W-90}{2}\sim N(0,1)$，设$Z=\frac{W-90}{2}$

③画出概率密度函数

<div style="text-align: center; ">
<img alt="概率密度函数" src="https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/math_3.jpg" width="500" />
</div>

④给出置信水平

例：设我们有95%的可能，相信原假设成立，即：$\alpha =5\%,\beta=95\%$

则需要根据置信可能计算出接受域，拒绝域，可得下图：

<div style="text-align: center; ">
<img alt="概率密度函数" src="https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/math_4.jpg" width="500" />
</div>

:::tip 1.96如何计算得到
通过查找正态分布表可得：
对于$X\sim N(0,1)$，$f(x)=\frac{1}{\sqrt{2\pi}}e^{-\frac{x^2}{2}}$，而若置信水平为95%，则：
$$\int_{-1.96}^{1.96}\frac{1}{\sqrt{2\pi}}e^{-\frac{x^2}{2}}dx=0.950004$$
即：$[-1.96,1.96]$区间内，概率密度函数所围面积为95%
:::

故：$H_0$成立条件下：
$$P(-1.96\le z\le 1.96)=0.95$$

而真实情况下：
$$z^*=\frac{94-90}{2}=2>1.96$$

所以2落在了0.05的小概率内，小概率事件发生，假设$H_0$不成立。

**进一步理解“置信水平”：**

若此时$\beta=99\%$，通过计算可得，在$[-2.58,2.58]$区间内，概率密度函数所谓面积为$99\%$，即：当真实情况下的$z^*$ 满足 $-2.58\le z^*\le 2.58$时，认为原假设成立。由于2<2.58，此时原假设成立。

所以置信水平越大，假设越容易成立。假设置信水平高达100%，则接受域铺满整个概率密度函数，原假设必定成立。

**若为单侧检验？**

假设单侧检验的原假设与备择假设分别是：

$$\begin{cases}
H_0:W=90\\
H_1:W<90
\end{cases}$$
则此时的积分应为：

$$\int_{-\infty }^{2.33}\frac{1}{\sqrt{2\pi}}e^{-\frac{x^2}{2}}dx=0.99$$

接受域如下图：

<div style="text-align: center; ">
<img alt="math_5" src="https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/math_5.jpg" width="500" />
</div>

当真实情况下$z^*\le 2.33$时，我们有99%的可能相信原假设成立。
