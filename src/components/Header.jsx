import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { database } from "./firebaseConfig";
import $ from "jquery";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [headerClass, setHeaderClass] = useState("");
  const [headerData, setHeaderData] = useState({
    logo: "",
  });

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setIsLoggedIn(false);
        // Redirect to home page or do any necessary clean up
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const snapshot = await database.ref("Header").once("value");
        if (snapshot.exists()) {
          const data = snapshot.val();
          const { Logo } = data;
          setHeaderData({
            logo: Logo,
          });
        } else {
          console.log("The header data was not found in the database");
        }
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };
    fetchHeaderData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      if (scroll >= 10) {
        setHeaderClass("background-header header-reduced");
      } else {
        setHeaderClass("");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // jQuery code for mobile menu and window resize handling
    var width = $(window).width();
    $(window).resize(function () {
      if (width > 767 && $(window).width() < 767) {
        window.location.reload();
      } else if (width < 767 && $(window).width() > 767) {
        window.location.reload();
      }
    });

    // Menu Dropdown Toggle
    if ($(".menu-trigger").length) {
      $(".menu-trigger").on("click", function () {
        $(this).toggleClass("active");
        $(".header-area .nav").slideToggle(200);
      });
    }

    const dropdownOpener = $(".main-nav ul.nav .has-sub > a");

    // Open/Close Submenus
    if (dropdownOpener.length) {
      dropdownOpener.each(function () {
        var _this = $(this);

        _this.on("tap click", function (e) {
          var thisItemParent = _this.parent("li"),
            thisItemParentSiblingsWithDrop =
              thisItemParent.siblings(".has-sub");

          if (thisItemParent.hasClass("has-sub")) {
            var submenu = thisItemParent.find("> ul.sub-menu");

            if (submenu.is(":visible")) {
              submenu.slideUp(450, "easeInOutQuad");
              thisItemParent.removeClass("is-open-sub");
            } else {
              thisItemParent.addClass("is-open-sub");

              if (thisItemParentSiblingsWithDrop.length === 0) {
                thisItemParent
                  .find(".sub-menu")
                  .slideUp(400, "easeInOutQuad", function () {
                    submenu.slideDown(250, "easeInOutQuad");
                  });
              } else {
                thisItemParent
                  .siblings()
                  .removeClass("is-open-sub")
                  .find(".sub-menu")
                  .slideUp(250, "easeInOutQuad", function () {
                    submenu.slideDown(250, "easeInOutQuad");
                  });
              }
            }
          }

          e.preventDefault();
        });
      });
    }
  }, []);

  return (
    <>
      {/* ***** Header Area Start ***** */}
      <header className={`header-area header-sticky ${headerClass}`}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                {/* ***** Logo Start ***** */}
                <a href="index.html" className="logo">
                  <h1>{headerData.logo.Text}</h1>
                </a>
                {/* ***** Logo End ***** */}
                {/* ***** Search Start ***** */}
                <div className="search-input">
                  <form id="search" action="#">
                    <input
                      type="text"
                      placeholder="Type Something"
                      id="searchText"
                      name="searchKeyword"
                    />
                    <i className="fa fa-search" />
                  </form>
                </div>
                {/* ***** Search End ***** */}
                {/* ***** Menu Start ***** */}
                <ul className="nav">
                  <li>
                    <a href="/" className="">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/about">About Us</a>
                  </li>
                  <li>
                    <a href="/courses">Courses</a>
                  </li>
                  <li>
                    <a href="/team">Team</a>
                  </li>
                  <li>
                    <a href="/events">Events</a>
                  </li>
                  <li>
                    <a href="/contact">Register Now!</a>
                  </li>
                  <li>
                    {/* Sign In Button */}
                    <NavLink
                      to="/signin"
                      style={{ display: isLoggedIn ? "none" : "block" }}
                    >
                      Sign In
                    </NavLink>
                    {/* User login */}
                    {isLoggedIn && (
                      <div className="dropdown">
                        {/* Dropdown Button */}
                        <button
                          className="btn py-2 px-4 ms-3 dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <FontAwesomeIcon
                            icon={faUser}
                            aria-hidden="true"
                            style={{
                              marginRight: "10px",
                              cursor: "pointer",
                              color: "white",
                            }}
                          />
                          {/* Replace this with actual user name */}
                        </button>
                        {/* Dropdown Menu */}
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <li>
                            <NavLink to="/profile" className="dropdown-item">
                              Profile
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/seo-settings"
                              className="dropdown-item"
                            >
                              SEO Settings
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/adminpage" className="dropdown-item">
                              Admin Page
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="home"
                              className="dropdown-item"
                              onClick={handleLogout}
                            >
                              Sign out
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    )}
                    {/* User login */}
                  </li>
                </ul>
                <a className="menu-trigger">
                  <span>Menu</span>
                </a>

                {/* ***** Menu End ***** */}
              </nav>
            </div>
          </div>
        </div>
      </header>
      {/* ***** Header Area End ***** */}
    </>
  );
}

export default Header;
