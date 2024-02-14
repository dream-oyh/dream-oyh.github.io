# html

## 学习

[MDN](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML) 提供了较为完整的前端三大件学习资源，可以参考学习。

## html 语法积累

### “test”字体样式修改：

```html
<text style="font-family:Times New Roman;">test</text>
```

预览：

<text style="font-family:Times New Roman;">test</text>

### 插入图片

```html
<div style="text-align: center; ">  #居中图片
<img alt="图片名称" src="/tour/xiamen_day1_1.jpg"  width="60%" height="60%">
</div>
```

alt 属性：若图片没加载出来时，以该文字概括图片内容

src 属性：图片的路径，可以是绝对路径也可以是相对路径

width，height 属性：图片宽与高的缩放比例

若不需要改变图形大小，可采用 markdown 自带的语法

```
![alt](src)
```

具体属性设置与上同

### 插入代码
```
    ```html     #代码种类
    <这里是写代码的地方>
    ```
```
### 修改文字颜色

``` html
<text style="color:red;">test</text>
```

预览：

<text style="color:red;">test</text>

### 文字居中，左对齐，右对齐

``` html
<div style="text-align: right; ">test</div> #右对齐
<div style="text-align: left; ">test</div> #左对齐
<div style="text-align: center; ">test</div> #居中
```
