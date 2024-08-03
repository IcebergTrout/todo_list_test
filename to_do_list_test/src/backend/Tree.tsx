import { TreeNode } from './TreeNode';
import { v4 } from 'uuid';

export class Tree {
	root: TreeNode;
	id: string;
	name: string;
	nodes: TreeNode[];

	constructor(name: string, root?: TreeNode) {
		this.id = v4();
		this.root = root ? root : new TreeNode(this.id);
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

	insert(parentNode: TreeNode, value: string) {
		const uid = v4();
		if (parentNode) {
			this.nodes.push(new TreeNode(uid, value, parentNode));
			return true;
		}
		return false;
	}

	remove(node: TreeNode) {
		if (!node.parent) return false;

		const filteredChildren = node.parent.children.filter((c: { id: string; }) => c.id !== node.id);

		if (filteredChildren.length == node.parent.children.length) return false;

		node.parent.children = filteredChildren;
		this.nodes = this.nodes.filter((c: { id: string; }) => c.id !== node.id);
		console.log(this.nodes);
		return true;
	}

	find(id: any) {
		for (let node of this.preOrderTraversal()) {
			// console.log(node.id);
			// console.log(id);
			if (node.id === id) return node;
		}
		console.log("did not find node")
		return undefined;
	}

	getNodes() {
		return this.nodes;
		// const allNodes: TreeNode[] = [];
		// for (let node of this.preOrderTraversal()) {
		// 	allNodes.push(node);
		// }
		// return allNodes;
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
