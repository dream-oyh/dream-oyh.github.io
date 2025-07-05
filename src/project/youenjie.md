---
date: 2025-06-19
---

# FOTA + AutoSAR 协议开发

## 诊断及刷写规范

- FOTA 整包刷写 ECU 功能需求规范 v1.0
  - ECU 信息收集需求，需要刷写的 ECU 的 DID 列表
  - FOTA 刷写时间和流程要求，包括整车静默指令和恢复通讯指令
  - FileHeader 和 FlashFlow 具体怎么写的格式信息，其中 FlashFlow 氛围诊断报文、配置信息、数据信息，给出了 ControlByte 位格式和报文格式要求

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

::: details 归档（前期方向错误，学习内容与项目产生偏差）

## 一些名词解释

- 复旦微开发板型号为 FM33FG0614A AutoEVB UM，**而不是** FM33FG0614A **Rev.A** AutoEVB UM，我们用的是 B 型板而非 A 型板，后面参考原理图和程序例程，也都要注意是 B 型的板子

|   英文缩写    |          全拼           |                                             含义                                             |
| :-----------: | :---------------------: | :------------------------------------------------------------------------------------------: |
|      MCU      |   Micro Control Unit    |                                         微型控制单元                                         |
|      SWD      |    Serial Wire Debug    | 串行接口，另外一种测试叫作 JTAG 接口，主要用于芯片内部测试，测试芯片制造出来之后引脚的连通信 |
|      SVD      | Supply Voltage Detector |                                        电源电压检测器                                        |
| CAN 总线 IDLE |            -            |                                         CAN 总线空闲                                         |

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

GPIO 初始化结构体配置方法，以下是点灯程序的初始化配置。

```cpp
void LED_Init(void)
{
    FL_GPIO_InitTypeDef GPIO_InitStruct = { 0 };
    /* 输出数据置位寄存器写1，避免LED初始化时闪烁 */
    FL_GPIO_SetOutputPin(GPIOB, FL_GPIO_PIN_6);
    /* GPIO 输出功能初始化 */
    GPIO_InitStruct.pin           = FL_GPIO_PIN_6;              // 指定引脚
    GPIO_InitStruct.mode          = FL_GPIO_MODE_OUTPUT;        // 指定工作模式
    GPIO_InitStruct.outputType    = FL_GPIO_OUTPUT_PUSHPULL;    // 指定输出模式：推挽或者开漏
    GPIO_InitStruct.pull          = FL_GPIO_BOTH_DISABLE;       // 上拉/下拉选择使能
    GPIO_InitStruct.remapPin      = FL_GPIO_PINREMAP_FUNCTON0;  // 重映射
    GPIO_InitStruct.driveStrength = FL_GPIO_DRIVESTRENGTH_X3;   // 驱动强度
    (void)FL_GPIO_Init(GPIOB, &GPIO_InitStruct);                // 初始化函数
}

```

GPIO 置高低电平

```cpp
FL_GPIO_ResetOutputPin(GPIOB, FL_GPIO_PIN_6); // 置高电平
FL_GPIO_SetOutputPin(GPIOB, FL_GPIO_PIN_6); // 置低电平
```

#### GPIO 配置外部中断

这颗芯片貌似无法轮询开关的 GPIO 口电平状态，需要配置外部中断才能让开关发挥作用。

以下是对 EXTI 配置的方法：

