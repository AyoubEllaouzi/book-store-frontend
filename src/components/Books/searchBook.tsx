import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {searchBooks} from "../../api/Book.ts";

interface Book {
    id: number;
    title: string;
}

export default function BookSearch() {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Book[]>([]); // Explicitly specify the type as Book[]

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent form submission
        try {
            const books = await searchBooks(query);
            setSearchResults(books);
        } catch (error) {
            console.error('Error searching books:', error);
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button className="btn btn-success" type="submit">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {searchResults.length > 0 && (
                <ul>
                    {searchResults.map(user => (
                        <li key={user.id}>{user.title}</li>
                    ))}
                </ul>
            )}
        </form>
    );
}
