import { User } from '../models/User.ts';
import { APIProvider } from './APIProvider';

interface ResponseData {
    data: any;
}

interface ErrorResponseData {
    message: string;
}

export const saveUser = async (User: User): Promise<any> => {
    try {
        const response: ResponseData = await APIProvider.post('/api/users', User);
        return response.data;
    } catch (error: any) {
        throw error.response.data as ErrorResponseData;
    }
};

export const updateUser = async (id: number, updatedReservation: User): Promise<any> => {
    try {
        const response: ResponseData = await APIProvider.put(`/api/users/${id}`, updatedReservation);
        return response.data;
    } catch (error: any) {
        throw error.response.data as ErrorResponseData;
    }
};

export const deleteUser = async (id: number): Promise<any> => {
    try {
        const response: ResponseData = await APIProvider.delete(`/api/users/${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response.data as ErrorResponseData;
    }
};

export const getUser = async (id: number): Promise<User> => {
    try {
        const response: ResponseData = await APIProvider.get(`/api/users/${id}`);
        return response.data as User;
    } catch (error: any) {
        throw error.response.data as ErrorResponseData;
    }
};

export const getAllUsers = async (): Promise<User[]> => {
    try {
        const response: ResponseData = await APIProvider.get('/api/users');
        console.log("good")
        return response.data as User[];
    } catch (error: any) {
        throw error.response.data as ErrorResponseData;
    }
};



export const searchUsers = async (query: string): Promise<User[]> => {
    try {
        const response: ResponseData = await APIProvider.get(`/api/users/search?query=${query}`);
        return response.data as User[];
    } catch (error: any) {
        throw error.response.data as ErrorResponseData;
    }
};