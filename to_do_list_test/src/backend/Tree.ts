import { TreeNode } from './TreeNode';
import { v4 as uuidv4 } from 'uuid';

export class Tree {
	root: TreeNode;
	id: string;
	name: string;
	nodes: TreeNode[];

	constructor(name: string) {
		this.id = uuidv4();
		this.root = new TreeNode(this.id);
		this.name = name;
		this.nodes = [this.root];
	}

	*preOrderTraversal(node = this.root): Generator<TreeNode> {
		yield node;
		if (node.children.length) {
			for (let child of node.children) {
				yield* this.preOrderTraversal(child);
			}
		}
	}

	*postOrderTraversal(node = this.root): Generator<TreeNode> {
		if (node.children.length) {
			for (let child of node.children) {
				yield* this.postOrderTraversal(child);
			}
		}
		yield node;
	}

	insert(parentNode: TreeNode, value: string = "") {
		const uid = uuidv4();
		if (parentNode) {
			const newNode = new TreeNode(uid, value, parentNode);
			this.nodes.push(newNode);
			return true;
		}
		return false;
	}

	remove(node: TreeNode) {
		if (!node.parent) return false;

		const filteredChildren = node.parent.children.filter((c) => c.id !== node.id);

		if (filteredChildren.length === node.parent.children.length) return false;

		node.parent.children = filteredChildren;
		this.nodes = this.nodes.filter((c) => c.id !== node.id);
		return true;
	}

	find(id: string) {
		for (let node of this.preOrderTraversal()) {
			if (node.id === id) return node;
		}
		return undefined;
	}

	getNodes() {
		return this.nodes;
	}

	toJSON() {
		return {
			id: this.id,
			name: this.name,
			nodes: this.nodes.map((node) => node.toJSON()),
		};
	}

	static fromJSON(json: any): Tree {
		const tree = new Tree(json.name);
		tree.id = json.id;
		tree.nodes = json.nodes.map((nodeData: any) => TreeNode.fromJSON(nodeData));
		tree.root = tree.nodes.find((node) => node.id === tree.id)!;
		return tree;
	}
}

export default Tree;
