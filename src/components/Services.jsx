import React, { useEffect, useState } from "react";

import { database, firestore, storage } from "./firebaseConfig";

import img from "../assets/images/service-01.png";

function Services() {
  const [servicesData, setServicesData] = useState([]);
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
          {servicesData.map((service, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="service-item">
                <div className="icon">
                  <img src={img} alt={`Img${index}`} />
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
