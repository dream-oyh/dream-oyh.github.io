---
date: 2024-03-18
icon: code
---

# C/C++

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
xmake project -k compile_commands --lsp=clangd # 生成.vscode/compile_commands.json文件，方便代码跳转
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

## C 的内存分区

![C的内存分区](/images/c/内存分配.png)

写嵌入式的时候要注意内存分区，大数组不可存放在栈区，栈区溢出程序就执行不下去了，建议通过`static`关键字([ref](#函数变量声明))定义在全局变量区。

关于更加详细的内存分配，可以参考[这篇博客](https://baijiahao.baidu.com/s?id=1840597031662303945)。

## 编程语言

### 指针

C 的精髓。语法在这里不赘述了，这里说一下会运用到指针的几个情况。这里举例子也很单薄，具体到项目里再自行体会吧。学不会指针是因为没有真正到用指针的场景，所以不理解为什么非要多扯出来一个地址

- 函数声明内传入指针变量：`int function(int *a){}`
- 函数内修改指针变量的值：`int function(int *a){ *a += 1; }`
- 如果指针变量指向一数组，修改值：`int function(int *a){a[0] = 1}`
- 该函数的调用方式：`int a = 1; function(&a);` 普通变量要用`&`取址
- 传入数组方式：`int a[3]={0x00, 0x01, 0x02}; function(a);` 数组不用取址

<div class='scene'>

1. 需要给函数传一个数组时，需要用数组名作为函数输入参数，且函数内对数组值的改变会反馈回函数外、C 存储数组的内存地址是连续的，所以拿到了数组首地址，相当于可以读取整个数组

</div>
<div class='scene'>

2. 这个函数需要用于给一个指定数组/指定变量写入值，这时候就需要把数组首地址/指定变量的地址传进去，让函数在函数内部修改值之后，再拿到外部处理

</div>

这个在通讯接收时很常见，一般就是声明一个待使用的数组作为缓冲区，放进接收函数里让函数往数组内写值

```C
void canReceive(uint8_t *RxBuffer, uint8_t dataLength){
  for (uint8_t i=0;i<dataLength;i++){
    RxBuffer[i] = canReceiveByte();
  }
}

int main(){
  uint8_t dataLength = 4;
  uint8_t canRxBuffer[4];
  canReceive(canRxBuffer, dataLength);
  printf(canRxBuffer);
}
```

<div class='scene'>

3. 这个函数需要修改多个值，就可以在函数输入参数里，输入多个参数的地址，这样这些参数就能同时被函数更改

</div>

### 结构体

C++结构体也很好用。

- 结构体定义：
  ```C
  typedef struct {
    uint64_t MsgID; // 消息ID
    uint8_t *Data; // 数据缓冲区
    uint16_t DataLength; // 数据长度
  } CAN_Struct;
  ```
- 结构体声明
  ```C
  uint8_t array[4];
  CAN_Struct RxBuffer;
  RxBuffer.MsgID = REQ_ID;
  RxBuffer.Data = array;
  RxBuffer.DataLength = 4;
  ```
- 结构体作为指针变量传入函数后的调用，需要用`->`引出内部元素
  ```C
  void function(CAN_Struct *RxBuffer){
    uint8_t testData[4] = {0x01, 0x02, 0x03, 0x04};
    RxBuffer->Data = testData;
  }
  ```

我目前遇到的应用场景如下

<div class='scene'>

1. 函数需要传入非常多的参数，可以都打包成一个结构体统一传入

</div>

<div class='scene'>

2. 用于定义一种模块，比如说 CAN 模块，我可以定义一个结构体，结构体内包含报文 ID，CAN 的发送/接收缓冲区地址，CAN 数据长度，都打包在一个结构体内能增加代码可读性。

</div>

比如说有一个函数，要把 CAN 的这三个属性都加进去，然后又得加其他变量，那写成那么多变量就很丑，不如打包成一个结构体传。（事实上，CAN 消息用结构体定义已是业内基操）

<div class='scene'>

3. 有一种情况是，我想要传入很多个变量，但是有些变量我又可能在函数内不会用到，这个时候用结构体也很方便，结构体内不定义那些用不到的变量就可以，然而函数接口不用改变。

</div>

**特性：**

- 结构体里是可以定义成员函数的，成员函数能拿到结构体里的变量，这样为 C 缺少“类”提供了一点点补偿。
- 结构体并没有构造函数，所以如果结构体元素多的话，建议写一个`Init`函数用于给结构体赋默认的初始值。

### 头文件

C++通过`#include`引入头文件实现多文件的功能传递。头文件里需要用`#ifndef`防止重复编译。比如我要创建`service.h`头文件，就应该按照如下定义。`__SERVICE_H`也可以定义成其他名格式，但是要保证每一个头文件的变量名都不一样。

```cpp
#ifndef __SERVICE_H
#define __SERVICE_H
// 其他函数声明、结构体和宏定义
#endif
```

`#ifndef`和`#endif`之间用于写其他函数声明，和其他结构体、类名和宏定义。xmake 里可以通过`add_includedirs("path/to/include")`添加头文件目录。

- C++头文件有的用`" "`引用，有的用`< >`，区别是前者是自定义静态库，后者是 C++标准库。也可以用引号包括标准库，但是这个会导致 C++寻找库文件时优先搜索自定义库，再搜标准库。
- C++的很多关键字都需要调用标准库才能使用，如果正确了编译前端，一般编译器都会指出函数属于哪个标准库。
  - `bool`变量类型需要调用`<stdbool.h>`
  - `uint8_t`等变量类型需要调用`<stdint.h>`

### 函数变量声明

- `static`关键字
  - 定义静态变量：`static` 关键字可用于定义该文件内的全局变量，这个变量在最开始编译时只会被初始化一次，能够保证不会因为作用域退出而被释放；
    > 用于定义静态变量时，建议同步定义该变量的`get`和`set`函数，以便外部操作。一般我会用 static 去定义状态标志位，然后通过 get 和 set 进行全局的访问。
  - 定义静态函数：使该函数只能由该文件内部使用，外部无法调用
  - `static`定义的数组存放在[全局静态区](#c-的内存分区)，适合存放大量的数据。
- `extern`关键字
  - 我个人不太常用，用于声明外部变量，在头文件里把某个变量交出去
  - 举例：`extern int var;` 这样全局要使用的时候，引入头文件并在任意位置声明`int var;`就能拿到这个变量。
- `register`关键字
  - 将变量声明在 CPU 寄存器内，如果变量调用频繁的话可以用这个关键字声明，效率高一点，但是我不常用。

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
