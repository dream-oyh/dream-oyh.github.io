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
rosdep install -i --from-path src --rosdistro iron -y # 检查依赖完整性
colcon build --packages-select py_pubsub
```

再在另一个终端运行（导航至`ros2_ws`路径），首先获取安装路径，再运行`ros2 run`：

```sh
source install/setup.bash
ros2 run py_pubsub talker
```

再在另一个终端运行（导航至`ros2_ws`路径）：

```sh
source install/setup.bash
ros2 run py_pubsub listener
```

## Write a simple service and client

在两个节点使用 service 进行数据交换过程中，发出获取数据请求的是 client 节点，而响应要求的节点是 service 节点，请求和响应结构被 `.srv` 文件所定义

官网给出的例子是简单的两数相加系统，一个节点请求两数之和，另一节点通过响应返回计算结果。

### create a package

导航至 `ros2_ws/src`内：

```sh
ros2 pkg create --build-type ament_python --license Apache-2.0 py_srvcli --dependencies rclpy example_interfaces
```

其中`--dependencies`参数可以自动将 pkg 添加至`package.xml`文件中，不再需要手动加入。`example_interfaces`提供了请求和响应的数据结构。

### Write the service node

在`ros2_ws/src/py_srvcli/py_srvcli/`路径下，创建`service_member_function.py`，并加入下列代码：

```python
from example_interfaces.srv import AddTwoInts

import rclpy
from rclpy.node import Node


class MinimalService(Node):

    def __init__(self):
        super().__init__('minimal_service')
        self.srv = self.create_service(AddTwoInts, 'add_two_ints', self.add_two_ints_callback)

    def add_two_ints_callback(self, request, response):
        response.sum = request.a + request.b
        self.get_logger().info('Incoming request\na: %d b: %d' % (request.a, request.b))

        return response


def main():
    rclpy.init()

    minimal_service = MinimalService()

    rclpy.spin(minimal_service)

    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

在`setup.py`的`console_scripts`内添加入口点：

```python
'service = py_srvcli.service_member_function:main'
```

### Write the client node

在`ros2_ws/src/py_srvcli/py_srvcli/`路径下，创建`client_member_function.py`，并加入下列代码：

