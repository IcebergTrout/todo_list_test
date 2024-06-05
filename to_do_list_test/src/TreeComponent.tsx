// TreeComponent.tsx
import React, { useState } from 'react';
import { TreeNode } from './TreeNode';
import { Tree } from './Tree';

interface TreeProps {
    tree: Tree;
}

const TreeComponent: React.FC<TreeProps> = ({ tree }) => {
  const [, setUpdate] = useState(false); // State to trigger re-render

  const handleCheckboxChange = (id: string, checked: boolean) => {
    console.log(`Checkbox for node ${id} is ${checked ? 'checked' : 'unchecked'}`);
    // Perform actions based on checkbox state
  };

  const insertNode = (parentNode: TreeNode) => {
    tree.insert(parentNode.id, 'New Child');
    setUpdate(prev => !prev); // Trigger re-render
  };

  const renderTree = (node: TreeNode): JSX.Element => (
    <li key={node.id}>
      <label htmlFor={node.id}>
        <input
          type="checkbox"
          id={node.id}
          onChange={(e) => handleCheckboxChange(node.id, e.target.checked)}
        />
        {node.value}
      </label>
      <input type="button" value="add child" onClick={() => insertNode(node)} />
      {node.children.length > 0 && (
        <ul>
          {node.children.map((child) => renderTree(child))}
        </ul>
      )}
    </li>
  );

  return (
    <ul>
      {tree.root.children.map((child: TreeNode) => renderTree(child))}
    </ul>
  );
};

export default TreeComponent;
