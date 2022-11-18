class Node {
    constructor(data, left = null, right = null) {
        this.data = data
        this.left = left
        this.right = right
    }
    insert(data) {
        if (this.data === data) {
            throw Error("data already exsits within tree")
        } else if (this.data > data) {
            if (this.left) {
                this.left.insert(data)
            } else {
                this.left = new Node(data)
            }
        } else if (this.right) {
            this.right.insert(data)
        } else {
            this.right = new Node(data)
        }
    }
}

class Tree {
    constructor() {
        this.root = null
    }

    buildTree = arr => {
        // arr = arr.sort(function(a, b) {
        // return a - b
        // })
        arr = [...new Set(arr)]
        const i = Math.floor(arr.length / 2)
        this.root = new Node(arr[i])

        arr.splice(i, 1)
        arr.forEach(num => {
            this.insert(num)
        })
    }
    insert(data) {
        if (this.root) {
            this.root.insert(data)
        } else {
            this.root = new Node(data)
        }
    }
}

const tree = new Tree()

tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
