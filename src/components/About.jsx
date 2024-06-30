import React, { useEffect, useState } from "react";

import { database, firestore, storage } from "./firebaseConfig";

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
          console.log("The about data was not found in the database");
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
              {/* {aboutData.faqContent.map((item, index) => (
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
                      What Makes Us The Best Academy Online?
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
              ))} */}

              {/* accordion 1 */}

              <div className="accordion-item">
                <h2 className="accordion-header" id={`headingOne`}>
                  <button
                    className={`accordion-button`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapseOne`}
                    aria-expanded={true}
                    aria-controls={`collapseOne`}
                  >
                    What Makes Us The Best Academy Online?
                  </button>
                </h2>
                <div
                  id={`collapseOne`}
                  className={`accordion-collapse collapse show`}
                  aria-labelledby={`headingOne`}
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      GRADERS stands out as the best online academy for several
                      reasons:
                    </p>
                    <ul className="point-list">
                      <li>
                        <strong>Proven Success:</strong> Our alumni have
                        achieved significant success in their careers,
                        attributing their accomplishments to our courses.
                      </li>
                      <li>
                        <strong>Innovative Learning:</strong> We leverage the
                        latest technology and teaching methods to provide an
                        innovative learning experience.
                      </li>
                      <li>
                        <strong>Commitment to Quality:</strong> We are dedicated
                        to delivering high-quality education that meets the
                        highest standards.
                      </li>
                      <li>
                        <strong>Accessibility:</strong> Our courses are designed
                        to be accessible to everyone, regardless of their
                        location or background.
                      </li>
                      <li>
                        <strong>Customer Satisfaction:</strong> We have a high
                        rate of customer satisfaction, with many students
                        returning for additional courses.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* accordion 2 */}

              <div className="accordion-item">
                <h2 className="accordion-header" id={`headingTwo`}>
                  <button
                    className={`accordion-button collapsed`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapseTwo`}
                    aria-expanded={false}
                    aria-controls={`collapseTwo`}
                  >
                    How Can We Add Value?
                  </button>
                </h2>
                <div
                  id={`collapseTwo`}
                  className={`accordion-collapse collapse`}
                  aria-labelledby={`headingTwo`}
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      GRADERS is committed to providing value beyond just
                      education. Here’s how we add value to your learning
                      journey:
                    </p>
                    <ul className="point-list">
                      <li>
                        <strong>Career Guidance:</strong> We offer career
                        counseling and guidance to help you navigate your
                        professional path.
                      </li>
                      <li>
                        <strong>Networking Opportunities:</strong> Connect with
                        peers, instructors, and industry professionals through
                        our platform.
                      </li>
                      <li>
                        <strong>Practical Skills:</strong> Our courses focus on
                        practical, real-world skills that are immediately
                        applicable in the workplace.
                      </li>
                      <li>
                        <strong>Certifications:</strong> Earn recognized
                        certifications that can boost your resume and career
                        prospects.
                      </li>
                      <li>
                        <strong>Resource Library:</strong> Access a vast library
                        of resources, including eBooks, articles, and case
                        studies to supplement your learning.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* accordion 3 */}

              <div className="accordion-item">
                <h2 className="accordion-header" id={`headingThree`}>
                  <button
                    className={`accordion-button collapsed`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapseThree`}
                    aria-expanded={false}
                    aria-controls={`collapseThree`}
                  >
                    How Do We Work Together?
                  </button>
                </h2>
                <div
                  id={`collapseThree`}
                  className={`accordion-collapse collapse`}
                  aria-labelledby={`headingThree`}
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      At GRADERS, we believe in a collaborative approach to
                      education. Here’s how we work together to ensure your
                      success:
                    </p>
                    <ul className="point-list">
                      <li>
                        <strong>Personalized Learning Plans:</strong> We create
                        personalized learning plans tailored to your goals and
                        needs.
                      </li>
                      <li>
                        <strong>Regular Feedback:</strong> Receive regular
                        feedback on your progress from instructors and peers.
                      </li>
                      <li>
                        <strong>Community Support:</strong> Join a vibrant
                        community of learners who support and motivate each
                        other.
                      </li>
                      <li>
                        <strong>Interactive Sessions:</strong> Participate in
                        interactive live sessions and discussions to deepen your
                        understanding.
                      </li>
                      <li>
                        <strong>Continuous Improvement:</strong> We continually
                        update our courses and content based on feedback and
                        industry trends.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* accordion 4 */}

              <div className="accordion-item">
                <h2 className="accordion-header" id={`headingFour`}>
                  <button
                    className={`accordion-button collapsed`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapseFour`}
                    aria-expanded={false}
                    aria-controls={`collapseFour`}
                  >
                    Why GRADERS is the Best?
                  </button>
                </h2>
                <div
                  id={`collapseFour`}
                  className={`accordion-collapse collapse`}
                  aria-labelledby={`headingFour`}
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      GRADERS stands out as the best online academy for several
                      reasons:
                    </p>
                    <ul className="point-list">
                      <li>
                        <strong>Proven Success:</strong> Our alumni have
                        achieved significant success in their careers,
                        attributing their accomplishments to our courses.
                      </li>
                      <li>
                        <strong>Innovative Learning:</strong> We leverage the
                        latest technology and teaching methods to provide an
                        innovative learning experience.
                      </li>
                      <li>
                        <strong>Commitment to Quality:</strong> We are dedicated
                        to delivering high-quality education that meets the
                        highest standards.
                      </li>
                      <li>
                        <strong>Accessibility:</strong> Our courses are designed
                        to be accessible to everyone, regardless of their
                        location or background.
                      </li>
                      <li>
                        <strong>Customer Satisfaction:</strong> We have a high
                        rate of customer satisfaction, with many students
                        returning for additional courses.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* accordion 5 */}

              <div className="accordion-item">
                <h2 className="accordion-header" id={`headingFive`}>
                  <button
                    className={`accordion-button collapsed`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapseFive`}
                    aria-expanded={false}
                    aria-controls={`collapseFive`}
                  >
                    Do We Help with Placements?
                  </button>
                </h2>
                <div
                  id={`collapseFive`}
                  className={`accordion-collapse collapse`}
                  aria-labelledby={`headingFive`}
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      Yes, we do! At GRADERS, we go the extra mile to ensure our
                      students’ success in the job market:
                    </p>
                    <ul className="point-list">
                      <li>
                        <strong>Placement Assistance:</strong> We offer
                        dedicated placement assistance to help you find the
                        right job opportunities.
                      </li>
                      <li>
                        <strong>Resume Building:</strong> Get expert help in
                        building a compelling resume that stands out to
                        employers.
                      </li>
                      <li>
                        <strong>Interview Preparation:</strong> Participate in
                        mock interviews and receive feedback to improve your
                        interview skills.
                      </li>
                      <li>
                        <strong>Job Listings:</strong> Access exclusive job
                        listings and opportunities through our network of
                        industry partners.
                      </li>
                      <li>
                        <strong>Alumni Network:</strong> Benefit from our
                        extensive alumni network, which can provide valuable job
                        referrals and advice.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
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
