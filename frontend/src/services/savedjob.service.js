import axios from 'axios';




export const saveAJob = (id, jobId, location, company, jobTitle) => {
    return axios
    .post('http://localhost:8080/newsavedjob', {id, jobId, location, company, jobTitle})
    .then(response => {
        console.log('post response', response);
    })
    .catch(err => {
        console.log(err)
    })
}

export const updateJobStatus = (id, hbStatus, hbSchInt, hbClosed, atStatus, atDate) => {
    console.log('hit updatejobstatus')
    return axios
    .put('http://localhost:8080/changestatus/' + id, {hbStatus, hbSchInt, hbClosed, atStatus, atDate})
    .then(response => {
        console.log('update job response', response)
    })
    .catch(err => {
        console.log('update job route front end error', err)
    })
}

export const deleteJob = (id) => {
    return axios
    .delete('http://localhost:8080/deletejob/' + id)
    .then(response => {
        console.log('delete saved job repsonse', response)
    })
    .catch(err => {
        console.log('delete saved job error', err)
    })
}
