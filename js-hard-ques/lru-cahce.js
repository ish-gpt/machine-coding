class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.lrumap = new Map();
        this.length = 0;
        this.head = null;
        this.tail = null;
    }

    put(key, val) {
        if (this.lrumap.has(key)) {
            let node = this.lrumap.get(key);
            if (this.head === node) {
                this.head = node.next;
                node.next = null;
            }
            else if (this.tail === node) {
                this.tail = node.prev;
                node.prev = null;
            } else {
                node.next.prev = node.prev;
                node.prev.next = node.next;
            }
            node = {
                val: val,
                prev: null,
                next: this.head,
                key: key
            }
            this.head.prev = node;
            this.head = node;
            this.lrumap.set(key, node);
        } else {
            let node = {
                val: val,
                prev: null,
                next: this.head,
                key: key
            }
            if (this.length === this.capacity) {
                this.head.prev = node;
                this.head = node;
                this.lrumap.delete(this.tail.key);
                this.tail = this.tail.prev;
                this.tail.next = null;
                this.lrumap.set(key, node);
                return;
            }
            if (this.head === null) {
                this.head = node;
                this.tail = node;
            } else {
                this.head.prev = node;
                this.head = node
            }
            this.lrumap.set(key, node);
            this.length++;
        }
    }

    get(key) {
        if (!this.lrumap.has(key)) return null;
        let node = this.lrumap.get(key);
        if (node === this.head) {
            return node;
        }
        if (node === this.tail) {
            node.prev.next = null;
            this.tail = node.prev;
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
            return node;
        }
        node.prev.next = node.next;
        node.next.prev = node.prev;
        node.prev = null;
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
        return node;
    }


    print() {
        let current = this.head;
        while (current != null) {
            console.log(`[key-${current.key}] [Value-${current.val}]`);
            current = current.next;
        }
    }
}

let obj = new LRUCache(5);
obj.put(1, 10);
obj.put(2, 20);
obj.put(3, 30);
obj.put(4, 40);
obj.put(3, 50);
obj.put(6, 60);
obj.put(6, 70);
obj.print();

obj.get(4)
console.log("------------------");
obj.print();


obj.get(6)
console.log("------------------");
obj.print();


obj.get(3)
console.log("------------------");
obj.print();