import React from 'react';

export const HotkeyLegend: React.FC = () => {
  return (
    <div className="p-4 bg-workbench-pane h-full text-gray-300 overflow-y-auto">
      <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Command Registry</h3>
      <div className="space-y-4">
        <div>
          <h4 className="text-xs text-blue-400 mb-2">Analysis View</h4>
          <div className="flex justify-between text-xs mb-1"><span>Toggle Lossless WebGL</span><kbd className="bg-gray-800 px-2 rounded">H</kbd></div>
        </div>
        <div>
          <h4 className="text-xs text-blue-400 mb-2">DRA Controls</h4>
          <div className="flex justify-between text-xs mb-1"><span>Increase Contrast</span><kbd className="bg-gray-800 px-2 rounded">]</kbd></div>
          <div className="flex justify-between text-xs mb-1"><span>Decrease Contrast</span><kbd className="bg-gray-800 px-2 rounded">[</kbd></div>
          <div className="flex justify-between text-xs mb-1"><span>Reset DRA</span><kbd className="bg-gray-800 px-2 rounded">0</kbd></div>
        </div>
      </div>
    </div>
  );
};
