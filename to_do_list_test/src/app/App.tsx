import React from 'react';
import TreeComponent from './components/TreeComponent';
import Tree from '../backend/Tree';
import { useTreesContext } from '@/components/providers/TreesProvider';
import CreateTreeDialog from '@/components/create-tree-dialog';
import { CreateTreeSelect } from '@/components/create-tree-select';
import './App.css';
import { Button } from '@/components/ui/button';
import CreateClearTreesDialog from '@/components/create-clear-trees-dialog';

const App: React.FC = () => {
  const { trees, setTrees } = useTreesContext();
  const [selectedTree, setSelectedTree] = React.useState<Tree>();

  const updateSelectedTree = (updatedTree: Tree) => {
    setSelectedTree(updatedTree);
    const updatedTrees = trees.map(tree => tree.id === updatedTree.id ? updatedTree : tree);
    setTrees(updatedTrees);
  };
	
	// const handleClearAllTrees = () => {
	// 	setTrees([]);
	// 	setSelectedTree(undefined);
	// }

  return (
    <div className='p-10 min-h-min h-screen dark:bg-slate-800 dark:text-slate-300'>
      <h1 className='text-3xl font-bold dark:text-slate-300'>Tree Display with Checkboxes</h1>
			<CreateClearTreesDialog setTrees={setTrees} setSelectedTree={setSelectedTree}/>
      <CreateTreeDialog trees={trees} setTrees={setTrees} />
      <CreateTreeSelect trees={trees} setSelectedTree={setSelectedTree} />

      <div>
        {selectedTree ? (
          <TreeComponent tree={selectedTree!} updateTree={updateSelectedTree} />
        ) : (
          <>No Valid Tree</>
        )}
      </div>
    </div>
  );
};

export default App;
