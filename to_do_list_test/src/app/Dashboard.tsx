import React from 'react';
import { useTreesContext } from '@/components/providers/TreesProvider';
import CreateTreeDialog from '@/components/create-tree-dialog';
import './App.css';
import { TreeCard } from '@/components/tree-card';
import DropIndicator from '@/components/drop-indicator';
import {
	handleDrop,
	handleDragOver,
} from '@/handlers/DashboardHandlers';
import BurnArea from '@/react-components/BurnArea';

const Dashboard: React.FC = () => {
	const { trees, setTrees } = useTreesContext();

	return (
		<div
			className='min-h-screen dark:bg-slate-800 dark:text-slate-300'
			onDragOver={(e) => handleDragOver(e)}
		>
			<div className='absolute fixed right-10 top-10'>
				<BurnArea trees={trees} setTrees={setTrees}></BurnArea>
			</div>
			<div className='pt-10 pl-10'>
				<h1 className='text-3xl font-bold dark:text-slate-300'>Dashboard</h1>
				<div className='pt-5'>
					<CreateTreeDialog trees={trees} setTrees={setTrees} />
				</div>
			</div>
			<div
				className={`flex ${trees.length === 0
					? 'flex-grow justify-center items-start mt-20'
					: 'justify-between'
					}`}
			>
				<div
					className='flex flex-wrap min-w-full p-4 pl-10'
					onDrop={(e) =>
						handleDrop(e, trees, setTrees)
					}
				>
					{trees.map((tree) => (
						<TreeCard
							key={tree.id}
							tree={tree}
						/>
					))}
					<DropIndicator beforeId='-1' />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
