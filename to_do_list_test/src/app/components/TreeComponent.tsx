import React, { useState } from 'react';
import { TreeNode } from '../../backend/TreeNode';
import { Tree } from '../../backend/Tree';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface TreeProps {
  tree: Tree;
  updateTree: (tree: Tree) => void;
}

const TreeComponent: React.FC<TreeProps> = ({ tree, updateTree }) => {
  const [, setUpdate] = useState(false); // State to trigger re-render
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);

	console.log(tree);

  const handleCheckboxChange = (node: TreeNode | undefined) => {
    if (node) {
      node.checked = !node.checked;
      console.log(`Checkbox for node ${node.id} is ${node.checked ? 'checked' : 'unchecked'}`);
      updateTree(tree);
    }
    setUpdate(prev => !prev); // Trigger re-render
  };

  const handleInsert = (parentNode: TreeNode | undefined) => {
    if (parentNode) {
      tree.insert(parentNode, 'new child');
      updateTree(tree);
    }
    setUpdate(prev => !prev); // Trigger re-render
  };

  const handleRemove = (node: TreeNode | undefined) => {
    if (node) {
      tree.remove(node);
      updateTree(tree);
    }
    setUpdate(prev => !prev); // Trigger re-render
  };

  const handleLabelChange = (node: TreeNode, newValue: string) => {
    node.value = newValue;
    updateTree(tree);
    setUpdate(prev => !prev); // Trigger re-render
  };

  const renderTree = (node: TreeNode): JSX.Element => {
    return (
      <li key={node.id}>
        <div className='flex flex-row flex-initial items-center'>
          <Checkbox
            checked={node.checked}
            onCheckedChange={() => handleCheckboxChange(node)}
          />
          <label htmlFor={node.id}>
            {editingNodeId === node.id ? (
              <input
                type="text"
                value={node.value}
                onChange={(e) => handleLabelChange(node, e.target.value)}
                onBlur={() => setEditingNodeId(null)}
              />
            ) : (
              <span onDoubleClick={() => setEditingNodeId(node.id)}>{node.value}</span>
            )}
          </label>
          <Button size="sm" onClick={() => handleInsert(node)}>+</Button>
          <Button className='w-6 h-6' onClick={() => handleRemove(node)}>-</Button>
        </div>

        {node.children.length > 0 && (
          <ul className='list-none list-inside pl-4'>
            {node.children.map((child) => renderTree(child))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <>
      <h2 className='text-xl'>
        {tree.name}
      </h2>
      <ul className='list-none list-inside'>
        <Button value="+" onClick={() => handleInsert(tree.root)}>+</Button>
        {tree.root.children.map((child: TreeNode) => renderTree(child))}
      </ul>
    </>
  );
};

export default TreeComponent;
