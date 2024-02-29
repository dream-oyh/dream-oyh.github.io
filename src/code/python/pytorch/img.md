# 神经网络可视化工具

在我学习 pytorch 文档学到残差神经网络的时候，我发现网络的 python 搭建已经不是一个难事了，难的应该是网络的设计，而 pytorch 学习文档提供了非常多现代卷积神经网络的实现，但是并没有为这些神经网络提供一个可视化的模型出来，这样对于初学者而言，并不能准确 get 到各种网络之间的区别与联系，所以我在想能不能有什么工具是能把这些网络可视化出来的。

第一个念头是数学建模时经常用到的 PPT，用 PPT 来画神经网络可视化，但是一想到要这么多的卷积核，还要保证相对尺寸符合实际，再想到全连接层满满的线条，我果断放弃了 PPT 作图，试着在 b 站上搜一搜有没有针对于神经网络的可视化工具，没想到还真有，而且很多很丰富。所以我单开了这一部分内容，来呈现好用的可视化工具以及其做出的效果。

## 参考资料

[同济子豪兄视频](https://www.bilibili.com/video/BV1TV4y1P7AP)

## [NN-SVG](https://alexlenail.me/NN-SVG/)

该网站提供了全连接层、LeNet 和 AlexNet 类型的网络可视化，类型比较受限，但是入手门槛低，参数调整直观方便，对于这三类模型的画图还是挺不错的。

## [PlotNeuralNet](https://github.com/HarisIqbal88/PlotNeuralNet)

### Getting started

- 环境要求

  - installed [MikTex](https://miktex.org/download)
  - installed git

- clone 项目

```sh
git clone git@github.com:HarisIqbal88/PlotNeuralNet.git
cd PlotNeuralNet
```

- 执行示例

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
def to_generate( arch, pathname="file.tex" ):
    with open(pathname, "w") as f: 
        for c in arch:
            print(c)
            f.write( c )
     
    os.system("pdflatex"+pathname)
    os.remove("*.log")
    os.remove("*.aux")
    os.remove("*.tex")
```

这样就可以不需要调用脚本文件，直接运行 python 程序并渲染出图像。