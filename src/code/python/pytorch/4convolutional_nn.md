# 卷积神经网络

## 导入需要的包

```python
import torch
import torch.nn as nn
import torchvision
```

## 卷积运算函数

卷积运算包含输入数组`X`与核数组`K`，输出数组`Y`，我们在`d2l`库中定义卷积函数如下。

```python
# 本函数已封装在 d2lzh 包中
def corr2d(X,K):
  K_h, K_w = K.shape
  X_h, X_w = X.shape
  Y = torch.zeros((X_h-K_h+1, X_w-K_w+1))
  for i in range(Y.shape[0]):
    for j in range(Y.shape[1]):
      Y[i,j] = (X[i:i+K_h,j:j+K_w]*K).sum()
  return Y
```

## 二维卷积层

二维卷积层将输入数组和卷积数组做卷积运算，再加上一个标量偏差来得到输出。这个卷积数组的核中各元素值待定，标量偏差值待定，所以我们认为这是卷积层待训练参数，按照这个思路，我们就可以定义出==包含待训练参数（权重参数和偏差参数）的二维卷积层==，下面是代码实现。

> 也不一定有这么严格的定义，标量偏差定义为 0 也是没问题的。

```python
class Conv2D(nn.Module):
  def __init__(self, kernel_size):
    super(Conv2D, self).__init__()
    self.weight = nn.Parameter(torch.randn(kernel_size))
    self.bias = nn.Parameter(torch.randn(1))
  def forward(self, x):
    return corr2d(x, self.weight)+self.bias
```

## 卷积层的填充 (padding) 与步幅 (stride)

对于填充为 0，步幅为 1 的卷积运算而言，运算输出的 Y 尺寸为：

$$(h_X-h_K+1)\times (w_X-w_K+1)$$

卷积层的两个超参数包括填充（padding）和步幅（stride），在考虑了填充与步幅之后，输出数组的尺寸就应该重新计算，记`p`表示 padding，记`s`表示 stride，则输出数组的尺寸为：

$$
(h_X-h_K+h_p+h_s)/h_s \times (w_X-w_K+w_p+w_s)
$$

> 填充指的是在输入高和宽的两侧填充元素（通常是 0 元素），也就是说，如果横向`padding=1`，那么填充过后的横向宽度就应该多 2，因为两侧各填充了 1
>
> 步幅指的是卷积核的移动长度，一般为 1.

::: tip 填充参数选择

在很多情况下，我们会设置$h_p=h_K−1$和$w_p=w_K−1$来使输入和输出具有相同的高和宽。这样会方便在构造网络时推测每个层的输出形状。假设这里$h_K$​ 是奇数，我们会在高的两侧分别填充$h_p/2$行。如果$h_K$​ 是偶数，一种可能是在输入的顶端一侧填充$⌈h_p/2⌉$行，而在底端一侧填充$⌊h_p/2⌋$行。在宽的两侧填充同理。

:::

## 多输入和多输出通道
