import axios from 'axios'
// Helper function to get access token for header
import authHeader from '../utilities/authHeader.utilities'

const API_URL = "http://localhost:8080/api/test/"

/*
GET	 |   /api/test/all	 |	retrieve public content
GET	 |  /api/test/user	 |	access User's content
GET	 | /api/test/admin	 |	access Admins content
*/

// retrieve public content
export const getPublicContent = () => {
    return axios.get(API_URL + 'all')
}

// 	access User's content
export const getUserBoard = () => {
    return axios.get(API_URL + "user", {headers: authHeader()})
}

// 	access Admins content
export const getAdminBoard = () => {
    return axios.get(API_URL + "admin", {headers: authHeader()})
}

//save users Todos to the backend
export const saveTodos = (id, todos) => {
    return axios
    .put('http://localhost:8080/profile/todos', {id, todos})
    .then(response => {
        console.log('saveTodos route response', response)
    })
    .catch(err => {
        console.log('saveTodos route error', err)
    })
}

