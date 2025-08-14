# stm32

## 名词解释

| 英文缩写 |             全拼              |            含义             |
| :------: | :---------------------------: | :-------------------------: |
|   AHB    | Advanced High-performance Bus |       高级高性能总线        |
|   APB    |    Advanced Peripheral Bus    |        高级外设总线         |
|   RTC    |        Real-Time Clock        |          实时时钟           |
|   RCC    |    Reset and Clock Control    |       复位和时钟控制        |
|   AFIO   |     Alternate function io     | 复用功能重映射/中断引脚选择 |
|    OC    |        Output Compare         |          输出比较           |
|    IC    |         Input Capture         |          输入捕获           |
|    CC    |        Capture/Compare        |          捕获/比较          |

::: tip

要关注一下单片机的内部结构图，尤其关注总线和外设的挂载方式，比如 stm32,所有的 GPIO 口都是挂载在 APB2 总线上的，调用的时候就要注意用 APB2 总线。

:::

## 库函数的模板函数

stm32 的库函数内各种外设的函数基本上都是有迹可循的，常见的有如下几种：

- `xxxx_InitTypeDef` 用于外设初始化的结构体类型名
- `xxxx_Init()` 对某个外设初始化，常常以对应结构体作为参数。
- `xxxx_DeInit()` 去初始化，恢复默认配置
- `xxxx_StructInit()` 对结构体变量赋默认值
- `xxxx_ITConfig()` 使能外设的中断输出
- `xxxx_GetFlagStatus()` 读取状态寄存器内**状态标志位**的值
- `xxxx_ClearFlag()` 清空**状态标志位**
- `xxxx_GetITFlag()` 获取**中断标志位**
- `xxxx_ClearITPendingBit()` 清除**中断标志位**
  > 最后四个函数的本质是操作状态寄存器，每个外设的状态寄存器里会有对应的状态标志位，比如说串口的状态标志位表示是否收到信息，`xxxx_GetFlagStatus()` 和 `xxxx_ClearFlag()`就是对这个标志位操作；最后两个处理的是和中断有关的标志位。

## GPIO

模式：开漏输出、推挽输出、模拟输入、上下拉/浮空输入等

> 上下拉/浮空输入都是数字信号的输入模式，区别在于当引脚悬空时，上拉输入模式下内部连接上拉电阻，默认为高电平；下拉模式下内部连接下拉电阻，默认为低电平；浮空输入下，引脚悬空时电平高低无法确定

#### 配置方法：

1. 使能时钟 `RCC_APB1.2PeriphClockCmd()`
2. 配置结构体，stm32 中采用`GPIO_InitTypeDef`结构体类型，一般要定义该结构体下的`GPIO_Mode`，`GPIO_Pin`，`GPIO_Speed`这三个参数。Pin 口如果有多个，用`|`连接，比如：`GPIO_InitStructure.GPIO_Pin=GPIO_Pin_1 | GPIO_Pin_2`
3. 初始化：`GPIO_Init(GPIOx, &GPIO_InitStructure)`
4. 指定对应操作

### 引脚重映射

1. 开启 AFIO 时钟
2. `GPIO_PinRemapConfig()` 配置引脚重映射
3. 查数据手册，查看重映射方式，确认`GPIO_PinRemapConfig()`函数的参数；注意有时要解除调试端口（JTRST/JTAG/SWD）的复用，但是解除调试端口后，就无法通过 TLink 烧录程序，只能用串口烧录，得注意。

## 中断

- **中断** ：在主程序运行过程中，出现了特定的中断出触发条件（中断源），使得 CPU 暂停当前正在运行的程序，转而去处理中断程序，处理完成后又返回原来被暂停的位置继续运行。
- **中断优先级**：当有多个中断源同时申请中断时，CPU 会根据中断源的轻重缓急进行裁决，优先响应紧急中断源
- stm32 中利用 NVIC（嵌套中断向量控制器）管理中断，每个中断通道拥有 16 个可编程的优先等级，可对优先级进行分组，进一步设置**抢占优先级（Pre-Emption Priority）**和**响应优先级(Subpriority)**

> 抢占优先级高的可以中断嵌套，响应优先级高的可以优先排队，两者均相同的按中断号排队。NVIC 对中断优先级进行了分组，以此区分抢占优先级和响应优先级。

`中断源（包括EXTI，TIM，ADC，USART）` -> `NVIC` -> `CPU`，实际运行工作中，会有很多的外设产生中断请求，这时候需要由 NVIC 通过中断优先级裁决哪一个中断优先处理，然后把这个中断再发送给 CPU 做对应处理。

- NVIC 配置
  - `NVIC_PriorityGroupConfig()` 该函数配置中断优先级分组
  - `NVIC_InitTypeDef` 设置结构体配置 NVIC 相关参数
    - `NVIC_IRQChannel` 配置 NVIC 通道
    - `NVIC_IRQChannelCmd` 通道使能
    - `NVIC_IRQChannelPreemptionPriority` 抢占优先级
    - `NVIC_IRQChannelSubPriority` 响应优先级
  - `NVIC_Init()` 初始化，传入结构体的地址

### EXTI（External Interrupt） 外部中断

- 监测指定 GPIO 电平信号，当 GPIO 产生电平变化时，EXTI 向 NVIC 发送中断申请，经过 NVIC 裁决后中断 CPU 主程序，使 CPU 开始响应 EXIT 对应的中断程序。
- 支持所有的 GPIO 口，**但是相同的 Pin 不能同时触发中断**；
- 通道数：16 个 `GPIO_Pin`， _外加 PVD 输出、RTC 闹钟、USB 唤醒、以太网唤醒_
- 响应方式：中断响应/事件响应
- 触发方式：上下边沿触发/双边沿触发/软件触发

EXTI 中断结构：

