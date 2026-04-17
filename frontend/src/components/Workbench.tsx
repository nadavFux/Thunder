import React from 'react';
import { Mosaic, MosaicWindow } from 'react-mosaic-component';
import 'react-mosaic-component/react-mosaic-component.css';

import { Sidebar } from './Sidebar';
import { MapPane } from './MapPane';
import { HistogramPane } from './HistogramPane';
import { JobQueuePane } from './JobQueuePane';
import { HotkeyLegend } from './HotkeyLegend';

// ID type for the mosaic panes
type PaneId = 'sidebar' | 'map' | 'histogram' | 'jobs' | 'hotkeys';

const TITLE_MAP: Record<PaneId, string> = {
  sidebar: 'Discovery',
  map: 'Analysis Viewport',
  histogram: 'Histogram / DRA',
  jobs: 'Job Queue',
  hotkeys: 'Hotkey Legend',
};

const PANE_MAP: Record<PaneId, React.ReactElement> = {
  sidebar: <Sidebar />,
  map: <MapPane />,
  histogram: <HistogramPane />,
  jobs: <JobQueuePane />,
  hotkeys: <HotkeyLegend />,
};

export const Workbench: React.FC = () => {
  return (
    <div className="w-screen h-screen bg-workbench-bg overflow-hidden flex flex-col font-sans text-gray-200">
      {/* Header */}
      <header className="h-10 bg-workbench-header border-b border-workbench-border flex items-center px-4 justify-between z-50">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center font-black text-white text-[10px]">
            T
          </div>
          <span className="text-gray-100 font-bold tracking-[0.2em] uppercase text-xs">
            Thunder <span className="text-gray-500 font-normal">v0.1.0</span>
          </span>
        </div>
        <div className="flex items-center space-x-6 text-[10px] font-mono">
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
            <span className="text-gray-400 uppercase">STAC-API: CONNECTED</span>
          </div>
          <div className="flex items-center border-l border-gray-800 pl-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
            <span className="text-gray-400 uppercase">TILER: READY</span>
          </div>
        </div>
      </header>

      {/* Main Mosaic Area */}
      <div className="flex-1 relative">
        <Mosaic<PaneId>
          renderTile={(id, path) => (
            <MosaicWindow<PaneId>
              path={path}
              title={TITLE_MAP[id]}
              toolbarControls={<div />}
            >
              {PANE_MAP[id]}
            </MosaicWindow>
          )}
          initialValue={{
            direction: 'row',
            first: 'sidebar',
            second: {
              direction: 'row',
              first: 'map',
              second: {
                direction: 'column',
                first: 'histogram',
                second: {
                  direction: 'column',
                  first: 'jobs',
                  second: 'hotkeys',
                  splitPercentage: 50
                },
                splitPercentage: 40
              },
              splitPercentage: 75
            },
            splitPercentage: 18
          }}
        />
      </div>
    </div>
  );
};
