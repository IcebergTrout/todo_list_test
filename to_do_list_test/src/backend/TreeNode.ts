import { v4 as uuidv4 } from 'uuid';

export class TreeNode {
	id: string;
	value: string;
	checked: boolean;
	parent?: TreeNode;
	children: TreeNode[] = [];

	constructor(id: string = uuidv4(), value: string = "", parent?: TreeNode) {
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

	toJSON(): any {
		return {
			id: this.id,
			value: this.value,
			checked: this.checked,
			children: this.children.map(child => child.toJSON()),
		};
	}

	static fromJSON(json: any, parent?: TreeNode): TreeNode {
		const node = new TreeNode(json.id, json.value, parent);
		node.checked = json.checked;
		node.children = json.children.map((child: any) => TreeNode.fromJSON(child, node));
		return node;
	}
}
