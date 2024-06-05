export class TreeNode {
	id: string;
	value: string;
	parent: TreeNode|null;
	children: TreeNode[] = [];

	constructor(id: string, value: string, parent:TreeNode|null) {
		this.id = id;
		this.value = value;
		this.parent = parent;
		if (this.parent) this.parent.children.push(this);
	}

	// public addChild = () => {
	// 	this.children.push(new TreeNode(this.id + String(this.children.length), 'test', this))
	// }

	get isLeaf() {
		return this.children.length === 0;
	}

	get hasChildren() {
		return !this.isLeaf;
	}
}
