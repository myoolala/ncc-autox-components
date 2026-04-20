'use-strict';

export const DataStates = {
    LOADING: "LOADING",
    INITIALIZING: "INITIALIZING",
    INITIALIZED: "INITIALIZED",
    LOADED: "LOADED",
    ERROR: "ERROR",
    SAVING: "SAVING",
    SAVED: "SAVED"
} as const;

export interface AppState {
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  // resultsByYear: 
}