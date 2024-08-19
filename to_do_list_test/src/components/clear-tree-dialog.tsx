"use client";

// import { useState } from "react";

import { Tree } from "@/backend/Tree";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { useTreesContext } from "./providers/TreesProvider";

export default function ClearTreeDialog({
	selectedTree,
}: {
	selectedTree: Tree | undefined;
}) {
	const { trees, setTrees } = useTreesContext();
	const deleteText = `Delete \'${selectedTree?.name}\'`;

	const clearSingleTree = () => {
		const newTrees = trees.filter((t) => t.id !== selectedTree!.id);
		setTrees(newTrees);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="absolute bottom-2 right-2 z-10" size="sm" variant="destructive">D</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="dark:text-slate-300 text-3xl">{deleteText}?</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					This will permanently delete this tree.
				</DialogDescription>
				<DialogFooter>
					<DialogClose asChild>
						<Button>Cancel</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button variant="destructive" type="submit" onClick={() => clearSingleTree()}>Delete</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
