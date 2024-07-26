---
date: 2024-07-26
tag: algorithm
---

# 排序

## 快速排序

“分而治之”思想的体现，随机选取一个值，列表中比该值小的组成一个列表`less`，列表中比该值大的组成一个列表`greater`；对这两个列表再分别进行快速排序，是一种递归的做法，Python 实现代码如下：

```python
def quick_sort(array: list):
    less = []
    greater = []
    equals = []
    array_length = len(array)
    if array_length <= 1:
        return array

    base_value = random.choice(array)
    for num in array:
        if num < base_value:
            less.append(num)
        elif num > base_value:
            greater.append(num)
        elif num == base_value:
            equals.append(num)
    sorted_less_array = quick_sort(less)
    sorted_great_array = quick_sort(greater)
    return sorted_less_array + equals + sorted_great_array
```

Example:

```python
array = [1,6,2,7,1,8,2,8,23,73,67]
sorted_array = quick_sort(array)
print(sorted_array)
```

Output:

```python
[1, 1, 2, 2, 6, 7, 8, 8, 23, 67, 73]
```
