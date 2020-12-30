import React, { useState } from 'react'
import FetchJobs from '../utilities/fetchJobs.utilities'
import {Container} from 'react-bootstrap'
import Job from './Job'
import JobsPagination from './JobsPagination'

const Landing = () => {
    // passing in params and page numbers to set the state to original status, empty object meaning no results bc no search has been made yet and default page 1 
    const [params, setParams] = useState({})
    const [page, setPage] = useState(1)
    const { jobs, loading, error, hasNextPage } = FetchJobs(params, page)
    return (
        <Container>
            <h1 className= 'mb-4'>.find(career)</h1>
            <h2 className='mb-4'>returned(results):</h2>
            <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
                    {loading && <h1>Loading...</h1>}
                    {error && <h1>Error. Try Refreshing.</h1>}
                    {jobs.map(job => {
                    return <Job key={job.id} job={job} />
                })}
            <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
        </Container>
    )
}

export default Landing


//App.js >> goes here