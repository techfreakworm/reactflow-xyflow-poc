import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
 
const handleStyle = { left: 10 };

function InstructionNode({ data, isConnectable }) {
  const handles = [];
  for(let i = 0; i < data.options.length; i++) {
    handles.push(
      <Handle
        key={data.options[i]}
        type="source"
        position={Position.Bottom}
        id={data.options[i]}
        style={{ ...handleStyle, left: i * 30 }}
        isConnectable={isConnectable}
      />,
    )
  }
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
    </div>
  );
}
 
export default InstructionNode;
