import axios from 'axios';
import authHeader from '../utilities/authHeader.utilities'

const API_URL = "http://localhost:8080/"

// export const getProfileInfo = () => {
//     return axios
//     .get(API_URL + 'profile', {headers: authHeader()})
//     .then(response => {
//         console.log('profile info get response', response)
//         return response.data;
//     })
//     .catch(err => {
//         console.log('profile get info route error', err)
//     })
// }

export const getProfileInfo = async () => {
    try {
        const response = await axios.get(API_URL + 'profile', {headers: authHeader()})
        //console.log('getProfileInfo response', response.data);
        return await response.data;
    } catch (err){
        //console.log('profile get info route error', err)
    }
}



export const editGoals = (id, codingGoal, codingProgress, appGoal, appProgress) => {
    return axios
    .put('http://localhost:8080/profile/goals' , {id, codingGoal, codingProgress, appGoal, appProgress})
    // .then(response => {
    //     console.log('edited goal successful', response)
    // })
    // .catch(err => {
    //     console.log('error with edit goal', err)
    // })
}
