---
Date: 2025-03-12
catalog: 锦囊
icon: keyboard1
---

# 键盘重映射

参考 Youtuber 的[视频](https://www.youtube.com/watch?v=XuQVbZ0wENE)，`Caps Lock`的使用频率太低了，将其改为其他按键。采用[kanata](https://github.com/jtroo/kanata)应用实现键盘的重映射功能。

[kanata 文档](https://jtroo.github.io/config-1.8.0.html#concurrent-tap-hold)

## kanata 配置文件

在`kanata.exe`相同目录下创建`kanata.kbd`文件，该文件采用 Lisp 语言编写，我的配置文件如下：（win 系统）

```Lisp
(defsrc
    caps lctrl rctrl
)

(defalias
    escctrl (tap-hold 100 100 esc lctrl)

)


(deflayer base
    @escctrl S-8 caps
)
```

将`Caps Lock`键映射为了`Esc`键，同时，长按`Caps Lock`键后将其映射为`left-ctrl`键，这样的话实现了`left-ctrl`的上移，而且保证了原`ctrl`键的功能。

## 配置开机自启动和后台运行

采用`conhost.exe`无头控制器：`C:\Windows\System32\conhost.exe`

参数设置：`--headless D:\kanata\kanata.exe --cfg D:\kanata\kanata.kbd`

采用 windows`任务计划程序`管理脚本的启动，具体方法：

1. 打开“任务计划程序”（在 Windows 搜索栏中输入“任务计划程序”）。
2. 在右侧的“操作”面板中，点击“创建基本任务”。
3. 输入任务名称（例如“Kanata 开机启动”），然后点击“下一步”。
4. 选择“当计算机启动时”，然后点击“下一步”。
5. 选择“启动程序”，然后点击“下一步”。
6. 在“程序/脚本”字段中，输入 `C:\Windows\System32\conhost.exe`。
7. 在“添加参数（可选）”字段中，输入 `--headless C:\kanata\kanata.exe --cfg C:\kanata\kanata.kbd`。
8. 点击“下一步”。
9. 检查设置，然后点击“完成”。

注意完成之后，会需要输入账户密码，如果是 win 系统，需要输入 Microsoft 账号的密码，而不是开机的密码。

> 注：该方法对键盘重映射无法在注册表内使用，建议优先考虑通过硬件驱动重映射
