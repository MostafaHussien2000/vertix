/* Auth Functions
================= */
import { useAuth } from "../context/AuthContext";
/* React Router DOM
=================== */
import {Link, Navigate, Route, Routes} from "react-router-dom";
/* React Components
=================== */
import Feed from "./sub-pages/Feed";
import SideNav from "../components/SideNav";
import News from "./sub-pages/News";
import ArticleDetails from "./sub-pages/ArticleDetails";
/* React Hooks
============== */
import {useEffect, useState} from "react";

function FeedPage() {
    const [selectedArticle, setSelectedArticle] = useState(false)
  return (
      <div className={"main-app-page"}>
        <SideNav />
        <Routes>
          <Route path={"feed/*"} element={<Feed />} />
          <Route path={"news/"} element={<NewsView />} />
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

function NewsView () {
    const [selectedArticle, setSelectedArticle] = useState(false)

    useEffect(() => {

    }, [selectedArticle]);

    return (
        selectedArticle ? (
            <ArticleDetails selectedArticle={selectedArticle} setSelectedArticle={setSelectedArticle} />
        ) : (
            <News setSelectedArticle={setSelectedArticle} />
        )
    )
}