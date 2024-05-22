import React, { useEffect, useState } from "react";
import { database, firestore, storage } from "./firebaseConfig";

import img from "../assets/images/event-01.jpg";

function Events() {
  const [eventsData, setEventsData] = useState({
    title: "",
    subtitle: "",
    eventsContent: [],
  });
  const [imageUrls, setImageUrls] = useState([]);

  // Fetch images from storage
  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const storageRef = storage.ref("Events Section");

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
    const fetchEventsData = async () => {
      try {
        const snapshot = await database.ref("Events Section").once("value");
        if (snapshot.exists()) {
          const data = snapshot.val();
          const { Title, Subtitle, Events } = data;

          // Filter out empty events item
          const filteredEvents = Events
            ? Events.filter((item) => item.Title && item.Category)
            : [];

          setEventsData({
            title: Title,
            subtitle: Subtitle,
            eventsContent: filteredEvents || [],
          });
        } else {
          console.log("The data for events was not found in the database");
        }
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };

    fetchEventsData();
  }, []);

  return (
    <div className="section events" id="events">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="section-heading">
              <h6>{eventsData.subtitle}</h6>
              <h2>{eventsData.title}</h2>
            </div>
          </div>
          {eventsData.eventsContent.map((item, index) => (
            <div key={index} className="col-lg-12 col-md-6">
              <div className="item">
                <div className="row">
                  <div className="col-lg-3">
                    <div className="image">
                      <img src={imageUrls[index]} alt="" />
                    </div>
                  </div>
                  <div className="col-lg-9">
                    <ul>
                      <li>
                        <span className="category">{item.Category}</span>
                        <h4>{item.Title}</h4>
                      </li>
                      <li>
                        <span>{item.Date.Label}</span>
                        <h6>{item.Date.Value}</h6>
                      </li>
                      <li>
                        <span>{item.Duration.Label}</span>
                        <h6>{item.Duration.Value}</h6>
                      </li>
                      <li>
                        <span>{item.Price.Label}</span>
                        <h6>{item.Price.Value}</h6>
                      </li>
                    </ul>
                    <a href="#">
                      <i className="fa fa-angle-right" />
                    </a>
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

export default Events;
