import React, { useState } from 'react';
import { TreeNode } from '../backend/TreeNode';
import { Tree } from '../backend/Tree';
import { Button } from '@/components/ui/button';
import NodeComponent from './NodeComponent';

interface TreeProps {
	tree: Tree;
	updateTree: (tree: Tree) => void;
}

const TreeComponent: React.FC<TreeProps> = ({ tree, updateTree }) => {
	const [, setUpdate] = useState(false); // State to trigger re-render

	const handleInsert = (parentNode: TreeNode) => {
		if (parentNode) {
			tree.insert(parentNode);
			updateTree(tree);
		}
		setUpdate(prev => !prev); // Trigger re-render
	};

	return (
		<>
			<h1 className='text-3xl font-bold'>
				{tree.name}
			</h1>
			<ul className='list-none list-inside pt-4'>
				<div className='pb-8'>
					<Button 
						className='text-lg font-extrabold w-6 h-6 pb-1 dark:bg-slate-400 dark:hover:bg-slate-300/90' 
						size='sm' 
						value="+" 
						onClick={() => handleInsert(tree.root)}>+
					</Button>
				</div>
				{tree.root.children.map((child: TreeNode) => <NodeComponent key={child.id} node={child} tree={tree} updateTree={updateTree} handleInsert={handleInsert}/>)}
			</ul>
		</>
	);
};

export default TreeComponent;
