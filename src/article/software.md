---
date: 2024-02-16
sidebar: heading
category: 推荐
tag: 文章
---

# 软件推荐

## Windows

### PC 管理

#### Tai

[项目地址](https://github.com/Planshit/Tai)

该软件用于统计 Windows 各应用或网站的使用时长，统计准确，图表直观。

#### [Bandzip](https://www.bandisoft.com/)

压缩包管理工具，轻量，支持格式丰富，直接下载使用即可。

#### [Everything](https://www.voidtools.com/zh-cn/downloads/)

轻量的 PC 端文件搜索引擎，搜索速度快，范围全面，下载 64 位的安装版即可使用。

#### [geek](https://geekuninstaller.com/download)

轻量的 PC 端应用卸载程序，支持清理注册表残余文件，调用卸载程序快速，但有时因为卸载程序的特殊性，需要手动退出卸载程序，才可以开始注册表残余文件扫描。

> 在清理`steam`游戏时，卸载程序会启动`steam`，但是卸载后并不会退出`steam`进程，需要手动退出进程后，再清理注册表。

### 学习工具

#### [zotero](https://www.zotero.org/)

轻量、易用的文献管理工具，科研人必备，使用教程可以参考[B 站浙江工商大学视频教程](https://www.bilibili.com/video/BV1vS4y1q7uw)

开源！支持许多功能插件

- [反色](https://github.com/tefkah/zotero-night)
- [划词翻译](https://github.com/windingwind/zotero-pdf-translate)
- [Latex 引用](https://github.com/retorquere/zotero-better-bibtex/tree/v5.2.53)
- [茉莉花插件 - 处理中文（必装）](https://github.com/l0o0/jasminum)
- [阅读进度条](https://github.com/MuiseDestiny/zotero-style)

### 远程控制

#### [向日葵](https://sunlogin.oray.com/)

免费版功能丰富，对于个人而言足够用了。但是没法像华为生态一样，手动唤醒电脑，需要在两台设备同时在线时，才能启用远程控制。

### RAM Disk 设置

::: tip 是什么及为什么？

RAM Disk 是一种将内存用作硬盘的虚拟磁盘，用来存放系统临时文件，在关机后会自动释放，RAM Disk 将系统缓存独立出一个虚拟硬盘，该硬盘内存储的均为临时文件。

这样的好处在于，但凡是平常使用电脑需要用到临时文件的，都可以创建在该虚拟硬盘中，毕竟关机后自动释放盘内文件，省去手动删文件的麻烦。

:::

配置软件：[ImDisk ToolKit](https://sourceforge.net/projects/imdisk-toolkit/)（软件很轻量！只有 300 多 kb）

我的配置：

- `ImageFile` NULL
- `Driveletter` E(Arbitrary)
- `Size of virtual disk` 2048 MB(创建之后才发现太大太大了，1024MB 都够用)
- `Image file offset` 0
- `Device type`Harddisk Volume
- `Image File Access`Create viture disk in physical memory

其他选择默认配置，创建后格式化新硬盘即可使用。

该软件优点见[绝对值 x 博客横评](https://absx.pages.dev/articles/ramdisk.html#imdisk-toolkit)
