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
        if (data === this.root.data) {
            this.root = this.deleteWithChildren(data, node)
        } else if (this.root !== null) {
            if (data > node.data) {
                if (node.right.data === data) {
                    if (
                        (node.right.left === null) &
                        (node.right.right === null)
                    ) {
                        return (node.right = null)
                    } else {
                        if (
                            node.right.right !== null &&
                            node.right.left !== null
                        ) {
                            return (node.right = this.deleteWithChildren(
                                data,
                                node.right
                            ))
                        } else if (node.right.right && !node.right.left) {
                            return (node.right = this.deleteWithSingleChild(
                                data,
                                node.right,
                                "right"
                            ))
                        } else if (!node.right.right && node.right.left) {
                            return (node.right = this.deleteWithSingleChild(
                                data,
                                node.right,
                                "left"
                            ))
                        }
                        throw Error("single arm child")
                    }
                }
                this.delete(data, node.right)
            }
            if (data < node.data) {
                if (node.left.data === data) {
                    if (
                        (node.left.left === null) &
                        (node.left.right === null)
                    ) {
                        return (node.left = null)
                    } else {
                        if (
                            node.left.right !== null &&
                            node.left.right !== null
                        ) {
                            return (node.left = this.deleteWithChildren(
                                data,
                                node.left
                            ))
                        } else if (node.left.right && !node.left.left) {
                            return (node.left = this.deleteWithSingleChild(
                                data,
                                node.left,
                                "right"
                            ))
                        } else if (!node.left.right && node.left.left) {
                            return (node.left = this.deleteWithSingleChild(
                                data,
                                node.left,
                                "left"
                            ))
                        }
                        throw Error("single arm child")
                    }
                }
                this.delete(data, node.left)
            }
        }
    }

    deleteWithChildren = (data, node = this.root) => {
        console.log("deleteWithChildren")
        let tempNode = node
        let recFindSmallest = node => {
            if (node.left === null) {
                return node
            }
            node = node.left
            return recFindSmallest(node)
        }
        let smallest = recFindSmallest(node.right)
        tempNode.data = smallest.data

        let recRemoveDup = (data, node) => {
            if (data === node.data) {
                return (node = node.right)
            }
            node = node.left
            return recRemoveDup(data, node)
        }
        let replacementNode = recRemoveDup(tempNode.data, tempNode.right)
        tempNode.right = replacementNode
        return tempNode
    }

    //copied from previous code, works to remove single child somewhat//
    deleteWithSingleChild = (data, node, arm) => {
        console.log("deleteSinglechild")
        let tempNode = node
        let recFindSmallest = node => {
            if (node.left === null) {
                return node
            }
            node = node.left
            return recFindSmallest(node)
        }
        let smallest
        if (arm === "right") {
            // console.log(node)
            smallest = recFindSmallest(node.right)
        } else if (arm === "left") {
            smallest = recFindSmallest(node.left)
        }
        tempNode.data = smallest.data
        // console.log(tempNode)

        let recRemoveDup = (data, node, arm) => {
            if (data === node.data) {
                if (arm === "right") {
                    return (node = node.right)
                } else if (arm === "left") {
                    return (node = node.left)
                }
            }
            node = node.left
            return recRemoveDup(data, node, arm)
        }
        let replacementNode
        if (arm === "right") {
            console.log("hello right")
            replacementNode = recRemoveDup(tempNode.data, tempNode.right, arm)
            tempNode.right = replacementNode
        } else if (arm === "left") {
            replacementNode = recRemoveDup(tempNode.data, tempNode.left, arm)
            tempNode.left = replacementNode
        }
        console.log(replacementNode)
        // console.log(arm)
        // tempNode.right = replacementNode

        console.log(tempNode)
        return tempNode
    }
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
tree.delete(67)
prettyPrint(tree.root)
