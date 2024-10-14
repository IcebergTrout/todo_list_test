import React, { useEffect, useRef, useState } from 'react';
import { TreeNode } from '../backend/TreeNode';
import { Tree } from '../backend/Tree';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface TreeProps {
	node: TreeNode;
	tree: Tree;
	updateTree: (tree: Tree) => void;
	handleInsert: (parentNode: TreeNode) => void
}

const NodeComponent: React.FC<TreeProps> = ({ node, tree, updateTree, handleInsert }) => {
	const [, setUpdate] = useState(true); // State to trigger re-render
	const textAreaRefs = useRef<Record<string, HTMLTextAreaElement | null>>({});
	const [focusState, setFocusState] = useState<boolean>(false);
	const [expanded, setExpanded] = useState(false);

	const handleCheckboxChange = (node: TreeNode) => {
		if (node) {
			node.checked = !node.checked;
			// console.log(`Checkbox for node ${node.id} is ${node.checked ? 'checked' : 'unchecked'}`);
			updateTree(tree);
		}
		setUpdate(prev => !prev); // Trigger re-render
	};

	const handleRemove = (node: TreeNode) => {
		if (node) {
			tree.remove(node);
			updateTree(tree);
		}
		setUpdate(prev => !prev); // Trigger re-render
	};

	const handleLabelChange = (node: TreeNode, newValue: string) => {
		node.value = newValue;
		updateTree(tree);
		setUpdate(prev => !prev); // Trigger re-render
	};

	const handleFocus = () => {
		setFocusState(true);
	};

	const handleBlur = () => {
		setFocusState(false);
	};

	const autoResizeTextarea = (textarea: HTMLTextAreaElement) => {
		textarea.style.height = 'auto';
		textarea.style.height = `${textarea.scrollHeight}px`;
	};

	useEffect(() => {
		Object.values(textAreaRefs.current).forEach(textarea => {
			if (textarea) {
				autoResizeTextarea(textarea);
			}
		});
	}, []);


	return (<li key={node.id}>
		<div className='flex flex-row flex-initial items-start space-x-2'>
			<div className='flex flex-row items-start space-x-2 mt-3'>
				<Button
					className="text-lg font-extrabold w-6 h-6 pb-1 dark:bg-slate-400 dark:hover:bg-slate-300/90"
					size="sm"
					onClick={() => handleInsert(node)}>+
				</Button>
				<Button
					className="text-lg font-extrabold w-6 h-6 pb-1 dark:bg-slate-400 dark:hover:bg-slate-300/90"
					size="sm"
					onClick={() => handleRemove(node)}>-
				</Button>
				<Checkbox
					className='ml-6 size-6 rounded'
					checked={node.checked}
					onCheckedChange={() => handleCheckboxChange(node)}
				/>
			</div>

			<Label htmlFor={node.id} className='text-xl'>
				<Textarea
					className='min-h-[40px] text-xl w-96 h-8 ml-2 px-2 rounded-md dark:bg-transparent dark:border-0 focus-visible:ring-gray-400 focus:bg-[#2f3745] focus-visible:ring-offset-0'
					value={node.value}
					onChange={(e) => handleLabelChange(node, e.target.value)}
					spellCheck={focusState || false}
					onFocus={() => handleFocus()}
					onBlur={() => handleBlur()}
					onInput={(e) => autoResizeTextarea(e.currentTarget)}
					rows={1} // Start with a single row
					style={{ resize: 'none', overflow: 'hidden' }} // Disable manual resizing and hide overflow
					ref={(el) => textAreaRefs.current[node.id] = el}
				/>
			</Label>
			{node.children.length > 0 && (
				<Button
					className='size-6 dark:bg-slate-400 dark:hover:bg-slate-300/90 font-bold'
					size={'sm'}
					onClick={() => setExpanded(!expanded)}
				>
					{expanded ? "..." : "[ ]"}
				</Button>
			)}
		</div>
		{node.children.length > 0 && expanded && (
			<ul className='list-none list-inside pl-16 pb-6'>
				{node.children.map((child) => <NodeComponent key={child.id} node={child} tree={tree} updateTree={updateTree} handleInsert={handleInsert} />)}
			</ul>
		)}
	</li>);
}

export default NodeComponent;