# Vuepress 博客搭建

## github 图床建立 (git 语法)

**成果：**

建立 tuchuang.sh 脚本，脚本内容如下（在 git bash 中运行命令）：

0.在 github 中创建 images 分支，作图床载体


```sh
 cd <文件目录地址> #我这里是docs/.vuepress/public/images    # 1.进入images文件目录下

 git init      # 2.创建仓库
 
 git add -A     # 3.添加目录下所有文件至暂存区

git remote add origin2 git@github.com:dream-oyh/dream-oyh.github.io.git     # 4.连接远程仓库
```

```origin2``` 可自行编辑，ssh 地址优先于 https 地址

在采用 ssh 地址之前，需要先在 github 进行 ssh 配置
```sh
cd ~        # 进入根目录，若已进入请忽略
ssh-keygen -t rsa -C "youremail@example.com"
            # 然后一路回车
clip < ~/.ssh/id_rsa.pub
            # 此时密钥已复制至剪切板
            # 点击github右上角头像，进入Settings-SSH and GPG keys，新建你的ssh key并粘贴内容，标题可不写
ssh -T git@github.com       #你可输入该命令验证是否成功
```


5.将暂存区文件打包至仓库内
```sh
git commit -m '注释'    #此处注释可改为$(date "+%Y%m%d-%H:%M:%S")，以用系统时间代替
```

6.更改分支至 images 分支
``` sh
git branch -m images
```

7.上传到 github 远程仓库
``` sh
git push -u -f origin2 images
```

这里需要用```-f```进行强制覆盖，```origin2```应与上文中仓库名称相同

8.注意！
:::danger 注意！
运行完脚本后，需要手动删除 images 文件夹中.git 隐藏文件以删除本地仓库，才能正确上传
:::

### 建立过程中遇到的问题

在最开始，并没有考虑 images 文件夹中并不允许.git 文件夹的存在，只运行了上述步骤。图床能够运行成功，但是上传 main 分支的代码时，则报错：
``` 
fatal: unable to access 'https://github.com/dream-oyh/dream-oyh.github.io.git/': The requested URL returned error: 403
Error: Action failed with "The process '/usr/bin/git' failed with exit code 128"
```

最后的解决方法是：手动删除 images 文件夹中的.git 隐藏文件

或

将 images 文件提取到 dist 文件夹之外

原因：因为 dist 文件夹中已经建立.git 仓库，git 仓库嵌套使用后，被嵌套的 git 仓库不能被外层 git 仓库检测到，即：内部 images 仓库不可用

### 图床更新

考虑到直接用 github 网址，没有<span class="mask" title="嘿嘿嘿，被发现了~">梯子</span>的用户加载以及读取图片的速度极慢，故找到了一个网址能够加快 github 图床读取速度，现在此做记录。

[加快 github 图床读取的网站](https://statically.io/)

支持从 github，gitlab 以及 Bitbucket 中读取文件，加快加载速度

## 博客站点部署至 github

部署代码采用 bash 脚本，脚本代码如下：

```sh
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist
git init
git add -A
git commit -m 'deploy:'$(date "+%Y%m%d-%H:%M:%S")
git checkout main  # 切换到main分支，已设成默认分支，不需要
# 如果你想要部署到 https://USERNAME.github.io
git push git@github.com:dream-oyh/dream-oyh.github.io.git -f main
exec /bin/bash
cd -
```

## 博客代码上传至 github

博客代码上传采用 bash 脚本，脚本代码如下：
```sh
git branch -M code
git init
git add -A
git commit -m 'deploy:'$(date "+%Y%m%d-%H:%M:%S")
git push git@github.com:dream-oyh/dream-oyh.github.io.git code
```


## “weak map key”错误信息

原因：使用了`</font>`等未知 html 标签以及一些自定义组件标签。和 lxl 问题完完全全撞了哈哈哈哈哈可笑死我了。之后若有标签出现相同问题，也会记录于此

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

## vuepress V2 中导入搜索框

官方已经给出配置[使用教程](https://v2.vuepress.vuejs.org/zh/reference/plugin/search.html)

但是在实际测试过程中，出现了报错，报错信息如下
::: details 报错信息
```
Error [ERR_REQUIRE_ESM]:require of ES Module C:\Users\oyh\Desktop\vuepress\
node_modules\@vuepress\plugin-search\lib\node\index.js from C:\Users\oyh\Desktop\vuepress\docs\.vuepress\config.ts not supported.

Instead change the require of index.js in C:\Users\oyh\Desktop\vuepress\docs\.vuepress\config.ts to a dynamic import() which is available in all CommonJS modules.
```

:::

最终参考了这位老哥的文章[Error [ERR_REQUIRE_ESM]: require() of ES Module not supported](https://bobbyhadz.com/blog/javascript-error-err-require-esm-require-of-es-module-not-supported)，发现通过官网下载的`@vuepress/plugin-search`的版本号为<Badge text="^2.0.0-beta59"/>，高于博客搭建时装载的`vuepress^2.0.0-beta49`版本，只需要将版本回退，即可解决该问题，在 npm 运行：
``` npm
npm uninstall @vuepress/plugin-search   //卸载原有版本
npm i -D @vuepress/plugin-search@^2.0.0-beta49 //安装回退版本，第二个@符号后选择与你vuepress适应的版本号
```


## 安装 latex 插件

vuepress 中安装 latex 插件，参考 CSDN 老哥的专栏[如何在 vuepress 中加入 latex 插件](https://blog.csdn.net/Flyingheart1991/article/details/126067149)


::: tip
由于$...$会被 vuepress 识别为未知标签，因此在需要使用公式时需包裹<span v-pre></span>标签。否则将触发[weak map key bug 错误信息](/code/vuepress.md#weak-map-key-错误信息)。

<div style="text-align: right; ">——参考绝对值_x 的博客</div>
:::

示例：
``` html
<span v-pre>$f(x)=x^2+2x+1$</span>
```

预览：
$f(x)=x^2+2x+1$

注：由于跨平台的问题，部分 latex 语法在 vuepress 中无法使用<span class="mask" title="嘿嘿嘿，被发现了~">对，vuepress 太辣鸡了，下次建博客别用 vuepress</span>

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
