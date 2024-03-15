# LocalAugment

本 python 包用于深度学习的数据增强。不同于 `torchvision.transforms()`转换器，`LocalAugment` 提供在本地进行图像增强，并将增强后的图像保存在本地，以便于之后加入数据集中。

除此之外，`LocalAugment`在对图像变换的同时能够记录下数据集标签变换后的位置与大小，数据集标签采用矩形框中心点与长宽的定位模式，能够保证图像在经过变换后，标签依然能够被正确地定位，省去转换后手动打标签的繁琐工作。

## install

```sh
pip install local-augment
```

## Quickly Start

```python
import LocalAugment as LA
source_dir = "dataset\\images"
output_dir = "dataset\\images\\tested"
label_dir = "dataset\\labels"
num_images = 30
trans = LA.Transformer(source_dir, output_dir, label_dir, num_images)
```

开始使用该本地图像转换器之前，需要定义图片数据集路径、标签路径、转换后保存路径以及需要增强的图片数量。并且将其输入`Transformer()`类中生成实例化对象。

## 增强转换器

`LocalAugment`提供了以下几种数据增强转换器

### Crop(crop_size)

图像裁剪转换器

- `crop_size: tuple(int)` 矩形裁剪的尺寸，具体到图像上的像素坐标，以 tuple 结构输入，依次存储为`(x1, x2, y1, y2)`，采用矩形左上角和右下角的坐标定位。

经裁剪转换器处理后的图像会在其文件名后加入`_c`标识。

### Rotate(angle, shuffle=True)

图像旋转转换器，该转换器默认以图像中心作为旋转中心，支持自定义旋转角度或采用随机角度。

- `angle: int/tuple(int)` 指定旋转角度，角度制，正数为顺时针旋转，负数为逆时针旋转
- `shuffle: boolean` Bool 变量，指定是否采用随机角度值。当 `shuffle` 为 `True` 时，应将 `angle` 指定为`tuple`数组，规定随机角度的取值范围。随机角度值采取指定范围内的均匀分布。

经旋转转换器处理后的图像会在其文件名后加入`_rot<angle>`标识。

### flipHorizontal()

图像水平翻转转换器

经水平翻转转换器处理后的图像会在其文件名后加入`_hf`标识。

### randomFlipHorizontal(p)

图像随机水平翻转转换器，该转换器支持自定义翻转概率 `p`。

- `p: float` 指定翻转概率，取值范围为 `[0, 1]`，`p=1` 表示全部翻转，`p=0` 表示不翻转。

经水平翻转转换器处理后的图像会在其文件名后加入`_hf`标识。

### flipVertical()

图像垂直翻转转换器

经垂直翻转转换器处理后的图像会在其文件名后加入`_vf`标识。

### randomFlipVertical(p)

图像随机垂直翻转转换器，该转换器支持自定义翻转概率 `p`。

- `p: float` 指定翻转概率，取值范围为 `[0, 1]`，`p=1` 表示全部翻转，`p=0` 表示不翻转。

经垂直翻转转换器处理后的图像会在其文件名后加入`_vf`标识。

### randomGammaLight(dark,light)

图像亮度调整转换器

- `dark: tuple(float)` 指定亮度调暗范围，取值范围为 `[0, 1]`，`dark=(0.2, 0.8)` 表示将亮度下调到 `0.2` 到 `0.8` 之间，视具体图片生成效果而定
- `light: tuple(int)` 指定亮度调亮范围，取值范围为 `[0, 10]`，`light=(2, 8)` 表示将亮度上调到 `2` 到 `8` 之间，视具体图片生成效果而定

经亮度调整转换器处理后的图像会在其文件名后加入`_l`标识。

### randomGaussionNoise(noise_scale)

图像高斯噪声随机添加转换器

- `noise_scale: tuple(int)` 指定高斯噪声添加范围，默认为`(10,20)`，具体视图片生成效果而定

经高斯噪声转换器处理后的图像会在其文件名后加入`_n`标识。

### randomResize(time, shuffle=True)

图像缩放转换器

- `time: int/float` 图像缩放因子，`>1`为放大比例系数，`<1`为缩小比例系数
- `shuffle: boolean` Bool 变量，指定是否采用随机缩放比例系数。当 `shuffle` 为 `True` 时，应将 `time` 指定为`tuple`数组，规定随机缩放因子的取值范围。随机缩放因子采取指定范围内的均匀分布。

经缩放转换器处理后的图像会在其文件名后加入`_res`标识。

### Sharpen()

图像锐化转换器，利用拉普拉斯算子对图像进行锐化处理。

经锐化转换器处理后的图像会在其文件名后加入`_sh`标识。

## 转换器串联

`Compose(func_list:list[func])`

`LocalAugment`提供了`Compose()`函数用于各类转换器的串联

## 保存

`Save()`

在运行完所有转换器之后，需要加入`Transformer.Save()`函数来保存增强后的图片。

## 图片可视化

`Show(num_cols, num_rows)`

`LocalAugment`库提供了`Show()`函数来可视化增强后的图像，以便观察标签的跟踪是否正确。

- `num_cols: int` 显示图片列数
- `num_rows: int` 显示图片行数

> 注意输入的图片总数不得超过增强数据集中的图片数目。
