---
date: 2024-02-08
icon: git
category: 工具
tag: 教程
---

# Git

## 学习材料

[畅游提交树学习网站](https://learngitbranching.js.org/?locale=zh_CN)

[绝对值\_x 个人博客](https://absx.pages.dev/coding/Git.html)

[码农高天-github 极简工作流程](https://www.bilibili.com/video/BV19e4y1q7JJ)

## 安装与配置

### Git 的安装

- 方法一：

[官网](https://git-scm.com/)进入下载即可（笔者采用该方法安装的 git）

安装好之后会在鼠标右键菜单中发现“Git Bash Here”和“Git GUI Here”两个新的选项，这就是 Git 最常用的操作模式，在一个文件夹中右键，“Git Bash Here”对该文件夹内容进行 Git 相关操作。

- 方法二：

采用 windows 包管理器，`scoop install git`一步到位。

### 初始化配置

第一次使用 git 需要对用户名和邮箱进行配置，配置代码如下：

```sh
git config --global user.name "YourName"
git config --global user.email "your-email@example.com"
```

其中，以上两行代码一句一句分开输入，在“Git Bash Here”或者终端管理员中输入均可，双引号内的内容需要自己根据实际情况填写，这两个命令只需要执行一次，如果之前执行过的话可以跳过。

> 注：如果使用 VSCode 作为代码编辑器，推荐搭配`Git Graph`插件一起使用

#### SSH 配置

若要使用 SSH 链接[连接到远程仓库](#远程仓库)，需要对 SSH 进行配置

1. 生成密钥对

```sh
ssh-keygen -C "YourEmail@example.com"
```

在 git bash 输入以上命令，会要求输入密钥对保存路径，以及密钥对密码，密码为空即可。可以一路回车，但是要注意密钥对的保存路径，生成完毕后要到该路径下读取密钥对文件，选择“id_rsa.pub”文件并打开，里面“看起来像乱码的东西”就是 SSH 公钥。

2. 进入 Github 配置 SSH 公钥

在 Github 右上角头像处选择 Settings，进入设置页面后选择 SSH and GPG keys，点击 New SSH key 按钮，在 Title 处填写一个名字，在 Key 处填写密钥对文件中的公钥内容，最后点击 Add SSH key 按钮即可。

3. 测试 SSH 连接

```sh
ssh -T git@github.com   # 输入该命令验证是否成功
```

## 仓库

### 新建仓库

- 方法一：

```sh
git init
```

在需要构建仓库的文件夹下“Git Bash”（后同），通过该命令可以新建一个自己的本地仓库

- 方法二：

```sh
git clone <ssh path>
```

通过该命令可以克隆 github 上的开源代码，克隆别人的仓库到本地。

## Git 跟踪文件的三个区域

- 工作区
- 暂存区
- 本地仓库
  工作区 ---`git add`---> 暂存区 ---`git commit -m '注释'`---> 本地仓库 ---`git push origin main`--> 远程仓库

工作区，即为本地文档未上传时所处区域，在本地文件夹内新建文件，该文件就直接处于工作区。之后通过 `add`命令，可以将文件从工作区转移至暂存区，此时再`commit`，便可以将文件上传至本地仓库。

暂存区存在的原因在于，在提交文件至本地仓库时，可以每一次先将文件上传至暂存区，之后再一次性提交至本地仓库，这样可以避免每次提交都上传一次文件，提高效率。

## 畅游提交树

### 提交

- `git commit`

  git commit 将暂存区文件提交至本地仓库，并且每一次的提交可以看做是一次文件的快照，正是一个个提交组成了一个文档开发过程中的提交树，git 提供了多种方式让开发者可以在提交树中畅游，commit 也是 git 最基本的命令。

commit 命令会在提交树上新建一个新节点，例如原节点为`C0`，提交后产生新节点`C1`，则二者的关系为 `C0`<-`C1`，表示`C1`是从`C0`提交过来的，`C0`为`C1`的父（parent）节点。注意箭头方向，箭头方向为提交树创建的反方向，并不代表文件的更新方向。

- `-m` 参数用来为提交撰写注释
- `git commit -m 'deploy:'$(date "+%Y%m%d-%H:%M:%S")` 可以把 push 的时间作为提交注释
- 多行注释的写法如下：
  ```sh
  git commit -m "第一行注释 \
               第二行注释 \
               第三行注释"
  # 或者
  git commit -m "第一行注释 |
               第二行注释 |
               第三行注释"
  ```
- 注释规范：[ref](https://www.cnblogs.com/Bubgit/p/15034656.html)

```sh
<type>(<scope>): <subject>
// 空一行
<body>
```

::: details **type**(必需)

- `br`: 此项特别针对 bug 号，用于向测试反馈 bug 列表的 bug 修改情况
- `feat`：新功能（feature）
- `fix`：修补
- `docs`：文档（documentation）
- `style`：格式（不影响代码运行的变动）
- `refactor`：重构（即不是新增功能，也不是修改 bug 的代码变动）
- `test`：增加测试
- `chore`：其他的小改动。一般为仅仅一两行的改动，或者连续几次提交的小改动属于这种
- `revert`：feat(pencil): add 'graphiteWidth' option (撤销之前的 commit)
- `upgrade`：升级改造
- `bugfix`：修补 bug
- `optimize`：优化
- `perf`: Performance 的缩写，提升代码性能
- `test`：新增测试用例或是更新现有测试
- `ci`:主要目的是修改项目继续完成集成流程 (例如 Travis，Jenkins，GitLab CI,Circle) 的提交
- `build`: 主要目的是修改项目构建系统 (例如 glup，webpack，rollup 的配置等) 的提交
  :::

::: details scope(可选)
scope 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。
:::

::: details subject(必需)
subject 是 commit 目的的简短描述，不超过 50 个字符。
以动词开头，使用第一人称现在时，比如 change，而不是 changed 或 changes
第一个字母小写
结尾不加句号（.）
:::

::: details body(可选)
对本次 commit 的详细描述，可以分成多行
:::

### 分支

- `git branch`

  git 中的分支，让开发效率大幅提升，开发团队可以在分支上修正 bug，或开发新特征，但是不影响主线项目的正常运作，“早建分支！多用分支！”，使用分支其实是在说：“我想基于这个提交以及它所有的 parent 提交进行新的工作。”

`git branch <branch name>` 创建新分支并命名。注意：`main`是一个特殊的分支，git 把`main`分支看做是提交树的主干，故新分支的名称不能是`main`。仍需要注意的是，假设现提交树为`C0`<-`C1`，如果我们处于`main`分支上，则`main`分支指向最新的提交，表示为：`C0`<-`C1`<-main*（*号表示所处分支），若现在通过`git branch newImage`创建了新分支，此时新分支会指向最新提交，但是我们仍然处于`main`分支上。

即提交树变为：`C0`<-`C1`<-(main\* newImage)

若要切换到新分支，可以`git checkout <branch name>`，此时提交树变为：`C0`<-`C1`<-(main newImage\*)，**值得注意的是**，`git checkout`本质是在改变`HEAD`的指向。若`git checkout <commit name>`指向了某个提交而不是分支，此时会进入`detached HEAD`状态。

简单地，`git branch -b <branch name>`可以创建分支并且把当前分支切换为新分支。有关分支的配置可以参考以下命令：

```sh
git branch -a                    # 查看分支
git branch <new_branch_name>     # 新建分支
git branch <new_branch_name> <commit> # 在指定节点处新建分支
git switch <branch_name>         # 切换到分支
git checkout -b <branch_name>    # 新建并切换到分支，trick
git branch -m <old_name> <new_name> # 重命名分支
git branch --delete <branch_name>   # 删除分支
git push origin -d <branch_name> # 删除远程分支
```

### 合并

- `git merge`

  在分支开发完毕之后，需要将分支与 `main` 分支合并，此时需要用到`git merge`命令，这个命令产生的 commit 快照会有两个父节点，一个来自于 `main` 分支，一个来自于新建的分支。

`git merge <branch name>`注意这里的`<branch name>`是需要合并的分支，如：在 `main` 分支上执行`git merge newImage`，则代表将 newImage 分支合并至 `main` 上，此时会新建一个快照，这个快照有两个父节点，并且该快照为提交树中最新的快照，包含了代码库的所有修改。

### 变基

- `git rebase`

  `rebase`是取出一系列的提交记录，“复制”它们，并在另外一个地方逐个地放下去，其优势在于可以创造更线性的提交历史。

如在`newImage`分支上执行`git rebase main`，则代表将 `newImage` 分支上的提交记录复制到 `main` 分支上，并且在 `main` 分支上逐个地放下去。**值得注意的是**，这个过程中，原`newImage`分支上的提交快照不会消失，而是没有分支节点指向它们。在`rebase`之后，`newImage`分支会在`main`后创建有一定顺序的快照副本，`newImage`指向最新的快照副本，接下来需要更新`main`：在`git checkout main`切换到`main`分支后，`git rebase newImage`即可将`main`也移动至`newImage`指向的快照副本。

`git rebase -i`提供了 UI 界面（Git 会进入 vim 编辑器），可以对提交记录进行重新排序/删除等操作。

`git rebase <branch1> <branch2>`，通过后面的两个分支，可以将`<branch2>`分支移动至`<branch1>`分支下。

### HEAD 指针

- `HEAD` 指针

  `HEAD`是一个对当前所在分支的符号引用——也就是指向你正在其基础上进行工作的提交记录。`HEAD`也总是指向当前分支上最近一次提交记录，`HEAD`通常情况下是指向分支名的。

一般来说，一个提交快照的结构应该是这样的：`C1`<-`branch`<-`HEAD`，即：分支直接指向提交，而 HEAD 指向分支。但如果 HEAD 指向了提交本身，如：`git checkout C1`，此时我们称此类现象为`detached HEAD`

- 利用`HEAD`进行相对引用
  使用`^`向上移动 1 个提交记录，使用`~<n>`向上移动 n 个提交记录。如`main^`，即为`main`分支最新一次提交的上一次提交。

### 强制提交

- 分支的强制提交
  `git branch -f main HEAD~3`，可以将`main`分支强制移动至`HEAD`前三级的父节点上，同时不改变`HEAD`本身的指向。

### 撤销变更

- 撤销变更
  `git reset <point_to>` 把分支记录回退几个提交记录来实现撤销改动。但是这对于远程分支（remote branch）无效

`git revert <point_to>` 撤销更改并分享给别人，需要采用该命令。例：设已有提交树`C0`<-`C1`<-`C2`<-main*，执行`git revert HEAD`后，得到提交树`C0`<-`C1`<-`C2`<-`C3`<-main*，其中`C3`为撤销`C2`的提交记录，即`C3`与`C1`的提交记录相同，现将`C3`上传至远程分支即可同步“撤销”的过程。

### cherry-pick 移动提交记录

- 移动提交记录
  `git cherry-pick <commit>`使用该命令后，可以将`<commit>`复制至当前`HEAD`所处分支之后，并且 HEAD 与所处分支移至最新节点，其中`<commit>`可以选择多个节点，用空格隔开。

### 远程仓库

处于协同开发与开源的需要，将代码上传至 github 等托管平台能够使代码社交化，也会得到一份牢靠的代码备份。我们把部署在 github 上的仓库称为远程仓库。

- `git clone <ssh path>`可以从 github 上克隆一个仓库，并将该远程仓库与克隆后的本地仓库建立连接。
- 链接远程仓库

```sh
git remote add origin git@github.com:<yourgithubID>/<Repo>.git
```

> 优先使用 SSH 链接，但需要[配置](#ssh-配置)
>
> 其中`<yourgithubID>`为你的 github 用户名，`<Repo>`为你的仓库名
>
> `origin`为远程仓库别名，一般习惯设置为`origin`

- 远程分支
  在 clone 新的仓库之后，本地仓库会多出一个`<remote repo name>/main`分支，这种类型的分支即为远程分支，当切换到远程分支时，HEAD 会自动进入`HEAD detached`状态，git 这么做是因为不能直接在这些分支上进行操作，而必须在别的地方完成工作后再远程分享成果。

- `git fetch`

  git 远程仓库相当的操作实际上归纳为两点：向远程仓库传输数据以及从远程仓库获取数据。`git fetch`能够从远程仓库获取数据

例现有本地仓库和远程仓库为：

本地仓库：`C0`<-`C1`<-(main\* origin/main)

远程仓库： `C0`<-`C1`<-`C2`<-`C3`<-(main)

在`git fetch`后，

本地仓库：`C0`<-`C1`(<-main\*)<-`C2`<-`C3`(<-origin/main)

可以看出本地仓库只更新了`origin/main`分支，而并没有移动`main`和`HEAD`的位置。

- `git pull`

  `git fetch`只实现了远程仓库的下载，但是并没有更新本地仓库，需要再次通过`merge`命令将远程分支和本地分支合并。但是`git pull`提供了更为方便的选项，可以直接将远程仓库下载下来，并且将远程分支和本地分支合并。

- `git push`

  `git push`能够将本地仓库的更改上传至远程仓库，将远程仓库的分支状态与本地仓库的本地分支同步，同时将本地仓库的远程分支与本地分支合并。

一般来说，要为`push`添加指定参数，语法是`git push <remote> <place>`，一般而言，该命令设置为`git push origin main`，把这个命令翻译过来就是，切到本地仓库中的“main”分支，获取所有的提交，再到远程仓库“origin”中找到“main”分支，将远程仓库中没有的提交记录都添加上去。此处，`push` 的来源于目的地是一致的，仅需一个`main`参数即可，但是若不一致，则需要设置成`<source>:<destination>`，即语法为：`git push <remote> <source>:<destination>`。

类似的，`fetch`和`pull`也支持指定参数，只不过由于数据传输的方向和`push`相反，其`<source>`和`<destination>`的设置也应该和`push`中相反。

- Pull request
  对于大团队开发协作而言，`main`分支往往被锁定了，此时若强行 push，会报错如下：

`! [远程服务器拒绝] main -> main (TF402455: 不允许推送(push)这个分支; 你必须使用pull request来更新这个分支.)`

:::tip 解决方法
新建一个分支 `feature`

push 到远程服务器，然后 reset 你的 main 分支和远程服务器保持一致，否则下次你 pull 的时候会报错
:::

## 应用实例

<div class="scene">

1. 远程仓库上领先我 4 个 commit，但是我自己本身又多了 2 个 commit 没有 push 到远程仓库，结果我现在 git pull 远程，给了我这个提示：

```sh
hint: You have divergent branches and need to specify how to reconcile them.
hint: You can do so by running one of the following commands sometime before
hint: your next pull:
hint:
hint:   git config pull.rebase false  # merge
hint:   git config pull.rebase true   # rebase
hint:   git config pull.ff only       # fast-forward only
hint:
hint: You can replace "git config" with "git config --global" to set a default
hint: preference for all repositories. You can also pass --rebase, --no-rebase,
hint: or --ff-only on the command line to override the configured default per
hint: invocation.
```

</div>

这三种方法的异同点在于：

- `git config pull.rebase false` 它会在你的提交历史中创建一个新的“合并提交”。这个提交有两个父提交，分别指向你本地原来的最新提交和远程仓库拉下来的最新提交。
  - 使用方法
    - `git config pull.rebase false`
    - `git pull --no-rebase`
- `git config pull.rebase true` 它会先将你本地的 2 个未推送的提交“暂时摘下”，然后将远程仓库的 4 个新提交应用到你的本地分支，最后再将你本地的 2 个提交逐一应用在这些新提交之上。
  - 使用方法
    - `git config pull.rebase true`
    - `git pull --rebase`
- `git config pull.ff only` 这种策略最严格，只允许“快进式”（fast-forward）合并。由于存在分支分叉，远程分支并不是你本地分支的直接上游，所以不满足快进合并的条件。因此，git pull --ff-only 会直接拒绝执行并报错。这种策略适用于你希望确保本地分支在拉取远程更新时不会产生合并提交，并且只在你的本地工作是基于远程分支的最新版本时才进行更新。

<div class="scene">

2. 如果我现在有 a<-b<-c<-d 四个 commit，我想删除 b 到 c 的提交，直接从 a 到 d，请问要怎么操作

</div>

- 确定从哪个提交开始重写历史，按照本需求，应该从 a 开始重写，所以执行`git rebase -i <commit_a_hash>`。
- 执行上述命令后，Git 会打开你的默认文本编辑器，并显示一个类似下面这样的“计划清单”：
  ```sh
  pick <hash_b> commit message for b
  pick <hash_c> commit message for c
  pick <hash_d> commit message for d
  ```
- 你的目标是删除 b 和 c，保留 d。则将 b 和 c 前面的 pick 指令改成 drop，或者直接删除 b，c 两行
- (Optional)为了同步删除远程仓库上的提交，需要强制 push，运行 `git push origin <your-branch-name> --force-with-lease`
- (Optional)如果强制提交了，那下次再另外一台主机上 pull 时，**不能直接执行`git pull`**，而是要分两步
  - `git fetch origin`
  - `git checkout your-branch-name` 确保你当前就在需要更新的分支上
  - `git reset --hard origin/your-branch-name` 它会将你的本地分支完全重置成和远程分支一模一样。
