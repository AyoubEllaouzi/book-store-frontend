import { useEffect, useState } from "react";
import {getAllUsers } from "../../api/User.ts";
import { User } from "../../models/User.ts";
import { LoanBook } from "../../models/LoanBook.ts";
import {Book} from "../../models/Book.ts";
import {getAllBooks} from "../../api/Book.ts";
import {deleteLoanBook, getAllLoanBooks} from "../../api/LoanBook.ts";
import HeroSection from "../../components/LoanBook/HeroSection.tsx";
import LoanBookList from "../../components/LoanBook/ListLoanBookPage.tsx";

export default function ListLoanBookPage() {
    const [loanBooks, setLoanBooks] = useState<LoanBook[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const lendingBooksData = await getAllLoanBooks();
                setLoanBooks(lendingBooksData);
                const usersData = await getAllUsers();
                const booksData = await getAllBooks();
                setUsers(usersData);
                setBooks(booksData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteLoanBook = async (loanBook: LoanBook) => {
        // Your delete logic here
        if (loanBook.id === undefined) {
            console.error('Error: loan Book ID is undefined.');
            return;
        }

        try {
            await deleteLoanBook(loanBook.id);
            setLoanBooks(prevLoanBooks => prevLoanBooks.filter(b => b.id !== loanBook.id));
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <>
            <HeroSection fullName="Loan page" title="Book store" />
            <div className="container position-absolute top-50 ms-5">
                <div className="row justify-content-start">
                    <h2>Loan Book</h2>
                    <LoanBookList loanBooks={loanBooks} handleDeleteLoanBook={handleDeleteLoanBook} />
                </div>
            </div>
        </>
    );
}
