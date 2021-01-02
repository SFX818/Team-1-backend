import axios from 'axios';



const API_URL = "http://localhost:8080/"


// Function to add a new network
export const addNetwork = (currentUser, name, company, email, phone, notes) => {
    return axios.post( API_URL + "newnetwork", {
        currentUser,
        name,
        company,
        email,
        phone, 
        notes
    })
    .then(res =>{
        console.log("adding network response", res)
    })
    .catch(err=>{
        console.log("oh no no no, error in addNetwork", err)
    })
}

export const deleteNetwork = (id) => {
    console.log()
    return axios
    .delete('http://localhost:8080/deletenetwork/'+ id)
    .then(response => {
        console.log('deleted network', response)
    })
    .catch(err => {
        console.log('error with delete network', err)
    })
}

// export const editNetwork = (id) => {
//     return axios
//     .put('http://localhost:8080/editnetwork/' +id)
//     .then(response => {
//         console.log('edited network successfull', response)
//     })
//     .catch(err => {
//         console.log('error with edit network', err)
//     })
// }