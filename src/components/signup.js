import React, { useState } from "react";
import firebase from "firebase/compat/app";
import { Link } from "react-router-dom";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
import "./signin.css";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const submitSignUpForm = () => {
    signUpEmailPassword(email, password);
  };

  const signUpEmailPassword = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setMessage(`Signed up as ${user.email}`);

        storeUserData(user.uid, firstName, lastName, email);
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
      });
  };

  const storeUserData = (userId, firstName, lastName, email) => {
    firebase
      .database()
      .ref("users/" + userId)
      .set({
        firstName: firstName,
        lastName: lastName,
        email: email,
      })
      .then(() => {
        console.log("User data stored successfully");
        window.location.href = "/signin";
      })
      .catch((error) => {
        console.error("Error storing user data:", error);
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="align-content-center">
        <form className="bg-light p-5 rounded">
          <p className="h4 mb-4 text-center">Sign Up</p>
          <div className="form-group">
            <input
              type="text"
              className="form-control mb-4"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control mb-4"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control mb-4"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control mb-4"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              type="button"
              className="btn btn-primary"
              onClick={submitSignUpForm}
            >
              Submit
            </button>
          </div>
          <p id="message" className="mt-3 text-center">
            {message}
          </p>
          <p className="mt-3 text-center">
            Already have an account? <Link to="/signin">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
