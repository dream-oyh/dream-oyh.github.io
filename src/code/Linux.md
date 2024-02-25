---
date: 2024-02-20
icon: linux
category:
  - 计算机
  - 底层
tag: 笔记
---

# Linux

我对 Linux 的了解不深，甚至可以说只知道`sudo`在命令行提权，其他都没有做很深入的了解，目前我电脑上搭载的是 win 和 kubuntu 的双系统，之前在安装正统 ubuntu 的时候出现了极大的困难（读取不到显卡导致屏幕亮度无法调暗，极其影响使用体验）最后在朋友的帮助下安装了`kubuntu`。但是由于之前只分配了 40G 的内存，现在 linux 内存告急，以扩容为契机，我准备系统学习一下 linux 操作系统，所以也就新增了这个版块。

## 学习资料

在一个野生计算机学习者面前，目前我有的最详尽的资料就是[绝对值\_x 博客里的 Linux 介绍](https://absx.pages.dev/articles/linux)

有关计算机存储，可以看看[这篇文章](https://blog.csdn.net/weixin_43764974/article/details/132463833)

## 2024/02/21 对扩容的第一次尝试

::: tip 前置知识

1. 我的 ubuntu 搭载了 btrfs 作为文件系统，文件系统是一种用于向用户提供底层数据访问的机制，只有添加文件系统后，磁盘分区才可以被识别和挂载；windows 用的文件系统一般为 ntfs
2. 为分区添加文件系统的过程被称作“格式化”，该过程会清空磁盘内所有的文件数据
3. “挂载”的意思是，将一个文件系统与一个目录关联起来，这样用户就可以通过访问该目录来访问该文件系统
4. 磁盘分区被挂载后，linux 系统会在`/dev/`路径下添加一个文件，这个文件被叫做“设备”，也就是说`/dev/`文件夹下所存储的文件都是被 linux 识别到的设备
   :::

### 基本命令

```sh
btrfs filesystem show --mounted #查看已经挂载的btrfs
mount /dev/sdb /mnt  # 挂载btrfs
umount /mnt  # 卸载btrfs
btrfs filesystem resize max /mnt # 扩容命令，把/mnt挂载点对应分区扩容到最大

# 磁盘读取操作
parted -l # 会显示磁盘分区的起始点和结束点、大小和文件系统
df -hT # 显示设备名称、类型、大小、已用存储、挂载点
fdisk -l # 列出所有已格式化的分区
```

### 扩容思路

先从 windows 系统中压缩卷，腾出 10G 未格式化分区，然后通过`btrfs filesystem resize max /mnt`让 btrfs 自行寻找未格式化分区，并扩容。

但是这个思路失败了，终端返回了`Resize device id 1 from 40.00GB to max`，但是实际容量并没有增大，询问 GPT 后，发现了[ Gparted for linux 磁盘管理工具 ](https://zhuanlan.zhihu.com/p/621029482)，可以通过 linux 包管理器来安装：

```sh
sudo apt-get install gparted
```

打开 gparted 后，就可以以可视化的方式管理磁盘空间，右键分区，选择“resize/move”，就可以将分区扩容到最大。

::: details READ-ONLY 无法 resize 问题

点击`resize/move`后，系统提示该分区处于`read-only`状态，不可扩容，解决方法是：

右键该分区，点击属性，查看挂载点（注意一个分区可能有多个挂载点，像我就是挂到了`/` `/home` 还有一串和火狐有关的很复杂的挂载点，现在需要将所有点的挂载模式都改为`read-write`

修改指令为：

```sh
mount -o remount,rw <mouont dir>
```

`<mount dir>`需要输入磁盘挂载点，并且可以通过`mount`命令查看磁盘设备的挂载模式。
:::

在解决完上述问题后，`resize/move`可以正常运行，但是仍然无法扩容，原因在于未格式化分区在 ubuntu 系统分区的左侧，gparted 无法支持向左扩容。也因如此，第一次扩容尝试失败了，下次有机会再试试。
