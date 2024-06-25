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
      description: "",
      agendaList: "",
      contactInformation: "",
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
                        <img
                          src={event.imageUrl}
                          className="img-fluid"
                          alt="img"
                        />
                      </div>
                    </div>
                    <div className="col-lg-9">
                      <ul className="event-details-list">
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

                      <a
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target={`#more${index}`}
                      >
                        <i className="fa fa-angle-right" />
                      </a>

                      {/* Modal */}
                      <div
                        className="modal fade"
                        id={`more${index}`}
                        tabIndex={-1}
                        role="dialog"
                        aria-labelledby="exampleModalCenterTitle"
                        aria-hidden="true"
                      >
                        <div
                          className="modal-dialog modal-dialog-centered"
                          role="document"
                        >
                          <div className="modal-content">
                            <div className="modal-header event-modal-header">
                              <h5
                                className="modal-title"
                                id="exampleModalLongTitle"
                              >
                                More Details
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>

                            <div className="modal-body  event-modal-body">
                              <div className="d-flex flex-column">
                                <div className="text-center">
                                  <img
                                    src={event.imageUrl}
                                    alt="Event"
                                    className="img-fluid mb-3 w-50"
                                    style={{ borderRadius: "8px" }}
                                  />
                                </div>
                                <div className="d-flex flex-column">
                                  <div className="">
                                    <div>
                                      <span className="category ">
                                        {event.eventType}
                                      </span>
                                      <h4>{event.title}</h4>
                                    </div>
                                  </div>

                                  <div className="d-flex justify-content-between mt-3  ">
                                    <div>
                                      <span>Date</span>
                                      <h6>{event.eventDate}</h6>
                                    </div>
                                    <div>
                                      <span>City</span>
                                      <h6>{event.eventCity}</h6>
                                    </div>
                                    <div>
                                      <span>Duration</span>
                                      <h6>{event.duration}</h6>
                                    </div>
                                  </div>

                                  <div className="mt-3 ">
                                    <div>
                                      <span>Price</span>
                                      <h6>₹{event.price}</h6>
                                    </div>
                                  </div>

                                  <div className="mt-3">
                                    <span className="more-info-topic-title"
                                      style={{
                                        color: "rgb(23, 133, 130)",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Description:
                                    </span>
                                    <p>{event.description}</p>
                                  </div>
                                  <div className="mt-3">
                                  <span className="more-info-topic-title"
                                      style={{
                                        color: "rgb(23, 133, 130)",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Agenda:
                                    </span>
                                    <p>{event.agendaList}</p>
                                  </div>
                                  <div className="mt-3">
                                    <span className="more-info-topic-title"
                                      style={{
                                        color: "rgb(23, 133, 130)",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Contact Information:
                                    </span>
                                    <p>{event.contactInformation}</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="modal-footer event-modal-footer">
                              <button
                                type="button"
                                className="primary-button"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button type="button" class="primary-button">
                                For Booking
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
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
