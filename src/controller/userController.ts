import { createUserDTO, loginUserDTO, ResponseDTO } from "dto/login";
import { postCreateUser, postLoginAuth } from "../services/apiService";


export const postLoginAuthController = async (data: loginUserDTO) => {
    try {
        const response = await postLoginAuth(data);
        if (response) {
            const result: ResponseDTO = response;
            return result;
        }
    } catch (error) {
        console.log('error', error);
        return null;
    }
}

export const postCreateUserController = async (data: createUserDTO) => {
    try {
        const response = await postCreateUser(data);
        if (response) {
            const result: ResponseDTO = response;
            return result;
        }
    } catch (error) {
        console.log('error', error);
        return null;
    }
}