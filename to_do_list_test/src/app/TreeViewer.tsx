import React from 'react';
import TreeComponent from '../react-components/TreeComponent';
import Tree from '../backend/Tree';
import { useTreesContext } from '@/components/providers/TreesProvider';
import './App.css';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';

const TreeViewer: React.FC = () => {
	const { trees, setTrees } = useTreesContext();
	const { id } = useParams();
	const navigate = useNavigate();

	const selectedTree = trees.find((tree) => id === tree.id);

	const handleDashboardButton = () => {
		navigate('/');
	};

	const updateSelectedTree = (updatedTree: Tree) => {
		const updatedTrees = trees.map(tree => tree.id === updatedTree.id ? updatedTree : tree);
		setTrees(updatedTrees);
	};

	return (
		<div className='min-h-min h-screen dark:bg-slate-800 dark:text-slate-300'>
			<div className='pt-3 pl-3'>
				<Button onClick={handleDashboardButton}>Dashboard</Button>
			</div>
			<div className='p-10'>
				<h1 className='text-3xl font-bold dark:text-slate-300'>Tree Viewer</h1>

				<div className='pt-6'>
					{selectedTree ? (
						<TreeComponent tree={selectedTree!} updateTree={updateSelectedTree} />
					) : (
						<>No Valid Tree</>
					)}
				</div>
			</div>

		</div>
	);
};

export default TreeViewer;
