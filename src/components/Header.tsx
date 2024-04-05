import {Link} from "react-router-dom";


export default function Header(){
    return        <nav className="navbar navbar-expand-lg fixed-top" >
        <div className="container">
            <Link className="navbar-brand" to={"/users"}>
                <img
                    id="MDB-logo"
                    src="../../public/images/logo_norsys.jpg"
                    alt="MDB Logo"
                    draggable="false"
                    height="50"
                />
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-3">
                    <li className="nav-item me-3">
                        <Link className="nav-link d-flex align-items-center" to={"/users"}>
                            Users
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link d-flex align-items-center me-3" to={"/books"}>
                            <i className="fas fa-bookmark pe-2"></i> Add book
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link d-flex align-items-center me-3" to={"/loan"}>
                            <i className="fas fa-bookmark pe-2"></i> book Review
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
}