```cpp{18-36}
void KEY_Init(void)
{
    //  B2口是机载按键接口
    FL_GPIO_InitTypeDef GPIO_InitStruct = {0};
    FL_EXTI_CommonInitTypeDef extiCommonInitStruct = {0};
    FL_EXTI_InitTypeDef extiInitStruct = {0};
    FL_NVIC_ConfigTypeDef InterruptConfigStruct;

    /* 用到的GPIO引脚，设置为输入功能，PB8、PB2为开发板按键 */
    GPIO_InitStruct.pin           = FL_GPIO_PIN_2; //FL_GPIO_PIN_8 | FL_GPIO_PIN_2;
    GPIO_InitStruct.mode          = FL_GPIO_MODE_INPUT;
    GPIO_InitStruct.outputType    = FL_GPIO_OUTPUT_PUSHPULL;
    GPIO_InitStruct.pull          = FL_GPIO_PULLUP_ENABLE;
    GPIO_InitStruct.remapPin      = FL_GPIO_PINREMAP_FUNCTON2;
    GPIO_InitStruct.driveStrength = FL_GPIO_DRIVESTRENGTH_X3;
    (void)FL_GPIO_Init(GPIOB, &GPIO_InitStruct);

    /* EXTI中断采样时钟选择 */
    extiCommonInitStruct.clockSource = FL_CMU_EXTI_CLK_SOURCE_AHBCLK;
    /* 休眠使能外部中断采样 */
    extiCommonInitStruct.EXTIOnSleep = FL_DISABLE;
    (void)FL_EXTI_CommonInit(&extiCommonInitStruct);

    /* 配置PB2引脚外部中断功能 */
    extiInitStruct.extiPinX    = FL_GPIO_PIN_2;
    /* 使能数字滤波 */
    extiInitStruct.filter      = FL_ENABLE;
    /* 设置触发边沿模式 */
    extiInitStruct.triggerEdge = FL_GPIO_EXTI_TRIGGER_EDGE_FALLING;
    (void)FL_EXTI_Init(GPIOB, &extiInitStruct);

    /* 清除中断标识 */
    FL_EXTI_ClearFlag(GPIOB, FL_GPIO_PIN_2);
    /* NVIC中断配置 */
    InterruptConfigStruct.preemptPriority = 0x02;
    FL_NVIC_Init(&InterruptConfigStruct, EXTI_DAC_IRQn);
}
```

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

### CAN 外设

FM33FG0614A 提供的 CAN 库函数极其的少，和 stm32 差太多了，看了下数据手册，估计只能通过自行配置寄存器，自己写收发函数。

#### CAN 通信结构框图

和 stm32 的基本一致，但是在寄存器的操作方式上有很大不同。

![CAN通信结构框图](/images/stm32/CAN-结构框图.png)

> 注：复旦微芯片的 FIFO 只有一个，且该 FIFO 中只能保存 2 条消息。提供了 16 组消息滤波器。

#### CAN 模式切换

![CAN模式切换方法](/images/stm32/FMCAN-模式切换.png)

#### CAN 自发自收

CAN 的自发自收程序已经上传至 github，在该仓库中的[can.c](https://github.com/dream-oyh/CAN-Loopback-Test/blob/master/Src/can.c)文件中查看具体的 CAN 自收自发测试示例。

- [x] 这个代码里面对于 CAN 收消息过程中的`RxMessage`变量的处理还需要优化，现在只是勉强实现了测试功能。

**实际效果**：按一下机载按键，调用 GPIO 的外部中断，单片机 LED 绿灯闪烁一次，然后单片机发送 CAN 报文，然后在自回环模式下自己收报文，如果正确收到报文，就再闪烁一次 LED 灯。

## FM33FG0xA OTA 逻辑

[参考视频](https://www.bilibili.com/video/BV1SatHeBEVG)

### 串口+DMA 数据收发

现在先实现串口和 DMA 的数据收发，由于接收的数据是不定长的，且串口接收缓冲区有限，目前的接收思路如图所示。

![串口接收数据逻辑](/images/stm32/串口接收数据逻辑.png)

### 串口驱动问题

串口采用的是 CP2102 USB to UART Bridge Controller，连接后系统设备管理器显示没有安装驱动。可在[官网](https://www.silabs.com/developer-tools/usb-to-uart-bridge-vcp-drivers?tab=downloads)上下载对应驱动，下载`CP210x Universal Windows Driver`后解压压缩包，然后在设备管理器中安装即可（可以把驱动文件夹给设备管理器，让他自己找驱动文件）。

:::
