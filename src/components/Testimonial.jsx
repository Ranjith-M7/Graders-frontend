import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";

import testimonialImg1 from "../assets/images/testimonial-author.jpg";

function Testimonial() {
  return (
    <div className="section testimonials">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <OwlCarousel
              className="owl-carousel owl-testimonials"
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
              margin={30}
              responsive={{
                992: {
                  items: 1,
                },
                1200: {
                  items: 1,
                },
              }}
            >
              <div className="item">
                <p>
                  “Please tell your friends or collegues about TemplateMo
                  website. Anyone can access the website to download free
                  templates. Thank you for visiting.”
                </p>
                <div className="author">
                  <img src={testimonialImg1} alt="" />
                  <span className="category">Full Stack Master</span>
                  <h4>Claude David</h4>
                </div>
              </div>
              <div className="item">
                <p>
                  “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis ipsum suspendisse ultrices gravid.”
                </p>
                <div className="author">
                  <img src={testimonialImg1} alt="" />
                  <span className="category">UI Expert</span>
                  <h4>Thomas Jefferson</h4>
                </div>
              </div>
              <div className="item">
                <p>
                  “Scholar is free website template provided by TemplateMo for
                  educational related websites. This CSS layout is based on
                  Bootstrap v5.3.0 framework.”
                </p>
                <div className="author">
                  <img src={testimonialImg1} alt="" />
                  <span className="category">Digital Animator</span>
                  <h4>Stella Blair</h4>
                </div>
              </div>
            </OwlCarousel>
          </div>
          <div className="col-lg-5 align-self-center">
            <div className="section-heading">
              <h6>TESTIMONIALS</h6>
              <h2>What they say about us?</h2>
              <p>
                You can search free CSS templates on Google using different
                keywords such as templatemo portfolio, templatemo gallery,
                templatemo blue color, etc.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
