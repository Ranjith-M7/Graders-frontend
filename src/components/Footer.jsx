import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { database } from "./firebaseConfig";

function Footer() {
  const [footerData, setFooterData] = useState({
    text: "",
    titles: [],
    quickLinks: [],
    getInTouch: {
      address: "",
      email: "",
      phone: ""
    },
    socialLinks: {}
  });

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const snapshot = await database.ref("Footer").once("value");
        if (snapshot.exists()) {
          const data = snapshot.val();
          const { text, quickLinks, getInTouch, socialLinks } = data;
          setFooterData({
            text: text || "",
            titles: ["Quick Links","Get In Touch", "Follow Us"],
            quickLinks: quickLinks || [],
            getInTouch: getInTouch || { address: "", email: "", phone: "" },
            socialLinks: socialLinks || {}
          });
        } else {
          console.log("The footer data was not found in the database");
        }
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };

    fetchFooterData();
  }, []);

  return (
    <footer className="mt-5">
      <div className="container pt-5">
        <div className="row g-5 pt-4">
          <div className="col-lg-4 col-md-6">
            <h3 className="text-white mb-4">{footerData.titles[0]}</h3>
            <div className="d-flex flex-column justify-content-start">
              {footerData.quickLinks.map((link, index) => (
                <Link key={index} className="text-light mb-2" to={link.url}>
                  <i className="fa-solid fa-arrow-right me-2"></i>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <h3 className="text-white mb-4">{footerData.titles[1]}</h3>
            <div className="d-flex text-light flex-column justify-content-center align-items-start">
              <div className="mb-2">
                <i className="fa-solid fa-location-dot me-2"></i>
                {footerData.getInTouch.address}
              </div>
              <div className="mb-2">
                <i className="fa-regular fa-envelope me-2"></i>
                {footerData.getInTouch.email}
              </div>
              <div className="mb-2">
                <i className="fa-solid fa-phone me-2"></i>
                {footerData.getInTouch.phone}
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <h3 className="text-white mb-4">{footerData.titles[2]}</h3>
            <div className="d-flex flex-column justify-content-start social-container">
              <ul className="social-icons">
                {Object.keys(footerData.socialLinks).map((key, index) => (
                  <li key={index}>
                    <a href={footerData.socialLinks[key]}>
                      <i className={`fa-brands fa-${key.toLowerCase()}`}></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center p-5">
          <p dangerouslySetInnerHTML={{ __html: footerData.text }} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
