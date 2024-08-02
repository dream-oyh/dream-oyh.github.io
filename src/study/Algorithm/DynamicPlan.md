---
date: 2024-08-01
tag: dynamic planning, algorithm
---

# 动态规划

动态规划：给定一个问题，我们把它拆成一个个子问题，直到子问题可以直接解决，然后把子问题的答案保存下来，以减少重复计算，再根据子问题答案反推，得出原问题解的一种方法。

动态规划路线：dfs 暴力求解 -> 记忆化搜索 -> 正序递推 -> 倒序递推 -> 空间优化

## 斐波那契类型

::: tip 爬楼梯

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
:::

```python
class Solution(object):
    def climbStairs(self, n):
        """
        :type n: int
        :rtype: int
        """
        count = [0] * (n + 1)
        count[0] = 1
        count[1] = 1
        for i in range(2, n + 1):
            count[i] = count[i - 1] + count[i - 2]
        return count[n]
```

题解：动态规划是用“怎么来的”想问题的，对于任意一个 `count[i][j]`，可以如何由`count[i][j-1]`或`count[i-1][j-1]`等等已有情况推导出来。所以对于动态规划的问题，应该先考虑最简单的情况，找出特殊解；再分解出子问题，找到任意位置的通解；最后通过循环或者递归实现程序。具体的思考方法每道题都不一样，应该多加练习

[可视化讲解](https://www.bilibili.com/video/BV1LS411w7A2)

---

::: tip 使用最小花费爬楼梯

给你一个整数数组 `cost` ，其中 `cost[i]` 是从楼梯第 `i` 个台阶向上爬需要支付的费用。一旦你支付此费用，即可选择向上爬一个或者两个台阶。

你可以选择从下标为 `0` 或下标为 `1` 的台阶开始爬楼梯。

请你计算并返回达到楼梯顶部的最低花费。
:::

```python
class Solution(object):
    def minCostClimbingStairs(self, cost):
        """
        :type cost: List[int]
        :rtype: int
        """
        n = len(cost)
        prev = curr = 0
        for i in range(2, n + 1):
            nxt = min(curr + cost[i - 1], prev + cost[i - 2])
            prev, curr = curr, nxt
        return curr
```

题解：思考“怎么来的”，那第 n 阶台阶既然要费用最小，就应该是（前一阶台阶已有费用 + 跨一步所需费用，前两阶台阶已有费用 + 跨两步费用）的最小值，考虑到第 n 阶台阶的计算只和第 i-1 和 i-2 两阶台阶有关，所以采用了滚动数组节省空间复杂度。

---

::: tip 打家劫舍 I

你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你不触动警报装置的情况下，一夜之内能够偷窃到的最高金额。

:::

```python
class Solution(object):
    def rob(self, nums: list[int]):
        """
        :type nums: List[int]
        :rtype: int
        """
        length = len(nums)
        f = [0] * (length + 2)
        for i in range(length-1, -1, -1):
            f[i] = max(f[i + 2] + nums[i], f[i + 1])
        return f[0]
```

题解：尝试画出递归思路图，先讨论是否偷 0 号位，若不偷 0 号位，则只偷 1 号；若偷 0 号位，则只能偷 2 号，其偷取钱财数量为 2 号的钱 + 在 0 号位偷的钱。尽量把图画出来，就可以发现，要对 n 号位讨论偷与不偷时，需要明白从 1 号位偷到 n-1 号位和 1 号位偷到 n-2 号位的最大价值。

建议看看这个视频理解一下：[只需要跳转到打家劫舍即可](https://www.bilibili.com/video/BV1r84y1379W)

