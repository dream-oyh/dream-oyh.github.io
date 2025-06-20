---
date: 2025-06-19
---

# CAN 通信协议编写

## 一些名词解释

- 复旦微开发板型号为 FM33FG0614A AutoEVB UM，**而不是** FM33FG0614A **Rev.A** AutoEVB UM，也就是我们用的是 B 型板而非 A 型板，后面参考原理图和程序例程，也都要注意是 B 型的板子
- MCU：微型控制单元
- SWD：Serial Wire Debug 串行接口，另外一种测试叫作 JTAG 接口，主要用于芯片内部测试，测试芯片制造出来之后引脚的连通信

## 复旦微开发板外设

- 把开发板上的 JP5 跳线帽断开后，可以接入万用表测量 MCU 功耗
- SWD Debug connector 配置：需要连接五根线 VDD，GND，SWCLK，SWIO，RESET

|  USB  | FMFG0614A |
| :---: | :-------: |
|  5V   |    VDD    |
|  GND  |    GND    |
| SWCLK |   SWCLK   |
| SWDIO |   SWIO    |
|  RST  |   nRST    |

## 环境配置

Keil 或者 IAR 本身是不带有 FM33FG0xA 系列的板子的，需要手动下载配置文件，但是在复旦微官网找了好久一直没找到 FG 系列，最后在论坛里找到了相关文件，这个论坛链接贴在这里。[src](https://www.fmdevelopers.com.cn/forum.php?mod=viewthread&tid=16713&page=1)

### IAR 手动添加新 device 方法

1. 在上述链接中下载`IAR开发环境配置文件(LG、LE、FT、FG、HT、LV、LF).zip`，解压，里面有四个文件夹`debugger`, `devices`, `flashloader`, `linker`,里面都各有一个`FMSH`文件夹，将这四个文件夹内的`FMSH`，都放入 IAR 安装目录下的`arm/config`目录的对应文件夹下
2. 打开任意`.eww`IAR 工程文件即可发现设备可以正确被识别。

### IAR 打开项目后的文件结构

其中`Application/User`中存放的是`Src`文件夹的文件

### 报错

- 许可证破解版本问题，在破解之后，license 图标显示为红色，并且提示报错：

```
The generation feature is not of version 18.
```

说明其许可证版本不对，解决方法（[ref](https://blog.csdn.net/qq_35697978/article/details/137425884)）是需要用到`licpatcher64a.exe`，关闭正在运行的 IAR 进程，将该`.exe`程序复制进以下三个路径中：

- `C:\Program Files\IAR Systems\Embedded Workbench 9.0\arm\bin\`
- `C:\Program Files\IAR Systems\Embedded Workbench 9.0\arm\bin\jet\bin\`
- `C:\Program Files\IAR Systems\Embedded Workbench 9.0\common\bin\`
  并且在三个路径下分别运行该程序，之后再次打开 IAR 编辑器即可正常使用。

> `licpatcher64a.exe` 下载链接见[src](https://pan.baidu.com/s/1xxMLTe8yLSmjIrzDc4-DAQ?pwd=led0)，里面有一个`IARZhu-册-机你懂得.zip`的压缩文件，里面有我们需要的`.exe`程序。

## 焊接相关学习

1. 排针焊接

没啥技巧，硬焊

2. 热缩管使用

线的焊接不好弄，需要留出较多的铜线，然后先在铜线上挂上锡，再用电烙铁把两根铜线对接着焊起来，这步对接千万别手抖啊，最麻烦的一步。热缩管的话先套上去，然后用热风枪怼着吹就会缩小了，注意的是尺寸选择，别选太大了的，太大了裹不住
