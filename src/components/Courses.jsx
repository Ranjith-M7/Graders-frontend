import React, { useEffect, useState, useRef } from "react";
import Masonry from "react-masonry-css";
import { Link } from "react-router-dom";
import { database, storage } from "./firebaseConfig";

function Courses() {
  const [coursesData, setCoursesData] = useState({
    title: "",
    subtitle: "",
    rupeeSign: "",
    coursesContent: [],
    filtersContent: [],
  });
  const [dataLoaded, setDataLoaded] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [activeFilter, setActiveFilter] = useState("*");

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

  useEffect(() => {
    fetchCoursesData();
  }, []);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const storageRef = storage.ref("Courses Section");
        const listResult = await storageRef.listAll();
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
    if (
      coursesData.coursesContent.length > 0 &&
      coursesData.coursesContent.length === imageUrls.length
    ) {
      setDataLoaded(true);
    }
  }, [coursesData, imageUrls]);

  const handleFilterClick = (filterValue) => {
    setActiveFilter(filterValue);
  };

  const filteredCourses =
    activeFilter === "*"
      ? coursesData.coursesContent
      : coursesData.coursesContent.filter(
          (course) => course.Category.toLowerCase() === activeFilter
        );

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

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
        <ul className="event_filter">
          {coursesData.filtersContent.map((filter, index) => (
            <li key={index}>
              <a
                className={
                  activeFilter === "*" && index === 0 ? "is_active" : ""
                }
                href="#!"
                data-filter={index === 0 ? "*" : filter.Category.toLowerCase()}
                onClick={() =>
                  handleFilterClick(
                    index === 0 ? "*" : filter.Category.toLowerCase()
                  )
                }
              >
                {filter.Name}
              </a>
            </li>
          ))}
        </ul>
        {dataLoaded && (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {filteredCourses.map((course, index) => (
              <div
                key={index}
                className={`align-self-center mb-30 event_outer ${course.Category.toLowerCase()}`}
              >
                <Link
                  className="events_item"
                  // to={`/course-details/${course._id}`}
                  to={`/course-details/1`}
                >
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
                </Link>
              </div>
            ))}
          </Masonry>
        )}
      </div>
    </section>
  );
}

export default Courses;




