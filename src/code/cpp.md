---
date: 2024-03-18
icon: code
---

# C++

我采用 Xmake 作为 C++ 项目的构建、包管理工具。

C++ 的开发也秉持 All in VScode 的原则，插件设置可以看[这里](vscode.md#c-开发环境配置)

C++ 的学习需要区分好*编译器、工具链和构建系统*三者的概念，有关 C++ 的编译流程可以参考下图：

![](https://raw.githubusercontent.com/dream-oyh/dream-oyh.github.io/images/C_compile_chain.png)

1. _Preprocessor_ - 预处理器
2. _Compiler_ - 编译器
3. _Assemble_ - 汇编
4. _Linker_ - 链接器

我是看了[ 这篇文章 ](https://www.cnblogs.com/w4ngzhen/p/17695080.html)之后才对*编译*这件事有所了解的，需要的同学可以看看。

微软官方有对 C++ 编译过程给出了更加详细的解释，但是在这套解释里并没有给出汇编的过程：

> 基本 C++ 编译涉及三个主要步骤：
>
> - C++ 预处理器会转换每个源文件中的所有 #directives 和宏定义。这会创建翻译单元。
> - C++ 编译器通过应用已设置的任何编译器选项，将每个翻译单元编译为对象文件 (.obj)。
> - 链接器通过应用已设置的链接器选项，将对象文件合并为单个可执行文件。
## 开发环境
### 编译器

llvm + Clang 分别作为编译器后端和前端，安装可用 scoop。

```sh
scoop install llvm
```

### Xmake 构建系统

[官网](https://xmake.io/#/)

Xmake 是基于 Lua 的 Cpp 构建工具，更准确地来说应该包括三个部分，即：_Build backend + Project Generator + Package Manager_，简单来说，它实现了 c++ 项目的构建和包管理。

#### 基本操作

**_Install_**

::: tabs
@tab scoop
scoop 一行即可搞定

```sh
scoop install xmake
```

@tab powershell
官网还提供了利用终端的安装方法

```sh
Invoke-Expression (Invoke-Webrequest 'https://xmake.io/psget.text' -UseBasicParsing).Content
```

:::

**_Basic command_**

```sh
xmake create -l c -P ./<project-name> # create project
xmake # build project
xmake run <project-name> # run project
```

其构建项目的逻辑如下图所示（来自官网）：

![](https://xmake.io/assets/img/index/package_arch.png =300x)

#### Lua

Lua 是 Xmake 编译程序用到的语言，个人感觉不用特意去学，只需要在平常多用多理解就好。在 Xmake 创建项目之后，会自动生成文件结构如下：

```
hello
├── src
│   └── main.c
└── xmake.lua
```

其中，`xmake.lua` 文件是 Xmake 的配置文件，简单来说，在我们从`.cpp`文件生成至`.exe`文件过程中，他会起作用。Lua 文件由两部分构成，以`target()`作为分界线，一个最简单最基本的 lua 程序长成这个样子：

```lua
target("hello")
    set_kind("binary")
    add_files("src/*.c")
```

#### 包管理

Xmake 内置 Xrepo 作为包管理器，基本操作如下：

```sh
xrepo install zlib tbox # basic install
xrepo install "zlib 1.2.x" # install specific version
xrepo install -m debug zlib # install the debug version
xrepo install brew::zlib # Install packages from third-party package manager
```

- Seamless integration with xmake project

_example_:

```lua
add_requires("tbox >1.6.1", "libuv master", "vcpkg::ffmpeg", "brew::pcre2/libpcre2-8")
add_requires("conan::openssl/1.1.1g", {alias = "openssl", optional = true, debug = true})
target("test")
     set_kind("binary")
     add_files("src/*.c")
     add_packages("tbox", "libuv", "vcpkg::ffmpeg", "brew::pcre2/libpcre2-8", "openssl")
```
