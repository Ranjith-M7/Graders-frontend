import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/storage";
import { storage } from "./firebaseConfig";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Card, Form, Button, Container, Modal, Alert } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import Header from "./Header";
import Footer from "./Footer";

function BlogEdit() {
  //post blog
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    image: "",
    author: "",
    link: "",
    postbrand: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    console.log("formattedDate:", formattedDate);
    // Upload image to Firebase Storage
    if (imageFile && newPost.title) {
      const fileExtension = imageFile.name.split(".").pop(); // Extract file extension
      const imageName = `image_${Date.now()}.${fileExtension}`; // Generate a unique image name
      const imagePath = `images/${newPost.title}/${imageName}`; // Construct the path with dynamic extension
      const uploadTask = storage.ref(imagePath).put(imageFile); // Uploading to the specified path
      console.log("uploadTask:", uploadTask);
      console.log("imageName:", imageName);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress function
        },
        (error) => {
          console.error(error);
          setFailureMessage("Failed to upload image."); // Set failure message
        },
        () => {
          // Completion function
          storage
            .ref(`images/${newPost.title}`)
            .child(imageName)
            .getDownloadURL()
            .then((url) => {
              setNewPost({
                ...newPost,
                image: url,
                date: formattedDate,
                tags: tags,
                category: categories,
              });

              // Add post to the database with push() to generate a unique postId
              firebase
                .database()
                .ref("posts")
                .push({
                  ...newPost,
                  image: url,
                  statusUpdate: "Created",
                  date: formattedDate,
                  tags: tags,
                  category: categories,
                });
              setNewPost({
                title: "",
                description: "",
                image: "",
                author: "",
                date: "",
                postbrand: "",
              });
              setImageFile(null);
              setTags([]);
              setCategories([]);
              setSuccessMessage("Post added successfully."); // Set success message
            })
            .catch((error) => {
              console.error(error);
              setFailureMessage("Failed to fetch image URL."); // Set failure message
            });
        }
      );
    } else {
      // If no image is uploaded, add post to database without image
      firebase
        .database()
        .ref("posts")
        .push({
          ...newPost,
          statusUpdate: "Pending",
          date: formattedDate,
          tags: tags,
          category: categories,
        })
        .then(() => {
          setNewPost({
            title: "",
            description: "",
            image: "",
            author: "",
            date: "",
            postbrand: "",
          });
          setTags([]);
          setCategories([]);
          setSuccessMessage("Post added successfully."); // Set success message
        })
        .catch((error) => {
          console.error(error);
          setFailureMessage("Failed to add post."); // Set failure message
        });
    }
  };

  const [showEditor, setShowEditor] = useState(false);

  const handleOKClick = () => {
    setShowEditor(false); // Close the editor modal upon clicking OK
  };

  const handleEditorChange = (value) => {
    setNewPost({ ...newPost, description: value }); // Update the description in the state as the user edits
  };

  const handleDescriptionClick = () => {
    setShowEditor(true); // Open the editor modal when description input field is clicked
  };
  //modal editor2

  const [showEditor2, setShowEditor2] = useState(false);

  const handleDescriptionClick1 = () => {
    setShowEditor2(true); // Open the editor modal when description input field is clicked
  };

  const handleEditorChange2 = (value) => {
    setNewPost({ ...newPost, postbrand: value }); // Update the description in the state as the user edits
  };

  const handleEditorChangeOpen = (value) => {
    setNewPost({ ...newPost, title: value }); // Update the description in the state as the user edits
  };

  const handleOKClick2 = () => {
    setShowEditor2(false); // Close the editor modal upon clicking OK
  };

  const handleOKClickOpen = () => {
    setShowEditorOpen(false); // Close the editor modal upon clicking OK
  };

  //title handle model

  const [showEditorOpen, setShowEditorOpen] = useState(false);

  const handleDescriptionClickTitle = () => {
    setShowEditorOpen(true); // Open the editor modal when description input field is clicked
  };

  const [tags, setTags] = useState([]);

  const [categories, setCategories] = useState([]);

  const [inputValue, setInputValue] = useState("");

  const [inputValue1, setInputValue1] = useState("");

  const handleInputChange2 = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputChange3 = (event) => {
    setInputValue1(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const trimmedValue = inputValue.trim();
      if (trimmedValue !== "") {
        setTags([...tags, trimmedValue]);
        setInputValue("");
      }
    }
  };

  const handleKeyDown1 = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const trimmedValue = inputValue1.trim();
      if (trimmedValue !== "") {
        setCategories([...categories, trimmedValue]);
        setInputValue1("");
      }
    }
  };

  // Function to handle tag deletion
  const handleTagDelete = (tagIndex) => {
    setTags(tags.filter((_, index) => index !== tagIndex));
  };

  const handleTagDelete1 = (tagIndex) => {
    setCategories(categories.filter((_, index) => index !== tagIndex));
  };

  //update blog
  const [posts, setPosts] = useState([]); // State to store fetched blog posts
  const [selectedPost, setSelectedPost] = useState(null); // State to store the selected post

  const [editedPost, setEditedPost] = useState({
    title: "",
    description: "",
    image: "",
    author: "",
    postbrand: "",
    tags: [],
    category: [],
    statusUpdate: "edited",
  }); // State to store the edited post
  const [showEditor1, setShowEditor1] = useState(false);
  const [successMessage2, setSuccessMessage2] = useState("");

  const [showEditor3, setShowEditor3] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const postsRef = firebase.database().ref("posts");
      postsRef.on("value", (snapshot) => {
        const posts = snapshot.val();
        const postsList = [];
        for (let id in posts) {
          postsList.push({ id, ...posts[id] });
        }
        setPosts(postsList);
      });
    };

    fetchData();
  }, []);

  const [successMessage4, setSuccessMessage4] = useState("");

  const handlePostSelect = (postId) => {
    const selected = posts.find((post) => post.id === postId);
    setSelectedPost(selected);
    setEditedPost({ ...selected, statusUpdate: "edited" });
  };

  const handleUpdateContent = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    // Update the post in the database
    firebase
      .database()
      .ref(`posts/${selectedPost.id}`)
      .set({ ...editedPost, date: formattedDate, tags: editedPost.tags })
      .then(() => {
        setSuccessMessage4("Post updated successfully.");
        console.log("Post updated successfully.");
        // Optionally, you can clear the form fields or show a success message
      })
      .catch((error) => {
        console.error("Error updating post:", error);
        // Optionally, you can show an error message
      });
  };

  const [showEditorOpen1, setShowEditorOpen1] = useState("");

  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setEditedPost({ ...editedPost, [name]: value });
  };
  const handleDescriptionEdit = () => {
    setShowEditor1(true);
  };

  const handleDescriptionEditOpen = () => {
    setShowEditorOpen1(true);
  };

  const handleDescriptionEdit1 = () => {
    setShowEditor3(true);
  };

  const handleCloseEditor = () => {
    setShowEditor1(false);
  };

  const handleCloseEditorOpen1 = () => {
    setShowEditorOpen1(false);
  };

  const handleCloseEditorOpen = () => {
    setShowEditorOpen1(false);
  };

  const handleCloseEditor1 = () => {
    setShowEditor3(false);
  };

  const handleEditorChange1 = (value) => {
    setEditedPost({ ...editedPost, description: value });
  };

  const handleEditorChangeOpen1 = (value) => {
    setEditedPost({ ...editedPost, title: value });
  };

  const handleEditorChange3 = (value) => {
    setEditedPost({ ...editedPost, postbrand: value });
  };

  const [selectedPost2, setSelectedPost2] = useState(null);
  const [successMessage3, setSuccessMessage3] = useState("");

  const handlePostSelect1 = (postId) => {
    setSelectedPost2(posts.find((post) => post.id === postId));
  };

  const handleImageChange1 = (e) => {
    const file = e.target.files[0];
    const uploadTask = storage
      .ref(`images/${selectedPost.title}/${file.name}`)
      .put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress function
      },
      (error) => {
        console.error(error);
      },
      () => {
        // Completion function
        storage
          .ref(`images/${selectedPost.title}`)
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            setEditedPost({ ...editedPost, image: url });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    );
  };

  const [tags1, setTags1] = useState([]);

  const handleTagChange = (e, index) => {
    const newTags = [...editedPost.tags];
    newTags[index] = e.target.value;
    setEditedPost({ ...editedPost, tags: newTags });
  };

  const handleTagDelete2 = (index) => {
    const newTags = [...editedPost.tags];
    newTags.splice(index, 1);
    setEditedPost({ ...editedPost, tags: newTags });
  };

  const handleInputChange4 = (event) => {
    setInputValue2(event.target.value);
  };

  const handleInputChange5 = (event) => {
    setInputValue3(event.target.value);
  };
  const [inputValue3, setInputValue3] = useState("");

  const handleKeyDown2 = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const trimmedValue = inputValue2.trim();
      if (trimmedValue !== "") {
        setEditedPost({
          ...editedPost,
          tags: [...editedPost.tags, trimmedValue],
        });
        setInputValue2("");
      }
    }
  };

  const handleKeyDown3 = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const trimmedValue = inputValue3.trim();
      if (trimmedValue !== "") {
        setEditedPost({
          ...editedPost,
          category: [...editedPost.category, trimmedValue],
        });
        setInputValue3("");
      }
    }
  };

  const [inputValue2, setInputValue2] = useState("");

  const handleCategoryChange = (e, index) => {
    const newCategories = [...editedPost.category];
    newCategories[index] = e.target.value;
    setEditedPost({ ...editedPost, category: newCategories });
  };

  const handleCategoryDelete = (index) => {
    const newCategories = [...editedPost.category];
    newCategories.splice(index, 1);
    setEditedPost({ ...editedPost, category: newCategories });
  };

  //delete blog
  const handleDeletePost = () => {
    firebase
      .database()
      .ref(`posts/${selectedPost2.id}`)
      .update({ statusUpdate: "Deleted" })
      .then(() => {
        setSuccessMessage3("Post deleted successfully.");
        setPosts(posts.filter((post) => post.id !== selectedPost2.id));
        setSelectedPost2(null);
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  //tab section
  const [activeSection, setActiveSection] = useState("addBlogPost");

  const handleTabClick = (section) => {
    setActiveSection(section);
  };

  return (
    <>
      <Header />
      <section className="section" id="blog-edit">
        <div className="d-flex justify-content-center my-4 main-content">
          <button
            className={`btn ${
              activeSection === "addBlogPost"
                ? "custom-blue-btn"
                : "btn-primary"
            }`}
            onClick={() => handleTabClick("addBlogPost")}
          >
            Add Blog Post
          </button>
          <div className="mx-2"></div>
          <button
            className={`btn ${
              activeSection === "updateBlogPost"
                ? "custom-green-btn"
                : "btn-secondary"
            }`}
            onClick={() => handleTabClick("updateBlogPost")}
          >
            Update Blog Post
          </button>
          <div className="mx-2"></div>
          <button
            className={`btn ${
              activeSection === "deleteBlogPost"
                ? "custom-orange-btn"
                : "btn-warning"
            }`}
            onClick={() => handleTabClick("deleteBlogPost")}
          >
            Delete Blog Post
          </button>
        </div>
        {/*blog section*/}
        {activeSection === "addBlogPost" && (
          <>
            <Container className="d-flex justify-content-center">
              <div className="p-4 bg-white  blog-slide">
                <h1
                  style={{
                    color: "#28a745",
                    textAlign: "center",
                    textTransform: "uppercase",
                    fontSize: "30px",
                  }}
                >
                  Add Blog Post
                </h1>

                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formTitle">
                    <Form.Label
                      style={{
                        fontWeight: "bold",
                        marginTop: "10px",
                        outline: "none",
                      }}
                    >
                      Title
                    </Form.Label>
                    <Form.Control
                      style={{ borderRadius: "8px" }}
                      type="text"
                      name="title"
                      value={newPost.title}
                      onClick={handleDescriptionClickTitle}
                      placeholder="Title"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formDescription">
                    <Form.Label
                      style={{
                        fontWeight: "bold",
                        marginTop: "10px",
                        outline: "none",
                      }}
                    >
                      Description
                    </Form.Label>
                    <Form.Control
                      style={{ borderRadius: "8px" }}
                      type="text"
                      name="description"
                      value={newPost.description}
                      onClick={handleDescriptionClick} // Open editor modal when clicked
                      placeholder="Description"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formImage">
                    <Form.Label
                      style={{
                        fontWeight: "bold",
                        marginTop: "10px",
                        outline: "none",
                      }}
                    >
                      Upload Image
                    </Form.Label>
                    <Form.Control
                      style={{ borderRadius: "8px" }}
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </Form.Group>
                  <Form.Group controlId="formAuthor">
                    <Form.Label
                      style={{
                        fontWeight: "bold",
                        marginTop: "10px",
                        outline: "none",
                      }}
                    >
                      Author
                    </Form.Label>
                    <Form.Control
                      style={{ borderRadius: "8px" }}
                      type="text"
                      name="author"
                      value={newPost.author}
                      onChange={handleInputChange}
                      placeholder="Author"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formBrandName">
                    <Form.Label
                      style={{
                        fontWeight: "bold",
                        marginTop: "10px",
                        outline: "none",
                      }}
                    >
                      Brand Name
                    </Form.Label>
                    <Form.Control
                      style={{ borderRadius: "8px" }}
                      type="text"
                      name="brandName"
                      value={newPost.postbrand}
                      onClick={handleDescriptionClick1} // Open editor modal when clicked
                      placeholder="Brand Description"
                      required
                    />
                  </Form.Group>
                  <label
                    style={{
                      fontWeight: "bold",
                      marginTop: "10px",
                      outline: "none",
                    }}
                  >
                    Tags
                  </label>
                  <br></br>
                  <Form.Group
                    className="tags-input"
                    style={{ width: "500px", padding: "8px" }}
                  >
                    <ul id="tags" />
                    {tags.map((tag, index) => (
                      <li key={index}>
                        {tag}{" "}
                        <button
                          className="delete-button"
                          onClick={() => handleTagDelete(index)}
                        >
                          X
                        </button>
                      </li>
                    ))}
                    <input
                      id="input-tag"
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange2}
                      onKeyDown={handleKeyDown}
                    />
                  </Form.Group>
                  <br></br>
                  <label
                    style={{
                      fontWeight: "bold",
                      marginTop: "10px",
                      outline: "none",
                    }}
                  >
                    Category
                  </label>
                  <br></br>
                  <Form.Group
                    className="tags-input"
                    style={{ width: "500px", padding: "8px" }}
                  >
                    <ul id="categories" />
                    {categories.map((category, index) => (
                      <li key={index}>
                        {category}{" "}
                        <button
                          className="delete-button"
                          onClick={() => handleTagDelete1(index)}
                        >
                          X
                        </button>
                      </li>
                    ))}
                    <input
                      id="input-category"
                      type="text"
                      value={inputValue1}
                      onChange={handleInputChange3}
                      onKeyDown={handleKeyDown1}
                    />
                  </Form.Group>

                  <br></br>
                  <br></br>
                  <Button type="submit" className="blog-button">
                    Add Post
                  </Button>
                </Form>
                {successMessage && (
                  <Alert variant="success" className="mt-3">
                    {successMessage}
                  </Alert>
                )}
              </div>
              {/* Editor Modal */}
              <Modal show={showEditor} onHide={() => setShowEditor(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Description</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ReactQuill
                    value={newPost.description}
                    onChange={handleEditorChange}
                    modules={{
                      toolbar: [
                        [{ header: "1" }, { header: "2" }, { font: [] }],
                        [{ size: [] }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [
                          { list: "ordered" },
                          { list: "bullet" },
                          { indent: "-1" },
                          { indent: "+1" },
                        ],
                        ["link", "image", "video"],
                        ["clean"],
                      ],
                    }}
                    formats={[
                      "header",
                      "font",
                      "size",
                      "bold",
                      "italic",
                      "underline",
                      "strike",
                      "blockquote",
                      "list",
                      "bullet",
                      "indent",
                      "link",
                      "image",
                      "video",
                    ]}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setShowEditor(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleOKClick}>
                    OK
                  </Button>
                </Modal.Footer>
              </Modal>
              {/* 2 Editor Modal */}
              <Modal show={showEditor2} onHide={() => setShowEditor2(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Brand Description</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ReactQuill
                    value={newPost.postbrand}
                    onChange={handleEditorChange2}
                    modules={{
                      toolbar: [
                        [{ header: "1" }, { header: "2" }, { font: [] }],
                        [{ size: [] }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [
                          { list: "ordered" },
                          { list: "bullet" },
                          { indent: "-1" },
                          { indent: "+1" },
                        ],
                        ["link", "image", "video"],
                        ["clean"],
                      ],
                    }}
                    formats={[
                      "header",
                      "font",
                      "size",
                      "bold",
                      "italic",
                      "underline",
                      "strike",
                      "blockquote",
                      "list",
                      "bullet",
                      "indent",
                      "link",
                      "image",
                      "video",
                    ]}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setShowEditor2(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleOKClick2}>
                    OK
                  </Button>
                </Modal.Footer>
              </Modal>
              {/*Title modal*/}
              <Modal
                show={showEditorOpen}
                onHide={() => setShowEditorOpen(false)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Edit Title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ReactQuill
                    value={newPost.title}
                    onChange={handleEditorChangeOpen}
                    modules={{
                      toolbar: [
                        [{ header: "1" }, { header: "2" }, { font: [] }],
                        [{ size: [] }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [
                          { list: "ordered" },
                          { list: "bullet" },
                          { indent: "-1" },
                          { indent: "+1" },
                        ],
                        ["link", "image", "video"],
                        ["clean"],
                      ],
                    }}
                    formats={[
                      "header",
                      "font",
                      "size",
                      "bold",
                      "italic",
                      "underline",
                      "strike",
                      "blockquote",
                      "list",
                      "bullet",
                      "indent",
                      "link",
                      "image",
                      "video",
                    ]}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setShowEditorOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleOKClickOpen}>
                    OK
                  </Button>
                </Modal.Footer>
              </Modal>
            </Container>
            <br></br>
          </>
        )}

        {/*update blog*/}
        {activeSection === "updateBlogPost" && (
          <Container className="d-flex justify-content-center">
            <div className="p-4 bg-white  blog-slide">
              <h1
                style={{
                  color: "#28a745",
                  textAlign: "center",
                  textTransform: "uppercase",
                  fontSize: "30px",
                }}
              >
                Update Blog Post
              </h1>

              <Form>
                <Form.Group controlId="formTitle">
                  <Form.Label style={{ fontWeight: "bold", outline: "none" }}>
                    Select Title
                  </Form.Label>
                  <Form.Control
                    style={{ borderRadius: "8px" }}
                    as="select"
                    onChange={(e) => handlePostSelect(e.target.value)}
                  >
                    <option value="">Select</option>
                    {posts.map((post) => (
                      <option key={post.id} value={post.id}>
                        {post.title}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                {selectedPost && (
                  <>
                    <Form.Group controlId="formTitle">
                      <Form.Label
                        style={{ fontWeight: "bold", outline: "none" }}
                      >
                        Title
                      </Form.Label>
                      <Form.Control
                        style={{ borderRadius: "8px" }}
                        type="text"
                        name="title"
                        value={editedPost.title}
                        onClick={handleDescriptionEditOpen}
                        placeholder="Title"
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                      <Form.Label
                        style={{ fontWeight: "bold", outline: "none" }}
                      >
                        Description
                      </Form.Label>
                      <Form.Control
                        style={{ borderRadius: "8px" }}
                        type="text"
                        name="description"
                        value={editedPost.description}
                        onClick={handleDescriptionEdit}
                        placeholder="Description"
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="formImage">
                      <Form.Label
                        style={{ fontWeight: "bold", outline: "none" }}
                      >
                        Upload Image
                      </Form.Label>
                      <Form.Control
                        style={{ borderRadius: "8px" }}
                        type="file"
                        onChange={handleImageChange1}
                        accept="image/*"
                      />
                    </Form.Group>
                    {editedPost.image && (
                      <div>
                        <p>Current Image:</p>
                        <img
                          src={editedPost.image}
                          alt="Current"
                          style={{ maxWidth: "100px" }}
                        />
                      </div>
                    )}
                    <Form.Group controlId="formAuthor">
                      <Form.Label
                        style={{ fontWeight: "bold", outline: "none" }}
                      >
                        Author
                      </Form.Label>
                      <Form.Control
                        style={{ borderRadius: "8px" }}
                        type="text"
                        name="author"
                        value={editedPost.author}
                        onChange={handleInputChange1}
                        placeholder="Author"
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="formBrandName">
                      <Form.Label
                        style={{ fontWeight: "bold", outline: "none" }}
                      >
                        Brand Description
                      </Form.Label>
                      <Form.Control
                        style={{ borderRadius: "8px" }}
                        type="text"
                        name="brandName"
                        value={editedPost.postbrand}
                        onClick={handleDescriptionEdit1}
                        placeholder="Brand Description"
                        required
                      />
                    </Form.Group>
                    <label
                      style={{
                        fontWeight: "bold",
                        marginTop: "10px",
                        outline: "none",
                      }}
                    >
                      Tags
                    </label>
                    <br></br>
                    <Form.Group
                      className="tags-input"
                      style={{ width: "400px", padding: "8px" }}
                    >
                      <ul id="tags" />
                      {editedPost.tags &&
                        editedPost.tags.map((tag, index) => (
                          <li key={index}>
                            <input
                              type="text"
                              value={tag}
                              onChange={(e) => handleTagChange(e, index)}
                            />
                            <button
                              className="delete-button"
                              onClick={() => handleTagDelete2(index)}
                            >
                              X
                            </button>
                          </li>
                        ))}
                      <input
                        id="input-tag"
                        type="text"
                        value={inputValue2}
                        onChange={handleInputChange4}
                        onKeyDown={handleKeyDown2}
                        placeholder="Add a tag"
                      />
                    </Form.Group>
                    <br></br>

                    <label
                      style={{
                        fontWeight: "bold",
                        marginTop: "10px",
                        outline: "none",
                      }}
                    >
                      Categories
                    </label>
                    <br />
                    <Form.Group
                      className="tags-input"
                      style={{ width: "500px", padding: "8px" }}
                    >
                      <ul id="categories">
                        {editedPost.category &&
                          editedPost.category.map((category, index) => (
                            <li key={index}>
                              <input
                                type="text"
                                value={category}
                                onChange={(e) => handleCategoryChange(e, index)}
                              />
                              <button
                                className="delete-button"
                                onClick={() => handleCategoryDelete(index)}
                              >
                                X
                              </button>
                            </li>
                          ))}
                      </ul>
                      <input
                        id="input-category"
                        type="text"
                        value={inputValue3}
                        onChange={handleInputChange5}
                        onKeyDown={handleKeyDown3}
                        placeholder="Add a category"
                      />
                    </Form.Group>

                    <br></br>
                    <br></br>
                    <Button
                      variant="primary"
                      onClick={handleUpdateContent}
                      style={{
                        textAlign: "center",
                        marginLeft: "30%",
                        width: "40%",
                        borderRadius: "8px",
                      }}
                    >
                      Update Post
                    </Button>
                  </>
                )}
              </Form>
            </div>
            <Modal show={showEditor1} onHide={handleCloseEditor}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Description</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ReactQuill
                  value={editedPost.description}
                  onChange={handleEditorChange1}
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ size: [] }],
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                      ],
                      ["link", "image", "video"],
                      ["clean"],
                    ],
                  }}
                  formats={[
                    "header",
                    "font",
                    "size",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "bullet",
                    "indent",
                    "link",
                    "image",
                    "video",
                  ]}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEditor}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleCloseEditor}>
                  Save
                </Button>
              </Modal.Footer>
              {successMessage4 && (
                <Alert variant="success" className="mt-3">
                  {successMessage4}
                </Alert>
              )}
            </Modal>

            <Modal show={showEditor3} onHide={handleCloseEditor1}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Brand Description</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ReactQuill
                  value={editedPost.postbrand}
                  onChange={handleEditorChange3}
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ size: [] }],
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                      ],
                      ["link", "image", "video"],
                      ["clean"],
                    ],
                  }}
                  formats={[
                    "header",
                    "font",
                    "size",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "bullet",
                    "indent",
                    "link",
                    "image",
                    "video",
                  ]}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEditor1}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleCloseEditor1}>
                  Save
                </Button>
              </Modal.Footer>
              {successMessage4 && (
                <Alert variant="success" className="mt-3">
                  {successMessage4}
                </Alert>
              )}
            </Modal>
            {/*title description*/}
            <Modal show={showEditorOpen1} onHide={handleCloseEditorOpen}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Description</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ReactQuill
                  value={editedPost.title}
                  onChange={handleEditorChangeOpen1}
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ size: [] }],
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                      ],
                      ["link", "image", "video"],
                      ["clean"],
                    ],
                  }}
                  formats={[
                    "header",
                    "font",
                    "size",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "bullet",
                    "indent",
                    "link",
                    "image",
                    "video",
                  ]}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEditorOpen1}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleCloseEditorOpen1}>
                  Save
                </Button>
              </Modal.Footer>
              {successMessage4 && (
                <Alert variant="success" className="mt-3">
                  {successMessage4}
                </Alert>
              )}
            </Modal>
          </Container>
        )}
        <br></br>
        {/*delete blog*/}
        {activeSection === "deleteBlogPost" && (
          <Container className="d-flex justify-content-center">
            <div className="p-4 bg-white blog-slide">
              <h3
                style={{
                  color: "#28a745",
                  textAlign: "center",
                  textTransform: "uppercase",
                  fontSize: "30px",
                }}
              >
                Delete Blog Post
              </h3>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label style={{ fontWeight: "bold", outline: "none" }}>
                  Select Post
                </Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => handlePostSelect1(e.target.value)}
                  style={{ borderRadius: "8px" }}
                >
                  <option value="">Select</option>
                  {posts.map((post) => (
                    <option key={post.id} value={post.id}>
                      {post.title}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              {selectedPost2 && (
                <>
                  <p>Selected Title: {selectedPost2.title}</p>
                  <Button
                    variant="danger"
                    onClick={handleDeletePost}
                    style={{
                      textAlign: "center",
                      marginLeft: "35%",
                      width: "30%",
                      borderRadius: "8px",
                    }}
                  >
                    Delete Post
                  </Button>
                </>
              )}
              {successMessage3 && (
                <Alert variant="success" className="mt-3">
                  {successMessage3}
                </Alert>
              )}
            </div>
          </Container>
        )}
        <br></br>
      </section>
      <Footer />
    </>
  );
}

export default BlogEdit;
