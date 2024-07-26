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
