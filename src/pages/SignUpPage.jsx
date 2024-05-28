import { Link } from "react-router-dom";
import logo from "../static/logo.png";

import { useState } from "react";

/* Firebase
=========== */
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";

/* Icons
======== */
import { HiOutlineUser, HiOutlineKey, HiOutlineMail } from "react-icons/hi";
import { BsCheck2All } from "react-icons/bs";

function SignUpPage() {
  const handleCreateUserAccount = (e) => {
    e.preventDefault();
    const userData = {
      fullName: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
      confirmPassword: e.target[3].value,
    };

    if (userData.password === userData.confirmPassword)
      createUserWithEmailAndPassword(auth, userData.email, userData.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
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
          <button className="form__submit" type="submit">
            Create Account
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
