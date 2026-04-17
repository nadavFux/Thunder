import React from 'react';

export const Sidebar: React.FC = () => {
  return (
    <div className="p-4 bg-workbench-pane h-full text-gray-400 border-r border-workbench-border">
      <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Discovery</h3>
      <p className="text-xs">Mission controls and discovery tools.</p>
    </div>
  );
};
