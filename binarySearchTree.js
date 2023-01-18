const newNode = (data) => {
  let left = null;
  let right = null;

  return { data, left, right };
};

class Tree {
  constructor(array) {
    this.array = array;
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    if (!array.length) return null;

    const noDuplicatesArray = [];

    for (let i = 0; i < array.length; i++) {
      if (!noDuplicatesArray.includes(array[i])) {
        noDuplicatesArray.push(array[i]);
      }
    }

    noDuplicatesArray.sort((a, b) => a - b);

    const mid = Math.floor(noDuplicatesArray.length / 2);

    const rootNode = newNode(noDuplicatesArray[mid]);

    rootNode.left = this.buildTree(noDuplicatesArray.slice(0, mid));
    rootNode.right = this.buildTree(noDuplicatesArray.slice(mid + 1));

    return rootNode;
  }

  insertNode(node, value) {
    if (this.array.includes(value)) return;

    if (!node) {
      return newNode(value);
    }

    if (value < node.data) {
      node.left = this.insertNode(node.left, value);
    } else {
      node.right = this.insertNode(node.right, value);
    }

    return node;
  }

  deleteNode(node, value) {
    if (!this.array.includes(value)) return;

    if (value === node.data) {
      if (!node.left && !node.right) {
        return null;
      }

      if (!node.right) {
        return node.left;
      }

      if (!node.left) {
        return node.right;
      }

      if (node.left && node.right) {
        let findNode = node.right;

        while (findNode.left) {
          findNode = findNode.left;
        }

        findNode.right = this.deleteNode(node.right, findNode.data);
        findNode.left = node.left;

        return findNode;
      }
    }

    if (value < node.data) {
      node.left = this.deleteNode(node.left, value);
    } else {
      node.right = this.deleteNode(node.right, value);
    }

    return node;
  }

  find(node, value) {
    if (!node) {
      return null;
    }

    if (node.data === value) {
      return node;
    }

    if (value < node.data) {
      return this.find(node.left, value);
    } else {
      return this.find(node.right, value);
    }
  }

  levelOrder(callback) {
    const queue = [this.root];
    const valuesArr = [this.root.data];

    while (queue.length) {
      if (callback) callback(queue[0]);

      if (queue[0].left) {
        queue.push(queue[0].left);
        valuesArr.push(queue[0].left.data);
      }

      if (queue[0].right) {
        queue.push(queue[0].right);
        valuesArr.push(queue[0].right.data);
      }

      queue.shift();
    }

    if (!callback) return valuesArr;
  }

  preorder(callback, root = this.root, arr = []) {
    if (!root) return;

    if (callback) callback(root);
    arr.push(root.data);

    this.preorder(callback, root.left, arr);
    this.preorder(callback, root.right, arr);

    if (!callback) return arr;
  }

  inorder(callback, root = this.root, arr = []) {
    if (!root) return;

    this.inorder(callback, root.left, arr);

    if (callback) callback(root);
    arr.push(root.data);

    this.inorder(callback, root.right, arr);

    if (!callback) return arr;
  }

  postorder(callback, root = this.root, arr = []) {
    if (!root) return;

    this.postorder(callback, root.left, arr);
    this.postorder(callback, root.right, arr);

    if (callback) callback(root);
    arr.push(root.data);

    if (!callback) return arr;
  }

  height(node) {
    if (!node) return -1;

    const sumLeft = this.height(node.left);
    const sumRight = this.height(node.right);

    let sum = sumLeft > sumRight ? sumLeft : sumRight;

    return (sum += 1);
  }

  depth(node, root = this.root, level = 0) {
    if (!node || !root) return -1;

    if (node === root) return level;

    const sumLeft = this.depth(node, root.left, level + 1);
    const sumRight = this.depth(node, root.right, level + 1);

    return sumLeft > sumRight ? sumLeft : sumRight;
  }

  isBalanced(root = this.root) {
    if (!root) return true;

    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);
    const heightDiff = Math.abs(leftHeight - rightHeight);

    if (heightDiff > 1) return false;

    return this.isBalanced(root.left) && this.isBalanced(root.right);
  }

  rebalance() {
    this.array = this.inorder();
    this.root = this.buildTree(this.array);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// DRIVER SCRIPT

const array = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100));
const tree = new Tree(array);

console.log(`Tree is balanced: ${tree.isBalanced()}`);
prettyPrint(tree.root);

console.log("Level Order:", tree.levelOrder());
console.log("Pre Order:", tree.preorder());
console.log("Post Order:", tree.postorder());
console.log("In Order:", tree.inorder());

tree.insertNode(tree.root, 111);
tree.insertNode(tree.root, 222);
tree.insertNode(tree.root, 333);

console.log(`Tree is balanced: ${tree.isBalanced()}`);
prettyPrint(tree.root);

tree.rebalance();
console.log(`Tree is balanced: ${tree.isBalanced()}`);
prettyPrint(tree.root);

console.log("Level Order:", tree.levelOrder());
console.log("Pre Order:", tree.preorder());
console.log("Post Order:", tree.postorder());
console.log("In Order:", tree.inorder());
