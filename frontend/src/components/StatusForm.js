import React, {useState, useEffect} from 'react'
import { Card, Badge, Button, Collapse } from 'react-bootstrap'

//import function
import { updateJobStatus, deleteJob } from '../services/savedjob.service'

//css import 
import '../css/App.css'

//status form needs 3 buttons (and maybe allowing users to set dates for interviews)

function StatusForm({ job, jobGrabber }) {

    let appStatus = job.appliedTo.appStatus;
    let responseStatus = job.heardBack.status;
    let rejectStatus = job.heardBack.closed;

    console.log('appstatus', appStatus)

    appStatus = appStatus == true ? 'rgb(70, 242, 101)' : 'rgb(236, 24, 24)';
    responseStatus = responseStatus == true ? 'rgb(53, 54, 54)' : 'rgb(0, 251, 255)';
    rejectStatus = rejectStatus == true ? 'black' : 'rgb(255, 221, 0)';


    
    //NOTE: This is the order things are sent to req through the put route: id, hbStatus, hbSchInt, hbClosed, atStatus, atDate
    //our put route function expects 6 params, send in null if nothing is changed
    const appliedTo = (job) => {
        let id = job._id;
        let atStatus = job.appliedTo.appStatus == true ? false : true;
        //if applied to is false, heard back has to be false
        let hbStatus = atStatus == false ? false : job.heardBack.status;
        //call updateJobStatus function that connects frontend to backend
        updateJobStatus(id, hbStatus, null, null, atStatus, null);
        //passing in jobGrabber (the function responsible for retrieving data from the backend) to all the button functions will allow the components to rerender when changed
        jobGrabber();
    }

    //function that toggles the heardback status btwn true and false when button is clicked
    const heardBack = (job) => {
        let id = job._id;
        //if the status of the heardBack.status is already true, switch it to false. if its false, switch to true
        let hbStatus = job.heardBack.status === true ? false : true;
        //if user heardback, make sure their applied to is true
        let atStatus = hbStatus === true ? true : job.appliedTo.appStatus;
        updateJobStatus(id, hbStatus, null, null, atStatus, null);
        jobGrabber();
    }

    //function that toggles the closed status of the job
    const rejectedFrom = (job) => {
        let id = job._id;
        let hbClosed = job.heardBack.closed === true ? false : true;
        //if user got rejected, make sure their applied to is true
        let atStatus = hbClosed === true ? true : job.appliedTo.appStatus;
        //if user got rejected that means they heard back 
        let hbStatus = hbClosed === true ? true : job.heardBack.status;
        //updateJobStatus(id, hbStatus, null, hbClosed, atStatus, null);
        updateJobStatus(id, hbStatus, null, hbClosed, atStatus, null);
        jobGrabber();
    }

    const removeJob = (job) => {
        let id = job._id;
        deleteJob(id);
        jobGrabber();
    }

    return (
        <div>
            <button onClick= {() => appliedTo(job)} className='form-btn' style={{background: appStatus}}>Applied To</button>
            <button onClick= {() => heardBack(job)} className='form-btn'style={{background: responseStatus}} >Heard Back</button>
            <button onClick= {() => rejectedFrom(job)} className='form-btn' style={{background: rejectStatus}}> Rejected</button>
            <Button onClick= {() => removeJob(job)}>Remove Job</Button>
        </div>
    )
}

export default StatusForm
