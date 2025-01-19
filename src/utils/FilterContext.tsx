import React, { useState } from "react";
import { FilterContext, FilterContextType } from "./FilterContext";

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedBreed, setSelectedBreed] = useState<string>('random');
    const [showFavorites, setShowFavorites] = useState<boolean>(false);

    const value: FilterContextType = {
        selectedBreed,
        setSelectedBreed,
        showFavorites,
        setShowFavorites,
    };

    return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};
