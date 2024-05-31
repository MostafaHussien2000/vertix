import React, { useEffect, useState } from "react";

import logo from "../static/logo.png";
import { useFetch } from "../hooks/useFetch";
import { popularMoviesURL } from "../api/api";

function FeedPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(popularMoviesURL())
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        throw new Error(err);
        setLoading(false);
        setError(true);
      });
  }, []);

  const userDate = {
    userName: "John Doe",
    email: "john@mail.com",
    profilePic:
      "https://th.bing.com/th/id/OIP.4A2g1d0ruPQwtDlpBl5OuQHaHZ?rs=1&pid=ImgDetMain",
  };
  return (
    <main className="feed-page">
      <aside className="feed-page__side-nav">
        <img src={logo} alt="vertix logo" />
        <div className="feed-page__side-nav__menu">
          <h3>Menu</h3>
          <ul>
            <li>
              // icon
              <span>Home</span>
            </li>
            <li>
              // icon
              <span>Coming Soon</span>
            </li>
          </ul>
        </div>
        <div className="feed-page__side-nav__options">
          <ul>
            <li>
              // icon
              <span>Settings</span>
            </li>
            <li>
              // icon
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </aside>
      <hr />
      <section className="feed-page__main-content">
        <div className="feed-page__main-content__featured">
          {movies ? (
            <ul>
              {movies.map((movie) => (
                <li key={movie.id}>{movie.original_title}</li>
              ))}
            </ul>
          ) : (
            <p>No data found</p>
          )}
        </div>
      </section>
      <aside className="feed-page__side-content"></aside>
    </main>
  );
}

export default FeedPage;
