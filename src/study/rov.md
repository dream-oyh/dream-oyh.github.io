---
Date: 2025-08-01
tag: 科研
icon: Robot
---

# ROV

## ISAAC SIM

### Worksation installation

- 前置条件
  - Ubuntu: 20.04
  - Isaac Sim: 4.2.0
  - CUDA Toolkits: 11.7
- 安装流程

  - 从师兄那里拿到 isaac sim 4.2.0 的安装包并解压
  - CUDA 安装

    - 安装 CUDA11.7，[官方网站](https://developer.nvidia.com/cuda-11-7-0-download-archive)，推荐使用 runfile(local) 方式安装，其他两个似乎会在`apt install cuda`时下载最新版本
    - 运行`sudo sh cuda_11.7.0_515.43.04_linux.run`时，查看`/var/log/cuda-installer.log`文件会有报错：
      ```
      [INFO]: Executing NVIDIA-Linux-x86_64-515.43.04.run --ui=none --no-questions --accept-license --disable-nouveau --no-cc-version-check --install-libglvnd  2>&1
      [INFO]: Finished with code: 256
      [ERROR]: Install of driver component failed.
      [ERROR]: Install of 515.43.04 failed, quitting
      ```
      解决方法是：在安装时取消`deiver`选项，后期手动安装
    - [NVIDIA 官方网站](https://www.nvidia.com/en-us/drivers/)下载主机显卡对应的驱动，下载拿到的是`.run`程序，直接在控制台输入文件名`./*.run`运行即可。
    - `sudo vim ~/.bashrc` 编辑启动文件，加入下面两行：
      ```sh
      export PATH=/usr/local/cuda-11.7/bin:$PATH
      export LD_LIBRARY_PATH=/usr/local/cuda-11.7/lib64:$LD_LIBRARY_PATH
      ```
    - `source ~/.bashrc`
    - 运行`nvcc -V`，如有`11.7`版本输出，则可认为安装成功。重启电脑

  - Torch 环境安装
    我采用的是 poetry 做环境管理（理论上 conda 也可以安装，[参考官网](https://docs.isaacsim.omniverse.nvidia.com/5.0.0/installation/install_python.html#advanced-running-with-anaconda)）

    - poetry 环境是根据 `.toml` 文件安装包的，而 Isaac-sim 只提供了 `environment.yml` 依赖文件，所以需要手动转成`.toml`文件
    - 我的`.toml`文件如下

      ```toml title="pyproject.toml"
      [tool.poetry]
      name = "isaac-sim-4-2-0"
      version = "0.1.0"
      description = ""
      package-mode = false
      authors = ["<username>-linux <1399541701@qq.com>"]
      packages = [{include = "isaac_sim_4"}]

      [tool.poetry.dependencies]
      python = "^3.10"
      stable-baselines3 = "2.0.0"
      tensorboard = "2.11.0"
      tensorboard-plugin-wit = "1.8.1"
      protobuf = "3.20.3"
      torch = { version = "*", source = "torch" }
      torchvision = { version = "*", source = "torch" }
      torchaudio = { version = "*", source = "torch" }

      [[tool.poetry.source]]
      name = "torch"
      url = "https://download.pytorch.org/whl/cu117"
      priority = "explicit"

      [build-system]
      requires = ["poetry-core"]
      build-backend = "poetry.core.masonry.api"

      ```

    - 在`Isaac Sim`安装文件根目录下（就是师兄给的那个压缩包）
    - 执行`poetry new <package name>` 创建项目
    - 执行`poetry init` 创建 `.toml` 文件
    - 修改`.toml`文件
    - 执行`poetry install`安装环境

  - 运行 isaac sim
    - 执行`poetry run isaac-sim.selector.sh`，然后点击第一项`Isaac Sim`启动
    - 等待一会儿后即可正常启动~首次加载会比较慢

## ISAAC LAB 安装

我的设置不适用于大多数人，因为执着于用 poetry 管理包环境（

1. 编辑`~/.bashrc`，设置 ISAASIM 的根目录

```sh
# Isaac Sim root directory
export ISAACSIM_PATH="${HOME}/.local/share/ov/pkg/isaac-sim-4.2.0"
```

2. 设置`python`执行环境（问题分析）

这步有些复杂了。下面是官网要求的配置项：

```sh
# Isaac Sim python executable
export ISAACSIM_PYTHON_EXE="${ISAACSIM_PATH}/python.sh"
```

但是这有个问题，这个启动脚本会构建一个纯粹的、自包含的运行环境。它会把 Isaac Sim 自己的内部库路径添加到 `PYTHONPATH` 中，而不知道 poetry 所生成的虚拟环境，无法读取到需要的包。所以会出现两个矛盾的情况：

- 如果用`${ISAACSIM_PYTHON_EXE}`启动脚本，会无法读取 poetry 管理的包，提示`no module ...`
- 如果用`poetry run python`启动脚本，会丢失相关`isaacsim`的相关启动文件，提示`no module 'isaacsim' found`，所以应该采取一个两种兼顾的方法。

3. 在`isaac sim`根目录下设置`run.sh`脚本文件，设置如下，即：把 poetry 环境下安装的包和依赖，都一并传给`${ISAACSIM_PATH}/python.sh`作为启动文件，这样启动 python 脚本就既可以拿到`isaacsim`的启动文件，又能拿到 poetry 虚拟环境下的库文件。

```sh title="run.sh"
#!/bin/bash

# 检查是否提供了脚本参数
if [ -z "$1" ]; then
    echo "错误: 请提供一个要执行的 Python 脚本路径。"
    echo "用法: ./run.sh path/to/your/script.py"
    exit 1
fi

# 动态获取 Poetry 管理的 site-packages 目录路径
# 这使得脚本非常健壮，即使虚拟环境的位置改变也能工作
POETRY_SITEPACKAGES=$/home/<username>/data/isaac-sim-4.2.0/.venv/lib/python3.10/site-packages

# 设置 ISAACSIM_PATH，如果它没有被设置为环境变量的话
# 修改成你自己的 Isaac Sim 安装路径
ISAACSIM_ROOT=${ISAACSIM_PATH:-"/home/<username>/data/isaac-sim-4.2.0"}

echo "使用的 Poetry site-packages: $POETRY_SITEPACKAGES"
echo "使用的 Isaac Sim 根目录: $ISAACSIM_ROOT"
echo "-----------------------------------------------------"

# 使用 PYTHONPATH 环境变量来运行 Isaac Sim
# "$@" 会将所有传递给 run.sh 的参数原封不动地传递给 python.sh
PYTHONPATH=$POETRY_SITEPACKAGES $ISAACSIM_ROOT/python.sh "$@"
```

同时，设置`ISAACSIM_PYTHON_EXE`环境变量为该脚本，即：在`~/.bashrc`文件内添加环境变量：

```sh
export ISAACSIM_PYTHON_EXE="${ISAACSIM_PATH}/run.sh"
```

这样就可以按照官网所述正常运行脚本：

```sh
${ISAACSIM_PYTHON_EXE} ${ISAACSIM_PATH}/standalone_examples/api/omni.isaac.core/add_cubes.py
```

4. 克隆 IsaacLab 仓库，官网建议先 fork 再 clone

```sh
git clone git@github.com:<username>/IsaacLab.git
cd IsaacLab
```

5. 创建 Isaac Sim 符号链接

```sh
ln -s path_to_isaac_sim _isaac_sim
# For example: ln -s /home/nvidia/.local/share/ov/pkg/isaac-sim-4.2.0 _isaac_sim
```

6. 安装相关依赖

```sh
sudo apt install cmake build-essential
```

7. 安装需要的库，依旧想用 poetry 做包管理，所以修改如下所示：

:::: details

分析得非常到位！这是一个绝佳的问题，因为它直接触及了**如何将一个规范的、通用的开发工具（Poetry）集成到一个有自己特定启动和环境逻辑的大型框架（Isaac Lab）中**的核心。

答案是：**是的，为了让 Poetry 无缝工作，您需要对 `isaaclab.sh` 脚本进行一些精准的、最小化的修改。**

这个脚本设计得非常智能，但它的核心逻辑是围绕 **Conda** 和 **Isaac Sim 原生二进制安装** 这两种模式构建的，它本身并不认识 Poetry。

我们将通过修改脚本，让它能够识别并优先使用 Poetry 环境。

### 分析：`isaaclab.sh` 的关键冲突点

在您集成 Poetry 的工作流中，这个脚本有两大核心冲突点：

1.  **`extract_python_exe()` 函数**：这是最重要的函数。它负责决定“哪个 Python”将被用来执行命令（安装、测试、运行脚本等）。

    - 它会优先检查 Conda 环境 (`CONDA_PREFIX`)。
    - 如果不是 Conda，它会默认使用 Isaac Sim 的启动器 `_isaac_sim/python.sh`。
    - **问题**：它永远不会找到并返回您由 Poetry 创建的 `.venv` 虚拟环境中的 Python 解释器。

2.  **`-i, --install` 命令**：
    - 这个命令会调用 `extract_python_exe()` 来找到 Python，然后直接使用 `pip install`。
    - **问题**：这会完全绕过 Poetry 的依赖解析和 `poetry.lock` 文件，直接将库安装到 Isaac Sim 的原生环境或 Conda 环境中，从而破坏了使用 Poetry 的初衷。

### 修改策略：注入 Poetry 逻辑

我们的目标是**在不破坏脚本原有功能的前提下，让它优先识别 Poetry 环境**。我们将进行两处关键修改。

### 第 1 步：修改 `extract_python_exe()` 函数

这是最核心的修改。我们要在这个函数的最开始，加入一段逻辑来检测 Poetry 环境。如果检测到了，就直接返回 Poetry 环境中的 Python 路径，并结束函数；如果没有，就让函数继续执行它原来的 Conda 和原生逻辑。

找到 `extract_python_exe()` 函数，将其**完全替换**为以下内容：

```bash
# extract the python from isaacsim
extract_python_exe() {
    # -- START: POETRY MODIFICATION --
    # 1. Check if poetry is installed and a pyproject.toml exists in the project root.
    if command -v poetry &> /dev/null && [ -f "${ISAACLAB_PATH}/pyproject.toml" ]; then
        # 2. Ask poetry for the path to its virtual environment.
        local poetry_venv_path
        poetry_venv_path=$(poetry env info -p 2>/dev/null)
        # 3. If a path is returned, construct the path to the python executable.
        if [ -n "${poetry_venv_path}" ]; then
            local poetry_python_exe="${poetry_venv_path}/bin/python"
            # 4. If that python executable actually exists, use it.
            if [ -f "${poetry_python_exe}" ]; then
                echo "${poetry_python_exe}"
                return 0
            fi
        fi
    fi
    # -- END: POETRY MODIFICATION --

    # == ORIGINAL SCRIPT LOGIC (as a fallback) ==
    # check if using conda
    if ! [[ -z "${CONDA_PREFIX}" ]]; then
        # use conda python
        local python_exe=${CONDA_PREFIX}/bin/python
    else
        # use kit python
        local python_exe=${ISAACLAB_PATH}/_isaac_sim/python.sh

    if [ ! -f "${python_exe}" ]; then
            # note: we need to check system python for cases such as docker
            # inside docker, if user installed into system python, we need to use that
            # otherwise, use the python from the kit
            if [ $(python -m pip list | grep -c 'isaacsim-rl') -gt 0 ]; then
                local python_exe=$(which python)
            fi
        fi
    fi
    # check if there is a python path available
    if [ ! -f "${python_exe}" ]; then
        echo -e "[ERROR] Unable to find any Python executable at path: '${python_exe}'" >&2
        echo -e "\tThis could be due to the following reasons:" >&2
        echo -e "\t1. Poetry/Conda environment is not activated." >&2
        echo -e "\t2. Isaac Sim pip package 'isaacsim-rl' is not installed." >&2
        echo -e "\t3. Python executable is not available at the default path: ${ISAACLAB_PATH}/_isaac_sim/python.sh" >&2
        exit 1
    fi
    # return the result
    echo ${python_exe}
}
```

**修改解析：**

- 我们在函数开头增加了一个代码块。
- 它首先检查 `poetry` 命令是否存在以及项目根目录下是否有 `pyproject.toml` 文件。
- 如果存在，它会调用 `poetry env info -p` 来获取 Poetry 虚拟环境的路径。
- 如果成功获取，它就构建出该环境中 `python` 解释器的完整路径，并将其作为结果返回，**函数提前结束**。
- 如果以上任何一步失败（比如你没有使用 Poetry），代码块会无声地跳过，**脚本会继续执行下面原始的 Conda 和原生逻辑**，保证了向后兼容性。

### 第 2 步：修改 `-s, --sim` 命令（非常重要）

仅仅修改 `extract_python_exe` 还不够。当你运行模拟器（`-s`）时，它调用的是 `isaac-sim.sh`，这是一个需要 `PYTHONPATH` 才能找到你的库的启动器。而 `-p` 选项是直接运行 Python，修改第一步就够了。

所以，我们需要为 `-s` 命令注入 `PYTHONPATH`。

找到 `case "$1" in` 里的 `-s|--sim` 代码块，将其**完全替换**为以下内容：

```bash
        -s|--sim)
            # run the simulator exe provided by isaacsim
            isaacsim_exe=$(extract_isaacsim_exe)
            echo "[INFO] Running isaac-sim from: ${isaacsim_exe}"
            shift # past argument

            # -- START: POETRY MODIFICATION for PYTHONPATH --
            local poetry_site_packages=""
            # Check if we are in a Poetry project
            if command -v poetry &> /dev/null && [ -f "${ISAACLAB_PATH}/pyproject.toml" ]; then
                local poetry_venv_path
                poetry_venv_path=$(poetry env info -p 2>/dev/null)
                # If a venv exists, find its site-packages directory
                if [ -n "${poetry_venv_path}" ]; then
                    # Assuming python3.10 based on Isaac Sim version
                    poetry_site_packages="${poetry_venv_path}/lib/python3.10/site-packages"
                    echo "[INFO] Injecting Poetry site-packages into PYTHONPATH: ${poetry_site_packages}"
                fi
            fi

            # Execute with PYTHONPATH if available, otherwise run normally
            if [ -n "${poetry_site_packages}" ]; then
                PYTHONPATH=${poetry_site_packages} ${isaacsim_exe} --ext-folder ${ISAACLAB_PATH}/source $@
            else
                ${isaacsim_exe} --ext-folder ${ISAACLAB_PATH}/source $@
            fi
            # -- END: POETRY MODIFICATION --

            # exit neatly
            break
            ;;
```

**修改解析：**

- 在执行 `isaacsim_exe` 之前，我们加入了和之前类似的逻辑来检测 Poetry 环境。
- 如果检测到，它会构建出 Poetry 环境的 `site-packages` 目录的路径。
- 然后，它使用 `PYTHONPATH=${poetry_site_packages}` 的方式来启动模拟器，将我们的库路径临时注入进去。
- 如果没检测到 Poetry 环境，它就执行原始的命令，不注入任何东西。

### 您的全新工作流程

在完成了上述两处修改后，您的 Isaac Lab + Poetry 工作流将变得非常顺畅：

1.  **环境设置 (仅需一次)**：

    - 在 Isaac Lab 项目根目录（`isaaclab.sh` 所在的目录）下，创建 `pyproject.toml` 文件。
    - 运行 `poetry env use /path/to/isaac-sim/kit/python/bin/python3` 关联环境。

2.  **安装依赖**：

    - **不要再使用 `./isaaclab.sh -i`！**
    - 使用标准的 Poetry 命令：`poetry install` (安装 `pyproject.toml` 中的所有依赖) 或 `poetry add <package_name>` (添加新依赖)。

3.  **运行 Python 脚本** (例如，训练任务)：

    - `./isaaclab.sh -p source/standalone/tutorials/01_assets.py`
    - 脚本现在会使用 Poetry 环境中的 Python 和所有你安装的库来执行。

4.  **启动 Isaac Sim UI 并加载扩展**：
    - `./isaaclab.sh -s`
    - 脚本现在会自动将 Poetry 环境的 `site-packages` 注入 `PYTHONPATH`，Isaac Sim 将能成功 `import` 你用 Poetry 安装的所有库。

通过这两处最小化的修改，您成功地让 `isaaclab.sh` 这个强大的工具脚本拥抱了 Poetry 的依赖管理能力，实现了两全其美。

::::

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
