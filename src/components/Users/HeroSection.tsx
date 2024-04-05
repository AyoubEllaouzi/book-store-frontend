import '../../assets/css/hero-section.css'
import {Link} from "react-router-dom";
import UserSearch from "./searchUser.tsx";
interface HeroSectionProps {
    fullName: string;
    title: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ fullName, title }) => {
    return (
        <div className="hero-section">
            <div className="d-flex justify-content-center align-items-center h-100">
                <div className="text-white text-center">
                    <h1 className="mb-3">Welcome to {fullName}</h1>
                    <h4 className="mb-3">{title}</h4>
                    <Link className="btn btn-outline-light btn-lg ms-2" to={"/users"} role="button">Users</Link>
                    <Link className="btn btn-outline-light btn-lg ms-2" to={"/add-user"} role="button">Add user</Link>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;

