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

```
ws://<ip>:<port>/sensor/connect?type=<type dir>
```

链接中的参数`type`即表示传感器接口，`Sensor Server`中提供了一系列传感器接口的`type`，如对于`accelerometer-bma422`传感器，其`type`为`android.sensor.accelerometer`。[该网址](https://livepersoninc.github.io/ws-test-page/)提供了一个 web 端接口，用来测试传感器数据传输是否正常，打开网页后在`url`栏中输入上述`ws`地址，点击`connect`后，即可连接至移动端，并且实时读取传感器数据。

::: details 报错解决：an inscure WebSocket connection may not be initiated from a page loaded over HTTPS

我在 edge 浏览器打开测试网页后，输入正确的 `url` 后，连接不成功，但是我在移动端的火狐浏览器上是可以成功连接的，此时 PC 端报错为：

```
Failed to construct 'WebSocket': An insecure WebSocket connection may not be initiated from a page loaded over HTTPS
```

我去 Google 直接查了报错，查到了[这篇文章](https://stackoverflow.com/questions/28625351/uncaught-securityerror-failed-to-construct-websocket-an-insecure-websocket-c)，然后我跟着这篇文章将`url`地址改为`wss://`后，edge 一直显示`connecting`，但是始终连接不上移动端，结合这篇文章的思路，我怀疑是浏览器拦截了传输，于是在 Chrome 中打开测试网站，将原来的`url`填入，关闭网络代理后，PC 端与移动端连接成功。

~~省流：edge 不如 Chrome。~~
:::

## websocket

### Usage

websocket 为 python 的第三方库，需要安装，用 poetry 做包管理器：

```sh
poetry add websocket
```
