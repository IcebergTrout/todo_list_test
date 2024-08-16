import React from 'react';
import TreeComponent from '../react-components/TreeComponent';
import Tree from '../backend/Tree';
import { useTreesContext } from '@/components/providers/TreesProvider';
import CreateTreeDialog from '@/components/create-tree-dialog';
import { TreeSelect } from '@/components/tree-select';
import './App.css';
import CreateClearTreesDialog from '@/components/clear-trees-dialog';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const TreeViewer: React.FC = () => {
	const { trees, setTrees } = useTreesContext();
	const [selectedTree, setSelectedTree] = React.useState<Tree>();
	const navigate = useNavigate();

  const handleDashboardButton = () => {
    navigate('/dashboard');
  };

	const updateSelectedTree = (updatedTree: Tree) => {
		setSelectedTree(updatedTree);
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
				<CreateClearTreesDialog single={false} trees={trees} setTrees={setTrees} selectedTree={selectedTree} setSelectedTree={setSelectedTree} />
				<CreateTreeDialog trees={trees} setTrees={setTrees} />
				<TreeSelect trees={trees} setSelectedTree={setSelectedTree} />

				<div className='pt-6'>
					{selectedTree ? (
						<>
							<CreateClearTreesDialog single={true} trees={trees} setTrees={setTrees} selectedTree={selectedTree} setSelectedTree={setSelectedTree} />
							<TreeComponent tree={selectedTree!} updateTree={updateSelectedTree} />
						</>
					) : (
						<>No Valid Tree</>
					)}
				</div>
			</div>

		</div>
	);
};

export default TreeViewer;
