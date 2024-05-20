import React from "react";

function Contact() {
  return (
    <div className="contact-us section" id="contact">
      <div className="container">
        <div className="row pt-5">
          <div className="col-lg-6  align-self-center">
            <div className="section-heading">
              <h6>Contact Us</h6>
              <h2>Feel free to contact us anytime</h2>
              <p>
                Thank you for choosing our templates. We provide you best CSS
                templates at absolutely 100% free of charge. You may support us
                by sharing our website to your friends.
              </p>
              <div className="special-offer">
                <span className="offer">
                  off<br /><em>50%</em>
                </span>
                <h6>
                  Valid: <em>24 April 2036</em>
                </h6>
                <h4>
                  Special Offer <em>50%</em> OFF!
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
