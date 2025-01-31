import { useCallback, useState } from 'react';
import {
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
 
import InstructionNode from './InstructionNode';
import AdderNode from './AdderNode';
import EditorNode from './EditorNode';
 
const rfStyle = {
  backgroundColor: '#B8CEFF',
};

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
    id: 'node-1',
    type: 'instructionNode',
    position: { x: 0, y: -300},
    data: {
      instruction: 'Please ask parker if card is working?',
      options: ['Working', 'Not working', 'Payment deducted but gate not open'],
      actions
    },
  },
  {
    id: 'node-2',
    type: 'instructionNode',
    position: { x: -400, y: 100 },
    data: {
      instruction: 'What did he do to make his card work?',
       options: ['Swiped again', 'Entered manually', 'Used another card'],
       actions
      },
  },
  {
    id: 'node-3',
    type: 'instructionNode',
    position: { x: 0, y: 100 },
    data: {
      instruction: 'What did he do to make his card NOT work?',
       options: ['Swiped again', 'Entered manually', 'Used another card'],
       actions
      },
  },
  {
    id: 'node-4',
    type: 'instructionNode',
    position: { x: 400, y: -100 },
    data: {
      instruction: 'How much amounts was deducted?',
       options: ['50', '100', '200'],
       actions
      },
  },
];

const initialEdges = [
  { id: 'edge-1', source: 'node-1', target: 'node-2', sourceHandle: 'Working',label:'Working'},
  { id: 'edge-2', source: 'node-1', target: 'node-3', sourceHandle: 'Not working',label:'Not working' },
  { id: 'edge-3', source: 'node-1', target: 'node-4', sourceHandle: 'Payment deducted but gate not open',label:'Payment deducted but gate not open' },
];
// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { instructionNode: InstructionNode };
 
function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [editingNode, setEditingNode] = useState(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge({ ...connection, label: connection.sourceHandle }, eds)),
    [setEdges],
  );

  const handleAddNode = (newNode) => {
    setNodes((nds) => [...nds, newNode]);
  };

  const handleEditNode = (node) => {
    setEditingNode(node);
  };

  const handleUpdateNode = (updatedNode) => {
    // First, remove all edges connected to this node
    setEdges((eds) => eds.filter(edge => 
      edge.source !== updatedNode.id && edge.target !== updatedNode.id
    ));

    // Then update the node
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

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={{ instructionNode: (props) => <InstructionNode {...props} onEdit={handleEditNode} /> }}
        fitView
        style={rfStyle}
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
    </>
  );
}
 
export default Flow;
