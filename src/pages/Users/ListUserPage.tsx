import {useEffect, useState} from "react";
import {deleteUser, getAllUsers} from "../../api/User.ts";
import {User} from "../../models/User.ts";
import UserList from "../../components/Users/UserList.tsx";
import UserSearch from "../../components/Users/searchUser.tsx";
import HeroSection from "../../components/Users/HeroSection.tsx";

export default function ListBookPage(){
    const [users, setUsers] = useState<User[]>([]);

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
            console.error('Error deleting user:', error);
        }
    };

    return (
        <>
            <HeroSection fullName="User Page" title="Book store" />
                <div className="container position-absolute top-50 ms-5">
                    <div className="row justify-content-start">
                    <div className="mb-3"><UserSearch/></div>
                    <h2>Users List</h2>
                    <UserList users={users} handleDeleteUser={handleDeleteUser} />
                </div>
                </div>
        </>
    );
}