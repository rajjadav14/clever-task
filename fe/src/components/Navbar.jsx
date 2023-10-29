import { Link, useNavigate } from 'react-router-dom';
import React from 'react'
import { Logout_API } from '../utils/constants';

function Navbar() {
    const navigator = useNavigate();
    const handleLogout = async () => {
        localStorage.removeItem('token');
        await fetch(Logout_API)
        navigator('/login');
    }
    return (
        <nav className="navbar bg-primary navbar-expand-lg ">
            <div className="container-fluid">
                <a className="display-1 navbar-brand" href="/">Map Me</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mx-4 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/createMarker">Add new Marker</Link>
                        </li>
                    </ul>
                    <form class="form-inline mx-4 my-2 my-lg-0">
                        <a className="nav-link " onClick={handleLogout} href="/">Logout</a>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar