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
import { getProfileInfo, setGoals } from '../services/profile.service'
//imports for dropdown menu
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

//backend function import
import { getJobs } from "../services/savedjob.service";


const Profile = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  //const [currentUser, setCurrentUser] = useState('');
  const [codingGoal, setCodingGoal] = useState('');
  const [codingProgress, setCodingProgress] = useState('');
  const goalOptions = [
    {label: '1', value: 1},
    {label: '2', value: 2},
    {label: '3', value: 3},
    {label: '4', value: 4},
    {label: '5', value: 5},
    {label: '6', value: 6},
    {label: '7', value: 7},
    {label: '8', value: 8},
    {label: '9', value: 9},
    {label: '10', value: 10}
  ]


  //use useEffect to run the getJobs function
  useEffect(() => {
    //below two lines are the axios get calls to our backend 
    jobGrabber();
    profileInfoGrabber();
    // setCodingGoal(currentUser.codingGoal.goal);
    // setCodingProgress(currentUser.codingGoal.progress);
  }, []);

  console.log('CURRENT USER', currentUser);

  //going to our backend and responding with the users savedJobs info
  const jobGrabber = () => {
    const jobData = axios
      .get("http://localhost:8080/profile/savedJobs", { headers: authHeader() })
      .then((jobData) => setAllJobs([jobData.data]));
    // .catch(err => console.log(err.message))
  };

  //going to our backend and responsing with the users profile info
  const profileInfoGrabber = () => {
    axios.get("http://localhost:8080/profile", {headers: authHeader()})
    .then(profileData => {
      setCurrentUser(profileData.data)
    })
  }

  ////////////code for the goals below:


  const result = Math.round((codingProgress / codingGoal) * 100);


  // const changeGoalProgress = (e, type) =>{
  //    console.log('EVENT', e)
  //     let id = currentUser.id
  //   if(type==="add"){
  //       setCodingProgress(codingProgress + 1);
  //       console.log('coding progress', codingProgress)
  //   }if(type==="subtract"){
  //       setCodingProgress(codingProgress - 1); 
  //   }
  //   setGoals(id, null, codingProgress, null, null)
  //   setCurrentUser(getCurrentUser());
  // }

  // const changeCodingGoal = (e) => {
  //   let id = currentUser.id
  //   console.log(e.value)
  //   setCodingGoal(e.value)
  //   console.log('coding goal', codingGoal)
  //   let codeGoal = e.value;
  //   setGoals(id, codeGoal, null, null, null)
  // }




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
            {/* <strong> Welcome {currentUser.username} </strong> */}
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
              {/* Goal: {codingGoal} &nbsp; Completed: {codingProgress} */}
              {/* <button onClick={(event) => {changeGoalProgress(event, "add")}}>{" "}+{" "} </button>
              <button onClick={(event) => {changeGoalProgress(event, "subtract")}}>{" "}-{" "} </button> */}
              Set a Coding Goal:
              {/* <Select options={goalOptions} onChange={(event)=> {changeCodingGoal(event)}}/> */}

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
