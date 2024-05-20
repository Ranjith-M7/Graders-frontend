import React from "react";
import memberImg1 from "../assets/images/member-01.jpg";
import memberImg2 from "../assets/images/member-02.jpg";
import memberImg3 from "../assets/images/member-03.jpg";
import memberImg4 from "../assets/images/member-04.jpg";

function Team() {
  return (
    <div className="team section" id="team">
      <div className="container">
        <div className="row pt-5">
          <div className="col-lg-3 col-md-6">
            <div className="team-member">
              <div className="main-content">
                <img src={memberImg1} alt="" />
                <span className="category">UX Teacher</span>
                <h4>Sophia Rose</h4>
                <ul className="social-icons">
                  <li>
                    <a href="#">
                      <i className="fab fa-facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-linkedin" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="team-member">
              <div className="main-content">
                <img src={memberImg2} alt="" />
                <span className="category">Graphic Teacher</span>
                <h4>Cindy Walker</h4>
                <ul className="social-icons">
                  <li>
                    <a href="#">
                      <i className="fab fa-facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-linkedin" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="team-member">
              <div className="main-content">
                <img src={memberImg3} alt="" />
                <span className="category">Full Stack Master</span>
                <h4>David Hutson</h4>
                <ul className="social-icons">
                  <li>
                    <a href="#">
                      <i className="fab fa-facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-linkedin" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="team-member">
              <div className="main-content">
                <img src={memberImg4} alt="" />
                <span className="category">Digital Animator</span>
                <h4>Stella Blair</h4>
                <ul className="social-icons">
                  <li>
                    <a href="#">
                      <i className="fab fa-facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-linkedin" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
