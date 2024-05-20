import { Link } from "react-router-dom";
import logo from "../static/logo.png";

/* Icons
======== */
import { HiOutlineKey, HiOutlineMail } from "react-icons/hi";

function LoginPage() {
  return (
    <main className="login-page">
      <center className="login-page__container">
        <header className="login-page__header">
          <img src={logo} alt="Vertix logo" />
          <h1>
            Hello Again, from <span>Vertix</span>
          </h1>
        </header>
        <form className="login-page__form form" action="">
          <h4>Login</h4>
          <div className="form__input">
            <input
              className="form__input__box"
              type="email"
              name="email"
              id="email"
              placeholder=""
              autoComplete="off"
            />
            <label className="form__input__label" htmlFor="email">
              Email
            </label>
            <HiOutlineMail />
          </div>
          <div className="form__input">
            <input
              className="form__input__box"
              type="password"
              name="password"
              id="password"
              placeholder=""
              autoComplete="off"
            />
            <label className="form__input__label" htmlFor="password">
              Password
            </label>
            <HiOutlineKey />
          </div>
          <button className="form__submit" type="button">
            Login
          </button>
        </form>
        <p className="login-page__link">
          <span>You don't have an account ?</span> <Link>Create new one.</Link>
        </p>
      </center>
    </main>
  );
}

export default LoginPage;
