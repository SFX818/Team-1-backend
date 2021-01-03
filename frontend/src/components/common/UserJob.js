import React, {useState, useEffect} from 'react'

//component import
import Job from '../Job'
import StatusForm from '../StatusForm'

import axios from 'axios'


//UserJob component will display the Job (card) component but also a form component allowing user to change the status 
function UserJob({ job, jobGrabber }) {
    const [currentJob, setCurrentJob] = useState('')

    //useEffect is used to do axios calls for specific jobs based on their id so that info can be passed down to the Job component
    useEffect(() => {
        const cancelToken1 = axios.CancelToken.source()
        axios.get('https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions/' + job.jobId +'.json', {
            cancelToken: cancelToken1.token,
            // setting markdown as true so we done get any random bits of messy JSON
            params: {markdown: true }
        })
        .then(response => {
            //console.log('specific axios call response', response)
            setCurrentJob(response.data)
        })
        .catch(err => {
            console.log('specific axios call error', err)
        })
    }, []) 


    return (
        <div>
            {job.jobTitle} {job.company}
            {/* Job is passed the from so that when the Job component is rendered, the heart to save a job will not render */}
            <Job job= {currentJob} from='savedJobs'/>
            <StatusForm job = {job} jobGrabber = {jobGrabber}/>
        </div>
    )
}

export default UserJob
