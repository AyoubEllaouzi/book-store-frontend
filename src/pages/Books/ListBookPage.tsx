import {Book} from "../../models/Book.ts";
import {deleteBook, getAllBooks, searchBooks} from "../../api/Book.ts";
import BookList from "../../components/Books/BookList.tsx";
import BookSearch from "../../components/Books/BookSearch.tsx";
import {useEffect, useState} from "react";
import BookSection from "../../components/Books/BookSection.tsx";

export default function ListBookPage(){
    const [books, setBooks] = useState<Book[]>([]);
    const [searchResults, setSearchResults] = useState<Book[]>([]);

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
    const handleSearchUsers = async (query: string) => {
        try {
            if (query.trim() !== '') {
                const searchResultsData: Book[] = await searchBooks(query);
                setSearchResults(searchResultsData);
                if (searchResultsData.length==0){
                    alert("book not found");
                }
            } else {
                setSearchResults([]);
            }

        } catch (error) {
            console.error('Error searching books:', error);
        }
    };
    return (
        <>
            <BookSection fullName="Book Page" title="Book store" />
            <div className="container position-absolute top-50 ms-5">
                <div className="row justify-content-start">
                    <div className="mb-3">
                        <BookSearch onSearch={handleSearchUsers}/>
                    </div>
                    <h2>Books List</h2>
                    <BookList
                        books={searchResults.length > 0
                            ? searchResults
                            : books}
                        handleDeleteBook={handleDeleteBook}
                    />
                </div>
            </div>
        </>
    );
}