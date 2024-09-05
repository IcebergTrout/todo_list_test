// TreeContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import Tree from '@/backend/Tree';

/**
 * TreesProvider loads trees from localStorage and provides them for child components.
 * It also saves changes to each tree.
 */

interface TreesContextType {
  trees: Tree[];
  setTrees: React.Dispatch<React.SetStateAction<Tree[]>>;
}

const TreesContext = createContext<TreesContextType | undefined>(undefined);

export const TreesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trees, setTrees] = useState<Tree[]>(() => {
		const storedTrees = localStorage.getItem("trees");
		if (storedTrees) {
      const parsedTrees = JSON.parse(storedTrees);
      const loadedTrees = parsedTrees.map((treeData: any) => Tree.fromJSON(treeData));
      return loadedTrees;
    }
		return [];
	});

  useEffect(() => {
    // Store trees data in local storage whenever it changes
    if (trees.length >= 0) {localStorage.setItem('trees', JSON.stringify(trees.map(tree => tree.toJSON())))};
  }, [trees]);

	

  return (
    <TreesContext.Provider value={{ trees, setTrees }}>
      {children}
    </TreesContext.Provider>
  );
};

export const useTreesContext = () => {
  const context = useContext(TreesContext);
  if (!context) {
    throw new Error('useTreeContext must be used within a TreeProvider');
  }
  return context;
};
