---
date: 2024-02-16
---

# Pytorch 的配置与基本操作

[官网](https://pytorch.org/)

[《动手学深度学习-Pytorch 版》学习文档](https://tangshusen.me/Dive-into-DL-PyTorch/)

[《动手学深度学习》原书文档](https://zh.d2l.ai/index.html)

## Miniconda 配置 Pytorch

由于 poetry 配置 pytorch 很麻烦，所以我把 pytorch 配置在了 linux 环境下，并且采取 miniconda 作为包管理器。

到[官网的 Get started 文档](https://pytorch.org/get-started/locally/) 选择你的 PC 端配置，可以在终端用`nvidia-smi`命令查看 PC 的 `CUDA` 版本。我的配置是：

- `Pytorch Build` Stable(2.2.0)
- `Your OS` linux
- `Package` conda
- `Lanuage` python
- `Compute Platform` CUDA 11.8
  运行以下代码来配置环境：

```sh
conda install pytorch torchvision torchaudio pytorch-cuda=11.8 -c pytorch -c nvidia
```

> **踩坑：**
>
> 如果决定采用`conda`做包管理器，就老老实实用`conda`创建虚拟环境，并且在虚拟环境中安装`pytorch`，GPU 加速版会大概占用 7 ～ 8 GB 空间，请注意磁盘空间的规划。不要像我一样没搞清楚，用了`conda`管理环境，又反用`pip`作包管理，最后这个环境整了一天才整出来

- 安装脚本

```sh
conda create -n torch python=3.9
conda activate torch
conda install pytorch torchvision torchaudio pytorch-cuda=11.8 -c pytorch -c nvidia
```

使用：

```python
import torch
```

## Tensor 创建及基本操作

```python
x = torch.tensor([1, 2])  # 指定数据创建 tensor
y = torch.empty(2, 3)  # 创建 2x3 空 tensor
x1 = torch.random(2, 3)  # 创建 2x3 随机 tensor
x2 = torch.zeros(2, 3, dtype=torch.long)  # 创建 long 型的 0 tensor
x3 = torch.ones(2, 3)  # 创建 2x3 全 1 tensor
tuple = x1.size()  # 返回一个 tuple，任何对于 tuple 的操作都可以适用

# 加法
x + y
torch.add(x, y, out=result) # 通过 out 参数指定输出
y.add_(x)  # pytorch 的 inplace 操作都有在最后加上下划线

```

### Torch 中的乘法

`Torch`包中包括多种乘法方式，具体的细则可以看[这篇博客](https://www.cnblogs.com/HOMEofLowell/p/15962140.html)

::: tip 总结

- `torch.mul()` 有广播机制，各个元素相乘
- `torch.multiply()` 与`torch.mul()`相同
- `torch.dot()`计算两向量的点积
- `torch.mv()` 计算矩阵和向量的乘积（二者一定有一个维度尺寸相同）
- `torch.mm()` 线代中严格的矩阵乘法
- `torch.bmm()` 批量矩阵相乘，比如$[b\times m\times n] * [b\times n \times p] = [b\times m \times p]$
- `torch.matmul()` 混合型矩阵乘法，会根据输入维度自动匹配，易出错，不建议使用。
  :::

的那是该博文中没有明确写`torch.matmul()`的用法，具体可以查[官方文档](https://pytorch.org/docs/stable/generated/torch.matmul.html)

### 索引

可以采用类似 numpy 的索引，`y=x[0,:]`，但是索引出的数据与原数据共享内存，修改一个另一个也会改变。

### 改变形状

`view(*size)`可以改变`tensor`的形状，同理，与原数据共享内存，可以理解为：view 仅仅是改变了对这个张量的观察角度，内部数据并未改变。

如果需要返回一个新的独立副本，应该先`clone`再`view`，即：`x.clone().view(3,5)`\

### 线性代数

与 MATLAB 语法类似：

|    语法     | 功能               |
| :---------: | :----------------- |
|   `trace`   | 矩阵的迹           |
|   `diag`    | 对角线元素         |
| `triu/tril` | 上三角或下三角矩阵 |
|    `mm`     | 矩阵乘法           |
|     `t`     | 矩阵转置           |
|    `dot`    | 矩阵内积           |
|  `inverse`  | 求逆矩阵           |
|    `svd`    | 奇异值分解         |

### Tensor 转 numpy

```python
a = torch.rand(2, 3)
b = a.numpy()
```

### numpy 转 Tensor

```python
a = torch.rand(2, 3)
b = a.from_numpy()
```

::: important 注意
以上两种方法得到的 Tensor/numpy 共享内存，改变一个另一个也会改变。
:::

### `Tensor`的存储和读取

```python
torch.save(x, 'tensor.pt')  # 保存
x = torch.load('tensor.pt')  # 读取
```

> `Tensor`的保存支持多种数据类型，可以是`Tensor`，也可以是`list`和`dictionary`，保存的 `Tensor` 和读取的 `Tensor` 具有相同的类型。`Tensor`会被保存到以`.pt`为后缀名的文件中。

## 自动求梯度

### `Function`对象

如果将其属性`.requires_grad`设置为`True`，它将开始追踪 (track) 在其上的所有操作（这样就可以利用链式法则进行梯度传播了）。完成计算后，可以调用`.backward()`来完成所有梯度计算。此`Tensor`的梯度将累积到`.grad`属性中。

如果不想要被继续追踪，可以调用`.detach()`将其从追踪记录中分离出来，这样就可以防止将来的计算被追踪，这样梯度就传不过去了。此外，还可以用`with torch.no_grad()`将不想被追踪的操作代码块包裹起来，这种方法在评估模型的时候很常用，因为在评估模型时，我们并不需要计算可训练参数`（requires_grad=True）`的梯度。

`Function`是另外一个很重要的类。`Tensor`和`Function`互相结合就可以构建一个记录有整个计算过程的有向无环图（DAG）。每个`Tensor`都有一个`.grad_fn`属性，该属性即创建该`Tensor`的`Function`, 就是说该`Tensor`是不是通过某些运算得到的，若是，则`grad_fn`返回一个与这些运算相关的对象，否则是`None`。

::: tip
这个 Function 能够反映该`Tensor`是如何被创建的，`print(x.grad_fn)`后可以显示其对象名称，包括但不限于：`<AddBackward>` , `<MeanBackward1>`, `<SumBackward0>`
:::

所以，梯度链一定是从一个 `Tensor(requires_grad=True)` 被创建开始的，这个 `Tensor`被称作叶子节点，Pytorch 提供了 `is_leaf()` 函数来角读取其是否为叶子节点。

### 梯度

首先我们得明白在计算流中反向传播的概念，推荐参考[colah's blog 有关反向传播的理解](http://colah.github.io/posts/2015-08-Backprop/)

::: important 前向传播与反向传播区别

**前向传播**：只能获得一个输出量对指定自变量的梯度

**反向传播**：遍历一次就可以获得输出量对于计算流图中任意节点的梯度
:::

**反向传播**的过程是累加的（这一部分还并没有找到相关原理的文章做支撑，暂且先记住），所以在反向传播之前需要将梯度清零。

#### 举例说明

现有如下 python 程序：

```python
import torch
x = torch.ones(2, 2, requires_grad=True)
y = x + 2
z = y * y * 3
out = z.mean()
```

$$out=\frac{1}{4}\Sigma_{i=1}^{4}3(x_i+2)^2$$

现在对`out`反向传播，并求`out`对`x`的梯度（在反向传播之前需要将 x 的梯度清零）。

```python
x.grad.data.zero_()
out.backward()
print(x.grad)
# 输出
tensor([[4.5000, 4.5000],
        [4.5000, 4.5000]])
```

> 现在看不懂可以不用纠结，因为我也不会（

## 学习资料

- [台大李宏毅深度学习作业安排](https://speech.ee.ntu.edu.tw/~tlkagk/courses_ML20.html)
