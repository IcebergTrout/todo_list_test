"use client";

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
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  treeName: z.string(),
})

export default function CreateTreeDialog({
  trees,
  setTrees,
}: {
  trees: Tree[];
  setTrees: (trees: Tree[]) => void;
}) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      treeName: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newTree = new Tree(values.treeName);
    setTrees([...trees, newTree]);
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
          <div className="">
            <div className="grid gap-4 py-4">
              <Form {...form}>
                <form id="createTreeForm" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="treeName"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-4 items-center gap-4 dark:text-slate-300">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input className="w-fit" placeholder="name" {...field} autoComplete="off"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button form="createTreeForm" type="submit">Submit</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
