import React, { useEffect, useState } from "react";
import database from "./firebaseConfig";

import img from "../assets/images/member-04.jpg";

function Team() {
  const [teamData, setTeamData] = useState([]);
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const snapshot = await database.ref("Team Section").once("value");
        if (snapshot.exists()) {
          const data = snapshot.val();

          // Convert the object data into an array
          const teamArray = Object.values(data);

          setTeamData(teamArray);
        } else {
          console.log("The team data was not found in the database");
        }
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };

    fetchTeamData();
  }, []);
  return (
    <div className="team section" id="team">
      <div className="container">
        <div className="row pt-5">
          {teamData.map((member, index) => (
            <div key={index} className="col-lg-3 col-md-6">
              <div className="team-member">
                <div className="main-content">
                  <img src={img} alt="" />
                  <span className="category">{member.Category}</span>
                  <h4>{member.Name}</h4>
                  <ul className="social-icons">
                    <li>
                      <a href="#">
                        <i className="fab fa-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-linkedin" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Team;
