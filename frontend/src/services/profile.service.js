import axios from 'axios';

const API_URL = "http://localhost:8080/"



export const setGoals = (id, codingGoal, codingProgress, appGoal, appProgress) => {
    console.log("this route is hittinggggg profile servicesssss ")
    return axios
    .put('http://localhost:8080/profile/goals' , {id, codingGoal, codingProgress, appGoal, appProgress})
    .then(response => {
        console.log('edited goal successful', response)
    })
    .catch(err => {
        console.log('error with edit goal', err)
    })
}
