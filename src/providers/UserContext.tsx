import { createContext } from 'react';
import { User } from '../connections/request/Data';

export const localStorageUserKey = 'user';

export interface IUserContext {
  isAuthenticated: boolean;
  reload: () => void;
  token?: string;
  userData?: User;
}

export const UserContext = createContext<IUserContext>({
  isAuthenticated: false,
  reload: () => null,
});
