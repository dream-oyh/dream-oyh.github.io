---
date: 2024-03-18
icon: code
---

# C++

## 开发环境前置知识 (要崩溃了)

C++ 在 win 下的开发环境非常复杂，2024/06/24 我老老实实把[这篇文章](https://www.cnblogs.com/w4ngzhen/p/17695080.html)看了，对编译、工具链等概念名词进行了区分，这在配置 C++ 开发环境之前是必要的。

首先，C++ 从`.cpp`文件到`.exe`文件需要很多步骤，具体如下图所示。主要分为四个部分，预处理器、编译器、汇编、链接。

![](https://raw.githubusercontent.com/dream-oyh/dream-oyh.github.io/images/C_compile_chain.png)

1. _Preprocessor_ - 预处理器：通过头文件`#include`和宏定义`#define`，指示 C++ 编译器要处理哪些头文件和宏定义。
2. _Compiler_ - 编译器：编译器是将预处理后的 C++ 源代码转化为汇编代码，主要是检查有没有语法错误。
3. _Assemble_ - 汇编：将汇编代码转化为机器代码，由编译器完成，不需要我们理解。
4. _Linker_ - 链接器：配置链接在生成可执行文件过程中，是非常重要的一项环节。配置的静态链接库或者动态链接库在这个环节下和可执行程序链接^[链接的具体过程可以参考 [这篇博客](https://chuquan.me/2018/06/03/linking-static-linking-dynamic-linking/)] 在一起。简单来说，编译和汇编只能将`.cpp`文件转换为机器语言`.obj`文件，但是并不知道外部库、动态链接库或者其他文件里的函数与本代码的包含关系，这时候需要链接来将机器语言文件与外部库或其他编译好的文件"链接"起来，这才能让可执行程序执行。

以上这一串下来，需要编译器和链接器互相协作，这整个流程所要用到的`.exe`合集就叫“工具链”。工具链是预处理器、编译器、汇编器、链接器，外加其他辅助调试工具的工具合集。

## VSCode 环境搭建

### 工具链

不同操作平台下，如 win, linux，对 C++ 的编译工具链是不一样的。

### windows - MSVC

MSVC 是一套在 Windows 下处理 C++ 文件的一套工具链，而不是特指某个编译器或链接器，包含了`cl.exe`，`link.exe`和其他诸如 debugger 的调试工具等。

- `cl.exe` 该程序起到了编译和链接的两个作用，但可以在命令行通过参数选择是否一起完成链接。若只需要`cl.exe`完成编译操作，则 MSVC 会让`link.exe`来继续完成链接。

#### Windows SDK

何为 SDK？可以理解为系统已经写好的库组件，方便 C++ 程序的编写，类似 Python 中 pandas 库这种，为写代码提供的较为常用的库函数。

> 适用于 Windows 11 版本 22H2 的 Windows SDK (10.0.22621) 提供用于生成 Windows 应用程序的最新标头、库、元数据和工具。

所以需要在 Windows 上构建 C++ 应用，我们需要**编译器工具链**和**标准 C、C++ 库文件以及 Windows 库文件**。

而现在也有用户在使用 MinGW，其本质上是一套 GCC 工具链，但是 GCC 本来是用于 Linux 的，在 Windows 上并不适用，所以需要 MinGW 来使得 GCC 工具链也能在 Win 上运行，我在 Stack Overflow 上搜到了这样的一个简单解释：

> On a computer with Windows installed, the library that contains most ready-made executable code is not compatible with gcc compiler ... so to use this compiler in Windows you need a different library: that's where MinGW enters. MinGW provides, among other things, the library(ies) needed for making a C implementation together with gcc.

### 前端工具

选择 Clangd 作为前端工具。

安装：`scoop install llvm`

llvm 会自动包含 clangd, clang-format, clang-tidy 等前端工具，这一套 C++环境里我们只需要 clangd 作为构建前端。

VSCode 里下载[插件](https://marketplace.visualstudio.com/items?itemName=llvm-vs-code-extensions.vscode-clangd)，可以把 llvm 的`bin`文件夹路径添加至环境变量，这样 VSCode 中 clangd 的`Path`设置只需填写`clangd.exe`即可。

配置：

- `path` - clangd.exe
- `Format on type` - True

> 注意 llvm 并不包括 windows sdk，Windows 用户需要利用巨硬的 visual studio installer 下载所需要的 msvc 工具链和 sdk 标准库。
>
> 进入[下载链接](https://visualstudio.microsoft.com/zh-hans/downloads/)，划到最底下选择`用于visual studio的工具` - `visual studio 2022 生成工具` - `下载`，这个会提供一个轻量级的 installer（4.2MB），在里面选择`C++桌面开发`，安装以下内容
>
> - MSVC v143
> - Windows 10/11 sdk
> - 测试工具核心功能
> - C++ AddressSanitizer
> - ~~vcpkg 包管理器~~ **（absx: 不要用 visual studio 官方提供的 vcpkg）**

### 构建系统-XMake

跟随 absx 步伐，开始使用 xmake，跟着[新手教程](https://zhuanlan.zhihu.com/p/640701847)一步步往下看，还是挺清晰的。环境搭建就成功了，接下来等有项目要用到了再一点点更新经验叭。

> 后续：看到 Cmake 那一坨 Cmakelist.txt，我真的绷不住了，XMake，赢！

安装：win 上 `scoop install xmake`一行搞定。

- VSCode 插件设置
  - XMake
  - Clangd：前端 formatter+linter
  - Codelldb：调试工具
- 常用命令

```sh
xmake create helloworld # 创建工程
xmake config --toolchain=clang # 切换工具链至clang
xmake clean -a  # 移除所有构建时的中间文件
xmake f -c # 移除已经缓存的用户配置，在不知道做什么的时候可以先来一发这个
```

- Lua 文件常用命令

```Lua
add_requires("fmt") -- 请求添加标准库
add_includedirs("include")  -- 添加头文件
target("hello")  -- 设定编译目标
    set_kind("binary")  -- 指定库类型
    add_files("src/*.cpp")  -- 添加文件
    add_packages("fmt")     -- 添加标准库
```

#### bug

- 当在编程时用到中文时，不论是 printf 里面还是注释，这个时候单用 UTF-8 编码 xmake 会报错：“语法错误 or 常量中有换行符”，解决方法是需要把 xmake 提示的文件改成 UTF-8 with BOM 的编码格式，才能解除报错。

## 编程语言

### 头文件

C++通过`#include`引入头文件实现多文件的功能传递。头文件里需要用`#ifndef`防止重复编译。比如我要创建`service.h`头文件，就应该按照如下定义。`__SERVICE_H`也可以定义成其他名格式，但是要保证每一个头文件的变量名都不一样。

```cpp
#ifndef __SERVICE_H
#define __SERVICE_H
// 其他函数声明、结构体和宏定义
#endif
```

`#ifndef`和`#endif`之间用于写其他函数声明，和其他结构体、类名和宏定义。xmake 里可以通过`add_includedirs("path/to/include")`添加头文件目录。

### 可变参数

C++支持在定义函数时用`...`定义未知的参数，可以通过接受一个格式化字符串和一系列可变参数，然后将格式化后的结果打印到控制台，在嵌入式里用于打印串口数据。以下是代码实现

```cpp
#include <cstdarg>
#include <cstring>
#include <iostream>

void u0_printf(const char *format, ...) {
  char a[20] = {};
  va_list listData;
  va_start(listData, format);
  vsprintf(a, format, listData);
  va_end(listData);
  for (int i; i < 20; i++) {
    std::cout << a[i];
  }
}
```

- 其中，`<cstdarg>`提供了可变参数函数所需的功能，提供了`va_list`类型，`va_start`、`va_end`、`va_arg` 等宏.
  - `va_list` 定义的 `listData` 将用来依次访问传递给函数的那些可变参数
  - `va_start()` 需要两个参数，第一个是访问可变参数，第二个是可变参数前的第一个已命名参数；这样它才能知道可变参数是从哪里开始的
  - `vsprintf()` 根据格式字符串和参数列表，生成最终的字符串。把结果字符串写入到缓冲区 a 中.
  - `va_end()` 用于清理`va_list`

### 函数注释

在函数定义前加上注释`/**   */`，编辑器就可以在其他地方调用函数时，显示相关注释。

注释格式：

```cpp
/**
 * @brief  ：简介，简单介绍函数作用
 * @param  ：介绍函数参数
 * @return：函数返回类型说明
 * @exception NSException 可能抛出的异常.
 * @author zhangsan：  作者
 * @date 2011-07-27 22:30:00 ：时间
 * @version 1.0 ：版本
 * @property ：属性介绍
*/
```
