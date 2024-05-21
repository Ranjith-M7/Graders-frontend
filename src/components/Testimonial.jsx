import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import database from "./firebaseConfig";

import testimonialImg1 from "../assets/images/testimonial-author.jpg";

function Testimonial() {
  const [testimonialData, setTestimonialData] = useState({
    title: "",
    subtitle: "",
    description: "",
    testimonialContent: [],
  });

  useEffect(() => {
    const fetchTestimonialData = async () => {
      try {
        const snapshot = await database
          .ref("Testimonial Section")
          .once("value");
        if (snapshot.exists()) {
          const data = snapshot.val();
          const { Title, Subtitle, Description, Testimonials } = data;

          // Filter out empty testimonial items
          const filteredTestimonialContent = Testimonials
            ? Testimonials.filter((item) => item.Name && item.Category)
            : [];

          setTestimonialData({
            title: Title || "",
            subtitle: Subtitle || "",
            description: Description || "",
            testimonialContent: filteredTestimonialContent || [],
          });
        } else {
          console.log("The testimonial data was not found in the database");
        }
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };

    fetchTestimonialData();
  }, []);

  const options = {
    center: true,
    items: 1,
    autoplay: true,
    loop: true,
    dots: false,
    smartSpeed: 1500,
    nav: true,
    navText: [
      `<i class="fa fa-angle-left" aria-hidden="true"></i>`,
      `<i class="fa fa-angle-right" aria-hidden="true"></i>`,
    ],
    margin: 30,
    responsive: {
      992: {
        items: 1,
      },
      1200: {
        items: 1,
      },
    },
  };

  return (
    <div className="section testimonials">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            {testimonialData.testimonialContent.length > 0 ? (
              <OwlCarousel className="owl-carousel" {...options}>
                {testimonialData.testimonialContent.map((item, index) => (
                  <div key={index} className="item">
                    <p>{item.Description}</p>
                    <div className="author">
                      <img src={testimonialImg1} alt="" />
                      <span className="category">{item.Category}</span>
                      <h4>{item.Name}</h4>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            ) : (
              ""
            )}
          </div>
          <div className="col-lg-5 align-self-center">
            <div className="section-heading">
              <h6>{testimonialData.subtitle}</h6>
              <h2>{testimonialData.title}</h2>
              <p>{testimonialData.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
