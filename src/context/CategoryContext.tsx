"use client";

import { createContext, useContext, useState } from "react";
// ---------------------------------

export interface Category {
  name: string;
  subcategories?: Category[];
}

export const CategoriesContext = createContext<any | undefined>(undefined);

export const CategoriesProvider = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export function useCategories() {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }
  return context;
}
