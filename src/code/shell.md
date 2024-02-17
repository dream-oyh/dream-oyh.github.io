---
date: 2024-02-16
icon: powershell
category: 
    - 计算机
    - 底层
tag: 教程
---

# Shell

## 学习

[The Missing](https://missing-semester-cn.github.io/)

本文采用 Bourne Again Shell（bash）来学习 Shell 命令行的使用。

## Shell 的本质

```sh 
date # 输出时间
echo <str> # 输出字符串
```

Shell 的本质是编程环境，具备变量、条件、循环和函数，当要求 shell 执行指定命令时，但是该变量不是 shell 指定关键字，则其会去寻找 `$path` 环境变量，它会列出当 shell 接收到某条指令时进行程序搜索的路径。Shell 通过空格分割指令，因此如果指令中包含空格，则需要用引号括起来。

> 但是引号的含义并不相同，`'`定义的字符串为原义字符串，其中的变量不会被转义，`"`定义的字符串会被变量值替代。

`$path`会提供一系列由`:`分割的系列目录，基于名字搜索该程序，当找到该程序时便执行。确定某程序的路径可以使用 `which <command>` 命令来查询。

> `man <command>` 该指令会接受指令名作为参数，并且返回他的用户手册。注意，使用`q`可以退出手册。
>
> 有时候用户手册内的指令太过详实，可以采用[TLDR Pages](https://tldr.sh/)作为替代品。

### Shell 导航

平常计算机上常用的文件路径由斜杠分割，windows 用 `\` 分割，Linux 和 MacOS 上用 `/` 分割。

Linux 系统上的`/`代表根目录。Windows 上的每个盘`C:\`也是根目录，以前两者开头的路径是**绝对路径**，其他的都是**相对路径**。相对路径中`.`表示的是当前目录，而`..`表示的是上级目录。

导航基本指令：

```sh 
pwd # 显示当前工作目录
cd <dir> # 切换到指定目录
ls # 显示当前目录下的文件
mkdir <dir> # 创建目录
rmdir <dir> # 删除目录
```

### 重定向输入输出流

信息在计算机上通过输入输出流传递，一般而言，输入流是键盘，输出流是显示屏。

最简单的输入输出流重定向是`> file`和`< file`。`echo`和`cat`能够使输入输出流重定向到指定文件。

```sh
echo hello > hello.txt # 写入文件
cat hello.txt # 显示文件内容
cat < hello.txt # 读取文件
cat < hello.txt > hello2.txt # 读出文件并写入新文件
```

## Shell 脚本

### 变量赋值

`foo=bar`

该语句即可将`bar`字符串赋值给`foo`变量，值得注意的是，`=`**两侧不能有空格** 。

### 条件、循环、函数语句

在 Shell 脚本中，Shell 像主流编程软件一样可以使用条件语句、循环语句和函数语句。

#### 条件语句：

```sh
if commands; then
  commands
[elif commands; then
  commands]
[else
  commands]
fi
```

`test`语句也可实现条件判断：

```sh
test <commands> # 写法一，表达式为真，test 命令执行成功，返回0，否则返回1.
[ commands ]  # 写法二，同上，注意命令和[]的空格
[[ commands ]] # 写法三，同上，但是支持正则判断
```

::: important 逻辑运算

Shell 中的逻辑运算采用`&&` 与 `||`

:::

#### 循环语句

```sh 
for variable in list  
do  
commands  
done
# 或者
for (( expression1; expression2; expression3 ))  # 注意空格 
do  
commands  
done
```

#### 定义函数

```sh
function(){
    <commands>
}
```

bash 使用了很多特殊的变量来表示参数、错误代码和相关变量。

::: details 特殊变量
- `$0` - 脚本名
- `$1` 到 `$9` - 脚本的参数
- `$@` - 所有参数
- `$#` - 参数个数
- `$?` - 前一个命令的返回值
- `$$` - 当前脚本的进程识别码
- `!!` - 完整的上一条命令
- `$_` - 上一条命令的最后一个参数
:::

命令行通常以`STDOUT`来返回输出值，以`STDERR`来返回错误值和错误码，便于脚本以更加友好的方式报告错误，返回值为`0`表示正常进行，任何非`0`的值都表示有错误发生

::: tip
Shell 中`true`代表返回值是`0`，`false`代表返回值是`1`。
:::

### 命令替换

`$( CMD )`这样的方式会让`CMD`命令的输出结果，替换掉`$( CMD )`，这样就可以实现命令的嵌套。

如：`for files in $( ls )`就可以遍历文件夹下的所有文件。

### 通配

- 通配符
Bash 执行脚本时，往往会提供一连串形式类似的参数，通配符的出现很好的解决了这个问题，可以使用`?`或`*`来匹配任意的一个或多个字符，这和正则表达式有点像，但是并不相同。

> 正则表达式中的`?`与`*`是对前一个字符的限定，而此处的通配符是对该位上的字符匹配。

- 花括号
当你有一系列的指令，其中包含一段公共子串时，可以用花括号来自动展开这些命令。这在批量移动或转换文件时非常方便。

```sh
cp /path/to/project/{foo,bar,baz}.sh /newpath
# 会展开为
cp /path/to/project/foo.sh /path/to/project/bar.sh /path/to/project/baz.sh /newpath

# 也可以结合通配使用
mv *{.py,.sh} folder
# 会移动所有 *.py 和 *.sh 文件=
```

### shebang

`#!` 被称为 shebang，它出现在脚本的第一行，用于指定脚本的解释器，它会利用环境变量中的程序来解析该脚本，这样就提高来您的脚本的可移植性。

```sh
#!/usr/local/bin/python
import sys
for arg in reversed(sys.argv[1:]):
    print(arg)
```

`shebang` 定义了脚本的解释器，也就是说让`.sh`脚本不一定使用`bash`语言编写，而可以通过`shebang`来调用不同的环境变量，使用不同的解释器来编译脚本。

### 查找文件`find`

`find`命令可以用来递归搜索符合条件的文件，是 Shell 上绝佳的文件查找工具，例如：

```sh
# 查找所有名称为src的文件夹
find . -name src -type d
# 查找所有文件夹路径中包含test的python文件
find . -path '*/test/*.py' -type f
# 查找前一天修改的所有文件
find . -mtime -1
# 查找所有大小在500k至10M的tar.gz文件
find . -size +500k -size -10M -name '*.tar.gz'
```

### 查找代码`grep`

```sh
grep -C # 获取查找结果的上下文
grep -C 5 # 输出匹配结果的前后五行
grep -V # 反选
```

```sh
# 查找所有使用了 requests 库的文件
rg -t py 'import requests'
# 查找所有没有写 shebang 的文件（包含隐藏文件）
rg -u --files-without-match "^#!"
# 查找所有的foo字符串，并打印其之后的5行
rg foo -A 5
# 打印匹配的统计信息（匹配的行和文件的数量）
rg --stats PATTERN
```

