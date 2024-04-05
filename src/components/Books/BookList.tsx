import {Book} from "../../models/Book.ts";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";

type Props = {
    books: Book[],
    handleDeleteBook: (book: Book) => void
}

const BookList = ({ books, handleDeleteBook }: Props) => {

    return (
        <>
            <table className="table">
                <thead>
                <tr>
                    <th>id</th>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Author</th>
                    <th>update</th>
                    <th>delete</th>
                </tr>
                </thead>
                <tbody>
                {books.map( book=>
                    <tr key={book.id}>
                        <td>{book.id}</td>
                        <td>{book.title}</td>
                        <td>{book.genre}</td>
                        <td>{book.author}</td>
                        <td>
                            <Link to={`/update-book/${book.id}`} className="btn btn-outline-dark">
                                <FontAwesomeIcon icon={faPen} />
                            </Link>
                        </td>

                        <td>
                            <button onClick={() => handleDeleteBook(book)} className="btn btn-outline-danger">
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </>
    );
}
export default BookList;