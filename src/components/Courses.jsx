import React, { useEffect, useState, useRef } from "react";
import Isotope from "isotope-layout";
import matchesSelector from "desandro-matches-selector";
import { database, firestore, storage } from "./firebaseConfig";

function Courses() {
  const [coursesData, setCoursesData] = useState({
    title: "",
    subtitle: "",
    rupeeSign: "",
    coursesContent: [],
    filtersContent: [],
  });
  const [imageUrls, setImageUrls] = useState([]);
  const eventBoxRef = useRef(null);
  const filtersElemRef = useRef(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Fetch images from storage
  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const storageRef = storage.ref("Courses Section");

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
    const fetchCoursesData = async () => {
      try {
        const snapshot = await database.ref("Courses Section").once("value");
        if (snapshot.exists()) {
          const data = snapshot.val();
          const { Title, Subtitle, Rupee_Sign, Courses, Filters } = data;

          const filteredCoursesContent = Courses
            ? Courses.filter((item) => item.Title && item.Category)
            : [];
          const filteredFiltersContent = Filters
            ? Filters.filter((item) => item.Name && item.Category)
            : [];

          setCoursesData({
            title: Title || "",
            subtitle: Subtitle || "",
            rupeeSign: Rupee_Sign || "",
            coursesContent: filteredCoursesContent || [],
            filtersContent: filteredFiltersContent || [],
          });
        } else {
          console.log("The courses section data was not found in the database");
        }
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };

    fetchCoursesData();
  }, []);

  useEffect(() => {
    const elem = eventBoxRef.current;
    const filtersElem = filtersElemRef.current;

    const isotopeInstance = new Isotope(elem, {
      itemSelector: ".event_outer",
      layoutMode: "masonry",
    });

    const filterHandler = (event) => {
      if (!matchesSelector(event.target, "a")) {
        return;
      }
      const filterValue = event.target.getAttribute("data-filter");
      isotopeInstance.arrange({
        filter: filterValue,
      });
      filtersElem.querySelector(".is_active").classList.remove("is_active");
      event.target.classList.add("is_active");
      event.preventDefault();
    };

    filtersElem.addEventListener("click", filterHandler);

    return () => {
      filtersElem.removeEventListener("click", filterHandler);
      isotopeInstance.destroy();
    };
  }, []);

  //check if all data is loaded
  useEffect(() => {
    if (
      coursesData.coursesContent.length > 0 &&
      coursesData.coursesContent.length === imageUrls.length
    ) {
      setDataLoaded(true);
    }
  }, [coursesData, imageUrls]);

  return (
    <section className="section courses" id="courses">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="section-heading">
              <h6>{coursesData.subtitle}</h6>
              <h2>{coursesData.title}</h2>
            </div>
          </div>
        </div>
        <ul className="event_filter" ref={filtersElemRef}>
          {coursesData.filtersContent.map((filter, index) => (
            <li key={index}>
              <a
                className={index === 0 ? "is_active" : ""}
                href="#!"
                data-filter={
                  index === 0 ? "*" : `.${filter.Category.toLowerCase()}`
                }
              >
                {filter.Name}
              </a>
            </li>
          ))}
        </ul>
        {dataLoaded && (
          <div className="row event_box" ref={eventBoxRef}>
            {coursesData.coursesContent.map((course, index) => (
              <div
                key={index}
                className={`col-lg-4 col-md-6 align-self-center mb-30 event_outer ${course.Category.toLowerCase()}`}
              >
                <div className="events_item">
                  <div className="thumb">
                    <a href="#">
                      <img src={imageUrls[index]} alt={`Image ${index + 1}`} />
                    </a>
                    <span className="category">{course.Category}</span>
                    <span className="price">
                      <h6>
                        <em>{coursesData.rupeeSign}</em>
                        {course.Price}
                      </h6>
                    </span>
                  </div>
                  <div className="down-content">
                    <span className="author">{course.Author}</span>
                    <h4>{course.Title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Courses;
