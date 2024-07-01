/* Slick Slider
=============== */
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* API
====== */
import {getImagesURL} from "../api/api";

/* Icons
======== */
import {TbPlus} from "react-icons/tb";

/* React Router DOM
=================== */
import {Link} from "react-router-dom";
import {useEffect} from "react";

function Carousel ({items = [], mediaType}) {
    let settings = {
        dots: true,
        infinite: true,
        autoplaySpeed: 10,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        appendDots: dots => <ul>{dots}</ul>
    };
    useEffect(() => {
    }, [items]);
    return (
        <div className={"carousel"}>
            <Slider {...settings}>
                {
                    items.map((item, index) => (
                        <CarouselSlide mediaType={mediaType} key={index} item={item} />
                    ))
                }
            </Slider>
        </div>
    )
}

export default Carousel;

function CarouselSlide ({item, mediaType}) {
    return (
        <div className="carousel__slide">
            <img
                className="carousel__slide__banner"
                src={`${getImagesURL("original")}/${item.backdrop_path}`}
                alt={`${item.original_title || item.name} banner`}
            />
            <div className="carousel__slide__info">
                <h3>{item.original_title || item.name}</h3>
                <div className="carousel__slide__actions">
                    <Link to={`/${mediaType}/${item.id}`} className="carousel__slide__actions__details">
                        View Details
                    </Link>
                    <button className="carousel__slide__actions__list">
                        <TbPlus/>
                    </button>
                </div>
            </div>
        </div>
    )
}