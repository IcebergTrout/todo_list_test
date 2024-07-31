import { TreeNode } from './TreeNode';
import {v4} from 'uuid';

export class Tree {
	root: TreeNode;
	id: string;
	name: string;

	constructor(name: string) {
		this.id = v4();
		this.root = new TreeNode(this.id);
		this.name = name;
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

	insert(parentNodeKey: any, value: string) {
		// console.log("insert");
		for (let node of this.preOrderTraversal()) {
			if (node.id === parentNodeKey) {
				const uid = v4();
				new TreeNode(uid, value, node);
				return true;
			}
		}
		return false;
	}

	remove(id: any) {
		for (let node of this.preOrderTraversal()) {
			const filtered = node.children.filter((c: { id: any; }) => c.id !== id);
			if (filtered.length !== node.children.length) {
				node.children = filtered;
				return true;
			}
		}
		return false;
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

	nodeList() {
		const allNodes: TreeNode[] = [];
		for (let node of this.preOrderTraversal()) {
			allNodes.push(node);
		}
		return allNodes;
	}
}

export default Tree;
