import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tree } from "@/backend/Tree"

export function CreateTreeSelect({
  trees,
  setSelectedTree
}: {
  trees: Tree[];
  setSelectedTree: (selectedTree: Tree) => void;
}) {
  
  const handleSelectChange = (value: string) => {
    const tree = trees.find((tree) => tree.id == value)
    if (tree) {
      setSelectedTree(tree);
    }
    else {
      console.log("could not find tree");
    }
  }
  
  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Tree" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Trees</SelectLabel>
          {trees.map((tree) => (
            <SelectItem key={tree.id.toString()} value={tree.id.toString()}>{tree.name}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
