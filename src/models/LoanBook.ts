import {Book} from "./Book.ts";
import {User} from "./User.ts";

export interface LoanBook {
    id?: number;
    book: Book;
    user: User;
    rating:number;
    review:string;
    read:boolean;
}

