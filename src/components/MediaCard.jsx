import {getImagesURL} from "../api/api";
import {Link} from "react-router-dom";
import React from "react";
import {TbStarFilled} from "react-icons/tb";

function MediaCard({mediaType, movie, reset}) {
    const resetMovie = () => {
        if (reset) {
            reset.movie({})
            reset.loading(true)
            reset.error("")
            reset.backdrop(true)
            window.scroll({top: 0, left:0, behavior:"smooth"})
        }
    }

    if (!movie.id) return

    return (
        <li className={"movie-card"}>
            <Link onClick={resetMovie} to={`/${mediaType}/${movie.id}`} title={movie?.title} className={"movie-card__poster"}>
                <img
                    className={"movie-card__poster__img"}
                    alt={`${movie?.original_title || movie?.name} poster`}
                    src={`${getImagesURL()}/${movie?.poster_path}`}
                />
            </Link>
            <Link title={movie?.title} onClick={resetMovie} to={`/${mediaType}/${movie.id}`} className="movie-card__name">
                {movie?.title || movie?.name}
            </Link>
            <p className="movie-card__rate">
                <TbStarFilled/>
                <span>{movie?.vote_average?.toFixed(1)}</span>
            </p>
        </li>
    )
}

export default MediaCard