---
Date: 2025-03-31
tag: algorithm
---

# 数组

## 二分查找

二分查找的模板代码：

```python {3,5,9,11}
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        left, right = 0, len(nums) - 1  # 定义 target 在左闭右闭的区间里，[left, right]

        while left <= right:
            middle = left + (right - left) // 2

            if nums[middle] > target:
                right = middle - 1  # target 在左区间，所以 [left, middle - 1]
            elif nums[middle] < target:
                left = middle + 1  # target 在右区间，所以 [middle + 1, right]
            else:
                return middle  # 数组中找到目标值，直接返回下标
        return -1  # 未找到目标值
```

二分查找要想明白是用“左闭右开区间”写还是“左闭右闭区间”

- 【方法一】左闭右闭区间

写二分查找要注意两个地方，一个是 `while` 循环的判断条件怎么写，一个是 `if` 条件判断后，`left` 和 `right` 的更新怎么写，这两个地方的书写都取决于区间的定义

1. while：循环判断。是`left<right`还是`left<=right`，如果是左闭右闭区间，那要加上等于号，因为左等于右在索引上是合法的
2. left 和 right 值更新方法：

   - `if target>nums[middle]`，此时应该更新 `left` 的值，考虑到此时 `nums[middle]`不是目标数，所以 `left` 的更新不应该把他包含进去，所以是 `middle+1`
   - `if target<nums[middle]`，此时应该更新 `right` 的值，考虑到此时 `nums[middle]`不是目标数，所以 `right` 的更新不应该把他包含进去，所以是 `middle-1`

- 【方法二】左闭右开区间

参考左闭右闭区间可以写出这段代码，但是要注意，在对 `right` 赋初始值的时候，因为右边是不包括的，所以要赋值为 `len(nums)`，而不是 `len(nums)-1`

### 34. 在排序数组中查找元素的第一个和最后一个位置

[题目链接](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/description/)

```python {16,28}
class Solution(object):
    def searchRange(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        left = 0
        right = len(nums) - 1
        first = -1
        last = -1
        while left<=right:
            middle = (left + right) // 2
            if (nums[middle] == target):
                first = middle
                right = middle - 1
            elif (nums[middle]< target):
                left = middle + 1
            elif (nums[middle]>target):
                right = middle - 1

        left = 0
        right = len(nums) - 1
        while left<=right:
            middle = (left + right) // 2
            if (nums[middle] == target):
                last = middle
                left = middle + 1
            elif (nums[middle]< target):
                left = middle + 1
            elif (nums[middle]>target):
                right = middle - 1
        return [first, last]
```

代码随想录上的答案我认为给复杂了，这题的思路就是**做两次二分查找**，第一次查目标序列第一个索引，第二次查目标序列最后一个索引

如果我们要保证查找序列的第一个值，那就只要在 middle 查到序列中间值的时候，让右边界再往左一格，这样就能迫使这个查找继续往左查。查找序列最后一个值是同理的，要迫使左边界往右走，然后分两次写就写成了上面的代码。

## 移除元素

```python
class Solution(object):
    def removeElement(self, nums, val):
        """
        :type nums: List[int]
        :type val: int
        :rtype: int
        """
        fast = 0
        slow = 0
        for i in range(len(nums)):
            if nums[fast] != val:
                nums[slow] = nums[fast]
                slow += 1
            fast += 1
        return slow
```

用双指针好巧妙！记一下双指针的这种思路，遇到“原地”处理的时候会很好用

### 844. 比较含退格的字符串

```python {14,18}
class Solution(object):
    def backspaceCompare(self, s, t):
        """
        :type s: str
        :type t: str
        :rtype: bool
        """
        return self.remove_s(s) == self.remove_s(t)
    def remove_s(self, arr):
        arr = list(arr)
        slow = 0
        for fast in range(len(arr)):
            if arr[fast] == "#":
                slow = max(0, slow - 1)
            else:
                arr[slow] = arr[fast]
                slow += 1
        return arr[:slow]
```

力扣官方给的题解是用逆序的双指针思想来做（当然用栈做会更方便），但是逆序写真的很丑，这题用正序也可以做，代码如上。在遇到`#`号时，让慢指针回退一格，同时要做一下判断，回退有没有超出数组边界，最后返回的值注意是没有包括慢指针所指项的。

## 滑动窗口

相关题目：

- [209.长度最小的子数组<Badge type="warning" text="中等" />](https://leetcode.cn/problems/minimum-size-subarray-sum/description/)
- [904.水果成篮<Badge type="warning" text="中等" />](https://leetcode.cn/problems/fruit-into-baskets/description/)
- [76.最小覆盖子串<Badge type="danger" text="困难" />](https://leetcode.cn/problems/minimum-window-substring/description/)

滑动窗口经常用来解决**最短/最长子序列**的问题，滑动窗口的范围又双指针来限定，如果满足条件，尾部指针先向前进，不满足条件，头部再往前跟上。为了判断这个条件，很多时候需要用到其他模型，like 哈希表等。
