# V2ray

[官方文档](https://www.v2ray.com/)

## Install

Linux：

有桌面端的用户可以直接去 github 下载使用，下面是对于服务器无桌面交互界面的安装介绍：

官方给的安装`bash <(curl -L -s https://install.direct/go.sh)`已经过时了，运行之后会报错：

```sh
ERROR: This script has been DISCARDED, please switch to fhs-install-v2ray project.
HOW TO USE: https://github.com/v2fly/fhs-install-v2ray
TO MIGRATE: https://github.com/v2fly/fhs-install-v2ray/wiki/Migrate-from-the-old-script-to-this
```

而未安装 v2ray 前又没有代理可以进 GitHub，成为死循环，所以采用 snapcraft 方法：

```sh
sudo apt update
sudo apt install snapd
sudo snap install v2ray-core
```

## Config

可以考虑现在 win 上配好机场，然后再拷贝配置文件到服务器的`/root/config.json`中。

```sh
vim /root/config.json # 编辑config.json文件
v2ray run  # 启动v2ray(注意不要关闭该终端)
```

可以运行 curl 命令来测试代理配置是否成功：

```sh
curl -x socks5://127.0.0.1:10808 https://www.google.com -v
```
