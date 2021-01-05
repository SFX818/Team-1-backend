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
function UserJob({ job, jobGrabber, status }) {
    const [currentJob, setCurrentJob] = useState('')
    const [open, setOpen] = useState(false)

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
        <Card style={{ width: open  ? '50rem': '25rem', height: open ? '' : '20rem' } }>
            <Card.Body>
                <StatusForm job = {job} jobGrabber = {jobGrabber}/>

                    <Card.Title>
                        {currentJob.title} - <span className= 'text-muted font-weight-light'>{currentJob.company}</span>
                    </Card.Title>


                    {/* <Badge variant="secondary">{currentJob.location}</Badge> */}
                    <div id='location'>
                        <img src='../../images/location.png' width='30'/> {currentJob.location}
                    </div>
                    <br></br>

                    {/* <Badge variant="secondary" className="">{currentJob.type}</Badge> */}
                    <div id='date-type'>
                        <Card.Subtitle className="text-muted mb-2">
                            Posted: {new Date(currentJob.created_at).toLocaleDateString()}
                        </Card.Subtitle>
                        <Badge variant="secondary" className="">{currentJob.type}</Badge>
                    </div>
                    

                    <Card.Text id ='detail-btn'>
                        <Button className='mt-1'
                            onClick={() => setOpen(prevOpen => !prevOpen)}variant="primary">
                                {open ? 'Hide Details' : 'View Details'}
                        </Button>
                    </Card.Text>

                 
                 <Collapse in={open}>
                    <div className="mt-4">
                        {status === 'NeedAction' ? <ReactMarkdown source={currentJob.how_to_apply} /> : ''}
                        <ReactMarkdown source={currentJob.description} />
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
        </div>
        
    )
}

export default UserJob
