---
date: 2024-08-04
tag: robot
---

# CLI Tools

## ROS install

我安装的是 ROS2 Iron Irwini 版本，推荐使用 Debian packages 安装，消耗大约 2GB 空间，以下是官方教程

[installation tutorials](https://docs.ros.org/en/iron/Installation.html)

## Configure Environment

每次打开终端运行 ROS2 时都要获取一次配置文件：

```sh
source /opt/ros/iron/setup.bash
```

但如果不想每次进入都运行这条语句，可以将其写入终端启动脚本：

```sh
echo "source /opt/ros/iron/setup.bash" >> ~/.bashrc
```

## Turtlesim, ros2, rqt

### Installation

```sh
sudo apt update
sudo apt install ros-iron-turtlesim
sudo apt install '~nros-iron-rqt*'
```

### Run Turtlesim

开启一个终端：

```sh
ros2 run turtlesim turtlesim_node
```

该语句用于生成一个小乌龟～

再开启一个终端：

```sh
ros2 run turtlesim turtle_teleop_key
```

该终端用于遥控小乌龟，在 QWERTY 配置的键盘上，利用 F 键周围一圈的字母控制小乌龟朝向，利用上下左右方向键移动小乌龟

### 重映射（多 turtle 的控制）

利用 `rqt` GUI 的`/spawn` service 产生新的节点——`turtle2`

```sh
ros2 run turtlesim turtle_teleop_key --ros-args --remap turtle1/cmd_vel:=turtle2/cmd_vel
```

再在新建的终端上重新映射 `turtle1/cmd_vel` topic，由此可以将遥控控制权交给 `turtle2`

## Nodes

```sh
ros2 node list # 查看节点列表
```

生成 turtle 并打开遥控台后，会产生两个节点，利用`ros2 node list`命令查看节点，输出结果为：

```sh
/turtlesim      # turtle
/teleop_turtle  # 遥控台
```

> teleop 是 teleopration 的简称

### node info

```sh
ros2 node info <node_name> # 用于查看节点信息
```

我们查看`/turtlesim`和`/teleop_turtle`节点信息，输出如下：

::: tabs

@tab `/turtlesim`

```sh
/turtlesim
  Subscribers:
    /parameter_events: rcl_interfaces/msg/ParameterEvent
    /turtle1/cmd_vel: geometry_msgs/msg/Twist
  Publishers:
    /parameter_events: rcl_interfaces/msg/ParameterEvent
    /rosout: rcl_interfaces/msg/Log
    /turtle1/color_sensor: turtlesim/msg/Color
    /turtle1/pose: turtlesim/msg/Pose
  Service Servers:
    /clear: std_srvs/srv/Empty
    /kill: turtlesim/srv/Kill
    /reset: std_srvs/srv/Empty
    /spawn: turtlesim/srv/Spawn
    /turtle1/set_pen: turtlesim/srv/SetPen
    /turtle1/teleport_absolute: turtlesim/srv/TeleportAbsolute
    /turtle1/teleport_relative: turtlesim/srv/TeleportRelative
    /turtlesim/describe_parameters: rcl_interfaces/srv/DescribeParameters
    /turtlesim/get_parameter_types: rcl_interfaces/srv/GetParameterTypes
    /turtlesim/get_parameters: rcl_interfaces/srv/GetParameters
    /turtlesim/get_type_description: type_description_interfaces/srv/GetTypeDescription
    /turtlesim/list_parameters: rcl_interfaces/srv/ListParameters
    /turtlesim/set_parameters: rcl_interfaces/srv/SetParameters
    /turtlesim/set_parameters_atomically: rcl_interfaces/srv/SetParametersAtomically
  Service Clients:

  Action Servers:
    /turtle1/rotate_absolute: turtlesim/action/RotateAbsolute
  Action Clients:
```

@tab `/teleop_turtle`

```sh
/teleop_turtle
  Subscribers:
    /parameter_events: rcl_interfaces/msg/ParameterEvent
  Publishers:
    /parameter_events: rcl_interfaces/msg/ParameterEvent
    /rosout: rcl_interfaces/msg/Log
    /turtle1/cmd_vel: geometry_msgs/msg/Twist
  Service Servers:
    /teleop_turtle/describe_parameters: rcl_interfaces/srv/DescribeParameters
    /teleop_turtle/get_parameter_types: rcl_interfaces/srv/GetParameterTypes
    /teleop_turtle/get_parameters: rcl_interfaces/srv/GetParameters
    /teleop_turtle/get_type_description: type_description_interfaces/srv/GetTypeDescription
    /teleop_turtle/list_parameters: rcl_interfaces/srv/ListParameters
    /teleop_turtle/set_parameters: rcl_interfaces/srv/SetParameters
    /teleop_turtle/set_parameters_atomically: rcl_interfaces/srv/SetParametersAtomically
  Service Clients:

  Action Servers:

  Action Clients:
    /turtle1/rotate_absolute: turtlesim/action/RotateAbsolute
```

:::

## Topics

节点可以将数据发布到任意数量的 topics，并同时订阅任意数量的 topics。Topic 是数据在节点之间移动的主要方式之一，因此也是在系统的不同部分之间移动数据的主要方式之一。

![](https://docs.ros.org/en/iron/_images/Topic-MultiplePublisherandMultipleSubscriber.gif)

### `rqt_graph` 可视化 topic 框图

```sh
rqt_graph
```

启动 `rqt_graph` 工具

![](/images/Study/rqt_graph.png)

该图展示了`/turtlesim`节点和`/teleop_turtle`节点如何利用 topic 互相通信，节点 `/teleop_turtle` 正在向 `/turtle1/cmd_vel` topic 发送数据，并且 `/turtlesim`节点订阅了该 topic 以接收数据

### topic list

```sh
ros2 topic list # 展示所有 topic 列表
ros2 topic list -t # 返回相同的列表，但是展示 topic 类型
```

```sh
/parameter_events [rcl_interfaces/msg/ParameterEvent]
/rosout [rcl_interfaces/msg/Log]
/turtle1/cmd_vel [geometry_msgs/msg/Twist]
/turtle1/color_sensor [turtlesim/msg/Color]
/turtle1/pose [turtlesim/msg/Pose]
```

### topic echo（监听 topic）

```sh
ros2 topic echo <topic_name>
```

如果我们新开启一个终端，输入`ros2 topic echo /turtle1/cmd_vel`，起初并不会有数据返回，但是当开始利用遥控台移动小乌龟时，`echo`命令就会返回`/cmd_vel`运送的数据，是用户发出的指令，也是小乌龟的线速度和角速度。

### topic info

```sh
ros2 topic info <topic_name> # 返回节点信息
```

### ros2 interface show && ros2 topic pub

```sh
ros2 interface show geometry_msgs/msg/Twist # 通过该命令显示某类型 topic / service / action 的数据结构
# 这里就在要求显示/turtle1/cmd_vel作为geometry_msgs/msg/Twist类型的数据结构
```

返回值：

```sh
# This expresses velocity in free space broken into its linear and angular parts.

    Vector3  linear
            float64 x
            float64 y
            float64 z
    Vector3  angular
            float64 x
            float64 y
            float64 z
```

如果要用命令行赋值给`/turtle1/cmd_vel` topic，则需要利用以下命令：

```sh
ros2 topic pub <topic_name> <msg_type> '<args>'
```

> 其中 `<args>`为 YAML 格式

输入：

```sh
ros2 topic pub --once /turtle1/cmd_vel geometry_msgs/msg/Twist "{linear: {x: 2.0, y: 0.0, z: 0.0}, angular: {x: 0.0, y: 0.0, z: 1.8}}"
```

即可控制小乌龟画一个圆（角速度恒定 + 线速度恒定）

`topic pub` 选项列表：

- `--once` 发布一条消息就退出（执行一次就退出）
- `--rate <num>` 指定以怎样的频率发布消息（执行命令）

### ros2 topic hz

```sh
ros2 topic hz /turtle1/pose # 查看数据发布速率
```

返回：

```sh
average rate: 59.354
  min: 0.005s max: 0.027s std dev: 0.00284s window: 58
```

## Services

service 基于 request-response 模型，而不是主题的发布者 - 订阅者模型。虽然 topic 允许节点订阅数据流并获得持续更新，但 service 仅在客户端专门调用时提供数据。

![](https://docs.ros.org/en/iron/_images/Service-SingleServiceClient.gif)

### service list

```sh
ros2 service list [-t] # 查看已有服务数量 -t 选项负责显示服务类型
```

服务类型也可以通过`service type`命令得到

```sh
ros2 service type <service_name>
```

### service find

```sh
ros2 service find <type_name> # 查找所有特定类型的服务
```

### interface show

service 依旧可以支持接口显示

```sh
ros2 interface show <type_name>
```

服务类型的接口返回数据会带有一个`---`，其上方结构表示 request 结构，下方表示 response 结构，例如：

```sh
ros2 interface show turtlesim/srv/Spawn
```

输出：

```sh
float32 x
float32 y
float32 theta
string name # Optional.  A unique name will be created and returned if this is empty
---
string name
```

### service call

可以使用以下命令调用服务：

```sh
ros2 service call <service_name> <service_type> <arguments>
```

> 其中参数支持 YAML 语法

### service echo（service 监听）

要查看服务客户端和服务服务器之间的数据通信，可以使用以下命令来访问服务

```sh
ros2 service echo <service_name | service_type> <arguments>
```

但是 `service echo` 默认情况下是禁用的，若要启用他，用户必须在创建服务器客户端或服务器后进行调用 `configure_introspection`.

按照下方命令启动`configure_introspection`

```sh
ros2 launch demo_nodes_cpp introspect_services_launch.py
```

打开另一个终端并运行以下命令以启用`introspection_client` 和 `introspection_service`

```sh
ros2 param set /introspection_service service_configure_introspection contents
ros2 param set /introspection_client client_configure_introspection contents
```

这样才可以监听服务：
::: details 服务监听

```sh
ros2 service echo --flow-style /add_two_ints
info:
  event_type: REQUEST_SENT
  stamp:
    sec: 1709408301
    nanosec: 423227292
  client_gid: [1, 15, 0, 18, 250, 205, 12, 100, 0, 0, 0, 0, 0, 0, 21, 3]
  sequence_number: 618
request: [{a: 2, b: 3}]
response: []
---
info:
  event_type: REQUEST_RECEIVED
  stamp:
    sec: 1709408301
    nanosec: 423601471
  client_gid: [1, 15, 0, 18, 250, 205, 12, 100, 0, 0, 0, 0, 0, 0, 20, 4]
  sequence_number: 618
request: [{a: 2, b: 3}]
response: []
---
info:
  event_type: RESPONSE_SENT
  stamp:
    sec: 1709408301
    nanosec: 423900744
  client_gid: [1, 15, 0, 18, 250, 205, 12, 100, 0, 0, 0, 0, 0, 0, 20, 4]
  sequence_number: 618
request: []
response: [{sum: 5}]
---
info:
  event_type: RESPONSE_RECEIVED
  stamp:
    sec: 1709408301
    nanosec: 424153133
  client_gid: [1, 15, 0, 18, 250, 205, 12, 100, 0, 0, 0, 0, 0, 0, 21, 3]
  sequence_number: 618
request: []
response: [{sum: 5}]
---
```

:::

## Actions

Action 是 ROS 2 中的通信类型之一，用于长时间运行的任务。它们由三个部分组成：goal、feedback 和 result。action 基于 topic 和 service 构建。它们的功能类似于 service，只是可以取消 action。它们还提供稳定的 feedback，而不是返回单一响应的 service。

Action 使用 client - server 模型，类似于 publisher - Subscriber 模型（在 topic 教程中介绍）。“action-client”节点将目标发送到“action-server”节点，该节点确认目标并返回反馈流和结果。

![](https://docs.ros.org/en/iron/_images/Action-SingleActionClient.gif)

### Use Action

当我们打开遥控台时，我们在终端上看到的“利用 G|B|V|C|D|E|R|T 来旋转小乌龟”就是一个 action（第一个指令对应 `/cmd_vel` topic）

### About client and server

动作的客户端和服务器在节点信息的最后两行中有所体现，[点击](#node-info)返回至节点信息小节，对比`/turtlesim`和`teleop_turtle`节点信息中 action 的差别

### action operation

```sh
ros2 action list [-t] # 获取 action 列表，[-t] 选项支持显示 action 类型
ros2 action info <action_name> # 获取 action 信息，返回客户端与服务端的个数与 action 类型
ros2 interface show <action_type> 
# 返回 action 类型，两条---将返回值分为三个部分，从上到下依次是 goal, result, feedback的结构
ros2 action send_goal <action_name> <action_type> <values> # 发送 action 语句，<values>支持 YAML 格式
ros2 action send_goal <action_name> <action_type> <values> --feedback
# 若要查看目标 action 的反馈，请在最后加入 --feedback 参数
```

## Paraments

```sh
ros2 param list # 获取参数列表
ros2 param get <node_name> <parameter_name> # 获取参数类型和当前值
ros2 param set <node_name> <parameter_name> <value> # 设置并改变参数当前值
ros2 param dump <node_name> # 以 YAML 语法输出参数信息，支持重定向至 .yaml 文件以便于保存参数
ros2 param dump /turtlesim > turtlesim.yaml # 保存参数并重定向
ros2 param load <node_name> <parameter_file> # 加载参数文件至某一节点
ros2 run <package_name> <executable_name> --ros-args --params-file <file_name> # 可以在启动节点时就加载参数列表
```
