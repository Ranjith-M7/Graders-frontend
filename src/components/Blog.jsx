import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Blog() {
  //post
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const postsRef = firebase.database().ref("posts");
    postsRef.once("value", (snapshot) => {
      const postsData = snapshot.val();
      if (postsData) {
        const postsArray = Object.values(postsData).filter(
          (post) =>
            post.statusUpdate === "Created" || post.statusUpdate === "edited"
        );
        setPosts(postsArray);
        setFilteredPosts(postsArray);
      }
    });
  }, []);

  //title name change
  // const [brandName, setBrandName] = useState("");

  // useEffect(() => {
  //   const fetchBrandName = async () => {
  //     try {
  //       const snapshot = await firebase
  //         .database()
  //         .ref("Title/Title_name")
  //         .once("value");
  //       if (snapshot.exists()) {
  //         const data = snapshot.val();
  //         setBrandName(data);
  //       } else {
  //         console.error("Brand name not found in database");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching brand name:", error);
  //     }
  //   };

  //   fetchBrandName();
  // }, []);

  const handleSearchInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(query)
    );
    setFilteredPosts(filtered);
  };

  // funtion to parse HTML and extract the text content
  const parseHTML = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };
  return (
    <>
      <Header />
      <section className="blog-section section" id="blog">
        <div className="hero-wrap">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <div className="section-heading">
                  <h6>BLOG</h6>
                  <h2>Our Stories</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-2 mb-4">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by blog..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {filteredPosts.map((post, index) => (
            <>
              <div key={index} className="blog-slider mb-3">
                <div className="blog-slider__wrp swiper-wrapper">
                  <div className="blog-slider__item swiper-slide">
                    <div className="blog-slider__img">
                      <Link
                        // Set the link path based on the post title
                        className="block-20 rounded"
                        style={{
                          backgroundImage: `url(${post.image})`,
                          width: "100%",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></Link>
                    </div>

                    <div className="blog-slider__content">
                      <span className="blog-slider__code">{post.date}</span>
                      <div
                        className="blog-slider__title"
                        dangerouslySetInnerHTML={{
                          __html: `<Link to="/${post.title}">${post.title}</Link>`,
                        }}
                      />
                      <div
                        className="blog-slider__text"
                        style={{ maxHeight: "3em", overflow: "hidden" }}
                      >
                        <div
                          dangerouslySetInnerHTML={{ __html: post.description }}
                        />
                      </div>
                      <Link
                        to={`/${parseHTML(post.title)}`}
                        className="blog-slider__button"
                      >
                        READ MORE
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="blog-slider__pagination" />
              </div>
            </>
          ))}
        </div>
        <br />
      </section>
      <Footer />
    </>
  );
}

export default Blog;
