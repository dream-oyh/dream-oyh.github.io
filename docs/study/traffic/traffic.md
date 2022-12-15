# 交通信控专利阅读

## 交通诊断指标计算汇总表

文件下载链接：[交通诊断指标计算汇总表.xlsx](https://raw.githubusercontent.com/dream-oyh/dream-oyh.github.io/pdf/adaptive_control/Summary%20table%20of%20traffic%20diagnostic%20indicators.xlsx)

## 自适应控制策略背景技术

（参考自[专利-一种基于实时车辆轨迹的交叉口自适应信控方法-同济大学-唐克双](https://dream-oyh.github.io/study/traffic/traffic.html#专利-一种基于实时车辆轨迹的交叉口自适应信控方法-同济大学-唐克双)）



**常用的自适应控制系统**

<div style="text-align: center; ">
<img alt="自适应控制系统分类" src="https://raw.githubusercontent.com/dream-oyh/dream-oyh.github.io/images/traffic_1.png"  width="100%" height="100%"/>
</div>

<div style="text-align: center; ">
<img alt="国外自适应控制系统" src="https://raw.githubusercontent.com/dream-oyh/dream-oyh.github.io/images/traffic_2.png"  width="80%" height="80%"/>
</div>

::: danger 目前单点自适应控制存在以下问题
**1. 信息的可靠性有待提高**

通过线圈检测进行数据采集，受布设位置的限制，检测器只能采集定点车辆信息，<span class="highlight">采集到的信息不够全面</span>，同时还要考虑检测误差

**2. 对相位结构的研究不够**

<span class="highlight">很少对相位结构进行优化</span>，而是假设相位结构固定的条件下进行控制。对于不冲突的车流，采用同启同断的方式，视为同一个相位处理，即：单环控制的形式。而实际问题中，对于直左分离的交叉口，常常要求进行相位搭接，即双环结构。

**3. 检测数据没有被充分应用**

早期自适应控制受线圈检测器检测能力的影响，仅以流量数据来计算控制方案，而近年来基于新型检测手段的控制，虽然能检测到充足的信息，但是由于简化模型加快运算速度，大多只采用<span class="highlight">**集计**</span>的数据进行模型计算。

*注：<span class="highlight">“集计”</span>的含义为：*

*非集计模型是强调其与
<span class="highlight">集计模型（AggregateModel）</span>的不同而命名的。*

*非集计模型的基本假设是当出行者面临选择时，他对某种选择的偏好可以用被选择对象的<u>“吸引度”或“效用值”</u>来描述，效用是被选择对象的属性和决策者的特征的函数。<span class="highlight">非集计模型在交通领域的交通方式划分和交通分配阶段有着十分广泛的应用。</span>*

***非集计模型的应用***

----

*1. 交通需求预测的集计模型通常是将每个人的交通活动按交通小区进行统计处理、分析，从而得到以交通小区为单位的分析模型。*

*2. 需求预测的非集计模型则以实际产生交通活动的个人为单位，调查得到的数据不按交通小区进行统计等处理而直接用于建立模型。*

*3. 与集计分析相比较，非集计分析在<span class="highlight">分析的单位、模型预测方法、应用层面、政策体现、数据的效率和说明变量</span>等方面有着明显的差异。*

**4. 参数设置依赖交通工程师的经验**

涉及到的参数，大多需要根据实际路口的调查情况，由交通工程师预先来确定，一方面降低了策略对实时交通状况反应的灵敏程度，另一方面增加了实际应用中的工作量。

:::
## 面向智能网联的城市交通信号主动管控系统

系统流程图：

<div style="text-align: center; ">
<img alt="系统流程图" src="https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/pdf/adaptive_control/Intelligent network-oriented urban traffic control system.png"  width="100%" height="100%"/>
</div>

## 基于深度强化学习的多模式交通自适应信号控制优化方法研究_王雷震

论文下载链接：[基于深度强化学习的多模式交通自适应信号控制优化方法研究_王雷震.caj](https://raw.githubusercontent.com/dream-oyh/dream-oyh.github.io/pdf/adaptive_control/optimization%20method%20of%20multi-mode%20AC%20adaptive%20control.caj)

## 专利-一种面向交通流向的区域协调控制方法-程添亮

专利文件下载链接：[专利-一种面向交通流向的区域协调控制方法-程添亮](https://raw.githubusercontent.com/dream-oyh/dream-oyh.github.io/pdf/adaptive_control/A%20Regional%20Coordinated%20Control%20Method%20Oriented%20to%20Traffic%20Flow.pdf)

## 专利-一种交通自适应控制方法和装置-董振江、王景成

专利文件下载链接：[专利-一种交通自适应控制方法和装置-董振江、王景成](https://raw.githubusercontent.com/dream-oyh/dream-oyh.github.io/pdf/adaptive_control/A%20Traffic%20Adaptive%20Control%20Method%20and%20Device.pdf)

**摘要：**

一种交通自适应控制方法和装置，该方法包括：采集与当前路口绿波方向第一直行相位的交通状况对应的第一类交通状况参数（11）；采集与上游路口绿波方向所述第一直行相位的交通状况对应的第二类交通状况参数（12）；根据所述第一类交通状况参数和所述第二类交通状况参数，确定当前路口所述第一直行相位的第一绿灯开启时刻（13）；根据所述第一类交通状况参数和所述第二类交通状况参数，确定当前路口所述第一直行相位对应的第一绿灯时长（14）；在所述第一绿灯开启时刻开启当前路口所述第一直行相位的绿灯，且控制绿灯时长为所述第一绿灯时长（15）。该方法调节信号灯的绿灯开启时刻、时长，使得尽量多的车辆能够不停车的通过绿波带的多个信号灯路口。

该专利已研读完毕，下面是对于该专利的总结：

- 该专利通过两个模块采集目标交通路口与上游交通路口的相应交通参数，计算二者之间相位差，并且通过建立绿灯时长模糊控制逻辑，相位差模糊控制逻辑与相序优化控制器交互式工作，可计算出目标交通路口该相位的绿灯开启时刻，确定绿灯开启时长，同时通过相序优化控制器确定目标路口的相位顺序；

- 该专利将一个有n个路口的道路系统划分为n-1个子系统，即将每两个连续路口作为一个子系统进行研究，这样有效地降低了路口间需要传输的数据量，提高信号机运算速度。

::: tip 一个初步且粗糙的想法
对于最小配时周期法，依据该专利提出一个设想。最小配时周期法能很好地解决一个路口内在某个时段内的的相序布置，有效地降低路口空放率，提高道路通行能力；但最小配时周期法并没有很好地考虑到绿波的影响因素，能否对卡口电警拿到的数据进行OD分析，分辨出某相位内，本路口的车流与上游路口驶来的车流，并假设一个合理的绿波速度，使得这个周期内能保证既清空了当前相位的车流，也形成了两个路口的绿波带。一个初步的想法，暂且做个记录，待读完更多专利后再回来思考这个想法的可行性。
:::

## 专利-一种基于实时车辆轨迹的交叉口自适应信控方法-同济大学-唐克双

专利文件下载链接：[专利-一种基于实时车辆轨迹的交叉口自适应信控方法-同济大学-唐克双](https://raw.githubusercontent.com/dream-oyh/dream-oyh.github.io/pdf/adaptive_control/real-time%20vehicle%20trajectories.pdf)

**摘要：**

本发明涉及一种基于实时车辆轨迹的交叉口自适应信号控制方法，包括以下步骤：1）通过全息测量系统获得交叉口的实时车辆信息；2）根据获得交叉口的实时车辆信息，基于<span class="highlight">NEMA双环相位结构</span>，按照设定的时间间隔对交叉口信号控制策略进行全局优化；3）在所述设定时间间隔内，进行交叉口控制策略进行局部优化；4）重复步骤1）-步骤3），进行交叉口信号的实时控制。与现有技术相比，本发明具有实时性高、降低延误效果好、方法先进的优点。

::: tip NEMA双环相位结构
可参考[NEMA结构介绍及synchro软件配时](http://flypig.cc/2017/06/13/nema/)这篇文章，其中非常详细地解释了何为NEMA双环结构与barrier的概念。

**双环相位结构简介**

-----

面向典型的十字形信号控制交叉口,建立具有<span class="highlight">8个机动车相位和4个行人相位</span>的双环相位结构,采用一种半环分析方法,讨论了可能存在的相位组合方案和相位切换方案,定义了起始相位和末尾相位两种机动车相位属性,分析了相位切换过程的基本规律。相较于一般的三相位结构，NEMA双环相位显得更加灵活可控。
:::

## 杂谈

用以记录一些琐碎的发现

### 2022.12.13

[Lovely Life ZZZ](http://flypig.cc/)，偶然发现的博客，其中有几篇与交通信控有关的文章，深入浅出，适合学习，必要时会引用其中文章来充实本博客内容。