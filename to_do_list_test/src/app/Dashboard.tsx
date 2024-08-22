import React, { DragEvent } from 'react';
import { useTreesContext } from '@/components/providers/TreesProvider';
import CreateTreeDialog from '@/components/create-tree-dialog';
import './App.css';
import { TreeCard } from '@/components/tree-card';
import ClearAllTreesDialog from '@/components/clear-all-trees-dialog';
import DropIndicator from '@/components/drop-indicator';

const Dashboard: React.FC = () => {
	const { trees, setTrees } = useTreesContext();
	const [cardId, setCardId] = React.useState();

	const handleDragStart = (card: any) => {
		setCardId(card.id);
	}

	const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
		clearHighlights();

		const indicators = getIndicators();
		const {element} = getNearestIndicator(e, indicators);

		const before = element.dataset.before || "-1";

		if (before !== cardId) {
			let copy = [...trees];

			let cardToTransfer = copy.find((c) => c.id === cardId);
			if (!cardToTransfer) return;

			copy = copy.filter((c) => c.id !== cardId);

			const moveToBack = before === "-1";

			if (moveToBack) {
				copy.push(cardToTransfer);
			} else {
				const insertAtIndex = copy.findIndex((el) => el.id === before);
				if (insertAtIndex === undefined) return;

				copy.splice(insertAtIndex, 0, cardToTransfer);
			}

			setCardId(undefined);
			setTrees(copy);
		}
	}

	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		highlightIndicator(e);
	}

	const highlightIndicator = (e: DragEvent<HTMLDivElement>) => {
		const indicators = getIndicators();
		clearHighlights(indicators);
		const el = getNearestIndicator(e, indicators);
		el.element.style.opacity = "1";
	}

	const clearHighlights = (els?: HTMLElement[]) => {
		const indicators = els || getIndicators();

		indicators.forEach(element => {
			element.style.opacity = "0";
		});
	}

	const getNearestIndicator = (e: DragEvent<HTMLDivElement>, indicators: HTMLElement[]) => {
		const DISTANCE_OFFSET = 100;

		const el = indicators.reduce(
			(closest, child) => {
				const box = child.getBoundingClientRect();
				const offset = e.clientX - (box.left + DISTANCE_OFFSET);

				if (offset < 0 && offset > closest.offset) {
					return { offset: offset, element: child };
				} else {
					return closest;
				}
			},
			{
				offset: Number.NEGATIVE_INFINITY,
				element: indicators[indicators.length - 1]
			}
		)

		return el;
	}

	const getIndicators = () => {
		return Array.from(document.querySelectorAll('[data-column="0"]')) as HTMLElement[];
	}

	return (
		<div 
			className='min-h-screen dark:bg-slate-800 dark:text-slate-300'
			onDragOver={(e) => handleDragOver(e)}
		>
			<div className='pt-10 pl-10'>
				<h1 className='text-3xl font-bold dark:text-slate-300'>Dashboard</h1>
				<ClearAllTreesDialog />
				<CreateTreeDialog trees={trees} setTrees={setTrees} />
			</div>

			<div className={`flex ${trees.length === 0
				? "flex-grow justify-center items-start mt-20"
				: "justify-between"
				}`}>
				<div
					className="flex flex-wrap max-w-screen p-4 pl-10"
					onDragEnd={(e) => handleDragEnd(e)}
				>
					{trees.map((tree) => {
						return (
							<TreeCard key={tree.id} tree={tree} handleDragStart={handleDragStart} />
						);
					})}
					<DropIndicator beforeId='-1' />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
