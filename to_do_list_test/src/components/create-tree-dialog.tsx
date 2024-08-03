"use client";

import { useState } from "react";

import { Tree } from "@/backend/Tree";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "@/components/ui/label"

export default function CreateTreeDialog({
  trees,
  setTrees,
}: {
  trees: Tree[];
  setTrees: (trees: Tree[]) => void;
}) {
  const [treeName, setTreeName] = useState("")

  const createTree = () => {
    const newTree = new Tree(treeName);
    setTrees([...trees, newTree])
    setTreeName("");
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Create Tree</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="dark:text-slate-300">Create Tree</DialogTitle>
            <DialogDescription>
              Make a new Tree!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4 dark:text-slate-300">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                className="col-span-3"
                value={treeName}
                onInput={e => setTreeName(e.currentTarget.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={() => createTree()}>Submit</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
