/* React Components
=================== */
import Loader from "./Loader";

function Skeleton({type}) {
    switch (type) {
        case "mediaCard":
            return <MediaCard />;
        case "featuredMedia":
            return <FeaturedMedia />;
        case "episodeCard":
            return <EpisodeCard />;
        case "moviePage":
            return <MovieDetailsPage />;
        case "seriesPage":
            return;
        case "newsCard":
            return <ArticlePlaceholder />;
        case "featuredArticle":
            return <FeaturedArticle />;
        default:
            return <Loader />;
    }
}

export default Skeleton;

function MediaCard () {
    return (
        <div className="skeleton media-card">
            <div className="media-card__poster"></div>
            <div className="media-card__title"></div>
        </div>
    );
}
function FeaturedMedia () {
    return <div className="skeleton featured-media"><div className="featured-media__banner"></div></div>
}
function EpisodeCard () {
    return (
        <div className="sekelton episode-card">
            <div className="episode-card__banner"></div>
            <div className="episode-card__title"></div>
        </div>
    )
}
function MovieDetailsPage () {
    return (
        <div className="skeleton movie-details">
            <div className="movie-details__header">
                <div className="movie-details__header__banner"></div>
                <div className="movie-details__header__movie">
                    <div className="movie-details__header__movie__poster"></div>
                    <div className="movie-details__header__movie__info">
                        <div className="movie-details__header__movie__info__title"></div>
                        <div className="movie-details__header__movie__info__paragraph-line"></div>
                        <div className="movie-details__header__movie__info__paragraph-line"></div>
                        <div className="movie-details__header__movie__info__paragraph-line"></div>
                        <div className="movie-details__header__movie__info__paragraph-line"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
function ArticlePlaceholder () {
    return (
        <div className="skeleton article-placeholder">
            <div className="article-placeholder__banner"></div>
            <div className="article-placeholder__line"></div>
        </div>
    )
}
function FeaturedArticle () {
    return (
        <div className="skeleton featured-article">
            <div className="featured-article__banner"></div>
            <div className="featured-article__text">
                <div className="featured-article__text__heading"></div>
                <div className="featured-article__text__p"></div>
                <div className="featured-article__text__p"></div>
                <div className="featured-article__text__p"></div>
            </div>
        </div>
    )
}

