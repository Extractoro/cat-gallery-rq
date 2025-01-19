import { createContext } from "react";

export interface FilterContextType {
    selectedBreed: string | null;
    setSelectedBreed: (breed: string | null) => void;
    showFavorites: boolean;
    setShowFavorites: (show: boolean) => void;
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined);
