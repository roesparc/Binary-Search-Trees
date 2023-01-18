# Binary Search Trees

This project is an implementation of a balanced binary search tree (BST) in JavaScript.

The project includes a `Tree` class that has the following methods:

- `buildTree(array)`: Takes an array of data and turns it into a balanced binary tree full of node objects that are appropriately placed. The function sorts the array, removes duplicates and returns the level-0 root node
- `insertNode(node, value)`: Takes a value and inserts it into the tree at the appropriate position
- `deleteNode(node, value)`: Takes a value and removes it from the tree
- `find(node, value)`: Takes a value and returns the node with the given value
- `levelOrder(callback)`: Takes a function as a parameter and traverse the tree in breadth-first level order. If no callback is given, it returns an array of values
- `inorder(callback)`: Takes a function as a parameter and traverse the tree in inorder depth-first order. If no callback is given, it returns an array of values
- `preorder(callback)`: Takes a function as a parameter and traverse the tree in preorder depth-first order. If no callback is given, it returns an array of values
- `postorder(callback)`: Takes a function as a parameter and traverse the tree in postorder depth-first order. If no callback is given, it returns an array of values
- `height(node)`: Takes a node and returns its height, which is defined as the number of edges in the longest path from the given node to a leaf node
- `depth(node)`: Takes a node and returns its depth, which is defined as the number of edges in the path from the given node to the tree's root node
- `isBalanced()`: Checks if the tree is balanced. A balanced tree is one where the difference between the heights of the left and right subtrees of every node is not more than 1
- `rebalance()`: Rebalances an unbalanced tree

This project also includes a `newNode` factory function that returns the following attributes:

- `data`: The value stored in the node
- `left`: The left child of the node
- `right`: The right child of the node

And a simple driver script that ties everything together and provides an example of how the methods in the `Tree` class can be used to build and maintain a balanced binary search tree.
