---
date: 2024-01-24
icon: python
category: 编程
tag: 教程
---

# Python

## 为什么我选择了 Python

从大一我就开始接触 MATLAB，并且认为 python 能做的，MATLAB 也能做，而且实现起来更简单，毕竟 MATLAB 作为一个已经商业化的工具，其工作区的可视化和交互性、对于环境的依赖程度确实是 python 不可比拟的。

但是 MATLAB 完整体量高达 50G，对于磁盘的占用率是不言而喻的，Python 借用包管理器，将体量减小到 MATLAB 远不及的水平。其次，MATLAB 在拟合、神经网络、深度学习等领域，采用已经打包好的工具箱，这对于算法学习是极其不利的，但是 Python 通过各种库的调用，能够从底层逻辑实现各算法，对于个人学习而言是更为有益的。

## 包管理器

### pip

这是 Python 自带的包管理器，但是存在一定的问题，后将其弃用，改用[poetry](/code/python.html#poetry-在用)，其问题可见[产品吐槽](/artical/weakness.html#pip)板块。

### poetry（在用）

听从[绝对值\_x](https://absx.pages.dev/)的意见，选用了更为轻量且方便的 poetry 包管理器，有效解决了 pip 存在的两个问题，以下内容参考来源于[绝对值\_x](https://absx.pages.dev/)博客。

#### 安装

这里是 poetry 的[官方文档](https://python-poetry.org/docs/#installing-with-pipx)，安装方法：

```sh
pip install poetry
```

#### 配置

poetry 默认在 C 盘创建虚拟环境，不利于使用，将配置更改至项目所在文件夹，方便环境的调用和管理。

```sh
poetry config virtualenvs.in-project true
poetry config cache-dir D:\\poetry_enev
```

#### 基本命令

**新建项目：** `poetry new <package name>`

- 创建 `.toml` 文件：`poetry init`，然后跟着提示填入信息
  **包管理**

- 添加包：`poetry add <package name>`
- 移除包：`poetry remove <package name>`
- 列出可用包：`poetry show`
  **安装依赖**

- 从现有 `pyproject.toml` 安装：`poetry install`，会自动新建虚拟环境
- 从 `requirements.txt` 安装（不够完善）：`cat requirements.txt | xargs -I % sh -c 'poetry add "%"' (ref)`
  **虚拟环境**

- 激活：`poetry shell`
- 删除虚拟环境：`poetry env remove --all`
- 运行：`poetry run python <filename>.py`

### conda

拒绝 Anaconda 的大体积，建议安装 Miniconda 作为环境管理器。

#### 安装

::: tabs

@tab Windows

scoop 一行搞定

```sh
scoop install miniconda
```

@tab Linux

```sh
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh  # 接下来一路空格
```

:::

#### 基本命令

```sh
conda -V # 查看 conda 版本
conda create -n <name> python=<version> # 创建环境
conda activate <name> # 激活环境
conda deactivate    # 关闭环境
conda remove -n <name> --all  # 删除环境，也可进入 conda 安装目录下的 /envs/ 删除文件夹
conda list  # 查看环境内工具包
```

## 修饰符

### @classmethod

classmethod 修饰的方法不需要实例化，不需要 self 参数，但第一个参数需要是表示自身类的 cls 参数，可以来调用类的属性，类型，实例化对象等。

```python
class A(object):
  bar = 1
  def fun1(self):
    print("foo")
  @classmate
  def func2(cls):
    print ('func2')
    print (cls.bar)
    cls().fun1()   # 调用 foo 方法
A.func2()               # 不需要实例化
```

输出：

```
func2
1
foo
```

## 自带模块库

### os

`os`库让 Python 能够与系统命令行交互，通过 python 操作系统文件，运行脚本，基本命令如下：

```python
import os # 导入 os 库
os.chdir('/home') # 切换到指定目录
os.system('<cmd>') # 在命令行运行指定命令
os.listdir('.') # 列出当前目录下的文件
os.remove('<file>') # 删除指定文件
os.mkdir('<dir>') # 创建指定目录
os.rmdir('<dir>') # 删除指定目录
```

## 生成器函数

Python 中提供了关键字`yield`，用来定义生成器函数，可以看看[这篇教程](https://blog.csdn.net/mieleizhi0522/article/details/82142856)

## Async / Await 协程函数

Async 为 Python 提供了协程函数的定义，相较于传统的单线程工作方式，协程函数可以实现异步执行和多线程工作，并且可以暂停和恢复执行。

[tutorial](https://zhuanlan.zhihu.com/p/27258289)

async 定义了协程函数，await 定义了协程函数的暂停和恢复执行。
