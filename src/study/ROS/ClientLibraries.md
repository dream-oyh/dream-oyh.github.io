---
date: 2024-08-09
tag: ROS
---

# Client Libraries

## Build packages

### install `colon`

```sh
sudo apt install python3-colcon-common-extensions
```

## Workspace

ROS 工作区是一个有特定结构的目录。通常含有 `src` 的子目录，其中存放 ROS Packages 的源码

`colcon` 可以完成资源构建，默认情况下，他会在 `src` 的同级目录下创建`build`, `install`, `log`目录。

- `build` 存储中间文件
- `install` 每个包会被安装进该文件夹
- `log` 日志文件

### underlay

可以理解为底层环境，ROS 为我们提供了丰富的资源，提供了构建其他包必须包含的基础环境，这称作 underlay

### Overlay

我们的工作区（后面会见到的`ros2_ws`路径，这也被称作 workspace 的根目录），又被称作在 ros2 环境下的 overlay，类似于 python 的虚拟环境，我们一般在 overlay 里运行包，而不是把所有包都放进同一个工作区

### Create a workspace

```sh
mkdir -p ~ros2_ws/src
cd ~ros2_ws/src
```

### Add some sources

ros2 提供了一个供测试的 demo，在`src`路径下运行：

```sh
git clone https://github.com/ros2/examples src/examples -b iron
```

### Build the workspace

```sh
colcon build --symlink-install
```

构建完成后，工作区根目录内就有`build` `install` `log` `src`四个文件夹。

其中 `install` 文件夹负责存储可执行的 packages，并且 colcon 负责在`install`文件夹中生成 bash 文件，用来设置环境。

```sh
source install/setup.bash
```

### Try a demo

```sh
ros2 run examples_rclcpp_minimal_subscriber subscriber_member_function
```

再在另一个终端运行：

```sh
ros2 run examples_rclcpp_minimal_publisher publisher_member_function
```

## Packages

ROS2 的包创建，使用 aments 作为构建系统，使用 colcon 作为构建工具，可以使用 CMake 或 Python 来创建包。

::: tip Packages 的最小组成（Python 实现）

`package.xml` 文件包含包的元数据

`resource/<package_name>` marker file for the package

`setup.cfg` 文件在包被执行时被需要，以此让 ros2 运行时可以找到他们

`setup.py` 包含如何安装包的指令

`<package_name> `- a directory with the same name as your package, used by ROS 2 tools to find your package, contains `__init__.py`
:::

### Create a package

```sh
cd ~/ros2_ws/src
ros2 pkg create --build-type ament_python --license Apache-2.0 --node-name my_node <package_name>
```

demo：

```sh
cd ~/ros2_ws/src
ros2 pkg create --build-type ament_python --license Apache-2.0 --node-name my_node my_package
```

### Build a package

```sh
cd ~/ros2_ws
colcon build
```

为了使用新的包，首先打开新的终端并且在`ros2_ws`路径下运行以下命令：

```sh
source install/local_setup.bash
```

### Use the package

```sh
ros2 run my_package my_node
```

## Write a simple publisher and subscriber

### Create a package

```sh
ros2 pkg create --build-type ament_python --license Apache-2.0 py_pubsub
```

### Write the publisher node

进入 `ros2_ws/src/py_pubsub/py_pubsub`目录，运行如下指令下载示例：

```sh
wget https://raw.githubusercontent.com/ros2/examples/iron/rclpy/topics/minimal_publisher/examples_rclpy_minimal_publisher/publisher_member_function.py
```

会得到一个 `publisher_member_function.py`文件，如果 wget 获取不到，可以手动创建，其代码如下：

::: details `publisher_member_function.py`文件内容

```python
import rclpy
from rclpy.node import Node

from std_msgs.msg import String


class MinimalPublisher(Node):

    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello World: %d' % self.i
        self.publisher_.publish(msg)
        self.get_logger().info('Publishing: "%s"' % msg.data)
        self.i += 1


def main(args=None):
    rclpy.init(args=args)

    minimal_publisher = MinimalPublisher()

    rclpy.spin(minimal_publisher)

    # Destroy the node explicitly
    # (optional - otherwise it will be done automatically
    # when the garbage collector destroys the node object)
    minimal_publisher.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

:::

需要注意的是，创建包时，若导入了外部包，需要在`ros2_ws/src/py_pubsub`路径下的`package.xml`文件内添加外部包名称

进入`package.xml`文件，修改`<exec_depend></exec_depend>`标签，并且在其中嵌入外部包名称。

如：

```xml
<exec_depend>rclpy</exec_depend>
<exec_depend>std_msgs</exec_depend>
```

### Add a entry point

打开`setup.py`,将信息与`package.xml`文件中的内容匹配，并且在`console_scripts`括号内添加下列脚本：

```Python
entry_points={
        'console_scripts': [
                'talker = py_pubsub.publisher_member_function:main',
        ],
},
```

### Check the setup.cfg

检查 `setup.cfg` 内容，保证其被正确产生：

```sh
[develop]
script_dir=$base/lib/py_pubsub
[install]
install_scripts=$base/lib/py_pubsub
```

这将告诉构建工具，将可执行文件放入`lib`文件夹内，因为 `ros2 run` 将会在这里找到他们。

### Write the subscriber node

创建`subscriber_member_function.py`文件，并且写入下方代码：

```python
import rclpy
from rclpy.node import Node

from std_msgs.msg import String


class MinimalSubscriber(Node):

    def __init__(self):
        super().__init__('minimal_subscriber')
        self.subscription = self.create_subscription(
            String,
            'topic',
            self.listener_callback,
            10)
        self.subscription  # prevent unused variable warning

    def listener_callback(self, msg):
        self.get_logger().info('I heard: "%s"' % msg.data)


def main(args=None):
    rclpy.init(args=args)

    minimal_subscriber = MinimalSubscriber()

    rclpy.spin(minimal_subscriber)

    # Destroy the node explicitly
    # (optional - otherwise it will be done automatically
    # when the garbage collector destroys the node object)
    minimal_subscriber.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

### Add an entry point

在`setup.py`中加入进入点

```python
entry_points={
        'console_scripts': [
                'talker = py_pubsub.publisher_member_function:main',
                'listener = py_pubsub.subscriber_member_function:main',
        ],
},
```

### Build and run

在`ros2_ws`下运行：

```sh
rosdep install -i --from-path src --rosdistro iron -y
```
