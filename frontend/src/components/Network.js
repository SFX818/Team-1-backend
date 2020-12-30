import React,{useState, useEffect} from 'react'
import axios from 'axios'
import authHeader from '../utilities/authHeader.utilities'

const Network = () => {
    
    // Setting state to hold the saved networks
    const [networkData, setNetworkData] = useState([])

    useEffect (()=>{
        getNetwork()
    },[])

    const getNetwork = () =>{
        const network = axios.get("http://localhost:8080/findNetwork", {headers: authHeader()})
        .then(network =>
            setNetworkData(network.data))
         
    }
  console.log(networkData)

  console.log(setNetworkData)
    return (
        // {currentUser.roles &&
        //     currentUser.roles.map((role, index)=> <li key={index}> {role} </li>)
        // }
        
       
         <div>
              <h1 style = {{textAlign: "center"}}>  Network: </h1>
            <ul> 
                {networkData.map((network, index) =>(
                    <li 
                        key={index}> <b> Name:</b> {network.name} <b> Company:</b>  {network.company} <b> Phone:</b> {network.phone} <b> Email:</b> {network.email} <b> Notes:</b> {network.notes} 
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Network
