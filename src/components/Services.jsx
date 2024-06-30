import React, { useEffect, useState } from "react";

import { database, firestore, storage } from "./firebaseConfig";

function Services() {
  const [servicesData, setServicesData] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  // Fetch images from storage
  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const storageRef = storage.ref("Services Section");

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
    const fetchServicesData = async () => {
      try {
        const snapshot = await database.ref("Services Section").once("value");
        if (snapshot.exists()) {
          const data = snapshot.val();

          // Convert the object data into an array
          const servicesArray = Object.values(data);

          setServicesData(servicesArray);
        } else {
          console.log("The services data was not found in the database");
        }
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };

    fetchServicesData();
  }, []);
  return (
    <div className="services section" id="services">
      <div className="container">
        <div className="row">
          {/* {servicesData.map((service, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="service-item">
                <div className="icon">
                  <img src={imageUrls[index]} alt="" />
                </div>
                <div className="main-content">
                  <h4>{service.Title}</h4>
                  <p>{service.Description}</p>
                  <div className="main-button">
                    <a href={service.Button.Link}>{service.Button.Text}</a>
                  </div>
                </div>
              </div>
            </div>
  ))} */}
          <div className="col-lg-4 col-md-6">
            <div className="service-item">
              <div className="icon">
                <img src={imageUrls[0]} alt="" />
              </div>
              <div className="main-content d-flex flex-column justify-content-between">
                <h4>Full Stack Courses</h4>
                <p>
                  Dive into our Full Stack Courses and master both front-end and
                  back-end development. Gain hands-on experience with the latest
                  technologies and build real-world projects to enhance your
                  portfolio.
                </p>
                <div className="main-button">
                  <a href="">Read More</a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="service-item">
              <div className="icon">
                <img src={imageUrls[1]} alt="" />
              </div>
              <div className="main-content d-flex flex-column justify-content-between">
                <h4>Expert Workshops</h4>
                <p>
                  Join our Expert Workshops to learn from industry leaders.
                  These interactive sessions cover cutting-edge topics and
                  provide valuable insights to boost your skills and career
                  prospects.
                </p>
                <div className="main-button">
                  <a href="">Read More</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="service-item">
              <div className="icon">
                <img src={imageUrls[2]} alt="" />
              </div>
              <div className="main-content d-flex flex-column justify-content-between">
                <h4>Career Sessions</h4>
                <p>
                  Attend our Career Sessions to get guidance on crafting the
                  perfect resume, acing interviews, and navigating the job
                  market. Get personalized advice to kickstart your professional
                  journey.
                </p>
                <div className="main-button">
                  <a href="">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
