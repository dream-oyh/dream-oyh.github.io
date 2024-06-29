---
date: 2024-06-22
---

# 🧮 Linked List

## Why should we create the linked list?

For normal arrays, the data in the memory is stored jointly. But if we need modify some data or extend the arrays, it is hard. Linked list leverages the fixed data sequence, link disjoint data by **Link.** There are two parts in each data block, including data itself, and a pointer, which declared who is the next data block.

In C, we can define a structure:

```cpp
struct Node{
	int data; //4 bytes
	Node* link;  // 4 bytes
};
```

The logistic view of a linked list can be showed as follow.

![](/images/data_structure/linked_list/Untitled.png)

The data is stored in the Node, which includes a data and a link to the next Node. The first Node is called “Head Node”. The address of the Head Node can give us access of the complete linked list. The link of last Node is NULL (invalid address) or zero. Compared to the array, the linked list should visit arbitrary data by going through the whole list, rather than in constant time. We can create or release Node as we want.

**So the time complexity of visiting data is O(n).** But it simplifies the time complexity of modify data, remove data and extend the list.

## Array vs. Linked List

| Item                           | Array                                           | Linked List                                   |
| ------------------------------ | ----------------------------------------------- | --------------------------------------------- |
| Cost of accessing an element   | Constant time O(1)                              | Average Case: O(n)                            |
| Memory requirements            | Fixed size                                      | No unused memory                              |
|                                | Memory may not available due to one large block | Memory may available as multiple small blocks |
|                                | existing unused memory                          | Extra memory for pointer variables            |
| Cost of inserting the elements | - at beginning - O(n)                           | O(1)                                          |
|                                | - at end - O(1) (if the array is not full)      | O(n)                                          |
|                                | - at ith position - O(n)                        | O(n)                                          |
| Easy of Use                    | ✅                                              | ❌                                            |

## Insert the element in arbitrary positions

```cpp
void Insert(int index, int x){
	Node* temp = new Node();
	temp->data = x;
	temp->link = NULL;
	if (index == 1){
		if (head!=NULL) temp->link = head;
		head = temp;
	}else{
		Node* temp1 = head;
		for(int i=0; i<index-2;i++){
			temp1=temp1->link;
		}
		temp->link = temp1->link;
		temp1->link = temp;
	}
}
```

Attention! `new Node()` allocates a memory block for the Node. C++ operates the memory directly, so we can only visit it through address.

We use `temp=head` to store `head` in the formal parameter, because `head` is the only key information about linked list, which contains the address of the head Node. If the value of `head` is changed, we can’t find the head Node and lose this Linked List.

![](/images/data_structure/linked_list/Untitled%201.png)

Insert the new element at the beginning. 👆This time, you should modify `head` .

![](/images/data_structure/linked_list/Untitled%202.png)

Insert the new element in the arbitrary position.👆 This time, you don’t need to modify `head`

## Remove the element in arbitrary positions

```cpp
void remove(int index){
	if(index == 1){
		if(head->link==NULL) head=NULL;
		else{
			head = head->link;
		}
	}else{
		Node* temp1;
		temp1 = head;
		for (int i=0;i<index-2;i++){
			temp1 = temp1->link;
		}
		Node* temp2 = temp1->link;
		temp1->link = temp2->link;
		delete temp2;
	}
}
```

![](/images/data_structure/linked_list/Untitled%203.png)

Remove arbitrary element.👆

## Print the whole linked list RECURSIVELY

It is noteworthy that, when we use recursion, the PC uses stack([Stack](stack.md) ) implicitly.

```cpp
void Print(Node* p){
	//recursive print
	if (p==NULL) {
	cout<<endl;
	return;
	}
	***cout<<p->data<<" ";***
	***Print(p->link);***
}
```

@para: `Node* p` should transfer `head`.

## Print the **REVERSE** linked list RECURSIVELY

```cpp{7,8}
void ReservePrint(Node* p){
	//recursive print
	if (p==NULL) {
	cout<<endl;
	return;
	}
	Print(p->link);
	cout<<p->data<<" ";
}
```

Notice the order of **`Print(p->link);`** and **_`cout<<p->data<<" ";`_**

## Reverse the Linked List Non-recursively

```cpp
void Reverse_nonrecursive(){
	Node *prev, *current, *next;
	prev = NULL;
	current = head;
	while(current != NULL){
		next = current->link;
		current->link = prev;
		prev = current;
		current = next;
	}
	head = prev;
}
```

This time, you need three pointer to store next Node in advance. `Prev`, `Current`, `Next` need to update at the end of the loop.

## Reverse the Linked List RECURSIVELY (Crucial)

```cpp
void Reverse_recursive(Node* temp){
	if(temp->link==NULL){
		head = temp;
		return;
	}
	Reverse_recursive(temp->link);
	Node* q = temp->link;
	q->link = temp;
	temp->link = NULL;
}
```

You can draw the logistic view of Linked List and recursion tree to understand what happened. Come and try it!

## Doubly Linked List

Different from the doubly linked list, in general, the linked list we discuss is a singly linked list.

How to define a doubly Node? This is the implementation in C++. A one Node includes three parts, including a data, a pointer to the next Node and most noteworthy, a pointer to the previous Node.

```cpp
struct Node{
	int data;
	Node* next;
	Node* prev;
}
```

Doubly Node make insertion and removing more easily. You only need one pointer to visit the next Node and the previous Node, eliminating a lot of complex operations.
