// TreeComponent.tsx
import React, { useState } from 'react';
import { TreeNode } from './TreeNode';
import { Tree } from './Tree';

interface TreeProps {
	tree: Tree;
}

const TreeComponent: React.FC<TreeProps> = ({ tree }) => {
	const [, setUpdate] = useState(false); // State to trigger re-render
	const [editingNodeId, setEditingNodeId] = useState<string | null>(null);

	const handleCheckboxChange = (node: TreeNode | undefined, checked: boolean) => {
		if (node) {
			node.checked = checked;
			// console.log(`Checkbox for node ${node.id} is ${node.checked ? 'checked' : 'unchecked'}`);
		}
		// Perform actions based on checkbox state
	};

	const handleInsert = (parentNode: TreeNode | undefined) => {
		if (parentNode)
			tree.insert(parentNode.id, 'new child');
		setUpdate(prev => !prev); // Trigger re-render
	};

	const handleRemove = (node: TreeNode | undefined) => {
		if (node)
			tree.remove(node.id,);
		setUpdate(prev => !prev); // Trigger re-render
	};

	const handleLabelChange = (node: TreeNode, newValue: string) => {
		node.value = newValue;
		setUpdate(prev => !prev); // Trigger re-render
	};

	const renderTree = (node: TreeNode): JSX.Element => {
		return (
			<li key={node.id}>
				<input
					type="checkbox"
					// id={node.id}
					onChange={(e) => handleCheckboxChange(node, e.target.checked)}
				/>
				<label htmlFor={node.id}>
					{editingNodeId === node.id ? (
						<input
							type="text"
							value={node.value}
							onChange={(e) => handleLabelChange(node, e.target.value)}
							onBlur={() => setEditingNodeId(null)}
						/>
					) : (
						<span onDoubleClick={() => setEditingNodeId(node.id)}>{node.value}</span>
					)}
				</label>
				<input type="button" value="+" onClick={() => handleInsert(node)} />
				<input type="button" value="-" onClick={() => handleRemove(node)} />
				{node.children.length > 0 && (
					<ul>
						{node.children.map((child) => renderTree(child))}
					</ul>
				)}
			</li>
		);
	}

	return (
		<ul>
			<input type="button" value="+" onClick={() => handleInsert(tree.find('root'))} />
			{tree.root.children.map((child: TreeNode) => renderTree(child))}
		</ul>
	);
};

export default TreeComponent;
