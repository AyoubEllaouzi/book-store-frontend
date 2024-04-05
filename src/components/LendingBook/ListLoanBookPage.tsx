import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { User } from "../../models/User.ts";
import { Book } from "../../models/Book.ts";
import {LoanBook} from "../../models/LoanBook.ts";

interface Props {
    loanBook: LoanBook[];
    users: User[];
    books: Book[];
    handleDeleteLoanBook: (loanBook: LoanBook) => void;
}

const LoanBookList = ({ loanBook, handleDeleteLoanBook }: Props) => {

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
                    <th>Add Review</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {loanBook.map(loanBook => (
                    <tr key={loanBook.id}>
                        <td>{loanBook.id}</td>
                        <td>{loanBook.book.title}</td>
                        <td>{loanBook.user.username}</td>
                        <td>{loanBook.rating}</td>
                        <td>{loanBook.review}</td>
                        <td>
                            <Link to={`/update-loan-book/${loanBook.id}`} className="btn btn-outline-dark">
                                <FontAwesomeIcon icon={faPen} />
                            </Link>
                        </td>
                        <td>
                            <button onClick={() => handleDeleteLoanBook(loanBook)} className="btn btn-outline-danger">
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
