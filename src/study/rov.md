---
Date: 2025-08-01
tag: 科研
icon: Robot
---

# ROV

## 双模机器人

### 启动操作

- 硬件连接
  1. 机身后部（摄像头方向为前方）最大的黑色水密件连接即视为 ROV 启动
  2. 灰色盒子（电力载波）通电启动，灰盒上红色指示灯应点亮
  3. PC 用网线与灰盒连接
  4. 在 PC 端`设置` - `以太网` 中设置 PC 端 IP
     > - 编辑 ip 为“手动”
     > - 设置 ip 地址：`***.***.***.***`
     > - 子网前缀长度：24
     > - 网关：`***.***.***.***`
     > - cmd 内运行`ping $YOUR_IP$`测试连接是否正常，正常的话会收到 4 个数据包
- 软件 nomachine 连接
  - [nomachine 8.2.3 下载](https://kb.nomachine.com/SU11T00239)
  - PC 端连接上网线后，nomachine 会自动读取到从机，双击连接即可。

### 环境变量设置

- 加载 ROS 环境

```sh title="~/.bashrc"
source /opt/ros/noetic/setup.bash
source ~/catkin_ws0/devel/setup.bash # 本机中工作空间很乱，还未理清，经过测试后catkin_ws0是可以正常执行的工作空间
# 注意以上两条添加的先后顺序
```

- 设置主机 ip，在`~/.bashrc`最后写入（原本是为了主从机通信服务的，现在不需要，所以不需要加入从机的 ip）

```sh title="~/.bashrc"
export ROS_HOSTNAME=$YOUR_IP # 主机ip地址
export ROS_MASTER_URI=http://$YOUR_IP:11311 # 主机IP地址：11311端口号
export ROS_IP=$YOUR_IP # 主机IP地址
```

- 调整工作空间包路径
  已将`robot_serial`功能包从`dmuuv_src`中移到`src`根目录文件夹下， ==不知会不会有其他影响==，但是现在只有这样才能正常跑

### 功能包结构

`dmuuv_src`功能包中存放有几个子包，分别是；

- `dmuuv_msgs`: msg 类型定义
- `imu570_tools`: imu 通信
- `robot_controller`: 自定义控制器
- `robot_msgs`: msg 类型定义
- `robot_serial`: 与 stm32 通信
- `usb_cam`: 与相机通信

### 电机转动 PWM 控制测试

- stm32 通信连接的是`/dev/ttyUSB1`接口，给全部权限，运行如下命令（每次开机重启权限会重置，务必检查权限是否添加到位，否则会使串口启动失败）

```sh
sudo chmod 777 /dev/ttyUSB1
```

- 检查`robot_serial`功能包`launch`文件夹下`send_pwm.launch`启动文件，检查其连接串口应为`/dev/ttyUSB1`
- 硬件连接：各个电机的水密缆与腔体上的水密件分别连接，其中最中间的水密件是连接前方照明灯的，可以先不用连接。确保连接紧密后继续操作步骤。
- 启动 ROS 节点，以下命令需要分别在三个终端内运行：

```sh
roscore
roslaunch robot_serial send_pwm.launch

# 新开一个终端
cd ~/catkin_ws0/src/dmuuv_src/robot_controller/scripts
python test_pwm_keyboard.py # 启动用键盘控制电机转动pwm的控制节点
```

在第三个终端内便可以通过键盘控制各个电机的 pwm 值。

- 测试结果：
  - 图 1: 通过 py 程序操控电机时，py 上的顺序编号和水密件的映射关系
  - 图 2: 电机的硬件连接，电机编号和水密件的映射关系，电机编号见图 3
  - 图 3: 电机的布局，其编号和图 2 的编号一致，布局视角为 ROV 正放时的俯视图
  <div style="display: flex; justify-content: space-evenly;"> 
  <figure class="rov_motor_mapping_figure">
  <img class="rov_mortor_mapping_img" src="/images/rov/motor_hw_number.png" alt="通过py程序操控电机时，py上的顺序编号和水密件的映射关系"/> 
  <figcaption> 图1：通过py程序操控电机时，py上的顺序编号和水密件的映射关系 </figcaption>
  </figure>
  <figure class="rov_motor_mapping_figure">
  <img class="rov_mortor_mapping_img" src="/images/rov/motor_sw_number.png" alt="电机的硬件连接，电机编号和水密件的映射关系，电机编号见右图"/> 
  <figcaption> 图2：电机的硬件连接，电机编号和水密件的映射关系，电机编号见右图 </figcaption>
  </figure>
  <figure class="rov_motor_mapping_figure">
  <img class="rov_mortor_mapping_img" src="/images/rov/motor_layout.png" alt="电机的布局，其编号和左图的编号一致"/> 
  <figcaption> 图3：电机的布局，其编号和左图的编号一致 </figcaption>
  </figure>
  </div>

#### bug

- python 程序编码错误，导致中文注释无法识别

在程序最开始加上`#coding: utf-8`指明编码模式

- python 解释器错误：因环境不对，导致各类包未找到，比如这次没有找到`yaml`包

修改 shebang，将`#!/usr/bin/env python`修改为`#!/usr/bin/env python3`

## UUV Simulator

[官方文档](https://uuvsimulator.github.io/packages/uuv_simulator/intro/)

## UUV_Simulator 特性

### Actuators 执行器

通过`.xacro`文件配置

xacro 一种 xml 语言，用于构建 urdf 包，这个 urdf 包主要是用来搭建一个机器人的，可以用于配置机器人的传感器、模型、环境等信息。[官方文档](https://wiki.ros.org/xacro)

#### Thruster Unit 推进器单元

推进器单元包含转子的动力学和转换函数（转子角速度 - 输出推力大小之间的 conversion function）

- `dynamic`
- `conversion`

`<xacro:macro name="thruster_macro">`用于定义推进器单元，主要包括：`thruster link`, `joint`, `Gazebo plugin`

- `<link name="${robot_namespace}/thruster_${thruster_id}">`
  - `<inertial>`-标签，用于描述推进器转子的惯性质量等参数
  - `<visual>`-标签，不知道干啥使的（
- `<joint name="${robot_namespace}/thruster_${thruster_id}_joint>`
  - `<xacro:insert_block name="origin" />`
  - `<parent link="${robot_namespace}/base_link" />`-父标签，用于指定机器人机体
  - `<child link="${robot_namespace}/thruster_${thruster_id}" />`-子标签，用于指定机器人推进器
  - joint 用处是把机器人机体和推进器连接在一起
- `<plugin name="${robot_namespace}_${thruster_id}_thruster_model">`
  - `<linkName>`-thruster link 名字
  - `<jointName>`-jonit linke 名字
  - `<thrusterID>`-推进器 ID（但是这个信息已经在 Linkname 里面包含了，为什么还要再写一遍）
  - `<gain>`-获取输入命令信号
  - `<clampMax>`-可被允许的输入信号最大值
  - `<clampMin>`-可被允许的输入信号最小值
  - `<thrustMin>` `<thrustMax>`-可被允许的输出推力的最大最小值
  - `<thrust_efficiency>`-推进器效率
  - `<dynamics>`-动力学模型
  - `<conversion>`-转换模型

xacro 的宏定义包含：

- `macro`-定义新的宏
  - `name`参数可以指定该宏的名字，在之后通过`xacro:<name>`来调用这个新定义的宏
  - `param`参数可以指定该宏需要的输入参数，在之后调用时输入
- `insert_block`-插入代码块
- `property`-定义属性
- `box_inertial`-定义盒状物体的惯性参数
  - `<origin>`标签用于定义惯性参考系的位置和姿态，包含`xyz`和`rpy`参数

#### Fins Unit

包含：`dynamic model` and `a lift and drag model`

- `dynamic model`转子动力学
- `lift and drag model`升降力模型

定义和 thruster 单元类似，把`conversion`模型换成`liftdrag`

### Gazebo World 环境信息配置

通过`.world`文件配置

- `<physics>`- 配置物理引擎
  - `<ode>`-ode 微分方程求解器
- `<scene>`场景信息：白云、雾气等
- `<spherical_coordinates>`-坐标系放置的经纬度
- `<light>`-光照信息
- `<plugin name="underwater_current_plugin" filename="libuuv_underwater_current_ros_plugin.so">`-水流插件，需要配置水流速度大小与速度方向
- `<plugin name="sc_interface" filename="libuuv_sc_ros_interface_plugin.so"/>`-水下场景插件，管理水下环境特性
- `<gui>`-定义启动时相机视角

场景类型：

- `AUV Underwater World`-包含`FinPlugin`和`FinROSPlugin`插件，可以产生多个 AUV
- `Empty Underwater World`
- `Ocean waves world`

### Path and trajectory generators 路径和轨迹生成器

基于路径点产生轨迹，把任意路径**分成直线和曲线段**，利用参数方程定义轨迹，然后再根据方程生成路径点数据

两个功能包存放于`uuv_trajectory_control`中，分别为`uuv_waypoints`和`uuv_trajectory_generator`

## 项目结构

通过 uuv_simulator 能够创建一个新的机器人，在 uuv 所提供的环境下仿真。

- 创建一个机器人

```shell
rosrun uuv_assistants create_new_robot_model --robot_name <ROBOT_NAME>
```

这会创建一个名为`<ROBOT_NAME>_description`文件夹，该文件夹的结构为：

```
<ROBOT_NAME>_description
|-- launch
    |-- upload.launch
|-- meshes
    |-- README.md
|-- robots
    |-- default.xacro
|-- urdf
    |-- actuators.xacro
    |-- base.xacro
    |-- gazebo.xacro
    |-- sensors.xacro
    |-- snippets.xacro
`-- CMakeLists.txt
`-- package.xml
```

该文件夹可以认为是 ROS 的一个 package

- `upload.launch`: 是加载该机器人的 launch 文件
- `meshes/`: 该文件夹下放置有该机器人的 3D 模型文件，便于机器人的可视化呈现
- `urdf/`：该文件夹中包含有用来搭建一个机器人的，可以用于配置机器人的传感器、模型、环境等信息，用`.xacro`文件配置，采用`xml`文件配置，机器人的[Actuators 执行器](#actuators-执行器)就是用这个文件夹来定义的。
- `robot/`：该文件夹中用`.xacro`配置一个机器人的基本信息，但是通过调用`urdf/`的包，把推进器、传感器等信息连接起来。

## 添加自定义 launch 文件

- 在某个指定功能包的`launch`文件夹内添加`.launch`文件
- 在该功能包的`scripts`文件夹内添加`.py`脚本文件
- **运行命令：**`sudo chmod +x /path_to_python_file`为该 python 脚本文件添加权限

## 动力学相关

### TAM 矩阵

```shell
roslaunch <ROBOT_NAME>_control start_thruster_manager.launch reset_tam:=true
```

通过以上命令可以启动`thruster_manager`，可以通过设置`reset_tam:=false`来生成 tam 矩阵。

- tam 矩阵的用法：

tam 矩阵为`6x6`矩阵，各行各列意义如下：

- 行代表 6 个控制需求
  - 前 3 行：X、Y、Z 方向的力
  - 后 3 行：绕 X、Y、Z 轴的力矩（Roll、Pitch、Yaw）
- 列：代表 6 个推进器的贡献
  - 列 1-4：水平推进器（前左、前右、后左、后右）
  - 列 5-6：垂直推进器（左、右）

使用方式：`[推进器力] = TAM^(-1) * [期望控制力]`

Bluerov2 tam 矩阵如下：

```yaml
tam:
  - [0.7071067811847433, 0.7071067811847433, -0.7071067811919605, -0.7071067811919605, 0.0, 0.0]
  - [0.7071067811883519, -0.7071067811883519, 0.7071067811811348, -0.7071067811811348, 0.0, 0.0]
  - [0.0, 0.0, 0.0, 0.0, 1.0000000000000002, 1.0000000000000002]
  - [0.051265241636155506, -0.05126524163615552, 0.05126524163563227, -0.05126524163563227, -0.11050000000000001, 0.11050000000000003]
  - [-0.05126524163589389, -0.051265241635893896, 0.05126524163641713, 0.05126524163641713, -0.002499999999974481, -0.002499999999974481]
  - [0.16652364696949604, -0.16652364696949604, -0.17500892834341342, 0.17500892834341342, 0.0, 0.0]
```

### 动力学公式

用 Fossen 的书是最权威的，为了方便查找，我把 Fossen 书中对应的页码索引列在此处

- 叉乘算子定义：P20

$$\boldsymbol{\lambda}\times \boldsymbol{a}:=\boldsymbol{S}(\boldsymbol{\lambda})\boldsymbol{a}$$

$$
\boldsymbol{S}(\boldsymbol{\lambda})=-\boldsymbol{S}^T(\boldsymbol{\lambda})=\left[
\begin{matrix}
0 & -\lambda_3 & \lambda_2 \\
\lambda_3 & 0 & -\lambda_1 \\
-\lambda_2 & \lambda_1 & 0 \\
\end{matrix}
\right], \boldsymbol{\lambda}=\left[
\begin{matrix}
\lambda_1 \\
\lambda_2 \\
\lambda_3 \\
\end{matrix}

\right]
$$

- 附加质量 + 质量矩阵：P182

$$
M=\left[
\begin{matrix}
    (m-X_{\dot{u}}) & 0 & 0 & 0 & 0 & 0 \\
    0 & (m-Y_{\dot{v}}) & 0 & 0 & 0 & 0 \\
    0 & 0 & (m-Z_{\dot{w}}) & 0 & 0 & 0 \\
    0 & 0 & 0 & (I_x-K_{\dot{p}}) & 0 & 0 \\
    0 & 0 & 0 & 0 & (I_y-M_{\dot{q}}) & 0 \\
    0 & 0 & 0 & 0 & 0 & (I_z-N_{\dot{r}}) \\
\end{matrix}
\right]
$$

- 阻尼矩阵：P182

$$
D=\left[
\small
\begin{matrix}
    -X_u & 0 & 0 & 0 & 0 & 0 \\
    0 & -Y_v & 0 & 0 & 0 & 0 \\
    0 & 0 & -Z_w & 0 & 0 & 0 \\
    0 & 0 & 0 & -K_p & 0 & 0 \\
    0 & 0 & 0 & 0 & -M_q & 0 \\
    0 & 0 & 0 & 0 & 0 & -N_r \\
\end{matrix}
\right]
$$

- 科里奥利力矩阵：刚体质量科里奥利力矩阵 P56，附加质量科里奥利力矩阵：P120

$$
C(v)=\left[
\begin{matrix}
    0 & 0 & 0 & 0 & (m-Z_{\dot{w}})w & (Y_{\dot{v}}-m)v \\
    0 & 0 & 0 & (Z_{\dot{w}}-m)w & 0 & (m-X_{\dot{u}})u \\
    0 & 0 & 0 & (m-Y_{\dot{v}})v & (X_{\dot{u}}-m)u & 0 \\
    0 & (m-Z_{\dot{w}})w & (Y_{\dot{v}}-m)v & 0 & (I_z-N_{\dot{r}})r & (M_{\dot{q}}-I_y)q \\
    (Z_{\dot{w}}-m)w & 0 & (m-X_{\dot{u}})u & (N_{\dot{r}}-I_z)r & 0 & (I_x-K_{\dot{p}})p \\
    (m-Y_{\dot{v}})v & (X_{\dot{u}}-m)u & 0 & (I_y-M_{\dot{q}})q & (K_{\dot{p}}-I_x)p & 0 \\
\end{matrix}
\right]
$$

- 静态水动力恢复力计算：P60，下面这是当重心和浮心重合时的情况
  $$
  \boldsymbol{\eta } = \left[
  \begin{matrix}
  (W-B)\sin (\theta) \\
  -(W-B)\cos (\theta )\sin(\phi) \\
  -(W-B)\cos (\theta )\cos(\phi) \\
  0 \\
  0 \\
  0 \\
  \end{matrix}
  \right]
  $$
- 动力学模型：P110
  $$M\dot{v} + C(v)v + D(v)v + g(\eta) = \tau$$

## 话题用法记录

- `/bluerov2/pose_gt`：存有当前 UUV 所处**位置坐标**和在**全局坐标系**下的 UUV **当前速度**
- `/bluerov2/thrusters/{i}/thrust`：各推进器的转速，可以通过监控该话题，获得推进器转速曲线
