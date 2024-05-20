import React, { useEffect, useState } from "react";

import database from "./firebaseConfig";

function About() {
  const [aboutData, setAboutData] = useState({
    aboutContent: {
      title: "",
      subtitle: "",
      description: "",
      button: {
        text: "",
        link: "",
      },
    },
    faqContent: [],
  });
  console.log(aboutData.faqContent);
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const snapshot = await database.ref("About Section").once("value");
        if (snapshot.exists()) {
          const data = snapshot.val();
          const { About_Content, FAQ_Section } = data;

          // Filter out empty FAQ items
          const filteredFaqContent = FAQ_Section
            ? FAQ_Section.filter((item) => item.Question && item.Answer)
            : [];

          setAboutData({
            aboutContent: {
              title: About_Content.Title || "",
              subtitle: About_Content.Subtitle || "",
              description: About_Content.Description || "",
              button: {
                text: About_Content.Button.Text || "",
                link: About_Content.Button.link || "",
              },
            },
            faqContent: filteredFaqContent || [],
          });
        } else {
          console.log("The contact data was not found in the database");
        }
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };

    fetchAboutData();
  }, []);
  return (
    <div className="section about-us">
      <div className="container">
        <div className="row pt-5">
          <div className="col-lg-6 offset-lg-1">
            <div className="accordion" id="accordionExample">
              {aboutData.faqContent.map((item, index) => (
                <div key={index} className="accordion-item">
                  <h2 className="accordion-header" id={`heading${index}`}>
                    <button
                      className={`accordion-button ${
                        index === 0 ? "" : "collapsed"
                      }`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded={index === 1 ? "true" : "false"}
                      aria-controls={`collapse${index}`}
                    >
                      {item.Question}
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className={`accordion-collapse collapse ${
                      index === 0 ? "show" : ""
                    }`}
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">{item.Answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-5 align-self-center">
            <div className="section-heading">
              <h6>{aboutData.aboutContent.subtitle}</h6>
              <h2>{aboutData.aboutContent.title}</h2>
              <p>{aboutData.aboutContent.description}</p>
              <div className="main-button">
                <a href={aboutData.aboutContent.button.link}>
                  {aboutData.aboutContent.button.text}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
