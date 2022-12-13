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

本发明涉及一种基于实时车辆轨迹的交叉口自适应信号控制方法，包括以下步骤：1）通过全息测量系统获得交叉口的实时车辆信息；2）根据获得交叉口的实时车辆信息，基于$NEMA$双环相位结构，按照设定的时间间隔对交叉口信号控制策略进行全局优化；3）在所述设定时间间隔内，进行交叉口控制策略进行局部优化；4）重复步骤1）-步骤3），进行交叉口信号的实时控制。与现有技术相比，本发明具有实时性高、降低延误效果好、方法先进的优点。

