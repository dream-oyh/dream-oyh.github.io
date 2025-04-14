---
Date: 2025-04-14
---

# 链表

有关链表的基础结构，我已经写在了博客的[数据结构](../DataStructure/linked_list.md)栏目里，具体的 C++ 代码可以查看仓库。[ref](https://github.com/dream-oyh/data-structure-code)

链表里面涉及的算法主要是双指针和递归。

链表数据在内存里不是连续分布的，而是离散分布，通过指针指向另外一个内存地址。也就是说，我只要知道了一个链表头结点的地址，我就能依次拎起整个链表，而不需要像数组那样，把整个数据块都告诉我。但是也由于链表的指针特性，导致链表只能单向查找 _（或者构建双向链表实现双向的查找）_，链表查找数据的时间复杂度达到了$O(n)$。

## 节点数据结构定义

我用 python 用得比较多，但是 python 里面没有指针的概念，所以在定义头结点的时候，需要直接把`self.next`赋值为一个`ListNode`类型的变量，也就是说直接把下一个节点赋值给他。

```python{4}
class ListNode:
    def __init__(self, val=0, next: ListNode=None):
        self.val = val
        self.next = next
```

## 虚拟头结点

为了方便使用递归，使得我们在处理链表时，不需要对头结点额外做处理，我们往往会创建一个虚拟头结点，这个虚拟头结点的`next`指针指向链表的头结点，这个虚拟节点包含的值是什么不重要，重要的是其指针指向了头结点，可以说消除了头结点的特殊性。

## 双指针

这个在数组里就见到过很多次了，双指针可能被用于“需要判断两个节点相等”的题目中 _（不准确，有点以偏概全的嫌疑）_，最麻烦的题是环形链表 II，这个看[解析](https://programmercarl.com/0142.环形链表II.html)说得很清楚了，这里不做记录。

- [206.翻转链表](https://leetcode.cn/problems/reverse-linked-list/description/) <Badge type="tips" text="简单" />
- [19.删除倒数第 N 个节点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/) <Badge type="tips" text="简单" />
- [02.07.链表相交](https://leetcode.cn/problems/intersection-of-two-linked-lists-lcci/description/) <Badge type="tips" text="简单" />
- [142.环形链表 II](https://leetcode.cn/problems/linked-list-cycle-ii/description/) <Badge type="danger" text="困难" />

## 递归

在对链表进行操作的时候，包括连续插入，打印链表值等需要循环操作的过程，我们通过递归能够使代码变得简洁。但是递归很容易被绕晕，最有效的防止晕递归的方法是：**在写好代码之前不要让思绪陷入递归树中，而是直接考虑递归函数作为整体完成了什么步骤**。

递归的学习可以看[五点七边](https://space.bilibili.com/643755221/upload/video)up 主的系列视频，讲的很细致。

- [1.递归中的逆向思维](https://www.bilibili.com/video/BV1214y157HG/)
- [2.如何治疗晕递归？](https://www.bilibili.com/video/BV1C14y1V77j)
- [3.递归树与时间复杂度](https://www.bilibili.com/video/BV1TY411Z7Bj)

我认为最重要的是第二集，递归的组成部分有三：`基础情况调用`、`递归函数调用`、`递推到当前层`。在设计递归算法的时候，可以先从最简单的情况开始考虑，慢慢往上加数量，变得更难，然后从中发现能够被重复操作、具有相似特性的操作，将其放入递归调用中，也就是视频里提到的`超级操作`，在这一步，不用去考虑里面的具体实现，而是应该相信这一步能够做到我们要他做的事情，然后将其视作一个整体组织代码顺序。

链表里目前碰到的递归有：

- [24.两两交换链表中的节点](https://leetcode.cn/problems/swap-nodes-in-pairs/description/) <Badge type="warning" text="中等" />

别急，链表里的递归都是简单的，等到了动态规划才有的受。
