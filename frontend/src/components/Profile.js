import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../services/auth.service";
import axios from "axios";
import authHeader from "../utilities/authHeader.utilities";
import { Link } from "react-router-dom";
import { PieChart } from "react-minimal-pie-chart";
import "../css/App.css";
import "../css/profile.css";
import { Card, Button } from "react-bootstrap";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

//backend function import
import { getJobs } from "../services/savedjob.service";

const Profile = () => {
  const [allJobs, setAllJobs] = useState([]);
  const currentUser = getCurrentUser();
  const [codingGoal, setCodingGoal] = useState([]);
  const [codingProgress, setCodingProgress] = useState([]);
  const [allGoals, setAllGoals] = useState([])

  //use useEffect to run the getJobs function
  useEffect(() => {
    jobGrabber();
    setCodingGoal(currentUser.codingGoal.goal);
    setCodingProgress(currentUser.codingGoal.progress);
  }, []);

  const jobGrabber = () => {
    const jobData = axios
      .get("http://localhost:8080/profile/savedJobs", { headers: authHeader() })
      .then((jobData) => setAllJobs([jobData.data]));
    // .catch(err => console.log(err.message))
  };

  ////////////code for the goals below:

  console.log("this is the current user stats", currentUser);

  const result = Math.round((codingProgress / codingGoal) * 100);

  const add = () => {
    setCodingProgress(codingProgress + 1);
  };

  const subtract = () => {
    setCodingProgress(codingProgress - 1);
  };




  console.log("THIS IS GOAL DATA", allGoals)
  //end of goal code

  const listJobs = () => {
    if (allJobs.length > 0) {
      return allJobs[0].allJobs.map((job, index) => (
        <div id="card">
          <Card body>
            <ul>
              <li key={index}>
                {" "}
                <b> Company:</b> {job.company} <br></br> <b> Job Title:</b>{" "}
                {job.jobTitle}
              </li>
            </ul>
          </Card>
        </div>
      ));
    }
  };

  if (allJobs.length > 0) {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3 id="user">
            <strong> Welcome {currentUser.username} </strong>
          </h3>
        </header>

        <h2>{allJobs.appliedToJobs && allJobs.appliedToJobs[0].company}</h2>
        {/* <h3>All Jobs: {allJobs[0].allJobs.length} </h3>
        <h3>Applied: {allJobs[0].appliedToJobs.length} </h3>
        <h3>Heard Back: {allJobs[0].heardBackJobs.length} </h3>
        <h3>Denied: {allJobs[0].deniedFromJobs.length} </h3> */}

        <h2 id="savedJobs"> Saved Jobs: </h2>
        <div id="container">
          <div id="jobList">{listJobs()}</div>

          <div id="bigPie">
            <div id="pie">
              <h2 id="applied">
                {" "}
                Applied to: {allJobs[0].appliedToJobs.length}{" "}
              </h2>
              <PieChart
                style={{ marginLeft: "vw", height: "200px", width: "200px" }}
                data={[
                  {
                    title: "Heard Back: ",
                    value: allJobs[0].heardBackJobs.length,
                    color: "#20B2AA",
                  },
                  {
                    title: "Waiting: ",
                    value:
                      allJobs[0].appliedToJobs.length -
                      allJobs[0].heardBackJobs.length,
                    color: "#90EE90",
                  },
                ]}
                //   label={({ dataEntry }) => dataEntry.title}
                label={({ dataEntry }) =>
                  `${dataEntry.title} ${Math.round(dataEntry.percentage)} %`
                }
              />
            </div>

            <div id="pie2">
              <h2 id="heardBack">
                {" "}
                Heard Back: {allJobs[0].heardBackJobs.length}{" "}
              </h2>
              <PieChart
                style={{ marginLeft: "vw", height: "200px", width: "200px" }}
                data={[
                  {
                    title: "Moved Fwrd: ",
                    value: allJobs[0].appliedToJobs.length,
                    color: "#DB7093",
                  },
                  {
                    title: "Rejected: ",
                    value: allJobs[0].deniedFromJobs.length,
                    color: "#ff000080",
                  },
                ]}
                //   label={({ dataEntry }) => dataEntry.title}
                label={({ dataEntry }) =>
                  `${dataEntry.title} ${Math.round(dataEntry.percentage)} %`
                }
              />
            </div>
          </div>
          <div id="progress">
            <h3 id="goalChart"> Coding Goal:</h3>

            <Progress
              theme={{
                success: {
                  symbol: "🎉‍",
                  color: "rgb(50, 205, 50)",
                },
                active: {
                  symbol: "😀",
                  color: "#fbc630",
                },
                default: {
                  symbol: "😱",
                  color: "#FF6347",
                },
              }}
              percent={result}
              status="success"
            />

            <div id="goalTextDiv">
              {" "}
              Goal: {codingGoal} &nbsp; Completed: {codingProgress}
              <button onClick={(event) => {{add(event);}}}>{" "}+{" "} </button>
              <button onClick={(event) => {{subtract(event);}}}>{" "}-{" "} </button>
            </div>
          </div>
        </div>
        <Link to={"/profile/savedjobs"} className="nav-link">
          saved Jobs{" "}
        </Link>
      </div>
    );
  }
  return <div> loading </div>;
};

export default Profile;
