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

    //function that connects to the get route in the backend
    const jobGrabber =  () => {
        const jobData = axios.get("http://localhost:8080/profile/savedJobs", {headers: authHeader()})
        .then( jobData => {
            setAllJobs(jobData.data)
        })
        .catch(err => console.log('ERROR ON JOB GET CALL', err.message))
    }

    //function that grabs ALL of the user's saved jobs 
    const displayAllJobs = () => {
        if(allJobs != undefined && allJobs.length != 0){
            return allJobs.allJobs.map((job, index) => (
                <UserJob job = {job} key = {index}/>
            ))
        }
        else {
            return <h1>Loading...</h1>
        }
    }

    //function that will render a UserJob component for every job separated by its application status
    const displayJobs = (section) => {
        if(allJobs != undefined && allJobs.length != 0){
            if(section === 'NeedAction'){
                return allJobs.needActionJobs.map((job, index) => (
                    <UserJob job = {job} key = {index}/>
                ))
            } else if(section === 'AppliedTo') {
                return allJobs.appliedToJobs.map((job, index) => (
                    <UserJob job = {job} key = {index}/>
                ))
           /* } else if(section === 'HeardBack') {
                return allJobs.heardBackJobs.map((job, index) => (
                    <UserJob job = {job} key = {index}/>
                )) */
            } else if(section === 'Rejected'){
                return allJobs.deniedFromJobs.map((job, index) => (
                    <UserJob job = {job} key = {index}/>
                ))
            }
        }
        else {
            return <h1>Loading...</h1>
        }
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
                    <h2>Need Action:</h2>
                    {displayJobs('NeedAction')}
                    

                </div>

                <div className = 'applied-to slide-box'>
                    <h2>Applied To:</h2>
                    {displayJobs('AppliedTo')}

                </div>

                {/* <div className = 'heard-back slide-box'>
                    <h2>Heard Back:</h2>
                    {displayJobs('HeardBack')}

                </div> */}

                <div className = 'closed slide-box'>
                    <h2>REJECTED:</h2>
                    {displayJobs('Rejected')}
                </div>
            </div>
        </div>
    )
}


export default SavedJobs