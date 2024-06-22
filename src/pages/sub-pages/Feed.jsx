/* React Router
=============== */
import {Routes, Route, Navigate, NavLink} from "react-router-dom";
/* React Components
=================== */
import MoviesFeed from "./MoviesFeed";
import TVShowsFeed from "./TVShowsFeed";
import {FiSearch} from "react-icons/fi";
import Modal from "../../components/Modal";
import Search from "../../components/Search";
/* React Hooks
============== */
import React, {useEffect, useState} from "react";
/* React Icons
============== */


function Feed () {
    const pageWidth = window.innerWidth;

    // Search Modal
    const [modal, viewModal] = useState(false);

    return (
        <main style={{width: `${pageWidth - 550}px`}} className={"feed"}>
            {
                modal ? <Modal view={viewModal}><Search /></Modal> : <></>
            }
            <header>
                <nav className={"feed__navigation"}>
                    <NavLink
                        to={"movies"}
                        className={({isActive}) => (isActive ? 'active' : '')}
                    >
                        Movies
                    </NavLink>
                    <NavLink
                        to={"tv"}
                        className={({isActive}) => (isActive ? 'active' : '')}
                    >
                        TV Shows
                    </NavLink>
                </nav>
                <div className={"feed__search"}>
                    <FiSearch onClick={() => viewModal(true)}/>
                </div>
            </header>
            <Routes>
                <Route path={""} element={<Navigate to={"movies"} replace/>}/>
                <Route path={"movies"} element={<MoviesFeed/>}/>
                <Route path={"tv"} element={<TVShowsFeed/>}/>
            </Routes>
        </main>
    )
}

export default Feed;