import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import authHeader from '../utilities/authHeader.utilities';
import { getCurrentUser } from '../services/auth.service';
import { CardDeck, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';


//component import
import UserJob from '../components/common/UserJob';

//css import
import '../css/profile.css';


const SavedJobs = () => {
  const currentUser = getCurrentUser();
  //setting a state that will hold the saved jobs
  const [allJobs, setAllJobs] = useState([]);
  const [num, setNum] = useState({
    allJobs: [],
      appliedToJobs: [],
      heardBackJobs: [],
      waitingJobs: [],
      deniedFromJobs: [],
      needActionJobs: [],
      inProgressJobs: []
  })

  const Spinner = require('react-spinkit');

  //use useEffect to run the getJobs function
  useEffect(() => {
    jobGrabber();
  }, []);
  //function that connects to the get route in the backend
  const jobGrabber = () => {
    const jobData = axios
      .get('http://localhost:8080/profile/savedJobs', { headers: authHeader() })
      .then((jobData) => {
        setAllJobs(jobData.data);
        setNum(jobData.data);
      })
      //.catch((err) => console.log('ERROR ON JOB GET CALL', err.message));
  };

  //function that will render a UserJob component for every job separated by its application status
  const displayJobs = (section) => {
    if (allJobs != undefined && allJobs.length != 0) {
      //setNum(allJobs);

      //if statements for if user doesnt have anything saved 
      if(allJobs.needActionJobs.length === 0 && section === 'NeedAction'){
        return <div className ='empty-message'>You currently have no jobs that need action. Search for more jobs <span id='hide'>_</span> 
         <Link to={'/jobsearch'} id='job-search-link'>
          here.
        </Link></div>
      }
      if(allJobs.deniedFromJobs.length === 0 && section === 'Rejected'){
        return <div className ='empty-message'>You have not been rejected by any jobs.</div>
      }
      if(allJobs.inProgressJobs.length === 0 && section === 'InProgress'){
        return <div className ='empty-message'>You have no job applications in progress.</div>
      }
      if(allJobs.waitingJobs.length === 0 && section === 'Waiting'){
        return <div className ='empty-message'>You have no job applications that you are waiting to hear back from.</div>
      }

      if (section === 'NeedAction') {
        return allJobs.needActionJobs.map((job, index) => (
          <UserJob job={job} key={index} jobGrabber={jobGrabber} status='NeedAction'/>
        ));
        } else if (section === 'Rejected') {
        return allJobs.deniedFromJobs.map((job, index) => (
          <UserJob job={job} key={index} jobGrabber={jobGrabber} />
        ));
      } else if (section === 'InProgress') {
        return allJobs.inProgressJobs.map((job, index) => (
          <UserJob job={job} key={index} jobGrabber={jobGrabber} />
        ));
      } else if(section === 'Waiting'){
        return allJobs.waitingJobs.map((job, index) => (
          <UserJob job={job} key={index} jobGrabber={jobGrabber} />
        ));
      }
    } else {
      return <div className='loader'><Spinner name='line-scale-pulse-out-rapid' color='teal'/>
      </div>;
    }
  };
  return (
       
    <div className='whole-div'>
      <div className='outer-div'>
        <h1 id='userSavedJob'>{currentUser.username}'s Saved Jobs: </h1>
        
        <h2 className='categories big-label'>Need Action: {num.needActionJobs.length}</h2>
        <CardDeck> 
        <div className='categoryDiv'>
          {displayJobs('NeedAction')}
        </div>
        </CardDeck>
        <br></br>

        <h2 className='categories big-label'>Applied To: {num.appliedToJobs.length}</h2>
        <h3 className='categories little-label'>Waiting: {num.waitingJobs.length}</h3>
        
        <CardDeck > 
        <div className='categoryDiv'>              
          {displayJobs('Waiting')}
        </div>
        </CardDeck>
        <br></br>

        <h3 className='categories little-label'>In Progress: {num.inProgressJobs.length}</h3>
        
        <CardDeck > 
        <div className='categoryDiv'>              
          {displayJobs('InProgress')}
        </div>
        </CardDeck>
        <br></br>

        <h3 className='categories little-label'>Rejected: {num.deniedFromJobs.length}</h3>
        <CardDeck> 
        <div className='categoryDiv'>
          {displayJobs('Rejected')}
        </div>
        </CardDeck>
      </div>
    </div>
    
 
  );
};
export default SavedJobs;