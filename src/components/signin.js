import React, { useState } from "react";
import firebase from "firebase/compat/app";

import { Link } from "react-router-dom";
import "./signin.css";

import { OAuthProvider } from "firebase/auth";
import { database, firestore } from "./firebaseConfig";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCYvz97qtv0EEe1P8w3t7GUMI-nc6RWkBE",
//   authDomain: "graders-51b05.firebaseapp.com",
//   databaseURL: "https://graders-51b05-default-rtdb.firebaseio.com",
//   projectId: "graders-51b05",
//   storageBucket: "graders-51b05.appspot.com",
//   messagingSenderId: "551587800777",
//   appId: "1:551587800777:web:e8a30ec197ac45d3afcf18",
//   measurementId: "G-VTEJFC66EH",
// };

// // Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

const LoginForm = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(true);

  function signIn() {
    if (emailOrPhone.includes("@")) {
      signInEmailPassword(emailOrPhone, password);
    } else {
      signInWithPhone(emailOrPhone, password);
    }
  }

  function signInEmailPassword(emailOrPhone, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailOrPhone, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setMessage(`Signed in as ${user.email}`);
        toast.success(`Successful login!`);
        window.location.href = "/";
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
        toast.error(`Your email or password is incorrect. Please try again.`);
      });
  }

  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    provider.addScope("email");
    provider.setCustomParameters({
      login_hint: "user@example.com",
      prompt: "select_account",
    });

    document.getElementById("googleSignInButton").disabled = true;

    firebase.auth().useDeviceLanguage();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        console.log("user:", user);
        const email = user.email;
        console.log("Email:", email);
        setMessage(`Signed in with Google as ${user.displayName}`);
        const displayName = user.displayName.split(" ");
        setFirstName(displayName[0]);
        setLastName(displayName[1]);
        setEmail(email);

        storeUserData(user.uid, displayName[0], displayName[1], email);

        toast.success(`Successful login!`);

        document.getElementById("googleSignInButton").disabled = false;
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);

        toast.error(`Error: ${error.message}`);

        document.getElementById("googleSignInButton").disabled = false;
      });
  }

  const storeUserData = (userId, firstName, lastName, email) => {
    const userData = {
      userId: userId,
      firstName: firstName || "", // Handle undefined or null values
      lastName: lastName || "", // Handle undefined or null values
      email: email || "", // Handle undefined or null values
    };

    firebase
      .database()
      .ref("users/" + userId)
      .set(userData)
      .then(() => {
        console.log("User data stored successfully");
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error storing user data:", error);
      });
  };

  function signInWithMicrosoft() {
    const provider = new OAuthProvider("microsoft.com");

    document.getElementById("microsoftSignInButton").disabled = true;

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        const email = user.email;
        setMessage(`Signed in with microsoft as ${user.displayName}`);
        const displayName = user.displayName.split(" ");
        setFirstName(displayName[0]);
        setLastName(displayName[1]);
        setEmail(email);

        storeUserData(user.uid, displayName[0], displayName[1], email);
        console.log("Signed in with Microsoft:", user);
        document.getElementById("microsoftSignInButton").disabled = false;
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
        console.error("Microsoft sign-in error:", error);
        document.getElementById("microsoftSignInButton").disabled = false;
      });
  }

  /*
    function signInWithTwitter() {
        console.log("hi");
        var provider = new firebase.auth.TwitterAuthProvider();
        firebase.auth().useDeviceLanguage();
        
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
            /** @type {firebase.auth.OAuthCredential} 
            var credential = result.credential;

            var token = credential.accessToken;
            var secret = credential.secret;

            // The signed-in user info.
            var user = result.user;
            console.log(user);
            document.getElementById('message').innerHTML = `Signed in with Twitter as ${user.displayName}`;
            window.location.href = 'http://127.0.0.1:5500/NiceAdmin/index.html';
        
            }).catch((error) => {
            document.getElementById('message').innerHTML = `Error: ${error.message}`;
            });
    }
    


    // sign in with git hub
    function signInWithGithub() {
        var provider = new firebase.auth.GithubAuthProvider();
        provider.addScope('repo');
        provider.setCustomParameters({
            'allow_signup': 'false'
        });

        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                var user = result.user;
                document.getElementById('message').innerHTML = `Signed in with Git hub as ${user.displayName}`;
                window.location.href = 'http://127.0.0.1:5500/NiceAdmin/index.html';
            }).catch((error) => {
                document.getElementById('message').innerHTML = `Error: ${error.message}`;
            })


    }*/

  function signInWithPhone(emailOrPhone, password) {
    var appVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container"
    );
    console.log("signinwithphone  signed in");
    console.log(appVerifier);
    firebase
      .auth()
      .signInWithPhoneNumber(emailOrPhone, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the user in with the confirmation code
        var code = prompt("Enter the verification code:", "");
        console.log(code);
        return confirmationResult.confirm(code);
      })
      .then((result) => {
        // User signed in successfully
        var user = result.user;
        console.log(user);
        document.getElementById(
          "message"
        ).innerHTML = `Signed in with Phone as ${user.emailOrPhone}`;
        window.location.href = "/";
      })
      .catch((error) => {
        document.getElementById(
          "message"
        ).innerHTML = `Error: ${error.message}`;
      });
  }

  function handleLoginClick(event) {
    event.preventDefault(); // Prevent default form submission behavior
    signIn(); // Call signIn function when login button is clicked
  }

  function closeForm() {
    setIsFormOpen(false);
  }

  return (
    <div className="signin-container">
      <div className="align-content-end" id="recaptcha-container" />
      <form className="bg-light p-5 rounded">
        <p className="h4 mb-4 text-center">Sign in</p>

        <div className="form-group">
          <input
            type="text"
            className="form-control mb-4"
            id="emailOrPhone"
            placeholder="Enter email or number"
            required=""
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control mb-4"
            id="password"
            placeholder="Enter password"
            required=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button
            type="button"
            className="btn btn-success"
            onClick={handleLoginClick}
          >
            Sign In
          </button>
        </div>
        <br></br>
        <p className="text-center">-- Or with --</p>
        <div className="text-center">
          <button
            id="googleSignInButton"
            onClick={signInWithGoogle}
            className="btn btn-outline-primary btn-block me-1"
          >
            Google
          </button>
          <button
            id="microsoftSignInButton"
            onClick={signInWithMicrosoft}
            className="btn btn-outline-success btn-block ms-1"
          >
            Microsoft
          </button>
          <ToastContainer />
          {/* Add buttons for other sign-in methods */}
        </div>
        <div className="text-center1">
          Don't have an account?{" "}
          <Link to="/signup" className="text-decoration-underline text-primary">
            Sign Up
          </Link>
        </div>
        <p id="message" className="mt-3 text-center">
          {message}
        </p>
      </form>
    </div>
  );
};
export default LoginForm;
