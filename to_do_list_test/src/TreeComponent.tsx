// TreeComponent.tsx
import React, { useState } from "react";
import { TreeNode } from "./TreeNode";
import { Tree } from "./Tree";

interface TreeProps {
  tree: Tree;
}

const TreeComponent: React.FC<TreeProps> = ({ tree }) => {
  const [, setUpdate] = useState(false); // State to trigger re-render
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [newNodeValues, setNewNodeValues] = useState<{ [key: string]: string }>(
    {}
  );

  const handleCheckboxChange = (
    node: TreeNode | undefined,
    checked: boolean
  ) => {
    if (node) {
      node.checked = checked;
      // console.log(`Checkbox for node ${node.id} is ${node.checked ? 'checked' : 'unchecked'}`);
    }
    // Perform actions based on checkbox state
  };

  const handleInsert = (parentNode: TreeNode | undefined) => {
    if (parentNode && newNodeValues[parentNode.id]?.trim() !== "") {
      tree.insert(parentNode.id, newNodeValues[parentNode.id]);
      setNewNodeValues((prev) => ({ ...prev, [parentNode.id]: "" })); // Clear input field after inserting
      setUpdate((prev) => !prev); // Trigger re-render
    }
  };

  const handleRemove = (node: TreeNode | undefined) => {
    if (node) {
      tree.remove(node.id);
      setUpdate((prev) => !prev); // Trigger re-render
    }
  };

  const handleLabelChange = (node: TreeNode, newValue: string) => {
    node.value = newValue;
    setUpdate((prev) => !prev); // Trigger re-render
  };

  const handleNewNodeValueChange = (nodeId: string, newValue: string) => {
    setNewNodeValues((prev) => ({ ...prev, [nodeId]: newValue }));
  };

  const renderTree = (node: TreeNode): JSX.Element => {
    return (
      <li key={node.id}>
        <input
          type="checkbox"
          // id={node.id}
          onChange={(e) => handleCheckboxChange(node, e.target.checked)}
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
            <span onDoubleClick={() => setEditingNodeId(node.id)}>
              {node.value}
            </span>
          )}
        </label>
        <input type="button" value="-" onClick={() => handleRemove(node)} />

        <ul>
          {node.children.map((child) => renderTree(child))}
          <li>
            <input
              type="text"
              placeholder="Add New Task"
              value={newNodeValues[node.id] || ""}
              onChange={(e) =>
                handleNewNodeValueChange(node.id, e.target.value)
              }
            />
            <input type="button" value="+" onClick={() => handleInsert(node)} />
          </li>
        </ul>
      </li>
    );
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add New Task"
        value={newNodeValues["root"] || ""}
        onChange={(e) => handleNewNodeValueChange("root", e.target.value)}
      />
      <input
        type="button"
        value="+"
        onClick={() => handleInsert(tree.find("root"))}
      />
      <ul>{tree.root.children.map((child: TreeNode) => renderTree(child))}</ul>
    </div>
  );
};

export default TreeComponent;
