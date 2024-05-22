import React, { useEffect, useState } from "react";

import { database, firestore, storage } from "./firebaseConfig";

function Header() {
  const [headerData, setHeaderData] = useState({
    logo: "",
  });

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

  return (
    <>
      {/* ***** Header Area Start ***** */}
      <header className="header-area header-sticky">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                {/* ***** Logo Start ***** */}
                <a href="index.html" className="logo">
                  <h1>{headerData.logo.Text}</h1>
                </a>
                {/* ***** Logo End ***** */}
                {/* ***** Serach Start ***** */}
                <div className="search-input">
                  <form id="search" action="#">
                    <input
                      type="text"
                      placeholder="Type Something"
                      id="searchText"
                      name="searchKeyword"
                      // onkeypress="handle"
                    />
                    <i className="fa fa-search" />
                  </form>
                </div>
                {/* ***** Serach End ***** */}
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
