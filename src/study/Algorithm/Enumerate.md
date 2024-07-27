---
date: 2024-07-26
tag: algorithm
---

# 枚举

## 1512.好数对的数目

[link](https://leetcode.cn/problems/number-of-good-pairs/description/?envType=study-plan-v2&envId=primers-list)

给你一个整数数组 `nums` 。

如果一组数字 `(i,j)` 满足 `nums[i] == nums[j]` 且 `i < j` ，就可以认为这是一组好数对。

返回好数对的数目。

```python
import collections

class Solution(object):
    def numIdenticalPairs(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        countMap = collections.Counter(nums)
        return sum(v * (v - 1) / 2 for k, v in countMap.items())
```

一句话题解：利用哈希表统计出各个数字出现次数，利用排列组合 $C_v^2$ 计算好数对数目

## 统计好三元组

[link](https://leetcode.cn/problems/count-good-triplets/description/?envType=study-plan-v2&envId=primers-list)

给你一个整数数组 `arr` ，以及 `a、b 、c` 三个整数。请你统计其中好三元组的数量。

如果三元组 `(arr[i], arr[j], arr[k])` 满足下列全部条件，则认为它是一个 好三元组 。

`0 <= i < j < k < arr.length`

`|arr[i] - arr[j]| <= a`

`|arr[j] - arr[k]| <= b`

`|arr[i] - arr[k]| <= c`

其中`|x|`表示 `x` 的绝对值。

返回好三元组的数量。

`3 <= arr.length <= 100`

`0 <= arr[i] <= 1000`

`0 <= a, b, c <= 1000`