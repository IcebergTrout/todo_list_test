import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import ClearTreeDialog from "./clear-tree-dialog";
import Tree from "@/backend/Tree";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

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

	const handleDragStart = () => {
		setIsActive(true);
	};

	const handleDragEnd = () => {
		setIsActive(false);
	};

	return (
		<div className="inline-block">
			<div 
				// draggable={true} 
				className="relative inline-block" 
				onDragEnd={handleDragEnd}
			>
				<button 
					ref={buttonRef}
					onClick={() => handleTreeRoute(tree.id)} 
					onMouseDown={handleDragStart}
				>
					<Card draggable={true} 
					className={`dark:bg-gray-700 hover:bg-gray-800 ${isActive ? 'active:bg-gray-900' : ''}`}>
						<CardHeader>
							<CardTitle>{tree.name}</CardTitle>
							<CardDescription></CardDescription>
						</CardHeader>
						<CardContent></CardContent>
						<CardFooter></CardFooter>
					</Card>
				</button>
				<ClearTreeDialog selectedTree={tree}></ClearTreeDialog>
			</div>
		</div>
	);
}
