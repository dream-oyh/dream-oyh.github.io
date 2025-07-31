---
date: 2025-04-09
icon: keyboard
category: 工具
---

# 装机

装机小白也要开始学习台式机的 diy 了，但是具体的装机还得到了浙大再搞，否则到时候搬箱倒柜的真是个麻烦事。

这两天在学习装机基础，我是完全不懂的新手小白，所以下面内容会很基础。

## 装机九大部件

|项目|主流厂家|型号区分|相关链接|常见参数|备注|
| :----: | :------: | :-------: | :----------: | :----------: | :---------: |
|显卡| <Badge type="tip" text="NVIDIA" /> <Badge type="danger" text="AMD" /> | <Badge type="tip" text="NVIDIA" />RTX 30 系，40 系 <br> <Badge type="danger" text="AMD" /> RX 6000 系，5000 系  | [显卡天梯图](https://www.mydrivers.com/zhuanti/tianti/gpu/) | 频率、显存、功耗（注意功耗要和电源匹配） | |
|CPU| <Badge type="info" text="intel" /> <Badge type="danger" text="AMD" /> |<Badge type="info" text="intel" /> 10 代，**11 代（不增反降）** <br> <Badge type="danger" text="AMD" />ZEN2，**ZEN3（推荐）**  |[CPU 天梯图](https://www.mydrivers.com/zhuanti/tianti/cpu/)  |     核心数、线程、IPC（效率）、频率      |   |
|主板|分类：ATX 板型（大板）、MATX 板型（中板）、ITX 板型（小板）| <Badge type="info" text="intel" /> 400 系，500 系芯片组 <br> <Badge type="danger" text="AMD" />400 系，500 系芯片组|-|芯片组型号|芯片组决定主板档次|
|内存条|-|-|-|容量、频率（>2666H 要开启主板 XMP）|能双不单，能二不四|
| 固态硬盘 |-| <Badge type="tip" text="接口" /> M.2 接口，走 NVME 协议，包括 PCIE3.0,4.0，一般 3.0 就够；<br><Badge type="tip" text="颗粒" />选 TLC 颗粒 |接口、协议、颗粒 | 机械硬盘就不单拎出来细说了，没啥可以写的 |
| **电源** |海韵、振华、全汉、华硕、银欣等|-| [FCPPOWERUP 极电魔方电源匹配图](https://www.fcpowerup.com/5090-psu/) | 瓦数！要和 CPU 和显卡匹配|瓦数要仔细挑选，电源一炸整台机报废  |
|散热器|   | 水冷、风冷 |  | | 挑选参考[德柱视频](https://www.bilibili.com/video/BV1k64y1h7QP)的建议 |
|机箱|-| - | -| -| 注意主板兼容性、显卡兼容性、散热器兼容性、硬盘位数量、机箱散热  |
|散热风扇|-| 大 4D、小 3pin、**小 4pin 接口风扇（推荐）**| - | - | - |

## 我的配置

预算：9000

要求性能：
- OS：Ubuntu 20.04/22.04, Windows 10/11
- CPU: Intel Core i7 (7th Generation) or AMD Ryzen 5
- Cores: 4
- RAM: 32GB
- Storage: 2TB SSD
- GPU: RTX 3080 TI
- VRAM: 12GB

我的配置：
- [x] CPU：AMD R9 5950X，16核心32线程，3.4核频，热设计功耗105W （朋友二手）
- [x] GPU：华硕TUF RTX 4070 TI S，16G显存，整卡功耗220W，显卡长度317mm（京东二手）
- [x] 主板：华硕X570-plus ATX，AMD X570芯片组（朋友二手）
- [x] 内存：2*16GB，玖合星舞ddr4 **342r** （咸鱼二手）
- [x] 固态硬盘：目前已有致态1TB的盘，估计再加一个致态Ti600，**439r**
- [x] 电源：利民TG系列 全模组ATX电源850W，**399r** [link](https://detail.tmall.com/item.htm?abbucket=7&id=929517066734)
- [x] 散热器：瓦尔基里A240 VK水冷， **289r**
- [x] 机箱+机箱风扇：金河田预见FM01 atx机箱，散热器限高158mm，240水冷，显卡长兼容335mm，ATX电源兼容+8风扇，**229r**
