import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import FetchJobs from '../utilities/fetchJobs.utilities'
import {Container} from 'react-bootstrap'
import Job from './Job'
import JobsPagination from './JobsPagination'
import SearchForm from './SearchForm'

import '../css/App.css'

const Landing = () => {
    // passing in params and page numbers to set the state to original status, empty object meaning no results bc no search has been made yet and default page 1 
    const [params, setParams] = useState({})
    const [page, setPage] = useState(1)
    const { jobs, loading, error, hasNextPage } = FetchJobs(params, page)

    const Spinner = require('react-spinkit');

    function handleParamChange(e) {
        const param = e.target.name
        const value = e.target.value
        setPage(1)
        setParams(prevParams => {
          return { ...prevParams, [param]: value }
        })
    }
    return (
        <Container>
            <br></br>
            <br></br>
            <h2 className='mb-4' id='search-title'>returned(results):</h2>
            <SearchForm params={params} onParamChange={handleParamChange} />
            <p>Don't see the job you want to save? Add and keep track of your own job's<span id='hide'>_</span>
                <Link to={'/addjob'} id='saved-job-link'>
                here
                </Link>
            </p>
            <br></br>
            <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
                    {loading && <div className='loader'><Spinner name="wandering-cubes" color="teal"/></div>}
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