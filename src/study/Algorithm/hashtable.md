---
Date: 2025-04-15
tag: algorithm
icon: code
---

# 哈希表

哈希表：主要针对根据特征进行分类的问题

## python 实现形式

- 字典 (`dict()` or `{}`)：python 中的字典就是哈希表，存储了多个键值对，其中“键”可以是字符串，也可以是`int`型整数
- 列表 (`list()` or `[]`)：python 中的列表其实是一种特殊的字典形式，该字典的键是下标索引，值是列表中每个索引对应的值
- `collections.Counter(list)`：计数器，是封装好的哈希表函数，调用时的输入参数是一个列表，该函数会返回一个字典，字典中存储各项值在列表中的出现次数，也是一个哈希表。在使用前需要`import collections`导入需要的库。

判断一个对象是否存在在哈希表中，可以用：`if ele in list`逻辑语句，但是注意，这个`in`在字典类型里，指的是**键**是否在哈希表中。

## 分组的思想

在设计多数求和的算法中，经常用到分组的思想，即：通过遍历其他 n-1 个数据，然后通过 target 值计算第 n 个数据，看第 n 个数据是否在遍历列表中，这样能够有效减小时间复杂度。~~比暴力解法好一点，但是也挺暴力的~~为了方便运算，很多时候甚至不采用“是否在”的判断逻辑，而是**将列表按照大小排序，维护多个指针，n-1 个指针顺序遍历，第 n 个指针逆序遍历**，然后利用已经排序好的优势，跳出一些简单的情况，具体还是做题的时候体会吧，三数之和和四数之和的题目都挺暴力的。

- [1.两数之和](https://leetcode.cn/problems/two-sum/description/)
- [454.四数相加 II](https://leetcode.cn/problems/4sum-ii/description/)
- [15.三数之和](https://leetcode.cn/problems/3sum/submissions/622409638/)
- [18.四数之和](https://leetcode.cn/problems/4sum/description/)
