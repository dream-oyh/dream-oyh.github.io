---
date: 2024-07-27
tag: algorithm
---

# 贪心算法

贪心算法是用于解决 NP 完全问题的算法，即：一个问题除了暴力枚举以外没有其他有效的解决方法，时间空间复杂度在问题组合数变多时急剧增大，不利于算法求解。此时考虑用贪心算法进行近似的计算，贪心算法不要求提供最好的最优解，但是能够缩小时间和空间复杂度以达到一个近似的完美解。

什么时候要使用贪心算法，就要学会辨识 NP 完全问题，一般分为两类：

1. 集合覆盖问题
2. 旅行商问题

::: tip 判断 NP 完全问题的方法——《算法图解》

1. 元素较少时算法的运行速度很快，但随着元素数量增加，速度会变得非常慢
2. 涉及“所有组合”的问题通常是 NP 完全问题
3. 不能将问题分成小问题，必须考虑各种可能的情况，这可能是 NP 完全问题
4. 如果问题涉及序列（如旅行商中的城市序列）且难以解决，这可能是 NP 完全问题
5. 如果问题涉及集合（如广播台集合）且难以解决，这可能是 NP 完全问题
6. 如果问题能够转化为集合覆盖问题或旅行商问题，那他肯定是 NP 完全问题
   :::

## 集合覆盖问题

**题目：**

我们需要在美国选取若干广播台，要求选取尽可能少的广播台来覆盖我们需要的洲（每个广播台覆盖范围一定，集：覆盖的洲一定），现已给出需要覆盖的洲和各个广播台的覆盖洲范围，设计算法完成问题。

``` python
needed_states = set(["mt", "wa", "or", "id", "nv", "ut", "ca", "az"])  # 要覆盖的洲
boardcast_stations = {}
boardcast_stations["kone"] = set(["id", "nv", "ut"])
boardcast_stations["ktwo"] = set(["wa", "id", "mt"])
boardcast_stations["kthree"] = set(["or", "nv", "ca"])
boardcast_stations["kfour"] = set(["nv", "ut"])
boardcast_stations["kfive"] = set(["ca", "az"])

final_stations = set()

while needed_states:
    best_station = None
    covered_states = set()

    for station, states in boardcast_stations.items():
        to_be_covered_states = needed_states & states
        if len(to_be_covered_states) > len(covered_states):
            best_station = station
            covered_states = to_be_covered_states
    needed_states -= covered_states
    final_stations.add(best_station)

print(final_stations)
```

**一句话题解：** 每次选一台广播台，保证选的广播台相比其他未选的广播台能够覆盖最多的未被覆盖的洲，直至所有需要被覆盖的洲都被覆盖