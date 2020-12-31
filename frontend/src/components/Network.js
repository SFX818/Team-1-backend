import React,{useState, useEffect} from 'react'
import axios from 'axios'
import authHeader from '../utilities/authHeader.utilities'
import NetworkForm from './NetworkForm'

const Network = () => {
    
    // Setting state to hold the saved networks
    const [networkData, setNetworkData] = useState([])
    
    useEffect (()=>{
        getNetwork()
    },[])

    // Getting the data from our API (database/collection)
    const getNetwork = () =>{
        const network = axios.get("http://localhost:8080/findNetwork", {headers: authHeader()})
        .then(network =>
            setNetworkData(network.data))
         
    }

    

    return (

        <div>
            <div className = "showsavednetwork">
              <h1 style = {{textAlign: "center"}}>Network Roledex</h1>
                <ul> 
                    {networkData.map((network, index) =>(
                        <li 
                            key={index}> 
                            <b> Name:</b> {network.name} <br></br>
                            <b> Company:</b>{network.company}<br></br>
                            <b> Phone:</b> {network.phone}<br></br>
                            <b> Email:</b> {network.email}<br></br>
                            <b> Notes:</b> {network.notes} <br></br>
                        </li>
                    ))}
                </ul>
            </div>
            <NetworkForm/>
        </div>
            
                    

    )
}

export default Network
