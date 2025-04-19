---
Date: 2025-04-19
tag: algorithm
icon: code
---

# 字符串

字符串这里如果用 python 写，会跳过很多算法的思想，因为 python 就算不调用库函数，用列表存储字符串也是非常的方便，不需要像 C++ 那样各种双指针扩写。最麻烦的应该是子字符串匹配算法，也就是大名鼎鼎的 KMP 算法，这个算法网上已经有很多教程了，我把我看过的比较好的链接都放在这里。

## KMP 算法

- [KMP 算法概述](https://www.bilibili.com/video/BV1AY4y157yL)

这个视频把 KMP 主要流程讲的差不多了，但是对于 next 数组的求解讲的有点快了，建议看下一个视频。

- [next 数组求解方法](https://www.bilibili.com/video/BV1Er421K7kF)

这个视频引入了前缀函数，用来详细说明什么是 next 数组。最精彩的是在 4:11 秒时，橙色、绿色、蓝色区间的递推，很好地说明了怎么最快地找到下一个字符的 next 值。而且这个视频的方法比上一个好，对合并串调用一次前缀函数，就可以直接出结果了。**注意：** 这个视频最后给出的代码是不完整的，省略了`next.append(pre_len)`的步骤，建议参考我的代码。

**以及：** 第一个视频里，对 next 数组和主串分别遍历并非是没有道理的，第二个视频里用`#`把模式串和主串连接在一起是取巧的方法，因为真正在搜索匹配过程中，你不知道这个`#`是否会干扰到原有主串，分别遍历是更加普适的方法。

具体的 python 代码如下：

```python{21}
class Solution(object):
    def strStr(self, haystack, needle):
        """
        :type haystack: str
        :type needle: str
        :rtype: int
        """
        combined_string = needle + "#" + haystack
        next = self.build_next(combined_string)
        for i, ele in enumerate(next):
            if ele == len(needle):
                return i - 2*len(needle)
        return -1

    def build_next(self, s):
        next = [0]
        for i in range(1, len(s)):
            pre_len = next[i - 1]

            while pre_len > 0 and s[pre_len] != s[i]:
                pre_len = next[pre_len - 1]  # 这段参考第二个视频的 4:11 秒处讲解

            if s[pre_len] == s[i]:
                pre_len += 1
            next.append(pre_len)
        return next
```
