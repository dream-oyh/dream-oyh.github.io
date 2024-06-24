---
date: 2024-03-18
icon: code
---

# C++

## 开发环境前置知识

C++ 在 win 下的开发环境非常复杂，2024/06/24 我老老实实把[这篇文章](https://www.cnblogs.com/w4ngzhen/p/17695080.html)看了，对编译、工具链等概念名词进行了区分，这在配置 C++ 开发环境之前是必要的。

首先，C++ 从`.cpp`文件到`.exe`文件需要很多步骤，具体如下图所示。主要分为四个部分，预处理器、编译器、汇编、链接。

![](https://raw.githubusercontent.com/dream-oyh/dream-oyh.github.io/images/C_compile_chain.png)

1. _Preprocessor_ - 预处理器：通过头文件和宏定义，指示 C++ 编译器要处理哪些头文件和宏定义，在 C++ 中，预处理语句以`#`开头，由于其并不是 C++ 语句，所以不需要以分号结尾。预处理过程中，预处理器不需要理解 C++ 语法，只是一个文本处理工具，专注于代码结构的准备和预设条件的配置，进行文件包含替换、宏替换、条件编译等操作。有关预处理，可以详细看看[这篇文章](https://juejin.cn/post/7322376878139195392)
2. _Compiler_ - 编译器：编译器是将预处理后的 C++ 源代码转化为汇编代码，主要包括语法分析、语义分析、代码优化等，编译器需要理解具体的 C++ 语法，但是只要语法没有错误，编译器不论逻辑如何就都不会报错。
3. _Assemble_ - 汇编：将汇编代码转化为机器代码，由编译器完成，不需要我们太过担心，不过之前我们学单片机的时候有简单了解一下汇编语言，有机会也可以学学。
4. _Linker_ - 链接器：配置链接在生成可执行文件过程中，是非常重要的一项环节。配置的静态链接库或者动态链接库在这个环节下和可执行程序链接^[链接的具体过程可以参考 [这篇博客](https://chuquan.me/2018/06/03/linking-static-linking-dynamic-linking/)] 在一起。简单来说，编译和汇编只能将`.cpp`文件转换为机器语言`.obj`文件，但是并不知道外部库、动态链接库或者其他文件里的函数与本代码的包含关系，这时候需要链接来将机器语言文件与外部库或其他编译好的文件"链接"起来，这才能让可执行程序执行。

以上这一串下来，需要编译器和链接器互相协作，这整个流程所要用到的`.exe`合集就叫“工具链”。工具链是预处理器、编译器、汇编器、链接器，外加其他辅助调试工具的工具合集。

## 工具链

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

### Linux GCC

GCC 曾经是`GUN C Compiler`的缩写，也就是 GUN 的 C 语言编译器，然而随着不断的发展，GCC 已经能够处理 C++、Object-C、Go 语言等语言了，社区对它的定位也更上了一层，所以它现在的全称是`GNU Compiler Collection`，即 GNU 编译器集。

主要包含：

- gcc-core：即 GCC 编译器，用于完成预处理和编译过程，把 C 代码转换成汇编代码。
- Binutils：除 GCC 编译器外的一系列小工具包括了链接器 ld，汇编器 as、目标文件格式查看器 readelf 等。
- glibc：包含了主要的 C 语言标准函数库，C 语言中常常使用的打印函数 printf、malloc 函数就在 glibc 库中。

### macOS Clang/LLVM

它与 Linux 较为类似，通过内部的工具、命令行以及提供的标准库文件等完成构建应用的能力。二者关系为，Clang 在 LLVM 架构中是作为 C 家族语言（C、C++、Objective-C）的默认前端，可以无缝替换 GCC。

具体说一下什么是“前端”。首先要了解传统编译器的结构，如下图所示

```flow:present
st=>start: Source Code
e=>end: Machine Code
op1=>operation: Frontend
op2=>operation: Optimizer
op3=>operation: Backend

st(right)->op1(right)->op2(right)->op3(right)->e
```

- Frontend:前端--词法分析、语法分析、语义分析、生成中间代码
- Optimizer:优化器--中间代码优化
- Backend:后端--生成机器码

而 llvm 的结构如下：

![](/images/llvm_structure.png)

所以 llvm 使得不同的前端后端使用统一的中间代码，如果需要新支持一种编程语言，只需要实现一个新的前端，而 C 语言的前端就是 Clang。这个前端其实就已经完成了编译器的工作，而 llvm 作为 Clang 的后端，会在 Clang 编译之后继续完成中间代码优化和可执行程序生成的操作。

## 构建系统

现在已经知道什么是工具链了，接下来说说什么是构建系统。从预处理、编译汇编到链接，这每一步都需要人为去配置，操纵编译器和链接器按流程运行，但是这样的配置非常麻烦，并且随着工程越来越复杂，编译配置项根据场景不同越来越复杂，直接调用命令容易出错，于是构建系统应运而生。构建系统在底层依然使用的是编译工具链，只是进行了一定的用户友好的抽象，并降低了项目编译的复杂度。

### Windows MSBuild 与 sln、vcxproj

构建系统首先要有一定的规则才能构建出一套系统，在 Windows 上的构建系统主流是 MSBuild，它可以调用系统中安装的 MSVC。一般来说，MSBuild 的配置文件是`.sln`和`.vcxproj`文件。这些配置文件通常会指明一些关于编译构建的信息，例如项目工程所包含的源文件有哪些；相关库的头文件查找路径、二进制库文件查找路径；不同场景（Debug 或 Release）下的代码编译方式（是否代码优化，是否移除符号等）。

Visual Studio 在其中参与的作用是可视化和为了用户友好的抽象，当你在 IDE 中编写源码，配置编译选项，其实就在影响`.sln`和`.vsxproj`配置文件。另外，当你按下了 VS 上项目运行/构建的按钮的时候，底层就是在调用`msbuild.exe`。

![](/images/msbuild.png)

### Linux 的 Make 与 Makefile

（我看的别人的博客里已经写得很清楚了，就搬用过来啦）

与 Windows 上的 MSBuild 体系类似，make 这个命令行工具可以认为与 msbuild.exe 是同一层次，而 Makefiles 配置文件则是与.sln 和.vcxproj 文件是一个功能，指明了项目中具有哪些源代码、编译的规则逻辑等信息。当 make 执行的时候，读取 Makefile 配置文件，生成 GCC 相关的调用命令行，再调用 GCC 的相关命令行工具进行编译构建。于是，make、GCC 的关系和流程就可以如下描述了：

![](/images/make.png)

### 生成构建系统的工具：CMake - 元构建系统

如上所说，每个系统都有各自的构建系统，并不通用，因此想要实现跨平台的修改和运行就很困难。此时 CMake 提出，采用统一的构建系统生成工具，统一生成各个平台需要的配置文件，这样能有效解决跨平台问题。

- 如果用户希望在 Windows 上构建应用的时候，那么这个工具就基于配置生成一套 msbuild 能够加载的`.sln`、`.vcxproj` 工程配置。于是，我们可以直接使用 `msbuild` 构建或是用 VS 打开工程开发构建；
- 如果用户希望在 Linux 上基于同样的代码构建 Linux 平台的应用，那么这个工具就利用同一份配置生成一套 `make` 能够加载的 `Makefile` 配置。于是，在 Linux，我们就可以使用 make 命令来构建这个应用了；

### 是构建系统又是元构建系统：XMake

Xmake 是一个基于 Lua 的轻量级跨平台构建工具，[官方文档](https://xmake.io/#/zh-cn/)很详细，可以直接阅读。

xmake 既可以作为构建系统来直接调用编译工具链进行项目编译（默认的），同时，还可以作为 CMake 的角色来生成特定的构建项目配置
