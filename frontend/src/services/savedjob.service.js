import axios from 'axios';

import { setItem, getItem, removeItem } from '../utilities/localStorage.utilities'


export const saveAJob = (id, location, company, jobTitle) => {
    return axios
    .post('http://localhost:8080/newsavedjob', {id, location, company, jobTitle})
    // .post('http://localhost:8080/newsavedjob', {headers: authHeader()})
    .then(response => {
        console.log('post response', response);
    })
    .catch(err => {
        console.log(err)
    })
}

