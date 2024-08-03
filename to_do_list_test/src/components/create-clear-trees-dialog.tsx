"use client";

// import { useState } from "react";

import { Tree } from "@/backend/Tree";
import { Button } from "../components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	// DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../components/ui/dialog";
// import { Input } from "../components/ui/input";
// import { Label } from "@/components/ui/label"

export default function CreateClearTreesDialog({
	setTrees,
	setSelectedTree
}: {
	setTrees: (trees: Tree[]) => void;
	setSelectedTree: (selectedTree: Tree | undefined) => void;
}) {
	const clearAllTrees = () => {
		setTrees([]);
		setSelectedTree(undefined);
	}

	return (
		<div>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="destructive">Clear All Trees</Button>
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
		</div>
	);
}
