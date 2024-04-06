import { useState, useEffect } from "react";
import { User } from "../../models/User.ts";
import { Book } from "../../models/Book.ts";
import { useNavigate, useParams } from "react-router-dom";
import {LoanBook} from "../../models/LoanBook.ts";
import {getLoanBook, saveLoanBook, updateLoanBook} from "../../api/LoanBook.ts";

interface LoanBookFormProps {
    loanBooks: LoanBook[];
    users: User[];
    books: Book[];
}

export default function LoanBookForm({ loanBooks, users, books }: LoanBookFormProps) {
    const { id } = useParams<{ id: string }>();
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [rating, setRating] = useState<number>(0);
    const [review, setReview] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const loanBook = await getLoanBook(parseInt(id));
                    setSelectedBook(loanBook.book);
                    setSelectedUser(loanBook.user);
                    setRating(loanBook.rating);
                    setReview(loanBook.review);
                }
            } catch (error) {
                console.error('Error fetching loanBook:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleUserSelect = (user: User) => {
        setSelectedUser(user);
    };

    const handleBookSelect = (book: Book) => {
        setSelectedBook(book);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const loanBookData = {
                id: id ? parseInt(id) : undefined,
                book: selectedBook,
                user: selectedUser,
                rating,
                review,
            };
            if (id) {
                await updateLoanBook(parseInt(id), loanBookData);
            } else {
                await saveLoanBook(loanBookData);
            }
            navigate('/loan');
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="p-3 border rounded">
                <div className="mb-3">
                    <label className="form-label">Select User:</label>
                    <select className="form-select" onChange={(e) => handleUserSelect(users.find(user => user.id === parseInt(e.target.value)) || null)}>
                        <option value="">Select User</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.username}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Select Book:</label>
                    <select className="form-select" onChange={(e) => handleBookSelect(books.find(book => book.id === parseInt(e.target.value)) || null)}>
                        <option value="">Select Book</option>
                        {books.map(book => (
                            <option key={book.id} value={book.id}>{book.title}</option>
                        ))}
                    </select>
                </div>
                {id && (
                    <>
                        <div className="mb-3">
                            <label className="form-label">Rating</label>
                            <input type="number" value={rating} onChange={e => setRating(parseInt(e.target.value))} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Review</label>
                            <textarea value={review} onChange={e => setReview(e.target.value)} className="form-control" />
                        </div>
                    </>
                )}
                <button type="submit" className="btn btn-success">Save</button>
            </form>


        </>
    );
}
