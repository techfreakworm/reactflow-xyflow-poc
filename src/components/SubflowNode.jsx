import React from 'react';
import { Handle, Position } from '@xyflow/react';

function SubflowNode({ data }) {
  return (
    <div className="subflow-node">
      <Handle type="target" position={Position.Top} id="entry" />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Bottom} id="exit-1" />
      <Handle type="source" position={Position.Bottom} id="exit-2" />
    </div>
  );
}

export default SubflowNode;
