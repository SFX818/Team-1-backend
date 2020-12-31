import React from 'react'
import { Card, Badge, Button, Collapse } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import { useState, useEffect } from 'react'
import { saveAJob } from '../services/savedjob.service'
import { getCurrentUser } from '../services/auth.service'



export default function Job({ job }) {
    const [open,setOpen] = useState(false)
  

    const [currentUser,setCurrentUser] = useState(getCurrentUser())
    useEffect(() => {
        setCurrentUser(currentUser.id)
    },[])
    console.log(currentUser)
    

    const saveThisJob = (job) => {
        const location = job.location;
        const company = job.company;
        const jobTitle = job.title;
        saveAJob(currentUser, location, company, jobTitle)
    }
    console.log("HAAAAAAAAAAAAAAAAAAAAAAAAA", job, "LOCATION", job.location, job.company, job.title)

    return (
        <Card>
            <Card.Body>
                <div className= 'd-flex justify-content-between'>
                    <div>
                        <Card.Title>
                            {job.title} - <span className= 'text-muted font-weight-light'>{job.company}</span>
                        </Card.Title>
                        <Card.Subtitle className="text-muted mb-2">
                        {new Date(job.created_at).toLocaleDateString()}
                        </Card.Subtitle>
                        <Badge variant="secondary" className="mr-2">{job.type}</Badge>
                         <Badge variant="secondary">{job.location}</Badge>
                         <div style={{ wordBreak: 'break-all' }}>
                        <ReactMarkdown source={job.how_to_apply} />
                        </div>
                    </div>
                
                    <img className="d-none d-md-block" height="50" alt={job.company} src={job.company_logo} />
                </div>
                <Card.Text>
                    <Button
                        onClick={() => setOpen(prevOpen => !prevOpen)}variant="primary">
                            {open ? 'Hide Details' : 'View Details'}
                    </Button>
                    <Button onClick={() => saveThisJob(job)}>SAVE TO FAVS</Button>
                 </Card.Text>
                 <Collapse in={open}>
                    <div className="mt-4">
                     <ReactMarkdown source={job.description} />
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    )
}
