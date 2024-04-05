import { Book } from '../models/Book.ts';
import { APIProvider } from './APIProvider';

interface ResponseData {
    data: any;
}

interface ErrorResponseData {
    message: string;
}

export const saveBook = async (Book: Book): Promise<any> => {
    try {
        const response: ResponseData = await APIProvider.post('/api/books', Book);
        return response.data;
    } catch (error: any) {
        throw error.response.data as ErrorResponseData;
    }
};

export const updateBook = async (id: number, updatedReservation: Book): Promise<any> => {
    try {
        const response: ResponseData = await APIProvider.put(`/api/books/${id}`, updatedReservation);
        return response.data;
    } catch (error: any) {
        throw error.response.data as ErrorResponseData;
    }
};

export const deleteBook = async (id: number): Promise<any> => {
    try {
        const response: ResponseData = await APIProvider.delete(`/api/books/${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response.data as ErrorResponseData;
    }
};

export const getBook = async (id: number): Promise<Book> => {
    try {
        const response: ResponseData = await APIProvider.get(`/api/books/${id}`);
        return response.data as Book;
    } catch (error: any) {
        throw error.response.data as ErrorResponseData;
    }
};

export const getAllBooks = async (): Promise<Book[]> => {
    try {
        const response: ResponseData = await APIProvider.get('/api/books');
        console.log("good")
        return response.data as Book[];
    } catch (error: any) {
        throw error.response.data as ErrorResponseData;
    }
};



export const searchBooks = async (query: string): Promise<Book[]> => {
    try {
        const response: ResponseData = await APIProvider.get(`/api/books/search?query=${query}`);
        return response.data as Book[];
    } catch (error: any) {
        throw error.response.data as ErrorResponseData;
    }
};