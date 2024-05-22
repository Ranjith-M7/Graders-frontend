import React, { useEffect, useState } from "react";
import { database, firestore, storage } from "./firebaseConfig";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";

import img from "../assets/images/banner-item-01.jpg";

function MainBanner() {
  const [mainBannerData, setMainBannerData] = useState({
    mainBannerContent: [],
  });

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
            {mainBannerData.mainBannerContent.length > 0 ? (
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
                {mainBannerData.mainBannerContent.map((banner, index) => (
                  <div
                    key={index}
                    className="item"
                    style={{ backgroundImage: `url("${img}")` }}
                  >
                    <div className="header-text">
                      <span className="category">{banner.Category}</span>
                      <h2>{banner.Title}</h2>
                      <p>{banner.Description}</p>
                      <div className="buttons">
                        <div className="main-button">
                          <a href={banner.Buttons.Main_Button.Link}>
                            {banner.Buttons.Main_Button.Text}
                          </a>
                        </div>
                        <div className="icon-button">
                          <a href={banner.Buttons.Main_Button.Link}>
                            <i className="fa fa-play" />{" "}
                            {banner.Buttons.Icon_Button.Text}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* <div className="item item-2">
                  <div className="header-text">
                    <span className="category">Best Result</span>
                    <h2>Get the best result out of your effort</h2>
                    <p>
                      You are allowed to use this template for any educational
                      or commercial purpose. You are not allowed to
                      re-distribute the template ZIP file on any other website.
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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod temporious incididunt ut labore et dolore
                      magna aliqua suspendisse.
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
                </div> */}
              </OwlCarousel>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainBanner;
