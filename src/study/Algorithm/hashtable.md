---
Date: 2025-04-15
---

# 哈希表

## 题库

哈希表：主要针对根据特征进行分类的问题

::: tip 两数之和
给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出 和为目标值 `target` 的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

[link](https://leetcode.cn/problems/two-sum/?envType=study-plan-v2&envId=top-100-liked)
:::

```python
class Solution(object):
    def twoSum(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        hashtable = dict()
        length = len(nums)
        for i in range(length):
            if target - nums[i] in hashtable:
                return [hashtable[target - nums[i]], i]
            hashtable[nums[i]] = i
        return []
```

题解：利用哈希表记录数和数索引。所以建立哈希表主要得搞清楚，键和值都用来记录什么？其次就是当遇到双重循环的时候，可以考虑一下能不能用哈希表来解除循环。

---

::: tip 字母异位词分组

给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。

字母异位词 是由重新排列源单词的所有字母得到的一个新单词。

[link](https://leetcode.cn/problems/group-anagrams/?envType=study-plan-v2&envId=top-100-liked)
:::

**法一：**

考虑到字母异位词是由具有相同数量的相同字母组成的词，那对其进行排序之后，字母异位词具有相同的字符串序列，因此可以考虑用排序后的字母异位词作为哈希表的键，而用字符串列表作为值。

值得注意的是这里用到了几个我自己没见过的方法：

::: important 小技巧补充

1. `dict = collections.defaultdict()`可以创建一个值为列表的字典，并且创建后直接调用`dict[key].append()`就能向指定键对应的列表内加入新值
2. `sorted()`函数可以对任意列表或字符串排序，排序后返回一个有序列表，如：“asn”在`sorted("asn")`后返回`['a','n','s']`
3. `"".join()`字符串的`join()`函数，可以把一个列表一起 join 进去
4. 字典的键只能用字符串、整数、浮点数、**元组** （对，元组是可以的！）等数据类型表示，不能用字典或列表作为字典的值
   :::

```python
class Solution(object):
    def groupAnagrams(self, strs):
        """
        :type strs: List[str]
        :rtype: List[List[str]]
        """
        strs_hash = collections.defaultdict(list)
        ans = []
        for str in strs:
            strs_hash["".join(sorted(str))].append(str)
        return list(strs_hash.values())
```

**法二：**

利用计数的方法来建立键值，但是如上所述，字典的键不能用列表来实现，因此需要把列表转换为元组来作为字典的键。

```python
class Solution(object):
    def groupAnagrams(self, strs):
        """
        :type strs: List[str]
        :rtype: List[List[str]]
        """
        strs_hash = collections.defaultdict(list)

        for str in strs:
            counts = [0] * 26
            for ch in str:
                counts[ord(ch) - ord("a")] += 1
            strs_hash[tuple(counts)].append(str)
        return list(strs_hash.values())
```

---

::: tip 最长连续序列

给定一个未排序的整数数组 `nums` ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

请你设计并实现时间复杂度为 `O(n)` 的算法解决此问题。

[link](https://leetcode.cn/problems/longest-consecutive-sequence/?envType=study-plan-v2&envId=top-100-liked)

:::

题解：先考虑最简单的暴力求解，需要反复循环数组来判断 num+1 在不在数组内。一旦遇到“存在”问题，就可以考虑一下用哈希表，因为哈希表可以用 $O(1)$ 的复杂度来判断某数是否存在。

而如果一个数是连续数列的开头，他就不应该存在前驱数 $x-1$，所以判断一次 $x-1$ 是否存在在数组中，就可以判断是否存在以该数开头的连续数列，然后一直往后找 $x+1$ 直至 $x+1$ 不存在在数组中为止。

```python
class Solution(object):
    def longestConsecutive(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        longest_streak = 0
        num_set = set(nums)
        for value in num_set:
            if value - 1 not in num_set:
                current_num = value
                current_streak = 1

                while current_num + 1 in num_set:
                    current_num += 1
                    current_streak += 1

                longest_streak = max(current_streak, longest_streak)
        return longest_streak
```

---

::: tip 有效的字母异位词

给定两个字符串 `s` 和 `t` ，编写一个函数来判断 `t` 是否是 `s` 的字母异位词。

注意：若 `s` 和 `t` 中每个字符出现的次数都相同，则称 `s` 和 `t` 互为字母异位词。

[link](https://leetcode.cn/problems/valid-anagram/description/)
:::

利用`collections.Counter(string)`构建一个哈希表，该哈希表的键是`string`里的不重复元素，值是出现次数。判断两个`Counter()`是否相等即可

```python
import collections
class Solution(object):
    def isAnagram(self, s, t):
        """
        :type s: str
        :type t: str
        :rtype: bool
        """
        return True if collections.Counter(s) == collections.Counter(t) else False
```

---

::: tip 有效的数独
题目见：[link](https://leetcode.cn/problems/valid-sudoku/description/)
:::

```python
class Solution(object):
    def isValidSudoku(self, board):
        """
        :type board: List[List[str]]
        :rtype: bool
        """
        rows_count = [[0] * 9 for i in range(9)]
        columns_count = [[0] * 9 for i in range(9)]
        subboxes_count = [[[0, 0, 0], [0, 0, 0], [0, 0, 0]] for i in range(9)]
        for i in range(9):
            for j in range(9):
                if board[i][j] != ".":
                    num = int(board[i][j]) - 1
                    rows_count[num][i] += 1
                    columns_count[num][j] += 1
                    subboxes_count[num][i // 3][j // 3] += 1
                    if (
                        rows_count[num][i] > 1
                        or columns_count[num][j] > 1
                        or subboxes_count[num][i // 3][j // 3] > 1
                    ):
                        return False
        return True
```

题解：用行、列、九宫格三个哈希表来记录数字出现次数。其中`rows_count`为 9x9 矩阵，行表示 1~9 中第几个数字，列表示这个数字出现在第几行；`columns_count`也为 9x9 矩阵，行表示 1~9 中第几个数字，列表示这个数字出现在第几列；`subboxes_count`为 9x3x3 矩阵，第一个维度表示 1~9 中第几个数字，第二个维度和第三个维度共同表示了这个数字出现在哪个九宫格中。

---

::: tip 存在重复元素 II
给你一个整数数组 `nums` 和一个整数 `k`，判断数组中是否存在两个 不同的索引 `i `和 `j`，满足 `nums[i] == nums[j]` 且 `abs(i - j) <= k`。

如果存在，返回 `true`；否则，返回 `false `
:::

法一：利用哈希表存储值和索引，遍历一遍即可

```python
class Solution(object):
    def containsNearbyDuplicate(self, nums, k):
        """
        :type nums: List[int]
        :type k: int
        :rtype: bool
        """
        pos = {}
        for i, num in enumerate(nums):
            if num in pos and i - pos[num] <= k:
                return True
            else:
                pos[num] = i
        return False
```

法二：滑动窗口，注意一下滑动窗口的写法，最好拿滑动窗口结束位去遍历，这样好写一点（其实拿起始位遍历也一样的了，只不过 `i>k` 这个判断标准就更复杂一点了

```python
class Solution2(object):
    def containsNearbyDuplicate(self, nums, k):
        """
        :type nums: List[int]
        :type k: int
        :rtype: bool
        """
        pos = set([])
        for i, num in enumerate(nums):
            if i > k:
                pos.remove(nums[i-k-1])

            if num in pos:
                return True

            pos.add(num)

        return False
```

---

::: tip 两个数组的交集 II
给你两个整数数组 `nums1` 和 `nums2` ，请你以数组形式返回两数组的交集。返回结果中每个元素出现的次数，应与元素在两个数组中都出现的次数一致（如果出现次数不一致，则考虑取较小值）。可以不考虑输出结果的顺序。
:::

法一：哈希表

```python
import collections

class Solution(object):
    def intersect(self, nums1, nums2):
        """
        :type nums1: List[int]
        :type nums2: List[int]
        :rtype: List[int]
        """
        ans = []
        nums2_count = collections.Counter(nums2)
        for num in nums1:
            if num in nums2 and nums2_count[num] >= 1:
                ans.append(num)
                nums2_count[num] -= 1
        return ans
```

法二：双指针（但是需要有序数组）

```python
class Solution(object):
    def intersect(self, nums1, nums2):
        """
        :type nums1: List[int]
        :type nums2: List[int]
        :rtype: List[int]
        """
        i, j = 0, 0
        nums1 = sorted(nums1)
        nums2 = sorted(nums2)
        ans = []
        while i <= len(nums1) - 1 and j <= len(nums2) - 1:
            if nums1[i] > nums2[j]:
                j += 1
            elif nums1[i] < nums2[j]:
                i += 1
            elif nums1[i] == nums2[j]:
                ans.append(nums1[i])
                i += 1
                j += 1
        return ans
```
