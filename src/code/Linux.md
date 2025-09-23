---
date: 2024-02-20
icon: linux
tag: Linux
---

# Linux

我对 Linux 的了解不深，甚至可以说只知道`sudo`在命令行提权，其他都没有做很深入的了解，目前我电脑上搭载的是 win 和 kubuntu 的双系统，之前在安装正统 ubuntu 的时候出现了极大的困难（读取不到显卡导致屏幕亮度无法调暗，极其影响使用体验）最后在朋友的帮助下安装了`kubuntu`。但是由于之前只分配了 40G 的内存，现在 linux 内存告急，以扩容为契机，我准备系统学习一下 linux 操作系统，所以也就新增了这个版块。

## 学习资料

在一个野生计算机学习者面前，目前我有的最详尽的资料就是[绝对值\_x 博客里的 Linux 介绍](https://absx.pages.dev/articles/linux)

有关计算机存储，可以看看[这篇文章](https://blog.csdn.net/weixin_43764974/article/details/132463833)

## 基础命令

### 基础操作

```sh
mkdir <dir> # 创建文件夹
touch <dir> # 创建文件
ls # 列出当前目录下的所有文件，参数：-a, -l
cp <source> <dest> # 复制
mv <source> <dest> # 移动
```

### 磁盘操作

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

## 应用场景实例

### ubuntu 双系统安装

- [官网](https://cn.ubuntu.com/download/desktop)安装镜像文件，这没啥好说的，推荐将 U 盘制作成[ventoy](https://www.ventoy.net/cn/index.html)，这样只需要把.iso 镜像文件拷入 U 盘即可，不需要额外格式化 U 盘，可以存放多个镜像，U 盘也能正常当存储盘使用
- 预留好磁盘分区，50G 以上
- 插上 U 盘进入 BIOS，按照 U 盘启动，选择对应镜像，普通模式安装
- 按照步骤进行即可，注意选择安装位置时要选择`somthing else`
- 主要是内存分区麻烦，我这里安装了好几遍都是因为内存分区设置错误
  - 确认自己硬盘分区类型：进入 powershell，运行`get-disk`，看最后一列，确认自己硬盘分区是 GPT 还是 MBR
  - 如果是 GPT 分区，自行参考[文档](https://blog.csdn.net/wyr1849089774/article/details/133387874)
  - 如果是 MDR 分区，也自行参考上述文档，注意最后的时候不需要选择“安装启动引导盘的设备”选项

### 问题解决

#### Ubuntu 与 Win 双系统开机默认启动项问题

记住开机启动项的各选项索引（从 0 开始），比如说我的启动项顺序是：

- Ubuntu
- Advanced ...
- Win

则 Win 对应的索引是 2。

打开终端：

```sh
sudo gedit /boot/grub/grub.cfg
```

将`set_default="0"` 修改为`set_default="2"`即可

#### NVIDIA 驱动安装

进入 Software & Update，进入 Additional Drivers，选择 NVIDIA 的第一个驱动，右下角点击 `apply changes`即可。

- 如果没有出现英伟达驱动，是因为 nouveau 启用和英伟达冲突，关闭方法如下
  - `sudo vim /etc/modprobe.d/blacklist.conf` 并在文件最后添加
    - `blacklist nouveau`
    - `options nouveau modeset=0`
  - `sudo update-initramfs -u`
  - 重启系统即可

### WSL

- 20250226，我卸载了双系统，全面使用 WSL 进行 Linux 开发。
- 202506，我换电脑，重新使用双系统，因为 Isaac Sim 需要图形化系统进行开发

#### WSL 设置默认登录用户

```shell
wsl -l -v # 列出可用分发版名称列表
wsl --manage <Distro> --set-default-user <username> # <Distro>指定需要修改的分发版名称
```

在指定默认登录用户后，VSCode 编辑文件出现权限不足无法保存的情况，采用以下方法解决：

```shell
sudo chown -R username path
```

::: details 报错：权限不足无法保存文件

```shell
未能保存“plot_thruster.py”: 无法写入文件"vscode-remote://wsl+ubuntu/home/dream/catkin_ws/src/bluerov2/bluerov2_states/scripts/plot_thruster.py"(NoPermissions (FileSystemError): Error: EACCES: permission denied, open '/home/dream/catkin_ws/src/bluerov2/bluerov2_states/scripts/plot_thruster.py')
```

:::

#### WSL 迁移

WSL 默认在 C 盘存储，很占位置，准备把存储路径移动到 D 盘。

迁移前请先手动保存`~/.bashrc`文件，导入新路径后，该文件会被重置。

迁移过程：

1. `wsl -l -v` 确保 wsl 停止运行
2. 创建 D 盘目录：`mkdir D:\WSL\`
3. 导出 WSL：`wsl --export Ubuntu-20.04 D:\WSL\ubuntu.tar`
4. 卸载当前 WSL：`wsl --unregister Ubuntu-20.04`
5. 导入 WSL 进 D 盘：`wsl --import Ubuntu D:\WSL\Ubuntu D:\WSL\ubuntu.tar --version 2`
6. 设为默认的：`wsl --set-default Ubuntu`
7. 验证是否成功：`wsl`

移动之后终端会新建一个名叫`Ubuntu`的启动项，可以将原`Ubuntu 22.04 LST`的启动项删除。除此之外，可以在`~/.bashrc`中加入`cd /home/<usrname>`，默认使用原用户名登录（这里应该有更正式的改法，我这个属于歪门邪道了）

重新打开 wsl 后，我的 ros 无法启动，检查后发现 ros 等一系列`~/.bashrc`的环境变量不见了，**建议在迁移系统前额外手动保存一下`~/.bashrc`文件**。
