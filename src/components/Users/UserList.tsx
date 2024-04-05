import {User} from "../../models/User.ts";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";

type Props = {
    users: User[],
    handleDeleteUser: (user: User) => void
}

const UserList = ({ users, handleDeleteUser }: Props) => {

    return (
        <>
            <table className="table">
                <thead>
                <tr>
                    <th>id</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>update</th>
                    <th>delete</th>
                </tr>
                </thead>
                <tbody>
                {users.map( user=>
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                            <Link to={`/update-user/${user.id}`} className="btn btn-outline-dark">
                                <FontAwesomeIcon icon={faPen} />
                            </Link>
                        </td>

                        <td>
                            <button onClick={() => handleDeleteUser(user)} className="btn btn-outline-danger">
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
export default UserList;