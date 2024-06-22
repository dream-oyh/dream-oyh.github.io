---
date: 2024-02-09
icon: pandas
category: Python 库
tag: 教程
---

# Pandas

## 学习

[官方文档](https://pandas.pydata.org/docs/index.html#)

## 安装

```bash
poetry add pandas
```

## 数据结构

### `DataFrame`

二维数组，由列和行组成，第一行为各列的列名，第一列为各行的行索引，在 `Pandas` 库中，一般用`header`和`index`参数来分别表示列名和行名。若`header=None`,`index=None`，则说明读取的数据中不存在行索引和列名。

可以直接定义`DataFrame`变量，如：

```python
df = pd.DataFrame(
    {
        "Name": [
            "Braund, Mr. Owen Harris",
            "Allen, Mr. William Henry",
            "Bonnell, Miss. Elizabeth",
        ],
        "Age": [22, 35, 58],
        "Sex": ["male", "male", "female"],
    }
)
```

### `Series`

一维向量，由值和索引组成，`DataFrame`中的每一列都是一个`Series`。

也可以直接定义`Series`变量，如：

```python
s = pd.Series([1, 2, 3, 4, 5],name='A')
```

## 基本命令

### Pandas 数据读取与写入

```python
import pandas as pd
file = pd.read_csv(fpath) # 读取 csv 文件
file = pd.read_excel(fpath) # 读取 excel 文件
file = pd.read_sql(fpath) # 读取 sql 文件
file = pd.to_csv(fpath) # 写入 csv 文件
file = pd.to_excel(fpath) # 写入 excel 文件
file = pd.to_sql(fpath) # 写入 sql 文件
file.head() # 读取前几行数据
file.head(<num>) # 读取文件最前指定行数数据
file.tail() # 读取后几行数据
file.tail(<num>) # 读取最后指定行数数据
file.shape # 读取数据形状
file.columns # 读取数据列名
file.index # 读取数据行名
file.dtypes # 读取每列数据类型
file.info() # 读取数据基本信息
```

`read_*`用于读取文件，`to_*`用于写入文件，其中有些共同的参数，说明如下：

`sheet_name` 读取或写入工作表名称

`header=None` 表示该数据没有标题行

`index=None` 表示该数据没有索引列

::: tip 对于 txt 数据文件

txt 相较于 csv 不同的是，具有自己指定的分隔符，因此在读取时应该设置分隔符，对于没有定义列名的数据还要自己定义列名。

```python
import pandas as pd
file = pd.read_csv(fpath, sep='\t',header=None, names=['col1','col2','col3']) # 读取 txt 文件
```

其中，`sep`参数定义分隔符；

`'\t'`代指`tab`制表符；

`names`可以指定除去索引列以外的列名；
:::

### Pandas 数据处理

Pandas 在处理`DataFrame`数据时，会自动忽略文本类型数据，只会处理`int64`,`float64`数据类型的列。

```python
DataFrame.max() # 读取每列最大值
DataFrame.subscribe() # 描述性统计
DataFrame.mean() # 读取每列平均值
DataFrame.median() # 读取每列中位数
DataFrame.agg(
    {
        "Age": ["min", "max", "median", "skew"],
        "Fare": ["min", "max", "median", "mean"],
    }
)    # .agg() 函数提供键值对计算特定列的特定指标
DataFrame.groupby(<column name>).mean() # 按指定列的值分类计算平均值
# 其中<column name>支持导入列表，进行多组别的分类
DataFrame.value_counts() # 计数
DataFrame.sort_values(by = <column name>,ascending=False/True) # 按指定列的值排序，ascending 控制升降序
```

### 访问 `DataFrame` 对象

```Python
DataFrame.loc[<row index>,<column name>] # 读取指定行和列的数据
DataFrame[<column name>] # 读取指定列的数据
DataFrame[[<column name1,column name2>]] # 参数换成列表，读取多列数据
```

### 利用逻辑表达式读取特定满足要求的数据

- `DataFrame`对象支持通过`>`或`<`符号，返回 0，1 矩阵，并以之作为索引，读取指定满足要求的数据。例如：
```python
df = pd.DataFrame({'A':[1,2,3,4], 'B':[5,6,7,8]})
print(df[df['A']>2]) # 读取 A 列大于 2 的数据
```

返回值：
```
   A  B
2  3  7
3  4  8
```

- 利用`.isin()`函数选择指定列中的指定值。例如：
```python
df = pd.DataFrame({'A':[1,2,3,4], 'B':[5,6,7,8], 'C':[9,10,11,12]})
print(df[df['A'].isin([2,4])]) # 读取 A 列等于 2 和等于 4 的数据
```

返回值：
```
   A  B   C
1  2  6  10
3  4  8  12
```

- 支持逻辑表达式运算，`|`表示或，`&`表示与，`==`表示相等，并且每一项逻辑表达式都应该被括号包裹，以确定正确的计算优先级。
- `DataFrame.loc[<row>,<col>]` 其中的`<row>`支持逻辑表达式、索引名、索引名的冒号表达式（如`1:3`表示 1~3 列/行，**但是请注意 DataFrame 中的索引是以`0`开头的**，故除去标题行的第一行的索引是`0`），`<col>`支持列名、列名的冒号表达式（如`'A':'C'`表示`A`列到`C`列）。
```python
df = pd.DataFrame({'A':[1,2,3,4], 'B':[5,6,7,8],'C':[9,10,11,12]})
df.loc[0:2,'B':'C'] = 0 # pandas 支持赋值操作
print(df)
```

返回值：

```
   A  B   C
0  1  0   0
1  2  0   0
2  3  0   0
3  4  8  12
```

- `DataFrame.iloc[<row>,<col>]`支持通过单元格在表格中的位置访问数据，支持冒号表达式，但是要注意行列索引值均是从`0`开始，若要实现上例的效果，代码应该为；`df.iloc[0:3,1:3] = 0`
**值得注意的是**，通过实际测试，`.loc[]`中，列索引`'B':'C'`包括左右端点，行索引`0:2`也包括左右端，但是在`.iloc[]`中，行列索引，如`0:3`只包括左端点，不包括右端点，所以`0:3`只有`0`、`1`、`2`这三行，`1:3`只有`1`、`2`这两列。

### 对数据进行计算

`Pandas`库中可直接调用数学算符（`+`,`-`,`*`,`/`）和逻辑算符（`&`,`|`,`>`,`<`,`==`）对数据采取`element-wise`的计算模式，即各对应元素相除或相乘。并且可以通过`df["column name"]`来直接定义新的列，如：`df['prod'] = df["A"] * df["B"] * df["C"]`可表示三列的乘积列，并且会自动新建名为`prod`的新列。

## 应用实例

### 合并文件夹内多个 csv 文件

```python
import glob
import pandas as pd
extension = "csv"
all_filenames = [i for i in glob.glob("*.{}".format(extension))]
combined_csv = pd.concat([pd.read_csv(f) for f in all_filenames ])
combined_csv.to_csv( "combined_csv.csv", index=False, encoding='utf-8-sig')
```