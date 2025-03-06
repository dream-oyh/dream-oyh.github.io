---
Date: 2025-02-21
tag: 科研
---

# UUV Simulator

[官方文档](https://uuvsimulator.github.io/packages/uuv_simulator/intro/)

## Actuators 执行器

通过`.xacro`文件配置

xacro 一种 xml 语言，用于构建 urdf 包，这个 urdf 包主要是用来搭建一个机器人的，可以用于配置机器人的传感器、模型、环境等信息。

### Thruster Unit 推进器单元

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

### Fins Unit

包含：`dynamic model` and `a lift and drag model`

- `dynamic model`转子动力学
- `lift and drag model`升降力模型

定义和 thruster 单元类似，把`conversion`模型换成`liftdrag`

## Gazebo World 环境信息配置

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


## Path and trajectory generators 路径和轨迹生成器

基于路径点产生轨迹，把任意路径分成直线和曲线段，利用参数方程定义轨迹，然后再根据方程生成路径点数据