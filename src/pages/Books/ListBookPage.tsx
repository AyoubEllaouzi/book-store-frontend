import {Book} from "../../models/Book.ts";
import {deleteBook, getAllBooks} from "../../api/Book.ts";
import BookList from "../../components/Books/BookList.tsx";
import BookSearch from "../../components/Books/searchBook.tsx";
import {useEffect, useState} from "react";
import HeroSection from "../../components/Books/HeroSection.tsx";

export default function ListBookPage(){
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const booksData = await getAllBooks();
                setBooks(booksData);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        fetchBooks();
    }, []);

    const handleDeleteBook = async (book: Book) => {
        if (book.id === undefined) {
            console.error('Error: Book ID is undefined.');
            return;
        }

        try {
            await deleteBook(book.id);
            setBooks(prevBooks => prevBooks.filter(b => b.id !== book.id));
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <>
            <HeroSection fullName="Book Page" title="Book store" />
            <div className="container position-absolute top-50 ms-5">
                <div className="row justify-content-start">
                    <div className="mb-3"><BookSearch/></div>
                    <h2>Books List</h2>
                    <BookList books={books} handleDeleteBook={handleDeleteBook} />
                </div>
            </div>
        </>
    );
}