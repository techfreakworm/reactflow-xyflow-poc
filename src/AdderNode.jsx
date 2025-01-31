import React, { useState } from 'react';

function AdderNode({ onAddNode, availableOptions, availableActions }) {
  const [instruction, setInstruction] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedAction, setSelectedAction] = useState('');

  const handleAddNode = () => {
    const newNode = {
      id: `node-${Date.now()}`,
      type: 'instructionNode',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: {
        instruction,
        options: selectedOptions,
        actions: [selectedAction],
      },
    };
    onAddNode(newNode);
  };

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, background: 'white', padding: '10px', borderRadius: '5px' }}>
      <div>
        <label>Instruction:</label>
        <input
          type="text"
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
        />
      </div>
      <div>
        <label>Options:</label>
        <select multiple value={selectedOptions} onChange={(e) => setSelectedOptions([...e.target.selectedOptions].map(option => option.value))}>
          {availableOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Action:</label>
        <select value={selectedAction} onChange={(e) => setSelectedAction(e.target.value)}>
          {availableActions.map((action) => (
            <option key={action} value={action}>
              {action}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleAddNode}>Add Node</button>
    </div>
  );
}

export default AdderNode;
