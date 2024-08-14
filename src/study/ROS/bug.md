---
date: 2024-08-14
tag: ros
---

# 问题列表

## WSL Ubuntu 20.04 安装 ros-noetic 失败

我在 WSL Ubuntu 20.04 安装 ros-noetic 过程中，提示 `no package found`，找不到对应的包。问题通过这篇博客解决了（[ref](https://blog.csdn.net/LaineGates/article/details/120910628)）

## acados 安装失败

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

##  `catkin_make`编译失败

（我全程是按着 bluerov2 给的步骤来运行的，除了上面标出的几处要更改的地方，这里已经运行到 bluerov2 仓库的`getting started`的最后一步）

### 第一次报错

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

### 第二次报错

```sh
matthew@UBUT:~/catkin_ws$ catkin_make
...
-- Using PYTHON_EXECUTABLE: /home/matthew/anaconda3/envs/torch/bin/python3
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

这是因为 catkin 找的 python 版本为 miniconda3 下面的版本（我的python环境配在虚拟环境里面），所以需要改为指定采用下面的命令：

```sh
catkin_make -DPYTHON_EXECUTABLE=/usr/bin/python3
```

### 第三和第n次报错

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