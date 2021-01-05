import React, { useState, useEffect } from "react";
import axios from "axios";
import authHeader from "../utilities/authHeader.utilities";
import { getCurrentUser } from "../services/auth.service";
import { CardDeck, Card } from "react-bootstrap";

//backend function import
import { getJobs } from "../services/savedjob.service";
//component import
import UserJob from "../components/common/UserJob";
//component that renders on the page when the link is clicked undered saved jobs on the profile home page
const SavedJobs = () => {
  const currentUser = getCurrentUser();
  //setting a state that will hold the saved jobs
  const [allJobs, setAllJobs] = useState([]);

  //use useEffect to run the getJobs function
  useEffect(() => {
    jobGrabber();
  }, []);
  //function that connects to the get route in the backend
  const jobGrabber = () => {
    const jobData = axios
      .get("http://localhost:8080/profile/savedJobs", { headers: authHeader() })
      .then((jobData) => {
        setAllJobs(jobData.data);
      })
      .catch((err) => console.log("ERROR ON JOB GET CALL", err.message));
  };
  // //function that grabs ALL of the user's saved jobs
  // const displayAllJobs = () => {
  //     if(allJobs != undefined && allJobs.length != 0){
  //         return allJobs.allJobs.map((job, index) => (
  //             <UserJob job = {job} key = {index} appliedTo = {appliedTo}/>
  //         ))
  //     }
  //     else {
  //         return <h1>Loading...</h1>
  //     }
  // }
  //function that will render a UserJob component for every job separated by its application status
  const displayJobs = (section) => {
    if (allJobs != undefined && allJobs.length != 0) {
      if (section === "NeedAction") {
        return allJobs.needActionJobs.map((job, index) => (
          <UserJob job={job} key={index} jobGrabber={jobGrabber} status='NeedAction'/>
        ));
      } /* else if(section === 'AppliedTo') {
                return allJobs.appliedToJobs.map((job, index) => (
                    <UserJob job = {job} key = {index} />
                ))
            } else if(section === 'HeardBack') {
                return allJobs.heardBackJobs.map((job, index) => (
                    <UserJob job = {job} key = {index} />
                )) 
            }*/ else if (
        section === "Rejected"
      ) {
        return allJobs.deniedFromJobs.map((job, index) => (
          <UserJob job={job} key={index} jobGrabber={jobGrabber} />
        ));
      } else if (section === "InProgress") {
        return allJobs.inProgressJobs.map((job, index) => (
          <UserJob job={job} key={index} jobGrabber={jobGrabber} />
        ));
      }
    } else {
      return <h1>Loading...</h1>;
    }
  };
  return (
       
    <div className="whole-div">
      <div className="outer-div">
        {/* <div className = 'all-jobs'>
                          <h2>All Jobs:</h2>
                          {displayAllJobs()}
                      </div> */}
        <h1 id="userSavedJob">{currentUser.username}'s Saved Jobs: </h1>
        {/* <div className="need-action slide-box"> */}
        
        <h2 className="categories">Need Action:</h2>
        <CardDeck> 
        <div className="categoryDiv">
          {displayJobs("NeedAction")}
        </div>
        </CardDeck>

        <h2 className="categories">Applied To:</h2>
        <h3 className="categories">In Progress/Waiting:</h3>
        
        <CardDeck> 
        <div className="categoryDiv">              
          {displayJobs("InProgress")}
        </div>
        </CardDeck>

        <h3 className="categories">Rejected:</h3>
        <CardDeck> 
        <div className="categoryDiv">
          {displayJobs("Rejected")}
        </div>
        </CardDeck>
      </div>
    </div>
    
 
  );
};
export default SavedJobs;