import axios from 'axios';

//import { setItem, getItem, removeItem } from '../utilities/localStorage.utilities'

import authHeader from '../utilities/authHeader.utilities'


export const getJobs = () => {
    return axios
    .get("http://localhost:8080/savedJobs", {headers: authHeader()})
    // .then((jobsResponse) => {
    //     console.log('jobsResponse', jobsResponse);
    //     return(jobsResponse)
    // })
    // .catch(err => {
    //     console.log('error on getJobs function in service', err)
    // })
}

