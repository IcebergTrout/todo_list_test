import React from 'react';
import { useTreesContext } from '@/components/providers/TreesProvider';
import CreateTreeDialog from '@/components/create-tree-dialog';
import './App.css';
import { TreeCard } from '@/components/tree-card';
import ClearAllTreesDialog from '@/components/clear-all-trees-dialog';

const Dashboard: React.FC = () => {
	const { trees, setTrees } = useTreesContext();

	return (
		<div className='p-10 min-h-screen dark:bg-slate-800 dark:text-slate-300'>
			<h1 className='text-3xl font-bold dark:text-slate-300'>Dashboard</h1>
			<ClearAllTreesDialog/>
			<CreateTreeDialog trees={trees} setTrees={setTrees} />
			<div className={`flex ${trees.length === 0
				? "flex-grow justify-center items-start mt-20"
				: "justify-between"
				} p-4`}>
				<div className="gap-4 flex flex-wrap max-w-screen">
					{trees.map((tree) => {
						return (
								<TreeCard key={tree.id} tree={tree}/>
							);
					})}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
