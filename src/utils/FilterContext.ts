import { createContext } from "react";

export interface FilterContextType {
  selectedBreed: string;
  setSelectedBreed: (breed: string) => void;
  showFavorites: boolean;
  setShowFavorites: (show: boolean) => void;
}

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined
);
