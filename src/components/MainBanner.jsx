import React, { useEffect, useState } from "react";
import { database, firestore, storage } from "./firebaseConfig";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";

function MainBanner() {
  const [mainBannerData, setMainBannerData] = useState({
    mainBannerContent: [],
  });
  const [imageUrls, setImageUrls] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Fetch images from storage
  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const storageRef = storage.ref("Main Banner");

        // Get list of items (images) in the directory
        const listResult = await storageRef.listAll();

        // Fetch download URL for each item (image) in the directory
        const urls = await Promise.all(
          listResult.items.map(async (itemRef) => {
            return await itemRef.getDownloadURL();
          })
        );
        setImageUrls(urls);
      } catch (error) {
        console.error("Error fetching image URLs:", error);
      }
    };

    fetchImageUrls();
  }, []);

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

  //check if all data is loaded
  useEffect(() => {
    if (
      mainBannerData.mainBannerContent.length > 0 &&
      mainBannerData.mainBannerContent.length === imageUrls.length
    ) {
      setDataLoaded(true);
    }
  }, [mainBannerData, imageUrls]);

  return (
    <div className="main-banner" id="top">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {dataLoaded && (
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
                    style={{ backgroundImage: `url("${imageUrls[index]}")` }}
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
              </OwlCarousel>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainBanner;
