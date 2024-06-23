import React from 'react';
import TreeComponent from './components/TreeComponent';
import Tree from '../backend/Tree';

const treeData = new Tree('root', 'Root');
treeData.insert("root", "test");

const App: React.FC = () => {
  return (
    <div>
      <h1>Tree Display with Checkboxes</h1>
      <TreeComponent tree={treeData} />
    </div>
  );
};

export default App;
