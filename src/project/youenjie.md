---
date: 2025-06-19
---

# CAN 通信协议编写

## 一些名词解释

- 复旦微开发板型号为 FM33FG0614A AutoEVB UM，**而不是** FM33FG0614A **Rev.A** AutoEVB UM，我们用的是 B 型板而非 A 型板，后面参考原理图和程序例程，也都要注意是 B 型的板子

| 英文缩写 |          全拼           |                                             含义                                             |
| :------: | :---------------------: | :------------------------------------------------------------------------------------------: |
|   MCU    |   Micro Control Unit    |                                         微型控制单元                                         |
|   SWD    |    Serial Wire Debug    | 串行接口，另外一种测试叫作 JTAG 接口，主要用于芯片内部测试，测试芯片制造出来之后引脚的连通信 |
|   SVD    | Supply Voltage Detector |                                        电源电压检测器                                        |

## FM33FG0xA 外设相关

- 这款芯片内核是 ARM Cortex-M0，打算先学 stm32 看看这个内核是怎么工作的，再来研究这块板子。供电范围为 1.8~5.5V.
- `PADFS`，是`Port A Digital Function Select`的缩写，意思是 A 端口数字功能选择，下设四个数 00, 01, 10, 11, 用于指定引脚的复用功能，是`功能选择开关`
- 把开发板上的 JP5 跳线帽断开后，可以接入万用表测量 MCU 功耗
- SWD Debug connector 配置：需要连接五根线 VDD，GND，SWCLK，SWIO，RESET

|  USB  | FMFG0614A |
| :---: | :-------: |
|  5V   |    VDD    |
|  GND  |    GND    |
| SWCLK |   SWCLK   |
| SWDIO |   SWIO    |
|  RST  |   nRST    |

### GPIO

芯片大部分引脚为数模混合 IO，每个通用 GPIO 都有 4bit 控制寄存器：FCR[1:0],PUEN，ODEN，其中 FCR 用于 IO 口功能选择：

| FCR |                       引脚功能                       |
| :-: | :--------------------------------------------------: |
| 00  |                      GPIO 输入                       |
| 01  |     GPIO 输出，由 ODEN 定义开漏输出或者推挽输出      |
| 10  | 数字外设功能,IO 的输入输出方向由所连接的外设功能决定 |
| 11  |                    模拟信号功能，                    |

### 时钟架构

芯片内部包括多个时钟源

|          时钟源          |    频率    |                           备注                           |
| :----------------------: | :--------: | :------------------------------------------------------: |
| 低频晶体振荡电路（XTLF） | 32.768KHz  |  EXCKSEN 寄存器用于控制时钟选择 GPIO 输入还是 XTLF 输出  |
| 高频晶体振荡电路（XTHF） |  4~24MHz   |      软件可以通过 XTHFEN 寄存器使能或关闭 XTHF 时钟      |
|  高频 RC 振荡器（RCHF）  | 最高 32MHz |                            -                             |
|  低功耗内部环振（RCLP）  |   32KHz    | （主要用作独立看门狗工作时钟，上电后自动启动，不可关闭） |
|      锁相环（PLL）       |     -      |   软件选择 PLL 输入时必须保证 RCHF 或 XTHF 为使能状态    |

注意：

- 系统主时钟可以选择多个时钟源（不是同时选多个，是可以换成多个）
- CPU 和总线最高频率 64MHz
- 部分外设模块工作时需设独立工作时钟（与 CPU 和总线时钟解耦）
- 上电默认使用 **8MHzRCHF** 的不分频时钟作为系统主时钟
- APB 总线时钟可以使 AHBCLK 的分频或同频时钟

## IAR 环境配置

Keil 或者 IAR 本身是不带有 FM33FG0xA 系列的板子的，需要手动下载配置文件，但是在复旦微官网找了好久一直没找到 FG 系列，最后在论坛里找到了相关文件，这个论坛链接贴在这里。[src](https://www.fmdevelopers.com.cn/forum.php?mod=viewthread&tid=16713&page=1)

### IAR 手动添加新 device 方法

1. 在上述链接中下载`IAR开发环境配置文件(LG、LE、FT、FG、HT、LV、LF).zip`，解压，里面有四个文件夹`debugger`, `devices`, `flashloader`, `linker`,里面都各有一个`FMSH`文件夹，将这四个文件夹内的`FMSH`，都放入 IAR 安装目录下的`arm/config`目录的对应文件夹下
2. 打开任意`.eww`IAR 工程文件即可发现设备可以正确被识别。其中`Application/User`中存放的是`Src`文件夹的文件

### IAR 烧录程序方法

IAR 的原生工具栏是不提供“只下载不调试”的按钮的，需要从设置里打开。([src](https://blog.csdn.net/fukuharaai/article/details/129741582))

工具栏的最后有一个向下的小箭头，点击后选择`添加或删除按钮`，再点击`customize...`，然后在`命令` - `类别` - `Project` 中找到`Download activate application`，点击它并将其直接拖到工具栏（对，要跨对话框操作）即可。

> 有点笨的设计，我不知道为什么 IAR 要把这个隐藏的那么深，而且甚至没有为他做一个 icon，不太理解，可能是后面调试代码的时候，都是需要 download and debug 的吧……

### 报错

- 许可证破解版本问题，在破解之后，license 图标显示为红色，并且提示报错：

```
The generation feature is not of version 18.
```

说明其许可证版本不对，解决方法（[ref](https://blog.csdn.net/qq_35697978/article/details/137425884)）是需要用到`licpatcher64a.exe`，关闭正在运行的 IAR 进程，将该`.exe`程序复制进以下三个路径中：

- `C:\Program Files\IAR Systems\Embedded Workbench 9.0\arm\bin\`
- `C:\Program Files\IAR Systems\Embedded Workbench 9.0\arm\bin\jet\bin\`
- `C:\Program Files\IAR Systems\Embedded Workbench 9.0\common\bin\`

并且在三个路径下分别运行`licpatcher64a.exe`程序，之后再次打开 IAR 编辑器即可正常使用。

> `licpatcher64a.exe` 下载链接见[src](https://pan.baidu.com/s/1xxMLTe8yLSmjIrzDc4-DAQ?pwd=led0)，里面有一个`IARZhu-册-机你懂得.zip`的压缩文件，里面有我们需要的`.exe`程序。

## 焊接相关学习

1. 排针焊接

没啥技巧，硬焊

2. 热缩管使用

线的焊接不好弄，需要留出较多的铜线，然后先在铜线上挂上锡，再用电烙铁把两根铜线对接着焊起来，这步对接千万别手抖啊，最麻烦的一步。热缩管的话先套上去，然后用热风枪怼着吹就会缩小了，注意的是尺寸选择，别选太大了的，太大了裹不住
