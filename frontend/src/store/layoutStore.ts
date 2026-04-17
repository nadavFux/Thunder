// frontend/src/store/layoutStore.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface LayoutState {
  isAnalysisMode: boolean;
}

interface LayoutActions {
  toggleAnalysisMode: () => void;
}

export const useLayoutStore = create<LayoutState & LayoutActions>()(
  immer((set) => ({
    isAnalysisMode: false,
    toggleAnalysisMode: () => set((state) => {
      state.isAnalysisMode = !state.isAnalysisMode;
    }),
  }))
);
