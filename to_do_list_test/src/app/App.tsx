import React from 'react';
import TreeComponent from './components/TreeComponent';
import Tree from '../backend/Tree';
import CreateTreeDialog from '@/components/create-tree-dialog';
import { CreateTreeSelect } from '@/components/create-tree-select';

// const treeData = new Tree("test tree");
// treeData.insert("root", "test");

const App: React.FC = () => {
  const [trees, setTrees] = React.useState<Tree[]>([]);
  const [selectedTree, setSelectedTree] = React.useState<Tree>();
  const handleSelectTree = (theTree: Tree) => {
    setSelectedTree(theTree);
    console.log(selectedTree);
  }
  return (
    <div>
      <h1>Tree Display with Checkboxes</h1>
      <CreateTreeDialog trees={trees} setTrees={setTrees}></CreateTreeDialog>
      <CreateTreeSelect trees={trees} setSelectedTree={setSelectedTree}/>
      <div>
        {selectedTree ? (
          <TreeComponent tree={selectedTree!} />
          ) : (<></>)}
        {/* <TreeComponent tree={treeData}/> */}
      </div>
    </div>
  );
};

export default App;
