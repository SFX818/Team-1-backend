import React, {useState, useEffect} from 'react'
import { Card, Badge, Button, Collapse } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'

//component import
import Job from '../Job'
import StatusForm from '../StatusForm'

//css import
import "../../css/App.css";

import axios from 'axios'


//UserJob component will display the Job (card) component but also a form component allowing user to change the status 
function UserJob({ job, jobGrabber }) {
    const [currentJob, setCurrentJob] = useState('')
    const [open, setOpen] = useState(false)
    const [cardSize, setCardSize] = useState('25rem')

    //useEffect is used to do axios calls for specific jobs based on their id so that info can be passed down to the Job component
    useEffect(() => {
        const cancelToken1 = axios.CancelToken.source()
        axios.get('https://jobs.github.com/positions/' + job.jobId +'.json', {
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
        <Card style={{ width: cardSize }}>
            <Card.Body>
                <StatusForm job = {job} jobGrabber = {jobGrabber}/>
                <div className='title-logo'>
                    <Card.Title>
                        {currentJob.title} - <span className= 'text-muted font-weight-light'>{job.company}</span>
                    </Card.Title>
                    <img className="d-none d-md-block" height="50" alt={currentJob.company} src={currentJob.company_logo} />
                </div>

                <div id='badges-date'>
                    <div id='badges'>
                    <Badge variant="secondary">{currentJob.location}</Badge>
                    <Badge variant="secondary" className="mr-2">{currentJob.type}</Badge>
                    </div>
                    <Card.Subtitle className="text-muted mb-2">
                        {new Date(currentJob.created_at).toLocaleDateString()}
                    </Card.Subtitle>
                </div>
 
                <div style={{ wordBreak: 'break-all' }}>
                    <ReactMarkdown source={currentJob.how_to_apply} />
                </div>
               
                
                <Card.Text>
                    <Button className='float-right mt-5'
                        onClick={() => setOpen(prevOpen => !prevOpen)}variant="primary">
                            {open ? 'Hide Details' : 'View Details'}
                            {open ? setCardSize('25rem'): setCardSize('50rem')}
                    </Button>
                 </Card.Text>
                 
                 <Collapse in={open}>
                    <div className="mt-4">
                     <ReactMarkdown source={currentJob.description} />
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
            
            {/* Job is passed the from so that when the Job component is rendered, the heart to save a job will not render */}
            
            {/* <div id="miniTest"> */}
            {/* <Job job= {currentJob} from='savedJobs'/> */}
            {/* <StatusForm job = {job} jobGrabber = {jobGrabber}/> */}
            {/* </div> */}

        </div>
        
    )
}

export default UserJob
