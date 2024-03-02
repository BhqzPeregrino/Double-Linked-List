import { Node } from "./Node.js";

export class LinkedList {
    constructor() {
        this.head = null;
        this.count = 0;
    }

    addNode(element) {
        const newNode = new Node(element);
        if (!this.head) {
            this.head = newNode;
            newNode.next = newNode;
            newNode.previous = newNode;
        } else {
            const lastNode = this.head.previous;
            lastNode.next = newNode;
            newNode.previous = lastNode;
            newNode.next = this.head;
            this.head.previous = newNode;
        }
        this.count++;
    }

    getElementAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head;
            for (let i = 0; i < index; i++) {
                current = current.next;
            }
            return current;
        }
        return null;
    }

    size() {
        return this.count;
    }
}
