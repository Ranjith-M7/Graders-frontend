import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import tempImg1 from "../assets/images/course-01.jpg";
import tempImg2 from "../assets/images/course-02.jpg";

import Header from "./Header";
import Footer from "./Footer";
function CourseDetails() {
  const { id } = useParams();

  return (
    <>
      <section
        className="course-details"
        style={{ backgroundColor: "rgb(215, 255, 253)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row my-5">
                <div className="col-lg-8 d-flex">
                  <div className="row ">
                    <div className="col-lg-4">
                      <img src={tempImg1} className="img-fluid" alt="" />
                    </div>
                    <div className="col-lg-8 d-flex flex-column justify-content-center">
                      <h2 className="mb-2">
                        UX Design: From Concept to Wireframe
                      </h2>
                      <span className="d-inline-block mb-2">by MichiganX</span>
                      <p>
                        Gain first-hand experiences of the UX design process as
                        you take a UX design project from an initial sketch and
                        develop it into a wireframe project from an initial
                        sketch and develop it into a wireframe into a wireframe.
                      </p>
                      {/* you can add star rating and reviews if needs */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 d-flex flex-column justify-content-center align-items-center">
                  <span className="mb-1">March 21, 2017</span>
                  <span className="mb-3">Self-Paced</span>
                  <button className="secondary-button w-50">ENROLL</button>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row">
                <div
                  className="col-lg-8 p-4 me-4 bg-white"
                  style={{ color: "white" }}
                >
                  <div className="mb-4">
                    <h2 className="mb-3">About this course</h2>
                    <p>
                      Creat designs don't come out of nowhere, they are born,
                      nurtured, and grow. In this UX course, you will explore
                      the process of taking a basic concept, grounded in user
                      needs, and develop it into a design that will address
                      those needs. Using ideation techniques, comparative
                      research, sketching, storyboarding, architecting, and
                    </p>
                  </div>
                  <div>
                    <h2>What you'll learn</h2>
                    <ul style={{ color: "red" }}>
                      <li>
                        Learn to produce initial sketches that capture the
                        process of ideation
                      </li>
                      <li>
                        Create user stories and storyboards to support the
                        concept
                      </li>
                      <li>
                        Develop interface wireframes to provide an engaging test
                        example
                      </li>
                      <li>Use comparative analysis techniques</li>
                      <li>Run a design walkthrough to test the concept</li>
                    </ul>
                  </div>
                  <div className="instructors-container">
                    <h2>Instructors</h2>
                    <div>
                      {/* Instruct 1 */}
                      <div>
                        <div className="image">
                          <img src={tempImg1} alt="" />
                        </div>
                        <h4>Predrag Klasnja</h4>
                        <p>
                          Assistant Professor, School of Information, University
                          of Michigan
                        </p>
                      </div>
                      {/* Instruct 2 */}
                      <div>
                        <div className="image">
                          <img src={tempImg1} alt="" />
                        </div>
                        <h4>Light Yagami</h4>
                        <p>
                          Associate Professor, School of Information, University
                          of Michigan
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 p-4 bg-white">
                  <div>
                    <span>
                      <i className="icofont-comment me-1" /> 146 learners
                    </span>

                    <span>
                      <i className="icofont-comment me-1" /> $ 120
                    </span>

                    <span>
                      <i className="icofont-comment me-1" /> 3 Weeks
                    </span>

                    <span>
                      <i className="icofont-comment me-1" /> 3-4 hours per week
                    </span>

                    <span>
                      <i className="icofont-comment me-1" /> Intermediate
                    </span>

                    <span>
                      <i className="icofont-comment " />
                    </span>
                  </div>
                  <div className="other-courses">
                    <ul>
                      <li>
                        Mobile Applicators Experiences Part I - From a Domain to
                        an App Idea
                      </li>
                      <li>
                        User Fxperence (UX) Design: Human Factors ard Culture in
                        Design
                      </li>
                      <li>Mobile Applicator Part Z Mobile App Design</li>
                      <li>IntrcdLCtion to user Experience</li>
                      <li>Professional Android Developer</li>
                    </ul>
                  </div>
                  {/* <div className="share-course">
                    <h4>Share this Course with a friend</h4>
                    <ul>
                      <li>
                        <a href="#" target="_blank">
                          <i className="icofont-facebook" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#" target="_blank">
                          <i className="icofont-twitter" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#" target="_blank">
                          <i className="icofont-pinterest" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#" target="_blank">
                          <i className="icofont-linkedin" aria-hidden="true" />
                        </a>
                      </li>
                    </ul>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CourseDetails;
