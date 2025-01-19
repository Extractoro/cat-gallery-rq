import React, { useState } from "react";
import { Context, FilterContextType } from "./context.ts";

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedBreed, setSelectedBreed] = useState<string>("random");
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const value: FilterContextType = {
    selectedBreed,
    setSelectedBreed,
    showFavorites,
    setShowFavorites,
  };

  return (
    <Context.Provider value={value}>{children}</Context.Provider>
  );
};
