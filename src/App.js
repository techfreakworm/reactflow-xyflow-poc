import { useCallback, useState, useEffect } from 'react';
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
import TabContainer from './components/TabContainer';
import { ReusableOfferings, groups as reusableGroups } from './components/ReusableOfferings';
import GroupList from './components/GroupList';

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
  const [clipboardNode, setClipboardNode] = useState(null);

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

  const handleAddGroup = (group) => {
    const newGroup = {
      ...group,
      id: `group-${Date.now()}`,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    setNodes((nds) => [...nds, newGroup]);
  };

  const handleAddNewGroup = () => {
    const groupId = `group-${Date.now()}`;
    const newGroup = {
      id: groupId,
      type: 'group',
      data: { label: `New Group ${Date.now()}` },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      style: {
        width: 600,
        height: 400,
      },
    };

    const newNodes = [
      {
        id: `node-${Date.now()}-1`,
        type: 'instructionNode',
        position: { x: 10, y: 10 },
        data: {
          instruction: 'New Instruction 1',
          options: ['Option 1', 'Option 2'],
          actions: ['None']
        },
        parentId: groupId,
        extent: 'parent',
      },
      {
        id: `node-${Date.now()}-2`,
        type: 'instructionNode',
        position: { x: 10, y: 150 },
        data: {
          instruction: 'New Instruction 2',
          options: ['Option 3', 'Option 4'],
          actions: ['None']
        },
        parentId: groupId,
        extent: 'parent',
      },
      {
        id: `node-${Date.now()}-3`,
        type: 'instructionNode',
        position: { x: 10, y: 290 },
        data: {
          instruction: 'New Instruction 3',
          options: ['Option 5', 'Option 6'],
          actions: ['None']
        },
        parentId: groupId,
        extent: 'parent',
      },
    ];

    setNodes((nds) => [...nds, newGroup, ...newNodes]);
  };

  // Add keyboard event listeners for copy/paste
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey) { // Support both Windows/Linux (Ctrl) and Mac (Cmd)
        const selectedNode = nodes.find(node => node.selected);
        
        if (event.key === 'c' && selectedNode) {
          // Copy
          setClipboardNode(selectedNode);
        } else if (event.key === 'v' && clipboardNode) {
          // Paste
          const newNode = {
            ...clipboardNode,
            id: `node-${Date.now()}`, // Generate unique ID
            position: {
              x: clipboardNode.position.x + 100, // Offset position
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
    <TabContainer>
      <div className="flow-container">
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
        <GroupList groups={reusableGroups} onAddGroup={handleAddGroup} />
        <button onClick={handleAddNewGroup} style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>Add New Group</button>
        {editingNode && (
          <EditorNode
            nodeData={editingNode}
            onUpdateNode={handleUpdateNode}
            availableOptions={allOptions}
            availableActions={actions}
          />
        )}
      </div>
      <ReusableOfferings />
    </TabContainer>
  );
}

export default Flow;
