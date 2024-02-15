---
date: 2024-02-11
icon: any
category: Python 库
tag: 教程
---

# Python 爬虫教程

## 环境安装

使用爬虫需要安装`requests`和`bs4`两个第三方库

安装命令为：

```sh
poetry install requests
poetry install bs4
```

## 爬虫原理

爬虫要做的，是从用户端口向网页服务器发送一个请求，网页服务器再根据请求做出响应，返回一个网页内容给用户，归纳下来，爬虫的步骤可分为三步，即：

1. 获取网页内容——从用户端口向网页服务器发送一个请求，服务器针对该请求返回用户网页内容。在浏览器里访问服务器时，服务器返回的内容会被浏览器渲染成可读性好、美观的网站页面，但是对于程序的响应，服务器返回的内容更加原始；

2. 解析网页内容——通过请求得到的网页内容太多太杂了，需要对内容解析，将我们所需要的内容提取出来；

3. 储存或分析数据——结合具体需求，对提取得到的数据进行后处理，可以对数据进行可视化处理、图表展示等。

:::warning 爬虫在使用时必须注意：

1. 不要爬取公民隐私数据

2. 不要爬取受著作权保护的内容

3. 不要爬取国家事务、国防建设、尖端领域的计算机系统等保密性内容

4. 请求频率和数量不能过高

5. 网站如果明确做出反爬限制，比如加密内容，不要去强行突破
:::

## HTTP 请求和响应

> HTTP(HyperText Transfer Protocol) 是超文本传输协议，它是互联网上应用最为广泛的一种网络协议。设计 HTTP 最初的目的是为了提供一种发布和接收 HTML 页面的方法。

### HTTP 请求

向 HTTP 发送请求主要包含两种方法，GET 和 POST，GET 用于获取数据，POST 用于发布数据，故在爬虫大部分情况下用 GET 方法。

一个完整的 HTTP 请求通常由三部分组成，分别是：请求行、请求头和请求体，如：

```sh
GET /user/info HTTP/1.1 # 请求行
# 请求头
Host: www.example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/5
Accept:*/*

# 请求体
# {
#     "username": "admin",
#     "email":"admin@example.com" 
# } 
```

请求行包括：请求类型（GET），访问路径（/user/info），HTTP 协议版本（HTTP/1.1）

请求头包括：Host 表示请求的主机名（结合访问路径能得到完整的网址），User-Agent 表示用户客户端的相关信息，Accept 表示客户端可接受的响应类型。

请求体内包括：客户端传给服务器的其他数据，如用户名和邮箱等，GET 方法请求体一般是空的。

### HTTP 响应

一个完整的 HTTP 响应通常由三部分组成，分别是：状态行、响应头和响应体，如：

```sh
HTTP/1.1 200 OK # 状态行

# 响应头
Date: Mon, 18 May 2020 06:55:39 GMT
Content-Type: text/html; charset=UTF-8

# 响应体
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>该响应体仅作示例使用，不能代表真实情况，也不具备实际意义</body>
</html>

```
状态行中包含 HTTP 响应协议、状态码和状态消息，常见的状态码如下：
:::tip 常见的状态码
|状态码 | 状态消息 |状态内容 |
|:---:|:---:|:---|
|200|OK|客户端请求成功 |
|301|Moved Permanently|资源被永久移到到新地址 |
|400|Bad Request|客户端不能被服务器所理解 |
|401|Unauthorized|请求未经授权 |
|403|Forbidden|服务器拒绝提供服务 |
|404|Not Found|请求资源不存在 |
|500|Internal Server Error|服务器发生不可预期错误 |
|503|Server Unavailable|服务器当前不能处理客户端的请求 |
:::

响应头包括：`Date` 表示响应发送的时间，`Content-Type` 表示响应的类型，`Content-Length` 表示响应内容的长度。

响应体包含服务端返回给客户端的数据，如 HTML 页面、图片、文件等。

## 爬虫的 Python 实现

### 定义请求和'User-Agent'

```python
import requests
head = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
}
response = requests.get(
    "http://books.toscrape.com/",
    headers=head,
)
```

定义 User-agent 的目的是把爬虫程序伪装成正常浏览器，通过`requests.get()`导入请求，括号内为待爬取网站的 url 网址。

定义的`response`是一个`response`对象，可以返回以下值：

```python
print(response.status_code) # 返回状态码
print(response.headers) # 返回响应头
print(response.text) # 返回响应体
print(response.ok) # 返回请求是否响应成功
```

### 获取响应源码并解析网页内容

```python
content = response.text # 获取响应源码
from bs4 import BeautifulSoup # 导入 BeautifulSoup
soup = BeautifulSoup(content, "html.parser") # 解析网页内容，通过"html.parser"指定解析器，一般情况下不需要更改
```

### 案例分析

以该[专门用于联系爬虫的网页](http://books.toscrape.com/)为例，现在需要爬取每本书的价格。

首先，在网页中找到所有价格所在的标签，并确认其属性。具体确认方法是，在网页内右键，点击“检查”（或者直接按 F12 键调取界面源码），再按`ctrl+shift+C`在页面中选择价格元素进行查看（也就是 F12 打开窗口后最左上角的按键），观察价格所处位置，其被标签`<p class="price_color"></p>`所定义。因此，我们要找的元素，是这个网页中`p`标签的`price_color`类的字符。

程序如下：

```python
all_price = soup.findAll("p", attrs={"class": "price_color"})
```

其中，`findAll()`函数第一个参数为`html`的标签，`attrs`需要提供键值对，表示类的属性。得到的`all_price`类似一个列表，包含了所有符合要求的标签（但其实是`'bs4.element.ResultSet`对象）.

接下来，我们需要提取出标签中的内容，即价格。

```python
for price in all_price:
    print(price.string)
```

如果只想得到价格本身，而忽略英镑单位，可以这么写程序：

```python
for price in all_price:
    print(price.string[2:])
```

整理得到爬虫的最终总程序为：
```python
import requests
from bs4 import BeautifulSoup

head = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
}
response = requests.get(
    "http://books.toscrape.com/",
    headers=head,
)
print(response.ok)
content = response.text
soup = BeautifulSoup(content, "html.parser")
all_price = soup.findAll("p", attrs={"class": "price_color"})
for price in all_price:
    print(price.string[2:])
```

### 一些变式

如果需要爬取的标签，是`h3`元素下的`a`元素，那需要将程序更改为：
```python
all_price = soup.findAll("h3")
for price in all_price:
    h3_a = price.findAll("a")
    for h3_a_price in h3_a:
        print(h3_a_price.string[2:])
```
即，`findAll`得到的对象可以再次迭代寻找。