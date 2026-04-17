# Thunder Phase 4: Expert Workbench Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul the barebones frontend into a robust, enterprise-grade Expert Analyst Workstation with domain-driven state, multi-pane layouts, keyboard-driven workflow, and per-item 16-bit rendering settings.

**Architecture:** Domain-Driven Zustand stores (`layoutStore`, `itemStore`, `jobStore`) for scalable separation. `react-mosaic` for an adjustable multi-pane interface. Centralized static hotkey registry. Abstracted API client layer (Axios) for ad-hoc backend communication.

**Tech Stack:** React, TypeScript, Vite, Zustand, react-mosaic-component, Deck.gl, MapLibre GL JS, Tailwind CSS, Axios.

---

### Task 1: API Client Layer Setup (COMPLETE)

**Files:**
- Create: `frontend/src/api/client.ts`
- Create: `frontend/src/api/types.ts`

- [x] **Step 1: Write API types**
- [x] **Step 2: Create robust Axios client**

### Task 2: Domain-Driven Stores (Zustand) (COMPLETE)

**Files:**
- Create: `frontend/src/store/itemStore.ts`
- Create: `frontend/src/store/layoutStore.ts`

- [x] **Step 1: Implement Per-Item Settings Store**
- [x] **Step 2: Implement Layout Store**

### Task 3: MapPane Refactor (Sync with itemStore) (COMPLETE)

**Files:**
- Modify: `frontend/src/components/MapPane.tsx`

- [x] **Step 1: Refactor to use itemStore for DRA state**

### Task 4: The Hotkey Legend Component

**Files:**
- Create: `frontend/src/components/HotkeyLegend.tsx`
- Create: `frontend/src/components/Workbench.tsx`

- [ ] **Step 1: Create the Static Hotkey Legend component**
```tsx
// frontend/src/components/HotkeyLegend.tsx
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
```

- [ ] **Step 2: Rebuild Workbench.tsx with multi-pane layout**
Use `react-mosaic` to create the enterprise layout.

### Task 5: Histogram / DRA Pane Component

**Files:**
- Create: `frontend/src/components/HistogramPane.tsx`
- Modify: `frontend/src/components/Workbench.tsx`

- [ ] **Step 1: Create the Histogram pane connected to itemStore**
- [ ] **Step 2: Wire components into Workbench**

### Task 6: Final Integration (Main & App)

**Files:**
- Create: `frontend/src/main.tsx`
- Create: `frontend/src/App.tsx`
- Create: `frontend/src/index.css`

- [ ] **Step 1: Scaffold App and Main to launch the Workbench**
- [ ] **Step 2: Add essential styles for react-mosaic and workbench theme**
