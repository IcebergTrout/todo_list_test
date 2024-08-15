import React from 'react';
import Tree from '../backend/Tree';
import { useTreesContext } from '@/components/providers/TreesProvider';
import CreateTreeDialog from '@/components/create-tree-dialog';
import './App.css';
import ClearTreesDialog from '@/components/clear-trees-dialog';
import { TreeCard } from '@/components/tree-card';

const Dashboard: React.FC = () => {
	const { trees, setTrees } = useTreesContext();
	const [selectedTree, setSelectedTree] = React.useState<Tree>();

	return (
		<div className='p-10 min-h-min h-screen dark:bg-slate-800 dark:text-slate-300'>
			<h1 className='text-3xl font-bold dark:text-slate-300'>Dashboard</h1>
			<ClearTreesDialog single={false} trees={trees} setTrees={setTrees} selectedTree={selectedTree} setSelectedTree={setSelectedTree} />
			<CreateTreeDialog trees={trees} setTrees={setTrees} />
			<div className={`flex ${trees.length === 0
				? "flex-grow justify-center items-start mt-20"
				: "justify-between"
				} p-4`}>
				<div className="grid grid-flow-col gap-4">
					{trees.map((tree) => {
						return (<button className='active:bg-gray-900 dark:bg-gray-700 hover:bg-gray-800'><TreeCard title={tree.name}/></button>);
					})}
				</div>
			</div>



		</div>
	);
};

export default Dashboard;
