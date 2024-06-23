export class TreeNode {
	id: string;
	value: string;
	checked: boolean
	parent?: TreeNode;
	children: TreeNode[] = [];

	constructor(id: string, value: string, parent?:TreeNode) {
		this.id = id;
		this.value = value;
		this.parent = parent;
		this.checked = false;
		if (this.parent) this.parent.children.push(this);
	}

	get isLeaf() {
		return this.children.length === 0;
	}

	get hasChildren() {
		return !this.isLeaf;
	}
}
