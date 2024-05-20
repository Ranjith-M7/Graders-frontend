import React from "react";

function Events() {
  return (
    <div className="section events" id="events">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="section-heading">
              <h6>Schedule</h6>
              <h2>Upcoming Events</h2>
            </div>
          </div>
          <div className="col-lg-12 col-md-6">
            <div className="item">
              <div className="row">
                <div className="col-lg-3">
                  <div className="image">
                    <img src="assets/images/event-01.jpg" alt="" />
                  </div>
                </div>
                <div className="col-lg-9">
                  <ul>
                    <li>
                      <span className="category">Web Design</span>
                      <h4>UI Best Practices</h4>
                    </li>
                    <li>
                      <span>Date:</span>
                      <h6>16 Feb 2036</h6>
                    </li>
                    <li>
                      <span>Duration:</span>
                      <h6>22 Hours</h6>
                    </li>
                    <li>
                      <span>Price:</span>
                      <h6>₹120</h6>
                    </li>
                  </ul>
                  <a href="#">
                    <i className="fa fa-angle-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-md-6">
            <div className="item">
              <div className="row">
                <div className="col-lg-3">
                  <div className="image">
                    <img src="assets/images/event-02.jpg" alt="" />
                  </div>
                </div>
                <div className="col-lg-9">
                  <ul>
                    <li>
                      <span className="category">Front End</span>
                      <h4>New Design Trend</h4>
                    </li>
                    <li>
                      <span>Date:</span>
                      <h6>24 Feb 2036</h6>
                    </li>
                    <li>
                      <span>Duration:</span>
                      <h6>30 Hours</h6>
                    </li>
                    <li>
                      <span>Price:</span>
                      <h6>₹320</h6>
                    </li>
                  </ul>
                  <a href="#">
                    <i className="fa fa-angle-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-md-6">
            <div className="item">
              <div className="row">
                <div className="col-lg-3">
                  <div className="image">
                    <img src="assets/images/event-03.jpg" alt="" />
                  </div>
                </div>
                <div className="col-lg-9">
                  <ul>
                    <li>
                      <span className="category">Full Stack</span>
                      <h4>Web Programming</h4>
                    </li>
                    <li>
                      <span>Date:</span>
                      <h6>12 Mar 2036</h6>
                    </li>
                    <li>
                      <span>Duration:</span>
                      <h6>48 Hours</h6>
                    </li>
                    <li>
                      <span>Price:</span>
                      <h6>₹440</h6>
                    </li>
                  </ul>
                  <a href="#">
                    <i className="fa fa-angle-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;
