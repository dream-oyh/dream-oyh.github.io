---
date: 2024-02-27
icon: bianzubeifen8
category: Python 库
tag: 教程
---

# Websocket

突然想学这个包是因为我院测试技术与信号处理课程作业，老师给出的题目是：“调用手机中的传感器，显示参数的动态变化”，经过一番搜索我发现了 python 中`websocket`这个包，可以实现实时的手机传感器数据传输。

## Sensor Server

[Sensor Server 的 Github 仓库链接](https://github.com/umer0586/SensorServer)

Github 提供了一个开源的 Android apk，名为：“Sensor Server”，可以用来提供移动端传感器接口，利用`ws`互联网协议传输数据。移动端启动后，会提供一个 url，我们需要保证 PC 和移动端均连接到该 url 上。

`websocket`和`HTTPS`提供了类似的套接字定义，以下服务器 url，即是`Sensor Server`提供的服务器地址。

```
ws://<ip>:<port>/sensor/connect?type=<type dir>
```

链接中的参数`type`即表示传感器接口，`Sensor Server`中提供了一系列传感器接口的`type`，如对于`accelerometer-bma422`传感器，其`type`为`android.sensor.accelerometer`。[该网址](https://livepersoninc.github.io/ws-test-page/)提供了一个 web 端接口，用来测试传感器数据传输是否正常，打开网页后在`url`栏中输入上述`ws`地址，点击`connect`后，即可连接至移动端，并且实时读取传感器数据。

PC 端与服务器建立的链接为长链接，会不断从服务器读取传感器的参数值，并且返回一个`json`文件，其中的`values`便是传感器的测量值，各个传感器端口的`values`含义，可以在[该链接](https://developer.android.com/develop/sensors-and-location/sensors/sensors_motion?hl=zh-cn)中查找。

::: details 报错解决：an inscure WebSocket connection may not be initiated from a page loaded over HTTPS

我在 edge 浏览器打开测试网页后，输入正确的 `url` 后，连接不成功，但是我在移动端的火狐浏览器上是可以成功连接的，此时 PC 端报错为：

```
Failed to construct 'WebSocket': An insecure WebSocket connection may not be initiated from a page loaded over HTTPS
```

我去 Google 直接查了报错，查到了[这篇文章](https://stackoverflow.com/questions/28625351/uncaught-securityerror-failed-to-construct-websocket-an-insecure-websocket-c)，然后我跟着这篇文章将`url`地址改为`wss://`后，edge 一直显示`connecting`，但是始终连接不上移动端，结合这篇文章的思路，我怀疑是浏览器拦截了传输，于是在 Chrome 中打开测试网站，将原来的`url`填入，关闭网络代理后，PC 端与移动端连接成功。

后续：

第二天测试后，即使是在 Chrome 打开测试网站，依然无法 connect。

~~省流：edge 不如 Chrome。~~
:::

## websocket

[Documents](https://websocket-client.readthedocs.io/en/latest/)

### Usage

[websocket-client](https://github.com/websocket-client/websocket-client) 为 python 的第三方库，需要安装，用 poetry 做包管理器：

```sh
poetry add websocket-client
```

要使用 websocket-client，仅需要在 python 中`import websocket`即可。websocket 本质上是一个提供 PC 端与服务器连接的包，提供了两种连接方式，长连接和短连接，两种连接方式的差别可以见[这篇文档](https://cloud.tencent.com/developer/article/1640430)。

- 长连接：`websocket.WebSocketApp()`对象
- 短连接：`websocket.WebSocket()`对象

两种对象的参数和使用方法不太相同 ~~（设成相同的使用方式不好吗！）~~ ，具体可见[文档](https://websocket-client.readthedocs.io/en/latest/examples.html)（文档写的很详细啦！不想写教程啦！）

## Socket

在本次机器人视觉比赛过程中，用到了 TCP 通信协议给另外一台位于相同网段下的电脑传输数据，并且有一定的要求，说明如下。

裁判盒软件接收参赛软件的数据格式

|    内容    | 字节数 | 说明                                                                                                              |
| :--------: | :----: | :---------------------------------------------------------------------------------------------------------------- |
|  DataType  |   4    | 数据类型，值为 0 表示发送队伍 ID，要求 ID 格式为字母和数字的组合，中间没有空格；值为 1 表示发送 3D 识别结果文件； |
| DataLength |   4    | 其值为 N，即本次数据包 Data 的字节数                                                                              |
|    Data    |   4    | 实际接收数据内容，具体内容类型由 DataType 决定                                                                    |

> 采用大端的方式传输数据，例：直接将 int32 类型的 DataType、DataLength 复制到发送缓冲区的前 8 个字节，再将 Data 复制到发送缓冲区，最后发送数据。

```python
import socket
import time
def send_data(s, data_type, data):
    data_type_bytes = struct.pack(">I", data_type)
    data_length_bytes = struct.pack(">I", len(data))
    # 发送数据类型和数据长度
    s.sendall(data_type_bytes + data_length_bytes)
    # 发送实际数据
    s.sendall(data.encode("utf-8"))  # 假设数据是字符串

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connet(('ip-address', <port>))
send_data(s, 0, 'team-id')
time.sleep(1)
send_data(s, 1, 'START\n'+'Goal_ID=CA001;Num=1\n')
```

其中，`socket`是 python 自带的库，不需要安装环境，可以直接调用。

函数主体中，通过`socket.socket(socket.AF_INET, socket.SOCK_STREAM)`创建通信协议的客户端，通过`connect()`函数连接服务端。

前面这些都没啥问题，把我们卡住的是发送数据，一开始我们完全没看懂裁判盒给出的缓冲区啥的都是啥意思 ~~（虽然现在也不懂）~~，直到问了 GPT 才知道该怎么写。其中最核心的应该是`struct.pack`的打包机制。

> 有关“大端”数据发送，可以见[这篇文档](https://www.techtarget.com/searchnetworking/definition/big-endian-and-little-endian)，区别于“小端”数据发送，“大端”数据时更符合我们读写数据的自然逻辑的。

[struct 官方文档](https://docs.python.org/3/library/struct.html)——用来将字节打包成二进制数据。其中`>I`是对字节的格式化设置，`>`表示数据以大端的对齐方式发送，`I`表示数据以`Undesigned int`的格式发送。而`.pack(format, v1, v2)`函数返回一个包含值 v1、v2、...根据格式字符串格式打包。参数必须与格式所需的值完全匹配。

::: details 粘包问题解决
在实际应用的时候，我们需要先输送`0`，来告知队名，再输送`1`，来输送数据，但是如果把两行语句挨一块写，会导致缓冲区的数据量太大，从而导致粘包问题。

为此我们加入了`time.sleep(1)`来解决这个问题，先让前面一批数据传完，再传下一批数据。

这样确实能解决问题，在传完`0`之后，`1`也能够传成功了。但是问题又出现了，由于我们是一行一行传数据的，根据组委会要求，第一行是`START`，第二行数据是`Goal_ID=CA001;Num=0`，这样的话第二行数据传不过去，即使加入`time.sleep()`也只会传成功第一行数据。当时百思不得其解。

然后我同学提醒了我一句，粘包是针对多个包而言的，那你全打成一个包不就可以了，所以最后变成了：

```python
with open("data.txt", "r") as f:
    data = f.readlins()
d = ""
for i in range(len(data)):
  d += data[i]
send_data(s, 1, d)
```

具体原理是什么我现在也不清楚，但是加停止间隔、打包在一起发送，确实让数据传输变得非常稳定了。 ~~（没改之前也挺稳定的，稳定地每次都输不出去。。。）~~
:::
