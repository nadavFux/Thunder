import React, { useEffect, useState } from 'react';
import { Database, Target, Map as MapIcon, Globe } from 'lucide-react';
import { useItemStore } from '../store/itemStore';

interface Mission {
  id: string;
  name: string;
  collection: string;
  itemId: string;
  center: [number, number];
  zoom: number;
}

const MISSIONS: Mission[] = [
  {
    id: 'berlin-s2',
    name: 'Berlin Urban Scan (S2)',
    collection: 'sentinel-2-l2a',
    itemId: 'S2B_33UUU_20260415_0_L2A',
    center: [13.4050, 52.5200],
    zoom: 12
  },
  {
    id: 'sf-naip',
    name: 'San Francisco Ortho (NAIP)',
    collection: 'naip',
    itemId: 'ca_m_3712220_ne_10_060_20220519',
    center: [-122.4194, 37.7749],
    zoom: 14
  }
];

export const Sidebar: React.FC = () => {
  const { setActiveItem, setItems } = useItemStore();
  const [currentMissionId, setCurrentMissionId] = useState(MISSIONS[0].id);

  const handleMissionSelect = (mission: Mission) => {
    setCurrentMissionId(mission.id);
    setActiveItem(mission.itemId);
  };

  useEffect(() => {
    // Populate itemStore with known missions
    setItems(MISSIONS.map(m => ({
      id: m.itemId,
      collection: m.collection,
      asset: m.collection === 'naip' ? 'image' : 'visual'
    })));
    
    // Sync initial mission
    setActiveItem(MISSIONS[0].itemId);
  }, [setActiveItem, setItems]);

  return (
    <div className="flex flex-col h-full bg-workbench-pane text-gray-300 select-none">
      <div className="p-4 border-b border-workbench-border flex items-center justify-between">
        <div className="flex items-center text-blue-400 font-bold tracking-tighter uppercase text-sm">
          <Database size={16} className="mr-2" />
          Thunder v0.1
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-6">
        <div>
          <div className="px-2 mb-2 text-[10px] uppercase font-bold text-gray-500 tracking-widest flex items-center">
            <Globe size={10} className="mr-1" /> Collections
          </div>
          <div className="space-y-1">
            {MISSIONS.map(mission => (
              <div 
                key={mission.id}
                onClick={() => handleMissionSelect(mission)}
                className={`px-3 py-2 rounded text-xs flex items-center gap-2 cursor-pointer transition-colors ${
                  currentMissionId === mission.id ? "bg-blue-600/20 text-blue-300 border border-blue-500/30" : "hover:bg-white/5 border border-transparent"
                }`}
              >
                <Target size={12} />
                <span className="truncate">{mission.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-workbench-border">
          <div className="px-2 mb-2 text-[10px] uppercase font-bold text-gray-500 tracking-widest flex items-center">
            Active Layer Info
          </div>
          <div className="px-2 space-y-2 text-[10px] text-gray-400">
            <div className="bg-black/20 p-2 rounded border border-workbench-border">
              <div className="text-blue-500 font-bold mb-1">STAC METADATA</div>
              <div>ID: <span className="font-mono text-[9px]">{MISSIONS.find(m => m.id === currentMissionId)?.itemId}</span></div>
              <div>BBOX: Dynamic</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-black/40 border-t border-workbench-border flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-lg">
          NF
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-gray-200 leading-none">Nadav Fux</span>
          <span className="text-[9px] text-gray-500 mt-1 uppercase tracking-tighter">Senior Interpreter</span>
        </div>
      </div>
    </div>
  );
};
