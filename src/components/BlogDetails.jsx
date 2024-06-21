import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/storage";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as farThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as fasThumbsUp } from "@fortawesome/free-solid-svg-icons";

import Header from "./Header";
import Footer from "./Footer";

const BlogDetails = () => {
  const [post, setPost] = useState(null); // Change to null initially
  const { title } = useParams();
  const [liked, setLiked] = useState(false);
  const [postId, setPostId] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [posts, setPosts] = useState([]);

  console.log("Title:", title);

  useEffect(() => {
    // Fetch posts from Firebase Realtime Database
    const fetchData = async () => {
      const postsRef = firebase.database().ref("posts");
      postsRef.once("value", (snapshot) => {
        const postsData = snapshot.val();
        if (postsData) {
          // Filter posts based on title
          const filteredPost = Object.entries(postsData).find(
            ([postId, post]) =>
              post.title.replace(/<\/?[^>]+(>|$)/g, "") === title
          );
          if (filteredPost) {
            // Set the found post
            const [postId, post] = filteredPost;
            setPost(post);
            setPostId(postId);

            // Push value to posts/{postId}/users/ only if current user hasn't been recorded
            const currentUser = firebase.auth().currentUser;
            if (currentUser) {
              const userId = currentUser.uid;
              const postUsersRef = firebase
                .database()
                .ref(`posts/${postId}/users`);

              // Check if current user has already been recorded
              postUsersRef.once("value", (snapshot) => {
                const usersData = snapshot.val();
                const userAlreadyRecorded =
                  usersData &&
                  Object.values(usersData).some(
                    (user) => user.user_id === userId
                  );
                if (!userAlreadyRecorded) {
                  const currentDate = new Date().toLocaleDateString(); // Format date as desired

                  // Fetch the latest ID from the users
                  let latestId = 0;
                  if (usersData) {
                    // Find the latest ID
                    Object.keys(usersData).forEach((userId) => {
                      const id = parseInt(userId);
                      if (id > latestId) {
                        latestId = id;
                      }
                    });
                  }

                  // Increment the latest ID by 1
                  const newId = latestId + 1;

                  // Set the user data with the new ID
                  postUsersRef.child(newId).set({
                    id: newId, // Add index value
                    Date: currentDate,
                    user_id: userId,
                    // Add any other data you want to push
                  });
                  const postRef = firebase.database().ref(`posts/${postId}`);
                  postRef.update({ id: newId });
                } else {
                  console.log("User already recorded for this post.");
                }
              });
            } else {
              console.log("User not authenticated.");
            }
          } else {
            console.log("Post not found.");
          }
        }
      });
    };
    fetchData();
  }, [title]);

  const handleLike = () => {
    setLiked(!liked);
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      const postRef = firebase
        .database()
        .ref("posts")
        .child(postId)
        .child("users");

      // Fetch the users array
      postRef.once("value", (snapshot) => {
        const usersData = snapshot.val();
        if (usersData) {
          // Find the index of the user object with the matching user_id
          const userIndex1 = Object.values(usersData).findIndex(
            (user) => user.user_id === userId
          );

          const userIndex = userIndex1 + 1;
          console.log("userIndex:", userIndex);
          if (userIndex !== -1) {
            // Update liked status for the current user
            const userRef = postRef.child(userIndex);
            userRef.update({ liked: !liked });
          } else {
            console.log("User not found in the users array.");
          }
        }
      });
    } else {
      console.log("User not authenticated.");
    }
  };

  //seo
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("posttitle:", title);

    const fetchData = async () => {
      try {
        const snapshot = await firebase
          .database()
          .ref("postMetaData")
          .orderByChild("postTitle")
          .equalTo(title)
          .once("value");
        console.log("snapshot", snapshot);
        if (snapshot.exists()) {
          setPostData(snapshot.val());
          console.log(setPostData);
        } else {
          setPostData(null);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (postData) {
      const firstKey = Object.keys(postData)[0]; // Get the dynamic key
      const post = postData[firstKey]; // Access post object using the dynamic key

      // Destructure post object to access individual properties
      const {
        ogTitle,
        ogDescription,
        ogImage,
        ogSiteName,
        ogType,
        ogUrl,
        twitterCard,
        twitterDomain,
      } = post;

      // Log the retrieved values for debugging
      console.log("ogTitle:", ogTitle);
      console.log("ogDescription:", ogDescription);
      console.log("ogImage:", ogImage);
      console.log("ogSiteName:", ogSiteName);
      console.log("ogType:", ogType);
      console.log("ogUrl:", ogUrl);
      console.log("twitterCard:", twitterCard);
      console.log("twitterDomain:", twitterDomain);

      // Set document title
      document.title = ogTitle || "Default Title";

      // Update meta tags
      document
        .querySelector('meta[property="og:description"]')
        .setAttribute("content", ogDescription || "");
      document
        .querySelector('meta[property="og:image"]')
        .setAttribute("content", ogImage || "");
      document
        .querySelector('meta[property="og:site_name"]')
        .setAttribute("content", ogSiteName || "");
      document
        .querySelector('meta[property="og:title"]')
        .setAttribute("content", ogTitle || "");
      document
        .querySelector('meta[property="og:type"]')
        .setAttribute("content", ogType || "");
      document
        .querySelector('meta[property="og:url"]')
        .setAttribute("content", ogUrl || "");
      document
        .querySelector('meta[name="twitter:card"]')
        .setAttribute("content", twitterCard || "");
      document
        .querySelector('meta[name="twitter:domain"]')
        .setAttribute("content", twitterDomain || "");
    }
  }, [postData]);

  console.log(`postData: ${postData}`);

  //handle authentication
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  //isloggedin
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Check if user is already logged in
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return unsubscribe;
  }, []);

  //logout
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setIsLoggedIn(false);
        // Redirect to home page or do any necessary clean up
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  //post

  useEffect(() => {
    // Fetch posts from Firebase Realtime Database
    const postsRef = firebase.database().ref("posts");
    postsRef.once("value", (snapshot) => {
      const postsData = snapshot.val();
      if (postsData) {
        const postsArray = Object.values(postsData).filter(
          (post) =>
            post.statusUpdate === "Created" || post.statusUpdate === "edited"
        );
        setPosts(postsArray);
      }
    });
  }, []);

  //comments

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    const commentsRef = firebase.database().ref(`comments/${title}`);
    const commentData = {
      name: name,
      email: email,
      comment: comment,
      Date: formattedDate,
    };
    commentsRef
      .push(commentData)
      .then(() => {
        // Clear the form after successful submission
        setName("");
        setEmail("");
        setComment("");
        setSuccessMessage("Comment submitted successfully!");
        setErrorMessage("");
        fetchComments();
      })
      .catch((error) => {
        console.error("Error submitting comment:", error);
        setErrorMessage("Failed to submit comment. Please try again later.");
        setSuccessMessage("");
      });
  };

  // Function to fetch comments from Firebase database
  const fetchComments = async () => {
    try {
      const commentsRef = firebase.database().ref("comments");
      commentsRef.child(title).once("value", (snapshot) => {
        const commentsData = snapshot.val();
        if (commentsData) {
          // Convert comments object to array
          const commentsArray = Object.values(commentsData);
          setComments(commentsArray);
        }
      });
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [title]);

  useEffect(() => {
    const databaseRef = firebase.database().ref("posts");

    // Retrieve data from the database
    databaseRef
      .once("value", (snapshot) => {
        const posts = snapshot.val(); // Retrieve all posts from the database
        const filteredPosts = Object.keys(posts).map((id) => {
          const { date, title } = posts[id];
          return { id, date, title };
        });

        console.log(filteredPosts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    // Fetch posts from Firebase Realtime Database
    const postsRef = firebase.database().ref("posts");
    postsRef.once("value", (snapshot) => {
      const postsData = snapshot.val();
      if (postsData) {
        Object.entries(postsData).forEach(([postId, post]) => {
          // Initialize likedCount to 0
          let likedCount = 0;

          // Check if post.users exists before iterating over it
          if (post.users) {
            // Iterate through the users array
            post.users.forEach((user) => {
              // Check if liked property is true
              if (user.liked === true) {
                // Increment likedCount if liked is true
                likedCount++;
              }
            });
          }

          // Update the DOM with the liked count for this post
          const likesSpan = document.querySelector(`#likes-${postId}`);
          if (likesSpan) {
            likesSpan.textContent = `${likedCount} likes`;
          }
        });
      }
    });
  }, [title]);

  // funtion to parse HTML and extract the text content
  const parseHTML = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <>
      <Header />
      <section className="hero-wrap section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="section-heading">
                <h6>BLOG</h6>
                <h2>Blog Details</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="ftco-section">
        <div className="container">
          <div className="row">
            {post && (
              <div className="col-md-12">
                <div className="card mb-3">
                  <img
                    src={post.image}
                    className="card-img-top"
                    alt={post.title}
                  />
                  <div className="card-body">
                    <div className="meta mb-2">
                      <span className="mr-2">
                        <i className="fa fa-calendar"></i>
                        {post.date}
                      </span>
                      <span className="mr-2">
                        <i className="fa fa-user"></i>
                        {post.author}
                      </span>
                      <a href="#" className="meta-chat">
                        <i className="fa fa-comments"></i>
                        {post.comments} Comments
                      </a>
                    </div>
                    <h5 className="card-title">
                      <Link to={`/${post.title}`}>{post.title}</Link>
                    </h5>
                    <p
                      className="card-text"
                      dangerouslySetInnerHTML={{ __html: post.description }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section> */}
      {/*bootstrap code*/} <br></br>
      <section className="blog-wrap">
        <div className="container">
          <div className="row">
            {post && (
              <>
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 mb-5">
                      <div className="single-blog-item">
                        <img src={post.image} alt="" className="img-fluid" />
                        <div className="blog-item-content mt-5">
                          <div className="blog-item-meta mb-3">
                            <span className="text-color-2 text-capitalize mr-3">
                              <i className="icofont-book-mark mr-2" /> Equipment{" "}
                            </span>
                            {/* <span className="text-muted text-capitalize mr-3">
                              <i className="icofont-comment mr-2" />
                              {comments.length} Comments
                            </span> */}
                            Comments
                            <span
                              id={`likes-${postId}`}
                              className="text-muted text-capitalize mr-3"
                            >
                              <i className="icofont-comment mr-2" /> likes
                            </span>
                            <span className="text-black text-capitalize mr-3">
                              <i className="icofont-calendar mr-2" />{" "}
                              {post.date}
                            </span>
                            <div>
                              <button onClick={handleLike}>
                                <FontAwesomeIcon
                                  icon={liked ? fasThumbsUp : farThumbsUp}
                                />
                              </button>
                            </div>
                          </div>
                          <h2 className="mb-4 text-md">
                            <a
                              href="blog-single.html"
                              dangerouslySetInnerHTML={{
                                __html: post.title,
                              }}
                            ></a>
                          </h2>
                          {/*<p className="lead mb-4">
                  Non illo quas blanditiis repellendus laboriosam minima animi.
                  Consectetur accusantium pariatur repudiandae!
                </p>*/}
                          <p
                            dangerouslySetInnerHTML={{
                              __html: post.description,
                            }}
                          ></p>
                          <blockquote
                            className="quote"
                            dangerouslySetInnerHTML={{ __html: post.postbrand }}
                          ></blockquote>
                          {/*<p className="lead mb-4 font-weight-normal text-black">
                  The same is true as we experience the emotional sensation of
                  stress from our first instances of social rejection ridicule.
                  We quickly learn to fear and thus automatically.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Iste, rerum beatae repellat tenetur incidunt quisquam libero
                  dolores laudantium. Nesciunt quis itaque quidem, voluptatem
                  autem eos animi laborum iusto expedita sapiente.
                </p>
                */}
                          <div className="mt-5 clearfix">
                            <ul className="float-left list-inline tag-option">
                              <li className="list-inline-item">
                                <a href="#">Advancher</a>
                              </li>
                              <li className="list-inline-item">
                                <a href="#">Landscape</a>
                              </li>
                              <li className="list-inline-item">
                                <a href="#">Travel</a>
                              </li>
                            </ul>
                            <ul className="float-right list-inline">
                              <li className="list-inline-item"> Share: </li>
                              <li className="list-inline-item">
                                <a href="#" target="_blank">
                                  <i
                                    className="icofont-facebook"
                                    aria-hidden="true"
                                  />
                                </a>
                              </li>
                              <li className="list-inline-item">
                                <a href="#" target="_blank">
                                  <i
                                    className="icofont-twitter"
                                    aria-hidden="true"
                                  />
                                </a>
                              </li>
                              <li className="list-inline-item">
                                <a href="#" target="_blank">
                                  <i
                                    className="icofont-pinterest"
                                    aria-hidden="true"
                                  />
                                </a>
                              </li>
                              <li className="list-inline-item">
                                <a href="#" target="_blank">
                                  <i
                                    className="icofont-linkedin"
                                    aria-hidden="true"
                                  />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="comment-area mt-4 mb-5">
                        <h4 className="mb-4">
                          Comments on Healthy environment...{" "}
                        </h4>
                        <ul className="comment-tree list-unstyled">
                          <li className="mb-5">
                            <div>
                              {comments.map((comment, index) => (
                                <div className="comment-area-box" key={index}>
                                  <div className="comment-thumb float-left">
                                    {/* Assuming comment has an image property */}
                                    <img
                                      alt=""
                                      src={comment.image}
                                      className="img-fluid"
                                    />
                                  </div>
                                  <div className="comment-info">
                                    <h5 className="mb-1">{comment.name}</h5>
                                    <span>{comment.location}</span>
                                    <span className="date-comm">
                                      | Posted {comment.date}
                                    </span>
                                  </div>
                                  <div className="comment-meta mt-2">
                                    <a href="#">
                                      <i className="icofont-reply mr-2 text-muted" />
                                      Reply
                                    </a>
                                  </div>
                                  <div className="comment-content mt-3">
                                    <p>{comment.comment}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </li>
                          <li>
                            <div className="comment-area-box">
                              <div className="comment-thumb float-left">
                                <img
                                  alt=""
                                  src="images/blog/testimonial2.jpg"
                                  className="img-fluid"
                                />
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <form
                        className="comment-form my-5"
                        id="comment-form"
                        onSubmit={handleSubmit}
                      >
                        <h4 className="mb-4">Write a comment</h4>
                        <div className="row g-2">
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                className="form-control"
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name:"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                className="form-control"
                                type="text"
                                name="mail"
                                id="mail"
                                placeholder="Email:"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <textarea
                              className="form-control mb-4"
                              name="comment"
                              id="comment"
                              cols={30}
                              rows={5}
                              placeholder="Comment"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <input
                          className="btn btn-main-2 btn-round-full"
                          type="submit"
                          name="submit-contact"
                          id="submit_contact"
                          defaultValue="Submit Message"
                        />
                        {successMessage && (
                          <div className="alert alert-success">
                            {successMessage}
                          </div>
                        )}
                        {errorMessage && (
                          <div className="alert alert-danger">
                            {errorMessage}
                          </div>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="sidebar-wrap pl-lg-4 mt-5 mt-lg-0">
                    {/*<div className="sidebar-widget search  mb-3 ">
            <h5>Search Here</h5>
            <form action="#" className="search-form">
              <input
                type="text"
                className="form-control"
                placeholder="search"
              />
              <i className="ti-search" />
            </form>
          </div>*/}
                    <div className="sidebar-widget latest-post mb-3">
                      <h5>Popular Posts</h5>
                      {posts.map((post, index) => (
                        <>
                          <div className="py-2">
                            <span className="text-sm text-muted">
                              {post.date}
                            </span>
                            <h6 className="my-2">
                              {/* <a href={`/${post.title}`}>{post.title}</a> */}
                              <Link
                                to={`/${parseHTML(post.title)}`}
                              >{`${parseHTML(post.title)}`}</Link>
                            </h6>
                          </div>
                        </>
                      ))}
                    </div>
                    <div className="sidebar-widget category mb-3">
                      <h5 className="mb-4">Categories</h5>
                      <ul className="list-unstyled">
                        {post &&
                          post.category &&
                          post.category.map((categories, index) => (
                            <li className="align-items-center">
                              <a key={index} href="#">
                                {categories}
                              </a>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="sidebar-widget tags mb-3">
                      <h5 className="mb-4">Tags</h5>
                      {post &&
                        post.tags &&
                        post.tags.map((tag, index) => (
                          <a key={index} href="#">
                            {tag}{" "}
                          </a>
                        ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default BlogDetails;
