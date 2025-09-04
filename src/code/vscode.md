---
icon: vscode
category: 工具
tag: 教程
---

# VSCode

## VSCode 拓展插件

- [Comment Anchor](https://github.com/StarlaneStudios/vscode-comment-anchors)：在任意语言中，用注释给代码行打上锚点，方便快速跳转，可用标签如下：
  - ANCHOR - 用于指示文件中的内容
  - TODO - 待完善的工作
  - FIXME - 需要修复 bug 的区域
  - STUB - 用于生成默认代码片段
  - NOTE - 针对特定代码段的重要说明
  - REVIEW - 需要额外审核的一段代码
  - SECTION - 用于定义区域
  - LINK - 用于链接文件

## Cursor

[下载地址](https://www.cursor.com/)

cursor 可以同步 VSCode 配置，并且为代码工作区提供丰富的 AI 接口，极大程度方便了编程。

### 添加至右键菜单

- `Win-R`，输入`regedit`回车，打开注册表编辑器
- 分别导航至三个目录：
  - `计算机\HKEY_CLASSES_ROOT\*\shell` - 为文件添加右键菜单
  - `计算机\HKEY_CLASSES_ROOT\Directory\shell` - 为文件夹添加右键菜单
  - `计算机\HKEY_CLASSES_ROOT\Directory\Background\shell` - 为文件夹背景添加右键菜单
- 在**每个目录下**均进行如下操作：
  - 右击"shell"文件夹，选择"新建" > “项”，将其命名为"Cursor".
  - 在右侧窗格中，将"(默认)“值设置为"通过 Cursor 打开”.
  - 创建一个名为"Icon"的字符串值，将其设置为 Cursor.exe 的完整路径：
  - `C:\Users\YourUsername\AppData\Local\Programs\Cursor\Cursor.exe`
  - 在"Cursor"下创建"command"子项。
  - 在"command"中，将"(默认)"值设置为：
  - `"C:\Users\YourUsername\AppData\Local\Programs\Cursor\Cursor.exe" "%V"`

## 常用快捷键

- `ctrl` + `shift` + `K` 删除当前行
- `Shift` + `alt` + `↓` 向下复制当前行
- `Shift` + `alt` + `↑` 向上复制当前行
- `ctrl` + `shift` + `L` python 中选择所有同名变量
