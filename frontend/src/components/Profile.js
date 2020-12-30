import React,{useState, useEffect} from 'react'
import { getCurrentUser } from '../services/auth.service'
import axios from 'axios';
import authHeader from '../utilities/authHeader.utilities'

//backend function import 
import {getJobs} from '../services/savedjob.service'

const Profile = () => {

    const [allJobs, setAllJobs] = useState([]);
    const currentUser = getCurrentUser()

    //use useEffect to run the getJobs function 
    useEffect(() => {
        jobGrabber()
    }, []);

    const jobGrabber =  () => {
        const jobData = axios.get("http://localhost:8080/profile/savedJobs", {headers: authHeader()})
        .then(jobData => 
            setAllJobs([jobData.data]))
        // .catch(err => console.log(err.message))
    }
    console.log("THIS IS ALL JOBS", allJobs)


    const listJobs = () => {
        if(allJobs.length>0){
            return allJobs[0].allJobs.map((job, index) =>(
                <ul> 
                    <li key={index}> <b> Location:</b> {job.location} <b> Language:</b>  
                    {job.language} <b> Company:</b> {job.company} <b> Job Title:</b> {job.jobTitle}
                    </li>
                </ul>
            ))
        }     
        }  

 

    return (
        <div className ="container">
            <header className="jumbotron"> 
                <h3> 
                    <strong> {currentUser.username} </strong>
                </h3>
            </header>
         {/* <p> 
             <strong> Token: </strong> {currentUser.accessToken.substring(0, 20)}...{" "}
         </p>
         <p> 
             <strong> Id: </strong> {currentUser.id}
         </p>
         <p>
             <strong> email: </strong> {currentUser.email} 
         </p>

if current user has roles, such as user or admin, map thru the roles
         {currentUser.roles &&
            currentUser.roles.map((role, index)=> <li key={index}> {role} </li>)
        } */}

<h2>{allJobs.appliedToJobs && allJobs.appliedToJobs[0].company }</h2>

<ul> 
        {listJobs()}
</ul>

 </div> 
    )
}

export default Profile
