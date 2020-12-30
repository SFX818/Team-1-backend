import React, { useState } from 'react'
import FetchJobs from '../utilities/fetchJobs.utilities'
import {Container} from 'react-bootstrap'
import Job from './Job'

const Landing = () => {
    // passing in params and page numbers to set the state to original status, empty object meaning no results bc no search has been made yet and default page 1 
    const [params, setParams] = useState({})
    const [page, setPage] = useState(1)
    const {jobs, loading, error } = FetchJobs(params, page)
    return (
        <Container>
            {loading && <h1>Loading...</h1>}
            {error && <h1> Error. Try Refreshing </h1>}
            {<h1>{jobs.length}</h1>}
            {/* go through all the jobs in our search query and render the HTML to show a job card */}
            {jobs.map(job => {
                // Job component needs key because its looping, then it will pass down the job to the key which will in tern pass to empty object
                return <Job key={job.id} job={job}/>
            })}
        </Container>
    )
}

export default Landing


//App.js >> goes here