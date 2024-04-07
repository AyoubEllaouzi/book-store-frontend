import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { User } from "../../models/User.ts";
import { Book } from "../../models/Book.ts";
import { LoanBook } from "../../models/LoanBook.ts";

interface Props {
    loanBooks: LoanBook[];
    users: User[];
    books: Book[];
    handleDeleteLoanBook: (loanBook: LoanBook) => void;
}

const LoanBookList = ({ loanBooks, handleDeleteLoanBook }: Props) => {
    return (
        <>
            <table className="table">
                <thead>
                <tr>
                    <th>id</th>
                    <th>Book Title</th>
                    <th>User</th>
                    <th>Rating</th>
                    <th>Review</th>
                    <th>Read</th>
                    <th>Add Review</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {loanBooks.map(loanBook => (
                    <tr key={loanBook.id}>
                        <td>{loanBook.id}</td>
                        <td>{loanBook.book.title}</td>
                        <td>{loanBook.user.username}</td>
                        <td>{loanBook.rating}</td>
                        <td>{loanBook.review}</td>
                        <td>
                            {loanBook.read ? (
                                <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
                            ) : (
                                <FontAwesomeIcon icon={faTimes} style={{ color: "red" }} />
                            )}
                        </td>
                        <td>
                            <Link
                                to={`/update-loan-book/${loanBook.id}`}
                                className="btn btn-outline-dark"
                            >
                                <FontAwesomeIcon icon={faPen} />
                            </Link>
                        </td>
                        <td>
                            <button
                                onClick={() => handleDeleteLoanBook(loanBook)}
                                className="btn btn-outline-danger"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default LoanBookList;
