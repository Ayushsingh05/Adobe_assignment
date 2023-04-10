import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { appContext } from './../../Context/AppContext';
import {HiBars3} from 'react-icons/hi2'
import {FaTimes} from 'react-icons/fa'
function Navbar() {
    const [click, setClick] = useState(false);

    const {loggedIn} = useContext(appContext)

    const handleClick = () => setClick(!click);
    return (
        <>
            <nav className="b">
                <div className="nav-container">
                    <NavLink
                          exact to="/"
                        className="nav-logo">
                        CoolBuzz
                        <i className="fas fa-code"></i>
                    </NavLink>

                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <NavLink
                                exact to="/"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/analytics"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Analytics
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/post"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Create Post
                            </NavLink>
                        </li>
                        {loggedIn ?<li>
                            <img  className="navbar_image" src={loggedIn.profile_pic}/>
                        </li> : null}
                        {loggedIn ?<li className="nav-item">
                            <NavLink
                                exact
                                to="/profile"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Profile
                            </NavLink>
                        </li> : null}
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/login"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                {loggedIn?"Logout":"Login"}
                            </NavLink>
                        </li>
                    </ul>
                    <div className="nav-icon" onClick={handleClick}>
                        {click ? <FaTimes/> : <HiBars3/>}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;