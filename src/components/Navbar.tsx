import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Kompany</Link>
            </div>
        </nav>
    );
}

export default Navbar;
