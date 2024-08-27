import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Tree from "@/backend/Tree";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import DropIndicator from "./drop-indicator";
import { handleDragStart } from "@/handlers/DashboardHandlers";

export function TreeCard({
	tree,
}: {
	tree: Tree;
}) {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const [isActive, setIsActive] = useState(false);
	const navigate = useNavigate();

	const handleTreeRoute = (treeID: string) => {
		navigate(`/tree/${treeID}`);
	};

	const handleMouseDown = () => {
		setIsActive(true);
	};

	const handleMouseUp = () => {
		setIsActive(false);
	};
	
	const handleMouseStart = (e: React.DragEvent<HTMLDivElement>, cardId: string) => {
		handleDragStart(e, cardId);
		handleMouseDown();
	}
	
	return (
		<div className="flex">
			<DropIndicator beforeId={tree.id}/>
			<div 
				className="relative inline-block" 
				onDragStart={(e) => handleMouseStart(e, tree.id)}
				onDragEnd={handleMouseUp}
				onMouseDown={handleMouseDown}
			>
				<button 
					ref={buttonRef}
					onClick={() => handleTreeRoute(tree.id)} 
				>
					<Card 
						draggable={true} 
						className={`dark:bg-gray-700 hover:bg-gray-800 ${isActive ? 'active:bg-gray-900' : ''}`}
					>
						<CardHeader>
							<CardTitle>{tree.name}</CardTitle>
							<CardDescription></CardDescription>
						</CardHeader>
						<CardContent></CardContent>
						<CardFooter></CardFooter>
					</Card>
				</button>
			</div>
		</div>
	);
}
