---
Date: 2025-02-23
tag: ros
---

# ROS

## Install

[Ubuntu 安装 ROS-noetic 官方文档](https://wiki.ros.org/noetic/Installation/Ubuntu)

## 安装步骤

- 添加源

```shell
sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'
```

- 设置密钥

```shell
sudo apt install curl # if you haven't already installed curl
curl -s https://raw.githubusercontent.com/ros/rosdistro/master/ros.asc | sudo apt-key add -
```

::: details 报错：gpg: no valid OpenPGP data found.

参考[ref](https://blog.csdn.net/weixin_43464623/article/details/118339598)之后，发现需要将管道符拆开运行

然后先运行了第一个 curl 命令，但是报错：

```shell
curl: (7) Failed to connect to raw.githubusercontent.com port 443: Connection refused
```

解决办法：

```shell
sudo vim /etc/hosts
```

在该文件中加入：

```shell
185.199.110.133 raw.githubusercontent.com
140.82.113.4 github.com
```

然后把管道符拆开再分别运行即可。
:::

- 安装 ROS

```shell
sudo apt update
sudo apt install ros-noetic-desktop-full
```

- 初始化 rosdep

```shell
sudo rosdep init
rosdep update
```

- 设置环境变量

```shell
echo "source /opt/ros/noetic/setup.bash" >> ~/.bashrc
```

- 安装 rosinstall

```shell
sudo apt install python3-rosinstall pytho3-rosinstall-generator python3-wstool build-essential
```

## 基础概念

- **节点**：执行单元，执行具体任务的进程、独立运行的可执行文件
- **节点管理器**（Node master）：控制中心，为节点提供命名和注册服务，跟踪和记录话题/服务通信，辅助节点相互查找和通信
- **话题**（Topic）：异步通信机制（没有办法知道发布者和订阅者是否及时收到，没有反馈），节点间用来传输数据的重要总线，发布/订阅模型（publisher, subscriber），数据从 Publisher 传输到 Subscriber。同一个话题的 Publisher 和 Subscriber 可以不唯一。
  - 适用场景：数据传输
- **消息**（Message）：话题数据，具有一定的类型和数据结构
  - 使用`.msg`文件定义消息结构，与编程语言无关
- **服务**（Service）：同步通信机制，使用客户端/服务器模型（Client, Server），客户端发布请求（request）数据，服务器完成后回应应答（response）数据。
  - 使用`.srv`文件定义请求和应答结构，与编程语言无关。
  - 适用场景：逻辑处理
- **参数**（Parameter）：全局共享字典，可通过网络访问的共享、多变量字典
- **功能包**（Packages）：ROS 中的基本单元，包含节点源码、配置文件、数据定义等
- **元功能包**（Meta Packages）：组织多个用于同一目的的功能包

## 命令行工具

- 最基础的小海龟：

```shell
roscore

rosrun turtlesim turtlesim_node

rosrun turtlesim turtle_telelop_key
```

可以通过`rqt`打开 qt 可视化工具，运行：

```shell
rqt
```

- `rosnode`

```shell
rosnode list # 列出所有节点列表
rosnode info <nodename> # 查看指定node信息
```

- `rostopic`

```shell
rostopic pub <topic_name> <message_type> "<messeage_content>"
# -r <pub_freq/Hz> 发布频率
```

- `rosmsg`

```shell
rosmsg show <message_type> # 显示指定消息结构
```

- `rosservice`

```shell
rosservice list  # 查看服务列表
rosservice call <service_name> <service_content> # 调用服务
```

- `rosbag`

```shell
rosbag record -a -O cmd_record # 话题记录
# -a 记录所有话题数据
# -O NAME 记录文件的文件名
rosbag play cmd_record.bag  # 话题复现
```

## 工作空间（Workspace）

- `src`：代码空间（Code Space）
- `build`：构建空间（Build Space）
- `devel`：开发空间（Development Space）
- `install`：安装空间（Install Space）

### 创建工作空间

```shell
mkdir -p ~/<Workspace_name>/src
cd ~/<Workspace_name>
catkin_init_workspace
```

### 编译工作空间

```shell
cd ~/<Workspace_name>
catkin_make
# 如果报错找不到python3-empy包的，可以运行：
catkin_make -DPYTHON_EXECUTABLE=/usr/bin/python3
catkin_make install # 产生安装空间
```

### 设置环境变量

```shell
source devel/setup.bash
```

### 检查环境变量

```shell
echo $ROS_PACKAGE_PATH
```

## 功能包

代码都要放在功能包里去编译，而不能全部放在`src`下去编译。一个工作空间不允许有两个同名功能包，但是不同的工作空间允许有同名功能包。

### 创建功能包

```shell
cd ~/<Workspace_name>/src
catkin_create_pkg test_pkg std_msgs rospy roscpp
```

其中`test_pkg`是功能包的名称，后面跟着的是创建这个包要用到的依赖。这些依赖会被记录在`package.xml`文件中。创建功能包之后，会在工作空间的`src`内新建一个`test_pkg`文件夹，这个功能包文件夹中包括：

- `src`-该功能包的代码文件
- `include`-cpp 头文件
- `Cmakelist.txt`
- `package.xml`

### 编译功能包

```shell
cd ~/<Workspace_name>
catkin_make
source ~/<Workspace_name>/devel/setup.bash
```

## 话题（Topic）

### publisher

一个 Publisher 的实现：

1. 初始化 ROS 节点
2. 向 ROS Master 注册节点信息，包括发布的话题名和话题中的消息类型
3. 创建 Massages 数据
4. 按照一定频率循环发送 Mssesages。

在`<package>/src`新建一个`.cpp`文件，写下面的代码，我这里是定义了名字为`learning_topic`的功能包，然后新建了`velocity_publisher.cpp`文件，其内容：

```c++ title="learning_topic/src/velocity_publisher.cpp"
#include <ros/ros.h>
#include <geometry_msgs/Twist.h>
int main(int argc, char **argv)
{
    ros::init(argc, argv, "velocity_publisher"); //初始化节点
    ros::NodeHandle nh;  // 初始化 node master
    ros::Publisher pub = nh.advertise<geometry_msgs::Twist>("/turtle1/cmd_vel", 10);  // 定义 publisher
    ros::Rate loop_rate(10); // 设置发布频率
    while (ros::ok())
    {
        geometry_msgs::Twist vel_msg;   // 设置消息对象
        vel_msg.linear.x = 0.5;    // 设置消息内容
        vel_msg.angular.z = 0.2;
        pub.publish(vel_msg);    // 发布消息
        ROS_INFO("Publishing velocity: %f, %f", vel_msg.linear.x, vel_msg.angular.z); // 打印终端日志
        loop_rate.sleep();  // 按照循环频率延时
    }
    return 0;
}
```

编译：

```shell
cd ~/catkin_ws
catkin_make
source devel/setup.bash
```

运行：

```shell
roscore
rosrun turtlesim turtlesim_node
rosrun learning_topic velocity_publisher
```

## Launch 文件

Launch 文件包含了节点的定义，和其他 Launch 文件（通过 include 标签来实现），可以说我们想在 ROS 内完成什么样的操作都需要用到 Launch 文件。

### 如何启动 launch 文件

- 命令行：`roslaunch package_name launch_file` 指定哪个 package 里的哪个 launch file
  > 一个 ROS 的 package 里要包含有`launch`,`scripts`文件夹
  >
  > - `launch`: 该文件夹中放置这个包的`.launch`文件
  > - `scripts`: 该文件夹中放置这个包中要用到的脚本文件，一般是 python 或者 c++
- 命令行：`roslaunch ~/.../.../launch_file` 直接指定 launch file 目录

### 如何写`.launch`文件

`.launch`文件采用`xml`格式，具体标签有：

- `<node>`：创建一个节点，含有如下参数：
  - `type=""`：该节点运行的脚本路径
    > 直接输入脚本文件名即可，注意脚本要放在`scripts`文件夹下
  - `pkg=""`：所使用的功能包，指定该脚本是来自于哪个功能包
  - `name=""`：节点名称，可以自定义
- `<include>`：执行外部`.launch`文件，含有如下参数：
  - `file=""`：用绝对路径，例如：`file="$(find bluerov2_description)/launch/upload.launch"`
  - `<arg name="" default="">`： `<include>`标签中可以添加`<arg>`参数，指定参数名称`name`和默认值`default`作为参数，这里的参数将会传进`<include>`所指定的`.launch`文件。
- `<arg name="" default="">`：定义参数，指定`name`和`default`
  > 如果`<arg>`放在最外层，是定义这个`.launch`文件的参数，如果是放在`<include>`里面，则是将参数传入上层`.launch`文件。可以用`$(arg name)`来解码该参数的值。

## 问题列表

### WSL Ubuntu 20.04 安装 ros-noetic 失败

我在 WSL Ubuntu 20.04 安装 ros-noetic 过程中，提示 `no package found`，找不到对应的包。问题通过这篇博客解决了（[ref](https://blog.csdn.net/LaineGates/article/details/120910628)）

### acados 安装失败

1. 注意，在一般用户环境下安装即可，不需要用 root
2. 参照[源库文档](https://docs.acados.org/installation/#linux-mac)安装，可以不用添加 optional parameter，我添加之后反倒安装不上 (报错是`~/acados/lib`找不到)

即：采用如下安装方法：

```sh
mkdir -p build
cd build
cmake -DACADOS_WITH_QPOASES=ON ..
make install -j4
```

添加环境变量的坑：bluerov2 仓库里写的是：

```sh
echo 'export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:"/root/acados/lib"' >> ~/.bashrc
echo 'export ACADOS_SOURCE_DIR="/root/acados"' >> ~/.bashrc
source ~/.bashrc
```

应该改为：

```sh
echo 'export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:"/home/user/acados/lib"' >> ~/.bashrc
echo 'export ACADOS_SOURCE_DIR="/home/user/acados"' >> ~/.bashrc
source ~/.bashrc
```

注意环境变量里不能用`~`.

### `catkin_make`编译失败

（我全程是按着 bluerov2 给的步骤来运行的，除了上面标出的几处要更改的地方，这里已经运行到 bluerov2 仓库的`getting started`的最后一步）

#### 第一次报错

```
The program 'catkin_make' is currently not installed. You can install it by typing:
sudo apt install catkin
```

然后在我`sudo apt install catkin`安装完之后，依然报错：

```
Reading package lists... Done
Building dependency tree
Reading state information... Done
Some packages could not be installed. This may mean that you have
requested an impossible situation or if you are using the unstable
distribution that some required packages have not yet been created
or been moved out of Incoming.
The following information may help resolve the situation:

The following packages have unmet dependencies:
 catkin : Depends: python-catkin-pkg but it is not going to be installed
E: Unable to correct problems, you have held broken packages.
```

解决方法如下：[ref](https://answers.ros.org/question/258444/sudo-apt-install-catkin-not-working/)

```sh
source /opt/ros/noetic/setup.bash
```

（可以考虑将这句命令加入至`~/.bashrc`中：）

```sh
echo "source /opt/ros/noetic/setup.bash" >> ~/.bashrc
```

#### 第二次报错

```sh
matthew@UBUT:~/catkin_ws$ catkin_make
...
-- Using PYTHON_EXECUTABLE: /home/dream/anaconda3/envs/torch/bin/python3
-- Using Debian Python package layout
-- Could NOT find PY_em (missing: PY_EM)
CMake Error at /opt/ros/noetic/share/catkin/cmake/empy.cmake:30 (message):
  Unable to find either executable 'empy' or Python module 'em'...  try
  installing the package 'python3-empy'
Call Stack (most recent call first):
  /opt/ros/noetic/share/catkin/cmake/all.cmake:164 (include)
  /opt/ros/noetic/share/catkin/cmake/catkinConfig.cmake:20 (include)
  CMakeLists.txt:58 (find_package)
...

```

这是因为 catkin 找的 python 版本为 miniconda3 下面的版本（我的 python 环境配在虚拟环境里面），所以需要改为指定采用下面的命令：

```sh
catkin_make -DPYTHON_EXECUTABLE=/usr/bin/python3
```

#### 第三和第 n 次报错

——一直提示找不到包，例如：

```
CMake Error at /opt/ros/kinetic/share/catkin/cmake/catkinConfig.cmake:83 (find_package):
  Could not find a package configuration file provided by
  "ddynamic_reconfigure" with any of the following names:

    ddynamic_reconfigureConfig.cmake
    ddynamic_reconfigure-config.cmake

  Add the installation prefix of "ddynamic_reconfigure" to CMAKE_PREFIX_PATH
  or set "ddynamic_reconfigure_DIR" to a directory containing one of the
  above files.  If "ddynamic_reconfigure" provides a separate development
  package or SDK, be sure it has been installed.
```

解决方法： [ref](https://github.com/IntelRealSense/realsense-ros/issues/980)

```sh
sudo apt install ros-noetic-ddynamic-reconfigure
```

从头到尾我一共安了这么多包：（这里要安装什么包视情况而定，根据报错决定）

```sh
sudo apt install ros-noetic-ddynamic-reconfigure
sudo apt install ros-noetic-gazebo-dev
sudo apt install ros-noetic-gazebo-ros
sudo apt install ros-noetic-nodelet
sudo apt install ros-noetic-mavros-msgs
sudo apt install ros-noetic-cv-bridge
sudo apt install ros-noetic-image-transport
sudo apt install ros-noetic-visualization-msgs
...
```

（安了好多奇奇怪怪的依赖，安到后面不想记了）

### `sudo rosdep init`运行失败

报错信息：

```sh
ERROR: cannot download default sources list from:
https://raw.githubusercontent.com/ros/rosdistro/master/rosdep/sources.list.d/20-default.list
ERROR: unable to process source [https://raw.githubusercontent.com/ros/rosdistro/master/rosdep/osx-homebrew.yaml]:
    <urlopen error [Errno 111] Connection refused> (https://raw.githubusercontent.com/ros/rosdistro/master/rosdep/osx-homebrew.yaml)
```

错误原因：githubusercontent 这个网站已经被墙了，无法连接，所以解决方法就是找到其镜像文件，从镜像源下载，具体解决方法参考[ref](https://blog.csdn.net/XCCCCZ/article/details/131756867)

看完这篇文章后，我用了这个解决方法成功解决问题：

```sh
sudo apt-get install wget
sudo mkdir -p /etc/ros/rosdep/sources.list.d
wget https://mirrors.tuna.tsinghua.edu.cn/github-raw/ros/rosdistro/master/rosdep/sources.list.d/20-default.list -O /etc/ros/rosdep/sources.list.d/20-default.list
export ROSDISTRO_INDEX_URL=https://mirrors.tuna.tsinghua.edu.cn/rosdistro/index-v4.yaml && rosdep update
```

### Rviz 无法显示模型

是由于硬件 GPU 加速导致的，修改环境变量：

```shell
export LIBGL_ALWAYS_SOFTWARE=1
```

### Bluerov2 MPC 控制器启动失败

::: danger 报错信息

```
/home/dream/catkin ws/devel/lib/bluerov2 mpc/bluerov2 mpc node: error while loading shared libraries: libgpAsEs e.so: cannot open shared obiect file: No such file or directory
```

:::

原因在于读取不到`libgpAsEs e.so`文件，方法是把`/path/to/acados/lib`添加进环境变量`$LD_LIBRARY_PATH`中：

```shell
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/path/to/acados/lib
```
