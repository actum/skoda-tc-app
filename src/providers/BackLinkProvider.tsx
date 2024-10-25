import { createContext, ReactNode, useState } from 'react';

interface IBackLinkContext {
  setBackLink: (val: string) => void;
  backLink: string;
}

export const BackLinkContext = createContext<IBackLinkContext>({
  setBackLink: (val: string) => null,
  backLink: '',
});

export default function BackLinkProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [backLink, setBackLink] = useState<string>('/');

  return (
    <BackLinkContext.Provider
      value={{
        backLink,
        setBackLink,
      }}
    >
      {children}
    </BackLinkContext.Provider>
  );
}
