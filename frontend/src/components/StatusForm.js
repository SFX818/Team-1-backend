import React from 'react'
import { Card, Badge, Button, Collapse } from 'react-bootstrap'

//import function
import { updateJobStatus } from '../services/savedjob.service'

//css import 
import '../css/App.css'

//status form needs 3 buttons (and maybe allowing users to set dates for interviews)

function StatusForm({ job }) {
    let appStatus = job.appliedTo.appStatus;
    let responseStatus = job.heardBack.status;
    let rejectStatus = job.heardBack.closed;

    console.log('appstatus', appStatus)
    console.log()
    // if(appStatus == true){
    //     appStatus = 'green'
    // } else {
    //     appStatus = 'red'
    // }

    appStatus = appStatus == true ? 'rgb(70, 242, 101)' : 'rgb(236, 24, 24)';
    responseStatus = responseStatus == true ? 'rgb(70, 242, 101)' : 'rgb(236, 24, 24)';
    rejectStatus = rejectStatus == true ? ' rgb(236, 24, 24)' : 'rgb(70, 242, 101)';


    
    //NOTE: This is the order things are sent to req through the put route: id, hbStatus, hbSchInt, hbClosed, atStatus, atDate
    //our put route function expects 6 params, send in null if nothing is changed

    const appliedTo = (job) => {
        console.log('job before appliedTo change', job)
        let id = job._id;
        console.log(job.appliedTo.appStatus);
        let atStatus = job.appliedTo.appStatus == true ? false : true;
        console.log('AT STATUS', atStatus)
        updateJobStatus(id, null, null, null, atStatus, null);
    }

    //function that toggles the heardback status btwn true and false when button is clicked
    const heardBack = (job) => {
        console.log('job before heardback change', job)
        let id = job._id;
        //let atStatus;
        //if the status of the heardBack.status is already true, switch it to false. if its false, switch to true
        let hbStatus = job.heardBack.status === true ? false : true;

        //if user heardback, make sure their applied to is true
        let atStatus = hbStatus === true ? true : job.appliedTo.appStatus;
        //call updateJobStatus function that connects frontend to backend
        // updateJobStatus(id, hbStatus, null, null, atStatus, null);
        updateJobStatus(id, hbStatus, null, null, null, null);
    }

    //function that toggles the closed status of the job
    const rejectedFrom = (job) => {
        console.log('job before', job.heardBack.closed)
        let id = job._id;
        let hbClosed = job.heardBack.closed === true ? false : true;
        // //if user got rejected, make sure their applied to is true
        // let atStatus = hbClosed === true ? true : job.appliedTo.appStatus;
        // //if user got rejected that means they heard back 
        // let hbStatus = hbClosed === true ? true : job.heardBack.status;
        //updateJobStatus(id, hbStatus, null, hbClosed, atStatus, null);
        updateJobStatus(id, null, null, hbClosed, null, null);
    }

    return (
        <div>
            <button onClick= {() => appliedTo(job)} className='form-btn' style={{background: appStatus}}>Applied To</button>
            <button onClick= {() => heardBack(job)} className='form-btn'style={{background: responseStatus}} >Heard Back</button>
            <button onClick= {() => rejectedFrom(job)} className='form-btn' style={{background: rejectStatus}}> Rejected</button>
            <Button>Remove Job</Button>
        </div>
    )
}

export default StatusForm
