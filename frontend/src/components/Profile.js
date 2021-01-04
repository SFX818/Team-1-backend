import React, { useState, useEffect } from "react";
// import { getCurrentUser } from "../services/auth.service";
import axios from "axios";
import authHeader from "../utilities/authHeader.utilities";
import { Link } from "react-router-dom";
import { PieChart } from "react-minimal-pie-chart";
import "../css/App.css";
import "../css/profile.css";
import { Card, Button } from "react-bootstrap";
// import { Progress } from "react-sweet-progress";
// import "react-sweet-progress/lib/style.css";
import { getProfileInfo, editGoals } from '../services/profile.service'
//imports for dropdown menu
// import Select from 'react-select';
// import 'bootstrap/dist/css/bootstrap.min.css';

//backend function import
import { getJobs } from "../services/savedjob.service";

//component import 
import GoalMeter from '../components/GoalMeter';
import PieCharts from '../components/PieCharts';


const Profile = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [codingGoal, setCodingGoal] = useState('');
  const [codingProgress, setCodingProgress] = useState('');
  const [appGoal, setAppGoal] = useState('');
  const [appProgress, setAppProgress] = useState('');

  // const goalOptions = [
  //   {label: '1', value: 1},
  //   {label: '2', value: 2},
  //   {label: '3', value: 3},
  //   {label: '4', value: 4},
  //   {label: '5', value: 5},
  //   {label: '6', value: 6},
  //   {label: '7', value: 7},
  //   {label: '8', value: 8},
  //   {label: '9', value: 9},
  //   {label: '10', value: 10}
  // ]


  //use useEffect to make calls to the backend and return users job and profile info
  useEffect(() => {
    jobGrabber();
    profileInfoGrabber();
  }, []);


  //going to our backend and responding with the users savedJobs info and saving it to the jobData state
  const jobGrabber = () => {
    const jobData = axios
      .get("http://localhost:8080/profile/savedJobs", { headers: authHeader() })
      .then((jobData) => setAllJobs([jobData.data]));
    // .catch(err => console.log(err.message))
  };

  //going to our backend and responsing with the users profile info and setting the currentUser state and the 4 goal states 
  const profileInfoGrabber = async () => {
    try {
      const profileData = await axios.get('http://localhost:8080/profile', {headers: authHeader()})
      //console.log('getProfileInfo response', profileData.data);
      //after get call returns profile data, set all states to respective user data
      setCurrentUser(profileData.data)
      setCodingGoal(profileData.data.codingGoal.goal);
      setCodingProgress(profileData.data.codingGoal.progress);
      setAppGoal(profileData.data.appGoal.goal);
      setAppProgress(profileData.data.appGoal.progress);
      
      //return await response.data;
    } catch (err){
      console.log('profile get info route error', err)
    }
  }

  ////////////code for the goals below:


  // const result = Math.round((codingProgress / codingGoal) * 100);
  // const result2 = Math.round((appProgress / appGoal) * 100);

  //FOR GOALS: needed this use effect for the editGoals backend route because it was taking state too long to update. It will run the editGoal function everytime there is a change to codingProgress
  useEffect(() => {
    let id = currentUser.id
    editGoals(id, null, codingProgress, null, null)
  }, [codingProgress])

  //FOR GOALS: function that is connected to the + and - buttons in the GoalMeter component to change code goal progress. This change in info will then trigger the useEffect above
  const changeGoalProgress = (type) => {
    if(type==="add"){
        setCodingProgress(codingProgress + 1);
    }if(type==="subtract"){
        setCodingProgress(codingProgress - 1); 
    }
  }

  //FOR GOALS: function that allows users to set a goal for coding problems
  const changeCodingGoal = (e) => {
    let id = currentUser.id
    setCodingGoal(e.value)
    let codeGoal = e.value;
    editGoals(id, codeGoal, null, null, null)
  }

  //FOR GOALS: useEffect that allows the state change to catch up before doing the call to the backend 
  useEffect(() => {
    let id = currentUser.id
    editGoals(id, null, null, null, appProgress)
  }, [appProgress])

  //FOR GOALS: function connected to + and  - buttons in the GoalMeter component to change progress of applications submitted, changed values to be used in the useEffect above
  const changeAppProgress = (type) => {
    if(type==="add"){
        setAppProgress(appProgress + 1);
    }if(type==="subtract"){
        setAppProgress(appProgress - 1); 
    }
  }

  //FOR GOALS: function that allows user to set a goal for the amount of applications they want to submit
  const changeAppGoal = (e) => {
    let id = currentUser.id
    setAppGoal(e.value)
    let appGoal = e.value;
    editGoals(id, null, null, appGoal, null)
  }


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
            {/* <div id="pie">
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
            </div> */}
            <PieCharts allJobs={allJobs}/>

            {/* <div id="pie2">
              <h2 id="heardBack">
                {" "}
                Heard Back: {allJobs[0].heardBackJobs.length}{" "}
              </h2>
              <PieChart
                style={{ marginLeft: "vw", height: "200px", width: "200px" }}
                data={[
                  {
                    title: "Moved Fwrd: ",
                    value: allJobs[0].inProgressJobs.length,
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
            </div> */}
          </div>
          <div id="progress">
            <h3 id="goalChart">Goals:</h3>
            <GoalMeter codingGoal={codingGoal} codingProgress={codingProgress} appGoal={appGoal} appProgress={appProgress} changeCodingGoal={changeCodingGoal} changeGoalProgress={changeGoalProgress} changeAppGoal={changeAppGoal} changeAppProgress={changeAppProgress}/>
            {/* <h4>Coding Goals:</h4>
            Set a Coding Goal:
            <Select options={goalOptions} onChange={(event)=> {changeCodingGoal(event)}}/>

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
              //status="success"
            />

            <div id="goalTextDiv">
              {" "}
              Goal: {codingGoal} &nbsp; Completed: {codingProgress} 
              <button onClick={(event) => {changeGoalProgress("subtract")}}>{" "}-{" "} </button>
              <button onClick={(event) => {changeGoalProgress("add")}}>{" "}+{" "} </button>
            </div>

            <h4>Job Application Goals:</h4>
            Set an Application Goal:
            <Select options={goalOptions} onChange={(event)=> {changeAppGoal(event)}}/>

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
              percent={result2}
              status="success"
            />

            <div id="goalTextDiv">
              {" "}
              Goal: {appGoal} &nbsp; Completed: {appProgress} 
              <button onClick={(event) => {changeAppProgress("subtract")}}>{" "}-{" "} </button>
              <button onClick={(event) => {changeAppProgress("add")}}>{" "}+{" "} </button>
            </div> */}
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
