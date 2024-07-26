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

**新建项目：**

- `poetry new <package name>`
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

## GUI

我现在正在使用的 GUI 库是 customtkinter，其基于 python 原生 tkinter GUI 库开发，对原生控件在美观和易用性上做了处理，用熟练之后个人认为还是挺好用的（反正比原生好看太多），使用文档[在这](https://customtkinter.tomschimansky.com/documentation/) ~~文档写的依托~~，github 源码[点击此处](https://github.com/tomschimansky/customtkinter)

### 快捷键绑定

**踩坑 1：快捷键的前提是有焦点，但是焦点一般不在控件身上，而是在整个窗口上**

customtkinter 的每个 widget 都是支持快捷键的，并且提供了`bind()`函数绑定快捷键，但是这个前提在于，计算机系统的焦点要在该 widget 上。但是在刚进入窗口时，计算机的焦点是整个窗口，而非特定的 widget。

在查询很多资料后，我采用的方法是为窗口绑定快捷键。

```python
import costumtkinter as tk
app = tk.CTk()
app.bind("<Return>", lambda _: app.call_func())
app.mainloop()
```

这样窗口绑定了快捷键，并且与响应的回调函数匹配。

::: important 理解
这里的回调函数，是和你想要的那个按钮/标签/滑动条的参数匹配的，比如说，你的按钮回调函数是`step_forward()`，那这里的回调函数也是调用`step_forward()`函数，其实本质上是让 app 窗口替这个按钮执行该函数。

> 但是一般谁会想到让窗口代替执行啊，最直接的想法难道不就是让按钮直接绑定吗？可恶的 Tkinter

:::

**踩坑 2：回调函数的写法**

这里的之所以采用`lambda`关键字，是因为`bind()`的第二个参数会返回一个事件作为参数输入后面的函数中。但是在我的项目里，我是不需要这个事件作为输入的，所以采用`_`抛弃了这个参数。

其次，`lambda`里面的可调用对象是需要加`()`的，否则没法用。 ~~这个盲点看了好久才发现~~

**踩坑 3：按键的写法**

这里就不得不提到 python 里`事件`这个概念了，详情可以看[这篇博客](https://www.cnblogs.com/yuanqiangfei/p/11624546.html)，他对`事件`这个概念做了比较深的剖析，在这里说一下我的踩坑点和学到的快捷键。

1. 我本来想要设置`<Enter>`作为快捷键的，但是`<Enter>`代表的意思是鼠标进入窗口，真正的回车键应该打作`<Return>`
2. `<Key-s>`表示按下`s`键，`Key`三个字决定了这个信号来自键盘
3. `<Button-1>`表示按下鼠标左键，左中右三者数字分别是`123`，`<Button>`表示信号来自鼠标。

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

## 数据结构

### 列表 list 和元组 tuple

列表为一个由中括号`[]`括起来的一个数组，元组是小括号`()`，一般用列表，因为元组的内容在初始化之后就不可改变

列表支持的操作：

```python
len(list) # 返回列表个数
max(list) # 返回最大值
min(list) # 返回最小值
list.append(obj) # 在列表末尾添加新的对象
list.count(obj) # 统计某个元素在列表中出现的次数
list.sort(cmp=None, key=None, reverse=False) # 对原列表进行排序
list.pop([index=-1]) # 移除列表中的一个元素（默认最后一个元素），并且返回该元素的值
```

### 字典 dict

字典是 python 对哈希表的实现，由多项键值对组成

字典支持的操作：

```python
len(dict) # 返回字典键的个数
dict.get(key, default=None) # 返回指定键的值，如果值不在字典中返回 default 值
dict.values() # 以列表返回字典中的所有值
dict.pop(key[,default]) # 删除字典给定键 key 所对应的值，返回值为被删除的值。key 值必须给出。否则，返回 default 值。
```

### 集合

集合创建一个无序不重复元素集，可删除重复数据，还可以计算并集、交集、差集

创建集合方式：

```python
group = set(list) # 创建集合
x & y # 交集，包括同时在集合 x 和 y 中的共同元素
x | y # 并集，包括集合 x 和 y 中所有元素
x - y # 差集，包括在集合 x 中但不在集合 y 中的元素
x ^ y # 补集，包括集合 x 和 y 的非共同元素
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
os.mkdir('<dir>', exist_ok=True) # 创建指定目录
os.rmdir('<dir>') # 删除指定目录
```

### csv

> 2024.3 写视频打标签 GUI 工具的时候，师兄让我把标签写入 csv 文件，但是我对 pandas 又用的不熟练，就只能用 csv 先做一个替代，现将使用方式记录如下

#### csv 读取文件

读取文件我还是觉得 pandas 会更方便一点，用`.head()`和`.tail()`读取头行和尾行，再用`.iloc[]`定位到具体数值，比 csv 方便很多。

#### csv 写入文件

```python
with open("example.csv",mode = 'w', newline='') as f:
  csv.writer(f).writerow(data: list)
```

调用该语句就能在 csv 文件中写入`data`数据

> 我最开始的时候没加`newline=''`导致我遇到一个问题，就是我一旦`writerow`写进一个新的行，软件总会自动先跳一空行，再写入数据，就使文档结构很奇怪
>
> 网上查找后才发现需要加上`newline=''`参数，规避空行 ~~（python 设计师你怎么回事）~~

#### csv 追加文件

如果将`mode`设成`'w'`，会导致写入时覆盖已有数据。解决方法时将`'w'`修改为`'a+'`，将模式改为“追加”模式，这样再用`writerow`写入时，就会在 csv 文件的最下方加入新数据，而非完全覆盖了。

## 生成器函数

Python 中提供了关键字`yield`，用来定义生成器函数，可以看看[这篇教程](https://blog.csdn.net/mieleizhi0522/article/details/82142856)

## Async / Await 协程函数

Async 为 Python 提供了协程函数的定义，相较于传统的单线程工作方式，协程函数可以实现异步执行和多线程工作，并且可以暂停和恢复执行。

[tutorial](https://zhuanlan.zhihu.com/p/27258289)

async 定义了协程函数，await 定义了协程函数的暂停和恢复执行。
