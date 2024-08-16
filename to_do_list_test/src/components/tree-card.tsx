import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import ClearTreeDialog from "./clear-tree-dialog";
import Tree from "@/backend/Tree";
import { useNavigate } from "react-router-dom";

export function TreeCard({
	tree,
}: {
	tree: Tree;
}) {
	const navigate = useNavigate();

	const handleTreeRoute = (treeID: string) => {
		navigate(`/tree/${treeID}`);
	}

	return (
		<div className="inline-block">
			<div className="relative inline-block">
				<button onClick={() => handleTreeRoute(tree.id)} className='active:bg-gray-900 dark:bg-gray-700 hover:bg-gray-800'>
				<Card>
					<CardHeader>
						<CardTitle>{tree.name}</CardTitle>
						<CardDescription></CardDescription>
					</CardHeader>
					<CardContent>
					</CardContent>
					<CardFooter>
					</CardFooter>
				</Card>
			</button>
			<ClearTreeDialog selectedTree={tree}></ClearTreeDialog>
			</div>
			
		</div>

	)
}
