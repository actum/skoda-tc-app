import React, { useEffect, useState } from 'react';
import { IUserContext, localStorageUserKey, UserContext } from './UserContext';
import { User } from '../connections/request/Data';
import { asyncFetch } from '@/src/connections/fetch/asyncFetch';
import HttpApiCallError from '@/src/connections/fetch/HttpApiCallError';
import SyncStorage from 'sync-storage';
import { USER_TOKEN } from '@env';

export const UserProvider = ({ children }: { children: JSX.Element }) => {
  const token = String(USER_TOKEN);
  const initialData: IUserContext = {
    token: token,
    isAuthenticated: true,
    userData: {
      token: token,
      email: 'email@email.com',
      firstName: 'Josef',
      lastName: 'Novák',
    },
  };

  useEffect(() => {
    storeData(initialData);
    loadUserData();
  }, []);

  async function storeData(value: IUserContext) {
    try {
      await SyncStorage.set(localStorageUserKey, JSON.stringify(value));
    } catch (e) {
      console.error(e.message);
      // saving error
    }
  }

  async function loadUserData() {
    try {
      const user = await asyncFetch<User>('/api/v1/users', {
        method: 'GET',
      });
      const newState = {
        ...ctx,
        userData: user,
      };
      storeData(newState);
      setCtx(newState);
    } catch (e) {
      const error = e as HttpApiCallError;
      alert(`ERROR WHEN GET USER: ${error.message}`);
    }
  }

  const [ctx, setCtx] = useState<IUserContext>(initialData);

  return <UserContext.Provider value={ctx}>{children}</UserContext.Provider>;
};
