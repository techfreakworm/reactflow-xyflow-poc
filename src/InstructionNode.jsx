import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
 
const handleStyle = { left: 10 };

function InstructionNode({ id, data, isConnectable, onEdit }) {
  const handles = data.options.map((option, index) => (
    <Handle
      key={option}
      type="source"
      position={Position.Bottom}
      id={option}
      style={{ left: `${(index + 1) * (100 / (data.options.length + 1))}%` }}
      isConnectable={isConnectable}
    />
  ));

  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
 
  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        <label htmlFor="text">{data.instruction}</label>
        {/* <input id="text" name="text" onChange={onChange} className="nodrag" /> */}
      </div>
      <div>
        {
          data.options.map((option) => (
            <div key={option}>
              <button>{option}</button>
            </div>
          ))
        }
      </div>
      <div>
        <label htmlFor="actions">Action:</label>
        <select name="action" id="actions" value={data.actions[0]} disabled>
          <option value={data.actions[0]}>
            {data.actions[0]}
          </option>
        </select>
      </div>
      {handles}
      <button onClick={() => onEdit({ id, data })}>Edit</button>
    </div>
  );
}
 
export default InstructionNode;
