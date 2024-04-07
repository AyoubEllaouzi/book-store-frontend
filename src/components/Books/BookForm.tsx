import { useState, useEffect } from "react";
import { Book } from "../../models/Book.ts";
import { useNavigate, useParams } from "react-router-dom";
import {getBook, saveBook, updateBook} from "../../api/Book.ts";

export default function BookForm() {
    const { id } = useParams<{ id: string }>();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const book = await getBook(id);
                    setTitle(book.title);
                    setGenre(book.genre);
                    setAuthor(book.author);
                }
            } catch (error) {
                console.error('Error fetching book:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const book: Book = {
                title,
                genre,
                author
            };
            if (id) {
                const bookId = parseInt(id);
                await updateBook(bookId, book);
            } else {
                await saveBook(book);
            }
            navigate('/books');
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Genre</label>
                    <input
                        type="text"
                        value={genre}
                        onChange={e => setGenre(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input
                        type="text"
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-success">Save</button>
            </form>
        </>
    );
}
