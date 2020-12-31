import axios from 'axios';



const API_URL = "http://localhost:8080/"


// Function to add a new network
export const addNetwork = (currentUser, name, company, email, phone) => {
    return axios.post( API_URL + "newnetwork", {
        currentUser,
        name,
        company,
        email,
        phone
    })
    .then(res =>{
        console.log("adding network response", res)
    })
    .catch(err=>{
        console.log("oh no no no, error in addNetwork", err)
    })
}