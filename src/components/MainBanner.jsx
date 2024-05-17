import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";

function MainBanner() {
  return (
    <div className="main-banner" id="top">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <OwlCarousel
              className="owl-carousel owl-banner"
              center={true}
              items="1"
              autoplay={true}
              loop
              dots={false}
              smartSpeed="1500"
              nav={true}
              navText={[
                `<i class="fa fa-angle-left" aria-hidden="true"></i>`,
                `<i class="fa fa-angle-right" aria-hidden="true"></i>`,
              ]}
              responsive={{
                992: {
                  items: 1,
                },
                1200: {
                  items: 1,
                },
              }}
            >
              <div className="item item-1">
                <div className="header-text">
                  <span className="category">Our Courses</span>
                  <h2>With Scholar Teachers, Everything Is Easier</h2>
                  <p>
                    Scholar is free CSS template designed by TemplateMo for
                    online educational related websites. This layout is based on
                    the famous Bootstrap v5.3.0 framework.
                  </p>
                  <div className="buttons">
                    <div className="main-button">
                      <a href="#">Request Demo</a>
                    </div>
                    <div className="icon-button">
                      <a href="#">
                        <i className="fa fa-play" /> What's Scholar?
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item item-2">
                <div className="header-text">
                  <span className="category">Best Result</span>
                  <h2>Get the best result out of your effort</h2>
                  <p>
                    You are allowed to use this template for any educational or
                    commercial purpose. You are not allowed to re-distribute the
                    template ZIP file on any other website.
                  </p>
                  <div className="buttons">
                    <div className="main-button">
                      <a href="#">Request Demo</a>
                    </div>
                    <div className="icon-button">
                      <a href="#">
                        <i className="fa fa-play" /> What's the best result?
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item item-3">
                <div className="header-text">
                  <span className="category">Online Learning</span>
                  <h2>Online Learning helps you save the time</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod temporious incididunt ut labore et dolore magna
                    aliqua suspendisse.
                  </p>
                  <div className="buttons">
                    <div className="main-button">
                      <a href="#">Request Demo</a>
                    </div>
                    <div className="icon-button">
                      <a href="#">
                        <i className="fa fa-play" /> What's Online Course?
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </OwlCarousel>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainBanner;
