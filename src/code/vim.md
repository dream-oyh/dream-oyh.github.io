---
date: 2024-02-16
icon: keyboard
category:
  - 计算机
  - 底层
tag: 教程
---

# vim 编辑器

> Vim 是从 vi 发展出来的一个文本编辑器。其代码补完、编译及错误跳转等方便编程的功能特别丰富，在程序员中被广泛使用。——[维基百科](https://zh.wikipedia.org/wiki/Vim)

Vim 是一个多模态编辑器：它对于插入文字和操纵文字有不同的模式。Vim 是可编程的（可以使用 Vimscript 或者像 Python 一样的其他程序语言），Vim 的接口本身也是一个程序语言：键入操作（以及其助记名）是命令，这些命令也是可组合的。Vim 避免了使用鼠标，因为那样太慢了；Vim 甚至避免用上下左右键因为那样需要太多的手指移动。

[学习](https://coolshell.cn/articles/5426.html)

[想啃书的话可以看看这里](https://awesome-programming-books.github.io/vim/Vim%E5%AE%9E%E7%94%A8%E6%8A%80%E5%B7%A7.pdf)

> I try to use vim for a short time, but it can't work for me effectively. I can't get accustomed to the strange operation of vim. In a few moments, I gave up. But! When I shift to the normal keyboard. I find that I can't work without vim. The sharp and rapid movement can let me locate quickly and acuurately. One difficult is that there are many conflicting keys, which I need to make some sets. The other is that it's troublesome to shift from Chinese to English.(~~Well, that's dropout Chinese to wirte!(like this paragraph)~~)

以下的键位均为个人修改映射后的键位，原键位参考学习文档中的键位设置。

## Vim in VScode

以下有标注“（修改）”的配置均为我的 Vim 编辑器在 VSCode 中的个性化修改，通过修改`settings.json`可以对键位进行调整，调整方式如下：

```json
 // 正常模式下的非递归按键绑定
   "vim.normalModeKeyBindingsNonRecursive": [],
    // 插入模式下的非递归按键绑定
   "vim.insertModeKeyBindings": [],
   // 命令模式下的非递归按键绑定
   "vim.commandLineModeKeyBindingsNonRecursive": [],
   // 可视模式下的非递归按键绑定
   "vim.operatorPendingModeKeyBindings": [],
```

## 模式切换

默认情况下，vim 处于正常模式，其左下角会显示当前模式。vim 一共有四种模式：

- 正常模式（Normal mode）
- 插入模式（Insert mode）
- 命令模式（Command-line mode）
- 可视模式（Visual mode）——可以用于选择文本块
  ::: tip vim 切换模式键位
  - `<Esc>`键 支持从任意模式返回正常模式
  - `h` 切换至插入模式 (修改后)
  - `R` 进入替换模式
  - `v` 进入可视化（一般）模式
  - `<Shift-v>` 进入可视（行）模式
  - `Ctrl+v` 进入可视块模式
  - `:` 进入命令模式
    :::

## 正常模式

### 移动光标

键位（均为修改后）：

- `j`左移
- `k`下移
- `l`右移
- `i`上移

### 基本操作

- `h` 切换至 insert 模式，按`<Esc>`回到正常模式
- `x` 删当前光标的字符
- `dd` 删除当前行，并把当前删除行移动至剪贴板（相当于剪切）
- `:wq` 存盘 + 退出
- `p` 在光标位置**之后**粘贴
- `<Shift-p>` 在光标位置**之前**粘贴

::: tip VSCode Vim 与系统共用剪贴板
在`settings.json`中设置

```json
"vim.useSystemClipboard": true,
```

:::

### 进阶操作

#### 插入模式进阶

- `a`在光标后操作
- `o`在当前行**之后**插入一个新行
- `<Shift-o>`在当前行**之前**插入一个新行
- `cw`清除从光标后到一个单词结尾的字符，并切换到插入模式

#### 移动光标进阶

- `0`移动到行首
- `$`移动到行尾
- `^`移动到本行第一个非空白字符（非空白字符包括空格、tab、换行、回车等）
- `/pattern` 搜索`pattern`字符串，如果有多个匹配，可以按`n`键到下一个，支持[正则表达式](/code/tips/regex.md)
- `<num> <Shift-g>`到第几行
- `<Shift-g>`到最后一行
- `w`到下一个单词的开头
- `e`到下一个单词的结尾
- `%`匹配括号移动（前提是要把光标移动到括号上）
- `*`匹配光标所在单词，并移动到**下一个**匹配单词
- `#`匹配光标所在单词，并移动到**上一个**匹配单词
- `<C-a>`移动至文件首行 (修改)
- `fa` 到下一个为 a 的字符处，a 可以修改为其他字符
- `t,` 到逗号前的第一个字符，逗号可以变为其他字符
- `3fa` 移动到下一个 a 的字符处，并重复 3 次
- `3t,` 移动到逗号前的第一个字符，并重复 3 次
- `<Shift-f>`和`<Shift-t>`，和`f` `t`一样，只不过方向相反

::: tip 区域选择

`<action> a <object>` 或 `<action>i<object>`

前者选择（或复制或删除）到的内容会包括`<object>`符号本身，但是后者选择（或复制或删除）到的内容不包括`<object>`符号本身。

- `<action>`可以是任何命令，如`d`删除，`y`拷贝，`v`以可视模式选择
- `<object>`可以是`w`一个单词、`s`一个句子，一个字符`"` `'` `(` `[` `{`

假设有一串字符`(map (+) ("foo"))`，光标现在在第一个 o 处

- `vi"`，会选择`foo`
- `va"`，会选择`"foo"`
- `vi)`，会选择`"foo"`
- `va)`，会选择`("foo")`
- `v2i)`，会选择`map (+) ("foo")`
- `v2a)`，会选择`(map (+) ("foo"))`
  :::

#### 其他进阶操作

- `u`Undo
- `<C-w>` Redo(修改)
- 块选中模式下`S<str>`可为选中的文字两侧加括号/中括号/甚至是 html 标签

::: tip 组合操作
配合前面的区域选择，`S<str>`操作可以选择任意区域内容并在两边加上指定的符号。
:::

#### 组合操作

- `yyp` 复制当前行并粘贴至下一行
- `ye` 从当前位置拷贝到本单词的最后一个字符
