/* React Hooks
============== */
import React, {useState, useEffect} from "react";
/* React Router DOM
=================== */
import {Link} from "react-router-dom";
/* React Icons
============== */
import {TbArrowNarrowLeft, TbDotsVertical, TbEdit, TbLogout} from "react-icons/tb";
import {useAuth} from "../context/AuthContext";

function ProfilePage () {
    const {currentUser} = useAuth()

    const [menu, showMenu] = useState(false)
    window.addEventListener("click", () => showMenu(false))
    return (
        <main className="profile-page">
            <div className="profile-page__container">
                <Link to={"/app/feed/"} className={"profile-page__go-back"}>
                    <div className={"profile-page__go-back__icon"}><TbArrowNarrowLeft /></div>
                    <p className={"profile-page__go-back__text"}>Back to the app.</p>
                </Link>
                <header className="profile-page__header">
                    <div className="profile-page__header__cover"></div>
                    <div className="profile-page__header__info">
                        <div className="profile-page__header__info__data">
                            <img src={currentUser?.photoURL} alt={`${currentUser?.fullName} profile picture.`} />
                            <h1>{currentUser?.fullName}</h1>
                            <p>{currentUser?.email}</p>
                        </div>
                        <div onClick={(e) => e.stopPropagation()} className="profile-page__header__info__action">
                            <button onClick={() => showMenu(state => !state)}>
                                <TbDotsVertical />
                            </button>
                            <ul className={`profile-page__header__info__action__menu ${menu ? "" : "hidden"}`}>
                                <li>
                                    <TbEdit/>
                                    <span>Edit Profile.</span>
                                </li>
                                <hr/>
                                <li className={"danger"}>
                                    <TbLogout/>
                                    <span>Logout.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>
            </div>
        </main>
    )
}

export default ProfilePage;