"use client";

import { Button } from "./ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	// DialogDescription,
	DialogFooter,
	// DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { useTreesContext } from "./providers/TreesProvider";

export default function ClearAllTreesDialog() {
	const { setTrees } = useTreesContext();

	const clearAllTrees = () => {
		setTrees([]);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="top-2 left-2 z-10" variant="destructive">Clear All</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				{/* <DialogHeader> */}
				<DialogTitle className="dark:text-slate-300 text-3xl">Clear All Trees?</DialogTitle>
				{/* </DialogHeader> */}
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="destructive" type="submit" onClick={() => clearAllTrees()}>Clear</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
