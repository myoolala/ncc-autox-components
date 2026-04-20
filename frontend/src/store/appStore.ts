import { create } from "zustand";

const getCurrentYear = (): number => new Date().getFullYear();

const buildYearOptions = (): number[] => {
  const currentYear = getCurrentYear();
  const years: number[] = [];

  for (let year = currentYear; year >= currentYear - 5; year -= 1) {
    years.push(year);
  }

  return years;
};

export interface EventResultSummary {
  id: string;
  name: string;
  date: string;
}

export interface YearResultsData {
  seasonStandings: unknown | null;
  events: EventResultSummary[];
}

export interface AppStore {
  selectedYear: number;
  availableYears: number[];
  resultsByYear: Record<number, YearResultsData>;
  setSelectedYear: (year: number) => void;
  setResultsForYear: (year: number, data: YearResultsData) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  selectedYear: getCurrentYear(),
  availableYears: buildYearOptions(),

  setSelectedYear: (year: number) => {
    if (!Number.isInteger(year)) {
      return;
    }

    set({ selectedYear: year });
  },

  resultsByYear: {
    [getCurrentYear()]: {
      seasonStandings: null,
      events: [
        { id: "event-1", name: "Event 1", date: "2026-04-01" },
        { id: "event-2", name: "Event 2", date: "2026-05-01" },
        { id: "event-3", name: "Event 3", date: "2026-06-01" },
      ],
    },
  },

  setResultsForYear: (year: number, data: YearResultsData) =>
    set((state) => ({
      resultsByYear: {
        ...state.resultsByYear,
        [year]: data,
      },
    })),
}));