---
date: 2024-06-22
tag: data_structure
---

# 🗄 Stack

## The Features of Stack

The item in the stack must be inserted or removed from the top of the stack. —“Last in First Out”(LIFO)

**Definition:** The Stack is a list with the restriction that insertion and deletion must be performed only from the end, called the top.

**Operations:** 1. push(x) 2.pop() 3.top() 4.IsEmpty() —All can be accomplished in the constant time. The time complexity is O(1).

**Logistic View:**

![](/images/data_structure/stack/Untitled.png)

**Applications:**

- Function Calls / Recursions
- Undo Operations
- Balanced Parentheses

## Use linked list to implement a stack

We can insert/delete the element at

- ❌ the end of the linked list (tail)
- ✅ the beginning (head)

For each operation in the stack should be in the constant time, we choose to insert or delete the elements at the beginning.

This is implementation in C++:

### Include and main()

```cpp
#include<iostream>
using namespace std;
struct Node{
	int data;
	Node* link;
};

Node* top;
void push(int x);
void Print(Node*);
void pop();
int Top();
bool IsEmpty();
int main(){
	top = NULL;
	push(5);
	push(7);
	push(8);
	pop();
	cout<<Top()<<endl;
	cout<<IsEmpty()<<endl;
	cout<<"Stack is:";
	Print(top);
}
```

### Push()

```cpp
void push(int x){
	Node* temp = new Node();
	temp->data = x;
	temp->link = NULL;
	if (top != NULL)temp->link = top;
	top = temp;
}
```

### pop()

```cpp
void pop(){
	Node* temp = top;
	top = top->link;
	delete temp;
}
```

### Print()

```cpp
void Print(Node* top){
	if(top == NULL){
		cout<<endl;
		return;
	}else{
		cout<<top->data<<" ";
		Print(top->link);
	}
}
```

### Top()

```cpp
int Top(){
	return top->data;
}
```

### IsEmpty()

```cpp
bool IsEmpty(){
	return top==NULL?true:false;
}
```

## Applications

### Balanced Parentheses

Solution:

- Scan from left to right;
- if opening symbol add it to a list.
- if closing symbol, remove last opening symbol in the list.
- should end with an empty list.

**First opened, last closed**

Pseudocode:

```cpp
void CheckBalancedParentheses(char exp){
	n <- length(exp);
	Create a Stack: S;
	for i <- 0 to n-1{
		if exp[i] is "(" or "[" or "{"
		{
			S.push(exp[i])
		}else if exp[i] is ")" or "]" or "}"{
			if S.empty() || top doesn't pair with exp[i] {
				return false;
			}else{
				S.pop();
			}
		}
	}
	return S is empty?true:false;
}
```

### Infix, Postfix, Prefix—Evaluation of expressions

Order of operation:

1. Parentheses
2. Exponents (from right to left)
3. Multiplications and division (from left to right)
4. Addition and subtraction (from left to right)

**Infix:** `<operand><operator><operand>` `HUMAN-READABLE`

- Operand is an object on which operation is performed.

**Prefix:** `<operator><operand><operand>` `GOOD-FOR-MACHINE`

**Postfix:** `<operand><operand><operator>` `GOOD-FOR-MACHINE`

To calculate arbitrary expression, we need to convert infix to postfix or prefix by the order of operation.

| Infix  | Prefix     | Postfix    |
| ------ | ---------- | ---------- |
| 2+3    | + 2 3      | 2 3 +      |
| p\*q   | \* p q     | p q \*     |
| a+b\*c | + a \* b c | a b c \* + |

Calculate expression by postfix, the pseudocode is as follow:

```cpp
int CalculatePostfix(exp){
	n <- length(exp);
	Create Stack: S
	for i from 0 to n-1{
		if exp[i] is operand
		S.push(exp[i]);
		else if exp[i] is "+" or "-" or "*" or "/"{
		op1 = S.top();
		S.pop();
		op2 = S.top();
		op3 = operate op1 and op2
		S.push(op3)
		}
	return S.top();
	}
}
```

But how can we get the postfix?

```cpp
char InfixtoPostfix(exp){
	n <- length(exp);
	create a stack S;
	res <- empty string;
	for i from 0 to n-1{
		if exp[i] is opearand
			res <- res + exp[i];
		else if exp[i] is operator
			while (!S.empty() && HasHigherPrec(S.top(), exp[i]))
			{
				res <- res + S.top();
				S.pop();
			}
			S.push(exp[i])
	}
	while(!S.empty()){
		res <- res + S.top();
		S.pop();
	}
	return res;
}
```

If the expression has a parentheses, we need to do some certain regulation:

- When the operation in the stack has higher precedence than the operation in the expression, you should pop the operation till the top of stack is parentheses;
- Parentheses is regarded as a specific operation. It also needs to be pushed into the stack.
- When meeting the closing parentheses, the stack should pop all operation till the top of the stack is the opening parentheses, and pop this opening parenthesis as well.
- The popped parentheses doesn’t need to be record in the ultimate result.

We need to correct the pseudocode. The corrected part has been highlighted.

```cpp{9,15-23}
char InfixtoPostfix(exp){
	n <- length(exp);
	create a stack S;
	res <- empty string;
	for i from 0 to n-1{
		if exp[i] is opearand
			res <- res + exp[i];
		else if exp[i] is operator{
			while (!S.empty() && HasHigherPrec(S.top(), exp[i]) && !IsOpeningParentheses(S.top()))
			{
				res <- res + S.top();
				S.pop();
			}
			S.push(exp[i])
			}else if IsOpeningParentheses(exp[i]){
				S.push(exp[i])
			}else if IsClosingParentheses(exp[i]){
				while(!S.empty() && !IsOpeningParentheses(S.top())){
					res <- res + S.top();
					S.pop()
				}
				S.pop();  // pop the opening parentheses
			}
	}
	while(!S.empty()){
		res <- res + S.top();
		S.pop();
	}
	return res;
}
```
