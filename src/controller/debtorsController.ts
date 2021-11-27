
import { debtorsDTO } from "dto/debtorsDTO";
import { ResponseArrayDTO, ResponseDTO } from "dto/login";
import { addDebtor, deleteDebtor, editDebtor, getPaginationDebtors, getSearchDebtor } from "../services/apiService";



export const getPaginationDebtorsController = async (page: number, perPage: number) => {
  try {
    const response = await getPaginationDebtors(page, perPage);
    if (response) {
      const result: ResponseArrayDTO = response;
      return result;
    }
  } catch (error) {
    return null;
  }
}

export const deleteDebtorController = async (id: string) => {
  try {
    const response = await deleteDebtor(id);
    if (response) {
      const result: ResponseDTO = response;
      return result;
    }
  } catch (error) {
    return null;
  }
}

export const addDebtorController = async (data: debtorsDTO) => {
  try {
    const response = await addDebtor(data);
    if (response) {
      const result: ResponseDTO = response;
      return result;
    }
  } catch (error) {
    return null;
  }
}

export const editDebtorController = async (id: string, data: debtorsDTO) => {
  try {
    const response = await editDebtor(id, data);
    const result: ResponseDTO = response;
    return result;
  } catch (error) {
    return null;
  }
}
export const getSearchDebtorController = async (name: string) => {
  try {
    const response = await getSearchDebtor(name);
    const result: ResponseArrayDTO = response;
    return result;
  } catch (error) {
    return null;
  }
}

