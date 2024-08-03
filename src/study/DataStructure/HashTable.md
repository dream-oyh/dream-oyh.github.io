---
date: 2024-07-22
tag: data_structure
---

# 📈 Hash Table

**Hash Table**: A abstract data structure that maps keys and values.

![](/images/data_structure/hash_table/logistic_view.png =200x)

**Hash Function**: A **hash function** is any function that can be used to map data of arbitrary size to fixed-size values (used for storage address), namely $Hash(keys)=Address$

- Hash function should be **simple**, to reduce the calculating time consumption.
- Hash function should be **uniform**,to avoid multiple values being mapped near the same address, and generating more hash collision.

**Hash Collision**: When two distinct pieces of data in a hash table share the same hash value. The hash value in this case is derived from a hash function which takes a data input and returns a fixed length of bits.(From [Wikipedia](https://en.wikipedia.org/wiki/Hash_collision))

## Common Hash Functions

### Direct addressing method

$$Hash(Key) = a\times Key + b$$

Applications: Key distribution should be known. And the collection of the keys is greatly consecutive and not have a concentrated distribution.

### Modulo method（取模）

$$Hash(Key) = Key \% p$$

$p$ is a prime number which is less than the length of the hash table.

Applications: **Without knowing** the distribution of the keys.

::: tip Why p should be a prime number less than the length of the hash table?

Modulo calculation can map the hash code into the interval between 0 and $p-1$.

$p$ should be a prime number to avoid collision as much as possible.

If the $p$ is bigger than the length of the hash table, the hash table will overflow. We suppose that the length of the hash table is 15. If the %p% equals to 17, the key whose hash code is 16 can't find a appropriate postion to input.
:::

## Hash Collision

### Open addressing method

Open addresssing method is a solution in the linear storage. When the collision happens, this method will **detect other available locations**, rather than creating a new storage.

$$hash'(Key) = (hash(Key)+d_i)\% m$$

$hash'(Key)$ is the detection function, and $m$ is the length of the hash table.

- linear detection

$$d_i = 1,\cdots, m-1$$

- Double detection

$$d_i = 1^2, -1^2, 2^2, -2^2, \cdots, k^2, -k^2(k\le m/2)$$

Jump back and forth! But the detection failure may be occur.

### Chaining

If different keys have the same hash code, they are synonyms for each other. The Chaining method stores synonyms in a linked list under the same address. Search, delete, and insert are implemented in this linked list.

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
