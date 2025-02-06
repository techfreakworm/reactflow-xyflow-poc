import React, { useState, useCallback } from 'react';
import { 
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges 
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import InstructionNode from '../InstructionNode';
import AdderNode from '../AdderNode';
import EditorNode from '../EditorNode';

const actions = [
  "None",
  "Monthly Search",
  "PIL",
  "Transient Search",
  "Attendant Assisting",
];

const allOptions = [
  'Working',
  'Not working',
  'Payment deducted but gate not open',
  'Swiped again',
  'Entered manually',
  'Used another card',
  '50',
  '100',
  '200',
  'New Option 1',
  'New Option 2',
  'New Option 3',
];

const initialNodes = [
  {
    id: 'group-1',
    type: 'group',
    data: { label: 'Group 1' },
    position: { x: 0, y: 0 },
    style: {
      width: 600,
      height: 400,
    },
  },
  {
    id: 'group-1-label',
    type: 'default',
    data: { label: 'Group 1' },
    position: { x: 10, y: -30 },
    parentId: 'group-1',
    extent: 'parent',
  },
  {
    id: 'reusable-1',
    type: 'instructionNode',
    position: { x: 10, y: 10 },
    data: {
      instruction: 'Start of reusable flow',
      options: ['Yes', 'No'],
      actions: ['None']
    },
    parentId: 'group-1',
    extent: 'parent',
  },
  {
    id: 'reusable-2',
    type: 'instructionNode',
    position: { x: 10, y: 150 },
    data: {
      instruction: 'Handle Yes path',
      options: ['Continue', 'Stop'],
      actions: ['None']
    },
    parentId: 'group-1',
    extent: 'parent',
  },
  {
    id: 'reusable-3',
    type: 'instructionNode',
    position: { x: 10, y: 290 },
    data: {
      instruction: 'Handle No path',
      options: ['Retry', 'Exit'],
      actions: ['None']
    },
    parentId: 'group-1',
    extent: 'parent',
  },
  {
    id: 'group-2',
    type: 'group',
    data: { label: 'Group 2' },
    position: { x: 700, y: 0 },
    style: {
      width: 600,
      height: 400,
    },
  },
  {
    id: 'group-2-label',
    type: 'default',
    data: { label: 'Group 2' },
    position: { x: 10, y: -30 },
    parentId: 'group-2',
    extent: 'parent',
  },
  {
    id: 'reusable-4',
    type: 'instructionNode',
    position: { x: 10, y: 10 },
    data: {
      instruction: 'Start of reusable flow 2',
      options: ['Yes', 'No'],
      actions: ['None']
    },
    parentId: 'group-2',
    extent: 'parent',
  },
  {
    id: 'reusable-5',
    type: 'instructionNode',
    position: { x: 10, y: 150 },
    data: {
      instruction: 'Handle Yes path 2',
      options: ['Continue', 'Stop'],
      actions: ['None']
    },
    parentId: 'group-2',
    extent: 'parent',
  },
  {
    id: 'reusable-6',
    type: 'instructionNode',
    position: { x: 10, y: 290 },
    data: {
      instruction: 'Handle No path 2',
      options: ['Retry', 'Exit'],
      actions: ['None']
    },
    parentId: 'group-2',
    extent: 'parent',
  },
  {
    id: 'group-3',
    type: 'group',
    data: { label: 'Group 3' },
    position: { x: 1400, y: 0 },
    style: {
      width: 600,
      height: 400,
    },
  },
  {
    id: 'group-3-label',
    type: 'default',
    data: { label: 'Group 3' },
    position: { x: 10, y: -30 },
    parentId: 'group-3',
    extent: 'parent',
  },
  {
    id: 'reusable-7',
    type: 'instructionNode',
    position: { x: 10, y: 10 },
    data: {
      instruction: 'Start of reusable flow 3',
      options: ['Yes', 'No'],
      actions: ['None']
    },
    parentId: 'group-3',
    extent: 'parent',
  },
  {
    id: 'reusable-8',
    type: 'instructionNode',
    position: { x: 10, y: 150 },
    data: {
      instruction: 'Handle Yes path 3',
      options: ['Continue', 'Stop'],
      actions: ['None']
    },
    parentId: 'group-3',
    extent: 'parent',
  },
  {
    id: 'reusable-9',
    type: 'instructionNode',
    position: { x: 10, y: 290 },
    data: {
      instruction: 'Handle No path 3',
      options: ['Retry', 'Exit'],
      actions: ['None']
    },
    parentId: 'group-3',
    extent: 'parent',
  },
];

const initialEdges = [
  { 
    id: 'reusable-e1', 
    source: 'reusable-1', 
    target: 'reusable-2', 
    sourceHandle: 'Yes',
    label: 'Yes'
  },
  { 
    id: 'reusable-e2', 
    source: 'reusable-1', 
    target: 'reusable-3', 
    sourceHandle: 'No',
    label: 'No'
  },
  { 
    id: 'reusable-e3', 
    source: 'reusable-4', 
    target: 'reusable-5', 
    sourceHandle: 'Yes',
    label: 'Yes'
  },
  { 
    id: 'reusable-e4', 
    source: 'reusable-4', 
    target: 'reusable-6', 
    sourceHandle: 'No',
    label: 'No'
  },
  { 
    id: 'reusable-e5', 
    source: 'reusable-7', 
    target: 'reusable-8', 
    sourceHandle: 'Yes',
    label: 'Yes'
  },
  { 
    id: 'reusable-e6', 
    source: 'reusable-7', 
    target: 'reusable-9', 
    sourceHandle: 'No',
    label: 'No'
  },
];

function ReusableOfferings() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [editingNode, setEditingNode] = useState(null);
  const [clipboardNode, setClipboardNode] = useState(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(
      { ...connection, label: connection.sourceHandle }, 
      eds
    )),
    []
  );

  const handleAddNode = (newNode) => {
    setNodes((nds) => [...nds, newNode]);
  };

  const handleEditNode = (node) => {
    setEditingNode(node);
  };

  const handleUpdateNode = (updatedNode) => {
    setEdges((eds) => eds.filter(edge => 
      edge.source !== updatedNode.id && edge.target !== updatedNode.id
    ));

    setNodes((nds) => nds.map((node) => {
      if (node.id === updatedNode.id) {
        return {
          ...node,
          data: updatedNode.data
        };
      }
      return node;
    }));
    
    setEditingNode(null);
  };

  // Add clipboard functionality
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey) {
        const selectedNode = nodes.find(node => node.selected);
        
        if (event.key === 'c' && selectedNode) {
          setClipboardNode(selectedNode);
        } else if (event.key === 'v' && clipboardNode) {
          const newNode = {
            ...clipboardNode,
            id: `reusable-${Date.now()}`,
            position: {
              x: clipboardNode.position.x + 100,
              y: clipboardNode.position.y + 100
            },
            selected: false
          };
          handleAddNode(newNode);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [nodes, clipboardNode]);

  return (
    <div className="flow-container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={{ 
          instructionNode: (props) => <InstructionNode {...props} onEdit={handleEditNode} />
        }}
        fitView
        style={{ background: '#B8CEFF' }}
      />
      <AdderNode 
        onAddNode={handleAddNode} 
        availableOptions={allOptions} 
        availableActions={actions} 
      />
      {editingNode && (
        <EditorNode
          nodeData={editingNode}
          onUpdateNode={handleUpdateNode}
          availableOptions={allOptions}
          availableActions={actions}
        />
      )}
    </div>
  );
}

export { ReusableOfferings, initialNodes as groups };
