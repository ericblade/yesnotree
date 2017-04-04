class Tree {
    constructor(treeObj) {
        this.nodes = [];
        this.currentNode = 0;

        const add = ({ message, yes, no }) => {
            const currentIndex = this.nodes.length;
            this.nodes.push({ message });
            if (yes) {
                this.nodes[currentIndex].yesIndex = add(yes);
            }
            if (no) {
                this.nodes[currentIndex].noIndex = add(no);
            }
            return currentIndex;
        };

        add(treeObj);
    }
    setCurrentNode(node) {
        this.currentNode = node;
    }
    getCurrentNode() {
        return this.currentNode;
    }
    getCurrentNodeMessage() {
        return this.nodes[this.currentNode].message;
    }
    walk(affirmative) {
        if (affirmative) {
            this.currentNode = this.nodes[this.currentNode].yesIndex;
        } else {
            this.currentNode = this.nodes[this.currentNode].noIndex;
        }
        return {
            message: this.getCurrentNode(),
            complete: !this.nodes[this.currentNode].yesIndex,
        };
    }
}

module.exports = Tree;
