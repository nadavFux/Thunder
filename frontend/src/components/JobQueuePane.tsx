import React from 'react';

export const JobQueuePane: React.FC = () => {
  return (
    <div className="p-4 bg-workbench-pane h-full text-gray-400">
      <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Job Queue</h3>
      <p className="text-xs">Background processing and ingestion status.</p>
    </div>
  );
};
