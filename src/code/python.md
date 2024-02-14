# Python

## 为什么我选择了 Python

从大一我就开始接触 MATLAB，并且认为 python 能做的，MATLAB 也能做，而且实现起来更简单，毕竟 MATLAB 作为一个已经商业化的工具，其工作区的可视化和交互性、对于环境的依赖程度确实是 python 不可比拟的。

但是 MATLAB 完整体量高达 50G，对于磁盘的占用率是不言而喻的，Python 借用包管理器，将体量减小到 MATLAB 远不及的水平。其次，MATLAB 在拟合、神经网络、深度学习等领域，采用已经打包好的工具箱，这对于算法学习是极其不利的，但是 Python 通过各种库的调用，能够从底层逻辑实现各算法，对于个人学习而言是更为有益的。

## 包管理器

### pip 

这是 Python 自带的包管理器，但是存在一定的问题，后将其弃用，改用[poetry](/code/python.html#poetry-在用)，其问题可见[产品吐槽](/artical/weakness.html#pip)板块。

### poetry（在用）

听从[绝对值_x](https://absx.pages.dev/)的意见，选用了更为轻量且方便的 poetry 包管理器，有效解决了 pip 存在的两个问题，以下内容参考来源于[绝对值_x](https://absx.pages.dev/)博客。

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

## Python 各库学习使用

### [Pandas](/code/python/pandas.md)

### [爬虫](/code/python/web_crawler.md)

### [Seaborn 库——数据可视化](/code/python/Seaborn.md)

### [Pytorch](/code/python/Pytorch.md)