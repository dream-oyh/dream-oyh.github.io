---
date: 2024-02-10
icon: rank
category: Python 库
tag: 教程
---


# Seaborn

> Seaborn is a Python data visualization library based on matplotlib. It provides a high-level interface for drawing attractive and informative statistical graphics.

[官方文档](https://seaborn.pydata.org/)

相较于 matplotlib，`Seaborn` 提供了 API 封装，使得图形绘制较底层的 matplotlib 更简单，也兼容了 numpy、Pandas 等数据处理库，兼容性好。同时，`Seaborn`库提供了更为高级的绘图功能，支持多维数据处理。

## 安装

```bash
poetry add seaborn
```

导入 Seaborn 库：

```python
import seaborn as sns 
```

## 基本命令

```python
import seaborn as sns
import matplotlib.pyplot as plt
sns.set_style()  # 设置图像风格
sns.load_dataset('iris')  # 加载预设数据集
plt.show() # 在 VSCode 中运行时，需要调用该命令显示图像
```

> `sns`库中的数据集是`pandas.core.frame.DataFrame`对象，因此在绘图过程中可以结合 Pandas 一起工作。

`Seaborn`库将 matplotlib 参数分成两组，第一组用于配置图像整体风格，第二组调整元素的缩放参数。

| |返回参数字典 | 设置`matplotlib`默认值 |
|:---:|:---:|:---:|
|控制样式|`axes_style()`|`set_style()`|
|缩放绘图|`plotting_context()`|`set_context()`|

`Seaborn`库为`set_style()`设置了五个预设风格：`darkgrid`,`whitegrid`,`dark`,`white`,`ticks`，其中`darkgrid`为缺省值。

为`set_context()`设置四个预设风格：`paper`,`notebook`,`talk`,`poster`，其中`notebook`为缺省值，可以通过键值对调整比例和线宽，如：

```python
sns.set_context("notebook", font_scale=1.5, rc={"lines.linewidth": 2.5})
```

## 点、线混合绘图函数——`relplot()`

`replot()`函数可以绘制散点图和曲线图，根据`kind`参数改变绘图类型。

- 散点图：`kind='scatter'`(缺省值)

- 曲线图：`kind='line'`

以`tips`数据集为例，读取`tips.head()`，即：读取前 5 行数据。

::: tip tips
|index|total_bill |  tip |    sex| smoker|  day|    time|  size|
|:---|---:|---:|---:|---:|---:|---:|---:|
|0       |16.99|  1.01 | Female|     No | Sun | Dinner   |  2|
|1  |     10.34 | 1.66 |  Male |    No | Sun | Dinner  |   3|
|2   |    21.01|  3.50  |  Male |    No | Sun | Dinner |    3|
|3    |   23.68 | 3.31 |   Male |    No | Sun | Dinner |    2|
|4  |     24.59 | 3.61 | Female |    No | Sun|  Dinner |   4|
:::

- 以`total_bill`为横坐标，`tip`为纵坐标画图，可得散点图：

```python
import matplotlib.pyplot as plt
import seaborn as sns
sns.set_style("darkgrid")
sns.set_context()
tips = sns.load_dataset("tips")
print(tips.head())
sns.relplot(x="total_bill", y="tip", data=tips)
plt.show()
```

绘制出图形为：

![](https://github.com/dream-oyh/dream-oyh.github.io/blob/images/Python_seaborn/Figure_1.png?raw=false)

- 可用`hue`定义不同天数的消费情况，`hue`会根据参数的类型设置不同颜色，并且自动添加图例。

```python
import matplotlib.pyplot as plt
import seaborn as sns
sns.set_style("darkgrid")
sns.set_context()
tips = sns.load_dataset("tips")
print(tips.head())
sns.relplot(x="total_bill", y="tip", data=tips,hue="day")
plt.show()
```

绘制出图形为：

![](https://github.com/dream-oyh/dream-oyh.github.io/blob/images/Python_seaborn/Figure_2.png?raw=false)

- 利用`col`参数引入性别的影响

```python
import matplotlib.pyplot as plt
import seaborn as sns
sns.set_style("darkgrid")
sns.set_context()
tips = sns.load_dataset("tips")
print(tips.head())
sns.relplot(x="total_bill", y="tip", data=tips,hue="day",col="sex")
plt.show()
```

绘制出图形为：

![](https://github.com/dream-oyh/dream-oyh.github.io/blob/images/Python_seaborn/Figure_3.png?raw=false)

- 利用`row`参数引入时间的影响

```python
import matplotlib.pyplot as plt
import seaborn as sns
sns.set_style("darkgrid")
sns.set_context()
tips = sns.load_dataset("tips")
print(tips.head())
sns.relplot(x="total_bill", y="tip", data=tips,hue="day",col="sex",row="time")
plt.show()
```

绘制出图形为：

![](https://github.com/dream-oyh/dream-oyh.github.io/blob/images/Python_seaborn/Figure_4.png?raw=false)

## 绘制线性回归模型——`lmplot()`

```python
import matplotlib.pyplot as plt
import seaborn as sns
sns.set_style("darkgrid")
sns.set_context("paper") # 调整缩放比例
tips = sns.load_dataset("tips")
print(tips.head())
sns.lmplot(x="total_bill", y="tip", data=tips)
plt.show()
```

绘制出图形为：

![](https://github.com/dream-oyh/dream-oyh.github.io/blob/images/Python_seaborn/Figure_5.png?raw=false)

本图形展示了回归曲线与 95% 的置信区间，可通过配置`ci`参数调节置信区间的大小，如：`ci=90`。
