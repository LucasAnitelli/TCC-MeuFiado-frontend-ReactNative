import AsyncStorage from '@react-native-community/async-storage';
import { loginUserDTO, StorageDTO } from 'dto/login';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { postLoginAuthController } from '../controller/userController';
import { AuthContextData, User } from './types';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStorageData();
  }, []);

  const loadStorageData = async () => {
    try {
      setUser(null);
      setLoading(true);
      const storag = await AsyncStorage.getItem('@MeuFiado:user');
      const storagToken = await AsyncStorage.getItem('@MeuFiado:token');
      const storageUser = JSON.parse(storag) as StorageDTO;
      setLoading(!!storageUser);
      if (storageUser && storagToken) {
        setUser({ email: storageUser.email, nameEstablishment: storageUser.nameEstablishment });
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  };

  const signIn = async (username: string, password: string) => {
    const bodyData: loginUserDTO = {
      email: username,
      password: password,
    }
    const response = await postLoginAuthController(bodyData);

    if (response.Success) {
      setLoading(false);
      setUser({ email: username, nameEstablishment: response.Data.nameEstablishment });
      const user = { email: username, nameEstablishment: response.Data.nameEstablishment }
      AsyncStorage.setItem('@MeuFiado:token', response.Data.token);
      AsyncStorage.setItem('@MeuFiado:user', JSON.stringify({ ...user }));
    } else {
      Alert.alert('Erro', response.Message, [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ]);
    }
    setLoading(false);
  };

  const signOut = () => {
    setUser(null);
    AsyncStorage.removeItem('@MeuFiado:user');
    AsyncStorage.removeItem('@MeuFiado:token');
    return;
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
}