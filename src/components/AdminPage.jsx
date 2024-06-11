import React, { useRef, useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import Header from "./Header";
import Footer from "./Footer";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPage = () => {
  const calendarRef = useRef(null);

  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [duration, setDuration] = useState("");
  // const [successMessage, setSuccessMessage] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  const [eventCity, setEventCity] = useState("");

  const [calendarEvents, setCalendarEvents] = useState([]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const database = firebase.database();
      const ref = database.ref("Events");
      const newEventRef = ref.push();

      await newEventRef.set({
        eventType,
        eventDate,
        duration,
      });

      setEventType("");
      setEventDate("");
      setDuration("");
      // setSuccessMessage("Event booked successfully.");
      toast.success(`Event booked successfully.`);
      // setErrorMessage("");
    } catch (error) {
      // setErrorMessage("Error booking event. Please try again.");
      toast.error(`Error booking event. Please try again.`);
      console.error("Error booking event:", error);
      // setSuccessMessage("");
    }
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
                    <label htmlFor="input3" className="form-label">
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
                    <label htmlFor="input1" className="form-label">
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
                    <label htmlFor="datepicker" className="form-label">
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
                    <label htmlFor="input2" className="form-label">
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

                  <button
                    type="submit"
                    className="btn"
                    style={{ backgroundColor: "#7a6ad8", color: "white" }}
                  >
                    Book Event
                  </button>
                  {/* {successMessage && (
                    <div className="alert alert-success">{successMessage}</div>
                  )}
                  {errorMessage && (
                    <div className="alert alert-danger">{errorMessage}</div>
                  )} */}
                </form>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AdminPage;
