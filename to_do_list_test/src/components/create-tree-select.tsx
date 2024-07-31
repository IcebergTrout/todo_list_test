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
          {/* <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem> */}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
