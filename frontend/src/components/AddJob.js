import { useState, useEffect } from 'react'
import { Form, FormGroup, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

//connect to backend function import
import { saveAJob } from '../services/savedjob.service'
//save a job takes: id, jobId, location, company, jobTitle, url 
import { getCurrentUser } from '../services/auth.service';

//css import 
import '../css/profile.css';

function AddJob() {
    const currentUser = getCurrentUser();
    //stores the name
    const [jobTitle, setJobTitle] = useState("");
    //stores the company
    const [company, setCompany] = useState("");
    //stores the email
    const [location, setLocation] = useState("");
    //stores the phone number
    const [jobUrl, setJobUrl] = useState("");

    const onChangeJobTitle = (e) => {
        const jobTitle = e.target.value;
        setJobTitle(jobTitle);
    };
   
    const onChangeCompany = (e) => {
        const company = e.target.value;
        setCompany(company);
    };

    const onChangeLocation = (e) => {
        const location = e.target.value
        setLocation(location)
    };

    const onChangeJobUrl = (e) => {
        const jobUrl = e.target.value
        setJobUrl(jobUrl)
    };


    //function run when user submits a job and saves it to the backend
    const saveJob = (e) => {
        const userId = currentUser.id;
        //these jobs wont have a jobId but our saveAjob function expects one so we pass in a value, we can then use this to work with the UserJob component
        const jobId = '0';
        //passed in values are coming from the state
        saveAJob(userId, jobId, location, company, jobTitle, jobUrl)
        //set all values back to empty strings so that user can begin adding a new job
    }

    return (
            // <h2>Don't see the job you want to save? Add and keep track of your own job here!</h2>
        <div id='form-div'>
            <br></br>
            <br></br>
            <h2>Add a Job to Keep Track:</h2>
            <h5>
                To update the job application status, visit your<span id='hide'>_</span> 
                <Link to={'/profile/savedjobs'} id='saved-job-link'>
                My Saved Jobs Page.
                </Link> 
            </h5>
            <Form className = "form">
                <FormGroup text="jobTitle">
                    <Form.Control
                    size ="sm"
                    type="text"
                    placeholder="Job Title" 
                    name="jobTitle"
                    value={jobTitle}
                    onChange={onChangeJobTitle}
                    />
                </FormGroup>

                <FormGroup text="company">
                    <Form.Control
                    size ="sm"
                    type="text"
                    placeholder="Company" 
                    name="company"
                    value={company}
                    onChange={onChangeCompany}
                    />
                </FormGroup>

                <FormGroup text="location">
                    <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Location" 
                    name="location"
                    value={location}
                    onChange={onChangeLocation}
                    />
                </FormGroup>

                <FormGroup text="jobUrl">
                    <Form.Control
                    size ="sm"
                    type="text"
                    placeholder="Job Url" 
                    name="jobUrl"
                    value={jobUrl}
                    onChange={onChangeJobUrl}
                    />
                </FormGroup>
        
            <Button variant="flat" size="xl" onClick={saveJob} id='add-net-btn'>Save</Button>
        </Form>
  </div>
    )
}

export default AddJob
