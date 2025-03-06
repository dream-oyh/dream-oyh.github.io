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

### 无限续

未开会员的 Cursor 只有 150 次的提问机会，但是可以通过无限邮和清除机器 ID 的方式无限续杯。

[破解器项目地址](https://github.com/YanCchen/Cursor_Change_ID_Auto)，脚本需要加 Q 群获取。有点麻烦

**使用方法**：

- 下载脚本后，右击“以管理员身份运行”，此时会运行失败，但是会在当前目录生成`.env`配置文件
- 麻烦的是`.env`配置文件不好写
  - 修改`DOMAIN`
    此时需要去阿里云购买一个域名，并且修改域名 DNS 服务器为 Cloudflare 服务器。
    > 阿里云购买域名的方法见[ref](aliyun.md#域名创建方法)
    >
    > 修改 DNS 服务器的方法：
    >
    > - 点击左侧`域名列表`，选择指定域名右侧的`管理`
    > - 点击左侧`DNS 修改`可以进行 DNS 服务器修改，修改为 cloudflare 服务器：
    >
    > ```text
    > elijah.ns.cloudflare.com
    > rachel.ns.cloudflare.com
    > ```
  - 域名修改完成后就可以填进`DOMAIN`一栏了（注意，不带前面的`www`）
  - 配置 IMP 邮箱，推荐使用 QQ 邮箱
    - 进入自己的 QQ 邮箱，找到设置，开启`账号` - `POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV服务`，此时 QQ 邮箱会给你一个授权码，复制，粘贴到`.env`文件下的`IMAP_PASS`中
    - 其余配置如下 (前两个照抄不动)：
      ```text
      IMAP_SERVER=imap.qq.com    # IMAP 服务器地址
      IMAP_PORT=993              # IMAP 端口，SSL 通常为 993
      IMAP_USER=example@qq.com       # 邮箱地址
      IMAP_PASS=xxxx              # 邮箱授权码
      ```
  - 在 Cloudflare 中挂起域名，配置域名的路由地址
    - 注册登录[Cloudflare](https://dash.cloudflare.com/d9fd159026ed38f1ffc4f58e64c76279/home/domains)
    - 输入域名添加域
    - 点击域名进入概述
    - 进入左侧“电子邮件”
    - 随便定义一个电子邮件名，然后注意在下方的`destination website`中输入你的 QQ 邮箱，他这个是输入完之后别急着回车，点下面自动生成的选项的。
    - 点击顶部“路由规则”，把`Catch-All`地址的“活动”状态打开，点击右侧“编辑”，将操作改为“发送到电子邮箱”，目标位置选择你的 QQ 邮箱。
  - 修改好`.env`文件，关闭 Cursor 应用进程，右键以管理员身份运行即可。

## 常用快捷键

- `ctrl` + `shift` + `K` 删除当前行
- `Shift` + `alt` + `↓` 向下复制当前行
- `Shift` + `alt` + `↑` 向上复制当前行
- `ctrl` + `shift` + `L` python 中选择所有同名变量
