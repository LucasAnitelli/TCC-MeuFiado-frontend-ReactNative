import { debtorsDTO } from "./debtorsDTO";

export interface createUserDTO {
    nameEstablishment: string;
    email: string;
    password: string;
}

export interface loginUserDTO {
    email: string;
    password: string;
}

export interface ResponseDTO {
    Data: Partial<debtorsDTO>;
    Status: string;
    Message: string;
    Success: boolean;
}

export interface ResponseArrayDTO {
    Data: debtorsDTO[];
    Status: string;
    Message: string;
    Success: boolean;
    TotalPages: number;
}

export interface StorageDTO {
    nameEstablishment: string;
    email: string;
    avatar: string;
}

export interface ResponsePhotoDTO {
    avatar: string;
    id: string;
}