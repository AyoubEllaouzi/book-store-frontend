import { useEffect, useState } from "react";
import {getAllUsers } from "../../api/User.ts";
import { User } from "../../models/User.ts";
import { LoanBook } from "../../models/LoanBook.ts";
import {Book} from "../../models/Book.ts";
import {getAllBooks} from "../../api/Book.ts";
import {deleteLoanBook, getUserBooks} from "../../api/LoanBook.ts";
import LoanBookSection from "../../components/LoanBook/LoanBookSection.tsx";
import LoanBookList from "../../components/LoanBook/LoanBookList.tsx";
import { useNavigate, useParams } from "react-router-dom";

export default function ListLoanBookPage() {
    const { id } = useParams<{ id: string }>();
    const [loanBooks, setLoanBooks] = useState<LoanBook[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [books, setBooks] = useState<Book[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const loanBooksData = await getUserBooks(Number(id));
                    setLoanBooks(loanBooksData);
                    const usersData = await getAllUsers();
                    const booksData = await getAllBooks();
                    setUsers(usersData);
                    setBooks(booksData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteLoanBook = async (loanBook: LoanBook) => {
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
            <LoanBookSection fullName="Loan page" title="Book store" />
            <div className="container position-absolute top-50 ms-5">
                <div className="row justify-content-start">
                    <h2>Loan Book</h2>
                    <LoanBookList loanBooks={loanBooks} handleDeleteLoanBook={handleDeleteLoanBook} />
                </div>
            </div>
        </>
    );
}
