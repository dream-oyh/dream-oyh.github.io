---
Date: 2025-02-26
tag: proxy
---

# 代理相关

## 代理基础知识

### 什么是代理？

我们在浏览器进入某个网站时，会通过**端口**把这个需求给到代理软件，代理软件通过端口分流规则来决定是直连还是走代理。如果走代理，如：google.com，就需要把这个浏览器请求通过远程服务器的 inbound 端口输入给服务器，再由远程服务器的 outbound 端口发送请求给网站，这样就实现了墙内与墙外的连接。

V2ray 系列的代理实现逻辑是：

```shell
{浏览器} <--(socks)--> {V2Ray 客户端 inbound <-> V2Ray 客户端 outbound} <--(VMess)-->  {V2Ray 服务器 inbound <-> V2Ray 服务器 outbound} <--(Freedom)--> {目标网站}
```

也就是说 V2ray 系列代理会监听本机上的网站端口，通过这个网站端口拿到服务器请求，之后要过两道坎，第一个是通过 V2ray 客户端判断该请求是否需要走代理，如果需要走代理，再通过 VMESS 协议发送至 V2ray 远程服务器 inbound 端口，最后给到目标网站。（其中的连接是允许双向传递的，并且需要相应的通信协议相匹配）。所以浏览器配置代理时，需要配置的是发送给 V2ray 客户端的端口。

### 端口分流规则

端口分流指的是，在浏览器发出的所有指令中，代理软件需要区分到底哪些是被墙的，哪些没被墙。被墙的就需要走代理，没被墙的直接直连即可。

简单来说分为两种规则：**大陆白名单模式**和 **GFWList 模式**

- 大陆白名单模式：根据域名对应的 ip 获取地域属性，如果是在大陆境内，就走直连；如果 ip 不在大陆境内，就走代理。所以需要两个文件，一个是 geosite.dat 一个是 geoip.dat 这两个文件，用于判断域名是否在白名单和获取 IP 的地域属性。
- GFWList 模式：根据被墙的域名名单判断应该走代理 (proxy) 还是直连 (direct)

### 透明代理

1. 代理对于 client 是透明的，client 端无需进行任何配置。即无需修改请求地址，也无需采用代理协议和代理服务器进行协商。与之相对比的是 socks 代理或者 http 代理，需要在 client 端设置代理的地址，在发起请求时也需要通过代理协议告知代理服务器其需要访问的真实地址。
2. 代理对于 server 是透明的，server 端看到的是 client 端的地址，而不是 proxy 的地址。
3. 说人话：所有请求都走代理。
4. 透明代理也叫做 TUN 模式，V2rayN 在管理员模式运行下时可以启用 TUN。

### 什么是 UUID

## V2ray 系列

- V2rayN: Windows 前端
- V2rayA: 跨平台的代理客户端，通过 2017 接口接出一个网络面板，适合新手入门
- V2rayNG: V2ray 的 Android 前端

## V2rayA

Linux 服务器最好通过 V2rayA 入门代理，方便简单。操作都在网页（`127.0.0.1:2017`）上进行。

我的 Linux 版本：Ubuntu20.04

[V2rayA 参考文章](https://pengtech.net/network/v2rayA_install.html)

### 安装

- 安装 v2ray 内核

```shell
## 下载v2ray-core，并保存到tmp目录
$ wget -O /tmp/v2ray-linux-64.zip https://ghfast.top/https://github.com/v2fly/v2ray-core/releases/download/v5.24.0/v2ray-linux-64.zip

# 核对文件的指纹信息, 如果与以下输出一致则表示安装文件是安全的，否则请谨慎安装。
# 指纹信息可以在https://github.com/v2fly/v2ray-core/releases/download/v5.24.0/v2ray-linux-64.zip.dgst中找到
$ openssl dgst -SHA2-256 /tmp/v2ray-linux-64.zip
SHA2-256(/tmp/v2ray-linux-64.zip)= 2556dd39ac7c8dbc9de0fa2a539539e82ac864096d5eaa4191d97c22e1ee9a89

# 将其解压到/usr/local/v2ray-core， 需要root权限
sudo unzip /tmp/v2ray-linux-64.zip -d /usr/local/v2ray-core

# 将.dat文件拷贝到/usr/local/share/v2ray/
sudo mkdir -p /usr/local/share/v2ray/
sudo cp /usr/local/v2ray-core/*dat /usr/local/share/v2ray/
```

- 安装 V2rayA

对于 debian 系列发行版（Ubuntu, Mint, MX, Kubuntu, Zorin 等等），使用命令行安装：

```shell
# 下载debian安装包, 针对不同的硬件架构以下下载命令稍做调整即可.
# 所有安装包可以在这里找到https://github.com/v2rayA/v2rayA/releases/
wget -O /tmp/installer_debian_x64_2.2.6.3.deb https://ghfast.top/https://github.com/v2rayA/v2rayA/releases/download/v2.2.6.3/installer_debian_x64_2.2.6.3.deb

# 核对文件的指纹信息, 如果与以下输出一致则表示安装文件是安全的，否则请谨慎安装。
# 权威指纹信息可以在github release download 同级目录下找到。
$ openssl dgst -SHA2-256 /tmp/installer_debian_x64_2.2.6.3.deb
SHA2-256(/tmp/installer_debian_x64_2.2.6.3.deb)= 51bf5501198397adb5f43b0d396893bfb544acc7a9eba08f9e07c19cd606cd0c

# 安装v2rayA
sudo apt install /tmp/installer_debian_x64_2.2.6.3.deb
```

- 配置：连接 v2rayA 和 v2ray-内核

```shell
sudo vim /etc/default/v2raya
```

添加两行环境变量：

```shell
# 将V2rayA和v2ray-core关联起来
# 添加配置两行配置
V2RAYA_V2RAY_BIN=/usr/local/v2ray-core/v2ray
V2RAYA_V2RAY_CONFDIR=/usr/local/v2ray-core
```

确保 iPv6 正常启用：

```shell
# 确保回环网卡开启了ipv6
sudo sysctl -w net.ipv6.conf.lo.disable_ipv6=0

# 修改/etc/sysctl.conf 回环网卡永久开启ipv6
sudo vi /etc/sysctl.conf
net.ipv6.conf.lo.disable_ipv6 = 0
```

### 使用

V2rayA 通过本机 2017 端口部署了网页端的 GUI 设置界面，方便配置代理文件。

- 本机部署网站：`localhost:2017`
- 服务器部署网站：`<公网IP>/<服务器域名>:2017`

通过浏览器进入部署网站进行配置。

使用流程：

- 注册账号
- 导入机场订阅的 url 和节点
- 进入节点列表标签页，选择有效的节点进行连接
- 左上角点击“启动”以启动 V2rayA 服务

测试是否配置成功：`curl google.com`

默认情况下 v2rayA 会通过 v2ray 内核开放 20170(socks5), 20171(http), 20172(带分流规则的 http) 端口作为代理端口（可以在 v2rayA 设置=>地址与端口 页面查看或修改端口）

### 问题列表

- 阿里云内部服务器`curl localhost:2017`可以访问 2017 端口，且安全组配置完好，但是外部无法进入。

原因：阿里云服务器设有内置防火墙（真坑啊。。），需要让内部防火墙允许 2017 端口使用。建议把内置防火墙直接关闭，[指路](../code/aliyun.md#问题列表)

解决方法：`iptables -I INPUT -p tcp --dport 2017 -j ACCEPT `
