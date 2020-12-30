import React, { useState, useEffect} from 'react';
import axios from 'axios';
import authHeader from '../utilities/authHeader.utilities'

//backend function import 
import {getJobs} from '../services/savedjob.service'

//component import
import UserJob from '../components/common/UserJob';

//component that renders on the page when the link is clicked undered saved jobs on the profile home page
const SavedJobs = () => {
    //setting a state that will hold the saved jobs
    const [allJobs, setAllJobs] = useState([]);
    
    //use useEffect to run the getJobs function 
    useEffect(() => {
        jobGrabber()
    }, []);

    const jobGrabber =  () => {
        const jobData = axios.get("http://localhost:8080/profile/savedJobs", {headers: authHeader()})
        .then( jobData => 
            setAllJobs(jobData.data))
        .catch(err => console.log(err.message))
    }
    
    console.log('all jobs', allJobs.allJobs);

    const displayAllJobs = () => {
        allJobs.allJobs.map( job => (
            <UserJob job = {job}/>
        ))
    }
    

    return (
        <div className = 'whole-div'>
            <h1>~User's Saved Jobs</h1>
            <div className = 'outer-div'>
                <div className = 'all-jobs'>
                    <h2>All Jobs:</h2>
                    {displayAllJobs()}
                

                </div>

                <div className = 'need-action slide-box'>
                    <h2>Applied To:{allJobs.appliedToJobs && allJobs.appliedToJobs[0].company }</h2>
                    

                </div>

                <div className = 'applied-to slide-box'>
                    <h2>Applied To:</h2>

                </div>

                <div className = 'heard-back slide-box'>
                    <h2>Heard Back:</h2>

                </div>

                <div className = 'closed slide-box'>
                    <h2>REJECTED:</h2>

                </div>
            </div>
        </div>
    )
}


export default SavedJobs