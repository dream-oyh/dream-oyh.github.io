---
date: 2024-03-05
category: 锦囊
tag: 教程
---

# PDF 转 word

Python 的第三方库能够实现 PDF 转 word 的操作，不要再去花冤枉钱了家人们。

## 安装

```sh
poetry add pdf2docx
```

## Usage

```python
from pdf2docx import Converter

cv = Converter("<待转换文件路径>")
cv.convert("<目标文件路径及文件名>")
cv.close()
```

转换速度快，效果目前看起来很好，还没有遇到过 bug。