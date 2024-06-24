/* React Hooks
============== */
import React, {useState} from "react";
/* Auth Functions
================= */
import {useAuth} from "../context/AuthContext";
/* React Router
=============== */
import {Link, NavLink} from "react-router-dom";
/* React Icons
============== */
import {TbLogout, TbSettings2, TbVideo} from "react-icons/tb";
import {HiOutlineViewGridAdd} from "react-icons/hi";
import {LuNewspaper} from "react-icons/lu";
/* Static Images
================ */
import logo from "../static/logo.png";



function SideNav () {
    // Auth
    const [logoutError, setLogoutError] = useState("");
    const {currentUser} = useAuth();
    const {logout} = useAuth();
    const handleLogout = async () => {
        setLogoutError("")
        try {
            await logout()
        } catch(err) {
            setLogoutError("Something wrong happened!")
        }
    }
    return (
        <aside className="side-nav">
            <div className="side-nav__app-logo">
                <img src={logo} alt="vertix logo" />
            </div>
            <div className="side-nav__menu">
                <h3>Menu</h3>
                <ul>
                    <li>
                        <NavLink
                            className={({ isActive }) => (isActive ? 'active' : '')}
                            to={"/app/feed"}
                        >
                            <HiOutlineViewGridAdd />
                            <span>Feed</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => (isActive ? 'active' : '')}
                            to={"/app/news"}
                        >
                            <LuNewspaper />
                            <span>News</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="side-nav__options">
                <ul>
                    <li>
                        <TbSettings2 />
                        <span>Settings</span>
                    </li>
                    <li onClick={handleLogout}>
                        <TbLogout />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default SideNav;