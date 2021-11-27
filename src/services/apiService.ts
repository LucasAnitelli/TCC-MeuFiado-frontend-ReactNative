import AsyncStorage from "@react-native-community/async-storage";
import { debtorsDTO } from "dto/debtorsDTO";
import { createUserDTO, loginUserDTO } from "dto/login";

const baseUrl = process.env.BASE_URL;

const headerFormData = async (method?: string, data?: FormData) => {
  const storagToken = await AsyncStorage.getItem('@MeuFiado:token');
  return {
    method: `${method}`,
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + storagToken,
      'Content-Type': 'multipart/form-data',
    },
    body: data,
  }
}

const header = async (method?: string) => {
  const storagToken = await AsyncStorage.getItem('@MeuFiado:token');
  return {
    method: `${method}`,
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + storagToken,
    },
  };
}

const headerBody = async (method: string, data: Partial<debtorsDTO>) => {
  const storagToken = await AsyncStorage.getItem('@MeuFiado:token');
  return {
    method: `${method}`,
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + storagToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
}

const headerNoToken = async (method: string, data: Partial<debtorsDTO>) => {
  return {
    method: `${method}`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
}

export const postLoginAuth = async (data: loginUserDTO) => {
  try {
    const result = await fetch(`${baseUrl}sessions/login`, await headerNoToken('POST', data));
    return await result.json();
  } catch (error) {
    return null;
  }
}

export const postCreateUser = async (data: createUserDTO) => {
  try {
    const result = await fetch(`${baseUrl}users/create`, await headerNoToken('POST', data));
    return await result.json();
  } catch (error) {
    return null;
  }
}

export const getPaginationDebtors = async (page: number, perPage: number) => {
  try {
    const result = await fetch(`${baseUrl}debtors/pagination?page=${page}&perPage=${perPage}`, await header('GET'));
    return await result.json();
  } catch (error) {
    return null;
  }
}

export const deleteDebtor = async (id: string) => {
  try {
    const result = await fetch(`${baseUrl}debtors/${id}`, await header('DELETE'));
    return await result.json();
  } catch (error) {
    return null;
  }
}

export const addDebtor = async (data: debtorsDTO) => {
  try {
    const result = await fetch(`${baseUrl}debtors/create`, await headerBody('POST', data));
    return await result.json();
  } catch (error) {
    return null;
  }
}

export const editDebtor = async (id: string, data: debtorsDTO) => {
  try {
    const result = await fetch(`${baseUrl}debtors/${id}`, await headerBody('PUT', data));
    return await result.json();
  } catch (error) {
    return null;
  }
}

export const getSearchDebtor = async (name: string) => {
  try {
    const result = await fetch(`${baseUrl}debtors/listen?filter=${name}`, await header('GET'));
    if (result)
      return await result.json();
  } catch (error) {
    return null;
  }
}

export const patchSavePhoto = async (data: FormData) => {
  try {
    const result = await fetch(`${baseUrl}sessions/avatar`, await headerFormData('PATCH', data));
    if (result)
      return await result.json();
  } catch (error) {
    ;
    return null;
  }
}
