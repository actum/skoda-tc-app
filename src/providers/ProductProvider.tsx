// ProductProvider.tsx
import React, {createContext, useEffect, useState} from 'react';
import {Licence} from '../connections/request/Data';
import {asyncFetch} from '@/src/connections/fetch/asyncFetch';
import HttpApiCallError from '@/src/connections/fetch/HttpApiCallError';

interface IProductContext {
  items: Licence[];
  setItems: (items: Licence[]) => void;
  getProductById: (id: string | number) => Promise<Licence | null>;
}

export const ProductContext = createContext<IProductContext>({
  items: [],
  setItems: () => null,
  getProductById: async () => null,
});

export const ProductProvider = ({ children }: { children: JSX.Element }) => {
  const [items, setItems] = useState<Licence[]>([]);

  useEffect(() => {
    loadProductData();
  }, []);

  async function loadProductData() {
    try {
      const products = await asyncFetch<Licence[]>('/api/v1/products', {
        method: 'GET',
      });
      setItems(products);
    } catch (e) {
      const error = e as HttpApiCallError;
      alert(`ERROR WHEN GET PRODUCTS: ${error.message}`);
    }
  }

  // Funkce pro načtení konkrétního produktu podle ID
  const getProductById = async (
    id: string | number,
  ): Promise<Licence | null> => {
    try {
        return await asyncFetch<Licence>(`/api/v1/products/${id}`, {
          method: 'GET',
      });
    } catch (e) {
      const error = e as HttpApiCallError;
      alert(`ERROR WHEN GET PRODUCT BY ID ${id}: ${error.message}`);
      return null;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        items: items,
        setItems: setItems,
        getProductById: getProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
