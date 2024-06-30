import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

import tempImg1 from "../assets/images/course-01.jpg";

import Header from "./Header";
import Footer from "./Footer";

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState({
    title: "",
    author: "",
    description: "",
    about: "",
    whatYouLearn: [],
    modules: [],
    learners: "",
    price: "",
    duration: "",
    hoursPerWeek: "",
    level: "",
    language: "",
    rupeeSign: "",
    subtitles: [],
  });

  useEffect(() => {
    // Fetch selected course from firebase realtime database
    const fetchCourse = async () => {
      try {
        const snapshot = await firebase
          .database()
          .ref("Courses Section/Courses")
          .once("value");

        if (snapshot.exists()) {
          const data = snapshot.val();
          if (data) {
            // Find the course with the matching ID
            const coursesData = Object.values(data);
            const selectedCourse = coursesData.find(
              (course) => course.Id === parseInt(id)
            );
            if (selectedCourse) {
              setCourse({
                title: selectedCourse.Title || "",
                author: selectedCourse.Author || "",
                description: selectedCourse.Description || "",
                about: selectedCourse.About || "",
                whatYouLearn: selectedCourse.WhatYouLearn || [],
                modules: selectedCourse.Modules || [],
                learners: selectedCourse.Learners || "",
                price: selectedCourse.Price || "",
                duration: selectedCourse.Duration || "",
                hoursPerWeek: selectedCourse.HoursPerWeek || "",
                level: selectedCourse.Level || "",
                language: selectedCourse.Language || "",
                rupeeSign: selectedCourse.Rupee_Sign || "",
                subtitles: selectedCourse.Subtitles || [],
              });
            } else {
              console.log(`Course with ID ${id} not found`);
            }
          }
        } else {
          console.log("No courses found in the database");
        }
      } catch (error) {
        console.error("Error fetching courses: ", error);
      }
    };
    fetchCourse();
  }, [id]);

  return (
    <>
      <Header />
      <section className="course-details-section" id="course-details">
        <div className="container">
          {/* Row 1 */}
          <div className="row py-5">
            <div className="col-lg-4 d-flex align-items-center justify-content-center">
              <div className="image">
                <img src={tempImg1} className="img-fluid" alt="" />
              </div>
            </div>
            <div className="col-lg-8 ">
              <div className="d-lg-flex justify-content-between align-items-center p-lg-5 p-3 bg-white">
                <div className="content py-2">
                  <h2 className="mb-2">{course.title}</h2>
                  <span className="d-inline-block mb-2">{course.author}</span>
                  <p>{course.description}</p>
                  {/* you can add star rating and reviews if needs */}
                </div>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="row pb-5">
            {/* Left side */}

            <div className="col-lg-9 ">
              <div className="about-course p-5 bg-white ">
                <h2 className="mb-3">{course.subtitles[0]}</h2>
                <p>{course.about}</p>
              </div>
              <div className="what-you-learn px-5  bg-white">
                <h2 className="mb-3">{course.subtitles[1]}</h2>

                <ul className="learning-list">
                  {course.whatYouLearn.map((list, index) => (
                    <li key={index}>{list}</li>
                  ))}
                </ul>
              </div>

              <div className="course-content p-5  bg-white">
                <h2 className="mb-3">{course.subtitles[2]}</h2>
                <ul className="content-list">
                  {course.modules.map((list, index) => (
                    <li key={index}>
                      <h3>{list.Title}</h3>
                      <p>{list.Description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right side */}
            <div className="col-lg-3 mt-5 mt-lg-0">
              <div
                className="course-info p-5 bg-white d-flex flex-column"
                style={{ color: "#777" }}
              >
                
                <div className="info-item">
                  <i className="fa-solid fa-user-group"></i>
                  <span>{course.learners}</span>
                </div>
                <div className="info-item">
                  <i className="fa-solid fa-tag"></i>
                  <span>
                    {course.rupeeSign}
                    {course.price}
                  </span>
                </div>
                <div className="info-item">
                  <i className="fa-solid fa-stopwatch"></i>
                  <span>{course.duration}</span>
                </div>
                <div className="info-item">
                  <i className="fa-solid fa-clock"></i>
                  <span>{course.hoursPerWeek}</span>
                </div>
                <div className="info-item">
                  <i className="fa-solid fa-signal"></i>
                  <span>{course.level}</span>
                </div>
                <div className="info-item">
                  <i className="fa-solid fa-language"></i>
                  <span>{course.language}</span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default CourseDetails;
