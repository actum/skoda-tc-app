import { createContext, ReactNode, useState } from 'react';
import { Licence } from '@/src/connections/request/Data';

interface ICardContext {
  items: Licence[];
  setItems: (items: Licence[]) => void;
}

export const CardItemsContext = createContext<ICardContext>({
  items: [],
  setItems: () => null,
});

export default function CardItemsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<Licence[]>([]);

  function setCardItems(items: Licence[]) {
    setItems(items);
  }

  return (
    <CardItemsContext.Provider
      value={{
        items: items,
        setItems: setCardItems,
      }}
    >
      {children}
    </CardItemsContext.Provider>
  );
}
