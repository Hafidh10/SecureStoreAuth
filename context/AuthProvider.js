import React, { createContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axiosConfig from '../helpers/axiosConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [proceed, setProceed] = useState(null);

  const getUser = (token) => {
    axiosConfig.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token}`;
    axiosConfig.get('/user')
    .then(response => {
      console.log('Hafidh', response.data)
      const code = response.data.data.company.company_code
      const obj = {
        token: token,
        code: code,
        avatar: response.data.data.avatar,
        name: response.data.data.name,
        phone: response.data.data.phone
      }

      SecureStore.setItemAsync('data', JSON.stringify(obj));

      setUser(obj);
      setError(null);
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        proceed,
        setProceed,
        error,
        isLoading,
        login: (email, password) => {
          // communicate with backend and store token in SecureStore
          setIsLoading(true);
          axiosConfig
            .post('/login', {
              email,
              password,
              device_name: 'samsung',
            })
            .then(response => {
              const userResponse = {
                token: response.data,
                email: email,
              };
              console.log("YOW", response.data)
              getUser(response.data)

              // SecureStore.setItemAsync('token', response.data);
              setIsLoading(false);
            })
            .catch(error => {
              console.log(error);
              setError(error.response.data.message);
              setIsLoading(false);
            });
        },
        logout: () => {
          setUser(null);
          setIsLoading(true);
          axiosConfig.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${user.token}`;
          axiosConfig
            .post('/logout')
            .then(response => {
              setUser(null);
              SecureStore.deleteItemAsync('user');
              setError(null);
              setIsLoading(false);
            })
            .catch(error => {
              console.log(error);
              setUser(null);
              SecureStore.deleteItemAsync('user');
              setError(error.response.data.message);
              setIsLoading(false);
            });
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};