---
date: 2024-02-17
icon: function
category: Python 库
tag: 教程
---

# Pytorch

[官网](https://pytorch.org/)

## Miniconda 配置 Pytorch

由于 poetry 配置 pytorch 很麻烦，所以我把 pytorch 配置在了 linux 环境下，并且采取 miniconda 作为包管理器。

到[官网的 Get started 文档](https://pytorch.org/get-started/locally/) 选择你的 PC 端配置，可以在终端用`nvidia-smi`命令查看 PC 的 `CUDA` 版本。我的配置是：

- `Pytorch Build` Stable(2.2.0)

- `Your OS` linux

- `Package` pip

- `Lanuage` python

- `Compute Platform` CUDA 11.8

运行以下代码来配置环境：

```sh
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```
