class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }

    changeLeft = node => {
        this.left = node
    }

    changeRight = node => {
        this.right = node
    }
}

class Tree {
    constructor(arr) {
        this.root = arr
    }

    buildTree = arr => {
        arr = arr.sort(function (a, b) {
            return a - b
        })

        arr = [...new Set(arr)]

        const root = Math.floor(arr.length / 2)
        console.log(arr)
    }
}

const tree = new Tree()

tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
