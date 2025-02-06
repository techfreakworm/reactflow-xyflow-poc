import React from 'react';

function GroupList({ groups, onAddGroup }) {
  return (
    <div style={{ padding: '10px', background: 'white', borderRadius: '5px' }}>
      <h3>Reusable Groups</h3>
      <ul>
        {groups.map((group) => (
          <li key={group.id}>
            <button onClick={() => onAddGroup(group)}>{group.data.label}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupList;
