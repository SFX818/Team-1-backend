import React from 'react'

//component import
import Job from '../Job'
import StatusForm from '../StatusForm'


//UserJob component will display the Job (card) component but also a form component allowing user to change the status 
function UserJob({ job, appliedTo }) {
    return (
        <div>
            {job.jobTitle} {job.company}
            {/* <Job/> */}
            <StatusForm job = {job} appliedTo = {appliedTo}/>
        </div>
    )
}

export default UserJob
