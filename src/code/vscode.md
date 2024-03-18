---
icon: vscode
category: 工具
tag: 教程
---

# VSCode

## C++ 开发环境配置

_2024.03.18_，我终于狠下心来鼓起勇气开始看 C++ 的环境配置，看了一晚上基本算是看了一个大概。

我采用 Clang-Tidy + Clang-format 作为 linter 和 formatter。

插件下载：_Clang-Format_, _CS 128 Clang-Tidy_

### Clang-Format 配置

在*settings.json*中加入：

```json
{
  "editor.formatOnSave": true,
  "clang-format.executable": "/absolute/path/to/clang-format"
}
```

其中第二个参数填入*clang-format.exe*的绝对路径，可以用[ everything ](../article/software.md#everything)查找一下，选择在`.vscode`文件夹下的 exe 文件即可。

同时将`"[c]"`与`"[cpp]"`修改为下方所示的配置。

```json
{
  "[c]": {
    "editor.defaultFormatter": "xaver.clang-format"
  },
  "[cpp]": {
    "editor.defaultFormatter": "xaver.clang-format"
  }
}
```

### Clang-Tidy 配置

在 *VSCode setting* 中，更改如下配置。
- `clang-tidy.executable` 可执行文件路径，与format 一样，搜索`clang-tidy.exe`的绝对路径
- `clang-tidy.lintOnSave` True
- `clang-tidy.fixOnSave` True

## Arduino 开发环境配置

踩了无数的坑之后，终于把 Arduino 开发板的配置搞定了。

Arduino 作为入手成本很低的嵌入式开发工具，很受 biginner 欢迎，但是您能不能把编辑器做好一点（微笑），原生的编辑器设计我不敢恭维，没有自动补全，没有 formatter，差劲的代码高亮，这些都让开发变得极其困难。秉持着 All in VSCode 的原则，我尝试了一下将 Arduino 开发环境也集成进 VSCode，结果一折腾就是半天，现将经验整理如下。

- 安装环境
  - 安装 VSCode
  - 安装 [Arduino IDE](https://www.arduino.cc/en/software)
    > **踩坑 (?)**
    >
    > 这里我到现在也没法确定我是不是被这一步的版本所害，总之在最后，我下载的是`1.8.19`版本的 IDE，如果我下载最新版的就没法用（但是做到最后，我又感觉下最新版的应该也可以用，有没有小伙伴替我踩踩坑）
- 安装插件
  - VSCode 中安装`arduino`插件
- 配置插件
  - `arduino.enableUSBDetection` true
  - `arduino.useArduinoCli` true
    > 在 setting 中配置这俩即可，arduino 配置时必须保证`arduino.Path`和`arduino.Command Path`是空的，而勾选`useArduinoCli`则意味着采用扩展捆绑的编辑器，所以和之前下载的版本应该是没有关系的（但是不代表不要下载 IDE，下载 IDE 过程中会把 arduino 编译器下载到 C 盘中，等会儿会用到）。
- 配置 `C/C++` 环境

  > 我最大的踩坑就在这，由于最开始不知道要配置 C/C++ 环境，才导致 arduino 直接就不可用

  - VSCode 中按`<Ctrl-Shift-P>`打开命令面板，选择`C/C++: 编辑配置（UI）`，添加配置名为`Arduino`，将下方的指定编译器改为：

  ```
  "C:\Users\<Username>\AppData\Local\Arduino15\packages\arduino\tools\avr-gcc\7.3.0-atmel3.6.1-arduino7\bin\avr-g++"
  ```

  注意其中的`<Username>`需要改成 windows 用户名。（在设置之前，最好查看一下该路径下是否存在`avr-g++.exe`，如果不存在，说明最开始安装`arduino IDE`时没有安装成功）

  > 这和前面 IDE 的安装路径无关，这个编译器默认是安装在这个路径下的，找就行了，安装过程中也无法修改他的安装路径。

  - 将该配置页面下的`IntelliSense模式`改成`gcc-x64(legacy)`
    ::: important 提示
    此时，如果不出意外，在该文件夹内应该会出现`.vscode`文件夹，内部有`c_cpp_properities.json`文件，该文件内存储了我们刚刚输入的配置信息。这个也是`VSCode`的局部配置。之后会出现的`arduino.json`也同理，是局部配置。

    > （知道叫这个名就行，区别于`settings.json`，这里面写的都是全局配置，局部配置只在其所在文件夹中生效）

    所以之后 arduino 项目的创建都得在该文件夹下进行。(建议重开一个文件夹专门用于 arduino 项目管理，并且把`.vscode`文件夹捎上)
    :::

- 新建一个`.ino`程序，输入：

```c++
void setup(){

}
void loop(){

} // 随便写点什么都可以

```

- 点击 VSCode 右下角`WIN32`，在跳出窗口中选择`Arduino`。
- VSCode 中按`<Ctrl-Shift-P>`打开命令面板，选择`arduino:initialize`，运行指令后，根据具体情况在右下角的`<Select Programmer>` `<Select Board Type>` `<Select Serial Port>`，之后会发现`.vscode`文件夹中又生成了`arduino.json`文件。

到此为止，环境就算配置成功了！

::: details Warning 解决：[Warning] Output path is not specified. Unable to reuse previously compiled files. Verify could be slow.

在网上搜索后，找到了[参考文档](https://arduino.stackexchange.com/questions/45347/warning-when-verifying-sketch-with-vs-code)

需要在刚产生的`arduino.json`文件里，添加`"output": "../ArduinoOutput"`（这个路径可以自定义和更改），这样这个`warning`就能解决了。 ~~添加时，注意不要漏了逗号~~
:::

::: details 问题解决：Verify 后终端出现中文乱码
参考[该文档](https://blog.csdn.net/weixin_42225355/article/details/104906950)修改即可 ~~你就说这个破 arduino 做的是什么东西啊，乱七八糟的问题一堆。。~~
:::
