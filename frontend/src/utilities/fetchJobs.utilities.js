
import { useReducer, useEffect } from 'react'
import axios from 'axios'


const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error'
}

// Having a CORS error when I am using the actual API -> https://jobs.github.com/positions.json
const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json'

function reducer(state, action) {
    switch (action.type){
        // when we make a request or "search" we say we are loading and clear out jobs we currently have
        case ACTIONS.MAKE_REQUEST:
            return { loading: true, jobs: []}
            //Passing in our jobs on the payload of the action, and set that inside our ACTION.GET_DATA
        case ACTIONS.GET_DATA:
            return { ...state, loading: false, jobs: action.payload.jobs}
            // If there is an error set loading to false and clear out all the jobs on the page. Basically stop loading the page.
        case ACTIONS.ERROR:
            return { ...state, loading: false, error: action.payload.error, jobs: [] }
        default:
            return state

    }
}

export default function FetchJobs(params, page) {
    const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true})

    // Anytime a new search term is entered, we need to clear the page and reload the new data. This is why we use useEffect here.
    useEffect(() => {
        // Canceling the token will make it so the back end stops making axios calls after you are done typing in your search terms
        const cancelToken = axios.CancelToken.source()
        //making a new request, in useEffect, thus updating the state on ACTIONS.MAKE_REQUEST
        dispatch({type: ACTIONS.MAKE_REQUEST})
        axios.get(BASE_URL, {
            cancelToken: cancelToken.token,
            // setting markdown as true so we done get any random bits of messy JSON, setting the page to our current page number and then including all the params (description, location, company ect)
            params: {markdown: true, page: page, ...params }
        }).then(res => {
            // we got our data, lets save our data to the state by calling the get data action
            dispatch({type: ACTIONS.GET_DATA, payload: { jobs: res.data } })
        }).catch(e => {
            //if this was a canceled request by user return here, if not return the actual error
            if(axios.isCancel(e)) return
            // if there is an error catch it, save it to the state and change the page to show the error message/clear out data
            dispatch({ type: ACTIONS.ERROR, payload: { error: e } })
        })

        return () => {
            cancelToken.cancel()
        }
    }, [params, page])
    // ^^^^^ the params and page in the aray is saying when params and page change use this useEffect function

    return state
}