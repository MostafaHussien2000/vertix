import {Link, useNavigate} from "react-router-dom";
import logo from "../static/logo.png";

import {useEffect, useRef, useState} from "react";

/* Firebase
=========== */
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import {useAuth} from "../context/AuthContext"

/* Icons
======== */
import { HiOutlineUser, HiOutlineKey, HiOutlineMail } from "react-icons/hi";
import { BsCheck2All } from "react-icons/bs";
import RequestLoader from "../components/RequestLoader";

function SignUpPage() {

  const [logError, setLogError] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const {signup, currentUser, setCurrentUser} = useAuth()

  useEffect(() => {
    if (currentUser) navigate("/feed")
  }, [currentUser])


  const handleCreateUserAccount = async (e) => {
    e.preventDefault();
    const userData = {
      fullName: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
      confirmPassword: e.target[3].value,
    };
    if (userData.password !== userData.confirmPassword) return setLogError("Passwords does not match!");

    try {
      setLoading(true)
      setLogError("")
      await signup(userData.fullName, userData.email, userData.password, "")
      navigate("/feed");
    } catch(err) {
      setLoading(false)
      console.error(err)
      setLogError("Failed to create your account. Try submitting the form again!")
    }

    setLoading(false)

  };

  const [checkers, setCheckers] = useState({
    capital: false,
    small: false,
    length: 0,
    special: false,
    digit: 0,
  });

  // TODO: Complete the password checking functionality
  const handlePasswordChecker = (e) => {
    const password = e.target.value || "";
    setCheckers((old) => ({ ...old, length: password.length }));
    const capital = new RegExp(/[A-Z]/);
    const small = new RegExp(/[a-z]/);
    const digit = new RegExp(/[0-9]/);
    const special = new RegExp(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/);

    let i = 0;

    while (i < password.length) {
      if (capital.test(i)) setCheckers((old) => ({ ...old, capital: true }));
      else if (small.test(i)) setCheckers((old) => ({ ...old, small: true }));
      else if (digit.test(i)) setCheckers((old) => ({ ...old, digit: true }));
      else if (special.test(i))
        setCheckers((old) => ({ ...old, special: true }));

      i++;
    }

    console.clear();
    console.table(checkers);
  };
  return (
    <main className="sign-up-page">
      <center className="sign-up-page__container">
        <header className="sign-up-page__header">
          <img src={logo} alt="Vertix logo" />
          <h1>
            Welcome to <span>Vertix</span>
          </h1>
        </header>
        <form
          onSubmit={handleCreateUserAccount}
          className="sign-up-page__form form"
          action=""
        >
          <h4>Create you new account</h4>
          <div className="form__input">
            <input
              className="form__input__box"
              type="text"
              name="fullName"
              id="fullName"
              placeholder=""
              autoComplete="off"
              required
            />
            <label className="form__input__label" htmlFor="fullName">
              Full Name
            </label>
            <HiOutlineUser />
          </div>
          <div className="form__input">
            <input
              className="form__input__box"
              type="email"
              name="email"
              id="email"
              placeholder=""
              autoComplete="off"
              required
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
              required
              // onChange={handlePasswordChecker}
            />
            <label className="form__input__label" htmlFor="password">
              Password
            </label>
            <HiOutlineKey />
            <PasswordChecker checkers={checkers} />
          </div>
          <div className="form__input">
            <input
              className="form__input__box"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder=""
              autoComplete="off"
              required
            />
            <label className="form__input__label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <HiOutlineKey />
          </div>
          {logError && <p className={"error-msg"}>{logError}</p>}
          <button className={`form__submit ${loading?"requesting" : ""}`} type="submit">
            {loading ? <RequestLoader /> : <></>}
            {loading ? "Creating" : "Create"} Account
          </button>
        </form>
        <p className="sign-up-page__link">
          <span>Already have an account ?</span>{" "}
          <Link to={"/login"}>Login.</Link>
        </p>
      </center>
    </main>
  );
}

export default SignUpPage;

function PasswordChecker({ checkers }) {
  return (
    <div className="password-checkers">
      <div className="text">
        <h4>Your password must contain at least :</h4>
        <ul>
          <li className={checkers.capital ? "satisfied" : ""}>
            <BsCheck2All /> One uppercase letter.
          </li>
          <li className={checkers.small ? "satisfied" : ""}>
            <BsCheck2All /> One lowercase letter.
          </li>
          <li className={checkers.special ? "satisfied" : ""}>
            <BsCheck2All /> One special character.
          </li>
          <li className={checkers.length >= 8 ? "satisfied" : ""}>
            <BsCheck2All /> 8 characters at least.
          </li>
        </ul>
      </div>
      <div className="shape">
        <span className="hide left"></span>
        <span className="hide right"></span>
      </div>
    </div>
  );
}