![](/images/stm32/EXTI_structure.png)

> 其中，AFIO 用于选择 GPIO 引脚，比如 A0,B0,C0,D0,经过 AFIO 选择后，只有一个能接到 EXTI 的通道 0 上。
>
> 旋转编码器、光敏传感器这种产生连续信号波且转瞬即逝波形的外设，建议用外部中断处理，而按键触发，考虑采用 GPIO 输入读取，因为这样能比较好地处理按键抖动和松手检测的问题。

#### 配置方法

1. 打开对应外设时钟，包括：GPIO，AFIO，**注意 EXTI，NVIC 的时钟不用单独开启，保持默认打开**
2. 配置 GPIO，AFIO
   > AFIO 没有专门的库函数，包含在 GPIO 的库函数里了，其中`GPIO_PinRemapConfig()`用于引脚的重映射；`GPIO_EXTILineConfig()`用于 EXTI 的通道选择，具体参数见库函数说明。
3. 配置 EXTI 的响应通道和响应方式，包括：`EXTI_Line`, `EXTI_LineCmd`, `EXTI_Mode`, `EXTI_Trigger`
4. 配置 NVIC，包括配置优先级分组 **（一般选用 2 分组）** 和初始化 NVIC
5. 写中断函数，中断函数的名字需要参考启动文件中的`startup_stm32f10x_md.s`，参考其中断向量表中以`EXTI`开头的函数名，**注意中断函数是无参无返回值的。**
   1. 判断中断标志位，在中断函数里使用`EXTI_GetITStatus()`函数
      > 最重要的一步，不同的中断标志位应该采取不同的操作，所以要先 if 判断标志位，再写需要的操作
   2. 写中断时需要的操作
   3. 清除中断标志位
      > **别漏了**

### TIM 定时器中断

定时器可以对输入的时钟进行计数，并在计数值达到设定值时触发中断。内容极多。

主要功能包括：

