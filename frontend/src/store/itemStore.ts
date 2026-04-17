// frontend/src/store/itemStore.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { DRAConfig, STACItem } from '../api/types';

interface ItemState {
  activeItemId: string | null;
  items: Record<string, Partial<STACItem> & { id: string; collection: string; asset?: string }>;
  draSettings: Record<string, DRAConfig>;
}

interface ItemActions {
  setActiveItem: (id: string) => void;
  setItems: (items: (Partial<STACItem> & { id: string; collection: string; asset?: string })[]) => void;
  updateDRA: (id: string, settings: Partial<DRAConfig>) => void;
  resetDRA: (id: string) => void;
}

const DEFAULT_DRA: DRAConfig = { contrast: 1.0, brightness: 0.0, gamma: 1.0 };

export const useItemStore = create<ItemState & ItemActions>()(
  immer((set) => ({
    activeItemId: null,
    items: {},
    draSettings: {},
    setActiveItem: (id) => set((state) => { state.activeItemId = id; }),
    setItems: (items) => set((state) => {
      items.forEach(item => {
        state.items[item.id] = item;
      });
    }),
    updateDRA: (id, settings) => set((state) => {
      if (!state.draSettings[id]) state.draSettings[id] = { ...DEFAULT_DRA };
      state.draSettings[id] = { ...state.draSettings[id], ...settings };
    }),
    resetDRA: (id) => set((state) => { state.draSettings[id] = { ...DEFAULT_DRA }; }),
  }))
);
