import { LoanBook } from '../models/LoanBook.ts';
import { APIProvider } from './APIProvider';

interface ResponseData {
    data: any;
}

interface ErrorResponseData {
    message: string;
}

export const saveLoanBook = async (LendingBook: LoanBook): Promise<any> => {
    try {
        const response: ResponseData = await APIProvider.post('/api/reviews', LendingBook);
        return response.data;
    } catch (error: any) {
        throw error.response.data as ErrorResponseData;
    }
};

export const updateLoanBook = async (id: number, updatedReservation: LoanBook): Promise<any> => {
    try {
        const response: ResponseData = await APIProvider.put(`/api/reviews/${id}`, updatedReservation);
        return response.data;
    } catch (error: any) {
        throw error.response.data as ErrorResponseData;
    }
};

export const deleteLoanBook = async (id: number): Promise<any> => {
    try {
        const response: ResponseData = await APIProvider.delete(`/api/reviews/${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response.data as ErrorResponseData;
    }
};

export const getLoanBook = async (id: number): Promise<LoanBook> => {
    try {
        const response: ResponseData = await APIProvider.get(`/api/reviews/${id}`);
        return response.data as LoanBook;
    } catch (error: any) {
        throw error.response.data as ErrorResponseData;
    }
};

export const getAllLoanBooks = async (): Promise<LoanBook[]> => {
    try {
        const response: ResponseData = await APIProvider.get('/api/reviews');
        console.log("good")
        return response.data as LoanBook[];
    } catch (error: any) {
        throw error.response.data as ErrorResponseData;
    }
};



export const searchLoanBooks = async (query: string): Promise<LoanBook[]> => {
    try {
        const response: ResponseData = await APIProvider.get(`/api/reviews/search?query=${query}`);
        return response.data as LoanBook[];
    } catch (error: any) {
        throw error.response.data as ErrorResponseData;
    }
};