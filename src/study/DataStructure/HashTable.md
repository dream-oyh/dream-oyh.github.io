---
date: 2024-07-22
tag: data_structure
---
# Hash Table

**Hash Table**: A abstract data structure that maps keys and values.

![](/images/data_structure/hash_table/logistic_view.png =200x)

**Hash Function**: A **hash function** is any function that can be used to map data of arbitrary size to fixed-size values (used for storage address), namely $Hash(keys)=Address$

  - Hash function should be **simple**, to reduce the calculating time consumption.
  - Hash function should be **uniform**,to avoid multiple values being mapped near the same address, and generating more hash collision.

**Hash Collision**: When two distinct pieces of data in a hash table share the same hash value. The hash value in this case is derived from a hash function which takes a data input and returns a fixed length of bits.(From [Wikipedia](https://en.wikipedia.org/wiki/Hash_collision))

## Common Hash Functions

### Direct addressing method

$$Hash(Key) = a\times Key + b$$

Applications: Keys are known. And the collection of the keys is consecutive and not 