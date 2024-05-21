import React, { useEffect, useState } from "react";

import database from "./firebaseConfig";

function Contact() {
  const [contactData, setContactData] = useState({
    sectionHeading: {
      title: "",
      subTitle: "",
      description: "",
    },
    specialOffer: {
      date: "",
      label: "",
      description: "",
      offerDiscount: "",
      offerText: "",
    },
  });

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const snapshot = await database.ref("Contact Section").once("value");
        if (snapshot.exists()) {
          const data = snapshot.val();
          const { Section_Heading, Special_Offer } = data;
          setContactData({
            sectionHeading: {
              title: Section_Heading.Title || "",
              subTitle: Section_Heading.Subtitle || "",
              description: Section_Heading.Description || "",
            },
            specialOffer: {
              description: Special_Offer.Description || "",
              date: Special_Offer.Date || "",
              label: Special_Offer.Label || "",
              offerDiscount: Special_Offer.Offer_Discount || "",
              offerText: Special_Offer.Offer_Text || "",
            },
          });
        } else {
          console.log("The contact data was not found in the database");
        }
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };

    fetchContactData();
  }, []);
  return (
    <div className="contact-us section" id="contact">
      <div className="container">
        <div className="row pt-5">
          <div className="col-lg-6  align-self-center">
            <div className="section-heading">
              <h6>{contactData.sectionHeading.subTitle}</h6>
              <h2>{contactData.sectionHeading.title}</h2>
              <p>{contactData.sectionHeading.description}</p>
              <div className="special-offer">
                <span className="offer">
                  {contactData.specialOffer.offerText}
                  <br />
                  <em>{contactData.specialOffer.offerDiscount}</em>
                </span>
                <h6>
                  {contactData.specialOffer.label}{" "}
                  <em>{contactData.specialOffer.date}</em>
                </h6>
                <h4>
                  {contactData.specialOffer.description}{" "}
                  <em>{contactData.specialOffer.offerDiscount}</em>{" "}
                  {contactData.specialOffer.offerText}
                </h4>
                <a href="#">
                  <i className="fa fa-angle-right" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="contact-us-content">
              <form id="contact-form" action="" method="post">
                <div className="row">
                  <div className="col-lg-12">
                    <fieldset>
                      <input
                        type="name"
                        name="name"
                        id="name"
                        placeholder="Your Name..."
                        autoComplete="on"
                        required=""
                      />
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        pattern="[^ @]*@[^ @]*"
                        placeholder="Your E-mail..."
                        required=""
                      />
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <textarea
                        name="message"
                        id="message"
                        placeholder="Your Message"
                        defaultValue={""}
                      />
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <button
                        type="submit"
                        id="form-submit"
                        className="orange-button"
                      >
                        Send Message Now
                      </button>
                    </fieldset>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
