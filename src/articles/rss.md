---
Date: 2025-03-23
tag: 教程
catalog: 工具
icon: dingyue
---

# RSS 订阅

我采用 folo 进行互联网的信息整合和订阅，在订阅过程中出现了很多问题，记录在此。

2025.03.23，因为folo要invitation code，限制了订阅feed的数量，故弃用，计划改为freshrss，但是还在调试中。

## 安装

[folo 项目地址](https://github.com/RSSNext/Folo/tree/v0.3.12)

安装直接下载 release 的最新版本即可

## RSS 链接获取

通过[RSSHub](https://docs.rsshub.app/)获取任意内容的 RSS 链接，再将 RSS 链接导入 folo 以订阅

以下仅记录各个资源的路由`route`，获得 rss 链接需要在`https://rsshub.app/`后添加资源路由，才能获得完整到 rss 链接。比如说`telegram channel`的路由是`telegram/channel/:username/`，那完整的 rss 链接就是：`ttps://rsshub.app/telegram/channel/:username/`

## Telegram 频道订阅

- route: `telegram/channel/:username/`

其中`:username`替换为频道分享链接里`t.me/`后的内容，比如说频道到链接是：`t.me/nameexample`，那`:username`就改为`nameexample`

## Youtube 频道订阅

### 通过 Channel id 订阅

Youtube 提供官方 RSS 订阅链接：

- Link: `https://www.youtube.com/feeds/videos.xml?channel_id=`，再在之后加上频道 id 即可

- 频道 id 的获取方法：打开指定频道，`Ctrl-U`打开页面源代码，再`Ctrl-F`搜索`channelid`即可。

### 通过频道名订阅

- route: `youtube/user/@username`

其中`username`可在频道名下方找到。