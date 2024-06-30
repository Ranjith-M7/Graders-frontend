import React, { useEffect, useState } from "react";
import { database } from "./firebaseConfig";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";

import tempImg1 from "../assets/images/banner-item-03.jpg";
import tempImg2 from "../assets/images/banner-item-02.jpg";
import tempImg3 from "../assets/images/banner-item-01.jpg";

function MainBanner() {
  const [mainBannerData, setMainBannerData] = useState({
    mainBannerContent: [],
  });

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchMainBannerData = async () => {
      try {
        const snapshot = await database.ref("Main Banner").once("value");
        if (snapshot.exists()) {
          const data = snapshot.val();

          // Convert the object data into an array
          const bannerArray = Object.values(data);

          // Filter out empty banner items
          const filteredBannerArray = bannerArray
            ? bannerArray.filter((item) => item.Title && item.Category)
            : [];
          setMainBannerData({
            mainBannerContent: filteredBannerArray || [],
          });
        } else {
          console.log("The banner data was not found in the database");
        }
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };

    fetchMainBannerData();
  }, []);

  return (
    <div className="main-banner" id="top">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <OwlCarousel
              className="owl-carousel owl-theme"
              center={true}
              items="1"
              autoplay={true}
              loop
              dots={true}
              nav={false}
              smartSpeed="1500"
              responsive={{
                992: {
                  items: 1,
                },
                1200: {
                  items: 1,
                },
              }}
            >
              {/* Item 1 */}

              <div
                className="item d-flex justify-content-between align-content-center mx-5"
                style={{ backgroundImage: "white" }}
              >
                {/* Card 1 */}
                <div
                  className="card p-2"
                  style={{
                    width: "18rem",
                    backgroundColor: "rgb(215, 255, 253",

                    color: "black",
                  }}
                >
                  <img
                    className="card-img-top"
                    src={tempImg1}
                    alt="Card image cap"
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">Full Stack Courses</h5>
                    <p className="card-text  text-black w-100">
                      Full Stack Developers earn an average salary of $112,000
                      per year, significantly higher than many other tech roles.
                      (Source: Indeed)
                    </p>
                    {/* <a href="#" className="secondary-button">
                      Go somewhere
                    </a> */}
                  </div>
                </div>
                {/* Card 2 */}
                <div
                  className="card p-2"
                  style={{
                    width: "18rem",
                    backgroundColor: "rgb(215, 255, 253",

                    color: "black",
                  }}
                >
                  <img
                    className="card-img-top"
                    src={tempImg2}
                    alt="Card image cap"
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">Expert Workshops</h5>
                    <p className="card-text  text-black w-100">
                      Attendees of our Expert Workshops report a 40% increase in
                      their technical skills proficiency
                    </p>
                    {/* <a href="#" className="secondary-button">
                      Go somewhere
                    </a> */}
                  </div>
                </div>
                {/* Card 3 */}
                <div
                  className="card p-2"
                  style={{
                    width: "18rem",
                    backgroundColor: "rgb(215, 255, 253",

                    color: "black",
                  }}
                >
                  <img
                    className="card-img-top"
                    src={tempImg3}
                    alt="Card image cap"
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">Career Sessions</h5>
                    <p className="card-text  text-black w-100">
                      Students who attend our Career Sessions see a 50% higher
                      interview success rate.
                    </p>
                    {/* <a href="#" className="secondary-button">
                      Go somewhere
                    </a> */}
                  </div>
                </div>
              </div>

              {/* Item 2 */}

              <div
                className="item d-flex justify-content-between align-content-center mx-5"
                style={{ backgroundImage: "white" }}
              >
                {/* Card 1 */}
                <div
                  className="card p-2"
                  style={{
                    width: "18rem",
                    backgroundColor: "rgb(215, 255, 253",

                    color: "black",
                  }}
                >
                  <img
                    className="card-img-top"
                    src={tempImg1}
                    alt="Card image cap"
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">Full Stack Courses</h5>
                    <p className="card-text  text-black w-100 mb-3">
                      95% of our Full Stack graduates secure a job within six
                      months of completing the course
                    </p>
                    {/* <a href="#" className="secondary-button">
                      Go somewhere
                    </a> */}
                  </div>
                </div>

                {/* Card 2 */}
                <div
                  className="card p-2"
                  style={{
                    width: "18rem",
                    backgroundColor: "rgb(215, 255, 253",

                    color: "black",
                  }}
                >
                  <img
                    className="card-img-top"
                    src={tempImg2}
                    alt="Card image cap"
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">Expert Workshops</h5>
                    <p className="card-text  text-black w-100 mb-3">
                      80% of participants feel more confident in applying their
                      knowledge in real-world scenarios after attending our
                      workshops.
                    </p>
                    {/* <a href="#" className="secondary-button">
                      Go somewhere
                    </a> */}
                  </div>
                </div>

                {/* Card 3 */}
                <div
                  className="card p-2"
                  style={{
                    width: "18rem",
                    backgroundColor: "rgb(215, 255, 253",

                    color: "black",
                  }}
                >
                  <img
                    className="card-img-top"
                    src={tempImg3}
                    alt="Card image cap"
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">Career Sessions</h5>
                    <p className="card-text  text-black w-100 mb-3">
                      70% of our attendees receive job offers within three
                      months of participating in our Career Sessions.
                    </p>
                    {/* <a href="#" className="secondary-button">
                      Go somewhere
                    </a> */}
                  </div>
                </div>
              </div>

              {/* Item 3 */}

              <div
                className="item d-flex justify-content-between align-content-center mx-5"
                style={{ backgroundImage: "white" }}
              >
                {/* Card 1 */}
                <div
                  className="card p-2"
                  style={{
                    width: "18rem",
                    backgroundColor: "rgb(215, 255, 253",

                    color: "black",
                  }}
                >
                  <img
                    className="card-img-top"
                    src={tempImg1}
                    alt="Card image cap"
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">Full Stack Courses</h5>
                    <p className="card-text  text-black w-100 mb-3">
                      The demand for Full Stack Developers has increased by 30%
                      year over year" (Source: LinkedIn)
                    </p>
                    {/* <a href="#" className="secondary-button">
                      Go somewhere
                    </a> */}
                  </div>
                </div>

                {/* Card 2 */}
                <div
                  className="card p-2"
                  style={{
                    width: "18rem",
                    backgroundColor: "rgb(215, 255, 253",

                    color: "black",
                  }}
                >
                  <img
                    className="card-img-top"
                    src={tempImg2}
                    alt="Card image cap"
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">Expert Workshops</h5>
                    <p className="card-text  text-black w-100 mb-3">
                      90% of students believe that industry expert insights
                      significantly impact their learning and career growth.
                    </p>
                    {/* <a href="#" className="secondary-button">
                      Go somewhere
                    </a> */}
                  </div>
                </div>

                {/* Card 3 */}
                <div
                  className="card p-2"
                  style={{
                    width: "18rem",
                    backgroundColor: "rgb(215, 255, 253",

                    color: "black",
                  }}
                >
                  <img
                    className="card-img-top"
                    src={tempImg3}
                    alt="Card image cap"
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">Career Sessions</h5>
                    <p className="card-text  text-black w-100 mb-3">
                      Over 85% of students find the personalized advice from our
                      Career Sessions crucial for their job search strategy
                    </p>
                    {/* <a href="#" className="secondary-button">
                      Go somewhere
                    </a> */}
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
