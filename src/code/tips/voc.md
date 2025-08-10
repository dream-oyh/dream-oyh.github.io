---
Date: 2025-03-22
tag: 教程
catalog: 锦囊
icon: keyboard1
---

# 输入法

## Rime

Rime 是一款高度自定义，可以通过 yaml 文件进行自定义输入方案、管理词库的输入法，且可跨平台使用

好用，但是使用门槛确实高，不方便入门，折腾了 2 天才大概搞懂，参考了贴吧老哥的[帖子](https://tieba.baidu.com/p/3288634121)，UI 界面配色、词库均可以自定义，有意思！

### install

- Linux(Ubuntu)
  折腾了好久的 Linux 安装，先说一下逻辑，ubuntu 的输入法框架是 ibus，所以 rime 是针对这个框架开发的输入法，后续 rime 的配置也是存在在`$HOME/.config/ibus/rime`，也就是说我们要在这个文件夹下写用户配置，在命令行里配置 rime 的启动和重新部署
  - intall：安装 ibus-rime，`sudo apt install ibus-rime`
  - 拉取配置文件：我这里的配置文件直接调用我的仓库了: `git clone git@github.com:dream-oyh/Rime.git $HOME/.config/ibus/rime`
  - 设置 ibus：终端运行`ibus-setup`，在`input-method`中添加 rime
  - 添加输入源：打开系统设置`settings` - `region & language` - `Input Source` - `+` - `other`，选择`Chinese(Rime)`即可
  - 切换：`win` + `Space`切换系统输入法
  - 重新部署：终端运行`ibus restart`即可，此时通知栏会跳出：`Rime is under maintence`

### 配置

我采用雾凇输入方案，[配置](https://github.com/dream-oyh/Rime)已经上传 github，方便词库的管理，对雾凇方案进行了部分微调和词库搭建。

推荐用[rime-formatter](https://marketplace.visualstudio.com/items?itemName=lxl66566.rime-formatter)来对 rime 词库格式化，朋友自己写的工具，好用！

## 微软输入法

微软输入法简洁，方便，但是词库无法导出，系统间迁移困难。

在发现微软输入法可以自定义词库后，我决定开始收集自己的词库

## 词库转换

微软的词库采用 Microsoft 内部格式，`.dat`文件很封闭，尝试了很多方法都没有打开，最后找到了`深蓝词库转换`的开源项目，可以从 txt 的自定义文件转换成微软要求的`.dat`文件。

[深蓝词库转换仓库](https://github.com/studyzy/imewlconverter)

转换方法：

- 新建词库的 txt 文件
- 按照`<拼音> <候选窗位置> <短语>`的顺序分行写词库，如：

```
qxdl 1 前向动力学
jty 1 交通运输工程学院
```

即表示：打出`qxdl`时，候选框第一个位置是“前向动力学”

- 在深蓝转换词库里选择该`.txt`文件，然后选择`自定义`（按如下设置调整格式）->`Win10微软拼音（用户自定义短语）`
- 自定义编码格式：
  - 词条排序：编码 1，汉字 3，词频 2
  - 每个编码之间的分隔符：空格
  - 编码汉字词频之间的分隔符：空格
  - 换行符：`\r\n`
- 生成`.dat`文件，再导入进输入法即可。
- 输入法的导入按钮路径在：`输入法设置` - `词库和自学习` - `用户定义的短语`