```Python
import sys

from example_interfaces.srv import AddTwoInts
import rclpy
from rclpy.node import Node


class MinimalClientAsync(Node):

    def __init__(self):
        super().__init__('minimal_client_async')
        self.cli = self.create_client(AddTwoInts, 'add_two_ints')
        while not self.cli.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('service not available, waiting again...')
        self.req = AddTwoInts.Request()

    def send_request(self, a, b):
        self.req.a = a
        self.req.b = b
        return self.cli.call_async(self.req)


def main():
    rclpy.init()

    minimal_client = MinimalClientAsync()
    future = minimal_client.send_request(int(sys.argv[1]), int(sys.argv[2]))
    rclpy.spin_until_future_complete(minimal_client, future)
    response = future.result()
    minimal_client.get_logger().info(
        'Result of add_two_ints: for %d + %d = %d' %
        (int(sys.argv[1]), int(sys.argv[2]), response.sum))

    minimal_client.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

`MinimalClientAsync `类构造函数使用名称 `minimal_client_async` 初始化节点。构造函数定义创建一个与服务节点具有相同类型和名称的客户端。**类型和名称必须匹配，客户端和服务才能进行通信。**构造函数中的 `while` 循环每秒检查一次与客户端的类型和名称匹配的服务是否可用。最后，它创建一个新的 `AddTwoInts` 请求对象。

在`setup.py`中`entry_points`里，加入进入点：

```Python
entry_points={
    'console_scripts': [
        'service = py_srvcli.service_member_function:main',
        'client = py_srvcli.client_member_function:main',
    ],
},
```

### Build and run

导航至`ros2_ws`，运行：

```sh
rosdep install -i --from-path src --rosdistro iron -y
colcon build --packages-select py_srvcli
```

在新终端内，导航至`ros2_ws`，运行：

```sh
source install/setup.bash
ros2 run py_srvcli service
```

再在新终端内，导航至`ros2_ws`，运行：

```sh
source install/setup.bash
ros2 run py_srvcli client 2 3
```

## Creating custom interface definitions

上述内容在调用消息和服务接口时，是直接利用了`example_interfaces`包中的`AddTwoInts`，下面的内容旨在说明如何自定义自己需要的数据类型，创建自定义的`.msg`和`.srv`文件。

### Create a new package

导航至`ros2_ws/src`，创建一个新的 package：

```sh
cd ros2_ws/src
ros2 pkg create --build-type ament_cmake --license Apache-2.0 custom_interfaces
```

值得注意的是，该接口只能采用`ament_cmake`来创建，然后在由 C++ 或 Python 创建的包内使用它。

`.msg`和`.srv`文件需要被分别存储在`msg`和`srv`文件夹内，请在`ros2_ws/src/custom_interfaces`内创建`msg`和`srv`文件夹

在`msg`文件夹内，新建文件`Num.msg`，并且用一行代码指定其数据结构：

```sh
int64 num
```

再创建一个`Sphere.msg`文件，指定数据结构如下。这个`.msg`文件使用了其他 message package.

```sh
geometry_msgs/Point center
float64 radius
```

回到`custom_interfaces/srv` 文件夹内，创建`AddThreeInts.srv`文件，并且写入指定数据结构：

```sh
int64 a
int64 b
int64 c
---
int64 sum
```

为了将自定义的接口转化为特定语言（C++ 或 Python），以便调取使用，需要在`CMakeLists.txt`中，加入下列代码：

```sh{4}
find_package(geometry_msgs REQUIRED)
find_package(rosidl_default_generators REQUIRED)

rosidl_generate_interfaces(${PROJECT_NAME}
  "msg/Num.msg"
  "msg/Sphere.msg"
  "srv/AddThreeInts.srv"
  DEPENDENCIES geometry_msgs # Add packages that above messages depend on, in this case geometry_msgs for Sphere.msg
)
```

> 注意这里的几行代码，需要加到`find_package(ament_cmake REQUIRED)`语句后面，直接丢到文档最后的话会报错，报错信息如下：
>
> ::: details 报错信息
>
> ```
> Starting >>> custom_interfaces
> --- stderr: custom_interfaces
> CMake Error at /opt/ros/iron/share/rosidl_cmake/cmake/rosidl_generate_interfaces.cmake:64 (message):
>   rosidl_generate_interfaces() must be called before ament_package()
> Call Stack (most recent call first):
>   CMakeLists.txt:31 (rosidl_generate_interfaces)
>
>
> ---
> Failed   <<< custom_interfaces [0.31s, exited with code 1]
>
> Summary: 0 packages finished [0.52s]
>   1 package failed: custom_interfaces
>   1 package had stderr output: custom_interfaces
> ```
>
> :::

### `Package.xml`

由于接口依赖于`rosidl_generate_interfaces`，以此来产生指定语言的代码，你需要在`package.xml`声明构建工具依赖。而`rosidl_generate_runtime`为运行时或执行阶段的依赖，需要添加在接口之后；`rosidl_interface_packages`是`custom_interfaces`的依赖组，利用`<member_of_group>`标签声明

```xml
<depend>geometry_msgs</depend>
<buildtool_depend>rosidl_default_generators</buildtool_depend>
<exec_depend>rosidl_default_runtime</exec_depend>
<member_of_group>rosidl_interface_packages</member_of_group>
```

### Build

在`ros2_ws`路径下：

```sh
colcon build --packages-select custom_interfaces
source install/setup.bash
```

测试：

```sh
ros2 interface show custom_interfaces/msg/Num
ros2 interface show custom_interfaces/msg/Sphere
ros2 interface show custom_interfaces/srv/AddThreeInts
```

