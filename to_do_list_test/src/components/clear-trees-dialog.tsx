"use client";

// import { useState } from "react";

import { Tree } from "@/backend/Tree";
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
// import { Input } from "../components/ui/input";
// import { Label } from "@/components/ui/label"

export default function ClearTreesDialog({
	trees,
	setTrees,
	selectedTree,
	setSelectedTree,
	single
}: {
	trees: Tree[];
	setTrees: (trees: Tree[]) => void;
	selectedTree: Tree | undefined;
	setSelectedTree: (selectedTree: Tree | undefined) => void;
	single: boolean
}) {
	const deleteText = single ? `Delete \'${selectedTree?.name}\'` : "Clear All Trees";

	const clearAllTrees = () => {
		setTrees([]);
		setSelectedTree(undefined);
	}

	const clearSingleTree = () => {
		const newTrees = trees.filter((t) => t.id !== selectedTree!.id);
		setTrees(newTrees);
		setSelectedTree(undefined);
	}

	return (
		<div>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="destructive">{deleteText}</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					{/* <DialogHeader> */}
						<DialogTitle className="dark:text-slate-300 text-3xl">{deleteText}?</DialogTitle>
					{/* </DialogHeader> */}
					<DialogFooter>
						<DialogClose asChild>
							{single ? (
								<Button variant="destructive" type="submit" onClick={() => clearSingleTree()}>Delete</Button>
							) : (
								<Button variant="destructive" type="submit" onClick={() => clearAllTrees()}>Clear</Button>
							)}
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
