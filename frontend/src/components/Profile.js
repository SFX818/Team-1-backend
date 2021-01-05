import React, { useState, useEffect } from "react";
// import { getCurrentUser } from "../services/auth.service";
import axios from "axios";
import authHeader from "../utilities/authHeader.utilities";
import { Link } from "react-router-dom";
import "../css/App.css";
import "../css/profile.css";
import { Card, Button } from "react-bootstrap";

import { getProfileInfo, editGoals } from '../services/profile.service'

//backend function import
import { getJobs } from "../services/savedjob.service";
import {saveTodos} from '../services/user.service';

//component import 
import GoalMeter from '../components/GoalMeter';
import PieCharts from '../components/PieCharts';
import Todos from '../components/Todos';


const Profile = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [codingGoal, setCodingGoal] = useState('');
  const [codingProgress, setCodingProgress] = useState('');
  const [appGoal, setAppGoal] = useState('');
  const [appProgress, setAppProgress] = useState('');
  const [todos, setTodos] = useState([]);


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
      setTodos(profileData.data.todos);
      //return await response.data;
    } catch (err){
      console.log('profile get info route error', err)
    }
  }

  ///////FOR TODOS
    //todos are updated in several ways: added, change done status, and deleted. Having a useEffect will allow them to save with each change
    useEffect(() => {
      let id = currentUser.id;
      //connect to backend
      saveTodos(id, todos)
    }, [todos])

  ////////////code for the goals below:

  //FOR GOALS: needed this use effect for the editGoals backend route because it was taking state too long to update. It will run the editGoal function everytime there is a change to codingProgress
  useEffect(() => {
    let id = currentUser.id
    editGoals(id, null, codingProgress, null, null)
  }, [codingProgress])

  //FOR GOALS: function that is connected to the + and - buttons in the GoalMeter component to change code goal progress. This change in info will then trigger the useEffect above
  const changeGoalProgress = (type) => {
    if(type==="add"){
      if(codingProgress+1 <= codingGoal && codingProgress +1 >=0){  
      setCodingProgress(codingProgress + 1);
      }
    }if(type==="subtract"){
      if(codingProgress-1 <= codingGoal && codingProgress -1 >=0){  
        setCodingProgress(codingProgress - 1); 
      }
    }
  }

  //FOR GOALS: function that allows users to set a goal for coding problems
  const changeCodingGoal = (e) => {
    setCodingProgress(0)
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
      if(appProgress+1 <= appGoal && appProgress +1 >=0){  
        setAppProgress(appProgress + 1);
      }
    }if(type==="subtract"){
      if(appProgress-1 <= appGoal && appProgress -1 >=0){  
        setAppProgress(appProgress - 1); 
      }
    }
  }



  //FOR GOALS: function that allows user to set a goal for the amount of applications they want to submit
  const changeAppGoal = (e) => {
    setAppProgress(0)
    let id = currentUser.id
    setAppGoal(e.value)
    let appGoal = e.value;
    editGoals(id, null, null, appGoal, null)
  }


  const listJobs = () => {
    if (allJobs.length > 0) {
      return allJobs[0].allJobs.map((job, index) => (
        <div id="card" key={index}>
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
        <header>
        <div className="twelve">
  <h1 id="h1"> {currentUser.username}'s Profile</h1>
</div>
          {/* <h3 id="user">
            <strong> Welcome {currentUser.username} </strong>
          </h3> */}
        </header>

        <h2>{allJobs.appliedToJobs && allJobs.appliedToJobs[0].company}</h2>

        <div id="container">
          <div id="jobList">
        <h2 id="savedJobs"> Saved Jobs: </h2>
            
            {listJobs()}</div>

          <div id="bigPie">
            <PieCharts allJobs={allJobs}/>
          </div>

          <div id="progress">
            <h3 id="goalChart">Goals:</h3>
            <GoalMeter codingGoal={codingGoal} codingProgress={codingProgress} appGoal={appGoal} appProgress={appProgress} changeCodingGoal={changeCodingGoal} changeGoalProgress={changeGoalProgress} changeAppGoal={changeAppGoal} changeAppProgress={changeAppProgress}/>
          </div>

        </div>

        <Link to={"/profile/savedjobs"} className="nav-link">
          saved Jobs{" "}
        </Link>

        <div id='todos'>
            <Todos todos={todos} setTodos={setTodos}/>
          </div>
      </div>
    );
  }
  return <div> loading </div>;
};

export default Profile;
