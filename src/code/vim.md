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

> The Missing 里面是这么说的，但是对于一个新手小白实在是不适应 vim 的操作逻辑

以下的键位均为个人修改映射后的键位，原键位参考学习文档中的键位设置。

## Vim in VScode

以下配置均为我的 Vim 编辑器在 VSCode 中的配置，通过修改`settings.json`可以对键位进行调整，调整方式如下：

```json
 // 普通模式下的非递归按键绑定
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
- 可视模式（Visual mode）
  ::: tip vim 切换模式键位（修改后）
- `<Esc>`键 支持从任意模式返回正常模式
- 键入`h` 切换至插入模式
- 键入`R` 进入替换模式
- 键入`v` 进入可视化（一般）模式
- 键入`V` 进入可视（行）模式
- 键入`Ctrl+v` 进入可视块模式
- 键入`:` 进入命令模式
  :::

## 移动光标

键位（修改后）：

- `j`左移
- `k`下移
- `l`右移
- `i`上移
