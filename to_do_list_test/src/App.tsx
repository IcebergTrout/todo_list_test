import React from 'react';
import TreeComponent from './TreeComponent';
import Tree from './Tree';

const treeData = new Tree('item', 'Root');
treeData.insert("item", "test");
// treeData.insert("item", "test0");

const App: React.FC = () => {
  return (
    <div>
      <h1>Tree Display with Checkboxes</h1>
      <TreeComponent tree={treeData} />
    </div>
  );
};

// interface TreeProps {
// 	node: TreeNode;
// }
// const TestTree = <T,>({ node }: TreeProps) => {

// }

// const Tree = <T,>({ node }: TreeProps<T>) => {
	// const [_, setUpdate] = useState(false); // State to trigger re-render

	// const handleCheckboxChange = (id: string, checked: boolean) => {
	// 	console.log(`Checkbox for node ${id} is ${checked ? 'checked' : 'unchecked'}`);
	// 	// Perform actions based on checkbox state
	// };

	// const handleAddChild = (n: TreeNode<T>) => {
	// 	n.addChild();
	// 	setUpdate(prev => !prev); // Trigger re-render
	// };

	// const handleRemoveNode = (n: TreeNode<T>) => {
	// 	n.addChild();
	// 	setUpdate(prev => !prev); // Trigger re-render
	// };

	// const renderTree = (node: TreeNode<T>): JSX.Element => (
	// 	<li key={node.id}>
	// 		<label htmlFor={node.id}>
	// 			<input
	// 				type="checkbox"
	// 				id={node.id}
	// 				onChange={(e) => handleCheckboxChange(node.id, e.target.checked)}
	// 			/>
	// 			{node.value as string}
	// 		</label>
	// 		 . .  
	// 		<input type="button" value="w" />
	// 		<input type="button" value="+" onClick={() => handleAddChild(node)}/>
	// 		 . . . 
	// 		<input type="button" value="d" />
	// 		{node.children.length > 0 && (
	// 			<ul>
	// 				{node.children.map((child) => renderTree(child))}
	// 			</ul>
	// 		)}
	// 	</li>
	// );

	// return (
	// 	<div>
	// 		<div>
	// 			<input
	// 				type="checkbox"
	// 				id="Root"
	// 				onChange={(e) => handleCheckboxChange(node.id, e.target.checked)}
	// 			/>
	// 			<label htmlFor="Root">
	// 				{node.value as string}
	// 			</label>
	// 			 . . 
	// 			<input type="button" value="w" />
	// 			<input type="button" value="+" />
	// 			 . . . 
	// 			<input type="button" value="d" />
	// 		</div>
	// 		{node.children.length > 0 && (
	// 			<ul>
	// 				{node.children.map((child) => renderTree(child))}
	// 			</ul>
	// 		)}
	// 	</div>
	// );
// };

export default App;
