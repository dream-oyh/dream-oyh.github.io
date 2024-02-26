---
date: 2024-02-26
icon: github
category: 工具
tag: 教程
---

# Github

> GitHub is a developer platform that allows developers to create, store, manage and share their code. --WikiPedia

[官网](https://github.com/)

[我的 github 账号首页](https://github.com/dream-oyh)

## 公钥配置

在注册 github 账号后，需要用 SSH 公钥将你正在使用的设备与本账号关联起来，这个关联的协议就是 SSH 公钥，可以通过 git 配置，具体方法点击[此处](git.md#ssh-配置)

## 上传 Pull request

Pull Request 简称 pr，方便其他用户对某仓库提交个人贡献与修改，在经仓库主审核后，与现有仓库合并实现仓库更新，并成为该仓库的贡献者之一。上传 pr 的方法如下。

- fork 指定仓库

打开需要上传的 pr 仓库后，点击仓库名右侧的`fork`选项，该选项相当于是将该远程仓库复制到个人账号中并新建一个仓库，本质上和新建仓库没有差别，只是仓库内容是由远程仓库指定。需要自定义 fork 仓库的名称和描述，以及可以选择是否只 fork `main`分支。

- 将 forked 仓库 clone 到本地

利用 SSH 协议，用 git 将 forked 仓库 clone 到本地，在第一次使用 SSH 时需要[配置公钥](git.md#ssh-配置)。

clone 仓库命令如下（在本地指定文件夹中的 git bash 里运行），其中 `<SSH-dir>`是 fork 仓库的 SSH 链接，可以在仓库右上角的绿色`code`按键中找到。

```sh
git clone <SSH dir>
```

clone 仓库后，就可以在该本地仓库自由修改内容，并且通过[ git 提交 ](git.md#畅游提交树)等命令把本地修改提交至 forked 仓库。

- 创建 pull request

在本地仓库中，点击绿色按键`code`下方的`contribute`，再点击`open pull request`，修改自述文件与提交分支，再点击`Create pull request`，就成功地创建了 pr，之后等待仓库主审核即可。

> gitee 的创建 pr 方法与 github 略有不同，差别在 fork 入口有些许调整。gitee 将 fork 入口放在了`main`分支右侧的`+`号中，点击`+`后再点击`创建 pull request`即可。