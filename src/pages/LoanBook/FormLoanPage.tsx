import {useEffect, useState} from "react";
import {LoanBook} from "../../models/LoanBook.ts";
import {User} from "../../models/User.ts";
import {Book} from "../../models/Book.ts";
import {getAllUsers} from "../../api/User.ts";
import {getAllBooks} from "../../api/Book.ts";
import HeroSection from "../../components/LendingBook/HeroSection.tsx";
import LoanBookForm from "../../components/LendingBook/LoanBookForm.tsx";
import {getAllLoanBooks} from "../../api/LoanBook.ts";
export default function FormLoanBookPage(){
    const [LoanBooks, setLoanBooks] = useState<LoanBook[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const loanBooksData = await getAllLoanBooks();
                setLoanBooks(loanBooksData);
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
    return (
        <>
            <HeroSection fullName="Loan Page" title="Book store" />
            <div className="container position-absolute top-50 ms-5">
                <div className="row justify-content-start">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <h2>Add Loan Book</h2>
                                    <LoanBookForm LoanBooks={LoanBooks} users={users} books={books} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}