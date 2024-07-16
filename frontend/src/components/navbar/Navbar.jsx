import './Navbar.css';
import React from 'react'
import { FaBook } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store';


export default function Navbar() {

    const isLoggedIn = useSelector((state) => state.isLoggedIn);

    const dispatch = useDispatch()

    const logOut = () => {
        sessionStorage.clear('id');
        dispatch(authActions.logOut());
        window.location.reload();
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid">

                    <Link className="navbar-brand" to="/">
                        <b><FaBook />&nbsp;&nbsp;TODO</b>
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">
                                    Home
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="about">
                                    About Us
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/todo">
                                    Todo
                                </Link>
                            </li>
                            {!isLoggedIn ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/signup">
                                            Sign Up
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/signin">
                                            Sign In
                                        </Link>
                                    </li>

                                </>
                            ) : (<>
                                <li className="nav-item logout">
                                    <Link className="nav-link active logoutText" aria-current="page" to="#" onClick={logOut}>
                                        Log Out
                                    </Link>
                                </li>
                            </>)}



                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
