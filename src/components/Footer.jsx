import React, { useEffect, useState } from "react";

import { database, firestore, storage } from "./firebaseConfig";

function Footer() {
  const [footerData, setFooterData] = useState({
    text: "",
  });

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const snapshot = await database.ref("Footer").once("value");
        if (snapshot.exists()) {
          const data = snapshot.val();
          const { Text } = data;
          setFooterData({
            text: Text || "",
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
    <footer>
      <div className="container">
        <div className="d-flex align-items-center justify-content-center p-5">
          <p dangerouslySetInnerHTML={{ __html: footerData.text }} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
