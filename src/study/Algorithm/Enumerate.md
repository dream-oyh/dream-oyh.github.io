---
date: 2024-07-26
tag: algorithm
---

# 枚举

## 1512.好数对的数目

[link](https://leetcode.cn/problems/number-of-good-pairs/description/?envType=study-plan-v2&envId=primers-list)

::: tip 题目
给你一个整数数组 `nums` 。

如果一组数字 `(i,j)` 满足 `nums[i] == nums[j]` 且 `i < j` ，就可以认为这是一组好数对。

返回好数对的数目。
:::

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

::: tip 题目
给你一个整数数组 `arr` ，以及 `a、b 、c` 三个整数。请你统计其中好三元组的数量。

如果三元组 `(arr[i], arr[j], arr[k])` 满足下列全部条件，则认为它是一个 好三元组。

`0 <= i < j < k < arr.length`

`|arr[i] - arr[j]| <= a`

`|arr[j] - arr[k]| <= b`

`|arr[i] - arr[k]| <= c`

其中`|x|`表示 `x` 的绝对值。

返回好三元组的数量。

`3 <= arr.length <= 100`

`0 <= arr[i] <= 1000`

`0 <= a, b, c <= 1000`
:::

```python
class Solution(object):
    def countGoodTriplets(self, arr, a, b, c):
        """
        :type arr: List[int]
        :type a: int
        :type b: int
        :type c: int
        :rtype: int
        """
        arr_length = len(arr)
        number_sum = [0] * 1001
        ans = 0
        for j in range(arr_length):
            for k in range(j + 1, arr_length):
                if abs(arr[j] - arr[k]) <= b:
                    low_bound = max(0, -a + arr[j], -c + arr[k])
                    up_bound = min(a + arr[j], c + arr[k], 1000)

                    if low_bound <= up_bound:
                        if low_bound == 0:
                            ans += number_sum[up_bound]
                        else:
                            ans += number_sum[up_bound] - number_sum[low_bound - 1]

            for index in range(arr[j], 1001):
                number_sum[index] += 1
        return ans
```

**一句话题解：** 利用其中两条约束解出其中一个变量的取值范围，化三维循环为二维循环