import React from "react";

function MediaPageSkeletonLoader () {
    return (
        <div className="skeleton">
            <div className="skeleton__header">
                <div className="skeleton__header__banner"></div>
                <div className="skeleton__header__movie">
                    <div className="skeleton__header__movie__poster"></div>
                    <div className="skeleton__header__movie__info">
                        <div className="skeleton__header__movie__info__title"></div>
                        <div className="skeleton__header__movie__info__paragraph-line"></div>
                        <div className="skeleton__header__movie__info__paragraph-line"></div>
                        <div className="skeleton__header__movie__info__paragraph-line"></div>
                        <div className="skeleton__header__movie__info__paragraph-line"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MediaPageSkeletonLoader;