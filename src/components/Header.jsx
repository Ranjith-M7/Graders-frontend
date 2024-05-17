import React from "react";

function Header() {
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
                    <h1>Graders</h1>
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
                    <li className="scroll-to-section">
                      <a href="/" className="active">
                        Home
                      </a>
                    </li>
                    <li className="scroll-to-section">
                      <a href="/about">About Us</a>
                    </li>
                    <li className="scroll-to-section">
                      <a href="/courses">Courses</a>
                    </li>
                    <li className="scroll-to-section">
                      <a href="/team">Team</a>
                    </li>
                    <li className="scroll-to-section">
                      <a href="/events">Events</a>
                    </li>
                    <li className="scroll-to-section">
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
