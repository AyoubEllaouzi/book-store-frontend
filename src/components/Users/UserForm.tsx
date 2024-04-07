import { useState, useEffect } from "react";
import { User } from "../../models/User.ts";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser, saveUser, getUser } from "../../api/User.ts";

export default function UserForm() {
    const { id } = useParams<{ id: string }>();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const user = await getUser(id);
                    setUsername(user.username);
                    setEmail(user.email);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const user: User = {
                username,
                email
            };
            if (id) {
                const userId = parseInt(id);
                await updateUser(userId, user);
            } else {
                await saveUser(user);
            }
            navigate('/users');
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input value={username}
                           onChange={e => setUsername(e.target.value)}
                           className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" value={email}
                           onChange={e => setEmail(e.target.value)}
                           className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-success">Save</button>
            </form>
        </>
    );
}
