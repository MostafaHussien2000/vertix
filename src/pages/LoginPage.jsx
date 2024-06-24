import {Link, useNavigate} from "react-router-dom";
import logo from "../static/logo.png";

/* Icons
======== */
import { HiOutlineKey, HiOutlineMail } from "react-icons/hi";
import {useAuth} from "../context/AuthContext";
import {useEffect, useState} from "react";
import RequestLoader from "../components/RequestLoader";

function LoginPage() {
  const {login, currentUser} = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) navigate("/app/feed");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault()

    setError("")
    setLoading(true)
    const logData = {
      email: e.target[0].value,
      password: e.target[1].value
    }

    try {
      await login(logData.email, logData.password);
      setError("");
      navigate("/app/feed");
    } catch(err) {
      console.error(err)
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="login-page">
      <center className="login-page__container">
        <header className="login-page__header">
          <img src={logo} alt="Vertix logo" />
          <h1>
            Hello Again, from <span>Vertix</span>
          </h1>
        </header>
        <form onSubmit={handleLogin} className="login-page__form form">
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
          {error && <p className={"error-msg"}>{error}</p>}
          <button className={`form__submit ${loading?"requesting" : ""}`} type="submit">
            {loading ? <RequestLoader /> : <></>}
            {loading ? "Logging you in" : "Login"}
          </button>
        </form>
        <p className="login-page__link">
          <span>You don't have an account ?</span>{" "}
          <Link to={"/signup"}>Create new one.</Link>
        </p>
      </center>
    </main>
  );
}

export default LoginPage;
