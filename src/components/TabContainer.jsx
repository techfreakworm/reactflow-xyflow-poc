import React, { useState } from 'react';

function TabContainer({ children }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tab-container">
      <div className="tab-buttons">
        <button
          className={activeTab === 0 ? 'active' : ''}
          onClick={() => setActiveTab(0)}
        >
          Offerings Editor
        </button>
        <button
          className={activeTab === 1 ? 'active' : ''}
          onClick={() => setActiveTab(1)}
        >
          Reusable Offerings
        </button>
      </div>
      <div className="tab-content">
        {React.Children.map(children, (child, index) => (
          <div style={{ display: activeTab === index ? 'block' : 'none' }}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TabContainer;
