class Node {
    constructor(data, left = null, right = null) {
        this.data = data
        this.left = left
        this.right = right
    }
}

class Tree {
    constructor() {
        this.root = null
    }

    buildTree = arr => {
        // uncomment for sorted array//
        // arr = arr.sort(function(a, b) {
        // return a - b
        // })
        arr = [...new Set(arr)]
        const i = Math.ceil(arr.length / 2)
        this.root = new Node(arr[i])

        arr.splice(i, 1)
        arr.forEach(num => {
            this.insert(num)
        })
    }

    insert = (data, node = this.root) => {
        if (this.root !== null) {
            if (data > node.data) {
                if (node.right !== null) {
                    this.insert(data, node.right)
                } else if (node.right === null) {
                    node.right = new Node(data)
                }
            }
            if (data < node.data) {
                if (node.left !== null) {
                    this.insert(data, node.left)
                } else if (node.left === null) {
                    node.left = new Node(data)
                }
            }
        } else this.root = new Node(data)
    }

    delete = (data, node = this.root) => {
        if (this.root !== null) {
            if (node.data === data) {
                node.data = null
            } else {
                if (data > node.data) {
                    if (node.right !== null) {
                        this.delete(data, node.right)
                    }
                }
                if (data < node.data) {
                    if (node.left !== null) {
                        this.delete(data, node.left)
                    }
                }
            }
        }
    }

    deleteWithChildren = (arr, node = this.root) => {}
}

const tree = new Tree()

tree.buildTree([5, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

////////////////////////
//PRETTY PRINT//
/////////////////////////
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false)
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`)
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true)
    }
}

prettyPrint(tree.root)
tree.delete(6345)
prettyPrint(tree.root)
