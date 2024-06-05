import { TreeNode } from './TreeNode';

export class Tree {
	root: TreeNode

	constructor(id: string, value: string) {
		this.root = new TreeNode(id, value, null);
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
		console.log("insert");
		for (let node of this.preOrderTraversal()) {
			if (node.id === parentNodeKey) {
				const newNode = new TreeNode(node.id + "[" + String(node.children.length) + "]", value, node);
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
			if (node.id === id) return node;
		}
		return undefined;
	}
}

export default Tree;