1. [定时中断](#定时中断)
2. [输出比较](#输出比较-oc-output-compare)
3. [输入捕获](#输入捕获-ic-input-capture)

#### 定时器类型

| 定时器类型 |                                                  功能                                                  |
| :--------: | :----------------------------------------------------------------------------------------------------: |
| 高级定时器 | 拥有通用定时器的全部功能，并且额外具有重复计数器，死区生成，互补输出，刹车输入等针对无刷电机设计的功能 |
| 通用定时器 | 拥有基本定时器的全部功能，并额外具有内外时钟源选择、输入捕获、输出比较、编码器接口、主从触发模式等功能 |
| 基本定时器 |        拥有定时中断、主模式触发 DAC 功能，时钟源只能选择内部时钟，其他两种类型可以选择外部时钟         |

#### TIM 中断结构

![](/images/stm32/TIM_structure.png)

#### 基本定时器结构

![](/images/stm32/基本定时器结构.png)

- `CK_PSC` 预分频器的输入时钟，选内部时钟一般是 72MHz
- `CNT_EN` 计数器使能，高电平计数器正常运行
- `CK_CNT` 计数器时钟

#### 时序图细节解析

定时时间的计算如下，后面是解释说明。`

$$CK\_ CNT\_ OV = \frac{CK\_ CNT}{ARR + 1} = \frac{CK\_ PSC}{(PSC+1)(ARR+1)}$$

##### 当预分频器的参数从 0 变到 1 时，计数器的时序图

![](/images/stm32/预分频器时序.png)

$$CK\_ CNT= \frac{CK\_ PSC}{PSC+1}$$

- `PSC` 分频系数
- `计数器寄存器` 计数用，下图中寄存器跟随时钟上升沿递增计数
- `更新事件` 在 FC 之后达到 ARR 重装值，下一个时钟来临时计数器清 0，更新事件产生脉冲
- `预分频控制寄存器` 为预分频寄存器提供了一种**缓冲机制**，在任意时刻，程序将预分频系数从 0 改成 1,此时并不会马上对预分频系数进行更改，而是先更改影子寄存器（或者叫缓冲寄存器），等待这个循环周期结束之后（即：计数器达到 ARR 自动重装值后），才会将预分频系数正式改为 1，防止了一些不必要的麻烦。
- 计数器寄存器的计数频率，是靠另一个计数器实现的，这个计数器是图中最下方的预分频计数器，当预分频系数为 0 时，不动；当预分频计数器为 1 时，0,1,0,1 交替计数，计数到 1 时向计数器寄存器发送递增信号，计数器寄存器递增+1。

##### 内部时钟分频因子为 2 时，计数器的时序图

![](/images/stm32/计数器时序.png)

- `CK_INT` 内部时钟 72MHz
- `CNT_EN` 时钟使能，高电平启动
- `CK_CNT` 计数器时钟
- 等计数器寄存器递增到 ARR 重装值时，计数器溢出，更新事件产生一个脉冲信号，更新中断标志位置 1,让中断控制器去 NVIC 申请中断。所以我们要的定时，就是计数器溢出的两个脉冲之间的距离，把这个频率称为`CK_CNT_OV`。**所以在设置定时的时候，我们主要要算的就是这个`CK_CNT_OV`，就是要根据内部时钟频率，计算出`PSC`和`ARR`的具体取值**。

这样，这个定时时间的计算就是：

$$CK\_ CNT\_ OV = \frac{CK\_ CNT}{ARR + 1} = \frac{CK\_ PSC}{(PSC+1)(ARR+1)}$$

#### 定时中断

1. 使能 RCC 时钟
2. 选择时钟源为**内部时钟模式**
   - `void TIM_InternalClockConfig();` 配置内部时钟
   - `void TIM_ITRxExternalClockConfig();` 配置其他定时器的外部时钟模式 1
   - `void TIM_TIxExternalClockConfig();`选择捕获通道的外部时钟模式 1
   - `void TIM_ETRClockMode1Config();` 选择 ETR 外部时钟模式 1
   - `void TIM_ETRClockMode2Config();` 选择 ETR 外部时钟模式 2
   - `void TIM_ETRConfig();` 单独配置 ETR 引脚的极性、滤波器等
3. 时基单元初始化`TIM_TimeBaseInit()`：预分频器，计数器，自动重装器，用结构体`TIM_TimeBaseInitTypeDef`配置
   - 这个结构体里面有一个`TIM_RepetitionCounter`这个值，是高级计数器才有的，其他计数器不用，直接赋值给 0 就行
   - `TIM_Period` 指的是 ARR 自动重装器的值，数字格式为`int`，取值范围在 0~65535，定义的时候需要-1
   - `TIM_Prescaler` 指的是 PSC 预分频器的值，数字格式为`int`，取值范围在 0~65535，定义的时候需要-1
4. 配置输出中断控制`TIM_ITConfig()`
5. 配置 NVIC ，打开定时器中断通道
6. 定时器启动`TIM_Cmd()`，写定时器中断函数

其他函数：

- `TIM_PrescalerConfig()` 单独修改 PSC 预分频值
- `TIM_CounterModeConfig()` 单独修改计数器计数模式
- `TIM_ARRPreloadConfig()` 单独修改自动重装器预装功能
- `TIM_SetCounter()` 给计数器写入一个值
- `TIM_SetAutoreload()` 给自动重装器写入一个值
- `TIM_GetCounter()` 获取当前计数器的值
- `TIM_GetPrescaler()` 获取当前预分频器的值

#### 输出比较 OC（Output Compare）

用于输出 PWM 波形，控制电机。

输出比较通过比较 CNT 计数器和 CCR 寄存器值的关系，对输出电平进行置 1、置 0 或翻转的操作，用于输出一定频率和占空比的 PWM 波形。（CNT 就是前面说的定时跳变的计数器，CCR 是有一个预设的值，CNT 计数达到 CCR 了之后，就会让输出依次置 1,置 0）

![输出比较模式表格](/images/stm32/输出比较模式.png)

![PWM模式基本结构](/images/stm32/PWM-基本结构.png)

时基单元之前的时钟选择，和[定时中断](#定时中断)的配置一致，与之区别是最后不需要配置中断，而是配置输出比较单元和 IO 口。

PWM 相关参数：

| 物理量 |     表达式     |              计算方法               |
| :----: | :------------: | :---------------------------------: |
|  频率  |    $1/T_s$     | $f=\frac{CK\_ PSC}{(PSC+1)(ARR+1)}$ |
| 占空比 |  $T_{ON}/T_s$  |    $Duty = \frac{CCR}{ARR + 1}$     |
| 分辨率 | 占空比变化步距 |         $Reso = 1/(ARR+1)$          |

::: tip PWM 波形频率与占空比的调整

- 通过调整 PSC 以调整 PWM 的频率，利用`TIM_PrescalerConfig()`函数
- 通过调整 CCR 以调整 PWM 的占空比，利用`TIM_SetComparex()`函数
- 而 ARR 是确定分辨率，如果分辨率取 1%，则直接定 ARR 为`100-1`

:::

**配置方法**

1. 打开时钟
2. 配置输出比较单元
   - `TIM_OCxInit()` 输出比较单元初始化，利用`TIM_OCInitTypeDef`结构体初始化
     - `TIM_OCMode` 设置输出比较的模式
     - `TIM_OCPolarity` 设置输出比较的极性
     - `TIM_OutputState` 设置输出使能
     - `TIM_Pulse` 设置 CCR，决定了占空比
   - `TIM_SelectOCxM()` 选择输出比较模式
   - `TIM_SetComparex()` 更改 CCR 的值进而占空比，可以由此实现 PWM 占空比的连续变化
3. 查引脚定义表定义 GPIO 口，定时器控制引脚需要使用复用开漏/推挽输出模式。

#### 输入捕获 IC （Input Capture）

输入捕获模式下，当通道输入引脚出现指定电平跳变时，当前 CNT 的值将被锁存到 CCR 中，可用于测量 PWM 波形的频率、占空比、脉冲间隔、电平持续时间等参数。可配置为 PWMI 模式，同时测量频率和占空比；可配合主从触发模式，实现硬件全自动测量

输入捕获测量频率采用测周法，即：测量两个上升沿到达之间的间隔时间。

**PWMI 模式**

![PWMI模式基本结构](/images/stm32/PWMI-基本结构.png)

一个信号通给两个数据选择器，使得两个通道同时测量占空比和频率成为了可能。

**配置方法**

1. RCC 开启 GPIO 和 TIM 的时钟
2. GPIO 初始化为输入模式
3. 配置时基单元
4. 配置输入捕获单元，可用结构体`TIM_ICInitTypeDef`进行配置
   - `TIM_ICInit()` 配置单通道
   - `TIM_PWMIInit()` 配置交叉的双通道
5. 选择从模式的触发源`TIM_SelectInputTrigger()`，触发源为 TI1FP1
6. 选择触发之后选择的操作`TIM_SelectSlaveMode()`
7. 定时器使能`TIM_Cmd()`

**主从触发模式**

- 主模式是将定时器的内部信号，映射到 TRGO 引脚，进而驱动其他外设
- 从模式是接收其他外设或者自身外设的一些信号，映射到 TRGI 引脚，用于控制自身定时器的运行（如复位、关闭等）
- 具体可以用于哪些信号和哪些外设，查手册吧
- 主从模式的操作由硬件自动化进行，软件上只需要一行代码解决。

## ADC 模数转换器

ADC 可以将引脚上连续变化的模拟电压转换为内存中存储的数字变量，建立模拟电路到数字电路的桥梁。

- stm32 提供 12 位逐次逼近型 ADC
- 1us 转换时间
- 输入电压范围：0-3.3V
- 转换结果范围：0-4095
- 规则组和注入组两个转换单元
- 模拟看门狗自动监测输入电压范围

> 注入组和规则组是 stm32 提供的两种转换方式，目前还没学习其区别。但是，注入组有 4 个数据寄存器，规则组只有 1 个，所以需要配合 DMA 及时地转运数据，防止数据被覆盖。

| 转换方式 |                       备注                        |
| :------: | :-----------------------------------------------: |
|   ADC    |                  模拟数字转换器                   |
|   DAC    |                  数字模拟转换器                   |
|   PWM    | 调制波信号生成，也可以实现数字转模拟，比 DAC 常用 |

![ADC基本结构](/images/stm32/ADC-基本结构.png)

### 转换模式

- 单次转换 or 连续转换
  - 单次转换：转换结束后会停下，不会继续转换，下次转化需要手动开启
  - 连续转换：转换结束后不停下，继续转换，可以随时在寄存器读取 ADC 的值
- 扫描模式 or 非扫描模式
  - 扫描模式：多个通道一起转换
  - 非扫描模式：单个通道独立转换

### 配置方法

1. 打开 GPIO，ADC 和 RCC ADC 分频器的时钟`RCC_ADCCLKConfig()`
2. 配置 GPIO，设置为模拟输入模式
3. 配置多路开关
4. 配置 ADC 转换器，用结构体配置，参数很多
5. 配置 ADC 校准
6. 开关控制`ADC_Cmd()`供电使能

## 通信

### CAN 通信

CAN 通信的原理和细节，放在博客的另一个页面中，[点此跳转](/code/Arduino/#can)

stm32 的 CAN 通信具体实现细节，见[此视频](https://www.bilibili.com/video/BV1vu4m1F7Gt)

![CAN结构框图](/images/stm32/CAN-结构框图.png)

> FIFO 是先进先出寄存器，相当于一个 Queue 数据结构

#### 过滤器配置

每个过滤器由两个 32 位寄存器组成：R1[31:0],R2[31:0]

| 标志位 | 设置作用 |   置 0   |   置 1   |
| :----: | :------: | :------: | :------: |
|  FSCx  | 位宽设置 |  16 位   |  32 位   |
|  FBMx  | 模式设置 | 屏蔽模式 | 列表模式 |
|  FFAx  | 关联设置 |  FIFO 0  |  FIFO 1  |
| FACTx  | 激活设置 |   禁用   |   启用   |

**配置方法**

- 自发自收模式配置

1. 打开 RCC 时钟，包括 GPIO，CAN1
2. GPIO 初始化，CAN_TX 引脚初始化为复用推挽输出模式，CAN_RX 为上拉输入模式
3. CAN 外设初始化，采用结构体配置
4. 过滤器初始化，采用结构体配置
5. 报文数据写入发送结构体，调用发送函数
6. 调用检查 FIFO 状态函数，报文数据存入到接收的结构体中，读取结构体即可。

#### 程序实现

##### CAN 通信发送函数

用结构体定义发送相关参数（标准帧/扩展帧，数据帧长度等），用 HAL 库函数发送数据。

- 输入参数：报文 ID，数据帧（以数组形式存储）指针，数据帧长度
- 输出参数：无

```c++

/*发送数据函数*/
CAN_TxHeaderTypeDef TxMessage;
CAN_HandleTypeDef hcan;
void CAN_Send_Test(uint32_t ID, uint8_t txdata[],uint16_t len)
{
    uint32_t pTxMailbox = 0;
    TxMessage.IDE = CAN_ID_EXT;     //设置ID类型
    //  TxMessage.StdId = ID;
    TxMessage.ExtId = ID;       //设置ID号
    TxMessage.RTR = CAN_RTR_DATA;   //设置传送数据帧
    TxMessage.DLC = len;              //设置数据长度
  	HAL_CAN_AddTxMessage(&hcan, &TxMessage,txdata, &pTxMailbox);
}
```

::: details `CAN_TxHeaderTypeDef`结构体定义（每块开发板不一样，需要去驱动程序里找）

```c++
// CAN_TxHeaderTypeDef 结构体定义
/**
  * @brief  CAN Tx message header structure definition
  */
typedef struct
{
  uint32_t StdId;    /*!< Specifies the standard identifier.
                          This parameter must be a number between Min_Data = 0 and Max_Data = 0x7FF. */

  uint32_t ExtId;    /*!< Specifies the extended identifier.
                          This parameter must be a number between Min_Data = 0 and Max_Data = 0x1FFFFFFF. */

  uint32_t IDE;      /*!< Specifies the type of identifier for the message that will be transmitted.
                          This parameter can be a value of @ref CAN_identifier_type */

  uint32_t RTR;      /*!< Specifies the type of frame for the message that will be transmitted.
                          This parameter can be a value of @ref CAN_remote_transmission_request */

  uint32_t DLC;      /*!< Specifies the length of the frame that will be transmitted.
                          This parameter must be a number between Min_Data = 0 and Max_Data = 8. */

  FunctionalState TransmitGlobalTime; /*!< Specifies whether the timestamp counter value captured on start
                          of frame transmission, is sent in DATA6 and DATA7 replacing pData[6] and pData[7].
                          @note: Time Triggered Communication Mode must be enabled.
                          @note: DLC must be programmed as 8 bytes, in order these 2 bytes are sent.
                          This parameter can be set to ENABLE or DISABLE. */

} CAN_TxHeaderTypeDef;

```

:::

::: details `CAN_HandleTypeDef`结构体定义(直接看初始化函数方便点)

```c++
CAN_HandleTypeDef hcan;

/* CAN init function */
void MX_CAN_Init(void)
{
  hcan.Instance = CAN1;
  hcan.Init.Prescaler = 16;
  hcan.Init.Mode = CAN_MODE_NORMAL;
  hcan.Init.SyncJumpWidth = CAN_SJW_1TQ;
  hcan.Init.TimeSeg1 = CAN_BS1_3TQ;
  hcan.Init.TimeSeg2 = CAN_BS2_4TQ;
  hcan.Init.TimeTriggeredMode = DISABLE;
  hcan.Init.AutoBusOff = DISABLE;
  hcan.Init.AutoWakeUp = DISABLE;
  hcan.Init.AutoRetransmission = DISABLE;
  hcan.Init.ReceiveFifoLocked = DISABLE;
  hcan.Init.TransmitFifoPriority = ENABLE;
  if (HAL_CAN_Init(&hcan) != HAL_OK)
  {
    Error_Handler();
  }
  /* USER CODE BEGIN CAN_Init 2 */

  /* USER CODE END CAN_Init 2 */
}
```

:::

##### CAN 通信接收函数

这里给的只是标准帧接收数据，扩展帧改改就行。需要先在调用前定义好接收缓冲区，把这个缓冲区指针作为输入参数传入，该函数就会把接收到的内容写进这个缓冲区数组中。返回值是接收是否成功的标志位。

- 输入参数：接收 ID（标准帧），数据接收缓冲区数组指针
- 输出参数：接收是否成功，1 为成功（其实一般写 0 为成功更多……因为不同的非零数可以排查错误）

```c++
/**
 * @brief       CAN 接收数据查询
 * @note      接收数据格式固定为: 标准ID, 数据帧
 * @param       id      : 要查询的 标准ID(11位)
 * @param       buf     : 数据缓存区
 * @retval      接收结果
 *   @arg       0   , 无数据被接收到;
 *   @arg       其他, 接收的数据长度
 */
uint8_t can_receive_msg(uint32_t id, uint8_t *buf)
{
    if (HAL_CAN_GetRxFifoFillLevel(&hcan, CAN_RX_FIFO0) == 0)     /* 没有接收到数据 */
    {
        return 0;
    }
    if (HAL_CAN_GetRxMessage(&hcan, CAN_RX_FIFO0, &RxHeader, buf) != HAL_OK)  /* 读取数据 */
    {
        return 0;
    }
    if (RxHeader.ExtId!= id || RxHeader.IDE != CAN_ID_EXT || RxHeader.RTR != CAN_RTR_DATA)       /* 接收到的ID不对 / 不是拓展帧 / 不是数据帧 */
    {
        return 0;
    }

    return 1;
}
```

调用方法：

```c++
uint8_t canbuf[8];
flag = can_receive_msg(0x012356F1, canbuf); // 0x012356F1为标准报文ID
```

##### 阻塞式 CAN 对话通信

阻塞式对话指一直广播消息，直到接收到反馈为止。可以加入超时报警，用 do while 循环实现。按照下面的程序，就能实现向某单位发送报文，并且在`canbuf`变量中拿到对面单位回复过来的报文内容。

```c++{5,17}
uint8_t canbuf[8];
uint8_t txdata[8] = {0X00,0X01,0X02,0X03,0X04,0X05,0X06,0X07};//待机控制器指令
uint8_t sum = 0;
uint8_t flag = 1;
do
{
	CAN_Send_Test(0x0123F156,txdata,8);//发送控制器交互报文
	HAL_Delay(2000);
  sum++;
	flag = can_receive_msg(0x012356F1, canbuf);
  if(sum > 20)
    {
      printf("超时错误告警!\r\n");
      Error_Warn(); // 持续发送报警报文并跳出循环
    }
}
while( flag == 0);//收到待机控制器反馈信息，如果没收到flag变量值会一直是0
sum = 0; // 清零标志位
printf("待机控制器收到充电指令！\r\n");
//待机控制器返回信息，则交互成功
```

### USART 串口通信

- 电路连接：两个设备的 TX 和 RX 引脚要交叉连接
- 可配置：
  - 波特率配置：$=f_{PCLK2/1}/(16\times DIV)$，软件通过配置 DIV 来设定波特率，PCLK 的时钟一般为 72MHz
  - 数据位长度（8/9），奇偶位长度（0.5/1/1.5/2）
  - 可选校验位（无校验/奇偶校验）
  - 一般来说选了无校验，就选 8 个校验位，因为一个字节对应 8 位；选了奇偶校验，就选 9 个校验位（一个字节+一个校验位）

![USART-简化结构图](/images/stm32/USART-简化结构图.png)

#### 配置方法

- 打开串口 USART 和 GPIO 口时钟
- GPIO 初始化,TX 引脚选择推挽输出模式，RX 引脚选择输入模式
- USART 初始化，使用结构体`USART_InitTypeDef`配置
  - `USART_BaudRate`可以直接写波特率，库函数里会计算 DIV 并且写进 BRR 寄存器
  - `USART_Mode` 选择串口工作模式，如果既需要发送，又需要接收，就写`USART_RX | USART_TX`
  - `USART_Parity` 选择奇偶校验
- 配置相关中断`USART_ITConfig()`（若有需要，可选）
- `USART_Cmd()`开关控制

> 一般最常选的是 8 数据位，None 无校验，1 位停止位，人称**8N1**

- 发送数据和接收数据直接调用库函数`USART_SendData()`和`USART_ReceiveData()`就行
  - 注意发送完数据要读取 TXE 寄存器标志位，等待数据发送完成，再进行下一次操作

```c++ {3}
void Serial_SendByte(uint8_t Byte){
    USART_SendData(USART1, Byte);
    while (USART_GetFlagStatus(USART1, USART_FLAG_TXE) == RESET); // 等待发送完成
}
```

- 读取发送和接收状态->读取对应寄存器的标志位

## 看门狗

- 独立看门狗（IWDG）：**独立时钟**，对时间精度要求低
- 窗口看门狗（WWDG）：要求看门狗在**精确计时窗口**起作用

看门狗可以监控程序的运行状态，当程序因为设计漏洞、硬件故障、电磁干扰等原因，出现卡死或跑飞现象时，看门狗能及时复位程序，避免程序陷入长时间罢工状态。本质上是一个**定时器**，当指定时间范围内，程序没有执行喂狗（重置计数器）时，看门狗硬件电路就自动产生复位信号。

## DMA 转运

![DMA结构框图](/images/stm32/DMA-基本结构.png)

- `M2M` 置 1 为软件触发，一般用于存储器与存储器之间的转运，要求尽可能快地转运完；置 0 为硬件触发，一般用于外设与存储器的转运，在硬件达到某个时机时进行转运。
- 外设和存储器站点各有三个参数进行配置，包括`起始地址` `数据宽度` `地址是否自增`，再由方向参数指定转运方向。
  > 这里两个站点的配置不一定是外设到存储器，也可以从存储器到存储器，取决于两个站点的初始地址配置在哪，可以不用纠结“外设”和“存储器”，理解为两个 AB 站点的配置就可以，很宽泛的。
- 传输计数器是一个自减计数器。如果自减计数器已经减到 0,想再写一个数进去，此时**需要先关闭 DMA 使能**，再写传输计数器，最后再打开 DMA 使能。

## PID 倒立摆控制项目

[江科大是神之 PID 控制](https://www.bilibili.com/video/BV1G9zdYQEr3)

### 电机定速控制

1. PID 控制的输出是 PWM，可以看作是驱动力大小；调控量可以是位置/速度。如果是速度，要注意，PWM 的极性和编码器极性相符，否则会导致 PID 进入正反馈，电机在受到一点扰动后直接以最高速旋转。出现正反馈时要考虑是不是**极性问题**。
2. PID 控制的输出量要进行一定限幅，限幅范围取决于输出量的物理含义，比如 PWM 就限幅在-100~100
3. PID 三个参数的取值范围，取决于`输入值范围/输出值范围`，每个项目不一样，要针对性考虑。
4. PID 调参顺序一般是 P、I、D。
5. 在调参的时候，刚开始设置 Ki 的值是 0，所以需要对累积误差做出规定，只有当 Ki 不等于 0,也就是存在积分调控的时候，才累计计算误差。否则，如果程序进行了很长时间都没有 Ki 输入，这个时候误差累计很大了，再突然给 Ki 值，就会存在一个突然的输出，容易崩坏硬件。
6. 在突然加载或减载的过程中，会使得 PID 输出有个向上过冲或者向下过冲的尖峰，这个是闭环控制的普遍现象。可以考虑加入微分项解决。
7. 增量式 PID 只改$\Delta Out$，所以如果调控过程中，让 KpKiKd 都等于 0,这个时候再更改 target 的值，不会使电机再跟踪目标值，也就是说这个时候电机转化为**手动控制**！而增量式的好处在于：能够平滑地使电机从手动控制转为自动控制。且增量式不会受到积分饱和的影响。

### 电机定位置控制

1. 定位置控制的稳态误差很小，因为输出值为 0 时，电机位置不会自发的偏移，但是速度会因为摩擦而下降，所以定速控制有稳态误差，定位置控制很小。这个稳态误差的来源是，因为电机在力很小的时候，会由于摩擦导致转动不起来。所以稳态误差有两类：1. 输出值为 0 时，系统实际测量值的自发偏移；2. 输出值很小时，无法对系统实际测量值造成影响。
2. 增量式做定位置控制时，会引入历史信息。一旦历史上有噪声，单纯的比例控制就无法恢复这个误差，需要引入积分项，是增量式的缺陷所在。

#### 积分分离

出现现象：定位置控制时，如果加入 I 项，会出现超调；但是定速度控制，加入 I 项波形很完美。

原因；定位置控制，保持位置恒定，不需要有输出力，I 项在逼近目标值积累的误差，需要用超调来抵消；而定速控制，保持速度恒定，需要持续输出力，I 项在逼近目标值积累的误差产生的力，和需要抵抗的摩擦力抵消了。

- 积分分离实现思路：对误差大小进行判断，如果误差绝对值小于指定阀值，则加入积分项作用，反之，则直接将误差积分清零或不加入积分项作用

### 倒立摆双环 PID 控制

- 双环的调控周期，一般是外环的调控周期>=内环的调控周期
- 双环的核心：**外环的输出是内环的目标值**。
- 调参：因为内环可以独立工作，所以要先把内环参数调好，再调整外环。
  ARt32_t pTxMailbox = 0;
  TxMessage.IDE = CAN_ID_EXT; //设置 ID 类型
  // TxMessage.StdId = ID;
  TxMessage.ExtId = ID; //设置 ID 号
  TxMessage.RTR = CAN_RTR_DATA; //设置传送数据帧
  TxMessage.DLC = len; //设置数据长度
  HAL_CAN_AddTxMessage(&hcan, &TxMessage,txdata, &pTxMailbox);
  }

````

::: details `CAN_TxHeaderTypeDef`结构体定义（每块开发板不一样，需要去驱动程序里找）

```c++
// CAN_TxHeaderTypeDef 结构体定义
/**
  * @brief  CAN Tx message header structure definition
  */
typedef struct
{
  uint32_t StdId;    /*!< Specifies the standard identifier.
                          This parameter must be a number between Min_Data = 0 and Max_Data = 0x7FF. */

  uint32_t ExtId;    /*!< Specifies the extended identifier.
                          This parameter must be a number between Min_Data = 0 and Max_Data = 0x1FFFFFFF. */

  uint32_t IDE;      /*!< Specifies the type of identifier for the message that will be transmitted.
                          This parameter can be a value of @ref CAN_identifier_type */

  uint32_t RTR;      /*!< Specifies the type of frame for the message that will be transmitted.
                          This parameter can be a value of @ref CAN_remote_transmission_request */

  uint32_t DLC;      /*!< Specifies the length of the frame that will be transmitted.
                          This parameter must be a number between Min_Data = 0 and Max_Data = 8. */

  FunctionalState TransmitGlobalTime; /*!< Specifies whether the timestamp counter value captured on start
                          of frame transmission, is sent in DATA6 and DATA7 replacing pData[6] and pData[7].
                          @note: Time Triggered Communication Mode must be enabled.
                          @note: DLC must be programmed as 8 bytes, in order these 2 bytes are sent.
                          This parameter can be set to ENABLE or DISABLE. */

} CAN_TxHeaderTypeDef;

````

:::

::: details `CAN_HandleTypeDef`结构体定义(直接看初始化函数方便点)

```c++
CAN_HandleTypeDef hcan;

/* CAN init function */
void MX_CAN_Init(void)
{
  hcan.Instance = CAN1;
  hcan.Init.Prescaler = 16;
  hcan.Init.Mode = CAN_MODE_NORMAL;
  hcan.Init.SyncJumpWidth = CAN_SJW_1TQ;
  hcan.Init.TimeSeg1 = CAN_BS1_3TQ;
  hcan.Init.TimeSeg2 = CAN_BS2_4TQ;
  hcan.Init.TimeTriggeredMode = DISABLE;
  hcan.Init.AutoBusOff = DISABLE;
  hcan.Init.AutoWakeUp = DISABLE;
  hcan.Init.AutoRetransmission = DISABLE;
  hcan.Init.ReceiveFifoLocked = DISABLE;
  hcan.Init.TransmitFifoPriority = ENABLE;
  if (HAL_CAN_Init(&hcan) != HAL_OK)
  {
    Error_Handler();
  }
  /* USER CODE BEGIN CAN_Init 2 */

  /* USER CODE END CAN_Init 2 */
}
```

:::

##### CAN 通信接收函数

这里给的只是标准帧接收数据，扩展帧改改就行。需要先在调用前定义好接收缓冲区，把这个缓冲区指针作为输入参数传入，该函数就会把接收到的内容写进这个缓冲区数组中。返回值是接收是否成功的标志位。

- 输入参数：接收 ID（标准帧），数据接收缓冲区数组指针
- 输出参数：接收是否成功，1 为成功（其实一般写 0 为成功更多……因为不同的非零数可以排查错误）

```c++
/**
 * @brief       CAN 接收数据查询
 * @note      接收数据格式固定为: 标准ID, 数据帧
 * @param       id      : 要查询的 标准ID(11位)
 * @param       buf     : 数据缓存区
 * @retval      接收结果
 *   @arg       0   , 无数据被接收到;
 *   @arg       其他, 接收的数据长度
 */
uint8_t can_receive_msg(uint32_t id, uint8_t *buf)
{
    if (HAL_CAN_GetRxFifoFillLevel(&hcan, CAN_RX_FIFO0) == 0)     /* 没有接收到数据 */
    {
        return 0;
    }
    if (HAL_CAN_GetRxMessage(&hcan, CAN_RX_FIFO0, &RxHeader, buf) != HAL_OK)  /* 读取数据 */
    {
        return 0;
    }
    if (RxHeader.ExtId!= id || RxHeader.IDE != CAN_ID_EXT || RxHeader.RTR != CAN_RTR_DATA)       /* 接收到的ID不对 / 不是拓展帧 / 不是数据帧 */
    {
        return 0;
    }

    return 1;
}
```

调用方法：

```c++
uint8_t canbuf[8];
flag = can_receive_msg(0x012356F1, canbuf); // 0x012356F1为标准报文ID
```

##### 阻塞式 CAN 对话通信

阻塞式对话指一直广播消息，直到接收到反馈为止。可以加入超时报警，用 do while 循环实现。按照下面的程序，就能实现向某单位发送报文，并且在`canbuf`变量中拿到对面单位回复过来的报文内容。

```c++{5,17}
uint8_t canbuf[8];
uint8_t txdata[8] = {0X00,0X01,0X02,0X03,0X04,0X05,0X06,0X07};//待机控制器指令
uint8_t sum = 0;
uint8_t flag = 1;
do
{
	CAN_Send_Test(0x0123F156,txdata,8);//发送控制器交互报文
	HAL_Delay(2000);
  sum++;
	flag = can_receive_msg(0x012356F1, canbuf);
  if(sum > 20)
    {
      printf("超时错误告警!\r\n");
      Error_Warn(); // 持续发送报警报文并跳出循环
    }
}
while( flag == 0);//收到待机控制器反馈信息，如果没收到flag变量值会一直是0
sum = 0; // 清零标志位
printf("待机控制器收到充电指令！\r\n");
//待机控制器返回信息，则交互成功
```

### USART 串口通信

- 电路连接：两个设备的 TX 和 RX 引脚要交叉连接
- 可配置：
  - 波特率配置：$=f_{PCLK2/1}/(16\times DIV)$，软件通过配置 DIV 来设定波特率，PCLK 的时钟一般为 72MHz
  - 数据位长度（8/9），奇偶位长度（0.5/1/1.5/2）
  - 可选校验位（无校验/奇偶校验）
  - 一般来说选了无校验，就选 8 个校验位，因为一个字节对应 8 位；选了奇偶校验，就选 9 个校验位（一个字节+一个校验位）

![USART-简化结构图](/images/stm32/USART-简化结构图.png)

#### 配置方法

- 打开串口 USART 和 GPIO 口时钟
- GPIO 初始化,TX 引脚选择推挽输出模式，RX 引脚选择输入模式
- USART 初始化，使用结构体`USART_InitTypeDef`配置
  - `USART_BaudRate`可以直接写波特率，库函数里会计算 DIV 并且写进 BRR 寄存器
  - `USART_Mode` 选择串口工作模式，如果既需要发送，又需要接收，就写`USART_RX | USART_TX`
  - `USART_Parity` 选择奇偶校验
- 配置相关中断`USART_ITConfig()`（若有需要，可选）
- `USART_Cmd()`开关控制

> 一般最常选的是 8 数据位，None 无校验，1 位停止位，人称**8N1**

- 发送数据和接收数据直接调用库函数`USART_SendData()`和`USART_ReceiveData()`就行
  - 注意发送完数据要读取 TXE 寄存器标志位，等待数据发送完成，再进行下一次操作

```c++ {3}
void Serial_SendByte(uint8_t Byte){
    USART_SendData(USART1, Byte);
    while (USART_GetFlagStatus(USART1, USART_FLAG_TXE) == RESET); // 等待发送完成
}
```

- 读取发送和接收状态->读取对应寄存器的标志位

## 看门狗

- 独立看门狗（IWDG）：**独立时钟**，对时间精度要求低
- 窗口看门狗（WWDG）：要求看门狗在**精确计时窗口**起作用

看门狗可以监控程序的运行状态，当程序因为设计漏洞、硬件故障、电磁干扰等原因，出现卡死或跑飞现象时，看门狗能及时复位程序，避免程序陷入长时间罢工状态。本质上是一个**定时器**，当指定时间范围内，程序没有执行喂狗（重置计数器）时，看门狗硬件电路就自动产生复位信号。

## DMA 转运

![DMA结构框图](/images/stm32/DMA-基本结构.png)

- `M2M` 置 1 为软件触发，一般用于存储器与存储器之间的转运，要求尽可能快地转运完；置 0 为硬件触发，一般用于外设与存储器的转运，在硬件达到某个时机时进行转运。
- 外设和存储器站点各有三个参数进行配置，包括`起始地址` `数据宽度` `地址是否自增`，再由方向参数指定转运方向。
  > 这里两个站点的配置不一定是外设到存储器，也可以从存储器到存储器，取决于两个站点的初始地址配置在哪，可以不用纠结“外设”和“存储器”，理解为两个 AB 站点的配置就可以，很宽泛的。
- 传输计数器是一个自减计数器。如果自减计数器已经减到 0,想再写一个数进去，此时**需要先关闭 DMA 使能**，再写传输计数器，最后再打开 DMA 使能。

## PID 倒立摆控制项目

[江科大是神之 PID 控制](https://www.bilibili.com/video/BV1G9zdYQEr3)

### 电机定速控制

1. PID 控制的输出是 PWM，可以看作是驱动力大小；调控量可以是位置/速度。如果是速度，要注意，PWM 的极性和编码器极性相符，否则会导致 PID 进入正反馈，电机在受到一点扰动后直接以最高速旋转。出现正反馈时要考虑是不是**极性问题**。
2. PID 控制的输出量要进行一定限幅，限幅范围取决于输出量的物理含义，比如 PWM 就限幅在-100~100
3. PID 三个参数的取值范围，取决于`输入值范围/输出值范围`，每个项目不一样，要针对性考虑。
4. PID 调参顺序一般是 P、I、D。
5. 在调参的时候，刚开始设置 Ki 的值是 0，所以需要对累积误差做出规定，只有当 Ki 不等于 0,也就是存在积分调控的时候，才累计计算误差。否则，如果程序进行了很长时间都没有 Ki 输入，这个时候误差累计很大了，再突然给 Ki 值，就会存在一个突然的输出，容易崩坏硬件。
6. 在突然加载或减载的过程中，会使得 PID 输出有个向上过冲或者向下过冲的尖峰，这个是闭环控制的普遍现象。可以考虑加入微分项解决。
7. 增量式 PID 只改$\Delta Out$，所以如果调控过程中，让 KpKiKd 都等于 0,这个时候再更改 target 的值，不会使电机再跟踪目标值，也就是说这个时候电机转化为**手动控制**！而增量式的好处在于：能够平滑地使电机从手动控制转为自动控制。且增量式不会受到积分饱和的影响。

### 电机定位置控制

1. 定位置控制的稳态误差很小，因为输出值为 0 时，电机位置不会自发的偏移，但是速度会因为摩擦而下降，所以定速控制有稳态误差，定位置控制很小。这个稳态误差的来源是，因为电机在力很小的时候，会由于摩擦导致转动不起来。所以稳态误差有两类：1. 输出值为 0 时，系统实际测量值的自发偏移；2. 输出值很小时，无法对系统实际测量值造成影响。
2. 增量式做定位置控制时，会引入历史信息。一旦历史上有噪声，单纯的比例控制就无法恢复这个误差，需要引入积分项，是增量式的缺陷所在。

#### 积分分离

出现现象：定位置控制时，如果加入 I 项，会出现超调；但是定速度控制，加入 I 项波形很完美。

原因；定位置控制，保持位置恒定，不需要有输出力，I 项在逼近目标值积累的误差，需要用超调来抵消；而定速控制，保持速度恒定，需要持续输出力，I 项在逼近目标值积累的误差产生的力，和需要抵抗的摩擦力抵消了。

- 积分分离实现思路：对误差大小进行判断，如果误差绝对值小于指定阀值，则加入积分项作用，反之，则直接将误差积分清零或不加入积分项作用

### 倒立摆双环 PID 控制

- 双环的调控周期，一般是外环的调控周期>=内环的调控周期
- 双环的核心：**外环的输出是内环的目标值**。
- 调参：因为内环可以独立工作，所以要先把内环参数调好，再调整外环。
  ARR
