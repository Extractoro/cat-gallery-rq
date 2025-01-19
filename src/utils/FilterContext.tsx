import {createContext, ReactNode, useState} from "react";
import React from "react";

interface FilterContextType {
    selectedBreed: string;
    setSelectedBreed: (breed: string) => void;
    showFavorites: boolean;
    setShowFavorites: (isShow: boolean) => void;
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
    children: ReactNode;
}

export const FilterProvider:  React.FC<FilterProviderProps> = ({ children }) => {
    const [selectedBreed, setSelectedBreed] = useState<string>('random')
    const [showFavorites, setShowFavorites] = useState<boolean>(false);

    return (
        <FilterContext.Provider value={{ selectedBreed, setSelectedBreed, showFavorites, setShowFavorites }}>
            {children}
        </FilterContext.Provider>
    )
}