import React, { useEffect, useState } from "react";
import { database, firestore, storage } from "./firebaseConfig";

function Events() {
  const [eventHeadingContent, setEventHeadingContent] = useState({
    title: "",
    subtitle: "",
    events: [],
  });

  const [eventData, setEventData] = useState({
    events: {
      imageUrl: "",
      title: "",
      eventType: "",
      eventDate: "",
      eventCity: "",
      duration: "",
      price: "",
    },
  });

  useEffect(() => {
    const fetchEventHeadingContent = async () => {
      try {
        const snapshot = await database.ref("Events Section").once("value");
        if (snapshot.exists()) {
          const data = snapshot.val();
          const { Title, Subtitle } = data;

          setEventHeadingContent({
            title: Title,
            subtitle: Subtitle,
          });
        } else {
          console.log(
            "The heading data for events was not found in the database"
          );
        }
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };

    fetchEventHeadingContent();
  }, []);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const snapshot = await database.ref("Events").once("value");
        if (snapshot.exists()) {
          const data = snapshot.val();
          const events = Object.values(data); // convert object to array
          setEventData({ events });
        } else {
          console.log(
            "The events data for events was not found in the database"
          );
        }
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };

    fetchEventData();
  }, []);

  return (
    <div className="section events" id="events">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="section-heading">
              <h6>{eventHeadingContent.subtitle}</h6>
              <h2>{eventHeadingContent.title}</h2>
            </div>
          </div>
          {Array.isArray(eventData.events) &&
            eventData.events.map((event, index) => (
              <div key={index} className="col-lg-12 col-md-6">
                <div className="item">
                  <div className="row">
                    <div className="col-lg-3">
                      <div className="image">
                        <img src={event.imageUrl} alt="img" />
                      </div>
                    </div>
                    <div className="col-lg-9">
                      <ul>
                        <li>
                          <span className="category">{event.eventType}</span>
                          <h4>{event.title}</h4>
                        </li>
                        <li>
                          <span>Date</span>
                          <h6>{event.eventDate}</h6>
                        </li>
                        <li>
                          <span>Duration</span>
                          <h6>{event.duration}</h6>
                        </li>
                        <li>
                          <span>Price</span>
                          <h6>₹{event.price}</h6>
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
