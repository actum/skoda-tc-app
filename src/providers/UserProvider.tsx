import React, { useEffect, useState } from 'react';
import { IUserContext, UserContext } from './UserContext';
import { User } from '../connections/request/Data';
import { asyncFetch } from '@/src/connections/fetch/asyncFetch';
import HttpApiCallError from '@/src/connections/fetch/HttpApiCallError';
import { USER_TOKEN } from '@env';

export const UserProvider = ({ children }: { children: JSX.Element }) => {
  const token = String(USER_TOKEN);
  const initialData: IUserContext = {
    token: token,
    isAuthenticated: true,
    userData: {
      firstname: 'Josef',
      lastname: 'Novák',
      phoneNumber: '+42001003006',
      id: 'XXX',
    },
  };

  useEffect(() => {
    loadUserData();
  }, []);

  async function loadUserData() {
    try {
      const user = await asyncFetch<User>('/api/v1/users/current', {
        method: 'GET',
      });
      console.log('user', user);
      const newState = {
        ...ctx,
        userData: user,
      };
      // storeData(newState);
      setCtx(newState);
    } catch (e) {
      const error = e as HttpApiCallError;
      alert(`ERROR WHEN GET USER: ${error.message}`);
    }
  }

  const [ctx, setCtx] = useState<IUserContext>(initialData);

  return <UserContext.Provider value={ctx}>{children}</UserContext.Provider>;
};
