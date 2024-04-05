import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { searchUsers } from "../../api/User.ts";

interface User {
    id: number;
    username: string;
}

export default function UserSearch() {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState<User[]>([]); // Explicitly specify the type as User[]

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const users = await searchUsers(query);
            setSearchResults(users);
        } catch (error) {
            console.error('Error searching users:', error);
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
                        <li key={user.id}>{user.username}</li>
                    ))}
                </ul>
            )}
        </form>
    );
}
