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
        <div><h1>News Bar</h1></div>
      </div>
  );
}

export default FeedPage;