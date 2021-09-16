import { createUserDTO, loginUserDTO, ResponseDTO, ResponsePhotoDTO } from "dto/login";
import { patchSavePhoto, postCreateUser, postLoginAuth } from "../services/apiService";


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


export const patchSavePhotoController = async (data: FormData) => {
    try {
        const response = await patchSavePhoto(data);
        if (response) {
            const result: ResponsePhotoDTO = response;
            return result;
        }
    } catch (error) {
        console.log('error', error);
        return null;
    }
}