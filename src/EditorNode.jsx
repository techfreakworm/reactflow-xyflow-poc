import React, { useState, useEffect } from 'react';

function EditorNode({ nodeData, onUpdateNode, availableOptions, availableActions }) {
  const [instruction, setInstruction] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedAction, setSelectedAction] = useState('');

  useEffect(() => {
    if (nodeData) {
      setInstruction(nodeData.data.instruction || '');
      setSelectedOptions(nodeData.data.options || []);
      setSelectedAction(nodeData.data.actions[0] || 'None');
    }
  }, [nodeData]);

  const handleSubmit = () => {
    onUpdateNode({
      id: nodeData.id,
      data: {
        instruction,
        options: selectedOptions,
        actions: [selectedAction]
      }
    });
  };

  return (
    <div style={{ position: 'fixed', bottom: 20, left: 20, background: 'white', padding: '10px', borderRadius: '5px' }}>
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
        <select 
          multiple 
          value={selectedOptions} 
          onChange={(e) => setSelectedOptions([...e.target.selectedOptions].map(option => option.value))}
          style={{ minWidth: '200px', minHeight: '100px' }}
        >
          {availableOptions.map((option) => (
            <option 
              key={option} 
              value={option}
            >
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Action:</label>
        <select 
          value={selectedAction} 
          onChange={(e) => setSelectedAction(e.target.value)}
        >
          {availableActions.map((action) => (
            <option key={action} value={action}>
              {action}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleSubmit}>Update Node</button>
    </div>
  );
}

export default EditorNode;
