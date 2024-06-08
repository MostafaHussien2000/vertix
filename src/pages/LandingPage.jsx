import logo from "../static/logo.png"
import banner from "../static/home-page-banner.png"

import {Link} from "react-router-dom";

import {TbPlus, TbShieldLock} from "react-icons/tb";
import { HiOutlineArrowNarrowRight, HiOutlineViewGridAdd } from "react-icons/hi";
import { HiCubeTransparent   } from "react-icons/hi2";

function LandingPage() {

    return (
        <main className="landing-page">
            <nav className="landing-page__nav">
                <div className="landing-page__nav__logo">
                    <img src={logo} alt={"Vertix logo"} />
                </div>
                <div className="landing-page__nav__actions">
                    <Link onClick={() => console.log("link clicked")} to={"/login"} className="landing-page__nav__actions__login">Login</Link>
                </div>
            </nav>
            <header className="landing-page__header">
                <img className="landing-page__header__banner" src={banner} alt={"home page banner"} />
                <div className="landing-page__header__text">
                    <p>Your place to organize what you wanna see most.</p>
                </div>
                <div className="landing-page__header__actions">
                    <button className="landing-page__header__actions__add">
                       <TbPlus /> Start a new list
                    </button>
                </div>
                <p className={"landing-page__header__learn-more"} onClick={() => {
                    console.log("clicked")
                    const scrollY = window.innerHeight
                    window.scroll({
                        top: window.innerHeight + 10,
                        left: 0,
                        behavior: "smooth"
                    })
                }}>Learn More <HiOutlineArrowNarrowRight /></p>
            </header>
            <section className={"landing-page__why-us"}>
                <div className={"landing-page__why-us__container"}>
                    <div className={"landing-page__why-us__text"}>
                        <h1>Why choose <br/><span>Vertix</span> ?</h1>
                        <p>
                            Vertix offers a comprehensive and user-friendly platform for movie enthusiasts to manage and
                            enjoy their movie collections. With secure storage, seamless integration, and a host of
                            personalized features, Vertix is the ultimate tool for keeping track of your cinematic
                            adventures.
                        </p>
                    </div>
                    <div className={"landing-page__why-us__features"}>
                        <div className={"landing-page__why-us__features__box"}>
                            <HiOutlineViewGridAdd />
                            <h4>Personalized<br/>experience</h4>
                        </div>
                        <div className={"landing-page__why-us__features__box"}>
                            <TbShieldLock />
                            <h4>Secure sessions<br />& data</h4>
                        </div>
                        <div className={"landing-page__why-us__features__box"}>
                            <HiCubeTransparent  />
                            <h4>Seamless movies<br/>feed</h4>
                        </div>
                        <div className={"landing-page__why-us__features__box action"}>
                            <h4>Start Now</h4>
                        </div>
                    </div>
                </div>
            </section>
            <footer className={"landing-page__footer"}>
                    Some Text Here
            </footer>
        </main>
    )
}

export default LandingPage;
