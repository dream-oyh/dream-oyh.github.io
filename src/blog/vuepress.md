---
date: 2022-07-26
icon: ask
category: 博客
tag: 问题记录
---

# 问题列表

## github 图床建立

建立 tuchuang.sh 脚本，脚本内容如下（在 git bash 中运行命令）：

首先需要在 github 中创建 images 分支，作图床载体

```sh
cd <文件目录地址> #我这里是docs/.vuepress/public/images    # 1.进入images文件目录下
git init      # 2.创建仓库
git add -A     # 3.添加目录下所有文件至暂存区
git remote add origin git@github.com:dream-oyh/dream-oyh.github.io.git     # 4.连接远程仓库
git commit -m '注释'    #此处注释可改为$(date "+%Y%m%d-%H:%M:%S")，以用系统时间代替
git branch -m images
git push -u -f origin images
```

```origin``` 可自行编辑，ssh 地址优先于 https 地址

这里需要用```-f```进行强制覆盖，```origin```应与上文中仓库名称相同

## 博客部署及源码上传

部署代码采用 bash 脚本，脚本代码如下：

```sh
git init
git add -A
git commit -m 'deploy:'$(date "+%Y%m%d-%H:%M:%S")
git checkout -b code_hope
git push git@github.com:dream-oyh/dream-oyh.github.io.git code_hope

pnpm build
cd src/.vuepress/dist
git init
git add -A
git commit -m 'deploy:'$(date "+%Y%m%d-%H:%M:%S")
git checkout -b main_hope
git push git@github.com:dream-oyh/dream-oyh.github.io.git -f main_hope
exec /bin/bash
cd -
```

## “weak map key”错误信息

原因：使用了`</font>`等未知 html 标签以及一些自定义组件标签。

`</font>`改用`</text>`标签之后即可正常使用

错误代码如下：
```
TypeError: Invalid value used as weak map key
    at WeakMap.set (<anonymous>)
    at normalizePropsOptions (C:\Users\oyh\vuepress-starter\node_modules\@vue\runtime-core\dist\runtime-core.cjs.prod.js:3179:15)
    at createComponentInstance (C:\Users\oyh\vuepress-starter\node_modules\@vue\runtime-core\dist\runtime-core.cjs.prod.js:5695:23)
    at renderComponentVNode (C:\Users\oyh\vuepress-starter\node_modules\@vue\server-renderer\dist\server-renderer.cjs.prod.js:168:22)
    at Object.ssrRenderComponent (C:\Users\oyh\vuepress-starter\node_modules\@vue\server-renderer\dist\server-renderer.cjs.prod.js:605:12)
    at _sfc_ssrRender$b (C:\Users\oyh\vuepress-starter\docs\.vuepress\.temp\.server\app.js:1362:24)
    at renderComponentSubTree (C:\Users\oyh\vuepress-starter\node_modules\@vue\server-renderer\dist\server-renderer.cjs.prod.js:250:13)
    at renderComponentVNode (C:\Users\oyh\vuepress-starter\node_modules\@vue\server-renderer\dist\server-renderer.cjs.prod.js:185:16)
    at renderVNode (C:\Users\oyh\vuepress-starter\node_modules\@vue\server-renderer\dist\server-renderer.cjs.prod.js:292:22)
    at renderComponentSubTree (C:\Users\oyh\vuepress-starter\node_modules\@vue\server-renderer\dist\server-renderer.cjs.prod.js:256:13)

```

## 在 vuepress 中插入思维导图

<Badge text="step1" />

在 vscode 中下载“markmap”插件，如下图所示：

<div style="text-align: center; ">
<img alt="markmap插件" src="https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/vuepress_1.png"  width="60%" height="60%"/>
</div>

<Badge text="step2" />

新建一个.md 或.mm 文档，用于构建思维导图 html 文件

点击 vscode 右上角思维导图图标（若没有该图标，则是未成功安装插件）

<div style="text-align: center; ">
<img alt="markmap思维导图图标" src="https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/vuepress_2.png"  />
</div>

即可打开思维导图窗口进行绘制

<Badge text="step3" />

绘制完成后，点击右下角`export`，生成 html 文件

<Badge text="step4" />

将 html 文件移动至 docs/.vuepress/public/markmap/中

<Badge text="step5" />

利用 iframe 标签在你的 markdown 中插入思维导图

``` html
<iframe :src="$withBase('/markmap/xxx.html')" width="100%" height="800" frameborder="0" scrolling="Yes" leftmargin="0" topmargin="0"></iframe>
```

### 思维导图语法

所有 markdown 所具有的文本编辑语法都可以使用

思维导图构建语法见下图

<div style="text-align: center; ">
<img alt="思维导图语法" src="https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/vuepress_3.png"  />
</div>


## 转移 Blog 本地文件至 Ubuntu

由于之前在本地搭建了 Blog，现在若需要在 Ubuntu 系统上编辑时，需要调整 `node.js`版本，具体步骤如下：

1. 先删除本地文件内`node_modules`文件夹

2. 执行`npm i`重新安装即可。

## npm 配置镜像源

采用阿里镜像源：

``` sh
npm config set registry https://registry.npmmirror.com
```

若要撤销，变更回 npm 官方镜像源

```sh
npm config set registry https://registry.npmjs.org
```

## vuepress-theme-hope Waline 评论配置问题

<Badge text="未解决！"/>

参照官方文档配置 Waline 评论插件后，出现了`failed to fetch`报错，在检查 Vercel 服务器，LeanCloud 数据存储服务的配置后，均未发现与官方文档配置不一致之处，还未找到原因。

因此本博客的评论区配置转用`Giscus`方案，方便易用，具体步骤可以参考[官方文档](https://plugin-comment2.vuejs.press/zh/guide/giscus.html)。

