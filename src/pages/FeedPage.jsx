import React, { useEffect, useState } from "react";

import logo from "../static/logo.png";
import {
  getImagesURL,
  nowPlayingMoviesURL, onTheAirSeriesURL,
  popularMoviesURL, popularSeriesURL, topRatedMoviesURL, topRatedSeriesURL,
} from "../api/api";
import {
  TbHome,
  TbLogout,
  TbPlus,
  TbSettings2,
  TbStarFilled,
  TbVideo,
} from "react-icons/tb";
import Loader from "../components/loaders/Loader";
import { useAuth } from "../context/AuthContext";
import {Link, Navigate, Route, Routes} from "react-router-dom";
import MediaCard from "../components/MediaCard";
import {getListsItems} from "../api/fetchData";
import ErrorMessage from "../components/ErrorMessage";
import {FiSearch} from "react-icons/fi";
import Modal from "../components/Modal";
import Search from "../components/Search";
import Feed from "./sub-pages/Feed";
import SideNav from "../components/SideNav";

function FeedPage() {
  return (
      <div className={"main-app-page"}>
        <SideNav />
        <Routes>
          <Route path={"feed/*"} element={<Feed />} />
          <Route path={"watchlist"} element={<h1>Watchlist</h1>} />
          <Route path={""} element={<Navigate to={"feed"} replace/>} />
        </Routes>
         <SideContent />
      </div>
  );
}

export default FeedPage;

function SideContent () {
    const {currentUser} = useAuth();

    return (
        <aside className={"main-app-page__side-content"}>
            <div className="main-app-page__side-content__profile">
                <div className="main-app-page__side-content__profile__info">
                    <div className="main-app-page__side-content__profile__info__image">
                        <img src={currentUser.photoURL} alt=""/>
                    </div>
                    <div className="main-app-page__side-content__profile__info__data">
                        <h4>{currentUser.fullName}</h4>
                        <p>{currentUser.email}</p>
                    </div>
                </div>
                <div className="main-app-page__side-content__profile__action">
                    <Link to={"/me"}>View profile.</Link>
                </div>
            </div>
        </aside>
    )
}