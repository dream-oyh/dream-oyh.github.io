# 神经网络可视化工具

在我学习 pytorch 文档学到残差神经网络的时候，我发现网络的 python 搭建已经不是一个难事了，难的应该是网络的设计，而 pytorch 学习文档提供了非常多现代卷积神经网络的实现，但是并没有为这些神经网络提供一个可视化的模型出来，这样对于初学者而言，并不能准确 get 到各种网络之间的区别与联系，所以我在想能不能有什么工具是能把这些网络可视化出来的。

第一个念头是数学建模时经常用到的 PPT，用 PPT 来画神经网络可视化，但是一想到要这么多的卷积核，还要保证相对尺寸符合实际，再想到全连接层满满的线条，我果断放弃了 PPT 作图，试着在 b 站上搜一搜有没有针对于神经网络的可视化工具，没想到还真有，而且很多很丰富。所以我单开了这一部分内容，来呈现好用的可视化工具以及其做出的效果。

## 参考资料

[同济子豪兄视频](https://www.bilibili.com/video/BV1TV4y1P7AP)

## [NN-SVG](https://alexlenail.me/NN-SVG/)

该网站提供了全连接层、LeNet 和 AlexNet 类型的网络可视化，类型比较受限，但是入手门槛低，参数调整直观方便，对于这三类模型的画图还是挺不错的。

## [PlotNeuralNet](https://github.com/HarisIqbal88/PlotNeuralNet)

::: warning 评价
一个很有新意的想法，利用 latex 画图很有意思，效果也很好，但是 python 核心函数写的依托答辩。。。必要时需要更改核心函数来优化体验。

该程序可以用于科研绘图，但是对于学习过程还是不那么直观，更为直观的可以参考[netron 工作流](#netron-工作流)
:::

### Getting started

- 环境要求

  - installed [MikTex](https://miktex.org/download)
  - installed git

- clone 项目

> 这个可视化工具需要将整个项目 clone 下来才可以使用，他的核心代码是`pycore.tikzeng`，一般构建网络都在`pyexamples`这个文件夹中构建。

```sh
git clone git@github.com:HarisIqbal88/PlotNeuralNet.git
cd PlotNeuralNet
```

- 执行示例

> 注意要在`PlotNeuralNet`中打开文件夹。

```sh
cd pyexamples/
bash ../tikzmake.sh test_simple
```

::: details 报错：xdg-open: command not found on Win
Github 原仓库中已经有[issue](https://github.com/HarisIqbal88/PlotNeuralNet/issues/98)

我对`tikzmake.sh`中的代码进行了修改，修改后如下：

```sh
python $1.py
pdflatex $1.tex

rm *.aux *.log *.vscodeLog
rm *.tex

if [[ "$OSTYPE" == "darwin"* ]]; then
    open $1.pdf
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open $1.pdf
else
    start $1.pdf
fi
```

:::

### Modify

本项目从本质上来说是用 latex 写的，所以可以通过 shell 控制 tex 文件，进入`/pycore/tikzeng.py`文件，修改`to_generate()`函数。

```python
def to_generate(arch, pathname="file.tex"):
    with open(pathname + ".tex", "w") as f:
        for c in arch:
            # print(c)
            f.write(c)
    # os.system("pdflatex " + pathname + ".tex")
    os.chdir("pyexamples")
    os.system("pdflatex test_simple.tex")
    os.chdir("..")
    os.remove(pathname + ".aux")
    os.remove(pathname + ".log")
    os.remove(pathname + ".tex")
```

这样就可以不需要调用脚本文件，直接运行 python 程序并渲染出图像。

### Usage

clone 项目后，一般在`pyexamples`文件夹中构建 python 程序并构建网络，其一般结构为：

```python
import sys
sys.path.append('.')
import pycore.tikzeng as tkz
# defined your arch
arch = [
    tkz.to_head( '..' ),
    tkz.to_cor(),
    tkz.to_begin(),
    tkz.to_input( pathfile, to='(-3,0,0)', width=8, height=8, name="temp" ),# optional
    #  ====Build your network below===

    # =================================
    tkz.to_end()
    ]

def main():
    pathname = str(sys.argv[0]).split('.')[0]
    tkz.to_generate(arch, pathname)

if __name__ == '__main__':
    main()
```

- `to_head("..")`用于返回到`PlotNeuralNet`主目录。如果 python 程序不是在`pyexamples`文件夹下直接创建的，而是又创了一个子文件夹，那需要返回两次上级目录。
- `to_cor()`用于定义颜色地图
- `to_begin()` 开始构建网络模型
- `to_end()` 结束构建网络模型
- `to_generate()` 产生`.tex`文件，渲染出最终的 pdf
- `to_input()` 定义输入图片
  - `pathfile` 输入图片的路径
  - `to` 图片显示位置（相对于\*-west 进行左偏移 3 个单位）
  - `width` 图片宽度
  - `height` 图片高度
  - `name` 图片名称

### Module

#### 卷积模块

```python
def to_Conv(
    name,
    s_filer=256,
    n_filer=64,
    offset="(0,0,0)",
    to="(0,0,0)",
    width=1,
    height=40,
    depth=40,
    caption=" ",
)
```

- `name` 卷积层名称
- `s_filer` 该模块显示出（仅数字）的 W 和 H（目前只支持长宽一样的卷积层，所以只需要输入一个 int）
- `n_filer` 该模块显示出（仅数字）的 C（通道数）
- `offset` 卷积层的偏移量 (x,y,z) 按照右手系坐标分别设置偏移量
- `to` 起始位置，默认是 (0,0,0)，也可以设置相对于不同模块的方向
  - `"(<模块名称>-east)"`最常见，原模块右侧中心点对齐新模块左侧中心点
  - `"(<模块名称>-west)"`原模块左侧中心点，对齐新模块左侧中心点
  - `"(<模块名称>-north)"` 原模块上方中心点，对齐新模块左侧中心点
  - `"(<模块名称>-south)"` 原模块下方中心点，对齐新模块左侧中心点
  - `"(<模块名称>-near)"`原模块前侧中心点，对齐新模块左侧中心点
  - `"(<模块名称>-far)"`原模块后侧中心点，对齐新模块左侧中心点
- `width` 卷积层宽度（模块显示长度）
- `height` 卷积层高度（模块显示长度）
- `depth` 卷积层深度（模块显示长度）
  > 注意这里的宽度、高度、深度和一般情况下的定义不一样。
  >
  > 对应关系如下：
  >
  > - width -> 实际的 depth
  > - height -> 实际的 height
  > - depth -> 实际的 width
- `caption` 卷积层注释

#### 多个卷积层串联

```python
def to_ConvConvRelu(
    name,
    s_filer=256,
    n_filer=(64, 64),
    offset="(0,0,0)",
    to="(0,0,0)",
    width=(2, 2),
    height=40,
    depth=40,
    caption=" ",
)
```

该函数提供了两个卷积层的串联，画出来的效果见下图。

![](https://github.com/dream-oyh/dream-oyh.github.io/blob/images/Python_pytorch/convconvrelu.png?raw=false =x400)

> 注意这里的`n_filer`和`width`都用的是`tuple`结构，用来表示两层卷积层各有多宽。

#### 计算符号

```python
def to_Sum(name, offset="(0,0,0)", to="(0,0,0)", radius=2.5, opacity=0.6, logo="$+$"):
```

可以画出求和符号，其中 `radius`定义了操作符半径，`opacity`定义透明度，`logo`定义符号（需要用 latex 的数学公式写，记得两边带美元符号），如果输入乘法就需要`logo="$\times $"`

#### 连接线

```python
def to_connection(of, to)
```

`of`输入连接线起始层的`name`，`to`输入连接线的终了层的`name`，能画出一条从起始层右侧中心点到终了层左侧中心点的箭头。

```python
def to_skip(of,to,pos=1.25)
```

该函数定义了折线，从`of`的右上边中心点指向`to`的上方中心点，`pos`可以调整偏移量，一般为正数 ~~（你要不试试负数，会很抽象）~~

#### 其他模块

以下所描述的模块，与卷积模块的参数几乎一致，只是颜色发生改变，现将各模块的生成函数名罗列如下。

- `to_Pool()` 池化层，多了`opacity=0.5`修改透明度参数
- `to_UnPool()` 反池化，也有`opacity`参数
- `to_ConvRes()` 残差层
- `to_ConvSoftMax()` 卷积+Softmax 层
- `to_SoftMax()` Softmax 层

## [Netron 工作流](https://netron.app/)

### 环境配置

```sh
conda install onnx
```

我的 pytorch 是在 conda 虚拟环境下安装的，所以采用了 conda 安装指令。

### pytorch 模型转成 ONNX 模型

运行以上代码，将 pytorch 模型转成 onnx 模型。

```python
with torch.no_grad():
    torch.onnx.export(
        net,  # 要转换的模型
        x,  # 模型的输入
        "LeNet.onnx",  # 导出的.onnx 文件名（注意文件扩展名为.onnx）
        opset_version=11,  # ONNX 算子集版本
        input_names=["input"],  # 输入张量的名字
        output_names=["output"],  # 输出张量的名字
    )
```

### 导入 Netron

将`.onnx`模型导入[netron](https://netron.app/)，即可生成模型框图。

此处以`LeNet`模型为例，导入 netron 后效果图如下：

![](https://github.com/dream-oyh/dream-oyh.github.io/blob/images/Python_pytorch/LeNet.png?raw=false =100x)

> 可以在 netron 网页左上角的菜单栏中将网络改成水平的。

::: details 模型源码

```python
import sys

import torch
import torch.nn as nn

sys.path.append(".")


class LeNet(nn.Module):
    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        self.conv = nn.Sequential(
            nn.Conv2d(1, 6, 5),
            nn.Sigmoid(),
            nn.MaxPool2d(2, 2),
            nn.Conv2d(6, 16, 5),
            nn.Sigmoid(),
            nn.MaxPool2d(2, 2),
        )
        self.fc = nn.Sequential(
            nn.Linear(16 * 4 * 4, 120),
            nn.Sigmoid(),
            nn.Linear(120, 84),
            nn.Sigmoid(),
            nn.Linear(84, 10),
        )

    def forward(self, x):
        return self.fc(self.conv(x).view(x.shape[0], -1))


net = LeNet()
x = torch.randn(size=(1, 1, 28, 28))
print(net(x).shape)
with torch.no_grad():
    torch.onnx.export(
        net,  # 要转换的模型
        x,  # 模型的输入
        "LeNet.onnx",  # 导出的.onnx 文件名（注意文件扩展名为.onnx）
        opset_version=11,  # ONNX 算子集版本
        input_names=["input"],  # 输入张量的名字
        output_names=["output"],  # 输出张量的名字
    )

```

:::
