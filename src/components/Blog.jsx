import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsRef = firebase.database().ref("posts");
      const snapshot = await postsRef.once("value");
      const postsData = snapshot.val();
      if (postsData) {
        const postsArray = Object.values(postsData).filter(
          (post) =>
            post.statusUpdate === "Created" || post.statusUpdate === "edited"
        );
        setPosts(postsArray);
        setFilteredPosts(postsArray);
      }
    };

    fetchPosts();
  }, []);

  const handleSearchInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(query)
    );
    setFilteredPosts(filtered);
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
        <div className="container mt-4 mb-4">
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
        <br />
        <div className="row">
          {filteredPosts.map((post, index) => (
            <>
              <div key={index} className="blog-slider">
                <div className="blog-slider__wrp swiper-wrapper">
                  <div className="blog-slider__item swiper-slide">
                    <div className="blog-slider__img">
                      <Link
                        // Set the link path based on the post title
                        className="block-20 rounded"
                        style={{
                          backgroundImage: `url(${post.image})`,
                          width: "100%",
                        }}
                      >
                      </Link>
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
                        to={`/${post.title}`}
                        className="blog-slider__button"
                      >
                        READ MORE
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="blog-slider__pagination" />
              </div>
              <br></br>
              <br></br>
            </>
          ))}
        </div>{" "}
        <br></br>
        <br />
      </section>
      <Footer />
    </>
  );
}

export default Blog;
