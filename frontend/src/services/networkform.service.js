import axios from 'axios';



const API_URL = "http://localhost:8080/"


// Function to add a new network, grabbing from our API(backend)
export const addNetwork = (currentUser, name, company, email, phone, notes) => {
    return axios.post( API_URL + "newnetwork", {
        currentUser,
        name,
        company,
        email,
        phone, 
        notes
    })
    // .then(res =>{
    //     console.log("adding network response", res)
    // })
    // .catch(err=>{
    //     console.log("oh no no no, error in addNetwork", err)
    // })
}
//Function to delete a contact, grabbing the function from our API(backend)
export const deleteNetwork = (id) => {
    return axios
    .delete('http://localhost:8080/deletenetwork/'+ id)
    // .then(response => {
    //     console.log('deleted network', response)
    // })
    // .catch(err => {
    //     console.log('error with delete network', err)
    // })
}
// Function to edit a contact, grabbing from our API (backend)
export const editNetwork = (id, name, company, email, phone, notes ) => {
    return axios
    .put('http://localhost:8080/updatenetwork/' +id, {name,company,email,phone,notes})
    // .then(response => {
    //     console.log('edited network successfull', response)
    // })
    // .catch(err => {
    //     console.log('error with edit network', err)
    // })
}

