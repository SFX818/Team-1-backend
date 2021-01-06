import React, {useState, useEffect} from 'react'
import { Card, Badge, Button, Collapse } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'

//component import
import StatusForm from '../StatusForm'

//css import
import "../../css/profile.css";

import axios from 'axios'


//UserJob component will display the Job (card) component but also a form component allowing user to change the status 
function UserJob({ job, jobGrabber, status }) {
    const [currentJob, setCurrentJob] = useState('')
    const [open, setOpen] = useState(false)


    //useEffect is used to do axios calls for specific jobs based on their id so that info can be passed down to the Job component
    useEffect(() => {
        const cancelToken1 = axios.CancelToken.source()
        //axios call needs to happen only on the jobs that are coming from the API, otherwise, it just grabs from the info user gave it
        if(job.jobId !== '0'){
            axios.get('https://jobs.github.com/positions/' + job.jobId +'.json', {
                cancelToken: cancelToken1.token,
                // setting markdown as true so we done get any random bits of messy JSON
                params: {markdown: true }
            })
            .then(response => {
                //console.log('specific axios call response', response)
                setCurrentJob(response.data)
            })
            // .catch(err => {
            //     console.log('specific axios call error', err)
            // })
        } else {
            setCurrentJob(job)
        }
    }, []) 


    return (
        
        <div>
        <Card style={{ width: open  ? '45rem': '25rem', height: open ? '' : '20rem' }} id='sj-Card'>
            <Card.Body>
                <StatusForm job = {job} jobGrabber = {jobGrabber}/>
                    {/* conditional to check if its the job from the API or a job from user input */}
                    {job.jobId === '0' ? 
                    <Card.Title>
                        {currentJob.jobTitle} - <span className= 'text-muted font-weight-light'>{currentJob.company}</span>
                    </Card.Title>
                    :
                    <Card.Title>
                        {currentJob.title} - <span className= 'text-muted font-weight-light'>{currentJob.company}</span>
                    </Card.Title>
                    }

                    <div id='location'>
                        <img src='../../images/location.png' alt='Location: ' height='30'/> {currentJob.location}
                    </div>
                    <br></br>

                    {/* another conditional to check if its the job from the API or a job from user input */}
                    {job.jobId === '0' ? 
                        <a href={currentJob.jobUrl} target='_blank'>Check Out the Job Posting</a>
                    :
                    <div>
                        <div id='date-type'>
                        <Card.Subtitle className="text-muted mb-2">
                            Posted: {new Date(currentJob.created_at).toLocaleDateString()}
                        </Card.Subtitle>
                        <Badge variant="secondary" className="">{currentJob.type}</Badge>
                        </div>
                    

                        <Card.Text id ='detail-btn'>
                            <Button className='mt-2'
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
                    </div> 
                    }
            </Card.Body>
        </Card>
        </div>
        
    )
}

export default UserJob
