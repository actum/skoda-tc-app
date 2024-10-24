import React, { createContext, useEffect, useState } from 'react';
import { Category } from '../connections/request/Data';
import { asyncFetch } from '@/src/connections/fetch/asyncFetch';
import HttpApiCallError from '@/src/connections/fetch/HttpApiCallError';

interface ICategoryContext {
  items: Category[];
  setItems: (items: Category[]) => void;
}

export const CategoryContext = createContext<ICategoryContext>({
  items: [],
  setItems: () => null,
});

export const CategoryProvider = ({ children }: { children: JSX.Element }) => {
  useEffect(() => {
    loadCategoryData();
  }, []);

  async function loadCategoryData() {
    try {
      const category = await asyncFetch<Category[]>('/api/v1/categories', {
        method: 'GET',
      });
      console.log('category', category);
      const newState = {
        ...items,
        categoryData: category,
      };
      // storeData(newState);
      setItems(newState);
    } catch (e) {
      const error = e as HttpApiCallError;
      alert(`ERROR WHEN GET CATEGORY: ${error.message}`);
    }
  }

  const [items, setItems] = useState<Category[]>([]);

  return (
    <CategoryContext.Provider
      value={{
        items: items,
        setItems: setItems,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
