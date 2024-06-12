import React, { useRef, useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/database";
import { database, firestore, storage } from "./firebaseConfig";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import Header from "./Header";
import Footer from "./Footer";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPage = () => {
  const calendarRef = useRef(null);
  const fileInputRef = useRef(null);
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [duration, setDuration] = useState("");
  const [eventCity, setEventCity] = useState("");
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const database = firebase.database();
        const snapshot = await database.ref("Events").once("value");
        const eventData = snapshot.val() || {};
        const events = Object.keys(eventData).map((eventId) => {
          const event = eventData[eventId];
          return {
            title: event.eventType,
            start: new Date(event.eventDate),
            allDay: true,
            backgroundColor: "#6fa8dc", // default blue color
          };
        });
        setCalendarEvents(events);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //handle image upload
  const handleImageUpload = async (file) => {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`Event Images/${file.name}`);
    await fileRef.put(file);
    return await fileRef.getDownloadURL();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let imageUrl = "";
      if (image) {
        imageUrl = await handleImageUpload(image);
      }

      const database = firebase.database();
      const ref = database.ref("Events");
      const newEventRef = ref.push();

      await newEventRef.set({
        eventType,
        eventDate,
        duration,
        title,
        price,
        eventCity,
        imageUrl,
      });

      setEventType("");
      setEventDate("");
      setDuration("");
      setTitle("");
      setPrice("");
      setEventCity("");
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      toast.success(`Event booked successfully.`);
    } catch (error) {
      toast.error(`Error booking event. Please try again.`);
      console.error("Error booking event:", error);
    }
  };

  const handleDeleteEvent = (date, title) => {
    // Reference to the event node
    const eventsRef = firebase.database().ref("Events");

    // Query events with the specified date
    eventsRef
      .orderByChild("eventDate")
      .equalTo(date)
      .once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const event = childSnapshot.val();
          // Check if the event matches both the specified date and title
          if (event.eventDate === date && event.title === title) {
            // Remove the event entry
            childSnapshot.ref
              .remove()
              .then(() => {
                console.log("Event data deleted from Firebase");
                toast.success(`Event data deleted from Firebase`);
                setTimeout(() => {
                  window.location.reload();
                }, 400); // Adjust the delay time as needed
              })
              .catch((error) => {
                console.error(
                  "Error deleting event data from Firebase: ",
                  error
                );
                toast.error(`Error deleting event data from Firebase: ${error}
                  `);
              });
          }
        });
      });
  };
  return (
    <>
      <Header />
      <section className="admin-section section " id="admin-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="section-heading">
                <h2>Admin Page</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-9">
              <div className="mb-3">
                <FullCalendar
                  ref={calendarRef}
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView={"dayGridMonth"}
                  headerToolbar={{
                    start: "today prev,next",
                    center: "title",
                    end: "dayGridMonth,timeGridWeek,timeGridDay",
                  }}
                  height={"60vh"}
                  events={calendarEvents}
                />
              </div>
            </div>

            <div className="col-md-3">
              <div className="">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 col-md-12">
                    <label htmlFor="eventCity" className="form-label">
                      Event City
                    </label>
                    <select
                      className="form-select"
                      id="eventCity"
                      required
                      value={eventCity}
                      onChange={(e) => setEventCity(e.target.value)}
                    >
                      <option value="">Select event city</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Bangalore">Bangalore</option>
                    </select>
                  </div>
                  <div className="mb-3 col-md-12">
                    <label htmlFor="eventType" className="form-label">
                      Event Type
                    </label>
                    <select
                      className="form-select"
                      id="eventType"
                      required
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                    >
                      <option value="">Select event type</option>
                      <option value="ui/ux">UI/UX</option>
                      <option value="front end">Front end</option>
                      <option value="backend">Backend</option>
                      <option value="database">Database</option>
                      <option value="data science">Data science</option>
                      <option value="data analyst">Data Analyst</option>
                      <option value="excel">Excel</option>
                    </select>
                  </div>
                  <div className="mb-3 col-md-12">
                    <label htmlFor="eventDate" className="form-label">
                      Event Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="eventDate"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 col-md-12">
                    <label htmlFor="duration" className="form-label">
                      Duration
                    </label>
                    <select
                      className="form-select"
                      id="duration"
                      required
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    >
                      <option value="">Select Duration</option>
                      {/* {Array.from({ length: 10 }, (_, i) => (
                        <option key={i} value={`${i * 100} - ${(i + 1) * 100}`}>
                          {`${i * 100} - ${(i + 1) * 100}`}
                        </option>
                      ))} */}
                      <option value="0 - 1 hour">{`0 - 1 hour`}</option>
                      <option value="2 hours">{`2 hours`}</option>
                      <option value="3 hours">{`3 hours`}</option>
                      <option value="4 hours">{`4 hours`}</option>
                      <option value="5 hours">{`5 hours`}</option>
                      <option value="6 hours">{`6 hours`}</option>
                      <option value="7 hours">{`7 hours`}</option>
                      <option value="8 hours">{`8 hours`}</option>
                      <option value="9 hours">{`9 hours`}</option>
                      <option value="10+ hours">{`10+ hours`}</option>
                    </select>
                  </div>
                  <div className="mb-3 col-md-12">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      required
                      placeholder="Enter the event title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="mb-3 col-md-12">
                    <label htmlFor="imageUpload" className="label-yellow mb-1">
                      Select image to upload
                    </label>
                    <input
                      type="file"
                      required
                      className="form-control-file"
                      id="imageUpload"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>

                  <div className="mb-3 col-md-12">
                    <label htmlFor="firstName">Price</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      id="price"
                      placeholder="Enter the price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="secondary-button">
                    Book Event
                  </button>
                </form>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Event Booking Details's Table */}
      <section className="event-booking-table mt-5">
        <div className="container">
          <table class="table table-striped table-hover table-bordered ">
            <thead
              style={{ backgroundColor: "rgb(23, 133, 130)", color: "white" }}
            >
              <tr>
                <th scope="col">No</th>
                <th scope="col">Date</th>
                <th scope="col">Title</th>
                <th scope="col">Event Type</th>
                <th scope="col">Event City</th>
                <th scope="col">Duration</th>
                <th scope="col">Price</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(eventData.events) &&
                eventData.events.map((event, index) => (
                  <tr key={index}>
                    <th scope="row">{`${index + 1}`}</th>
                    <td>{event.eventDate}</td>
                    <td>{event.title}</td>
                    <td>{event.eventType}</td>
                    <td>{event.eventCity}</td>
                    <td>{event.duration}</td>
                    <td>₹{event.price}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteEvent(event.eventDate, event.title);
                        }}
                        style={{ cursor: "pointer", color: "red" }}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AdminPage;
