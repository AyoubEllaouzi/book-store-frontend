import {useEffect, useState} from "react";
import {deleteUser, getAllUsers, searchUsers} from "../../api/User.ts";
import {User} from "../../models/User.ts";
import UserList from "../../components/Users/UserList.tsx";
import UserSearch from "../../components/Users/UserSearch.tsx";
import UserSection from "../../components/Users/UserSection.tsx";

export default function ListUserPage(){
    const [users, setUsers] = useState<User[]>([]);
    const [searchResults, setSearchResults] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getAllUsers();
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleDeleteUser = async (user: User) => {
        if (user.id === undefined) {
            console.error('Error: User ID is undefined.');
            return;
        }

        try {
            await deleteUser(user.id);
            setUsers(prevUsers => prevUsers.filter(u => u.id !== user.id));
        } catch (error) {
            alert("your library is not empty")
            console.error('Error deleting user:', error);
        }
    };
    const handleSearchUsers = async (query: string) => {
        try {
            if (query.trim() !== '') {
                const searchResultsData: User[] = await searchUsers(query);
                setSearchResults(searchResultsData);
                if (searchResultsData.length==0){
                    alert("user not found");
                }
            } else {
                setSearchResults([]);
            }

        } catch (error) {
            console.error('Error searching users:', error);
        }
    };
    return (
        <>
            <UserSection fullName="User Page" title="Book store" />
            <div className="container position-absolute top-50 ms-5">
                <div className="row justify-content-start">
                    <div className="mb-3">
                        <UserSearch onSearch={handleSearchUsers}/>
                    </div>
                    <h2>Users List</h2>
                    <UserList
                        users={searchResults.length > 0
                            ? searchResults
                            : users}
                        handleDeleteUser={handleDeleteUser}
                    />
                </div>
            </div>
        </>
    );
}