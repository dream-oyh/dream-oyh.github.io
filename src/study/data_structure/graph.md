---
date: 2024-06-22
---

# 🗺 Graph

**Graph:** A graph G is an ordered pair of a set V of vertices and a set E of edges.

$$
G=(V,E)
$$

**Logistic View:**

![](/images/data_structure/graph/Untitled.png =200x)

$|V|$: a number of vertices

$|E|$: a number of edges

**Connection**: Between two vertices, the connection can be directed or undirected.

Sometimes we gave edges weight. This graph is called **weighted graph**.

**Walk**: a sequence of vertices where each adjacent pair is connected by an edge.

**Path**: a walk in which no vertices (and thus no edges) are repeated.

**Trail**: a walk in which no edges are repeated.

**Strong connected graphs**: For a directed graph, if there is a path from any vertex to any other vertex.

**Closed walk**: a walk starts and ends at same vertex.

**Simple cycle**: no repetition other than start and end.

**Acyclic graph**: a graph with no cycle, like a tree.

## How to store a graph

### Vertex and edge list

We use string to store the vertex name. Use dynamic arrays to store the edges and the their weights.

![](/images/data_structure/graph/Untitled%201.png =300x)

But this maybe cause costly time complexity.

| Operation                          | Time Complexity                      |
| ---------------------------------- | ------------------------------------ |
| Finding adjacent nodes             | $O(\|E\|)=O(v^2) \rightarrow costly$ |
| Check if given nodes are connected | $O(\|E\|)=O(v^2) \rightarrow costly$ |

### Adjacency Matrix

We use a vertex list and an adjacency matrix to store a graph.

![](/images/data_structure/graph/Untitled%202.png =400x)

The elements in the adjacency matrix are defined as below.

$$
A_{ij} = \left\{ \begin{matrix}
0, & \text{if}\,\exists\, \text{edge from i to j}\\
1, & \text{otherwise}
\end{matrix}\right.
$$

For the weighted graph, the $A_{ij}$ will be defined as below.

$$
A_{ij} = \left\{ \begin{matrix}
\omega, & \text{if}\,\exists\, \text{edge from i to j}\\
\infty, & \text{otherwise}
\end{matrix}\right.
$$

| Operation                          | Time Complexity                                                |
| ---------------------------------- | -------------------------------------------------------------- |
| Finding adjacent nodes             | $O(v)$                                                         |
| Check if given nodes are connected | $O(1)$(Use hash table to match the vertex name with its index) |

We effectively reduce the time-cost, but take huge space-cost. In this method, the unconnected edge information is redundant. If the graph is dense, this method may be effective, but if the graph is sparse, a amount of the space is wasted. While **most graph in the reality is sparse**, that is the number of edges is much smaller than the square of the number of the vertices.

### Adjacency list representation

![](/images/data_structure/graph/Untitled%203.png =200x)

Instead of storing whether the node is connected or not, we choose to store the index of which nodes the targeted node connects to. Showed in the above figure, the first row represents the zeroth node connects to the first, the second and the third node. Specifically, what is the first node? We can search it in the Vertex List. So, by building adjacency list, we can reduce the space complexity from $O(v^2)$ to $O(e)$, which is the smallest memory consumption because in the realistic world, the most graphs are sparse, $|E|<<|V|^2$. We can use pointer to store the adjacency in C++ like the code below.

```cpp
int *A[8];
A[0] = new int[3];
A[1] = new int[3];
A[2] = new int[2];
...
A[7] = new int[4];
```

You can use `A` array to store eight pointers. Each pointer points to a integral array, which stores indices the targeted node connects to.

| Operation                          | Time Complexity         |
| ---------------------------------- | ----------------------- |
| Finding adjacent nodes             | $O(v)$                  |
| Check if given nodes are connected | $O(v)$—by linear search |
| $O(log_2v)$— by binary search      |

It looks like we don’t save the time by using adjacency list, but the time complexity is calculated in the worst performance. If the matrix is much sparse, the difference between two method will show.

Moreover, if we want to store, insert or delete some elements, the array maybe ineffective. Linked List can be used to store data dynamically. And if we wanna store a weighted graph, we just need to change the linked list structure, such as create a new cell to store a weight, matched with the node. Furthermore, if we want to enhance the performance of the adjacency list, we can use the binary search tree to replace the linked list. That will be more interesting!!

![](/images/data_structure/graph/Untitled%204.png)
