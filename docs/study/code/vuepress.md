# 博客搭建

## github图床建立(git语法)

**成果：**

建立tuchuang.sh脚本，脚本内容如下（在git bash中运行命令）：

0.在github中创建images分支，作图床载体


```sh
 cd <文件目录地址> #我这里是docs/.vuepress/public/images    # 1.进入images文件目录下

 git init      # 2.创建仓库
 
 git add -A     # 3.添加目录下所有文件至暂存区

git remote add origin2 git@github.com:dream-oyh/dream-oyh.github.io.git     # 4.连接远程仓库
```

```origin2``` 可自行编辑，ssh地址优先于https地址

在采用ssh地址之前，需要先在github进行ssh配置
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

6.更改分支至images分支
``` sh
git branch -m images
```

7.上传到github远程仓库
``` sh
git push -u -f origin2 images
```

这里需要用```-f```进行强制覆盖，```origin2```应与上文中仓库名称相同

8.注意！
:::danger 注意！
运行完脚本后，需要手动删除images文件夹中.git隐藏文件以删除本地仓库，才能正确上传
:::

### 建立过程中遇到的问题

在最开始，并没有考虑images文件夹中并不允许.git文件夹的存在，只运行了上述步骤。图床能够运行成功，但是上传main分支的代码时，则报错：
``` 
fatal: unable to access 'https://github.com/dream-oyh/dream-oyh.github.io.git/': The requested URL returned error: 403
Error: Action failed with "The process '/usr/bin/git' failed with exit code 128"
```

最后的解决方法是：手动删除images文件夹中的.git隐藏文件

或

将images文件提取到dist文件夹之外

原因：因为dist文件夹中已经建立.git仓库，git仓库嵌套使用后，被嵌套的git仓库不能被外层git仓库检测到，即：内部images仓库不可用

### 图床更新

考虑到直接用github网址，没有<span class="mask" title="嘿嘿嘿，被发现了捏~">梯子</span>的用户加载以及读取图片的速度极慢，故找到了一个网址能够加快github图床读取速度，现在此做记录。

[加快github图床读取的网站](https://statically.io/)

支持从github，gitlab以及Bitbucket中读取文件，加快加载速度

## 代码上传github

最终代码：(在git bash指令框中运行，也可用cmd运行)
```
    npm run docs:build      # 生成静态文件
    cd <dist文件目录>       # 进入dist目录
    git init                # 创建仓库
    git add -A              # 添加dist中所有代码至仓库中
    git commit -m '注释'    # 添加注释，注释可以随便写，也可用'deploy:'$(date "+%Y%m%d-%H:%M:%S")这个高级技巧将其设为发布时间
    git push -f git@github.com:<user-name>/<repository-name>.git <分支名>   #发布你的本地git仓库至github仓库中，
    # 此处用的是ssh配置，需要提前配置，提前配置方法见上文
```

:::tip tip
以上代码可先保存在txt文件中，再通过修改后缀名，改为".sh"，改为脚本以直接运行
:::

## “weak map key”错误信息

原因：使用了`</font>`等未知html标签以及一些自定义组件标签。和lxl问题完完全全撞了哈哈哈哈哈可笑死我了。之后若有标签出现相同问题，也会记录于此

`</font>`改用`</text>`标签之后即可正常使用

错误代码如下:
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
## 在vuepress中插入思维导图

`step1：`

在vscode中下载“markmap”插件，如下图所示：

<div style="text-align: center; ">
<img alt="markmap插件" src="https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/vuepress_1.png"  width="60%" height="60%"/>
</div>

`step2：`

新建一个.md或.mm文档，用于构建思维导图html文件

点击vscode右上角思维导图图标（若没有该图标，则是未成功安装插件）

<div style="text-align: center; ">
<img alt="markmap思维导图图标" src="https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/vuepress_2.png"  />
</div>

即可打开思维导图窗口进行绘制

`step3：`

绘制完成后，点击右下角`export`，生成html文件

`step4：`

将html文件移动至docs/.vuepress/public/markmap/中

`step5：`

利用iframe标签在你的markdown中插入思维导图

``` html
<iframe :src="$withBase('/markmap/xxx.html')" width="100%" height="800" frameborder="0" scrolling="Yes" leftmargin="0" topmargin="0"></iframe>
```

### 思维导图语法

所有markdown所具有的文本编辑语法都可以使用

思维导图构建语法见下图

<div style="text-align: center; ">
<img alt="思维导图语法" src="https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/vuepress_3.png"  />
</div>

## html语法积累

### “test”字体样式修改：

```html
<text style="font-family:Times New Roman;">test</text>
```

预览：

<text style="font-family:Times New Roman;">test</text>

### 插入图片

```html
<div style="text-align: center; ">  #居中图片
<img alt="图片名称" src="/tour/xiamen_day1_1.jpg"  width="60%" height="60%">
</div>
```
alt属性：若图片没加载出来时，以该文字概括图片内容

src属性：图片的路径，可以是绝对路径也可以是相对路径

width，height属性：图片宽与高的缩放比例

若不需要改变图形大小，可采用markdown自带的语法

```
![alt](src)
```

具体属性设置与上同

### 插入代码
```
    ```html     #代码种类
    <这里是写代码的地方>
    ```
```
### 修改文字颜色

``` html
<text style="color:red;">test</text>
```

预览：

<text style="color:red;">test</text>

### 文字居中，左对齐，右对齐

```html
<div style="text-align: right; ">test</div> #右对齐
<div style="text-align: left; ">test</div> #左对齐
<div style="text-align: center; ">test</div> #居中
```

### 表格绘制

```html
| 表头 | 表头 |
| ---------- | ---------- | # 区分表头和单元格
| 单元格 | 单元格 |
| 单元格 | 单元格 |
```

预览：
| 表头 | 表头 |
| ---------- | ---------- |
| 单元格 | 单元格 |
| 单元格 | 单元格 |

### markdown插入特殊符号

详情见[百度文库：Markdown中如何添加特殊符号](https://wenku.baidu.com/view/49ed8c3a2179168884868762caaedd3383c4b509.html)

现列举常用符号如下：

|符号|说明|编码|
| :----------: | :----------: | :----------: |
|&infin;|无穷大|`&infin;`|
|&lArr;|双线向下箭头|`&lArr;`|
|&uArr;|双线向上箭头|`&uArr;`|
|&rArr;|双线向右箭头|`&rArr;`|
|&dArr;|双线向下箭头|`&dArr;`|
|&hArr;|双线双向箭头|`&hArr;`|
|&alpha;|&alpha;符号|`&alpha;`|
|&beta;|&beta;符号|`&beta`|
|&gamma;|&gamma;符号|`&gamma;`|
|&pi;|圆周率|`&pi;`|
|&theta;|&theta;符号|`&theta;`|
|&emsp;|全角空格|`&emsp;`|
|&ensp;|半角空格|`&ensp;`|

